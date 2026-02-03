/**
 * Partner Profile Page Data Loader
 *
 * Loads individual partner data by slug.
 */

import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getRouteByPath } from '$config/routes.config';
import { isModuleEnabled } from '$config/modules.config';
import { t, isLocaleSupported, type Locale } from '$config/i18n.config';
import { getPartnersContent } from '$content/pages/partners';
import {
  getPartnerBySlug,
  getPartnerTypeById,
  getPartnerRegionById,
  getServiceTagById,
} from '$config/partners.config';

export const load: PageLoad = ({ params, url }) => {
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  const route = getRouteByPath('/partners');
  const moduleEnabled = isModuleEnabled(route?.moduleId ?? null);

  // Find partner by slug
  const partner = getPartnerBySlug(params.slug);

  if (!partner) {
    throw error(404, 'Partner not found');
  }

  const content = getPartnersContent(locale);

  // Get type and region configs for display
  const typeConfig = getPartnerTypeById(partner.type);
  const regionConfig = getPartnerRegionById(partner.region);

  // Get service labels
  const serviceLabels = partner.services.map(serviceId => {
    const tag = getServiceTagById(serviceId);
    return tag ? t(tag.titleKey, locale) : serviceId;
  });

  // Get highlight texts if available
  const highlightTexts = partner.highlightsKeys?.map(key => t(key, locale)) ?? [];

  return {
    partner,
    content,
    locale,
    moduleEnabled,
    typeLabel: typeConfig ? t(typeConfig.titleKey, locale) : partner.type,
    regionLabel: regionConfig ? t(regionConfig.titleKey, locale) : partner.region,
    serviceLabels,
    highlightTexts,
    statusLabel: t(`partner.status.${partner.status}`, locale),
    title: `${partner.name} - ${t('nav.partners', locale)} - FlyANGT`,
    routeId: 'partners.detail',
    disabledMessage: t('common.moduleDisabled', locale),
  };
};
