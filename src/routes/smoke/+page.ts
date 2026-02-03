/**
 * Smoke Test Runner Page Data Loader
 *
 * Dev-only tool for manual smoke testing.
 * Returns 404 in production.
 */

import type { PageLoad } from './$types';
import { isLocaleSupported, t, type Locale } from '$config/i18n.config';
import {
  smokeConfig,
  generateSmokeTests,
  getSmokeGroupsSorted,
} from '$config/smoke.config';
import { gateConfig } from '$config/gate.config';
import { assertDevToolAllowed } from '$lib/devtools/guard';

export const load: PageLoad = ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Resolve locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Check if smoke testing is enabled
  if (!smokeConfig.enabled) {
    return {
      locale,
      enabled: false,
      title: t('smoke.title', locale),
      subtitle: t('smoke.subtitle', locale),
      labels: {
        devOnly: t('smoke.notice.devOnly', locale),
      },
    };
  }

  // Get groups with translated titles
  const groups = getSmokeGroupsSorted().map(group => ({
    ...group,
    title: t(group.titleKey as Parameters<typeof t>[0], locale),
  }));

  // Get all tests
  const tests = generateSmokeTests();

  return {
    locale,
    enabled: true,
    title: t('smoke.title', locale),
    subtitle: t('smoke.subtitle', locale),
    groups,
    tests,
    labels: {
      markPass: t('smoke.actions.markPass', locale),
      markFail: t('smoke.actions.markFail', locale),
      markSkip: t('smoke.actions.markSkip', locale),
      reset: t('smoke.actions.reset', locale),
      resetAll: t('smoke.actions.resetAll', locale),
      export: t('smoke.actions.export', locale),
      openRoute: t('smoke.actions.openRoute', locale),
      devOnly: t('smoke.notice.devOnly', locale),
      notesPlaceholder: t('smoke.notes.placeholder', locale),
      status: {
        untested: t('smoke.status.untested', locale),
        pass: t('smoke.status.pass', locale),
        fail: t('smoke.status.fail', locale),
        skip: t('smoke.status.skip', locale),
      },
      summary: {
        total: t('smoke.summary.total', locale),
        passed: t('smoke.summary.passed', locale),
        failed: t('smoke.summary.failed', locale),
        skipped: t('smoke.summary.skipped', locale),
        untested: t('smoke.summary.untested', locale),
      },
    },
  };
};
