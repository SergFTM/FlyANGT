/**
 * Export Center Page Data Loader
 *
 * Dev-only tool for exporting configuration artifacts.
 * Returns 404 in production.
 */

import type { PageLoad } from './$types';
import { isLocaleSupported, t, type Locale } from '$config/i18n.config';
import { exportConfig, getEnabledArtifacts } from '$config/export.config';
import { gateConfig } from '$config/gate.config';
import { assertDevToolAllowed } from '$lib/devtools/guard';

export const load: PageLoad = ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Resolve locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Check if export center is enabled
  if (!exportConfig.enabled) {
    return {
      locale,
      enabled: false,
      title: t('export.title', locale),
      subtitle: t('export.subtitle', locale),
      labels: {
        devOnly: t('export.notice.devOnly', locale),
      },
    };
  }

  // Get enabled artifacts with translated labels
  const artifacts = getEnabledArtifacts().map(artifact => ({
    ...artifact,
    title: t(artifact.titleKey as Parameters<typeof t>[0], locale),
    text: t(artifact.textKey as Parameters<typeof t>[0], locale),
  }));

  return {
    locale,
    enabled: true,
    title: t('export.title', locale),
    subtitle: t('export.subtitle', locale),
    artifacts,
    smokeConfig: exportConfig.smoke,
    labels: {
      download: t('export.actions.download', locale),
      copy: t('export.actions.copy', locale),
      copyDone: t('export.actions.copyDone', locale),
      devOnly: t('export.notice.devOnly', locale),
      openAll: t('export.smoke.openAll', locale),
    },
  };
};
