/**
 * Dashboard Workflow Page Data Loader
 *
 * Loads user's workflow progress from stub data.
 */

import type { PageLoad } from './$types';
import { t, isLocaleSupported, type Locale, type TranslationKey } from '$config/i18n.config';
import { getStubRequests, type RequestStatus } from '$config/requests.stub';
import { getWorkflowStepById, getWorkflowSteps } from '$config/workflow.config';
import { getWorkflowContent } from '$content/pages/workflow';

export const load: PageLoad = ({ url }) => {
  // Get locale from URL
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Get role from URL (stub)
  const roleParam = url.searchParams.get('role');

  // Get selected request ID from URL if any
  const selectedReqId = url.searchParams.get('req');

  // Get workflow content
  const content = getWorkflowContent(locale);

  // Get all workflow steps for reference
  const workflowSteps = getWorkflowSteps();

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

  // Get selected request details if any
  let selectedRequest = null;
  if (selectedReqId) {
    const req = stubRequests.find(r => r.id === selectedReqId);
    if (req) {
      const step = getWorkflowStepById(req.currentStep);
      const statusKey = `req.status.${req.status}` as TranslationKey;

      // Get checklist for current step
      const checklistItems = step
        ? step.checklistKeys.map(key => t(key as TranslationKey, locale))
        : [];

      selectedRequest = {
        id: req.id,
        title: t(req.titleKey as TranslationKey, locale),
        status: req.status,
        statusLabel: t(statusKey, locale),
        currentStep: step ? t(step.titleKey as TranslationKey, locale) : req.currentStep,
        currentStepOrder: step?.order ?? 1,
        progressPct: req.progressPct,
        createdAt: req.createdAt,
        checklistItems,
        workflowSteps: workflowSteps.map(s => ({
          id: s.id,
          order: s.order,
          title: t(s.titleKey as TranslationKey, locale),
          isCurrent: s.id === req.currentStep,
          isCompleted: s.order < (step?.order ?? 1),
        })),
      };
    }
  }

  return {
    locale,
    routeId: 'dash.workflow',
    title: `${t('dash.workflow', locale)} - FlyANGT`,
    pageTitle: t('dash.workflow', locale),
    requests,
    selectedRequest,
    labels: {
      progressLabel: t('wf.progress', locale),
      currentStepLabel: t('wf.currentStep', locale),
      noRequests: t('req.noRequests', locale),
      viewWorkflow: t('req.viewWorkflow', locale),
      configuratorLabel: t('req.openConfigurator', locale),
      presaleLabel: t('req.openPresale', locale),
      checklistTitle: content.stepDetail.checklistTitle,
      backLabel: content.stepDetail.backLabel,
    },
    publicWorkflowHref: `/workflow${langQueryParam}`,
    queryParam,
  };
};
