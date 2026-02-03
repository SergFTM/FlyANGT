/**
 * Investors Page Data Loader
 *
 * Loads investors config, content, and i18n translations.
 */

import type { PageLoad } from './$types';
import { getRouteByPath } from '$config/routes.config';
import { isModuleEnabled } from '$config/modules.config';
import { t, isLocaleSupported, type Locale } from '$config/i18n.config';
import { getInvestorsContent } from '$content/pages/investors';
import {
  investorsConfig,
  getInvestorSections,
  getMetricsPlaceholders,
  getDeckRequestDraftKey,
} from '$config/investors.config';

export const load: PageLoad = ({ url }) => {
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  const route = getRouteByPath('/investors');
  const moduleEnabled = isModuleEnabled(route?.moduleId ?? null);
  const content = getInvestorsContent(locale);

  // Get config data
  const sections = getInvestorSections();
  const metrics = getMetricsPlaceholders();
  const deckRequestDraftKey = getDeckRequestDraftKey();
  const links = investorsConfig.links;

  return {
    content,
    locale,
    moduleEnabled,
    sections,
    metrics,
    deckRequestDraftKey,
    links,
    title: `${t('nav.investors', locale)} - FlyANGT`,
    routeId: route?.id ?? 'investors',
    disabledMessage: t('common.moduleDisabled', locale),
  };
};
