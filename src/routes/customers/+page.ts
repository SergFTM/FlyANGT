/**
 * Customers Page Data Loader
 *
 * Loads customers config, content, and i18n translations.
 */

import type { PageLoad } from './$types';
import { getRouteByPath } from '$config/routes.config';
import { isModuleEnabled } from '$config/modules.config';
import { t, isLocaleSupported, type Locale } from '$config/i18n.config';
import { getCustomersContent } from '$content/pages/customers';
import {
  customersConfig,
  getCustomerSections,
  getCustomerLinks,
  getDocsRequestDraftKey,
} from '$config/customers.config';

export const load: PageLoad = ({ url }) => {
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  const route = getRouteByPath('/customers');
  const moduleEnabled = isModuleEnabled(route?.moduleId ?? null);
  const content = getCustomersContent(locale);

  // Get config data
  const sections = getCustomerSections();
  const links = getCustomerLinks();
  const docsRequestDraftKey = getDocsRequestDraftKey();

  return {
    content,
    locale,
    moduleEnabled,
    sections,
    links,
    docsRequestDraftKey,
    title: `${t('nav.customers', locale)} - FlyANGT`,
    routeId: route?.id ?? 'customers',
    disabledMessage: t('common.moduleDisabled', locale),
  };
};
