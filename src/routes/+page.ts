/**
 * Home Page Data Loader
 *
 * Loads home config, content, routes, and modules.
 * Computes module cards based on configuration.
 */

import type { PageLoad } from './$types';
import { getRouteByPath, routes, type RouteConfig } from '$config/routes.config';
import { isModuleEnabled, isModuleNavVisible } from '$config/modules.config';
import { t, isLocaleSupported, type Locale } from '$config/i18n.config';
import { getHomeContent } from '$content/pages/home';
import {
  homeConfig,
  getEnabledHomeBlocks,
  getHomeLinks,
  getHomeModulesConfig,
} from '$config/home.config';

/**
 * Module card for display
 */
interface ModuleCard {
  id: string;
  title: string;
  path: string;
}

/**
 * Compute module cards from routes config
 */
function computeModuleCards(locale: Locale): ModuleCard[] {
  const modulesConfig = getHomeModulesConfig();

  // Filter routes based on config
  const eligibleRoutes = routes.filter((route: RouteConfig) => {
    // Exclude specified route IDs
    if (modulesConfig.excludeRouteIds.includes(route.id)) {
      return false;
    }

    // Check public visibility
    if (modulesConfig.showOnlyPublicNavVisible) {
      if (!route.isPublic) {
        return false;
      }

      // Check module is enabled and nav visible
      if (route.moduleId) {
        if (!isModuleEnabled(route.moduleId)) {
          return false;
        }
        if (!isModuleNavVisible(route.moduleId)) {
          return false;
        }
      }
    }

    return true;
  });

  // Sort by order and limit
  const sortedRoutes = eligibleRoutes
    .sort((a, b) => a.order - b.order)
    .slice(0, modulesConfig.maxCards);

  // Map to cards with translated titles
  return sortedRoutes.map((route) => ({
    id: route.id,
    title: t(route.titleKey as any, locale),
    path: route.path,
  }));
}

export const load: PageLoad = ({ url }) => {
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  const route = getRouteByPath('/');
  const content = getHomeContent(locale);

  // Get config data
  const blocks = getEnabledHomeBlocks();
  const links = getHomeLinks();

  // Compute module cards
  const moduleCards = computeModuleCards(locale);

  return {
    content,
    locale,
    blocks,
    links,
    moduleCards,
    title: `FlyANGT - ${t('nav.home', locale)}`,
    routeId: route?.id ?? 'home',
  };
};
