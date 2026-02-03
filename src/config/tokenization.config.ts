/**
 * Tokenization Configuration
 *
 * Defines token module sections, navigation, and required elements.
 * Risk disclosure section is mandatory and cannot be removed.
 */

import type { TranslationKey } from './i18n.config';

/**
 * Section identifiers for token page
 */
export type TokenSectionId =
  | 'overview'
  | 'why'
  | 'utility'
  | 'interaction'
  | 'transparency'
  | 'whitepaper'
  | 'risks';

/**
 * Section configuration
 */
export interface TokenizationSection {
  id: TokenSectionId;
  titleKey: TranslationKey;
  textKey: TranslationKey;
  bulletsKeys?: TranslationKey[];
  cta?: {
    labelKey: TranslationKey;
    href: string;
  };
}

/**
 * Tokenization module configuration
 */
export interface TokenizationConfig {
  enabled: boolean;
  routeBase: '/token';
  sections: TokenizationSection[];
  required: {
    riskSectionId: 'risks';
  };
  links: {
    trustCenterPath: '/trust';
    whitepaperTrustSlug: string;
  };
}

/**
 * Token sections configuration
 * Order determines display sequence
 */
const tokenSections: TokenizationSection[] = [
  {
    id: 'overview',
    titleKey: 'token.section.overview.title',
    textKey: 'token.section.overview.text',
    bulletsKeys: [
      'token.section.overview.bullet.1',
      'token.section.overview.bullet.2',
      'token.section.overview.bullet.3',
    ],
  },
  {
    id: 'why',
    titleKey: 'token.section.why.title',
    textKey: 'token.section.why.text',
    bulletsKeys: [
      'token.section.why.bullet.1',
      'token.section.why.bullet.2',
      'token.section.why.bullet.3',
      'token.section.why.bullet.4',
    ],
  },
  {
    id: 'utility',
    titleKey: 'token.section.utility.title',
    textKey: 'token.section.utility.text',
    bulletsKeys: [
      'token.section.utility.bullet.1',
      'token.section.utility.bullet.2',
      'token.section.utility.bullet.3',
      'token.section.utility.bullet.4',
    ],
    cta: {
      labelKey: 'token.cta.exploreParticipation',
      href: '/presale',
    },
  },
  {
    id: 'interaction',
    titleKey: 'token.section.interaction.title',
    textKey: 'token.section.interaction.text',
    bulletsKeys: [
      'token.section.interaction.bullet.1',
      'token.section.interaction.bullet.2',
      'token.section.interaction.bullet.3',
    ],
  },
  {
    id: 'transparency',
    titleKey: 'token.section.transparency.title',
    textKey: 'token.section.transparency.text',
    bulletsKeys: [
      'token.section.transparency.bullet.1',
      'token.section.transparency.bullet.2',
      'token.section.transparency.bullet.3',
    ],
    cta: {
      labelKey: 'token.cta.reviewFramework',
      href: '/trust',
    },
  },
  {
    id: 'whitepaper',
    titleKey: 'token.section.whitepaper.title',
    textKey: 'token.section.whitepaper.text',
    cta: {
      labelKey: 'token.cta.openWhitepaper',
      href: '/trust/whitepaper',
    },
  },
  {
    id: 'risks',
    titleKey: 'token.section.risks.title',
    textKey: 'token.section.risks.text',
    bulletsKeys: [
      'token.section.risks.bullet.1',
      'token.section.risks.bullet.2',
      'token.section.risks.bullet.3',
      'token.section.risks.bullet.4',
    ],
  },
];

/**
 * Main tokenization configuration
 */
export const tokenizationConfig: TokenizationConfig = {
  enabled: true,
  routeBase: '/token',
  sections: tokenSections,
  required: {
    riskSectionId: 'risks',
  },
  links: {
    trustCenterPath: '/trust',
    whitepaperTrustSlug: 'whitepaper',
  },
};

/**
 * Get all token sections
 */
export function getTokenSections(): TokenizationSection[] {
  return tokenizationConfig.sections;
}

/**
 * Get section by ID
 */
export function getTokenSectionById(id: TokenSectionId): TokenizationSection | undefined {
  return tokenizationConfig.sections.find(s => s.id === id);
}

/**
 * Get risk section (required)
 */
export function getRiskSection(): TokenizationSection {
  const riskSection = tokenizationConfig.sections.find(
    s => s.id === tokenizationConfig.required.riskSectionId
  );
  if (!riskSection) {
    throw new Error('Risk section is required but not found in configuration');
  }
  return riskSection;
}

/**
 * Get whitepaper Trust Center link
 */
export function getWhitepaperHref(): string {
  return `${tokenizationConfig.links.trustCenterPath}/${tokenizationConfig.links.whitepaperTrustSlug}`;
}

/**
 * Check if tokenization module is enabled
 */
export function isTokenizationEnabled(): boolean {
  return tokenizationConfig.enabled;
}
