/**
 * Export Center Configuration
 *
 * Dev tool only.
 * Used for release packaging and QA smoke testing.
 */

/**
 * Export artifact identifiers
 */
export type ExportArtifactId = 'snapshot' | 'release' | 'i18n' | 'smoke' | 'bundle';

/**
 * Export artifact configuration
 */
export interface ExportArtifact {
  id: ExportArtifactId;
  titleKey: string;
  textKey: string;
  enabled: boolean;
  filePrefix: string;
}

/**
 * Smoke test configuration
 */
export interface ExportSmokeConfig {
  maxLinks: number;
  includeNavVisibleOnly: boolean;
  excludeRouteIds: string[];
  excludePathPrefixes: string[];
}

/**
 * Storage configuration
 */
export interface ExportStorageConfig {
  releaseKeyFromConfig: boolean;
}

/**
 * Complete export configuration
 */
export interface ExportConfig {
  enabled: boolean;
  artifacts: ExportArtifact[];
  smoke: ExportSmokeConfig;
  storage: ExportStorageConfig;
}

/**
 * Default export configuration
 */
export const exportConfig: ExportConfig = {
  // Export center enabled in dev mode
  enabled: true,

  // Available export artifacts
  artifacts: [
    {
      id: 'snapshot',
      titleKey: 'export.artifact.snapshot.title',
      textKey: 'export.artifact.snapshot.text',
      enabled: true,
      filePrefix: 'flyangt-snapshot',
    },
    {
      id: 'release',
      titleKey: 'export.artifact.release.title',
      textKey: 'export.artifact.release.text',
      enabled: true,
      filePrefix: 'flyangt-release',
    },
    {
      id: 'i18n',
      titleKey: 'export.artifact.i18n.title',
      textKey: 'export.artifact.i18n.text',
      enabled: true,
      filePrefix: 'flyangt-i18n-report',
    },
    {
      id: 'smoke',
      titleKey: 'export.artifact.smoke.title',
      textKey: 'export.artifact.smoke.text',
      enabled: true,
      filePrefix: 'flyangt-smoke-links',
    },
    {
      id: 'bundle',
      titleKey: 'export.artifact.bundle.title',
      textKey: 'export.artifact.bundle.text',
      enabled: true,
      filePrefix: 'flyangt-export-bundle',
    },
  ],

  // Smoke test link generation settings
  smoke: {
    maxLinks: 30,
    includeNavVisibleOnly: false,
    // Exclude dev tool routes from smoke testing
    excludeRouteIds: ['i18n_audit', 'release', 'snapshot', 'export'],
    // Exclude dynamic routes and dashboard children
    excludePathPrefixes: [
      '/trust/',
      '/partners/',
      '/workflow/',
      '/dashboard/',
    ],
  },

  // Storage settings
  storage: {
    releaseKeyFromConfig: true,
  },
};

/**
 * Get artifact by id
 */
export function getArtifact(id: ExportArtifactId): ExportArtifact | undefined {
  return exportConfig.artifacts.find(a => a.id === id);
}

/**
 * Get enabled artifacts
 */
export function getEnabledArtifacts(): ExportArtifact[] {
  return exportConfig.artifacts.filter(a => a.enabled);
}
