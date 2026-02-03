/**
 * Release Checklist Data Model
 *
 * Types and helper functions for release checklist state.
 * Dev tool only.
 */

import type {
  ReleaseConfig,
  ReleaseModule,
  ReleaseStatus,
} from '$config/release.config';

/**
 * State for a single checklist item
 */
export interface ReleaseItemState {
  status: ReleaseStatus;
  notes: string;
  updatedAt: string;
}

/**
 * Complete release state (keyed by check ID)
 */
export type ReleaseState = Record<string, ReleaseItemState>;

/**
 * Progress calculation result
 */
export interface ReleaseProgress {
  done: number;
  total: number;
  pct: number;
}

/**
 * Create default state from config
 */
export function makeDefaultState(config: ReleaseConfig): ReleaseState {
  const state: ReleaseState = {};

  for (const mod of config.modules) {
    for (const check of mod.checks) {
      state[check.id] = {
        status: check.statusDefault,
        notes: '',
        updatedAt: new Date().toISOString(),
      };
    }
  }

  return state;
}

/**
 * Merge stored state with defaults
 * Ensures new checks appear in state
 */
export function mergeState(
  defaultState: ReleaseState,
  storedState: ReleaseState | null
): ReleaseState {
  if (!storedState) {
    return defaultState;
  }

  const merged: ReleaseState = { ...defaultState };

  // Override with stored values where they exist
  for (const [id, itemState] of Object.entries(storedState)) {
    if (id in merged) {
      merged[id] = {
        ...merged[id],
        ...itemState,
      };
    }
  }

  return merged;
}

/**
 * Compute progress for a single module
 */
export function computeModuleProgress(
  module: ReleaseModule,
  state: ReleaseState
): ReleaseProgress {
  const checks = module.checks.filter(c => {
    const itemState = state[c.id];
    return itemState?.status !== 'na';
  });

  const total = checks.length;
  const done = checks.filter(c => state[c.id]?.status === 'done').length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 100;

  return { done, total, pct };
}

/**
 * Compute overall progress across all modules
 */
export function computeOverallProgress(
  config: ReleaseConfig,
  state: ReleaseState
): ReleaseProgress {
  let totalDone = 0;
  let totalItems = 0;

  for (const mod of config.modules) {
    for (const check of mod.checks) {
      const itemState = state[check.id];
      if (itemState?.status !== 'na') {
        totalItems++;
        if (itemState?.status === 'done') {
          totalDone++;
        }
      }
    }
  }

  const pct = totalItems > 0 ? Math.round((totalDone / totalItems) * 100) : 100;

  return { done: totalDone, total: totalItems, pct };
}

/**
 * Convert state to exportable JSON
 */
export function toExportJson(
  config: ReleaseConfig,
  state: ReleaseState
): object {
  const exportData = {
    exportedAt: new Date().toISOString(),
    overall: computeOverallProgress(config, state),
    modules: config.modules.map(mod => ({
      id: mod.id,
      progress: computeModuleProgress(mod, state),
      checks: mod.checks.map(check => ({
        id: check.id,
        priority: check.priority,
        ...state[check.id],
      })),
    })),
  };

  return exportData;
}

/**
 * Format date for display
 */
export function formatUpdatedAt(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return isoString;
  }
}

/**
 * Generate export filename
 */
export function generateExportFilename(prefix: string): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');

  return `${prefix}-${yyyy}${mm}${dd}-${hh}${min}.json`;
}
