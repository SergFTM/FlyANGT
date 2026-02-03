/**
 * Release Checklist Store
 *
 * Manages release checklist state with localStorage persistence.
 * Respects prelaunch lock mode for draft storage.
 * Dev tool only.
 */

import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { releaseConfig, type ReleaseStatus } from '$config/release.config';
import { prelaunchConfig } from '$config/prelaunch.config';
import { resolveDraftKey, shouldBlockDraftWrites } from '$lib/prelaunch';
import {
  makeDefaultState,
  mergeState,
  toExportJson,
  generateExportFilename,
  type ReleaseState,
} from '$lib/models/release.model';

// Resolve storage key based on prelaunch mode
const effectiveStorageKey = resolveDraftKey(releaseConfig.storageKey, prelaunchConfig);
const draftsBlocked = shouldBlockDraftWrites(prelaunchConfig);

/**
 * Load state from localStorage
 */
function loadFromStorage(): ReleaseState | null {
  if (!browser) return null;

  try {
    const stored = localStorage.getItem(effectiveStorageKey);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to load release state from localStorage:', e);
  }

  return null;
}

/**
 * Save state to localStorage (respects lock mode)
 */
function saveToStorage(state: ReleaseState): void {
  if (!browser || draftsBlocked) return;

  try {
    localStorage.setItem(effectiveStorageKey, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save release state to localStorage:', e);
  }
}

/**
 * Initialize state
 */
function initializeState(): ReleaseState {
  const defaultState = makeDefaultState(releaseConfig);
  const storedState = loadFromStorage();
  return mergeState(defaultState, storedState);
}

/**
 * Create the release store
 */
function createReleaseStore() {
  const { subscribe, set, update } = writable<ReleaseState>(initializeState());

  return {
    subscribe,

    /**
     * Set status for a check item
     */
    setStatus: (checkId: string, status: ReleaseStatus) => {
      update(state => {
        const newState = {
          ...state,
          [checkId]: {
            ...state[checkId],
            status,
            updatedAt: new Date().toISOString(),
          },
        };
        saveToStorage(newState);
        return newState;
      });
    },

    /**
     * Set notes for a check item
     */
    setNotes: (checkId: string, notes: string) => {
      update(state => {
        const newState = {
          ...state,
          [checkId]: {
            ...state[checkId],
            notes,
            updatedAt: new Date().toISOString(),
          },
        };
        saveToStorage(newState);
        return newState;
      });
    },

    /**
     * Reset all items to default state
     */
    resetAll: () => {
      const defaultState = makeDefaultState(releaseConfig);
      saveToStorage(defaultState);
      set(defaultState);
    },

    /**
     * Export current state to JSON file
     */
    exportJson: () => {
      if (!browser) return;

      const currentState = get({ subscribe });
      const exportData = toExportJson(releaseConfig, currentState);
      const filename = generateExportFilename(releaseConfig.exportFilePrefix);

      // Create blob and trigger download
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },

    /**
     * Reload from localStorage (useful after external changes)
     */
    reload: () => {
      const state = initializeState();
      set(state);
    },
  };
}

export const releaseStore = createReleaseStore();
