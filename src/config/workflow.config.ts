/**
 * Workflow Configuration
 *
 * "From Order to Flight" workflow steps.
 * Each step defines checklist items and required documents.
 *
 * Later steps will be tied to real requests in DB.
 * Required docs map to Trust Center items.
 */

import type { TranslationKey } from './i18n.config';
import type { Role } from './permissions.config';

/**
 * Workflow step identifiers
 */
export type WorkflowStepId =
  | 'configure'
  | 'qualification'
  | 'contract'
  | 'build'
  | 'qa'
  | 'training'
  | 'delivery'
  | 'service';

/**
 * Reference to a Trust Center document
 */
export interface WorkflowDocRef {
  trustSlug: string;
  labelKey: TranslationKey;
}

/**
 * Workflow step definition
 */
export interface WorkflowStep {
  id: WorkflowStepId;
  titleKey: TranslationKey;
  summaryKey: TranslationKey;
  order: number;
  checklistKeys: TranslationKey[];
  requiredDocs?: WorkflowDocRef[];
  roles?: Role[]; // who can see in dashboard
}

/**
 * Workflow configuration
 */
export interface WorkflowConfig {
  enabled: boolean;
  steps: WorkflowStep[];
}

/**
 * Workflow steps seed data
 */
export const workflowSteps: WorkflowStep[] = [
  {
    id: 'configure',
    titleKey: 'wf.step.configure.title',
    summaryKey: 'wf.step.configure.summary',
    order: 1,
    checklistKeys: [
      'wf.step.configure.check.1',
      'wf.step.configure.check.2',
      'wf.step.configure.check.3',
      'wf.step.configure.check.4',
      'wf.step.configure.check.5',
    ],
    requiredDocs: [
      { trustSlug: 'terms-of-service', labelKey: 'wf.doc.terms' },
      { trustSlug: 'privacy-policy', labelKey: 'wf.doc.privacy' },
    ],
    roles: ['user', 'partner', 'admin'],
  },
  {
    id: 'qualification',
    titleKey: 'wf.step.qualification.title',
    summaryKey: 'wf.step.qualification.summary',
    order: 2,
    checklistKeys: [
      'wf.step.qualification.check.1',
      'wf.step.qualification.check.2',
      'wf.step.qualification.check.3',
      'wf.step.qualification.check.4',
      'wf.step.qualification.check.5',
      'wf.step.qualification.check.6',
    ],
    requiredDocs: [
      { trustSlug: 'partner-application-form', labelKey: 'wf.doc.application' },
      { trustSlug: 'regulatory-compliance', labelKey: 'wf.doc.compliance' },
    ],
    roles: ['user', 'partner', 'admin'],
  },
  {
    id: 'contract',
    titleKey: 'wf.step.contract.title',
    summaryKey: 'wf.step.contract.summary',
    order: 3,
    checklistKeys: [
      'wf.step.contract.check.1',
      'wf.step.contract.check.2',
      'wf.step.contract.check.3',
      'wf.step.contract.check.4',
    ],
    requiredDocs: [
      { trustSlug: 'terms-of-service', labelKey: 'wf.doc.terms' },
      { trustSlug: 'data-retention-policy', labelKey: 'wf.doc.dataRetention' },
    ],
    roles: ['user', 'partner', 'admin'],
  },
  {
    id: 'build',
    titleKey: 'wf.step.build.title',
    summaryKey: 'wf.step.build.summary',
    order: 4,
    checklistKeys: [
      'wf.step.build.check.1',
      'wf.step.build.check.2',
      'wf.step.build.check.3',
      'wf.step.build.check.4',
      'wf.step.build.check.5',
      'wf.step.build.check.6',
      'wf.step.build.check.7',
    ],
    requiredDocs: [
      { trustSlug: 'quality-assurance-standards', labelKey: 'wf.doc.qaStandards' },
    ],
    roles: ['user', 'partner', 'admin'],
  },
  {
    id: 'qa',
    titleKey: 'wf.step.qa.title',
    summaryKey: 'wf.step.qa.summary',
    order: 5,
    checklistKeys: [
      'wf.step.qa.check.1',
      'wf.step.qa.check.2',
      'wf.step.qa.check.3',
      'wf.step.qa.check.4',
      'wf.step.qa.check.5',
    ],
    requiredDocs: [
      { trustSlug: 'quality-assurance-standards', labelKey: 'wf.doc.qaStandards' },
      { trustSlug: 'regulatory-compliance', labelKey: 'wf.doc.compliance' },
    ],
    roles: ['user', 'partner', 'admin'],
  },
  {
    id: 'training',
    titleKey: 'wf.step.training.title',
    summaryKey: 'wf.step.training.summary',
    order: 6,
    checklistKeys: [
      'wf.step.training.check.1',
      'wf.step.training.check.2',
      'wf.step.training.check.3',
      'wf.step.training.check.4',
      'wf.step.training.check.5',
      'wf.step.training.check.6',
    ],
    requiredDocs: [
      { trustSlug: 'flight-operations-manual', labelKey: 'wf.doc.flightOps' },
      { trustSlug: 'platform-user-manual', labelKey: 'wf.doc.platformManual' },
    ],
    roles: ['user', 'partner', 'admin'],
  },
  {
    id: 'delivery',
    titleKey: 'wf.step.delivery.title',
    summaryKey: 'wf.step.delivery.summary',
    order: 7,
    checklistKeys: [
      'wf.step.delivery.check.1',
      'wf.step.delivery.check.2',
      'wf.step.delivery.check.3',
      'wf.step.delivery.check.4',
      'wf.step.delivery.check.5',
    ],
    requiredDocs: [
      { trustSlug: 'security-policy', labelKey: 'wf.doc.security' },
    ],
    roles: ['user', 'partner', 'admin'],
  },
  {
    id: 'service',
    titleKey: 'wf.step.service.title',
    summaryKey: 'wf.step.service.summary',
    order: 8,
    checklistKeys: [
      'wf.step.service.check.1',
      'wf.step.service.check.2',
      'wf.step.service.check.3',
      'wf.step.service.check.4',
    ],
    requiredDocs: [
      { trustSlug: 'aircraft-maintenance-guide', labelKey: 'wf.doc.maintenance' },
      { trustSlug: 'data-retention-policy', labelKey: 'wf.doc.dataRetention' },
    ],
    roles: ['user', 'partner', 'admin'],
  },
];

/**
 * Workflow configuration object
 */
export const workflowConfig: WorkflowConfig = {
  enabled: true,
  steps: workflowSteps,
};

/**
 * Get workflow step by ID
 */
export function getWorkflowStepById(id: WorkflowStepId): WorkflowStep | undefined {
  return workflowSteps.find(s => s.id === id);
}

/**
 * Get all workflow steps sorted by order
 */
export function getWorkflowSteps(): WorkflowStep[] {
  return [...workflowSteps].sort((a, b) => a.order - b.order);
}

/**
 * Get workflow steps visible to a role
 */
export function getWorkflowStepsForRole(role: Role): WorkflowStep[] {
  return workflowSteps
    .filter(s => !s.roles || s.roles.includes(role))
    .sort((a, b) => a.order - b.order);
}

/**
 * Get step index (0-based)
 */
export function getStepIndex(stepId: WorkflowStepId): number {
  const sortedSteps = getWorkflowSteps();
  return sortedSteps.findIndex(s => s.id === stepId);
}

/**
 * Calculate progress percentage based on current step
 */
export function calculateProgress(currentStepId: WorkflowStepId): number {
  const index = getStepIndex(currentStepId);
  if (index < 0) return 0;
  const totalSteps = workflowSteps.length;
  return Math.round((index / totalSteps) * 100);
}

/**
 * Check if workflow step ID is valid
 */
export function isValidWorkflowStepId(id: string): id is WorkflowStepId {
  return workflowSteps.some(s => s.id === id);
}
