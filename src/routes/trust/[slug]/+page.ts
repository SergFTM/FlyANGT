/**
 * Trust Center Document Detail Page Data Loader
 *
 * Loads specific document data by slug.
 */

import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { t, isLocaleSupported, type Locale } from '$config/i18n.config';
import { getDocBySlug, trustCategories } from '$config/trust.config';

// Import content based on locale
import { trustDocDetails as trustDocDetailsEn } from '$content/trust.en';
import { trustDocDetails as trustDocDetailsRu } from '$content/trust.ru';

export const load: PageLoad = ({ params, url }) => {
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  const doc = getDocBySlug(params.slug);

  if (!doc) {
    throw error(404, 'Document not found');
  }

  // Get locale-specific content
  const docDetails = locale === 'ru' ? trustDocDetailsRu : trustDocDetailsEn;
  const details = docDetails[params.slug] || {
    summary: t(doc.descriptionKey, locale),
    keyPoints: [],
  };

  // Get category label
  const categoryConfig = trustCategories.find(c => c.id === doc.category);
  const categoryLabel = categoryConfig ? t(categoryConfig.titleKey, locale) : doc.category;

  return {
    locale,
    routeId: 'trust.detail',
    title: `${t(doc.titleKey, locale)} - ${t('trust.title', locale)} - FlyANGT`,
    document: {
      ...doc,
      title: t(doc.titleKey, locale),
      description: t(doc.descriptionKey, locale),
      categoryLabel,
      summary: details.summary,
      keyPoints: details.keyPoints,
    },
    versionLabel: t('trust.version', locale),
    lastUpdatedLabel: t('trust.lastUpdated', locale),
    downloadLabel: t('trust.download', locale),
    openLinkLabel: t('trust.openLink', locale),
    restrictedLabel: t('trust.restricted', locale),
    keyPointsLabel: t('trust.keyPoints', locale),
    backToCatalogLabel: t('trust.backToCatalog', locale),
    backHref: `/trust${locale !== 'en' ? `?lang=${locale}` : ''}`,
  };
};
