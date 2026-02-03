/**
 * Release Candidate (RC) Configuration
 *
 * Dev tool only.
 * LocalStorage based RC history.
 *
 * Captures snapshots of app state at specific points in time
 * for release candidate tracking and comparison.
 */

/**
 * RC artifact identifiers
 */
export type RcArtifactId = 'snapshot' | 'bundle' | 'release' | 'smoke' | 'gate';

/**
 * RC artifact configuration
 */
export interface RcArtifact {
  id: RcArtifactId;
  enabled: boolean;
}

/**
 * RC ID generation configuration
 */
export interface RcIdConfig {
  prefix: string;
  strategy: 'timestamp' | 'random';
}

/**
 * RC limits configuration
 */
export interface RcLimitsConfig {
  maxRecords: number;
}

/**
 * RC links configuration
 */
export interface RcLinksConfig {
  gatePath: string;
  exportPath: string;
  releasePath: string;
  smokePath: string;
  snapshotPath: string;
}

/**
 * Complete RC configuration
 */
export interface RcConfig {
  enabled: boolean;
  storageKey: string;
  selectedKey: string;
  exportFilePrefix: string;
  id: RcIdConfig;
  artifacts: RcArtifact[];
  limits: RcLimitsConfig;
  links: RcLinksConfig;
}

/**
 * Default RC configuration
 *
 * Dev tool only.
 * LocalStorage based RC history.
 */
export const rcConfig: RcConfig = {
  // RC manager enabled
  enabled: true,

  // LocalStorage keys
  storageKey: 'flyangt_rc_records',
  selectedKey: 'flyangt_rc_selected',

  // Export file prefix
  exportFilePrefix: 'flyangt-rc',

  // ID generation settings
  id: {
    prefix: 'RC',
    strategy: 'timestamp',
  },

  // Available artifacts
  artifacts: [
    { id: 'snapshot', enabled: true },
    { id: 'bundle', enabled: true },
    { id: 'release', enabled: true },
    { id: 'smoke', enabled: true },
    { id: 'gate', enabled: true },
  ],

  // Storage limits
  limits: {
    maxRecords: 20,
  },

  // Related dev tool links
  links: {
    gatePath: '/gate',
    exportPath: '/export',
    releasePath: '/release',
    smokePath: '/smoke',
    snapshotPath: '/snapshot',
  },
};

/**
 * Get artifact config by id
 */
export function getRcArtifact(id: RcArtifactId): RcArtifact | undefined {
  return rcConfig.artifacts.find(a => a.id === id);
}

/**
 * Get enabled artifacts
 */
export function getEnabledRcArtifacts(): RcArtifact[] {
  return rcConfig.artifacts.filter(a => a.enabled);
}

/**
 * Check if artifact is enabled
 */
export function isRcArtifactEnabled(id: RcArtifactId): boolean {
  const artifact = getRcArtifact(id);
  return artifact?.enabled ?? false;
}
