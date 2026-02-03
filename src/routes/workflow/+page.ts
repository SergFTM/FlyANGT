/**
 * Workflow Page Data Loader
 *
 * Loads workflow configuration and page content.
 */

import type { PageLoad } from './$types';
import { t, isLocaleSupported, type Locale, type TranslationKey } from '$config/i18n.config';
import { isModuleEnabled } from '$config/modules.config';
import { getWorkflowSteps } from '$config/workflow.config';
import { getWorkflowContent } from '$content/pages/workflow';

export const load: PageLoad = ({ url }) => {
  // Get locale from URL
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Check module status
  const moduleEnabled = isModuleEnabled('workflow');

  // Get workflow content
  const content = getWorkflowContent(locale);

  // Get workflow steps with translations
  const steps = getWorkflowSteps().map(step => ({
    id: step.id,
    order: step.order,
    title: t(step.titleKey as TranslationKey, locale),
    summary: t(step.summaryKey as TranslationKey, locale),
    href: `/workflow/${step.id}${locale !== 'en' ? `?lang=${locale}` : ''}`,
  }));

  // Build query param for links
  const queryParam = locale !== 'en' ? `?lang=${locale}` : '';

  return {
    locale,
    routeId: 'workflow',
    title: `${t('nav.workflow', locale)} - FlyANGT`,
    moduleEnabled,
    disabledMessage: t('common.moduleDisabled', locale),
    content,
    steps,
    configuratorHref: `/configurator${queryParam}`,
    dashboardHref: `/dashboard/workflow${queryParam}`,
    queryParam,
  };
};
