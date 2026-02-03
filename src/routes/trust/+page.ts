/**
 * Trust Center Catalog Page Data Loader
 *
 * Loads trust documents and filter options.
 */

import type { PageLoad } from './$types';
import { t, isLocaleSupported, type Locale } from '$config/i18n.config';
import { trustDocs, trustCategories, type TrustDocCategory, type TrustDocType } from '$config/trust.config';

export const load: PageLoad = ({ url }) => {
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Build category options
  const categoryOptions = [
    { id: 'all' as const, label: t('trust.filter.all', locale) },
    ...trustCategories.map(cat => ({
      id: cat.id,
      label: t(cat.titleKey, locale),
    })),
  ];

  // Build type options
  const typeOptions: { id: TrustDocType | 'all'; label: string }[] = [
    { id: 'all', label: t('trust.filter.all', locale) },
    { id: 'pdf', label: 'PDF' },
    { id: 'docx', label: 'DOCX' },
    { id: 'link', label: 'Link' },
  ];

  // Build sort options
  const sortOptions = [
    { id: 'newest' as const, label: t('trust.sort.newest', locale) },
    { id: 'oldest' as const, label: t('trust.sort.oldest', locale) },
    { id: 'name' as const, label: t('trust.sort.name', locale) },
  ];

  // Map documents with translated titles and descriptions
  const documents = trustDocs.map(doc => ({
    ...doc,
    title: t(doc.titleKey, locale),
    description: t(doc.descriptionKey, locale),
    categoryLabel: t(
      trustCategories.find(c => c.id === doc.category)?.titleKey || 'trust.category.legal',
      locale
    ),
  }));

  // Build category chips (same as categoryOptions but for chip display)
  const categoryChips = categoryOptions;

  return {
    locale,
    routeId: 'trust',
    title: `${t('trust.title', locale)} - FlyANGT`,
    pageTitle: t('trust.title', locale),
    pageSubtitle: t('trust.subtitle', locale),
    searchPlaceholder: t('trust.search.placeholder', locale),
    categoryLabel: t('trust.filter.category', locale),
    typeLabel: t('trust.filter.type', locale),
    noResultsText: t('trust.noResults', locale),
    docCountLabel: t('trust.docCount', locale),
    versionLabel: t('trust.version', locale),
    lastUpdatedLabel: t('trust.lastUpdated', locale),
    downloadLabel: t('trust.download', locale),
    openLinkLabel: t('trust.openLink', locale),
    restrictedLabel: t('trust.restricted', locale),
    categoryOptions,
    typeOptions,
    sortOptions,
    categoryChips,
    documents,
  };
};
