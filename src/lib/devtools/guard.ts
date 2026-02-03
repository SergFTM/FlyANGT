/**
 * Dev Tools Guard
 *
 * Unified access control for all dev tools routes.
 * Process and visibility gate only - not a security boundary.
 */

import { error } from '@sveltejs/kit';
import type { GateConfig } from '$config/gate.config';

/**
 * Assert that a dev tool route is allowed to be accessed.
 * Throws 404 error if access is not allowed.
 *
 * @param urlPathname - The URL pathname being accessed
 * @param gateConfig - The gate configuration
 * @throws 404 error if access is not allowed
 */
export function assertDevToolAllowed(urlPathname: string, gateConfig: GateConfig): void {
  // Block in production if configured
  if (import.meta.env.PROD && gateConfig.guard.blockInProd) {
    throw error(404, 'Not found');
  }

  // Block if dev-only and not in dev mode
  if (gateConfig.devOnly && !import.meta.env.DEV) {
    throw error(404, 'Not found');
  }

  // Block if path is not in allowed paths
  if (!gateConfig.guard.allowedPaths.includes(urlPathname)) {
    throw error(404, 'Not found');
  }
}

/**
 * Check if dev tools are available in the current environment.
 *
 * @param gateConfig - The gate configuration
 * @returns true if dev tools are available
 */
export function isDevToolsAvailable(gateConfig: GateConfig): boolean {
  // Not available in production if configured to block
  if (import.meta.env.PROD && gateConfig.guard.blockInProd) {
    return false;
  }

  // Not available if dev-only and not in dev mode
  if (gateConfig.devOnly && !import.meta.env.DEV) {
    return false;
  }

  return gateConfig.enabled;
}
