/**
 * Prelaunch Lock Helpers
 *
 * Pure utility functions for prelaunch mode checks.
 * Used to determine draft storage behavior during content lock.
 */

import type { PrelaunchConfig } from '$config/prelaunch.config';

/**
 * Check if prelaunch mode is locked
 */
export function isLocked(config: PrelaunchConfig): boolean {
  return config.mode === 'locked';
}

/**
 * Resolve the effective storage key for drafts
 *
 * When locked with namespace behavior, prefixes the key
 * to separate dev drafts from production data.
 */
export function resolveDraftKey(baseKey: string, config: PrelaunchConfig): string {
  if (config.mode === 'locked' && config.drafts.behavior === 'namespace') {
    return `${config.drafts.namespacePrefix}${baseKey}`;
  }
  return baseKey;
}

/**
 * Check if draft writes should be blocked entirely
 *
 * Returns true when locked with block behavior.
 * When true, forms should not write to storage and
 * should show a user-friendly message.
 */
export function shouldBlockDraftWrites(config: PrelaunchConfig): boolean {
  return config.mode === 'locked' && config.drafts.behavior === 'block';
}

/**
 * Check if prelaunch banner should be visible
 *
 * Only shows in dev mode when locked and enabled.
 */
export function shouldShowBanner(config: PrelaunchConfig, isDev: boolean): boolean {
  return isDev && config.mode === 'locked' && config.banner.enabledInDev;
}

/**
 * Check if snapshot tool is available
 *
 * Only available in dev mode when enabled.
 */
export function isSnapshotEnabled(config: PrelaunchConfig, isDev: boolean): boolean {
  return isDev && config.snapshot.enabledInDev;
}
