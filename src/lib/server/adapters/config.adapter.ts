/**
 * Config Adapter
 *
 * Loads configuration from config files.
 * Currently reads from TypeScript config modules.
 *
 * FUTURE DATABASE MIGRATION:
 * This adapter provides a unified interface for loading configuration.
 * When migrating to a database:
 * 1. Create db.adapter.ts with similar interface
 * 2. Switch imports based on environment variable
 * 3. Keep this file as fallback or reference
 */

import { appConfig, type AppConfig } from '$config/app.config';
import { routes, type RouteConfig } from '$config/routes.config';
import { modulesConfig, type ModuleConfig } from '$config/modules.config';
import { contentConfig, type PageContentConfig } from '$config/content.config';
import { rolesConfig, type RoleConfig } from '$config/permissions.config';
import { locales, type LocaleConfig } from '$config/i18n.config';
import { featureFlags, type FeatureFlags } from '$config/features.config';

/**
 * Unified configuration adapter interface
 */
export interface IConfigAdapter {
  getAppConfig(): AppConfig;
  getRoutes(): RouteConfig[];
  getModules(): ModuleConfig[];
  getContent(): PageContentConfig[];
  getRoles(): RoleConfig[];
  getLocales(): LocaleConfig[];
  getFeatureFlags(): FeatureFlags;
}

/**
 * Configuration-based adapter (current implementation)
 */
export class ConfigAdapter implements IConfigAdapter {
  getAppConfig(): AppConfig {
    return appConfig;
  }

  getRoutes(): RouteConfig[] {
    return routes;
  }

  getModules(): ModuleConfig[] {
    return modulesConfig;
  }

  getContent(): PageContentConfig[] {
    return contentConfig;
  }

  getRoles(): RoleConfig[] {
    return rolesConfig;
  }

  getLocales(): LocaleConfig[] {
    return locales;
  }

  getFeatureFlags(): FeatureFlags {
    return featureFlags;
  }
}

/**
 * Database adapter placeholder
 *
 * FUTURE IMPLEMENTATION:
 * Replace this with actual database queries
 */
export class DatabaseAdapter implements IConfigAdapter {
  constructor() {
    throw new Error(
      'DatabaseAdapter not yet implemented. Use ConfigAdapter instead.'
    );
  }

  getAppConfig(): AppConfig {
    throw new Error('Not implemented');
  }

  getRoutes(): RouteConfig[] {
    throw new Error('Not implemented');
  }

  getModules(): ModuleConfig[] {
    throw new Error('Not implemented');
  }

  getContent(): PageContentConfig[] {
    throw new Error('Not implemented');
  }

  getRoles(): RoleConfig[] {
    throw new Error('Not implemented');
  }

  getLocales(): LocaleConfig[] {
    throw new Error('Not implemented');
  }

  getFeatureFlags(): FeatureFlags {
    throw new Error('Not implemented');
  }
}

/**
 * Select adapter based on environment
 */
export function getConfigAdapter(): IConfigAdapter {
  return new ConfigAdapter();
}

export const configAdapter = new ConfigAdapter();
