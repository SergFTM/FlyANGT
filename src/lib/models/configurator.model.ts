/**
 * Configurator Model
 *
 * Pure functions for configurator state management.
 * No Svelte store logic here - just data transformations.
 */

import type { ConfiguratorConfig, OptionGroupId, OptionId } from '$config/configurator.config';

/**
 * Selection state - maps group ID to selected option IDs
 */
export type SelectionState = Record<OptionGroupId, OptionId[]>;

/**
 * Full configurator state
 */
export interface ConfiguratorState {
  selections: SelectionState;
  totalUsd: number;
}

/**
 * Build default state from config
 * Sets default options for each group
 */
export function buildDefaultState(config: ConfiguratorConfig): ConfiguratorState {
  const selections: SelectionState = {
    model: [],
    exterior: [],
    interior: [],
    avionics: [],
    safety: [],
    packages: [],
  };

  // Find default options for each group
  for (const group of config.groups) {
    const defaultOptions = group.options.filter(o => o.default).map(o => o.id);
    selections[group.id] = defaultOptions.length > 0 ? defaultOptions : [];

    // For single-select groups, ensure at least the first option if no default
    if (group.selectionMode === 'single' && selections[group.id].length === 0 && group.options.length > 0) {
      selections[group.id] = [group.options[0].id];
    }
  }

  const totalUsd = computeTotal(config, selections);

  return { selections, totalUsd };
}

/**
 * Compute total price from selections
 */
export function computeTotal(config: ConfiguratorConfig, selections: SelectionState): number {
  let total = 0;

  for (const group of config.groups) {
    const selectedIds = selections[group.id] || [];
    for (const optionId of selectedIds) {
      const option = group.options.find(o => o.id === optionId);
      if (option) {
        total += option.priceUsd;
      }
    }
  }

  return total;
}

/**
 * Normalize selections to ensure single/multi rules are followed
 */
export function normalizeSelections(
  config: ConfiguratorConfig,
  selections: SelectionState
): SelectionState {
  const normalized: SelectionState = {
    model: [],
    exterior: [],
    interior: [],
    avionics: [],
    safety: [],
    packages: [],
  };

  for (const group of config.groups) {
    const selectedIds = selections[group.id] || [];

    // Filter to only valid option IDs
    const validIds = selectedIds.filter(id => group.options.some(o => o.id === id));

    if (group.selectionMode === 'single') {
      // Single select: keep only the first (or last) selection
      normalized[group.id] = validIds.length > 0 ? [validIds[validIds.length - 1]] : [];

      // If nothing selected, use default or first option
      if (normalized[group.id].length === 0) {
        const defaultOpt = group.options.find(o => o.default);
        if (defaultOpt) {
          normalized[group.id] = [defaultOpt.id];
        } else if (group.options.length > 0) {
          normalized[group.id] = [group.options[0].id];
        }
      }
    } else {
      // Multi select: keep all valid selections
      normalized[group.id] = validIds;
    }
  }

  return normalized;
}

/**
 * Update a single option selection
 */
export function updateSelection(
  config: ConfiguratorConfig,
  currentSelections: SelectionState,
  groupId: OptionGroupId,
  optionId: OptionId,
  checked: boolean
): SelectionState {
  const group = config.groups.find(g => g.id === groupId);
  if (!group) return currentSelections;

  const newSelections = { ...currentSelections };
  const currentSelected = [...(currentSelections[groupId] || [])];

  if (group.selectionMode === 'single') {
    // Single select: replace selection
    newSelections[groupId] = checked ? [optionId] : [];
  } else {
    // Multi select: toggle option
    if (checked) {
      if (!currentSelected.includes(optionId)) {
        newSelections[groupId] = [...currentSelected, optionId];
      }
    } else {
      newSelections[groupId] = currentSelected.filter(id => id !== optionId);
    }
  }

  return normalizeSelections(config, newSelections);
}

/**
 * Check if an option is selected
 */
export function isOptionSelected(selections: SelectionState, groupId: OptionGroupId, optionId: OptionId): boolean {
  return (selections[groupId] || []).includes(optionId);
}

/**
 * Encode selections to base64url string for sharing
 */
export function encodeShareString(selections: SelectionState): string {
  try {
    const json = JSON.stringify(selections);
    // Base64 encode
    const base64 = btoa(json);
    // Make URL-safe
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  } catch {
    return '';
  }
}

/**
 * Decode share string back to selections
 * Returns null if invalid
 */
export function decodeShareString(str: string): SelectionState | null {
  try {
    // Restore base64 padding
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const json = atob(base64);
    const parsed = JSON.parse(json);

    // Basic validation - check it's an object with expected keys
    if (typeof parsed !== 'object' || parsed === null) {
      return null;
    }

    return parsed as SelectionState;
  } catch {
    return null;
  }
}

/**
 * Get selected options as a flat array with group info
 */
export interface SelectedOption {
  groupId: OptionGroupId;
  optionId: OptionId;
  priceUsd: number;
}

export function getSelectedOptionsList(
  config: ConfiguratorConfig,
  selections: SelectionState
): SelectedOption[] {
  const result: SelectedOption[] = [];

  for (const group of config.groups) {
    const selectedIds = selections[group.id] || [];
    for (const optionId of selectedIds) {
      const option = group.options.find(o => o.id === optionId);
      if (option) {
        result.push({
          groupId: group.id,
          optionId: option.id,
          priceUsd: option.priceUsd,
        });
      }
    }
  }

  return result;
}
