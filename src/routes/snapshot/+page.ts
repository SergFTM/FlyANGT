/**
 * Snapshot Page Data Loader
 *
 * Dev-only tool for exporting configuration snapshot.
 * Returns 404 in production.
 */

import type { PageLoad } from './$types';
import { isLocaleSupported, t, type Locale } from '$config/i18n.config';
import { prelaunchConfig } from '$config/prelaunch.config';
import { gateConfig } from '$config/gate.config';
import { isSnapshotEnabled } from '$lib/prelaunch';
import { assertDevToolAllowed } from '$lib/devtools/guard';

// Import all configs for snapshot
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

export const load: PageLoad = ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Resolve locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Check if snapshot is enabled
  const isDev = import.meta.env.DEV;
  const enabled = isSnapshotEnabled(prelaunchConfig, isDev);

  if (!enabled) {
    return {
      locale,
      enabled: false,
      title: t('snapshot.title', locale),
      subtitle: t('snapshot.subtitle', locale),
      disabledMessage: t('snapshot.disabled', locale),
      labels: {
        devOnly: t('snapshot.notice.devOnly', locale),
      },
    };
  }

  // Build snapshot object
  const snapshot = buildSnapshot();

  // Count configs and pages
  const configCount = Object.keys(snapshot.configs).length;
  const pageCount = snapshot.contentMeta.pages.length;

  return {
    locale,
    enabled: true,
    title: t('snapshot.title', locale),
    subtitle: t('snapshot.subtitle', locale),
    snapshot,
    configCount,
    pageCount,
    labels: {
      download: t('snapshot.actions.download', locale),
      copy: t('snapshot.actions.copy', locale),
      devOnly: t('snapshot.notice.devOnly', locale),
      copied: t('snapshot.copied', locale),
      mode: t('snapshot.summary.mode', locale),
      configs: t('snapshot.summary.configs', locale),
      pages: t('snapshot.summary.pages', locale),
      generated: t('snapshot.summary.generated', locale),
    },
    exportFilePrefix: prelaunchConfig.snapshot.exportFilePrefix,
  };
};

/**
 * Build the complete snapshot object
 */
function buildSnapshot() {
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
