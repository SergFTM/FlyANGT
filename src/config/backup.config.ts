/**
 * Backup Configuration
 *
 * DEV-ONLY backup and restore tool settings.
 * Used for creating and restoring data backups.
 */

/**
 * Restore mode options
 * - merge: Upsert records by id (existing ids overwritten, new ids created)
 * - overwrite: Clear all data and restore exactly from backup
 */
export type RestoreMode = 'merge' | 'overwrite';

/**
 * Backup configuration
 */
export interface BackupConfig {
  enabled: boolean;
  devOnly: boolean;
  exportFilePrefix: string;
  limits: {
    /** Maximum upload size in bytes */
    maxUploadBytes: number;
    /** Maximum items to show in preview */
    maxPreviewItems: number;
  };
  defaults: {
    /** Default restore mode */
    restoreMode: RestoreMode;
    /** Default dry run setting */
    dryRun: boolean;
  };
  links: {
    adminPath: string;
    migratePath: string;
  };
}

/**
 * Default backup configuration
 */
export const backupConfig: BackupConfig = {
  // Backup tool enabled
  enabled: true,

  // Only available in development mode
  devOnly: true,

  // Export file naming prefix
  exportFilePrefix: 'flyangt-backup',

  // Limits
  limits: {
    // Max 2MB upload
    maxUploadBytes: 2_000_000,
    // Max 30 items in preview lists
    maxPreviewItems: 30,
  },

  // Default settings
  defaults: {
    // Default to merge mode (safer)
    restoreMode: 'merge',
    // Default to dry run (preview before apply)
    dryRun: true,
  },

  // Related tool links
  links: {
    adminPath: '/admin',
    migratePath: '/migrate',
  },
};

/**
 * Validate restore mode
 */
export function isValidRestoreMode(mode: unknown): mode is RestoreMode {
  return mode === 'merge' || mode === 'overwrite';
}

/**
 * Get restore mode options
 */
export function getRestoreModeOptions(): RestoreMode[] {
  return ['merge', 'overwrite'];
}
