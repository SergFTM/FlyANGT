/**
 * Configurator Page Data Loader
 *
 * Loads configurator config, content, and locale.
 */

import type { PageLoad } from './$types';
import { getRouteByPath } from '$config/routes.config';
import { isModuleEnabled } from '$config/modules.config';
import { t, isLocaleSupported, type Locale } from '$config/i18n.config';
import { configuratorConfig, type OptionGroupId } from '$config/configurator.config';
import { getConfiguratorContent } from '$content/pages/configurator';

export const load: PageLoad = ({ url }) => {
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  const route = getRouteByPath('/configurator');
  const moduleEnabled = isModuleEnabled(route?.moduleId ?? null);

  // Get content for locale
  const content = getConfiguratorContent(locale);

  // Map groups with translated titles and descriptions
  const groups = configuratorConfig.groups.map(group => ({
    id: group.id,
    title: t(group.titleKey, locale),
    description: t(group.descriptionKey, locale),
    selectionMode: group.selectionMode,
    options: group.options.map(option => ({
      id: option.id,
      title: t(option.titleKey, locale),
      description: option.descriptionKey ? t(option.descriptionKey, locale) : undefined,
      priceUsd: option.priceUsd,
    })),
  }));

  // Create a map of group titles for summary
  const groupTitles: Record<OptionGroupId, string> = {
    model: t('cfg.group.model', locale),
    exterior: t('cfg.group.exterior', locale),
    interior: t('cfg.group.interior', locale),
    avionics: t('cfg.group.avionics', locale),
    safety: t('cfg.group.safety', locale),
    packages: t('cfg.group.packages', locale),
  };

  // Create a map of option titles for summary
  const optionTitles: Record<string, string> = {};
  for (const group of configuratorConfig.groups) {
    for (const option of group.options) {
      optionTitles[option.id] = t(option.titleKey, locale);
    }
  }

  return {
    locale,
    moduleEnabled,
    configuratorEnabled: configuratorConfig.enabled,
    title: `${t('nav.configurator', locale)} - FlyANGT`,
    disabledMessage: t('common.moduleDisabled', locale),

    // Content
    content,

    // Config data
    groups,
    groupTitles,
    optionTitles,
    pricingNote: t(configuratorConfig.pricing.noteKey, locale),
    currency: configuratorConfig.currency,
  };
};
