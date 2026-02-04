/**
 * Migration Prep Configuration
 *
 * DEV-ONLY migration preparation tool settings.
 * Used for exporting data in formats ready for Prisma/Postgres migration.
 */

/**
 * Migration configuration
 */
export interface MigrateConfig {
  enabled: boolean;
  devOnly: boolean;
  exportFilePrefix: string;
  limits: {
    maxNotesLen: number;
    maxRecordsPreview: number;
  };
  include: {
    leads: boolean;
    requests: boolean;
    notes: boolean;
    tags: boolean;
  };
  links: {
    adminPath: string;
    publishPath: string;
  };
}

/**
 * Default migration configuration
 */
export const migrateConfig: MigrateConfig = {
  // Migration tool enabled
  enabled: true,

  // Only available in development mode
  devOnly: true,

  // Export file naming prefix
  exportFilePrefix: 'flyangt-migrate',

  // Limits for validation and preview
  limits: {
    // Max note text length before flagging as oversized
    maxNotesLen: 2000,
    // Max records to show in preview tables
    maxRecordsPreview: 50,
  },

  // What to include in exports
  include: {
    leads: true,
    requests: true,
    notes: true,
    tags: true,
  },

  // Related tool links
  links: {
    adminPath: '/admin',
    publishPath: '/publish',
  },
};

/**
 * Artifact types for export
 */
export type MigrateArtifactId = 'raw' | 'seed' | 'validation' | 'map' | 'map-md';

/**
 * Get all artifact IDs
 */
export function getMigrateArtifactIds(): MigrateArtifactId[] {
  return ['raw', 'seed', 'validation', 'map', 'map-md'];
}
