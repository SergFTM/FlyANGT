/**
 * RC Compare Page Data Loader
 *
 * Dev-only tool for comparing Release Candidates.
 * Returns 404 in production.
 */

import type { PageLoad } from './$types';
import { isLocaleSupported, t, type Locale, type TranslationKey } from '$config/i18n.config';
import { rcConfig } from '$config/rc.config';
import { rcCompareConfig, type RcCompareGroupId } from '$config/rc-compare.config';
import { gateConfig } from '$config/gate.config';
import { assertDevToolAllowed } from '$lib/devtools/guard';

export const load: PageLoad = ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Resolve locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Check if RC Compare is enabled
  if (!rcCompareConfig.enabled) {
    return {
      locale,
      enabled: false,
      title: t('rcCompare.title', locale),
      subtitle: t('rcCompare.subtitle', locale),
      labels: {
        devOnly: t('rcCompare.notice.devOnly', locale),
      },
    };
  }

  // Build group title labels
  const groupTitles: Record<RcCompareGroupId, string> = {} as Record<RcCompareGroupId, string>;
  for (const group of rcCompareConfig.groups) {
    groupTitles[group.id] = t(group.titleKey as TranslationKey, locale);
  }

  return {
    locale,
    enabled: true,
    title: t('rcCompare.title', locale),
    subtitle: t('rcCompare.subtitle', locale),
    rcConfig,
    rcCompareConfig,
    labels: {
      devOnly: t('rcCompare.notice.devOnly', locale),
      selectA: t('rcCompare.select.a', locale),
      selectB: t('rcCompare.select.b', locale),
      swap: t('rcCompare.actions.swap', locale),
      export: t('rcCompare.actions.export', locale),
      copy: t('rcCompare.actions.copy', locale),
      copyDone: t('rcCompare.actions.copyDone', locale),
      summaryTitle: t('rcCompare.summary.title', locale),
      changedGroups: t('rcCompare.summary.changedGroups', locale),
      totalChanges: t('rcCompare.summary.totalChanges', locale),
      emptyTitle: t('rcCompare.empty.title', locale),
      emptyText: t('rcCompare.empty.text', locale),
      diffAdded: t('rcCompare.diff.added', locale),
      diffRemoved: t('rcCompare.diff.removed', locale),
      diffChanged: t('rcCompare.diff.changed', locale),
      showOnlyChanged: t('rcCompare.view.showOnlyChanged', locale),
      showAll: t('rcCompare.view.showAll', locale),
      groupTitles,
    },
  };
};
