/**
 * Partners Page Data Loader
 *
 * Loads partners config, content, and i18n translations.
 */

import type { PageLoad } from './$types';
import { getRouteByPath } from '$config/routes.config';
import { isModuleEnabled } from '$config/modules.config';
import { t, isLocaleSupported, type Locale } from '$config/i18n.config';
import { getPartnersContent } from '$content/pages/partners';
import {
  partnersConfig,
  getPartnerTypes,
  getPartnerRegions,
  getServiceTags,
  getLeadDraftKey,
} from '$config/partners.config';

export const load: PageLoad = ({ url }) => {
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  const route = getRouteByPath('/partners');
  const moduleEnabled = isModuleEnabled(route?.moduleId ?? null);
  const content = getPartnersContent(locale);

  // Get config data
  const partners = partnersConfig.partners;
  const types = getPartnerTypes();
  const regions = getPartnerRegions();
  const serviceTags = getServiceTags();
  const leadDraftKey = getLeadDraftKey();

  return {
    content,
    locale,
    moduleEnabled,
    partners,
    types,
    regions,
    serviceTags,
    leadDraftKey,
    title: `${t('nav.partners', locale)} - FlyANGT`,
    routeId: route?.id ?? 'partners',
    disabledMessage: t('common.moduleDisabled', locale),
  };
};
