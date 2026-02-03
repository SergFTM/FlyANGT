/**
 * P0 Readiness Readers
 *
 * Client-side functions to read P0 status from localStorage.
 * Used by the gate system to determine launch readiness.
 */

import { browser } from '$app/environment';
import { releaseConfig, type ReleaseConfig, type ReleaseStatus } from '$config/release.config';
import { smokeConfig, generateSmokeTests, type SmokeConfig, type SmokeResultStatus } from '$config/smoke.config';
import type { GateStatus } from '$config/gate.config';
import { makeDefaultState, mergeState, type ReleaseState } from '$lib/models/release.model';
import { createDefaultState, type SmokeState } from '$lib/models/smoke.model';

/**
 * P0 summary for release checklist
 */
export interface ReleaseP0Summary {
  p0Total: number;
  p0Done: number;
  p0Open: number;
  p0Blocked: number;
}

/**
 * P0 summary for smoke tests
 */
export interface SmokeP0Summary {
  p0Total: number;
  p0Pass: number;
  p0Open: number;
  p0Fail: number;
}

/**
 * I18n summary
 */
export interface I18nSummary {
  missingKeys: number;
}

/**
 * Read release P0 summary from localStorage
 */
export function readReleaseP0Summary(config: ReleaseConfig = releaseConfig): ReleaseP0Summary {
  const summary: ReleaseP0Summary = {
    p0Total: 0,
    p0Done: 0,
    p0Open: 0,
    p0Blocked: 0,
  };

  if (!browser) {
    // Count P0 items from config (all would be in default state)
    for (const mod of config.modules) {
      for (const check of mod.checks) {
        if (check.priority === 'p0') {
          summary.p0Total++;
          // In SSR context, assume default state
          if (check.statusDefault === 'done' || check.statusDefault === 'na') {
            summary.p0Done++;
          } else if (check.statusDefault === 'blocked') {
            summary.p0Blocked++;
          } else {
            summary.p0Open++;
          }
        }
      }
    }
    return summary;
  }

  // Load stored state
  let storedState: ReleaseState | null = null;
  try {
    const stored = localStorage.getItem(config.storageKey);
    if (stored) {
      storedState = JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }

  // Merge with defaults
  const defaultState = makeDefaultState(config);
  const state = mergeState(defaultState, storedState);

  // Count P0 items
  for (const mod of config.modules) {
    for (const check of mod.checks) {
      if (check.priority === 'p0') {
        summary.p0Total++;
        const checkState = state[check.id];
        const status: ReleaseStatus = checkState?.status ?? check.statusDefault;

        if (status === 'done' || status === 'na') {
          summary.p0Done++;
        } else if (status === 'blocked') {
          summary.p0Blocked++;
        } else {
          // todo, in_progress
          summary.p0Open++;
        }
      }
    }
  }

  return summary;
}

/**
 * Read smoke P0 summary from localStorage
 */
export function readSmokeP0Summary(config: SmokeConfig = smokeConfig): SmokeP0Summary {
  const summary: SmokeP0Summary = {
    p0Total: 0,
    p0Pass: 0,
    p0Open: 0,
    p0Fail: 0,
  };

  // Get all P0 tests
  const tests = generateSmokeTests().filter(t => t.priority === 'p0');
  summary.p0Total = tests.length;

  if (!browser) {
    // In SSR context, all tests are untested (open)
    summary.p0Open = summary.p0Total;
    return summary;
  }

  // Load stored state
  let state: SmokeState = createDefaultState();
  try {
    const stored = localStorage.getItem(config.storageKey);
    if (stored) {
      state = JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }

  // Count P0 test results
  for (const test of tests) {
    const result = state.results[test.id];
    const status: SmokeResultStatus = result?.status ?? 'untested';

    if (status === 'pass') {
      summary.p0Pass++;
    } else if (status === 'fail') {
      summary.p0Fail++;
    } else {
      // untested, skip
      summary.p0Open++;
    }
  }

  return summary;
}

/**
 * Compute overall gate status based on P0 summaries
 *
 * Rules:
 * - red: any blocked/fail P0 exists
 * - yellow: any open P0 exists (todo/in_progress/untested)
 * - green: all P0 are done/pass/na
 */
export function computeGateStatus(
  releaseP0: ReleaseP0Summary,
  smokeP0: SmokeP0Summary,
  i18n?: I18nSummary
): GateStatus {
  // Red if any P0 is blocked or failed
  if (releaseP0.p0Blocked > 0 || smokeP0.p0Fail > 0) {
    return 'red';
  }

  // Yellow if any P0 is open
  if (releaseP0.p0Open > 0 || smokeP0.p0Open > 0) {
    return 'yellow';
  }

  // Yellow if there are missing i18n keys
  if (i18n && i18n.missingKeys > 0) {
    return 'yellow';
  }

  // Green if all P0 are done/pass
  return 'green';
}

/**
 * Get combined gate readiness data
 */
export function getGateReadiness(): {
  release: ReleaseP0Summary;
  smoke: SmokeP0Summary;
  status: GateStatus;
} {
  const release = readReleaseP0Summary();
  const smoke = readSmokeP0Summary();
  const status = computeGateStatus(release, smoke);

  return { release, smoke, status };
}
