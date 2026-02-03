/**
 * Home Page Configuration
 *
 * Home is config-driven hub for MVP.
 * Defines blocks, module cards generation, and navigation links.
 */

import type { TranslationKey } from './i18n.config';

/**
 * Home block identifiers
 */
export type HomeBlockId =
  | 'hero'
  | 'paths'
  | 'modules'
  | 'trust_highlight'
  | 'workflow_highlight'
  | 'quick_actions'
  | 'latest_updates'
  | 'final_cta';

/**
 * Block item structure
 */
export interface HomeBlockItem {
  titleKey: TranslationKey;
  textKey: TranslationKey;
  href: string;
  icon?: string;
}

/**
 * Block configuration
 */
export interface HomeBlock {
  id: HomeBlockId;
  enabled: boolean;
  titleKey?: TranslationKey;
  textKey?: TranslationKey;
  variant?: 'default' | 'cards' | 'grid';
  items?: HomeBlockItem[];
}

/**
 * Module cards configuration
 */
export interface HomeModulesConfig {
  showOnlyPublicNavVisible: boolean;
  maxCards: number;
  excludeRouteIds: string[];
}

/**
 * Home page links
 */
export interface HomeLinksConfig {
  customersPath: string;
  investorsPath: string;
  partnersPath: string;
  trustPath: string;
  workflowPath: string;
  presalePath: string;
  configuratorPath: string;
  tokenPath: string;
  dashboardPath: string;
}

/**
 * Main home configuration
 */
export interface HomeConfig {
  enabled: boolean;
  blocks: HomeBlock[];
  modules: HomeModulesConfig;
  links: HomeLinksConfig;
}

/**
 * Home blocks in display order
 */
const homeBlocks: HomeBlock[] = [
  {
    id: 'hero',
    enabled: true,
    variant: 'default',
  },
  {
    id: 'paths',
    enabled: true,
    titleKey: 'home.paths.title',
    textKey: 'home.paths.text',
    variant: 'cards',
  },
  {
    id: 'modules',
    enabled: true,
    titleKey: 'home.modules.title',
    textKey: 'home.modules.text',
    variant: 'grid',
  },
  {
    id: 'trust_highlight',
    enabled: true,
    titleKey: 'home.trust.title',
    textKey: 'home.trust.text',
    variant: 'default',
  },
  {
    id: 'workflow_highlight',
    enabled: true,
    titleKey: 'home.workflow.title',
    textKey: 'home.workflow.text',
    variant: 'default',
  },
  {
    id: 'quick_actions',
    enabled: true,
    titleKey: 'home.quick.title',
    textKey: 'home.quick.text',
    variant: 'grid',
  },
  {
    // Latest updates will be replaced by CMS later
    id: 'latest_updates',
    enabled: true,
    titleKey: 'home.updates.title',
    textKey: 'home.updates.text',
    variant: 'cards',
  },
  {
    id: 'final_cta',
    enabled: true,
    variant: 'default',
  },
];

/**
 * Main home configuration export
 */
export const homeConfig: HomeConfig = {
  enabled: true,
  blocks: homeBlocks,
  modules: {
    showOnlyPublicNavVisible: true,
    maxCards: 8,
    // Exclude internal dynamic routes and dashboard children
    excludeRouteIds: [
      'home',
      'trust.detail',
      'workflow.step',
      'partners.detail',
      'dash.overview',
      'dash.documents',
      'dash.requests',
      'dash.workflow',
      'dash.support',
      'dash.settings',
    ],
  },
  links: {
    customersPath: '/customers',
    investorsPath: '/investors',
    partnersPath: '/partners',
    trustPath: '/trust',
    workflowPath: '/workflow',
    presalePath: '/presale',
    configuratorPath: '/configurator',
    tokenPath: '/token',
    dashboardPath: '/dashboard',
  },
};

// ============================================================================
// Helper functions
// ============================================================================

/**
 * Get all home blocks
 */
export function getHomeBlocks(): HomeBlock[] {
  return homeConfig.blocks;
}

/**
 * Get enabled home blocks only
 */
export function getEnabledHomeBlocks(): HomeBlock[] {
  return homeConfig.blocks.filter(b => b.enabled);
}

/**
 * Get home block by ID
 */
export function getHomeBlockById(id: HomeBlockId): HomeBlock | undefined {
  return homeConfig.blocks.find(b => b.id === id);
}

/**
 * Check if a block is enabled
 */
export function isHomeBlockEnabled(id: HomeBlockId): boolean {
  const block = getHomeBlockById(id);
  return block?.enabled ?? false;
}

/**
 * Get home links
 */
export function getHomeLinks(): HomeLinksConfig {
  return homeConfig.links;
}

/**
 * Get modules config for card generation
 */
export function getHomeModulesConfig(): HomeModulesConfig {
  return homeConfig.modules;
}
