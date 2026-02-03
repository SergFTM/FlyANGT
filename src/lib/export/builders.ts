/**
 * Export Data Builders
 *
 * Functions to build export artifacts.
 * Reuses existing logic from snapshot, release, and i18n modules.
 */

import { routes } from '$config/routes.config';
import { modulesConfig } from '$config/modules.config';
import { trustCategories, trustDocs } from '$config/trust.config';
import { workflowConfig } from '$config/workflow.config';
import { tokenizationConfig } from '$config/tokenization.config';
import { presaleConfig } from '$config/presale.config';
import { configuratorConfig } from '$config/configurator.config';
import { partnersConfig } from '$config/partners.config';
import { investorsConfig } from '$config/investors.config';
import { customersConfig } from '$config/customers.config';
import { homeConfig } from '$config/home.config';
import { releaseConfig } from '$config/release.config';
import { appConfig } from '$config/app.config';
import { prelaunchConfig } from '$config/prelaunch.config';
import { exportConfig } from '$config/export.config';
import { translations, type Locale } from '$config/i18n.config';
import {
  makeDefaultState,
  mergeState,
  computeOverallProgress,
  computeModuleProgress,
  type ReleaseState,
} from '$lib/models/release.model';
import { resolveDraftKey } from '$lib/prelaunch';
import {
  getRegisteredKeys,
  getMissingKeysForLocale,
  getCoverageStats,
  getMissingKeysSet,
} from '$lib/i18n/registry';

/**
 * Build snapshot object
 * Reuses the same composition from /snapshot route
 */
export function buildSnapshot(): object {
  const generatedAt = new Date().toISOString();

  return {
    generatedAt,
    appVersion: appConfig.version,
    prelaunch: {
      mode: prelaunchConfig.mode,
    },
    configs: {
      routes: {
        count: routes.length,
        ids: routes.map(r => r.id),
      },
      modules: {
        totalCount: modulesConfig.length,
        enabledModules: modulesConfig.filter(m => m.enabled).map(m => m.id),
      },
      trust: {
        categoriesCount: trustCategories.length,
        documentsCount: trustDocs.length,
        categoryIds: trustCategories.map(c => c.id),
        documentIds: trustDocs.map(d => d.id),
      },
      workflow: {
        stepsCount: workflowConfig.steps.length,
        stepIds: workflowConfig.steps.map(s => s.id),
      },
      tokenization: {
        phasesCount: tokenizationConfig.phases.length,
        phaseIds: tokenizationConfig.phases.map(p => p.id),
      },
      presale: {
        enabled: presaleConfig.enabled,
        weeksCount: presaleConfig.weeks.length,
        minCommitUsd: presaleConfig.minCommitUsd,
        maxCommitUsd: presaleConfig.maxCommitUsd,
      },
      configurator: {
        groupsCount: configuratorConfig.groups.length,
        groupIds: configuratorConfig.groups.map(g => g.id),
        optionsCount: configuratorConfig.groups.reduce((sum, g) => sum + g.options.length, 0),
      },
      partners: {
        tiersCount: partnersConfig.tiers.length,
        partnersCount: partnersConfig.partners.length,
        tierIds: partnersConfig.tiers.map(t => t.id),
        partnerIds: partnersConfig.partners.map(p => p.id),
      },
      investors: {
        tiersCount: investorsConfig.tiers.length,
        documentsCount: investorsConfig.documents.length,
        tierIds: investorsConfig.tiers.map(t => t.id),
        documentIds: investorsConfig.documents.map(d => d.id),
      },
      customers: {
        tiersCount: customersConfig.tiers.length,
        documentsCount: customersConfig.documents.length,
        tierIds: customersConfig.tiers.map(t => t.id),
        documentIds: customersConfig.documents.map(d => d.id),
      },
      home: {
        sectionsCount: homeConfig.sections.length,
        sectionIds: homeConfig.sections.map(s => s.id),
      },
      release: {
        modulesCount: releaseConfig.modules.length,
        totalChecks: releaseConfig.modules.reduce((sum, m) => sum + m.checks.length, 0),
        moduleIds: releaseConfig.modules.map(m => m.id),
      },
    },
    contentMeta: {
      pages: [
        { id: 'home', sections: ['hero', 'features', 'showcase', 'cta'] },
        { id: 'ecosystem', sections: ['hero', 'modules', 'benefits'] },
        { id: 'tokenization', sections: ['hero', 'phases', 'benefits', 'faq'] },
        { id: 'platform', sections: ['hero', 'features', 'specs'] },
        { id: 'partners', sections: ['hero', 'tiers', 'benefits', 'cta'] },
        { id: 'investors', sections: ['hero', 'tiers', 'documents', 'cta'] },
        { id: 'customers', sections: ['hero', 'tiers', 'documents', 'cta'] },
        { id: 'presale', sections: ['hero', 'calculator', 'weeks', 'faq'] },
        { id: 'configurator', sections: ['hero', 'groups', 'summary'] },
        { id: 'workflow', sections: ['hero', 'steps', 'cta'] },
      ],
    },
  };
}

/**
 * Build release state object
 * Combines config defaults with stored state
 */
export function buildReleaseState(storedState: ReleaseState | null): object {
  const generatedAt = new Date().toISOString();
  const defaultState = makeDefaultState(releaseConfig);
  const mergedState = mergeState(defaultState, storedState);

  const overall = computeOverallProgress(releaseConfig, mergedState);

  const modules = releaseConfig.modules.map(mod => ({
    id: mod.id,
    titleKey: mod.titleKey,
    progress: computeModuleProgress(mod, mergedState),
    checks: mod.checks.map(check => ({
      id: check.id,
      titleKey: check.titleKey,
      priority: check.priority,
      state: mergedState[check.id] || {
        status: check.statusDefault,
        notes: '',
        updatedAt: generatedAt,
      },
    })),
  }));

  return {
    generatedAt,
    overallProgress: overall,
    modules,
    state: mergedState,
  };
}

/**
 * Load release state from localStorage (client-side only)
 */
export function loadReleaseStateFromStorage(): ReleaseState | null {
  if (typeof window === 'undefined') return null;

  const storageKey = exportConfig.storage.releaseKeyFromConfig
    ? resolveDraftKey(releaseConfig.storageKey, prelaunchConfig)
    : releaseConfig.storageKey;

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }

  return null;
}

/**
 * Build i18n report object
 */
export function buildI18nReport(): object {
  const generatedAt = new Date().toISOString();

  const locales: Locale[] = ['en', 'ru'];
  const registeredKeys = getRegisteredKeys();
  const totalKeys = Object.keys(translations.en || {}).length;

  const localeReports = locales.reduce((acc, locale) => {
    const stats = getCoverageStats(locale);
    const missingKeys = getMissingKeysForLocale(locale);
    const dictionarySize = Object.keys(translations[locale] || {}).length;

    acc[locale] = {
      dictionarySize,
      registeredKeys: registeredKeys.length,
      translated: stats.totalTranslated,
      missing: stats.missing,
      coverage: stats.coverage,
      missingKeys,
    };
    return acc;
  }, {} as Record<Locale, object>);

  // Get runtime missing keys
  const runtimeMissingSet = getMissingKeysSet();
  const runtimeMissingKeys = Array.from(runtimeMissingSet).map(({ key, locale }) => ({
    key,
    locale,
  }));

  return {
    generatedAt,
    totalKeysInDictionary: totalKeys,
    registeredKeysCount: registeredKeys.length,
    locales: localeReports,
    runtimeMissingKeys,
  };
}

/**
 * Smoke link entry
 */
export interface SmokeLink {
  id: string;
  path: string;
  titleKey: string;
  moduleId: string | null;
  url: string;
}

/**
 * Build smoke test links
 */
export function buildSmokeLinks(locale: Locale, baseUrl: string = ''): object {
  const generatedAt = new Date().toISOString();
  const { smoke } = exportConfig;

  // Filter routes based on config
  let filteredRoutes = routes.filter(route => {
    // Exclude by route id
    if (smoke.excludeRouteIds.includes(route.id)) {
      return false;
    }

    // Exclude by path prefix
    for (const prefix of smoke.excludePathPrefixes) {
      if (route.path.startsWith(prefix)) {
        return false;
      }
    }

    // Check nav visibility if required
    if (smoke.includeNavVisibleOnly) {
      const moduleConfig = modulesConfig.find(m => m.id === route.moduleId);
      if (moduleConfig && !moduleConfig.navVisible) {
        return false;
      }
    }

    return true;
  });

  // Apply max links limit
  if (smoke.maxLinks > 0) {
    filteredRoutes = filteredRoutes.slice(0, smoke.maxLinks);
  }

  // Build link objects with URLs
  const langParam = locale !== 'en' ? `?lang=${locale}` : '';
  const links: SmokeLink[] = filteredRoutes.map(route => ({
    id: route.id,
    path: route.path,
    titleKey: route.titleKey,
    moduleId: route.moduleId,
    url: `${baseUrl}${route.path}${langParam}`,
  }));

  return {
    generatedAt,
    locale,
    totalRoutes: routes.length,
    filteredCount: links.length,
    maxLinks: smoke.maxLinks,
    links,
  };
}

/**
 * Build complete export bundle
 */
export function buildBundle(
  locale: Locale,
  storedReleaseState: ReleaseState | null,
  baseUrl: string = ''
): object {
  const generatedAt = new Date().toISOString();

  return {
    generatedAt,
    locale,
    snapshot: buildSnapshot(),
    release: buildReleaseState(storedReleaseState),
    i18n: buildI18nReport(),
    smoke: buildSmokeLinks(locale, baseUrl),
  };
}

/**
 * Generate export filename with timestamp
 */
export function generateFilename(prefix: string): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');

  return `${prefix}-${yyyy}${mm}${dd}-${hh}${min}.json`;
}
