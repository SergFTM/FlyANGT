/**
 * Retention Engine
 *
 * DEV-ONLY tool for identifying and archiving old records.
 * Computes record age, generates eligibility reports,
 * and applies archiving in batch.
 *
 * No cron in MVP - manual invocation only.
 */

import type { LeadRecord, RequestRecord, WorkflowStatus, SubmissionSource } from '$lib/domain/types';
import type { Repositories } from '$lib/domain/repositories';
import { retentionConfig, getBucketForAge, type AgeBucket } from '$config/retention.config';

/**
 * Combined record type for retention processing
 */
export type RetainableRecord = LeadRecord | RequestRecord;

/**
 * Retention criteria for filtering records
 */
export interface RetentionCriteria {
  /** Minimum age in days for eligibility */
  days: number;
  /** Whether to include 'new' status records */
  includeNew: boolean;
}

/**
 * Record with computed age information
 */
export interface AgedRecord {
  record: RetainableRecord;
  ageDays: number;
  bucket: AgeBucket | null;
}

/**
 * Retention report breakdown
 */
export interface RetentionReport {
  /** Total eligible records */
  eligibleCount: number;
  /** Records by source */
  bySource: Record<SubmissionSource, number>;
  /** Records by current status */
  byStatus: Record<WorkflowStatus, number>;
  /** Records by age bucket */
  byAge: Record<string, number>;
  /** Preview of eligible records (limited) */
  preview: AgedRecord[];
  /** Whether results are capped */
  capped: boolean;
  /** Applied criteria */
  criteria: RetentionCriteria;
}

/**
 * Result of applying retention
 */
export interface RetentionApplyResult {
  success: boolean;
  archivedCount: number;
  errors: string[];
}

/**
 * Calculate age in days from ISO date string
 */
export function calculateAgeDays(createdAt: string): number {
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

/**
 * Check if a record is eligible for retention based on criteria
 */
export function isEligibleForRetention(
  record: RetainableRecord,
  criteria: RetentionCriteria
): boolean {
  // Already archived - skip
  if (record.status === 'archived') {
    return false;
  }

  // Skip 'new' status unless explicitly included
  if (record.status === 'new' && !criteria.includeNew) {
    return false;
  }

  // Check age
  const ageDays = calculateAgeDays(record.createdAt);
  return ageDays >= criteria.days;
}

/**
 * Get all eligible records from both leads and requests
 */
export async function getEligibleRecords(
  repos: Repositories,
  criteria: RetentionCriteria
): Promise<AgedRecord[]> {
  // Fetch all records (no status filter - we filter manually)
  const [leads, requests] = await Promise.all([
    repos.leads.list(),
    repos.requests.list(),
  ]);

  // Combine and filter
  const allRecords: RetainableRecord[] = [...leads, ...requests];
  const eligible: AgedRecord[] = [];

  for (const record of allRecords) {
    if (isEligibleForRetention(record, criteria)) {
      const ageDays = calculateAgeDays(record.createdAt);
      const bucket = getBucketForAge(ageDays);
      eligible.push({ record, ageDays, bucket });
    }
  }

  // Sort by age (oldest first)
  eligible.sort((a, b) => b.ageDays - a.ageDays);

  return eligible;
}

/**
 * Generate a retention report (dry run)
 */
export async function generateRetentionReport(
  repos: Repositories,
  criteria: RetentionCriteria
): Promise<RetentionReport> {
  const eligible = await getEligibleRecords(repos, criteria);

  // Initialize counters
  const bySource: Record<SubmissionSource, number> = {
    presale: 0,
    configurator_quote: 0,
    partners: 0,
    investors_deck: 0,
    customers_docs: 0,
  };

  const byStatus: Record<WorkflowStatus, number> = {
    new: 0,
    reviewed: 0,
    contacted: 0,
    closed: 0,
    archived: 0,
  };

  const byAge: Record<string, number> = {};
  for (const bucket of retentionConfig.buckets) {
    byAge[bucket.id] = 0;
  }

  // Count records
  for (const { record, bucket } of eligible) {
    bySource[record.source]++;
    byStatus[record.status]++;
    if (bucket) {
      byAge[bucket.id]++;
    }
  }

  // Check if results are capped
  const capped = eligible.length > retentionConfig.limits.maxApply;

  // Create preview (limited)
  const preview = eligible.slice(0, retentionConfig.limits.previewItems);

  return {
    eligibleCount: eligible.length,
    bySource,
    byStatus,
    byAge,
    preview,
    capped,
    criteria,
  };
}

/**
 * Apply retention (archive eligible records)
 */
export async function applyRetention(
  repos: Repositories,
  criteria: RetentionCriteria
): Promise<RetentionApplyResult> {
  const eligible = await getEligibleRecords(repos, criteria);
  const errors: string[] = [];

  // Safety check: too many records
  if (eligible.length > retentionConfig.limits.maxApply) {
    return {
      success: false,
      archivedCount: 0,
      errors: [`Too many records (${eligible.length}). Maximum is ${retentionConfig.limits.maxApply}. Use stricter filters.`],
    };
  }

  let archivedCount = 0;

  for (const { record } of eligible) {
    try {
      if (record.kind === 'lead') {
        await repos.leads.update(record.id, { status: 'archived' });
      } else {
        await repos.requests.update(record.id, { status: 'archived' });
      }
      archivedCount++;
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`Failed to archive ${record.id}: ${msg}`);
    }
  }

  return {
    success: errors.length === 0,
    archivedCount,
    errors,
  };
}

/**
 * Get default retention criteria from config
 */
export function getDefaultCriteria(): RetentionCriteria {
  return {
    days: retentionConfig.defaults.days,
    includeNew: retentionConfig.defaults.includeNew,
  };
}

/**
 * Validate retention criteria
 */
export function validateCriteria(input: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Invalid criteria input'] };
  }

  const data = input as Record<string, unknown>;

  // Validate days
  if (typeof data.days !== 'number' || data.days < 0 || !Number.isInteger(data.days)) {
    errors.push('Days must be a non-negative integer');
  }

  // Validate includeNew
  if (typeof data.includeNew !== 'boolean') {
    errors.push('includeNew must be a boolean');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
