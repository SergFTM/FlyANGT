/**
 * Routes Configuration
 *
 * Central navigation and routing map.
 * Titles are i18n keys, not raw strings.
 */

export interface RouteConfig {
  id: string;
  path: string;
  titleKey: string;
  moduleId: string | null;
  isPublic: boolean;
  order: number;
}

export const routes: RouteConfig[] = [
  // Public routes
  {
    id: 'home',
    path: '/',
    titleKey: 'nav.home',
    moduleId: null,
    isPublic: true,
    order: 0,
  },
  {
    id: 'ecosystem',
    path: '/ecosystem',
    titleKey: 'nav.ecosystem',
    moduleId: 'ecosystem',
    isPublic: true,
    order: 1,
  },
  {
    id: 'token',
    path: '/token',
    titleKey: 'nav.token',
    moduleId: 'tokenization',
    isPublic: true,
    order: 2,
  },
  {
    id: 'platform',
    path: '/platform',
    titleKey: 'nav.platform',
    moduleId: 'platform',
    isPublic: true,
    order: 3,
  },
  {
    id: 'partners',
    path: '/partners',
    titleKey: 'nav.partners',
    moduleId: 'partners',
    isPublic: true,
    order: 4,
  },
  {
    id: 'partners.detail',
    path: '/partners/[slug]',
    titleKey: 'nav.partners',
    moduleId: 'partners',
    isPublic: true,
    order: 5,
  },
  {
    id: 'investors',
    path: '/investors',
    titleKey: 'nav.investors',
    moduleId: 'investors',
    isPublic: true,
    order: 5,
  },
  {
    id: 'customers',
    path: '/customers',
    titleKey: 'nav.customers',
    moduleId: 'customers',
    isPublic: true,
    order: 6,
  },

  // Trust Center (public wiki-like document center)
  {
    id: 'trust',
    path: '/trust',
    titleKey: 'nav.trust',
    moduleId: 'trust',
    isPublic: true,
    order: 7,
  },
  {
    id: 'trust.detail',
    path: '/trust/[slug]',
    titleKey: 'nav.trust',
    moduleId: 'trust',
    isPublic: true,
    order: 8,
  },

  // Workflow (public)
  {
    id: 'workflow',
    path: '/workflow',
    titleKey: 'nav.workflow',
    moduleId: 'workflow',
    isPublic: true,
    order: 9,
  },
  {
    id: 'workflow.step',
    path: '/workflow/[step]',
    titleKey: 'nav.workflow',
    moduleId: 'workflow',
    isPublic: true,
    order: 10,
  },

  // Dashboard routes (private)
  {
    id: 'dash.overview',
    path: '/dashboard',
    titleKey: 'dash.overview',
    moduleId: 'dashboard',
    isPublic: false,
    order: 100,
  },
  {
    id: 'dash.documents',
    path: '/dashboard/documents',
    titleKey: 'dash.documents',
    moduleId: 'dashboard',
    isPublic: false,
    order: 101,
  },
  {
    id: 'dash.requests',
    path: '/dashboard/requests',
    titleKey: 'dash.requests',
    moduleId: 'dashboard',
    isPublic: false,
    order: 102,
  },
  {
    id: 'dash.workflow',
    path: '/dashboard/workflow',
    titleKey: 'dash.workflow',
    moduleId: 'dashboard',
    isPublic: false,
    order: 103,
  },
  {
    id: 'dash.support',
    path: '/dashboard/support',
    titleKey: 'dash.support',
    moduleId: 'dashboard',
    isPublic: false,
    order: 104,
  },
  {
    id: 'dash.settings',
    path: '/dashboard/settings',
    titleKey: 'dash.settings',
    moduleId: 'dashboard',
    isPublic: false,
    order: 105,
  },

  // Presale (public)
  {
    id: 'presale',
    path: '/presale',
    titleKey: 'nav.presale',
    moduleId: 'presale',
    isPublic: true,
    order: 11,
  },

  // Configurator (public)
  {
    id: 'configurator',
    path: '/configurator',
    titleKey: 'nav.configurator',
    moduleId: 'configurator',
    isPublic: true,
    order: 12,
  },

  // Dev tools (not in navigation)
  {
    id: 'i18n_audit',
    path: '/i18n-audit',
    titleKey: 'nav.home', // Not displayed
    moduleId: null,
    isPublic: false,
    order: 999,
  },
  {
    id: 'release',
    path: '/release',
    titleKey: 'nav.release', // Not displayed
    moduleId: null,
    isPublic: false,
    order: 1000,
  },
  {
    id: 'snapshot',
    path: '/snapshot',
    titleKey: 'nav.home', // Not displayed
    moduleId: null,
    isPublic: false,
    order: 1001,
  },
  {
    id: 'export',
    path: '/export',
    titleKey: 'nav.home', // Not displayed
    moduleId: null,
    isPublic: false,
    order: 1002,
  },
  {
    id: 'smoke',
    path: '/smoke',
    titleKey: 'nav.home', // Not displayed
    moduleId: null,
    isPublic: false,
    order: 1003,
  },
  {
    id: 'gate',
    path: '/gate',
    titleKey: 'nav.home', // Not displayed
    moduleId: null,
    isPublic: false,
    order: 1004,
  },
  {
    id: 'rc',
    path: '/rc',
    titleKey: 'nav.home', // Not displayed
    moduleId: null,
    isPublic: false,
    order: 1005,
  },
  {
    id: 'rc-compare',
    path: '/rc-compare',
    titleKey: 'nav.home', // Not displayed
    moduleId: null,
    isPublic: false,
    order: 1006,
  },
  {
    id: 'changelog',
    path: '/changelog',
    titleKey: 'nav.home', // Not displayed
    moduleId: null,
    isPublic: false,
    order: 1007,
  },
  {
    id: 'release-notes',
    path: '/release-notes',
    titleKey: 'nav.home', // Not displayed
    moduleId: null,
    isPublic: false,
    order: 1008,
  },
  {
    id: 'publish',
    path: '/publish',
    titleKey: 'nav.home', // Not displayed
    moduleId: null,
    isPublic: false,
    order: 1009,
  },
  {
    id: 'post-release',
    path: '/post-release',
    titleKey: 'nav.home', // Not displayed
    moduleId: null,
    isPublic: false,
    order: 1010,
  },
  {
    id: 'leads',
    path: '/leads',
    titleKey: 'nav.home', // Not displayed
    moduleId: null,
    isPublic: false,
    order: 1011,
  },
  {
    id: 'admin',
    path: '/admin',
    titleKey: 'admin.title',
    moduleId: null,
    isPublic: false,
    order: 1012,
  },
  {
    id: 'migrate',
    path: '/migrate',
    titleKey: 'migrate.title',
    moduleId: null,
    isPublic: false,
    order: 1013,
  },
  {
    id: 'backup',
    path: '/backup',
    titleKey: 'backup.title',
    moduleId: null,
    isPublic: false,
    order: 1014,
  },
];

/**
 * Get route by id
 */
export function getRouteById(id: string): RouteConfig | undefined {
  return routes.find(r => r.id === id);
}

/**
 * Get route by path
 */
export function getRouteByPath(path: string): RouteConfig | undefined {
  return routes.find(r => r.path === path);
}

/**
 * Get public routes for navigation (sorted by order)
 */
export function getPublicRoutes(): RouteConfig[] {
  return routes.filter(r => r.isPublic).sort((a, b) => a.order - b.order);
}

/**
 * Get dashboard routes (sorted by order)
 */
export function getDashboardRoutes(): RouteConfig[] {
  return routes
    .filter(r => r.moduleId === 'dashboard')
    .sort((a, b) => a.order - b.order);
}

/**
 * Get all nav-visible routes (sorted by order)
 */
export function getNavRoutes(): RouteConfig[] {
  return routes.sort((a, b) => a.order - b.order);
}

/**
 * Get trust center routes (sorted by order)
 */
export function getTrustRoutes(): RouteConfig[] {
  return routes
    .filter(r => r.moduleId === 'trust')
    .sort((a, b) => a.order - b.order);
}
