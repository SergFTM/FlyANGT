/**
 * RC Artifact Builders
 *
 * Wrapper functions that reuse existing export and readiness builders.
 * All functions are designed to run client-side only.
 */

import { browser } from '$app/environment';
import type { Locale } from '$config/i18n.config';
import {
  buildSnapshot,
  buildBundle,
  buildReleaseState,
  loadReleaseStateFromStorage,
  buildI18nReport,
} from '$lib/export/builders';
import {
  readReleaseP0Summary,
  readSmokeP0Summary,
  computeGateStatus,
} from '$lib/devtools/readiness';
import { createDefaultState, type SmokeState } from '$lib/models/smoke.model';
import { smokeConfig } from '$config/smoke.config';
import type { RcGateSummary, RcSummary, RcStatus } from '$lib/models/rc.model';

/**
 * Build snapshot artifact
 */
export function buildRcSnapshot(): object {
  return buildSnapshot();
}

/**
 * Build bundle artifact
 */
export function buildRcBundle(locale: Locale): object {
  const storedState = loadReleaseStateFromStorage();
  const baseUrl = browser ? window.location.origin : '';
  return buildBundle(locale, storedState, baseUrl);
}

/**
 * Build release state artifact
 */
export function buildRcReleaseState(): object {
  const storedState = loadReleaseStateFromStorage();
  return buildReleaseState(storedState);
}

/**
 * Build smoke state artifact
 */
export function buildRcSmokeState(): object {
  if (!browser) {
    return {
      generatedAt: new Date().toISOString(),
      results: {},
      lastUpdated: null,
    };
  }

  // Load stored state
  let state: SmokeState = createDefaultState();
  try {
    const stored = localStorage.getItem(smokeConfig.storageKey);
    if (stored) {
      state = JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }

  return {
    generatedAt: new Date().toISOString(),
    ...state,
  };
}

/**
 * Build gate summary artifact
 */
export function buildRcGateSummary(): RcGateSummary {
  const releaseP0 = readReleaseP0Summary();
  const smokeP0 = readSmokeP0Summary();
  const status = computeGateStatus(releaseP0, smokeP0);

  return {
    status,
    releaseP0: {
      total: releaseP0.p0Total,
      done: releaseP0.p0Done,
      open: releaseP0.p0Open,
      blocked: releaseP0.p0Blocked,
    },
    smokeP0: {
      total: smokeP0.p0Total,
      pass: smokeP0.p0Pass,
      open: smokeP0.p0Open,
      fail: smokeP0.p0Fail,
    },
  };
}

/**
 * Build RC summary from gate summary
 */
export function buildRcSummary(gateSummary: RcGateSummary): RcSummary {
  // Get i18n missing keys count
  let i18nMissingEn = 0;
  let i18nMissingRu = 0;

  try {
    const i18nReport = buildI18nReport() as {
      locales: {
        en?: { missing: number };
        ru?: { missing: number };
      };
    };
    i18nMissingEn = i18nReport.locales.en?.missing ?? 0;
    i18nMissingRu = i18nReport.locales.ru?.missing ?? 0;
  } catch {
    // Ignore if i18n report fails
  }

  return {
    releaseP0Open: gateSummary.releaseP0.open,
    releaseP0Blocked: gateSummary.releaseP0.blocked,
    smokeP0Open: gateSummary.smokeP0.open,
    smokeP0Fail: gateSummary.smokeP0.fail,
    i18nMissingEn,
    i18nMissingRu,
  };
}

/**
 * Compute RC status from summary
 */
export function computeRcStatus(summary: RcSummary): RcStatus {
  // Red if any P0 is blocked or failed
  if ((summary.releaseP0Blocked ?? 0) > 0 || (summary.smokeP0Fail ?? 0) > 0) {
    return 'red';
  }

  // Yellow if any P0 is open or i18n has missing keys
  if (
    (summary.releaseP0Open ?? 0) > 0 ||
    (summary.smokeP0Open ?? 0) > 0 ||
    (summary.i18nMissingEn ?? 0) > 0 ||
    (summary.i18nMissingRu ?? 0) > 0
  ) {
    return 'yellow';
  }

  // Green if all good
  return 'green';
}

/**
 * Build all artifacts for an RC
 */
export function buildAllRcArtifacts(
  locale: Locale
): {
  snapshot: object;
  bundle: object;
  release: object;
  smoke: object;
  gate: RcGateSummary;
  summary: RcSummary;
  status: RcStatus;
} {
  const snapshot = buildRcSnapshot();
  const bundle = buildRcBundle(locale);
  const release = buildRcReleaseState();
  const smoke = buildRcSmokeState();
  const gate = buildRcGateSummary();
  const summary = buildRcSummary(gate);
  const status = computeRcStatus(summary);

  return {
    snapshot,
    bundle,
    release,
    smoke,
    gate,
    summary,
    status,
  };
}
