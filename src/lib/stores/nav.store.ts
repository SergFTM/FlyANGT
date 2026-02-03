/**
 * Navigation Store
 *
 * Derived navigation lists from config.
 * Provides filtered routes based on:
 * - Module enabled state
 * - Role permissions
 */

import { derived } from 'svelte/store';
import { userStore } from './user.store';
import {
  routes,
  getPublicRoutes,
  getDashboardRoutes,
  type RouteConfig,
} from '$config/routes.config';
import { isModuleEnabled, isModuleNavVisible } from '$config/modules.config';
import { canAccessRouteId, type Role } from '$config/permissions.config';

/**
 * Public navigation routes
 * Filtered by: isPublic, moduleEnabled, moduleNavVisible
 */
export const publicNavRoutes = derived(
  userStore,
  () => {
    return getPublicRoutes().filter(route => {
      if (!isModuleEnabled(route.moduleId)) return false;
      if (!isModuleNavVisible(route.moduleId)) return false;
      return true;
    });
  }
);

/**
 * Dashboard navigation routes
 * Filtered by: moduleEnabled, role permissions
 */
export const dashboardNavRoutes = derived(
  userStore,
  ($user) => {
    const role: Role = $user.role;
    return getDashboardRoutes().filter(route => {
      if (!isModuleEnabled(route.moduleId)) return false;
      if (!canAccessRouteId(role, route.id)) return false;
      return true;
    });
  }
);

/**
 * Check if user can access a specific route
 */
export function canUserAccessRoute(role: Role, route: RouteConfig): boolean {
  if (!isModuleEnabled(route.moduleId)) return false;
  return canAccessRouteId(role, route.id);
}
