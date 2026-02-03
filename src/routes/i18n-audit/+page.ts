/**
 * I18n Audit Page Data Loader
 *
 * Dev-only page for auditing translation coverage.
 * Returns 404 in production builds.
 */

import type { PageLoad } from './$types';
import { initializeKeyRegistry } from '$lib/i18n/keys';
import { getAuditReport, getRegisteredKeysByModule } from '$lib/i18n/registry';
import { gateConfig } from '$config/gate.config';
import type { Locale } from '$config/i18n.config';
import { assertDevToolAllowed } from '$lib/devtools/guard';

export const load: PageLoad = ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Initialize key registry
  initializeKeyRegistry();

  // Get audit data
  const report = getAuditReport();
  const moduleKeys = getRegisteredKeysByModule();

  // Format module data for display
  const modules = Array.from(moduleKeys.entries()).map(([id, keys]) => ({
    id,
    keyCount: keys.length,
    keys,
  }));

  // Format locale data
  const locales = report.locales.map(l => ({
    locale: l.locale as Locale,
    totalRegistered: l.stats.totalRegistered,
    totalTranslated: l.stats.totalTranslated,
    missing: l.stats.missing,
    coverage: l.stats.coverage,
    missingKeys: l.missingKeys,
  }));

  return {
    title: 'I18n Audit - Dev Tool',
    locales,
    modules,
    runtimeMissing: report.runtimeMissing,
    totalKeys: locales[0]?.totalRegistered ?? 0,
  };
};
