/**
 * Release Checklist Configuration
 *
 * Dev tool only - tracks release readiness across modules.
 * Replace localStorage with DB later if needed.
 */

export type ReleaseStatus = 'todo' | 'in_progress' | 'blocked' | 'done' | 'na';
export type ReleasePriority = 'p0' | 'p1' | 'p2';

export interface ReleaseCheck {
  id: string;
  titleKey: string;
  textKey?: string;
  priority: ReleasePriority;
  statusDefault: ReleaseStatus;
  owner?: string;
}

export interface ReleaseModule {
  id: string;
  titleKey: string;
  order: number;
  checks: ReleaseCheck[];
}

export interface ReleaseConfig {
  enabled: boolean;
  storageKey: string;
  exportFilePrefix: string;
  modules: ReleaseModule[];
}

/**
 * Release checklist configuration
 * Dev tool only
 */
export const releaseConfig: ReleaseConfig = {
  enabled: true,
  storageKey: 'flyangt-release-checklist',
  exportFilePrefix: 'flyangt-release',
  modules: [
    // Home Module
    {
      id: 'home',
      titleKey: 'release.module.home.title',
      order: 1,
      checks: [
        { id: 'home-no-hardcoded', titleKey: 'release.check.home-no-hardcoded.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'home-i18n-coverage', titleKey: 'release.check.home-i18n-coverage.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'home-nav-links', titleKey: 'release.check.home-nav-links.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'home-responsive', titleKey: 'release.check.home-responsive.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'home-module-cards', titleKey: 'release.check.home-module-cards.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'home-pathway-links', titleKey: 'release.check.home-pathway-links.title', priority: 'p1', statusDefault: 'todo' },
      ],
    },

    // Trust Center Module
    {
      id: 'trust',
      titleKey: 'release.module.trust.title',
      order: 2,
      checks: [
        { id: 'trust-no-hardcoded', titleKey: 'release.check.trust-no-hardcoded.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'trust-i18n-coverage', titleKey: 'release.check.trust-i18n-coverage.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'trust-filter-works', titleKey: 'release.check.trust-filter-works.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'trust-search-works', titleKey: 'release.check.trust-search-works.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'trust-empty-state', titleKey: 'release.check.trust-empty-state.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'trust-doc-links', titleKey: 'release.check.trust-doc-links.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'trust-detail-pages', titleKey: 'release.check.trust-detail-pages.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'trust-restricted-badge', titleKey: 'release.check.trust-restricted-badge.title', priority: 'p2', statusDefault: 'todo' },
      ],
    },

    // Presale Module
    {
      id: 'presale',
      titleKey: 'release.module.presale.title',
      order: 3,
      checks: [
        { id: 'presale-no-hardcoded', titleKey: 'release.check.presale-no-hardcoded.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'presale-i18n-coverage', titleKey: 'release.check.presale-i18n-coverage.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'presale-disabled-state', titleKey: 'release.check.presale-disabled-state.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'presale-config-toggle', titleKey: 'release.check.presale-config-toggle.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'presale-calculator', titleKey: 'release.check.presale-calculator.title', priority: 'p1', statusDefault: 'na' },
        { id: 'presale-form-validation', titleKey: 'release.check.presale-form-validation.title', priority: 'p1', statusDefault: 'na' },
        { id: 'presale-week-ladder', titleKey: 'release.check.presale-week-ladder.title', priority: 'p1', statusDefault: 'na' },
      ],
    },

    // Configurator Module
    {
      id: 'configurator',
      titleKey: 'release.module.configurator.title',
      order: 4,
      checks: [
        { id: 'cfg-no-hardcoded', titleKey: 'release.check.cfg-no-hardcoded.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'cfg-i18n-coverage', titleKey: 'release.check.cfg-i18n-coverage.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'cfg-disabled-state', titleKey: 'release.check.cfg-disabled-state.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'cfg-config-toggle', titleKey: 'release.check.cfg-config-toggle.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'cfg-group-nav', titleKey: 'release.check.cfg-group-nav.title', priority: 'p1', statusDefault: 'na' },
        { id: 'cfg-option-select', titleKey: 'release.check.cfg-option-select.title', priority: 'p1', statusDefault: 'na' },
        { id: 'cfg-price-calc', titleKey: 'release.check.cfg-price-calc.title', priority: 'p1', statusDefault: 'na' },
        { id: 'cfg-summary-panel', titleKey: 'release.check.cfg-summary-panel.title', priority: 'p2', statusDefault: 'na' },
      ],
    },

    // Workflow Module
    {
      id: 'workflow',
      titleKey: 'release.module.workflow.title',
      order: 5,
      checks: [
        { id: 'wf-no-hardcoded', titleKey: 'release.check.wf-no-hardcoded.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'wf-i18n-coverage', titleKey: 'release.check.wf-i18n-coverage.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'wf-step-navigation', titleKey: 'release.check.wf-step-navigation.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'wf-step-detail', titleKey: 'release.check.wf-step-detail.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'wf-doc-links', titleKey: 'release.check.wf-doc-links.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'wf-progress-display', titleKey: 'release.check.wf-progress-display.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'wf-checklist-items', titleKey: 'release.check.wf-checklist-items.title', priority: 'p2', statusDefault: 'todo' },
      ],
    },

    // Token Module
    {
      id: 'token',
      titleKey: 'release.module.token.title',
      order: 6,
      checks: [
        { id: 'token-no-hardcoded', titleKey: 'release.check.token-no-hardcoded.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'token-i18n-coverage', titleKey: 'release.check.token-i18n-coverage.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'token-disabled-state', titleKey: 'release.check.token-disabled-state.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'token-sections', titleKey: 'release.check.token-sections.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'token-risk-disclosure', titleKey: 'release.check.token-risk-disclosure.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'token-cta-links', titleKey: 'release.check.token-cta-links.title', priority: 'p1', statusDefault: 'todo' },
      ],
    },

    // Partners Module
    {
      id: 'partners',
      titleKey: 'release.module.partners.title',
      order: 7,
      checks: [
        { id: 'partners-no-hardcoded', titleKey: 'release.check.partners-no-hardcoded.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'partners-i18n-coverage', titleKey: 'release.check.partners-i18n-coverage.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'partners-filter-works', titleKey: 'release.check.partners-filter-works.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'partners-empty-state', titleKey: 'release.check.partners-empty-state.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'partners-detail-pages', titleKey: 'release.check.partners-detail-pages.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'partners-map-display', titleKey: 'release.check.partners-map-display.title', priority: 'p2', statusDefault: 'na' },
        { id: 'partners-service-chips', titleKey: 'release.check.partners-service-chips.title', priority: 'p1', statusDefault: 'todo' },
      ],
    },

    // Investors Module
    {
      id: 'investors',
      titleKey: 'release.module.investors.title',
      order: 8,
      checks: [
        { id: 'inv-no-hardcoded', titleKey: 'release.check.inv-no-hardcoded.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'inv-i18n-coverage', titleKey: 'release.check.inv-i18n-coverage.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'inv-sections', titleKey: 'release.check.inv-sections.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'inv-metrics-display', titleKey: 'release.check.inv-metrics-display.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'inv-cta-links', titleKey: 'release.check.inv-cta-links.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'inv-final-cta', titleKey: 'release.check.inv-final-cta.title', priority: 'p1', statusDefault: 'todo' },
      ],
    },

    // Customers Module
    {
      id: 'customers',
      titleKey: 'release.module.customers.title',
      order: 9,
      checks: [
        { id: 'cust-no-hardcoded', titleKey: 'release.check.cust-no-hardcoded.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'cust-i18n-coverage', titleKey: 'release.check.cust-i18n-coverage.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'cust-sections', titleKey: 'release.check.cust-sections.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'cust-journey-display', titleKey: 'release.check.cust-journey-display.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'cust-cta-links', titleKey: 'release.check.cust-cta-links.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'cust-final-cta', titleKey: 'release.check.cust-final-cta.title', priority: 'p1', statusDefault: 'todo' },
      ],
    },

    // Dashboard Module
    {
      id: 'dashboard',
      titleKey: 'release.module.dashboard.title',
      order: 10,
      checks: [
        { id: 'dash-no-hardcoded', titleKey: 'release.check.dash-no-hardcoded.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'dash-i18n-coverage', titleKey: 'release.check.dash-i18n-coverage.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'dash-nav-works', titleKey: 'release.check.dash-nav-works.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'dash-role-guard', titleKey: 'release.check.dash-role-guard.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'dash-placeholder-pages', titleKey: 'release.check.dash-placeholder-pages.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'dash-requests-list', titleKey: 'release.check.dash-requests-list.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'dash-localStorage', titleKey: 'release.check.dash-localStorage.title', priority: 'p1', statusDefault: 'todo' },
      ],
    },

    // I18n Module
    {
      id: 'i18n',
      titleKey: 'release.module.i18n.title',
      order: 11,
      checks: [
        { id: 'i18n-en-coverage', titleKey: 'release.check.i18n-en-coverage.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'i18n-ru-coverage', titleKey: 'release.check.i18n-ru-coverage.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'i18n-lang-switch', titleKey: 'release.check.i18n-lang-switch.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'i18n-url-param', titleKey: 'release.check.i18n-url-param.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'i18n-fallback', titleKey: 'release.check.i18n-fallback.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'i18n-audit-hidden', titleKey: 'release.check.i18n-audit-hidden.title', priority: 'p0', statusDefault: 'todo' },
      ],
    },

    // UX Module
    {
      id: 'ux',
      titleKey: 'release.module.ux.title',
      order: 12,
      checks: [
        { id: 'ux-design-tokens', titleKey: 'release.check.ux-design-tokens.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'ux-ui-primitives', titleKey: 'release.check.ux-ui-primitives.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'ux-empty-states', titleKey: 'release.check.ux-empty-states.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'ux-loading-states', titleKey: 'release.check.ux-loading-states.title', priority: 'p2', statusDefault: 'todo' },
        { id: 'ux-responsive', titleKey: 'release.check.ux-responsive.title', priority: 'p1', statusDefault: 'todo' },
        { id: 'ux-dev-routes-hidden', titleKey: 'release.check.ux-dev-routes-hidden.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'ux-no-api-calls', titleKey: 'release.check.ux-no-api-calls.title', priority: 'p0', statusDefault: 'todo' },
        { id: 'ux-config-driven', titleKey: 'release.check.ux-config-driven.title', priority: 'p1', statusDefault: 'todo' },
      ],
    },
  ],
};

/**
 * Get all check IDs
 */
export function getAllCheckIds(): string[] {
  return releaseConfig.modules.flatMap(m => m.checks.map(c => c.id));
}

/**
 * Get check by ID
 */
export function getCheckById(id: string): ReleaseCheck | undefined {
  for (const mod of releaseConfig.modules) {
    const check = mod.checks.find(c => c.id === id);
    if (check) return check;
  }
  return undefined;
}

/**
 * Get module by ID
 */
export function getModuleById(id: string): ReleaseModule | undefined {
  return releaseConfig.modules.find(m => m.id === id);
}
