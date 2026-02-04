/**
 * Retention API Endpoint
 *
 * DEV-ONLY API for retention and archiving operations.
 * Returns 404 in production.
 *
 * GET: Generate retention report (dry run)
 * POST: Apply retention (archive eligible records)
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { dev } from '$app/environment';
import { getRepositories } from '$lib/adapters';
import { retentionConfig } from '$config/retention.config';
import {
  generateRetentionReport,
  applyRetention,
  validateCriteria,
  getDefaultCriteria,
  type RetentionCriteria,
} from '$lib/retention/engine';

/**
 * DEV-only guard
 */
function assertDevOnly() {
  if (!dev) {
    throw error(404, 'Not found');
  }
}

/**
 * Parse criteria from query params
 */
function parseCriteriaFromParams(url: URL): RetentionCriteria {
  const defaults = getDefaultCriteria();

  const daysParam = url.searchParams.get('days');
  const includeNewParam = url.searchParams.get('includeNew');

  return {
    days: daysParam !== null ? parseInt(daysParam, 10) : defaults.days,
    includeNew: includeNewParam !== null ? includeNewParam === 'true' : defaults.includeNew,
  };
}

/**
 * GET /api/retention
 *
 * Generate retention report (preview/dry run).
 *
 * Query params:
 * - days: number (default: 30)
 * - includeNew: boolean (default: false)
 */
export const GET: RequestHandler = async ({ url }) => {
  assertDevOnly();

  try {
    const criteria = parseCriteriaFromParams(url);

    // Validate criteria
    const validation = validateCriteria(criteria);
    if (!validation.valid) {
      return json({
        success: false,
        error: 'Invalid criteria',
        errors: validation.errors,
      }, { status: 400 });
    }

    const repos = getRepositories();
    const report = await generateRetentionReport(repos, criteria);

    return json({
      success: true,
      report,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    throw error(500, `Failed to generate retention report: ${message}`);
  }
};

/**
 * POST /api/retention
 *
 * Apply retention (archive eligible records).
 *
 * Request body:
 * {
 *   days: number,
 *   includeNew: boolean,
 *   confirm: boolean (must be true to proceed)
 * }
 */
export const POST: RequestHandler = async ({ request }) => {
  assertDevOnly();

  let body: {
    days?: number;
    includeNew?: boolean;
    confirm?: boolean;
  };

  try {
    body = await request.json();
  } catch {
    return json({
      success: false,
      error: 'Invalid JSON',
    }, { status: 400 });
  }

  // Require explicit confirmation
  if (body.confirm !== true) {
    return json({
      success: false,
      error: 'Confirmation required. Set confirm: true to proceed.',
    }, { status: 400 });
  }

  const defaults = getDefaultCriteria();
  const criteria: RetentionCriteria = {
    days: typeof body.days === 'number' ? body.days : defaults.days,
    includeNew: typeof body.includeNew === 'boolean' ? body.includeNew : defaults.includeNew,
  };

  // Validate criteria
  const validation = validateCriteria(criteria);
  if (!validation.valid) {
    return json({
      success: false,
      error: 'Invalid criteria',
      errors: validation.errors,
    }, { status: 400 });
  }

  try {
    const repos = getRepositories();

    // First, generate report for count check
    const report = await generateRetentionReport(repos, criteria);

    // Check safety cap
    if (report.eligibleCount > retentionConfig.limits.maxApply) {
      return json({
        success: false,
        error: `Too many records (${report.eligibleCount}). Maximum is ${retentionConfig.limits.maxApply}. Use stricter filters.`,
        report,
      }, { status: 400 });
    }

    // Apply retention
    const result = await applyRetention(repos, criteria);

    return json({
      success: result.success,
      archivedCount: result.archivedCount,
      errors: result.errors,
      criteria,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    throw error(500, `Failed to apply retention: ${message}`);
  }
};
