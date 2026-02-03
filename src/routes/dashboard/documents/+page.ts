/**
 * Dashboard Documents Page Data Loader
 */

import type { PageLoad } from './$types';
import { t, isLocaleSupported, type Locale } from '$config/i18n.config';

export const load: PageLoad = ({ url }) => {
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  return {
    locale,
    routeId: 'dash.documents',
    title: `${t('dash.documents', locale)} - FlyANGT`,
    pageTitle: t('dash.documents', locale),
    placeholderTitle: t('dash.placeholder.title', locale),
    placeholderText: t('dash.placeholder.text', locale),
  };
};
