/**
 * Release Notes Page Data Loader
 *
 * Dev-only tool for generating release notes pack.
 * Returns 404 in production.
 */

import type { PageLoad } from './$types';
import { isLocaleSupported, t, type Locale, type TranslationKey } from '$config/i18n.config';
import { rcConfig } from '$config/rc.config';
import { rcCompareConfig } from '$config/rc-compare.config';
import { changelogConfig, type ChangelogGroupId } from '$config/changelog.config';
import { releaseNotesConfig } from '$config/release-notes.config';
import { gateConfig } from '$config/gate.config';
import { assertDevToolAllowed } from '$lib/devtools/guard';

export const load: PageLoad = ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Resolve locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Check if Release Notes is enabled
  if (!releaseNotesConfig.enabled) {
    return {
      locale,
      enabled: false,
      title: t('releaseNotes.title', locale),
      subtitle: t('releaseNotes.subtitle', locale),
      labels: {
        devOnly: t('releaseNotes.notice.devOnly', locale),
      },
    };
  }

  // Build changelog group titles
  const changelogGroupTitles: Record<ChangelogGroupId, string> = {} as Record<ChangelogGroupId, string>;
  for (const group of changelogConfig.groups) {
    changelogGroupTitles[group.id] = t(group.titleKey as TranslationKey, locale);
  }

  // Build link labels
  const linkLabels = {
    home: t('nav.home', locale),
    trust: t('nav.trust', locale),
    workflow: 'Workflow',
    presale: t('nav.presale', locale),
    configurator: t('nav.configurator', locale),
    partners: t('nav.partners', locale),
    investors: t('nav.investors', locale),
    customers: t('nav.customers', locale),
    token: t('nav.token', locale),
  };

  return {
    locale,
    enabled: true,
    title: t('releaseNotes.title', locale),
    subtitle: t('releaseNotes.subtitle', locale),
    rcConfig,
    rcCompareConfig,
    changelogConfig,
    releaseNotesConfig,
    changelogGroupTitles,
    linkLabels,
    labels: {
      devOnly: t('releaseNotes.notice.devOnly', locale),
      selectA: t('releaseNotes.select.a', locale),
      selectB: t('releaseNotes.select.b', locale),
      swap: t('releaseNotes.actions.swap', locale),
      exportMd: t('releaseNotes.actions.exportMd', locale),
      exportJson: t('releaseNotes.actions.exportJson', locale),
      copyEn: t('releaseNotes.actions.copyEn', locale),
      copyRu: t('releaseNotes.actions.copyRu', locale),
      copyDone: t('releaseNotes.actions.copyDone', locale),
      languageLabel: t('releaseNotes.view.languageLabel', locale),
      // Section titles
      sections: {
        meta: t('releaseNotes.sections.meta.title', locale),
        readiness: t('releaseNotes.sections.readiness.title', locale),
        highlights: t('releaseNotes.sections.highlights.title', locale),
        changelog: t('releaseNotes.sections.changelog.title', locale),
        quality: t('releaseNotes.sections.quality.title', locale),
        knownIssues: t('releaseNotes.sections.knownIssues.title', locale),
        links: t('releaseNotes.sections.links.title', locale),
        nextSteps: t('releaseNotes.sections.nextSteps.title', locale),
      },
      // Meta labels
      meta: {
        generatedAt: t('releaseNotes.meta.generatedAt', locale),
        fromRc: t('releaseNotes.meta.fromRc', locale),
        toRc: t('releaseNotes.meta.toRc', locale),
        status: t('releaseNotes.meta.status', locale),
      },
      // Readiness labels
      readiness: {
        overall: t('releaseNotes.readiness.overall', locale),
        releaseP0: t('releaseNotes.readiness.releaseP0', locale),
        smokeP0: t('releaseNotes.readiness.smokeP0', locale),
        i18nMissing: t('releaseNotes.readiness.i18nMissing', locale),
      },
      // Quality labels
      quality: {
        releaseChecklist: t('releaseNotes.quality.releaseChecklist', locale),
        smokeChecklist: t('releaseNotes.quality.smokeChecklist', locale),
      },
      // Known issues labels
      knownIssues: {
        add: t('releaseNotes.knownIssues.add', locale),
        edit: t('releaseNotes.knownIssues.edit', locale),
        delete: t('releaseNotes.knownIssues.delete', locale),
        severityLabel: t('releaseNotes.knownIssues.severityLabel', locale),
        ownerLabel: t('releaseNotes.knownIssues.ownerLabel', locale),
        notesPlaceholder: t('releaseNotes.knownIssues.notesPlaceholder', locale),
        empty: t('releaseNotes.knownIssues.empty', locale),
        severity: {
          low: t('releaseNotes.knownIssues.severity.low', locale),
          medium: t('releaseNotes.knownIssues.severity.medium', locale),
          high: t('releaseNotes.knownIssues.severity.high', locale),
        },
      },
      // Links
      linksOpen: t('releaseNotes.links.open', locale),
      // Highlights
      mostChanges: t('releaseNotes.highlights.mostChanges', locale),
      // Next steps
      nextStepsPlaceholder: t('releaseNotes.nextSteps.placeholder', locale),
    },
  };
};
