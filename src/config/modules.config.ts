/**
 * Modules Configuration
 *
 * Defines which platform modules are enabled/disabled.
 *
 * Future: This config will migrate to database when admin panel is built.
 * For now, static config is the single source of truth.
 */

export interface ModuleConfig {
  id: string;
  enabled: boolean;
  navVisible: boolean;
  requiresAuth: boolean;
}

export const modulesConfig: ModuleConfig[] = [
  // Public modules (enabled)
  {
    id: 'ecosystem',
    enabled: true,
    navVisible: true,
    requiresAuth: false,
  },
  {
    id: 'tokenization',
    enabled: true,
    navVisible: true,
    requiresAuth: false,
  },
  {
    id: 'platform',
    enabled: true,
    navVisible: true,
    requiresAuth: false,
  },
  {
    id: 'partners',
    enabled: true,
    navVisible: true,
    requiresAuth: false,
  },
  {
    id: 'investors',
    enabled: true,
    navVisible: true,
    requiresAuth: false,
  },
  {
    id: 'customers',
    enabled: true,
    navVisible: true,
    requiresAuth: false,
  },

  // Trust Center module (public wiki-like document center)
  {
    id: 'trust',
    enabled: true,
    navVisible: true,
    requiresAuth: false,
  },

  // Workflow module (public overview, dashboard integration)
  {
    id: 'workflow',
    enabled: true,
    navVisible: true,
    requiresAuth: false,
  },

  // Dashboard module (enabled, but not in public nav)
  {
    id: 'dashboard',
    enabled: true,
    navVisible: false, // Not shown in public navigation
    requiresAuth: true, // Future: will require auth
  },

  // Presale module (enabled, public)
  {
    id: 'presale',
    enabled: true,
    navVisible: true,
    requiresAuth: false,
  },

  // Configurator module (enabled, public)
  {
    id: 'configurator',
    enabled: true,
    navVisible: true,
    requiresAuth: false,
  },
];

/**
 * Check if a module is enabled
 */
export function isModuleEnabled(moduleId: string | null): boolean {
  if (!moduleId) return true;
  const module = modulesConfig.find(m => m.id === moduleId);
  return module?.enabled ?? false;
}

/**
 * Check if module is visible in navigation
 */
export function isModuleNavVisible(moduleId: string | null): boolean {
  if (!moduleId) return true;
  const module = modulesConfig.find(m => m.id === moduleId);
  return module?.navVisible ?? false;
}

/**
 * Get module config by id
 */
export function getModuleConfig(moduleId: string): ModuleConfig | undefined {
  return modulesConfig.find(m => m.id === moduleId);
}
