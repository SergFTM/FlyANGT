/**
 * Investors Configuration
 *
 * Section ordering and content structure for investor landing page.
 * Metrics are placeholders for later model/DB integration.
 * No financial advice, no guarantees.
 */

import type { TranslationKey } from './i18n.config';

/**
 * Investor section identifiers
 */
export type InvestorSectionId =
  | 'thesis'
  | 'market'
  | 'stack'
  | 'revenue'
  | 'unit_economics'
  | 'presale_plan'
  | 'token_role'
  | 'trust'
  | 'cta';

/**
 * Section display variants
 */
export type InvestorSectionVariant = 'default' | 'checklist' | 'cards';

/**
 * Section configuration
 */
export interface InvestorSection {
  id: InvestorSectionId;
  titleKey: TranslationKey;
  textKey: TranslationKey;
  bulletsKeys?: TranslationKey[];
  variant?: InvestorSectionVariant;
  cta?: {
    labelKey: TranslationKey;
    href: string;
  };
}

/**
 * Metric placeholder configuration
 */
export interface InvestorMetricPlaceholder {
  id: string;
  labelKey: TranslationKey;
  noteKey: TranslationKey;
}

/**
 * Investors module configuration
 */
export interface InvestorsConfig {
  enabled: boolean;
  sections: InvestorSection[];
  persistence: {
    deckRequestDraftKey: string;
  };
  links: {
    presalePath: string;
    trustCenterPath: string;
    tokenPath: string;
    workflowPath: string;
  };
  placeholders: {
    metrics: InvestorMetricPlaceholder[];
  };
}

/**
 * Investor sections in narrative order
 */
const investorSections: InvestorSection[] = [
  {
    id: 'thesis',
    titleKey: 'investors.section.thesis.title',
    textKey: 'investors.section.thesis.text',
    bulletsKeys: [
      'investors.section.thesis.bullet.1',
      'investors.section.thesis.bullet.2',
      'investors.section.thesis.bullet.3',
    ],
    variant: 'default',
  },
  {
    id: 'market',
    titleKey: 'investors.section.market.title',
    textKey: 'investors.section.market.text',
    bulletsKeys: [
      'investors.section.market.bullet.1',
      'investors.section.market.bullet.2',
      'investors.section.market.bullet.3',
      'investors.section.market.bullet.4',
    ],
    variant: 'default',
  },
  {
    id: 'stack',
    titleKey: 'investors.section.stack.title',
    textKey: 'investors.section.stack.text',
    bulletsKeys: [
      'investors.section.stack.bullet.1',
      'investors.section.stack.bullet.2',
      'investors.section.stack.bullet.3',
      'investors.section.stack.bullet.4',
    ],
    variant: 'cards',
  },
  {
    id: 'revenue',
    titleKey: 'investors.section.revenue.title',
    textKey: 'investors.section.revenue.text',
    bulletsKeys: [
      'investors.section.revenue.bullet.1',
      'investors.section.revenue.bullet.2',
      'investors.section.revenue.bullet.3',
      'investors.section.revenue.bullet.4',
      'investors.section.revenue.bullet.5',
    ],
    variant: 'default',
  },
  {
    id: 'unit_economics',
    titleKey: 'investors.section.unit_economics.title',
    textKey: 'investors.section.unit_economics.text',
    bulletsKeys: [
      'investors.section.unit_economics.bullet.1',
      'investors.section.unit_economics.bullet.2',
      'investors.section.unit_economics.bullet.3',
      'investors.section.unit_economics.bullet.4',
      'investors.section.unit_economics.bullet.5',
    ],
    variant: 'checklist',
  },
  {
    id: 'presale_plan',
    titleKey: 'investors.section.presale_plan.title',
    textKey: 'investors.section.presale_plan.text',
    bulletsKeys: [
      'investors.section.presale_plan.bullet.1',
      'investors.section.presale_plan.bullet.2',
      'investors.section.presale_plan.bullet.3',
      'investors.section.presale_plan.bullet.4',
      'investors.section.presale_plan.bullet.5',
    ],
    variant: 'default',
    cta: {
      labelKey: 'investors.section.presale_plan.cta',
      href: '/presale',
    },
  },
  {
    id: 'token_role',
    titleKey: 'investors.section.token_role.title',
    textKey: 'investors.section.token_role.text',
    bulletsKeys: [
      'investors.section.token_role.bullet.1',
      'investors.section.token_role.bullet.2',
      'investors.section.token_role.bullet.3',
    ],
    variant: 'default',
    cta: {
      labelKey: 'investors.section.token_role.cta',
      href: '/token',
    },
  },
  {
    id: 'trust',
    titleKey: 'investors.section.trust.title',
    textKey: 'investors.section.trust.text',
    variant: 'default',
    cta: {
      labelKey: 'investors.section.trust.cta',
      href: '/trust',
    },
  },
  {
    id: 'cta',
    titleKey: 'investors.section.cta.title',
    textKey: 'investors.section.cta.text',
    variant: 'default',
  },
];

/**
 * Metrics placeholders for unit economics validation
 * These are placeholders for later model/DB integration
 */
const metricsPlaceholders: InvestorMetricPlaceholder[] = [
  {
    id: 'cac',
    labelKey: 'investors.metric.cac.label',
    noteKey: 'investors.metric.cac.note',
  },
  {
    id: 'conversion',
    labelKey: 'investors.metric.conversion.label',
    noteKey: 'investors.metric.conversion.note',
  },
  {
    id: 'margin',
    labelKey: 'investors.metric.margin.label',
    noteKey: 'investors.metric.margin.note',
  },
  {
    id: 'service_utilization',
    labelKey: 'investors.metric.service_utilization.label',
    noteKey: 'investors.metric.service_utilization.note',
  },
  {
    id: 'ltv',
    labelKey: 'investors.metric.ltv.label',
    noteKey: 'investors.metric.ltv.note',
  },
  {
    id: 'build_assist_capacity',
    labelKey: 'investors.metric.build_assist_capacity.label',
    noteKey: 'investors.metric.build_assist_capacity.note',
  },
  {
    id: 'nps',
    labelKey: 'investors.metric.nps.label',
    noteKey: 'investors.metric.nps.note',
  },
  {
    id: 'warranty_claims',
    labelKey: 'investors.metric.warranty_claims.label',
    noteKey: 'investors.metric.warranty_claims.note',
  },
  {
    id: 'training_attach',
    labelKey: 'investors.metric.training_attach.label',
    noteKey: 'investors.metric.training_attach.note',
  },
  {
    id: 'token_velocity',
    labelKey: 'investors.metric.token_velocity.label',
    noteKey: 'investors.metric.token_velocity.note',
  },
  {
    id: 'partner_retention',
    labelKey: 'investors.metric.partner_retention.label',
    noteKey: 'investors.metric.partner_retention.note',
  },
  {
    id: 'platform_gmv',
    labelKey: 'investors.metric.platform_gmv.label',
    noteKey: 'investors.metric.platform_gmv.note',
  },
];

/**
 * Main investors configuration
 */
export const investorsConfig: InvestorsConfig = {
  enabled: true,
  sections: investorSections,
  persistence: {
    deckRequestDraftKey: 'flyangt_investor_deck_request_draft',
  },
  links: {
    presalePath: '/presale',
    trustCenterPath: '/trust',
    tokenPath: '/token',
    workflowPath: '/workflow',
  },
  placeholders: {
    metrics: metricsPlaceholders,
  },
};

// ============================================================================
// Helper functions
// ============================================================================

/**
 * Get all investor sections
 */
export function getInvestorSections(): InvestorSection[] {
  return investorsConfig.sections;
}

/**
 * Get investor section by ID
 */
export function getInvestorSectionById(id: InvestorSectionId): InvestorSection | undefined {
  return investorsConfig.sections.find(s => s.id === id);
}

/**
 * Get metrics placeholders
 */
export function getMetricsPlaceholders(): InvestorMetricPlaceholder[] {
  return investorsConfig.placeholders.metrics;
}

/**
 * Get deck request draft storage key
 */
export function getDeckRequestDraftKey(): string {
  return investorsConfig.persistence.deckRequestDraftKey;
}

/**
 * Get investor links
 */
export function getInvestorLinks(): InvestorsConfig['links'] {
  return investorsConfig.links;
}
