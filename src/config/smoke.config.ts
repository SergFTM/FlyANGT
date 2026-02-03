/**
 * Smoke Test Configuration
 *
 * Dev tool for manual smoke testing of all routes.
 * Tests are auto-generated from routes.config.ts + modules.config.ts.
 */

import { routes, type RouteConfig } from './routes.config';
import { modulesConfig } from './modules.config';

/**
 * Smoke test result status
 */
export type SmokeResultStatus = 'untested' | 'pass' | 'fail' | 'skip';

/**
 * Smoke test priority
 */
export type SmokePriority = 'p0' | 'p1' | 'p2';

/**
 * Smoke test result
 */
export interface SmokeResult {
  testId: string;
  status: SmokeResultStatus;
  notes: string;
  testedAt: string | null;
}

/**
 * Smoke test definition
 */
export interface SmokeTest {
  id: string;
  routeId: string;
  path: string;
  titleKey: string;
  groupId: string;
  priority: SmokePriority;
  isDynamic: boolean;
  samplePath: string | null; // For dynamic routes like /trust/[slug]
}

/**
 * Smoke test group
 */
export interface SmokeGroup {
  id: string;
  titleKey: string;
  order: number;
}

/**
 * Smoke test configuration
 */
export interface SmokeConfig {
  enabled: boolean;
  storageKey: string;
  exportFilePrefix: string;
  groups: SmokeGroup[];
  dynamicRouteSamples: Record<string, string[]>;
}

/**
 * Smoke test groups
 */
export const smokeGroups: SmokeGroup[] = [
  {
    id: 'public_core',
    titleKey: 'smoke.group.publicCore',
    order: 0,
  },
  {
    id: 'trust_center',
    titleKey: 'smoke.group.trustCenter',
    order: 1,
  },
  {
    id: 'presale',
    titleKey: 'smoke.group.presale',
    order: 2,
  },
  {
    id: 'configurator',
    titleKey: 'smoke.group.configurator',
    order: 3,
  },
  {
    id: 'token',
    titleKey: 'smoke.group.token',
    order: 4,
  },
  {
    id: 'partners',
    titleKey: 'smoke.group.partners',
    order: 5,
  },
  {
    id: 'investors',
    titleKey: 'smoke.group.investors',
    order: 6,
  },
  {
    id: 'customers',
    titleKey: 'smoke.group.customers',
    order: 7,
  },
  {
    id: 'workflow',
    titleKey: 'smoke.group.workflow',
    order: 8,
  },
  {
    id: 'dashboard_basic',
    titleKey: 'smoke.group.dashboardBasic',
    order: 9,
  },
  {
    id: 'dev_tools',
    titleKey: 'smoke.group.devTools',
    order: 10,
  },
];

/**
 * Sample paths for dynamic routes
 */
const dynamicRouteSamples: Record<string, string[]> = {
  'partners.detail': ['/partners/airline-partner', '/partners/tech-partner'],
  'trust.detail': ['/trust/privacy-policy', '/trust/terms-of-service'],
  'workflow.step': ['/workflow/step-1', '/workflow/step-2'],
};

/**
 * Default smoke configuration
 */
export const smokeConfig: SmokeConfig = {
  enabled: true,
  storageKey: 'flyangt-smoke-results',
  exportFilePrefix: 'flyangt-smoke-results',
  groups: smokeGroups,
  dynamicRouteSamples,
};

/**
 * Map route to group ID based on moduleId and route characteristics
 */
function mapRouteToGroup(route: RouteConfig): string {
  // Dev tools
  if (['i18n_audit', 'release', 'snapshot', 'export', 'smoke'].includes(route.id)) {
    return 'dev_tools';
  }

  // Dashboard routes
  if (route.moduleId === 'dashboard') {
    return 'dashboard_basic';
  }

  // Module-specific routes
  switch (route.moduleId) {
    case 'trust':
      return 'trust_center';
    case 'presale':
      return 'presale';
    case 'configurator':
      return 'configurator';
    case 'tokenization':
      return 'token';
    case 'partners':
      return 'partners';
    case 'investors':
      return 'investors';
    case 'customers':
      return 'customers';
    case 'workflow':
      return 'workflow';
    default:
      // Public core pages (home, ecosystem, platform)
      return 'public_core';
  }
}

/**
 * Check if route is dynamic (contains [param])
 */
function isDynamicRoute(path: string): boolean {
  return path.includes('[');
}

/**
 * Determine priority for a route
 * P0: Public core routes (home, main pages)
 * P1: Detail pages and dashboard
 * P2: Dev tools
 */
function getRoutePriority(route: RouteConfig): SmokePriority {
  // Dev tools are lowest priority
  if (['i18n_audit', 'release', 'snapshot', 'export', 'smoke', 'gate'].includes(route.id)) {
    return 'p2';
  }

  // Dashboard and detail pages are P1
  if (route.moduleId === 'dashboard' || route.path.includes('[')) {
    return 'p1';
  }

  // All other public routes are P0
  return 'p0';
}

/**
 * Generate smoke tests from routes config
 */
export function generateSmokeTests(): SmokeTest[] {
  const tests: SmokeTest[] = [];

  for (const route of routes) {
    // Check if module is enabled
    if (route.moduleId) {
      const moduleConfig = modulesConfig.find(m => m.id === route.moduleId);
      if (moduleConfig && !moduleConfig.enabled) {
        continue; // Skip disabled modules
      }
    }

    const isDynamic = isDynamicRoute(route.path);
    const groupId = mapRouteToGroup(route);
    const priority = getRoutePriority(route);

    if (isDynamic) {
      // For dynamic routes, create a test for each sample path
      const samples = dynamicRouteSamples[route.id] || [];
      if (samples.length > 0) {
        samples.forEach((samplePath, index) => {
          tests.push({
            id: `${route.id}_sample_${index + 1}`,
            routeId: route.id,
            path: route.path,
            titleKey: route.titleKey,
            groupId,
            priority: 'p1', // Sample paths are P1
            isDynamic: true,
            samplePath,
          });
        });
      } else {
        // No samples defined, add as single test
        tests.push({
          id: route.id,
          routeId: route.id,
          path: route.path,
          titleKey: route.titleKey,
          groupId,
          priority,
          isDynamic: true,
          samplePath: null,
        });
      }
    } else {
      // Static route
      tests.push({
        id: route.id,
        routeId: route.id,
        path: route.path,
        titleKey: route.titleKey,
        groupId,
        priority,
        isDynamic: false,
        samplePath: null,
      });
    }
  }

  return tests;
}

/**
 * Get tests by group
 */
export function getTestsByGroup(groupId: string): SmokeTest[] {
  return generateSmokeTests().filter(t => t.groupId === groupId);
}

/**
 * Get group by id
 */
export function getSmokeGroup(groupId: string): SmokeGroup | undefined {
  return smokeGroups.find(g => g.id === groupId);
}

/**
 * Get all groups sorted by order
 */
export function getSmokeGroupsSorted(): SmokeGroup[] {
  return [...smokeGroups].sort((a, b) => a.order - b.order);
}
