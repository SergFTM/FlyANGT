/**
 * RC Store
 *
 * Manages Release Candidate records with localStorage persistence.
 * Dev tool only.
 */

import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { rcConfig, type RcArtifactId } from '$config/rc.config';
import type { Locale } from '$config/i18n.config';
import {
  makeRcId,
  trimToLimit,
  toExportFilename,
  downloadJson,
  copyJson,
  type RcRecord,
} from '$lib/models/rc.model';
import { buildAllRcArtifacts } from '$lib/rc/builders';

/**
 * RC store state
 */
interface RcStoreState {
  records: RcRecord[];
  selectedId: string | null;
}

/**
 * Load records from localStorage
 */
function loadRecords(): RcRecord[] {
  if (!browser) return [];

  try {
    const stored = localStorage.getItem(rcConfig.storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to load RC records from localStorage:', e);
  }

  return [];
}

/**
 * Save records to localStorage
 */
function saveRecords(records: RcRecord[]): void {
  if (!browser) return;

  try {
    localStorage.setItem(rcConfig.storageKey, JSON.stringify(records));
  } catch (e) {
    console.warn('Failed to save RC records to localStorage:', e);
  }
}

/**
 * Load selected RC id from localStorage
 */
function loadSelectedId(): string | null {
  if (!browser) return null;

  try {
    return localStorage.getItem(rcConfig.selectedKey);
  } catch {
    return null;
  }
}

/**
 * Save selected RC id to localStorage
 */
function saveSelectedId(id: string | null): void {
  if (!browser) return;

  try {
    if (id) {
      localStorage.setItem(rcConfig.selectedKey, id);
    } else {
      localStorage.removeItem(rcConfig.selectedKey);
    }
  } catch (e) {
    console.warn('Failed to save selected RC id:', e);
  }
}

/**
 * Initialize store state
 */
function initializeState(): RcStoreState {
  const records = loadRecords();
  const selectedId = loadSelectedId();

  // Verify selected ID exists in records
  const validSelectedId = records.some(r => r.id === selectedId) ? selectedId : null;

  return {
    records,
    selectedId: validSelectedId,
  };
}

/**
 * Create the RC store
 */
function createRcStore() {
  const { subscribe, set, update } = writable<RcStoreState>(initializeState());

  return {
    subscribe,

    /**
     * Create a new RC record
     */
    createRc: (locale: Locale): RcRecord | null => {
      if (!browser) return null;

      // Build all artifacts
      const { snapshot, bundle, release, smoke, gate, summary, status } = buildAllRcArtifacts(locale);

      // Create new record
      const record: RcRecord = {
        id: makeRcId(rcConfig),
        createdAt: new Date().toISOString(),
        locale,
        status,
        summary,
        artifacts: {
          snapshot,
          bundle,
          release,
          smoke,
          gate,
        },
      };

      // Update store
      update(state => {
        // Prepend new record
        const newRecords = [record, ...state.records];
        // Trim to limit
        const trimmedRecords = trimToLimit(newRecords, rcConfig.limits.maxRecords);
        // Save to localStorage
        saveRecords(trimmedRecords);

        return {
          ...state,
          records: trimmedRecords,
        };
      });

      return record;
    },

    /**
     * Select an RC by id
     */
    selectRc: (id: string) => {
      update(state => {
        saveSelectedId(id);
        return {
          ...state,
          selectedId: id,
        };
      });
    },

    /**
     * Clear selection
     */
    clearSelection: () => {
      update(state => {
        saveSelectedId(null);
        return {
          ...state,
          selectedId: null,
        };
      });
    },

    /**
     * Delete an RC by id
     */
    deleteRc: (id: string) => {
      update(state => {
        const newRecords = state.records.filter(r => r.id !== id);
        saveRecords(newRecords);

        // Clear selection if deleted
        const newSelectedId = state.selectedId === id ? null : state.selectedId;
        if (newSelectedId !== state.selectedId) {
          saveSelectedId(newSelectedId);
        }

        return {
          records: newRecords,
          selectedId: newSelectedId,
        };
      });
    },

    /**
     * Export an artifact as JSON file
     */
    exportArtifact: (rcId: string, artifactId: RcArtifactId) => {
      if (!browser) return;

      const state = get({ subscribe });
      const record = state.records.find(r => r.id === rcId);
      if (!record) return;

      const artifact = record.artifacts[artifactId];
      if (!artifact) return;

      const filename = toExportFilename(rcId, artifactId, rcConfig.exportFilePrefix);
      downloadJson(filename, artifact);
    },

    /**
     * Copy an artifact to clipboard
     */
    copyArtifact: async (rcId: string, artifactId: RcArtifactId): Promise<boolean> => {
      if (!browser) return false;

      const state = get({ subscribe });
      const record = state.records.find(r => r.id === rcId);
      if (!record) return false;

      const artifact = record.artifacts[artifactId];
      if (!artifact) return false;

      try {
        await copyJson(artifact);
        return true;
      } catch {
        return false;
      }
    },

    /**
     * Get RC record by id
     */
    getRc: (id: string): RcRecord | undefined => {
      const state = get({ subscribe });
      return state.records.find(r => r.id === id);
    },

    /**
     * Reload from localStorage
     */
    reload: () => {
      const state = initializeState();
      set(state);
    },
  };
}

export const rcStore = createRcStore();
