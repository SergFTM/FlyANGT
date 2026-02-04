/**
 * Post Release Page Data Loader
 *
 * Dev-only tool for generating post-release reports.
 * Returns 404 in production.
 */

import type { PageLoad } from './$types';
import { isLocaleSupported, t, type Locale } from '$config/i18n.config';
import { postReleaseConfig } from '$config/post-release.config';
import { publishConfig } from '$config/publish.config';
import { gateConfig } from '$config/gate.config';
import { assertDevToolAllowed } from '$lib/devtools/guard';

export const load: PageLoad = ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Resolve locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Check if Post Release is enabled
  if (!postReleaseConfig.enabled) {
    return {
      locale,
      enabled: false,
      title: t('postRelease.title', locale),
      subtitle: t('postRelease.subtitle', locale),
      labels: {
        devOnly: t('postRelease.notice.devOnly', locale),
      },
    };
  }

  return {
    locale,
    enabled: true,
    title: t('postRelease.title', locale),
    subtitle: t('postRelease.subtitle', locale),
    postReleaseConfig,
    publishPacketsKey: publishConfig.storage.packetsKey,
    publishChecklistKeyPrefix: publishConfig.storage.checklistKeyPrefix,
    labels: {
      devOnly: t('postRelease.notice.devOnly', locale),
      selectPacket: t('postRelease.selectPacket.label', locale),
      // Actions
      newReport: t('postRelease.actions.newReport', locale),
      save: t('postRelease.actions.save', locale),
      delete: t('postRelease.actions.delete', locale),
      exportMd: t('postRelease.actions.exportMd', locale),
      exportJson: t('postRelease.actions.exportJson', locale),
      copyEn: t('postRelease.actions.copyEn', locale),
      copyRu: t('postRelease.actions.copyRu', locale),
      copyDone: t('postRelease.actions.copyDone', locale),
      languageLabel: t('postRelease.view.languageLabel', locale),
      // Section titles
      sections: {
        meta: t('postRelease.sections.meta.title', locale),
        deployment: t('postRelease.sections.deployment.title', locale),
        readiness: t('postRelease.sections.readiness.title', locale),
        issues: t('postRelease.sections.issues.title', locale),
        incidents: t('postRelease.sections.incidents.title', locale),
        actions: t('postRelease.sections.actions.title', locale),
        notes: t('postRelease.sections.notes.title', locale),
      },
      // Field labels
      fields: {
        releaseDate: t('postRelease.fields.releaseDate', locale),
        environment: t('postRelease.fields.environment', locale),
        deployUrl: t('postRelease.fields.deployUrl', locale),
        tagOrCommit: t('postRelease.fields.tagOrCommit', locale),
        gateStatus: t('postRelease.fields.gateStatus', locale),
        issuesFound: t('postRelease.fields.issuesFound', locale),
        incidents: t('postRelease.fields.incidents', locale),
        actionItems: t('postRelease.fields.actionItems', locale),
        owner: t('postRelease.fields.owner', locale),
        due: t('postRelease.fields.due', locale),
        notes: t('postRelease.fields.notes', locale),
      },
      // Status labels
      status: {
        green: t('postRelease.status.green', locale),
        yellow: t('postRelease.status.yellow', locale),
        red: t('postRelease.status.red', locale),
      },
      // Environment labels
      env: {
        prod: t('postRelease.env.prod', locale),
        staging: t('postRelease.env.staging', locale),
      },
      // List labels
      list: {
        title: t('postRelease.list.title', locale),
        emptyTitle: t('postRelease.list.empty.title', locale),
        emptyText: t('postRelease.list.empty.text', locale),
      },
      // Placeholder
      none: t('postRelease.placeholder.none', locale),
    },
  };
};
