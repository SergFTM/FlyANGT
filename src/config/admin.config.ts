/**
 * Admin Configuration
 *
 * DEV-ONLY admin viewer settings.
 * Process and visibility gate only. Not a security boundary.
 */

import type { SubmissionSource } from '$lib/domain/types';

/**
 * Admin tab identifiers
 */
export type AdminTabId = 'leads' | 'requests';

/**
 * Admin configuration
 */
export interface AdminConfig {
  enabled: boolean;
  devOnly: boolean;
  defaultTab: AdminTabId;
  defaults: {
    limit: number;
    sort: 'newest';
  };
  filters: {
    limits: number[];
    sources: SubmissionSource[];
  };
  exportFilePrefix: string;
  links: {
    apiLeads: string;
    apiRequests: string;
  };
}

/**
 * Default admin configuration
 */
export const adminConfig: AdminConfig = {
  // Admin system enabled
  enabled: true,

  // Only available in development mode
  devOnly: true,

  // Default tab on load
  defaultTab: 'leads',

  // Default values
  defaults: {
    limit: 25,
    sort: 'newest',
  },

  // Filter options
  filters: {
    limits: [10, 25, 50, 100],
    sources: [
      'presale',
      'configurator_quote',
      'partners',
      'investors_deck',
      'customers_docs',
    ],
  },

  // Export file naming prefix
  exportFilePrefix: 'flyangt-admin',

  // API links for dev helpers
  links: {
    apiLeads: '/api/leads',
    apiRequests: '/api/requests',
  },
};

/**
 * Check if a tab ID is valid
 */
export function isValidTab(tab: string): tab is AdminTabId {
  return tab === 'leads' || tab === 'requests';
}

/**
 * Check if a limit value is valid
 */
export function isValidLimit(limit: number): boolean {
  return adminConfig.filters.limits.includes(limit);
}

/**
 * Get default limit if invalid
 */
export function getValidLimit(limit: number): number {
  return isValidLimit(limit) ? limit : adminConfig.defaults.limit;
}
