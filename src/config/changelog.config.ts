/**
 * Changelog Configuration
 *
 * Dev tool only.
 * Deterministic transformation, not semantic summarization.
 *
 * Configures changelog generation from RC diffs.
 */

/**
 * Changelog group identifiers
 */
export type ChangelogGroupId =
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
 * Changelog group configuration
 */
export interface ChangelogGroup {
  id: ChangelogGroupId;
  enabled: boolean;
  titleKey: string;
  /** Which rc-compare group to read */
  sourceDiffGroupId: string;
  /** Paths starting with these prefixes are ignored */
  ignorePathPrefixes?: string[];
  /** If provided, keep only these top-level keys */
  allowTopKeys?: string[];
  /** If true, items go to Notes section instead of main release notes */
  isNotes?: boolean;
}

/**
 * Bucket mapping configuration
 */
export interface ChangelogBuckets {
  added: string;
  removed: string;
  changed: string;
}

/**
 * Mapping rules configuration
 */
export interface ChangelogMappingRules {
  buckets: ChangelogBuckets;
  /** Path patterns that indicate a fix (moves from Changed to Fixed) */
  fixedPathHints: string[];
}

/**
 * Formatting configuration
 */
export interface ChangelogFormatting {
  maxItemsPerSection: number;
  showTruncatedNote: boolean;
  includeMetaHeader: boolean;
}

/**
 * Complete changelog configuration
 */
export interface ChangelogConfig {
  enabled: boolean;
  devOnly: boolean;
  exportFilePrefix: string;
  groups: ChangelogGroup[];
  formatting: ChangelogFormatting;
  mappingRules: ChangelogMappingRules;
}

/**
 * Default changelog configuration
 *
 * Dev tool only.
 * Deterministic transformation, not semantic summarization.
 */
export const changelogConfig: ChangelogConfig = {
  enabled: true,
  devOnly: true,
  exportFilePrefix: 'flyangt-changelog',

  groups: [
    // Main product groups
    {
      id: 'routes',
      enabled: true,
      titleKey: 'changelog.group.routes.title',
      sourceDiffGroupId: 'routes',
      ignorePathPrefixes: ['generatedAt', 'updatedAt', 'timestamp'],
    },
    {
      id: 'modules',
      enabled: true,
      titleKey: 'changelog.group.modules.title',
      sourceDiffGroupId: 'modules',
      ignorePathPrefixes: ['generatedAt', 'updatedAt', 'timestamp'],
    },
    {
      id: 'home',
      enabled: true,
      titleKey: 'changelog.group.home.title',
      sourceDiffGroupId: 'home',
      ignorePathPrefixes: ['generatedAt', 'updatedAt', 'timestamp'],
    },
    {
      id: 'trust',
      enabled: true,
      titleKey: 'changelog.group.trust.title',
      sourceDiffGroupId: 'trust',
      ignorePathPrefixes: ['generatedAt', 'updatedAt', 'timestamp'],
    },
    {
      id: 'workflow',
      enabled: true,
      titleKey: 'changelog.group.workflow.title',
      sourceDiffGroupId: 'workflow',
      ignorePathPrefixes: ['generatedAt', 'updatedAt', 'timestamp'],
    },
    {
      id: 'tokenization',
      enabled: true,
      titleKey: 'changelog.group.tokenization.title',
      sourceDiffGroupId: 'tokenization',
      ignorePathPrefixes: ['generatedAt', 'updatedAt', 'timestamp'],
    },
    {
      id: 'presale',
      enabled: true,
      titleKey: 'changelog.group.presale.title',
      sourceDiffGroupId: 'presale',
      ignorePathPrefixes: ['generatedAt', 'updatedAt', 'timestamp'],
    },
    {
      id: 'configurator',
      enabled: true,
      titleKey: 'changelog.group.configurator.title',
      sourceDiffGroupId: 'configurator',
      ignorePathPrefixes: ['generatedAt', 'updatedAt', 'timestamp'],
    },
    {
      id: 'partners',
      enabled: true,
      titleKey: 'changelog.group.partners.title',
      sourceDiffGroupId: 'partners',
      ignorePathPrefixes: ['generatedAt', 'updatedAt', 'timestamp'],
    },
    {
      id: 'investors',
      enabled: true,
      titleKey: 'changelog.group.investors.title',
      sourceDiffGroupId: 'investors',
      ignorePathPrefixes: ['generatedAt', 'updatedAt', 'timestamp'],
    },
    {
      id: 'customers',
      enabled: true,
      titleKey: 'changelog.group.customers.title',
      sourceDiffGroupId: 'customers',
      ignorePathPrefixes: ['generatedAt', 'updatedAt', 'timestamp'],
    },
    {
      id: 'i18n',
      enabled: true,
      titleKey: 'changelog.group.i18n.title',
      sourceDiffGroupId: 'i18n',
      ignorePathPrefixes: ['generatedAt', 'updatedAt', 'timestamp'],
    },
    // Notes groups (dev state, not main release notes)
    {
      id: 'release',
      enabled: true,
      titleKey: 'changelog.group.release.title',
      sourceDiffGroupId: 'release',
      ignorePathPrefixes: ['generatedAt', 'updatedAt', 'timestamp'],
      isNotes: true,
    },
    {
      id: 'smoke',
      enabled: true,
      titleKey: 'changelog.group.smoke.title',
      sourceDiffGroupId: 'smoke',
      ignorePathPrefixes: ['generatedAt', 'updatedAt', 'timestamp'],
      isNotes: true,
    },
    {
      id: 'gate',
      enabled: true,
      titleKey: 'changelog.group.gate.title',
      sourceDiffGroupId: 'gate',
      ignorePathPrefixes: ['generatedAt', 'updatedAt', 'timestamp'],
      isNotes: true,
    },
  ],

  formatting: {
    maxItemsPerSection: 20,
    showTruncatedNote: true,
    includeMetaHeader: true,
  },

  mappingRules: {
    buckets: {
      added: 'Added',
      removed: 'Removed',
      changed: 'Changed',
    },
    fixedPathHints: ['bug', 'fix', 'error', 'typo', 'issue', 'broken'],
  },
};

/**
 * Get enabled changelog groups
 */
export function getEnabledChangelogGroups(): ChangelogGroup[] {
  return changelogConfig.groups.filter(g => g.enabled);
}

/**
 * Get main changelog groups (not notes)
 */
export function getMainChangelogGroups(): ChangelogGroup[] {
  return changelogConfig.groups.filter(g => g.enabled && !g.isNotes);
}

/**
 * Get notes groups
 */
export function getNotesGroups(): ChangelogGroup[] {
  return changelogConfig.groups.filter(g => g.enabled && g.isNotes);
}
