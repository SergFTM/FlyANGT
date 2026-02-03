/**
 * Content Index
 *
 * Helper functions for loading localized content.
 */

import type { Locale } from '$config/i18n.config';
import type { PageContent, LocalizedContent } from './types';

import { homeContent } from './pages/home';
import { ecosystemContent } from './pages/ecosystem';
import { tokenizationContent } from './pages/tokenization';
import { platformContent } from './pages/platform';
import { partnersContent } from './pages/partners';
import { investorsContent } from './pages/investors';
import { customersContent } from './pages/customers';

export type PageId =
  | 'home'
  | 'ecosystem'
  | 'tokenization'
  | 'platform'
  | 'partners'
  | 'investors'
  | 'customers';

const contentMap: Record<PageId, LocalizedContent<PageContent>> = {
  home: homeContent,
  ecosystem: ecosystemContent,
  tokenization: tokenizationContent,
  platform: platformContent,
  partners: partnersContent,
  investors: investorsContent,
  customers: customersContent,
};

/**
 * Get page content for a specific locale
 */
export function getPageContent(pageId: PageId, locale: Locale): PageContent {
  const content = contentMap[pageId];
  return content?.[locale] ?? content?.en;
}

export { type PageContent, type LocalizedContent } from './types';
