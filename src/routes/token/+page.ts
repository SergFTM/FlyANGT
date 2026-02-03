/**
 * Tokenization Page Data Loader
 *
 * Loads token config, sections, and content for the tokenization page.
 */

import type { PageLoad } from './$types';
import { getRouteByPath } from '$config/routes.config';
import { isModuleEnabled } from '$config/modules.config';
import { t, isLocaleSupported, type Locale, type TranslationKey } from '$config/i18n.config';
import {
  getTokenSections,
  getRiskSection,
  getWhitepaperHref,
  tokenizationConfig,
} from '$config/tokenization.config';
import { getTokenizationContent } from '$content/pages/tokenization';

export const load: PageLoad = ({ url }) => {
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  const route = getRouteByPath('/token');
  const moduleEnabled = isModuleEnabled(route?.moduleId ?? null);

  // Get page content
  const content = getTokenizationContent(locale);

  // Get sections from config and translate
  const configSections = getTokenSections();
  const sections = configSections.map(section => ({
    id: section.id,
    title: t(section.titleKey, locale),
    text: t(section.textKey, locale),
    bullets: section.bulletsKeys?.map(key => t(key, locale)),
    ctaLabel: section.cta?.labelKey ? t(section.cta.labelKey, locale) : undefined,
    ctaHref: section.cta?.href,
  }));

  // Get risk section (required)
  const riskSectionConfig = getRiskSection();
  const riskSection = {
    id: riskSectionConfig.id,
    title: t(riskSectionConfig.titleKey, locale),
    text: t(riskSectionConfig.textKey, locale),
    bullets: riskSectionConfig.bulletsKeys?.map(key => t(key, locale)) ?? [],
  };

  // Build query param for links
  const langQueryParam = locale !== 'en' ? `?lang=${locale}` : '';

  // Whitepaper link
  const whitepaperHref = `${getWhitepaperHref()}${langQueryParam}`;

  return {
    locale,
    moduleEnabled,
    title: `${t('nav.token', locale)} - FlyANGT`,
    routeId: route?.id ?? 'token',
    disabledMessage: t('common.moduleDisabled', locale),
    content,
    sections,
    riskSection,
    riskSectionId: tokenizationConfig.required.riskSectionId,
    whitepaperHref,
    trustCenterHref: `/trust${langQueryParam}`,
    presaleHref: `/presale${langQueryParam}`,
    langQueryParam,
  };
};
