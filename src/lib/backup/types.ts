/**
 * Backup Types
 *
 * Type definitions for backup file structure and restore operations.
 */

import type { LeadRecord, RequestRecord } from '$lib/domain/types';
import type { StorageMode } from '$config/storage.config';
import type { RestoreMode } from '$config/backup.config';

/**
 * Backup file format version
 */
export const BACKUP_VERSION = 1;

/**
 * Backup file structure
 */
export interface BackupFile {
  /** Format version (always 1 for now) */
  version: typeof BACKUP_VERSION;
  /** ISO timestamp when backup was created */
  generatedAt: string;
  /** Storage mode when backup was created */
  storageMode: StorageMode;
  /** Record counts */
  counts: {
    leads: number;
    requests: number;
  };
  /** All lead records */
  leads: LeadRecord[];
  /** All request records */
  requests: RequestRecord[];
}

/**
 * Validation error for backup restore
 */
export interface BackupValidationError {
  /** Error code */
  code: 'INVALID_VERSION' | 'MISSING_FIELD' | 'INVALID_STRUCTURE' | 'DUPLICATE_ID' | 'INVALID_STATUS' | 'INVALID_EMAIL' | 'SIZE_LIMIT';
  /** Human-readable message */
  message: string;
  /** Related record id if applicable */
  recordId?: string;
  /** Related field if applicable */
  field?: string;
}

/**
 * Collision detected during restore
 */
export interface BackupCollision {
  /** Record id that collides */
  id: string;
  /** Entity type */
  kind: 'lead' | 'request';
  /** Whether record exists in current storage */
  existsInCurrent: boolean;
}

/**
 * Restore operation request
 */
export interface RestoreRequest {
  /** Restore mode */
  mode: RestoreMode;
  /** Whether to perform dry run (preview only) */
  dryRun: boolean;
  /** Backup data to restore */
  backup: BackupFile;
}

/**
 * Restore operation report
 */
export interface RestoreReport {
  /** Whether operation was successful */
  success: boolean;
  /** Whether this was a dry run */
  dryRun: boolean;
  /** Restore mode used */
  mode: RestoreMode;
  /** Timestamp of operation */
  timestamp: string;
  /** Applied timestamp (only if not dry run) */
  appliedAt?: string;
  /** Statistics */
  stats: {
    /** Records that will be/were created */
    created: {
      leads: number;
      requests: number;
      total: number;
    };
    /** Records that will be/were updated */
    updated: {
      leads: number;
      requests: number;
      total: number;
    };
    /** Records that will be/were deleted (overwrite mode only) */
    deleted: {
      leads: number;
      requests: number;
      total: number;
    };
  };
  /** Collisions found */
  collisions: BackupCollision[];
  /** Validation errors */
  errors: BackupValidationError[];
}

/**
 * Create an empty restore report
 */
export function createEmptyReport(mode: RestoreMode, dryRun: boolean): RestoreReport {
  return {
    success: true,
    dryRun,
    mode,
    timestamp: new Date().toISOString(),
    stats: {
      created: { leads: 0, requests: 0, total: 0 },
      updated: { leads: 0, requests: 0, total: 0 },
      deleted: { leads: 0, requests: 0, total: 0 },
    },
    collisions: [],
    errors: [],
  };
}

/**
 * Validate backup file structure
 */
export function validateBackupStructure(data: unknown): BackupValidationError[] {
  const errors: BackupValidationError[] = [];

  if (!data || typeof data !== 'object') {
    errors.push({ code: 'INVALID_STRUCTURE', message: 'Backup must be a valid object' });
    return errors;
  }

  const backup = data as Record<string, unknown>;

  // Version check
  if (backup.version !== BACKUP_VERSION) {
    errors.push({
      code: 'INVALID_VERSION',
      message: `Invalid version. Expected ${BACKUP_VERSION}, got ${backup.version}`,
    });
  }

  // Required fields
  if (!backup.generatedAt || typeof backup.generatedAt !== 'string') {
    errors.push({ code: 'MISSING_FIELD', message: 'Missing generatedAt field', field: 'generatedAt' });
  }

  if (!backup.storageMode || (backup.storageMode !== 'config' && backup.storageMode !== 'prisma')) {
    errors.push({ code: 'MISSING_FIELD', message: 'Invalid or missing storageMode field', field: 'storageMode' });
  }

  if (!backup.counts || typeof backup.counts !== 'object') {
    errors.push({ code: 'MISSING_FIELD', message: 'Missing counts field', field: 'counts' });
  }

  if (!Array.isArray(backup.leads)) {
    errors.push({ code: 'MISSING_FIELD', message: 'leads must be an array', field: 'leads' });
  }

  if (!Array.isArray(backup.requests)) {
    errors.push({ code: 'MISSING_FIELD', message: 'requests must be an array', field: 'requests' });
  }

  return errors;
}

/**
 * Validate lead records in backup
 */
export function validateBackupLeads(leads: LeadRecord[]): BackupValidationError[] {
  const errors: BackupValidationError[] = [];
  const seenIds = new Set<string>();

  const validStatuses = ['new', 'reviewed', 'contacted', 'closed', 'archived'];

  for (const lead of leads) {
    // Check for duplicate IDs
    if (seenIds.has(lead.id)) {
      errors.push({
        code: 'DUPLICATE_ID',
        message: `Duplicate lead ID: ${lead.id}`,
        recordId: lead.id,
      });
    }
    seenIds.add(lead.id);

    // Validate status
    if (lead.status && !validStatuses.includes(lead.status)) {
      errors.push({
        code: 'INVALID_STATUS',
        message: `Invalid status "${lead.status}" for lead ${lead.id}`,
        recordId: lead.id,
        field: 'status',
      });
    }

    // Validate email format (basic check)
    if (lead.email && typeof lead.email === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(lead.email.trim())) {
        errors.push({
          code: 'INVALID_EMAIL',
          message: `Invalid email format for lead ${lead.id}`,
          recordId: lead.id,
          field: 'email',
        });
      }
    }
  }

  return errors;
}

/**
 * Validate request records in backup
 */
export function validateBackupRequests(requests: RequestRecord[]): BackupValidationError[] {
  const errors: BackupValidationError[] = [];
  const seenIds = new Set<string>();

  const validStatuses = ['new', 'reviewed', 'contacted', 'closed', 'archived'];

  for (const request of requests) {
    // Check for duplicate IDs
    if (seenIds.has(request.id)) {
      errors.push({
        code: 'DUPLICATE_ID',
        message: `Duplicate request ID: ${request.id}`,
        recordId: request.id,
      });
    }
    seenIds.add(request.id);

    // Validate status
    if (request.status && !validStatuses.includes(request.status)) {
      errors.push({
        code: 'INVALID_STATUS',
        message: `Invalid status "${request.status}" for request ${request.id}`,
        recordId: request.id,
        field: 'status',
      });
    }
  }

  return errors;
}
