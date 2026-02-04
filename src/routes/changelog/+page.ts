/**
 * Changelog Page Data Loader
 *
 * Dev-only tool for generating changelogs from RC diffs.
 * Returns 404 in production.
 */

import type { PageLoad } from './$types';
import { isLocaleSupported, t, type Locale, type TranslationKey } from '$config/i18n.config';
import { rcConfig } from '$config/rc.config';
import { rcCompareConfig } from '$config/rc-compare.config';
import { changelogConfig, type ChangelogGroupId } from '$config/changelog.config';
import { gateConfig } from '$config/gate.config';
import { assertDevToolAllowed } from '$lib/devtools/guard';

export const load: PageLoad = ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Resolve locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Check if Changelog is enabled
  if (!changelogConfig.enabled) {
    return {
      locale,
      enabled: false,
      title: t('changelog.title', locale),
      subtitle: t('changelog.subtitle', locale),
      labels: {
        devOnly: t('changelog.notice.devOnly', locale),
      },
    };
  }

  // Build group title labels
  const groupTitles: Record<ChangelogGroupId, string> = {} as Record<ChangelogGroupId, string>;
  for (const group of changelogConfig.groups) {
    groupTitles[group.id] = t(group.titleKey as TranslationKey, locale);
  }

  return {
    locale,
    enabled: true,
    title: t('changelog.title', locale),
    subtitle: t('changelog.subtitle', locale),
    rcConfig,
    rcCompareConfig,
    changelogConfig,
    labels: {
      devOnly: t('changelog.notice.devOnly', locale),
      selectA: t('changelog.select.a', locale),
      selectB: t('changelog.select.b', locale),
      swap: t('changelog.actions.swap', locale),
      exportMd: t('changelog.actions.exportMd', locale),
      exportJson: t('changelog.actions.exportJson', locale),
      copyEn: t('changelog.actions.copyEn', locale),
      copyRu: t('changelog.actions.copyRu', locale),
      copyDone: t('changelog.actions.copyDone', locale),
      languageLabel: t('changelog.view.languageLabel', locale),
      showJson: t('changelog.view.showJson', locale),
      summaryTitle: t('changelog.summary.title', locale),
      changedGroups: t('changelog.summary.changedGroups', locale),
      totalItems: t('changelog.summary.totalItems', locale),
      emptyTitle: t('changelog.empty.title', locale),
      emptyText: t('changelog.empty.text', locale),
      template: {
        headerTitle: t('changelog.template.headerTitle', locale),
        added: t('changelog.template.added', locale),
        changed: t('changelog.template.changed', locale),
        removed: t('changelog.template.removed', locale),
        fixed: t('changelog.template.fixed', locale),
        notes: t('changelog.template.notes', locale),
        truncatedNote: t('changelog.template.truncatedNote', locale),
      },
      groupTitles,
    },
  };
};
