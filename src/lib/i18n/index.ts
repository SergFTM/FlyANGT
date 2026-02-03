/**
 * I18n Helper
 *
 * Central i18n utilities with typed translations,
 * fallback behavior, and dev diagnostics.
 */

import { translations, type Locale, type TranslationKey } from '$config/i18n.config';
import { getMissingKeysSet, recordMissingKey } from './registry';

/**
 * Translation parameters for interpolation
 */
export type TranslationParams = Record<string, string | number>;

/**
 * Get translation by key with optional parameter interpolation
 *
 * Features:
 * - Falls back to EN if key missing in target locale
 * - Falls back to visible placeholder if key missing entirely
 * - Supports {param} interpolation
 * - Records missing keys in dev mode
 */
export function t(
  key: TranslationKey | string,
  locale: Locale = 'en',
  params?: TranslationParams
): string {
  // Try target locale first
  let value = translations[locale]?.[key as TranslationKey];

  // Fall back to EN if not found
  if (value === undefined && locale !== 'en') {
    value = translations.en[key as TranslationKey];
  }

  // If still not found, record as missing and return placeholder
  if (value === undefined) {
    if (import.meta.env.DEV) {
      recordMissingKey(key, locale);
    }
    return `[missing:${key}]`;
  }

  // Interpolate parameters if provided
  if (params) {
    return interpolate(value, params);
  }

  return value;
}

/**
 * Create a locale-bound translation function
 * Useful in +page.ts load functions
 */
export function createT(locale: Locale) {
  return (key: TranslationKey | string, params?: TranslationParams): string => {
    return t(key, locale, params);
  };
}

/**
 * Check if a translation key exists for a locale
 */
export function hasTranslation(key: string, locale: Locale = 'en'): boolean {
  return translations[locale]?.[key as TranslationKey] !== undefined;
}

/**
 * Get all translation keys for a locale
 */
export function getTranslationKeys(locale: Locale = 'en'): string[] {
  return Object.keys(translations[locale] || {});
}

/**
 * Interpolate parameters into translation string
 * Replaces {param} with corresponding value
 */
function interpolate(template: string, params: TranslationParams): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = params[key];
    return value !== undefined ? String(value) : match;
  });
}

/**
 * Get missing keys from runtime collection (dev only)
 */
export function getRuntimeMissingKeys(): { key: string; locale: Locale }[] {
  if (!import.meta.env.DEV) {
    return [];
  }
  return Array.from(getMissingKeysSet());
}

// Re-export types and utilities from config
export { type Locale, type TranslationKey } from '$config/i18n.config';
export { translations, locales, getLocale, isLocaleSupported } from '$config/i18n.config';
