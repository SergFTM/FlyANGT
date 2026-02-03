/**
 * Smoke Test Store
 *
 * Manages smoke test results with localStorage persistence.
 * Dev tool only.
 */

import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { smokeConfig, generateSmokeTests, getSmokeGroupsSorted, type SmokeResultStatus } from '$config/smoke.config';
import type { Locale } from '$config/i18n.config';
import { t } from '$config/i18n.config';
import {
  createDefaultState,
  updateResult,
  updateNotes,
  resetResult,
  resetAllResults,
  calculateSummary,
  buildExportData,
  type SmokeState,
} from '$lib/models/smoke.model';

/**
 * Load state from localStorage
 */
function loadFromStorage(): SmokeState | null {
  if (!browser) return null;

  try {
    const stored = localStorage.getItem(smokeConfig.storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to load smoke state from localStorage:', e);
  }

  return null;
}

/**
 * Save state to localStorage
 */
function saveToStorage(state: SmokeState): void {
  if (!browser) return;

  try {
    localStorage.setItem(smokeConfig.storageKey, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save smoke state to localStorage:', e);
  }
}

/**
 * Initialize state
 */
function initializeState(): SmokeState {
  const storedState = loadFromStorage();
  return storedState ?? createDefaultState();
}

/**
 * Create the smoke store
 */
function createSmokeStore() {
  const { subscribe, set, update } = writable<SmokeState>(initializeState());

  return {
    subscribe,

    /**
     * Set status for a test
     */
    setStatus: (testId: string, status: SmokeResultStatus) => {
      update(state => {
        const newState = updateResult(state, testId, status);
        saveToStorage(newState);
        return newState;
      });
    },

    /**
     * Set notes for a test
     */
    setNotes: (testId: string, notes: string) => {
      update(state => {
        const newState = updateNotes(state, testId, notes);
        saveToStorage(newState);
        return newState;
      });
    },

    /**
     * Reset a single test result
     */
    resetTest: (testId: string) => {
      update(state => {
        const newState = resetResult(state, testId);
        saveToStorage(newState);
        return newState;
      });
    },

    /**
     * Reset all test results
     */
    resetAll: () => {
      const newState = resetAllResults();
      saveToStorage(newState);
      set(newState);
    },

    /**
     * Export results to JSON file
     */
    exportJson: (locale: Locale = 'en') => {
      if (!browser) return;

      const currentState = get({ subscribe });
      const tests = generateSmokeTests();
      const groups = getSmokeGroupsSorted();

      // Build export data with translated group titles
      const exportData = buildExportData(
        groups,
        tests,
        currentState,
        groupId => {
          const group = groups.find(g => g.id === groupId);
          return group ? t(group.titleKey as Parameters<typeof t>[0], locale) : groupId;
        }
      );

      // Generate filename with timestamp
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      const filename = `${smokeConfig.exportFilePrefix}-${yyyy}${mm}${dd}-${hh}${min}.json`;

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
     * Get summary for all tests
     */
    getSummary: () => {
      const currentState = get({ subscribe });
      const tests = generateSmokeTests();
      return calculateSummary(tests, currentState);
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

export const smokeStore = createSmokeStore();
