/**
 * Release Notes Configuration
 *
 * Dev tool only.
 * Deterministic template, no semantic summarization.
 *
 * Configures release notes pack generation from RC diffs.
 */

/**
 * Release notes section identifiers
 */
export type ReleaseNotesSectionId =
  | 'meta'
  | 'readiness'
  | 'highlights'
  | 'changelog'
  | 'quality'
  | 'known_issues'
  | 'links'
  | 'next_steps';

/**
 * Section configuration
 */
export interface ReleaseNotesSection {
  id: ReleaseNotesSectionId;
  enabled: boolean;
  titleKey: string;
  order: number;
}

/**
 * Storage configuration
 */
export interface ReleaseNotesStorage {
  knownIssuesKey: string;
}

/**
 * Links configuration
 */
export interface ReleaseNotesLinks {
  homePath: string;
  trustPath: string;
  workflowPath: string;
  presalePath: string;
  configuratorPath: string;
  partnersPath: string;
  investorsPath: string;
  customersPath: string;
  tokenPath: string;
  gatePath: string;
  rcPath: string;
  exportPath: string;
  changelogPath: string;
}

/**
 * Formatting configuration
 */
export interface ReleaseNotesFormatting {
  includeTableForReadiness: boolean;
  maxKnownIssuesInMd: number;
}

/**
 * Complete release notes configuration
 */
export interface ReleaseNotesConfig {
  enabled: boolean;
  devOnly: boolean;
  exportFilePrefix: string;
  storage: ReleaseNotesStorage;
  sections: ReleaseNotesSection[];
  links: ReleaseNotesLinks;
  formatting: ReleaseNotesFormatting;
}

/**
 * Default release notes configuration
 *
 * Dev tool only.
 * Deterministic template, no semantic summarization.
 */
export const releaseNotesConfig: ReleaseNotesConfig = {
  enabled: true,
  devOnly: true,
  exportFilePrefix: 'flyangt-release-notes',

  storage: {
    knownIssuesKey: 'flyangt_known_issues',
  },

  sections: [
    {
      id: 'meta',
      enabled: true,
      titleKey: 'releaseNotes.sections.meta.title',
      order: 0,
    },
    {
      id: 'readiness',
      enabled: true,
      titleKey: 'releaseNotes.sections.readiness.title',
      order: 1,
    },
    {
      id: 'highlights',
      enabled: true,
      titleKey: 'releaseNotes.sections.highlights.title',
      order: 2,
    },
    {
      id: 'changelog',
      enabled: true,
      titleKey: 'releaseNotes.sections.changelog.title',
      order: 3,
    },
    {
      id: 'quality',
      enabled: true,
      titleKey: 'releaseNotes.sections.quality.title',
      order: 4,
    },
    {
      id: 'known_issues',
      enabled: true,
      titleKey: 'releaseNotes.sections.knownIssues.title',
      order: 5,
    },
    {
      id: 'links',
      enabled: true,
      titleKey: 'releaseNotes.sections.links.title',
      order: 6,
    },
    {
      id: 'next_steps',
      enabled: true,
      titleKey: 'releaseNotes.sections.nextSteps.title',
      order: 7,
    },
  ],

  links: {
    homePath: '/',
    trustPath: '/trust',
    workflowPath: '/workflow',
    presalePath: '/presale',
    configuratorPath: '/configurator',
    partnersPath: '/partners',
    investorsPath: '/investors',
    customersPath: '/customers',
    tokenPath: '/token',
    gatePath: '/gate',
    rcPath: '/rc',
    exportPath: '/export',
    changelogPath: '/changelog',
  },

  formatting: {
    includeTableForReadiness: true,
    maxKnownIssuesInMd: 10,
  },
};

/**
 * Get enabled sections sorted by order
 */
export function getEnabledSections(): ReleaseNotesSection[] {
  return releaseNotesConfig.sections
    .filter(s => s.enabled)
    .sort((a, b) => a.order - b.order);
}

/**
 * Check if section is enabled
 */
export function isSectionEnabled(id: ReleaseNotesSectionId): boolean {
  const section = releaseNotesConfig.sections.find(s => s.id === id);
  return section?.enabled ?? false;
}
