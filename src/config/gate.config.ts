/**
 * Gate Configuration
 *
 * Process and visibility gate only.
 * Not a security boundary.
 *
 * Provides unified configuration for dev tools access
 * and prelaunch readiness checks.
 */

/**
 * Gate status levels
 */
export type GateStatus = 'green' | 'yellow' | 'red';

/**
 * Guard configuration
 */
export interface GateGuardConfig {
  blockInProd: boolean;
  allowedPaths: string[];
}

/**
 * Threshold configuration for P0 status evaluation
 */
export interface GateThresholdsConfig {
  p0BlockedStatus: 'blocked' | 'fail';
  p0TodoStatuses: string[];
}

/**
 * Banner configuration
 */
export interface GateBannerConfig {
  enabledInDev: boolean;
  messageKey: string;
}

/**
 * Links configuration
 */
export interface GateLinksConfig {
  gatePath: string;
  releasePath: string;
  smokePath: string;
  exportPath: string;
  snapshotPath: string;
  i18nAuditPath: string;
}

/**
 * Complete gate configuration
 */
export interface GateConfig {
  enabled: boolean;
  devOnly: boolean;
  guard: GateGuardConfig;
  thresholds: GateThresholdsConfig;
  banner: GateBannerConfig;
  links: GateLinksConfig;
}

/**
 * Default gate configuration
 *
 * Process and visibility gate only.
 * Not a security boundary.
 */
export const gateConfig: GateConfig = {
  // Gate system enabled
  enabled: true,

  // Only available in development mode
  devOnly: true,

  // Guard settings for dev tools access
  guard: {
    // Block all dev tools in production builds
    blockInProd: true,
    // Paths that are allowed through the guard
    allowedPaths: [
      '/i18n-audit',
      '/release',
      '/snapshot',
      '/export',
      '/smoke',
      '/gate',
      '/rc',
      '/rc-compare',
      '/changelog',
      '/release-notes',
      '/publish',
      '/post-release',
      '/leads',
      '/admin',
      '/migrate',
      '/backup',
      '/retention',
    ],
  },

  // Thresholds for P0 status evaluation
  thresholds: {
    // Status that indicates a blocked P0 item
    p0BlockedStatus: 'blocked',
    // Statuses that indicate an open (not done) P0 item
    p0TodoStatuses: ['todo', 'in_progress'],
  },

  // Banner settings
  banner: {
    // Show banner in dev mode when P0 items are open
    enabledInDev: true,
    // i18n key for banner message
    messageKey: 'gate.banner.message',
  },

  // Quick links to dev tools
  links: {
    gatePath: '/gate',
    releasePath: '/release',
    smokePath: '/smoke',
    exportPath: '/export',
    snapshotPath: '/snapshot',
    i18nAuditPath: '/i18n-audit',
  },
};

/**
 * Check if a path is in the allowed dev tools paths
 */
export function isAllowedDevToolPath(pathname: string): boolean {
  return gateConfig.guard.allowedPaths.includes(pathname);
}

/**
 * Get all dev tool paths
 */
export function getDevToolPaths(): string[] {
  return [...gateConfig.guard.allowedPaths];
}
