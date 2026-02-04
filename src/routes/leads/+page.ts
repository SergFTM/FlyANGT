/**
 * Leads Viewer Page Data Loader
 *
 * Dev-only tool for viewing submitted leads.
 * Returns 404 in production.
 */

import type { PageLoad } from './$types';
import { isLocaleSupported, t, type Locale } from '$config/i18n.config';
import { gateConfig } from '$config/gate.config';
import { assertDevToolAllowed } from '$lib/devtools/guard';

export const load: PageLoad = ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Resolve locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  return {
    locale,
    title: 'Leads Viewer',
    subtitle: 'View submitted leads from the config DB',
    labels: {
      devOnly: 'Development tool - disabled in production',
      refresh: 'Refresh',
      delete: 'Delete',
      empty: 'No leads found',
      loading: 'Loading...',
      source: 'Source',
      email: 'Email',
      name: 'Name',
      country: 'Country',
      createdAt: 'Created',
      actions: 'Actions',
      total: 'Total',
      confirmDelete: 'Are you sure you want to delete this lead?',
    },
  };
};
