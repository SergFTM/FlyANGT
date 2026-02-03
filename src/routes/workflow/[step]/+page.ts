/**
 * Workflow Step Detail Page Data Loader
 *
 * Loads a single workflow step by ID.
 */

import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { t, isLocaleSupported, type Locale, type TranslationKey } from '$config/i18n.config';
import { isModuleEnabled } from '$config/modules.config';
import {
  getWorkflowStepById,
  getWorkflowSteps,
  isValidWorkflowStepId,
  type WorkflowStepId,
} from '$config/workflow.config';
import { getWorkflowContent } from '$content/pages/workflow';

export const load: PageLoad = ({ params, url }) => {
  // Get locale from URL
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Check module status
  const moduleEnabled = isModuleEnabled('workflow');

  // Validate step ID
  if (!isValidWorkflowStepId(params.step)) {
    throw error(404, 'Step not found');
  }

  const stepId = params.step as WorkflowStepId;
  const step = getWorkflowStepById(stepId);

  if (!step) {
    throw error(404, 'Step not found');
  }

  // Get workflow content
  const content = getWorkflowContent(locale);

  // Get total steps count
  const allSteps = getWorkflowSteps();
  const totalSteps = allSteps.length;

  // Translate step data
  const stepTitle = t(step.titleKey as TranslationKey, locale);
  const stepSummary = t(step.summaryKey as TranslationKey, locale);

  // Translate checklist items
  const checklistItems = step.checklistKeys.map(key => t(key as TranslationKey, locale));

  // Translate and build doc links
  const docs = (step.requiredDocs || []).map(doc => ({
    label: t(doc.labelKey as TranslationKey, locale),
    href: `/trust/${doc.trustSlug}${locale !== 'en' ? `?lang=${locale}` : ''}`,
  }));

  // Build query param for links
  const queryParam = locale !== 'en' ? `?lang=${locale}` : '';

  // Build step of label
  const stepOfLabel = t('wf.stepOf' as TranslationKey, locale)
    .replace('{n}', String(step.order))
    .replace('{total}', String(totalSteps));

  return {
    locale,
    routeId: 'workflow.step',
    title: `${stepTitle} - ${t('nav.workflow', locale)} - FlyANGT`,
    moduleEnabled,
    disabledMessage: t('common.moduleDisabled', locale),
    step: {
      id: step.id,
      order: step.order,
      title: stepTitle,
      summary: stepSummary,
    },
    totalSteps,
    checklistItems,
    docs,
    stepOfLabel,
    labels: {
      checklistTitle: content.stepDetail.checklistTitle,
      docsTitle: content.stepDetail.docsTitle,
      backLabel: content.stepDetail.backLabel,
    },
    backHref: `/workflow${queryParam}`,
    queryParam,
  };
};
