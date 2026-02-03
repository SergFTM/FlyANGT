/**
 * Stub Requests Data (MVP only)
 *
 * Placeholder user request data for UI development.
 * Replace with DB later.
 */

import type { TranslationKey } from './i18n.config';
import type { WorkflowStepId } from './workflow.config';

/**
 * Request status types
 */
export type RequestStatus = 'draft' | 'in_review' | 'scheduled' | 'in_progress' | 'completed';

/**
 * User request interface
 */
export interface UserRequest {
  id: string;
  titleKey: TranslationKey;
  createdAt: string; // ISO date string
  status: RequestStatus;
  currentStep: WorkflowStepId;
  progressPct: number;
  links?: {
    configurator?: boolean;
    presale?: boolean;
  };
}

/**
 * Stub requests data
 */
export const stubRequests: UserRequest[] = [
  {
    id: 'req-001',
    titleKey: 'req.stub.config1.title',
    createdAt: '2024-12-15',
    status: 'draft',
    currentStep: 'configure',
    progressPct: 5,
    links: {
      configurator: true,
    },
  },
  {
    id: 'req-002',
    titleKey: 'req.stub.qualification1.title',
    createdAt: '2024-11-20',
    status: 'in_review',
    currentStep: 'qualification',
    progressPct: 15,
    links: {
      presale: true,
    },
  },
  {
    id: 'req-003',
    titleKey: 'req.stub.build1.title',
    createdAt: '2024-09-10',
    status: 'in_progress',
    currentStep: 'build',
    progressPct: 45,
  },
  {
    id: 'req-004',
    titleKey: 'req.stub.training1.title',
    createdAt: '2024-06-01',
    status: 'in_progress',
    currentStep: 'training',
    progressPct: 70,
  },
  {
    id: 'req-005',
    titleKey: 'req.stub.completed1.title',
    createdAt: '2024-03-15',
    status: 'completed',
    currentStep: 'service',
    progressPct: 100,
  },
];

/**
 * Get all stub requests
 */
export function getStubRequests(): UserRequest[] {
  return stubRequests;
}

/**
 * Get stub request by ID
 */
export function getStubRequestById(id: string): UserRequest | undefined {
  return stubRequests.find(r => r.id === id);
}

/**
 * Get stub requests by status
 */
export function getStubRequestsByStatus(status: RequestStatus): UserRequest[] {
  return stubRequests.filter(r => r.status === status);
}

/**
 * Get active requests (not completed)
 */
export function getActiveStubRequests(): UserRequest[] {
  return stubRequests.filter(r => r.status !== 'completed');
}
