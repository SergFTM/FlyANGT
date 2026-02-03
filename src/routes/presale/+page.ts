/**
 * Presale Page Data Loader
 *
 * Loads presale config, content, and locale.
 */

import type { PageLoad } from './$types';
import { getRouteByPath } from '$config/routes.config';
import { isModuleEnabled } from '$config/modules.config';
import { t, isLocaleSupported, type Locale } from '$config/i18n.config';
import { presaleConfig, getActiveWeek } from '$config/presale.config';
import { getPresaleContent } from '$content/pages/presale';

export const load: PageLoad = ({ url }) => {
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  const route = getRouteByPath('/presale');
  const moduleEnabled = isModuleEnabled(route?.moduleId ?? null);

  // Get content for locale
  const content = getPresaleContent(locale);

  // Get active week
  const activeWeek = getActiveWeek();

  // Map weeks with translated labels
  const weeks = presaleConfig.weeks.map(week => ({
    week: week.week,
    label: t(week.labelKey, locale),
    priceUsd: week.priceUsd,
    bonus: week.bonusKey ? t(week.bonusKey, locale) : undefined,
    status: week.status,
    statusLabel: t(`presale.status.${week.status}` as 'presale.status.upcoming' | 'presale.status.active' | 'presale.status.completed', locale),
  }));

  // Build lang param for links
  const langParam2 = locale !== 'en' ? `?lang=${locale}` : '';

  return {
    locale,
    moduleEnabled,
    presaleEnabled: presaleConfig.enabled,
    title: `${t('nav.presale', locale)} - FlyANGT`,
    disabledTitle: t('common.comingSoon', locale),
    disabledMessage: t('common.moduleDisabled', locale),

    // Content sections
    content,

    // Config data
    weeks,
    activeWeekPrice: activeWeek?.priceUsd ?? 0.22,
    minCommitUsd: presaleConfig.minCommitUsd,
    maxCommitUsd: presaleConfig.maxCommitUsd,
    currency: presaleConfig.currency,
    showListingComparison: presaleConfig.calculator.showListingComparison,
    assumedListingPriceUsd: presaleConfig.calculator.assumedListingPriceUsd,

    // Links
    trustCenterHref: `${presaleConfig.links.trustCenterPath}${langParam2}`,
  };
};
