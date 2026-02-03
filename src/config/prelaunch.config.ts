/**
 * Prelaunch Configuration
 *
 * Controls content lock mode for prelaunch hardening.
 * Prelaunch lock prevents accidental content changes.
 * Drafts are redirected or blocked during lock.
 */

/**
 * Prelaunch mode
 * - 'open': Normal operation, all writes allowed
 * - 'locked': Content locked, drafts redirected or blocked
 */
export type PrelaunchMode = 'open' | 'locked';

/**
 * Draft write behavior when locked
 * - 'block': Prevent writes entirely with user message
 * - 'namespace': Write to separate dev storage namespace
 */
export type DraftBehavior = 'block' | 'namespace';

/**
 * Banner configuration for locked mode
 */
export interface PrelaunchBannerConfig {
  enabledInDev: boolean;
  messageKey: string;
}

/**
 * Draft handling configuration
 */
export interface PrelaunchDraftsConfig {
  behavior: DraftBehavior;
  namespacePrefix: string;
  blockedMessageKey: string;
}

/**
 * Snapshot export configuration
 */
export interface PrelaunchSnapshotConfig {
  enabledInDev: boolean;
  exportFilePrefix: string;
}

/**
 * Complete prelaunch configuration
 */
export interface PrelaunchConfig {
  mode: PrelaunchMode;
  banner: PrelaunchBannerConfig;
  drafts: PrelaunchDraftsConfig;
  snapshot: PrelaunchSnapshotConfig;
}

/**
 * Default prelaunch configuration
 */
export const prelaunchConfig: PrelaunchConfig = {
  // Current mode - set to 'locked' before launch
  mode: 'open',

  // Banner shown in dev mode when locked
  banner: {
    enabledInDev: true,
    messageKey: 'prelaunch.banner',
  },

  // Draft storage behavior when locked
  drafts: {
    behavior: 'namespace', // Safer than blocking - redirects to dev namespace
    namespacePrefix: 'devlock:',
    blockedMessageKey: 'prelaunch.draftsBlockedText',
  },

  // Snapshot export tool
  snapshot: {
    enabledInDev: true,
    exportFilePrefix: 'flyangt-snapshot',
  },
};
