/**
 * Backup API Endpoint
 *
 * DEV-ONLY API for backup and restore operations.
 * Returns 404 in production.
 *
 * GET: Create and return backup file
 * POST: Validate and/or restore from backup
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { dev } from '$app/environment';
import { getRepositories } from '$lib/adapters';
import { getStorageMode } from '$config/storage.config';
import { backupConfig } from '$config/backup.config';
import {
  BACKUP_VERSION,
  type BackupFile,
  type RestoreRequest,
  type RestoreReport,
  createEmptyReport,
  validateBackupStructure,
  validateBackupLeads,
  validateBackupRequests,
} from '$lib/backup';
import type { LeadRecord, RequestRecord } from '$lib/domain/types';

/**
 * DEV-only guard
 */
function assertDevOnly() {
  if (!dev) {
    throw error(404, 'Not found');
  }
}

/**
 * GET /api/backup
 *
 * Create and return a backup file with all leads and requests.
 */
export const GET: RequestHandler = async () => {
  assertDevOnly();

  try {
    const repos = getRepositories();

    // Load all leads and requests
    const leads = await repos.leads.list({ limit: 100000 });
    const requests = await repos.requests.list({ limit: 100000 });

    // Build backup file
    const backup: BackupFile = {
      version: BACKUP_VERSION,
      generatedAt: new Date().toISOString(),
      storageMode: getStorageMode(),
      counts: {
        leads: leads.length,
        requests: requests.length,
      },
      leads,
      requests,
    };

    return json(backup);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    throw error(500, `Failed to create backup: ${message}`);
  }
};

/**
 * POST /api/backup
 *
 * Validate and/or restore from backup.
 *
 * Request body:
 * {
 *   mode: 'merge' | 'overwrite',
 *   dryRun: boolean,
 *   backup: BackupFile
 * }
 */
export const POST: RequestHandler = async ({ request }) => {
  assertDevOnly();

  // Check content length
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > backupConfig.limits.maxUploadBytes) {
    return json({
      success: false,
      error: 'File too large',
      maxBytes: backupConfig.limits.maxUploadBytes,
    }, { status: 413 });
  }

  let body: RestoreRequest;
  try {
    body = await request.json();
  } catch {
    return json({
      success: false,
      error: 'Invalid JSON',
    }, { status: 400 });
  }

  const { mode, dryRun, backup } = body;

  // Validate mode
  if (mode !== 'merge' && mode !== 'overwrite') {
    return json({
      success: false,
      error: 'Invalid mode. Must be "merge" or "overwrite".',
    }, { status: 400 });
  }

  // Initialize report
  const report = createEmptyReport(mode, dryRun);

  // Validate backup structure
  const structureErrors = validateBackupStructure(backup);
  if (structureErrors.length > 0) {
    report.success = false;
    report.errors = structureErrors;
    return json(report);
  }

  // Validate leads
  const leadErrors = validateBackupLeads(backup.leads);
  report.errors.push(...leadErrors);

  // Validate requests
  const requestErrors = validateBackupRequests(backup.requests);
  report.errors.push(...requestErrors);

  // Get repositories for collision detection
  const repos = getRepositories();

  // Detect collisions and compute stats
  const existingLeadIds = new Set<string>();
  const existingRequestIds = new Set<string>();

  try {
    // Get current data for collision detection
    const currentLeads = await repos.leads.list({ limit: 100000 });
    const currentRequests = await repos.requests.list({ limit: 100000 });

    for (const lead of currentLeads) {
      existingLeadIds.add(lead.id);
    }
    for (const request of currentRequests) {
      existingRequestIds.add(request.id);
    }

    // Compute stats for leads
    for (const lead of backup.leads) {
      if (existingLeadIds.has(lead.id)) {
        report.stats.updated.leads++;
        report.collisions.push({
          id: lead.id,
          kind: 'lead',
          existsInCurrent: true,
        });
      } else {
        report.stats.created.leads++;
      }
    }

    // Compute stats for requests
    for (const request of backup.requests) {
      if (existingRequestIds.has(request.id)) {
        report.stats.updated.requests++;
        report.collisions.push({
          id: request.id,
          kind: 'request',
          existsInCurrent: true,
        });
      } else {
        report.stats.created.requests++;
      }
    }

    // For overwrite mode, compute deleted counts
    if (mode === 'overwrite') {
      const backupLeadIds = new Set(backup.leads.map(l => l.id));
      const backupRequestIds = new Set(backup.requests.map(r => r.id));

      for (const id of existingLeadIds) {
        if (!backupLeadIds.has(id)) {
          report.stats.deleted.leads++;
        }
      }
      for (const id of existingRequestIds) {
        if (!backupRequestIds.has(id)) {
          report.stats.deleted.requests++;
        }
      }
    }

    // Update totals
    report.stats.created.total = report.stats.created.leads + report.stats.created.requests;
    report.stats.updated.total = report.stats.updated.leads + report.stats.updated.requests;
    report.stats.deleted.total = report.stats.deleted.leads + report.stats.deleted.requests;

    // Limit collisions in response
    report.collisions = report.collisions.slice(0, backupConfig.limits.maxPreviewItems);

    // If there are validation errors, don't apply
    if (report.errors.length > 0) {
      report.success = false;
      // Limit errors in response
      report.errors = report.errors.slice(0, backupConfig.limits.maxPreviewItems);
      return json(report);
    }

    // If dry run, return report without applying
    if (dryRun) {
      return json(report);
    }

    // Apply restore
    if (mode === 'overwrite') {
      // Clear all existing data first
      if (repos.leads.clearAll) {
        await repos.leads.clearAll();
      }
      if (repos.requests.clearAll) {
        await repos.requests.clearAll();
      }
    }

    // Bulk upsert leads
    await repos.leads.bulkUpsert(backup.leads);

    // Bulk upsert requests
    await repos.requests.bulkUpsert(backup.requests);

    // Mark as applied
    report.appliedAt = new Date().toISOString();
    report.success = true;

    return json(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    report.success = false;
    report.errors.push({
      code: 'INVALID_STRUCTURE',
      message: `Restore failed: ${message}`,
    });
    return json(report, { status: 500 });
  }
};
