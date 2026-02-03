/**
 * Feature Store
 *
 * Feature flags and module states.
 * Dynamically track enabled features.
 */

import { writable, get } from 'svelte/store';
import { featureFlags, type FeatureFlags } from '$config/features.config';

export interface FeatureState {
  enabledFeatures: Set<string>;
  lastUpdated: Date;
}

function createFeatureStore() {
  const enabledFeatures = new Set<string>();

  // Initialize with enabled features from config
  const flagKeys = Object.keys(featureFlags) as (keyof FeatureFlags)[];
  for (const key of flagKeys) {
    if (featureFlags[key]) {
      enabledFeatures.add(key);
    }
  }

  const { subscribe, set, update } = writable<FeatureState>({
    enabledFeatures,
    lastUpdated: new Date(),
  });

  return {
    subscribe,

    isFeatureEnabled: (featureId: string): boolean => {
      const state = get({ subscribe });
      return state.enabledFeatures.has(featureId);
    },

    enableFeature: (featureId: string) => {
      update(state => {
        state.enabledFeatures.add(featureId);
        return {
          ...state,
          lastUpdated: new Date(),
        };
      });
    },

    disableFeature: (featureId: string) => {
      update(state => {
        state.enabledFeatures.delete(featureId);
        return {
          ...state,
          lastUpdated: new Date(),
        };
      });
    },

    reset: () => {
      const features = new Set<string>();
      const keys = Object.keys(featureFlags) as (keyof FeatureFlags)[];
      for (const key of keys) {
        if (featureFlags[key]) {
          features.add(key);
        }
      }

      set({
        enabledFeatures: features,
        lastUpdated: new Date(),
      });
    },
  };
}

export const featureStore = createFeatureStore();
