/**
 * Ecosystem Page Data Loader
 */

import type { PageLoad } from './$types';
import { getPageContent } from '$content/index';
import { getRouteByPath } from '$config/routes.config';
import { isModuleEnabled } from '$config/modules.config';
import { t, isLocaleSupported, type Locale } from '$config/i18n.config';

export const load: PageLoad = ({ url }) => {
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  const route = getRouteByPath('/ecosystem');
  const moduleEnabled = isModuleEnabled(route?.moduleId ?? null);
  const content = getPageContent('ecosystem', locale);

  return {
    content,
    locale,
    moduleEnabled,
    title: `${t('nav.ecosystem', locale)} - FlyANGT`,
    routeId: route?.id ?? 'ecosystem',
    disabledMessage: t('common.moduleDisabled', locale),
  };
};
