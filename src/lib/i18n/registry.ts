/**
 * I18n Keys Registry
 *
 * Tracks registered i18n keys and runtime missing keys for auditing.
 * Used by the /i18n-audit page to detect missing translations.
 */

import type { Locale } from '$config/i18n.config';
import { translations } from '$config/i18n.config';

/**
 * Runtime collection of missing keys (dev only)
 */
const missingKeys = new Set<string>();

/**
 * Registered key arrays from module configs
 */
const registeredKeyArrays: Map<string, string[]> = new Map();

/**
 * Record a missing translation key (called by t function in dev)
 */
export function recordMissingKey(key: string, locale: Locale): void {
  missingKeys.add(`${locale}:${key}`);
}

/**
 * Get the set of missing keys from runtime
 */
export function getMissingKeysSet(): Set<{ key: string; locale: Locale }> {
  const result = new Set<{ key: string; locale: Locale }>();
  missingKeys.forEach(entry => {
    const [locale, ...keyParts] = entry.split(':');
    const key = keyParts.join(':');
    result.add({ key, locale: locale as Locale });
  });
  return result;
}

/**
 * Clear runtime missing keys (for testing)
 */
export function clearMissingKeys(): void {
  missingKeys.clear();
}

/**
 * Register a module's i18n keys for auditing
 *
 * @param moduleId - Unique module identifier (e.g., 'home', 'trust', 'token')
 * @param keys - Array of translation keys used by the module
 */
export function registerKeys(moduleId: string, keys: string[]): void {
  registeredKeyArrays.set(moduleId, keys);
}

/**
 * Get all registered keys from all modules
 */
export function getRegisteredKeys(): string[] {
  const allKeys = new Set<string>();
  registeredKeyArrays.forEach(keys => {
    keys.forEach(key => allKeys.add(key));
  });
  return Array.from(allKeys);
}

/**
 * Get registered keys by module
 */
export function getRegisteredKeysByModule(): Map<string, string[]> {
  return new Map(registeredKeyArrays);
}

/**
 * Get missing keys for a specific locale
 * Compares registered keys against translations dictionary
 */
export function getMissingKeysForLocale(locale: Locale): string[] {
  const registeredKeys = getRegisteredKeys();
  const existingKeys = new Set(Object.keys(translations[locale] || {}));

  return registeredKeys.filter(key => !existingKeys.has(key));
}

/**
 * Get all keys defined in translations but not registered
 */
export function getUnregisteredKeys(locale: Locale = 'en'): string[] {
  const registeredKeys = new Set(getRegisteredKeys());
  const existingKeys = Object.keys(translations[locale] || {});

  return existingKeys.filter(key => !registeredKeys.has(key));
}

/**
 * Calculate translation coverage stats for a locale
 */
export function getCoverageStats(locale: Locale): {
  totalRegistered: number;
  totalTranslated: number;
  missing: number;
  coverage: number;
} {
  const registeredKeys = getRegisteredKeys();
  const existingKeys = new Set(Object.keys(translations[locale] || {}));

  const totalRegistered = registeredKeys.length;
  const translated = registeredKeys.filter(key => existingKeys.has(key)).length;
  const missing = totalRegistered - translated;
  const coverage = totalRegistered > 0 ? Math.round((translated / totalRegistered) * 100) : 100;

  return {
    totalRegistered,
    totalTranslated: translated,
    missing,
    coverage,
  };
}

/**
 * Get audit report for all locales
 */
export function getAuditReport(): {
  locales: {
    locale: Locale;
    stats: ReturnType<typeof getCoverageStats>;
    missingKeys: string[];
  }[];
  modules: { id: string; keyCount: number }[];
  runtimeMissing: { key: string; locale: Locale }[];
} {
  const locales: Locale[] = ['en', 'ru'];

  return {
    locales: locales.map(locale => ({
      locale,
      stats: getCoverageStats(locale),
      missingKeys: getMissingKeysForLocale(locale),
    })),
    modules: Array.from(registeredKeyArrays.entries()).map(([id, keys]) => ({
      id,
      keyCount: keys.length,
    })),
    runtimeMissing: Array.from(getMissingKeysSet()),
  };
}
