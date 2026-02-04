/**
 * Storage Configuration
 *
 * Controls the data storage mode for the application.
 *
 * IMPORTANT:
 * - MVP must remain in "config" mode (file-based storage)
 * - Switch to "prisma" only after hosting handover and DB setup
 * - See migration guide before changing mode
 */

/**
 * Available storage modes
 * - config: File-based config DB (MVP)
 * - prisma: PostgreSQL via Prisma (post-MVP migration)
 */
export type StorageMode = 'config' | 'prisma';

/**
 * Storage configuration
 */
export interface StorageConfig {
  /**
   * Current storage mode
   * - "config": File-based storage (default for MVP)
   * - "prisma": Postgres via Prisma (requires migration)
   */
  mode: StorageMode;

  /**
   * Documentation and constraint notes
   */
  notes: {
    /**
     * Constraint reminder for MVP
     */
    mvpConstraint: string;

    /**
     * Path to migration documentation
     */
    migrationDocPath: string;
  };
}

/**
 * Default storage configuration
 *
 * MVP must remain in "config" mode.
 * Do not change to "prisma" until:
 * 1. PostgreSQL instance is available
 * 2. Prisma is installed and configured
 * 3. Data migration is complete
 * 4. Hosting handover is finalized
 */
export const storageConfig: StorageConfig = {
  // MVP: File-based config DB
  // Change to 'prisma' only after migration is complete
  mode: 'config',

  notes: {
    mvpConstraint: 'MVP must remain in config mode. Do not switch to prisma until hosting handover.',
    migrationDocPath: '/docs/migration/PRISMA_POSTGRES_BLUEPRINT.md',
  },
};

/**
 * Check if storage mode is config (file-based)
 */
export function isConfigMode(): boolean {
  return storageConfig.mode === 'config';
}

/**
 * Check if storage mode is prisma
 */
export function isPrismaMode(): boolean {
  return storageConfig.mode === 'prisma';
}

/**
 * Get current storage mode
 */
export function getStorageMode(): StorageMode {
  return storageConfig.mode;
}

/**
 * Validate storage mode is supported
 */
export function isValidStorageMode(mode: unknown): mode is StorageMode {
  return mode === 'config' || mode === 'prisma';
}
