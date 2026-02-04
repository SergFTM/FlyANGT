/**
 * Retention Configuration
 *
 * DEV-ONLY retention and archiving tool settings.
 * Used for archiving old records based on age.
 *
 * Dev tool only, manual retention.
 * No cron in MVP.
 */

/**
 * Age bucket for grouping records
 */
export interface AgeBucket {
  id: string;
  minDays: number;
  maxDays?: number;
  titleKey: string;
}

/**
 * Retention configuration
 */
export interface RetentionConfig {
  enabled: boolean;
  devOnly: boolean;
  defaults: {
    /** Default number of days for retention */
    days: number;
    /** Whether to include 'new' status records */
    includeNew: boolean;
    /** Default to dry run (preview) */
    dryRun: boolean;
  };
  buckets: AgeBucket[];
  limits: {
    /** Max items to show in preview */
    previewItems: number;
    /** Safety cap for max records to archive at once */
    maxApply: number;
  };
}

/**
 * Default retention configuration
 */
export const retentionConfig: RetentionConfig = {
  // Retention tool enabled
  enabled: true,

  // Only available in development mode
  devOnly: true,

  // Default settings
  defaults: {
    // Archive records older than 30 days
    days: 30,
    // Exclude 'new' status by default (safer)
    includeNew: false,
    // Default to dry run mode
    dryRun: true,
  },

  // Age buckets for grouping
  buckets: [
    { id: 'b0_7', minDays: 0, maxDays: 7, titleKey: 'retention.bucket.b0_7' },
    { id: 'b8_30', minDays: 8, maxDays: 30, titleKey: 'retention.bucket.b8_30' },
    { id: 'b31_90', minDays: 31, maxDays: 90, titleKey: 'retention.bucket.b31_90' },
    { id: 'b90', minDays: 91, titleKey: 'retention.bucket.b90' },
  ],

  // Limits
  limits: {
    // Max items to show in preview
    previewItems: 20,
    // Safety cap: max records to archive at once
    maxApply: 500,
  },
};

/**
 * Get bucket for a given age in days
 */
export function getBucketForAge(ageDays: number): AgeBucket | null {
  for (const bucket of retentionConfig.buckets) {
    const minOk = ageDays >= bucket.minDays;
    const maxOk = bucket.maxDays === undefined || ageDays <= bucket.maxDays;
    if (minOk && maxOk) {
      return bucket;
    }
  }
  return null;
}

/**
 * Get all bucket IDs
 */
export function getBucketIds(): string[] {
  return retentionConfig.buckets.map(b => b.id);
}
