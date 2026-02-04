/**
 * Publish Center Page Data Loader
 *
 * Dev-only tool for assembling publish packets.
 * Returns 404 in production.
 */

import type { PageLoad } from './$types';
import { isLocaleSupported, t, type Locale, type TranslationKey } from '$config/i18n.config';
import { rcConfig } from '$config/rc.config';
import { rcCompareConfig } from '$config/rc-compare.config';
import { changelogConfig, type ChangelogGroupId } from '$config/changelog.config';
import { releaseNotesConfig } from '$config/release-notes.config';
import { publishConfig, type PublishFileId } from '$config/publish.config';
import { gateConfig } from '$config/gate.config';
import { assertDevToolAllowed } from '$lib/devtools/guard';

export const load: PageLoad = ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Resolve locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Check if Publish is enabled
  if (!publishConfig.enabled) {
    return {
      locale,
      enabled: false,
      title: t('publish.title', locale),
      subtitle: t('publish.subtitle', locale),
      labels: {
        devOnly: t('publish.notice.devOnly', locale),
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

  // Build file titles
  const fileTitles: Record<PublishFileId, string> = {
    rc_bundle: t('publish.file.rc_bundle.title', locale),
    rc_snapshot: t('publish.file.rc_snapshot.title', locale),
    rc_gate: t('publish.file.rc_gate.title', locale),
    rc_release: t('publish.file.rc_release.title', locale),
    rc_smoke: t('publish.file.rc_smoke.title', locale),
    release_notes_en_md: t('publish.file.release_notes_en_md.title', locale),
    release_notes_ru_md: t('publish.file.release_notes_ru_md.title', locale),
    release_notes_en_json: t('publish.file.release_notes_en_json.title', locale),
    release_notes_ru_json: t('publish.file.release_notes_ru_json.title', locale),
    manifest: t('publish.file.manifest.title', locale),
    deployment_steps_en: t('publish.file.deployment_steps_en.title', locale),
    deployment_steps_ru: t('publish.file.deployment_steps_ru.title', locale),
    publish_checklist: t('publish.file.publish_checklist.title', locale),
  };

  // Build checklist titles
  const checklistTitles: Record<string, string> = {};
  for (const item of publishConfig.checklistItems) {
    checklistTitles[item.id] = t(item.titleKey as TranslationKey, locale);
  }

  // Build priority labels
  const priorityLabels = {
    p0: t('publish.priority.p0', locale),
    p1: t('publish.priority.p1', locale),
    p2: t('publish.priority.p2', locale),
  };

  // Build status labels
  const statusLabels = {
    draft: t('publish.packet.status.draft', locale),
    ready: t('publish.packet.status.ready', locale),
    published: t('publish.packet.status.published', locale),
  };

  return {
    locale,
    enabled: true,
    title: t('publish.title', locale),
    subtitle: t('publish.subtitle', locale),
    rcConfig,
    rcCompareConfig,
    changelogConfig,
    releaseNotesConfig,
    publishConfig,
    changelogGroupTitles,
    linkLabels,
    fileTitles,
    checklistTitles,
    priorityLabels,
    statusLabels,
    labels: {
      devOnly: t('publish.notice.devOnly', locale),
      selectRc: t('publish.selectRc.label', locale),
      // Actions
      createPacket: t('publish.actions.createPacket', locale),
      savePacket: t('publish.actions.savePacket', locale),
      loadPacket: t('publish.actions.loadPacket', locale),
      deletePacket: t('publish.actions.deletePacket', locale),
      download: t('publish.actions.download', locale),
      downloadAll: t('publish.actions.downloadAll', locale),
      copy: t('publish.actions.copy', locale),
      copyDone: t('publish.actions.copyDone', locale),
      generate: t('publish.actions.generate', locale),
      regenerate: t('publish.actions.regenerate', locale),
      // Section titles
      sections: {
        packet: t('publish.section.packet.title', locale),
        files: t('publish.section.files.title', locale),
        checklist: t('publish.section.checklist.title', locale),
        deployment: t('publish.section.deployment.title', locale),
        savedPackets: t('publish.section.savedPackets.title', locale),
      },
      // Packet labels
      packet: {
        nameLabel: t('publish.packet.name.label', locale),
        namePlaceholder: t('publish.packet.name.placeholder', locale),
        createdLabel: t('publish.packet.created.label', locale),
      },
      // Saved packets
      savedPackets: {
        empty: t('publish.savedPackets.empty', locale),
        load: t('publish.savedPackets.load', locale),
        delete: t('publish.savedPackets.delete', locale),
      },
      // Manifest
      manifest: {
        version: t('publish.manifest.version', locale),
        buildDate: t('publish.manifest.buildDate', locale),
        rcFrom: t('publish.manifest.rcFrom', locale),
        rcTo: t('publish.manifest.rcTo', locale),
      },
      // Release notes labels (for building docs)
      mostChanges: t('releaseNotes.highlights.mostChanges', locale),
      nextStepsPlaceholder: t('releaseNotes.nextSteps.placeholder', locale),
    },
  };
};
