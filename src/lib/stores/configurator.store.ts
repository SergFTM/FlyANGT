/**
 * Configurator Store
 *
 * Manages configurator state with persistence to localStorage and URL sharing.
 * Respects prelaunch lock mode for draft storage.
 *
 * Initialization order:
 * 1. URL share param (?cfg=...)
 * 2. localStorage
 * 3. defaults from config
 */

import { browser } from '$app/environment';
import { writable, derived, get } from 'svelte/store';
import { configuratorConfig, type OptionGroupId, type OptionId } from '$config/configurator.config';
import { prelaunchConfig } from '$config/prelaunch.config';
import { resolveDraftKey, shouldBlockDraftWrites } from '$lib/prelaunch';
import {
  buildDefaultState,
  computeTotal,
  normalizeSelections,
  updateSelection,
  encodeShareString,
  decodeShareString,
  type SelectionState,
  type ConfiguratorState,
} from '$lib/models/configurator.model';

const { localStorageKey: baseStorageKey, shareParamKey } = configuratorConfig.persistence;
const localStorageKey = resolveDraftKey(baseStorageKey, prelaunchConfig);
const draftsBlocked = shouldBlockDraftWrites(prelaunchConfig);

/**
 * Get initial state from URL, localStorage, or defaults
 */
function getInitialState(): ConfiguratorState {
  let selections: SelectionState | null = null;

  if (browser) {
    // 1. Try URL share param
    const urlParams = new URLSearchParams(window.location.search);
    const shareParam = urlParams.get(shareParamKey);
    if (shareParam) {
      selections = decodeShareString(shareParam);
      if (selections) {
        selections = normalizeSelections(configuratorConfig, selections);
      }
    }

    // 2. Try localStorage
    if (!selections) {
      const stored = localStorage.getItem(localStorageKey);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.selections) {
            selections = normalizeSelections(configuratorConfig, parsed.selections);
          }
        } catch {
          // Invalid stored data, ignore
        }
      }
    }
  }

  // 3. Fall back to defaults
  if (!selections) {
    return buildDefaultState(configuratorConfig);
  }

  const totalUsd = computeTotal(configuratorConfig, selections);
  return { selections, totalUsd };
}

/**
 * Create the main store
 */
function createConfiguratorStore() {
  const initial = getInitialState();
  const { subscribe, set, update } = writable<ConfiguratorState>(initial);

  // Persist to localStorage on changes (respects lock mode)
  if (browser && !draftsBlocked) {
    subscribe(state => {
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    });
  }

  return {
    subscribe,

    /**
     * Set an option (toggle for multi, replace for single)
     */
    setOption(groupId: OptionGroupId, optionId: OptionId, checked: boolean) {
      update(state => {
        const newSelections = updateSelection(
          configuratorConfig,
          state.selections,
          groupId,
          optionId,
          checked
        );
        const totalUsd = computeTotal(configuratorConfig, newSelections);
        return { selections: newSelections, totalUsd };
      });
    },

    /**
     * Reset to default state
     */
    reset() {
      const defaultState = buildDefaultState(configuratorConfig);
      set(defaultState);
    },

    /**
     * Export current selections as share string
     */
    exportShareString(): string {
      const state = get({ subscribe });
      return encodeShareString(state.selections);
    },

    /**
     * Import from share string
     */
    importShareString(str: string): boolean {
      const selections = decodeShareString(str);
      if (!selections) return false;

      const normalized = normalizeSelections(configuratorConfig, selections);
      const totalUsd = computeTotal(configuratorConfig, normalized);
      set({ selections: normalized, totalUsd });
      return true;
    },

    /**
     * Get current selections
     */
    getSelections(): SelectionState {
      return get({ subscribe }).selections;
    },

    /**
     * Get current total
     */
    getTotal(): number {
      return get({ subscribe }).totalUsd;
    },

    /**
     * Generate full share URL
     */
    getShareUrl(): string {
      if (!browser) return '';
      const shareStr = this.exportShareString();
      const url = new URL(window.location.href);
      url.searchParams.set(shareParamKey, shareStr);
      return url.toString();
    },

    /**
     * Initialize from URL if share param present
     * Call this after navigation to update from URL
     */
    initFromUrl() {
      if (!browser) return;

      const urlParams = new URLSearchParams(window.location.search);
      const shareParam = urlParams.get(shareParamKey);
      if (shareParam) {
        this.importShareString(shareParam);
      }
    },
  };
}

export const configuratorStore = createConfiguratorStore();

/**
 * Derived store for checking if an option is selected
 */
export const isSelected = derived(configuratorStore, $state => {
  return (groupId: OptionGroupId, optionId: OptionId): boolean => {
    return ($state.selections[groupId] || []).includes(optionId);
  };
});
