/**
 * Backup Page Data Loader
 *
 * Dev-only tool for backup and restore operations.
 * Returns 404 in production.
 */

import type { PageLoad } from './$types';
import { isLocaleSupported, t, type Locale } from '$config/i18n.config';
import { gateConfig } from '$config/gate.config';
import { backupConfig, getRestoreModeOptions } from '$config/backup.config';
import { assertDevToolAllowed } from '$lib/devtools/guard';
import { getStorageMode } from '$config/storage.config';

export const load: PageLoad = ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Resolve locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Get restore mode options
  const restoreModeOptions = getRestoreModeOptions();

  return {
    locale,
    config: backupConfig,
    storageMode: getStorageMode(),
    restoreModeOptions,
    labels: {
      title: t('backup.title', locale),
      subtitle: t('backup.subtitle', locale),
      devOnly: t('backup.notice.devOnly', locale),
      sections: {
        create: t('backup.section.create.title', locale),
        restore: t('backup.section.restore.title', locale),
      },
      actions: {
        create: t('backup.actions.create', locale),
        download: t('backup.actions.download', locale),
        copy: t('backup.actions.copy', locale),
        validate: t('backup.actions.validate', locale),
        dryRun: t('backup.actions.dryRun', locale),
        applyMerge: t('backup.actions.applyMerge', locale),
        applyOverwrite: t('backup.actions.applyOverwrite', locale),
        copyDone: t('backup.actions.copyDone', locale),
      },
      fields: {
        restoreMode: t('backup.fields.restoreMode', locale),
        pasteJsonPlaceholder: t('backup.fields.pasteJsonPlaceholder', locale),
      },
      summary: {
        counts: t('backup.summary.counts', locale),
      },
      report: {
        created: t('backup.report.created', locale),
        updated: t('backup.report.updated', locale),
        deleted: t('backup.report.deleted', locale),
        errors: t('backup.report.errors', locale),
      },
      errors: {
        tooLarge: t('backup.errors.tooLarge', locale),
        invalidJson: t('backup.errors.invalidJson', locale),
      },
      modes: {
        merge: t('backup.mode.merge', locale),
        overwrite: t('backup.mode.overwrite', locale),
      },
      warning: {
        overwrite: t('backup.warning.overwrite', locale),
      },
      storage: {
        label: t('storage.mode.label', locale),
        config: t('storage.mode.config', locale),
        prisma: t('storage.mode.prisma', locale),
      },
    },
  };
};
