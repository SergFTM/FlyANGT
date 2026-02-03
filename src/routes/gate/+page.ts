/**
 * Gate Summary Page Data Loader
 *
 * Dev-only page for prelaunch readiness overview.
 * Returns 404 in production.
 */

import type { PageLoad } from './$types';
import { isLocaleSupported, t, type Locale } from '$config/i18n.config';
import { gateConfig } from '$config/gate.config';
import { releaseConfig } from '$config/release.config';
import { smokeConfig } from '$config/smoke.config';
import { assertDevToolAllowed } from '$lib/devtools/guard';

export const load: PageLoad = ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Resolve locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  return {
    locale,
    title: t('gate.title', locale),
    subtitle: t('gate.subtitle', locale),
    gateConfig,
    releaseConfig,
    smokeConfig,
    labels: {
      overall: t('gate.summary.overall', locale),
      releaseP0: t('gate.summary.releaseP0', locale),
      smokeP0: t('gate.summary.smokeP0', locale),
      i18nMissing: t('gate.summary.i18nMissing', locale),
      devTools: t('gate.summary.devTools', locale),
      openRelease: t('gate.actions.openRelease', locale),
      openSmoke: t('gate.actions.openSmoke', locale),
      openExport: t('gate.actions.openExport', locale),
      openSnapshot: t('gate.actions.openSnapshot', locale),
      openI18n: t('gate.actions.openI18n', locale),
      devOnly: t('gate.notice.devOnly', locale),
      status: {
        green: t('gate.status.green', locale),
        yellow: t('gate.status.yellow', locale),
        red: t('gate.status.red', locale),
      },
    },
  };
};
