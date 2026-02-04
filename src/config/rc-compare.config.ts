/**
 * RC Compare Configuration
 *
 * Dev tool only.
 * Diff compares stored RC artifacts, not live project state.
 *
 * Configures comparison groups and UI behavior for the RC diff tool.
 */

/**
 * Group identifiers for comparison
 */
export type RcCompareGroupId =
  | 'routes'
  | 'modules'
  | 'home'
  | 'trust'
  | 'workflow'
  | 'tokenization'
  | 'presale'
  | 'configurator'
  | 'partners'
  | 'investors'
  | 'customers'
  | 'i18n'
  | 'release'
  | 'smoke'
  | 'gate';

/**
 * Comparison group definition
 */
export interface RcCompareGroup {
  id: RcCompareGroupId;
  titleKey: string;
  enabled: boolean;
  /** JSON path in RC artifacts for side A */
  aPath: string;
  /** JSON path in RC artifacts for side B */
  bPath: string;
}

/**
 * UI configuration
 */
export interface RcCompareUiConfig {
  maxDiffItemsPerGroup: number;
  showUnchangedGroups: boolean;
}

/**
 * Complete RC Compare configuration
 */
export interface RcCompareConfig {
  enabled: boolean;
  devOnly: boolean;
  exportFilePrefix: string;
  groups: RcCompareGroup[];
  ui: RcCompareUiConfig;
}

/**
 * Default RC Compare configuration
 *
 * Dev tool only.
 * Diff compares stored RC artifacts, not live project state.
 */
export const rcCompareConfig: RcCompareConfig = {
  enabled: true,
  devOnly: true,
  exportFilePrefix: 'flyangt-rc-diff',

  groups: [
    // Config groups from snapshot
    {
      id: 'routes',
      titleKey: 'rcCompare.group.routes.title',
      enabled: true,
      aPath: 'artifacts.snapshot.configs.routes',
      bPath: 'artifacts.snapshot.configs.routes',
    },
    {
      id: 'modules',
      titleKey: 'rcCompare.group.modules.title',
      enabled: true,
      aPath: 'artifacts.snapshot.configs.modules',
      bPath: 'artifacts.snapshot.configs.modules',
    },
    {
      id: 'home',
      titleKey: 'rcCompare.group.home.title',
      enabled: true,
      aPath: 'artifacts.snapshot.configs.home',
      bPath: 'artifacts.snapshot.configs.home',
    },
    {
      id: 'trust',
      titleKey: 'rcCompare.group.trust.title',
      enabled: true,
      aPath: 'artifacts.snapshot.configs.trust',
      bPath: 'artifacts.snapshot.configs.trust',
    },
    {
      id: 'workflow',
      titleKey: 'rcCompare.group.workflow.title',
      enabled: true,
      aPath: 'artifacts.snapshot.configs.workflow',
      bPath: 'artifacts.snapshot.configs.workflow',
    },
    {
      id: 'tokenization',
      titleKey: 'rcCompare.group.tokenization.title',
      enabled: true,
      aPath: 'artifacts.snapshot.configs.tokenization',
      bPath: 'artifacts.snapshot.configs.tokenization',
    },
    {
      id: 'presale',
      titleKey: 'rcCompare.group.presale.title',
      enabled: true,
      aPath: 'artifacts.snapshot.configs.presale',
      bPath: 'artifacts.snapshot.configs.presale',
    },
    {
      id: 'configurator',
      titleKey: 'rcCompare.group.configurator.title',
      enabled: true,
      aPath: 'artifacts.snapshot.configs.configurator',
      bPath: 'artifacts.snapshot.configs.configurator',
    },
    {
      id: 'partners',
      titleKey: 'rcCompare.group.partners.title',
      enabled: true,
      aPath: 'artifacts.snapshot.configs.partners',
      bPath: 'artifacts.snapshot.configs.partners',
    },
    {
      id: 'investors',
      titleKey: 'rcCompare.group.investors.title',
      enabled: true,
      aPath: 'artifacts.snapshot.configs.investors',
      bPath: 'artifacts.snapshot.configs.investors',
    },
    {
      id: 'customers',
      titleKey: 'rcCompare.group.customers.title',
      enabled: true,
      aPath: 'artifacts.snapshot.configs.customers',
      bPath: 'artifacts.snapshot.configs.customers',
    },
    {
      id: 'i18n',
      titleKey: 'rcCompare.group.i18n.title',
      enabled: true,
      aPath: 'artifacts.snapshot.configs.i18n',
      bPath: 'artifacts.snapshot.configs.i18n',
    },
    // State groups from dedicated artifacts
    {
      id: 'release',
      titleKey: 'rcCompare.group.release.title',
      enabled: true,
      aPath: 'artifacts.release',
      bPath: 'artifacts.release',
    },
    {
      id: 'smoke',
      titleKey: 'rcCompare.group.smoke.title',
      enabled: true,
      aPath: 'artifacts.smoke',
      bPath: 'artifacts.smoke',
    },
    {
      id: 'gate',
      titleKey: 'rcCompare.group.gate.title',
      enabled: true,
      aPath: 'artifacts.gate',
      bPath: 'artifacts.gate',
    },
  ],

  ui: {
    maxDiffItemsPerGroup: 20,
    showUnchangedGroups: false,
  },
};

/**
 * Get enabled comparison groups
 */
export function getEnabledGroups(): RcCompareGroup[] {
  return rcCompareConfig.groups.filter(g => g.enabled);
}

/**
 * Get group by id
 */
export function getGroupById(id: RcCompareGroupId): RcCompareGroup | undefined {
  return rcCompareConfig.groups.find(g => g.id === id);
}
