/**
 * RC Storage Helpers
 *
 * Functions to read RC records from localStorage.
 * Reuses rc.config and rc.model types.
 */

import { browser } from '$app/environment';
import type { RcConfig } from '$config/rc.config';
import type { RcRecord } from '$lib/models/rc.model';

/**
 * Load RC records from localStorage
 */
export function loadRcRecords(config: RcConfig): RcRecord[] {
  if (!browser) {
    return [];
  }

  try {
    const stored = localStorage.getItem(config.storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed as RcRecord[];
      }
    }
  } catch {
    // Ignore parse errors
  }

  return [];
}

/**
 * Find RC record by ID
 */
export function findRcById(records: RcRecord[], id: string): RcRecord | undefined {
  return records.find(r => r.id === id);
}
