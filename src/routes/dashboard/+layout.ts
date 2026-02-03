/**
 * Dashboard Layout Data Loader
 *
 * Loads:
 * - User role from URL (?role=user)
 * - Dashboard nav items
 * - Locale
 *
 * Note: Role is stubbed from URL, not real auth
 */

import type { LayoutLoad } from './$types';
import { getDashboardRoutes, getRouteByPath } from '$config/routes.config';
import { t, isLocaleSupported, type Locale, type TranslationKey } from '$config/i18n.config';
import { canAccessRouteId, isValidRole, type Role } from '$config/permissions.config';

export const load: LayoutLoad = ({ url }) => {
  // Get locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Get role from URL (stub)
  const roleParam = url.searchParams.get('role');
  const role: Role = roleParam && isValidRole(roleParam) ? roleParam : 'guest';

  // Get dashboard routes filtered by role
  const dashboardRoutes = getDashboardRoutes();
  const navItems = dashboardRoutes
    .filter(route => canAccessRouteId(role, route.id))
    .map(route => ({
      id: route.id,
      path: route.path,
      label: t(route.titleKey as TranslationKey, locale),
    }));

  // Build lang param for links
  const langQueryParam = locale !== 'en' ? `?lang=${locale}` : '';
  const roleQueryParam = role !== 'guest' ? `${langQueryParam ? '&' : '?'}role=${role}` : '';
  const fullQueryParam = `${langQueryParam}${roleQueryParam}`;

  return {
    locale,
    role,
    navItems,
    queryParam: fullQueryParam,
    roleLabel: t('common.role', locale),
  };
};
