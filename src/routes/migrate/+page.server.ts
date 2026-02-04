/**
 * Migration Prep Page Data Loader (Server-side)
 *
 * Dev-only tool for exporting data in formats ready for Prisma/Postgres migration.
 * Returns 404 in production.
 */

import type { PageServerLoad } from './$types';
import { isLocaleSupported, t, type Locale } from '$config/i18n.config';
import { gateConfig } from '$config/gate.config';
import { migrateConfig } from '$config/migrate.config';
import { assertDevToolAllowed } from '$lib/devtools/guard';
import { getRepositories } from '$lib/adapters';
import {
  buildRawExport,
  buildSeedExport,
  validateData,
  buildMigrationMap,
  renderMigrationMapMd,
} from '$lib/migrate';

export const load: PageServerLoad = async ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Resolve locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Get repositories and load all data
  const repos = getRepositories();

  // Load all leads and requests (no limit for full export)
  const leadsResult = await repos.leads.list({ limit: 10000 });
  const requestsResult = await repos.requests.list({ limit: 10000 });

  const leads = leadsResult.records;
  const requests = requestsResult.records;

  // Build all export artifacts
  const rawExport = buildRawExport(leads, requests);
  const seedExport = buildSeedExport(leads, requests);
  const validationReport = validateData(leads, requests, migrateConfig.limits.maxNotesLen);
  const migrationMap = buildMigrationMap();
  const migrationMapMd = renderMigrationMapMd(migrationMap);

  return {
    locale,
    config: migrateConfig,
    // Export data
    rawExport,
    seedExport,
    validationReport,
    migrationMap,
    migrationMapMd,
    // Labels
    labels: {
      title: t('migrate.title', locale),
      subtitle: t('migrate.subtitle', locale),
      devOnly: t('migrate.notice.devOnly', locale),
      sections: {
        export: t('migrate.section.export.title', locale),
        seed: t('migrate.section.seed.title', locale),
        map: t('migrate.section.map.title', locale),
        validation: t('migrate.section.validation.title', locale),
      },
      actions: {
        downloadRaw: t('migrate.actions.downloadRaw', locale),
        downloadSeed: t('migrate.actions.downloadSeed', locale),
        downloadMapJson: t('migrate.actions.downloadMapJson', locale),
        downloadMapMd: t('migrate.actions.downloadMapMd', locale),
        downloadValidation: t('migrate.actions.downloadValidation', locale),
        copy: t('migrate.actions.copy', locale),
        copyDone: t('migrate.actions.copyDone', locale),
      },
      summary: {
        leadsCount: t('migrate.summary.leadsCount', locale),
        requestsCount: t('migrate.summary.requestsCount', locale),
        notesCount: t('migrate.summary.notesCount', locale),
        tagsCount: t('migrate.summary.tagsCount', locale),
      },
      validation: {
        title: t('migrate.validation.title', locale),
        invalidEmails: t('migrate.validation.invalidEmails', locale),
        duplicates: t('migrate.validation.duplicates', locale),
        missingFields: t('migrate.validation.missingFields', locale),
        invalidStatuses: t('migrate.validation.invalidStatuses', locale),
        oversizedNotes: t('migrate.validation.oversizedNotes', locale),
        warnings: t('migrate.validation.warnings', locale),
        passed: t('migrate.validation.passed', locale),
      },
    },
  };
};
