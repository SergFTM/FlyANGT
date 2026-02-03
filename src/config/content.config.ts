/**
 * Content Configuration
 *
 * Maps page IDs to their content structure.
 * Defines which sections each page has.
 */

export interface PageContentConfig {
  pageId: string;
  sections: string[];
  ctaSectionId: string | null;
}

export const contentConfig: PageContentConfig[] = [
  {
    pageId: 'home',
    sections: ['hero', 'features', 'ecosystem-preview', 'trust-intro'],
    ctaSectionId: 'final-cta',
  },
  {
    pageId: 'ecosystem',
    sections: ['hero', 'hub-services', 'platform-services', 'tokenization-layer'],
    ctaSectionId: 'final-cta',
  },
  {
    pageId: 'tokenization',
    sections: ['hero', 'what-is-token', 'benefits', 'disclaimer'],
    ctaSectionId: 'final-cta',
  },
  {
    pageId: 'platform',
    sections: ['hero', 'cabinet-features', 'document-flow', 'integrations'],
    ctaSectionId: 'final-cta',
  },
  {
    pageId: 'partners',
    sections: ['hero', 'partner-types', 'benefits', 'become-partner'],
    ctaSectionId: 'final-cta',
  },
  {
    pageId: 'investors',
    sections: ['hero', 'opportunity', 'process', 'faq'],
    ctaSectionId: 'final-cta',
  },
  {
    pageId: 'customers',
    sections: ['hero', 'use-cases', 'benefits', 'get-started'],
    ctaSectionId: 'final-cta',
  },
];

/**
 * Get page content config by ID
 */
export function getPageContentConfig(pageId: string): PageContentConfig | undefined {
  return contentConfig.find(p => p.pageId === pageId);
}
