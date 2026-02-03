/**
 * Dashboard Requests Page Data Loader
 *
 * Loads stub requests and links to workflow.
 */

import type { PageLoad } from './$types';
import { t, isLocaleSupported, type Locale, type TranslationKey } from '$config/i18n.config';
import { getStubRequests } from '$config/requests.stub';
import { getWorkflowStepById } from '$config/workflow.config';

export const load: PageLoad = ({ url }) => {
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Get role from URL (stub)
  const roleParam = url.searchParams.get('role');

  // Build query param for links
  const langQueryParam = locale !== 'en' ? `?lang=${locale}` : '';
  const roleQueryParam = roleParam ? `${langQueryParam ? '&' : '?'}role=${roleParam}` : '';
  const queryParam = `${langQueryParam}${roleQueryParam}`;

  // Get stub requests and transform for display
  const stubRequests = getStubRequests();
  const requests = stubRequests.map(req => {
    const step = getWorkflowStepById(req.currentStep);
    const statusKey = `req.status.${req.status}` as TranslationKey;

    return {
      id: req.id,
      title: t(req.titleKey as TranslationKey, locale),
      status: req.status,
      statusLabel: t(statusKey, locale),
      currentStep: step ? t(step.titleKey as TranslationKey, locale) : req.currentStep,
      currentStepLabel: t('wf.currentStep', locale),
      progressPct: req.progressPct,
      createdAt: req.createdAt,
      workflowHref: `/dashboard/workflow${queryParam}${queryParam ? '&' : '?'}req=${req.id}`,
      configuratorHref: req.links?.configurator ? `/configurator${langQueryParam}` : null,
      presaleHref: req.links?.presale ? `/presale${langQueryParam}` : null,
    };
  });

  return {
    locale,
    routeId: 'dash.requests',
    title: `${t('dash.requests', locale)} - FlyANGT`,
    pageTitle: t('dash.requests', locale),
    requests,
    labels: {
      progressLabel: t('wf.progress', locale),
      noRequests: t('req.noRequests', locale),
      configuratorLabel: t('req.openConfigurator', locale),
      presaleLabel: t('req.openPresale', locale),
    },
    queryParam,
  };
};
