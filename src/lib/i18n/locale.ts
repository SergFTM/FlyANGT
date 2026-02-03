/**
 * Locale Resolution Utilities
 *
 * Functions for extracting and manipulating locale in URLs.
 */

import type { Locale } from '$config/i18n.config';
import { isLocaleSupported } from '$config/i18n.config';

/**
 * Default locale when none specified
 */
export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Supported locales
 */
export const SUPPORTED_LOCALES: Locale[] = ['en', 'ru'];

/**
 * Extract locale from URL search params
 *
 * @param url - URL object or string to parse
 * @returns Detected locale or default
 */
export function getLocaleFromUrl(url: URL | string): Locale {
  const urlObj = typeof url === 'string' ? new URL(url) : url;
  const langParam = urlObj.searchParams.get('lang');

  if (langParam && isLocaleSupported(langParam)) {
    return langParam as Locale;
  }

  return DEFAULT_LOCALE;
}

/**
 * Normalize locale input to valid Locale type
 *
 * @param input - String to normalize
 * @returns Valid locale or default
 */
export function normalizeLocale(input: string | null | undefined): Locale {
  if (!input) {
    return DEFAULT_LOCALE;
  }

  const normalized = input.toLowerCase().trim();

  if (isLocaleSupported(normalized)) {
    return normalized as Locale;
  }

  // Handle common aliases
  if (normalized === 'russian' || normalized === 'rus') {
    return 'ru';
  }
  if (normalized === 'english' || normalized === 'eng') {
    return 'en';
  }

  return DEFAULT_LOCALE;
}

/**
 * Add or update locale param in href
 *
 * @param href - Original href (can be relative or absolute)
 * @param locale - Locale to set
 * @returns Updated href with ?lang= param
 */
export function withLocaleHref(href: string, locale: Locale): string {
  // Handle relative URLs
  if (!href.startsWith('http')) {
    // Parse as relative URL
    const hasQuery = href.includes('?');
    const hasHash = href.includes('#');

    if (!hasQuery && !hasHash) {
      return `${href}?lang=${locale}`;
    }

    // Use URL with dummy base for relative parsing
    try {
      const url = new URL(href, 'http://dummy');
      url.searchParams.set('lang', locale);
      // Return path + search + hash
      return url.pathname + url.search + url.hash;
    } catch {
      // Fallback: append directly
      return href.includes('?') ? `${href}&lang=${locale}` : `${href}?lang=${locale}`;
    }
  }

  // Handle absolute URLs
  try {
    const url = new URL(href);
    url.searchParams.set('lang', locale);
    return url.toString();
  } catch {
    return href;
  }
}

/**
 * Remove locale param from href
 *
 * @param href - Original href
 * @returns Href without lang param
 */
export function withoutLocaleHref(href: string): string {
  if (!href.includes('lang=')) {
    return href;
  }

  try {
    const url = new URL(href, 'http://dummy');
    url.searchParams.delete('lang');

    if (href.startsWith('http')) {
      return url.toString();
    }

    // Return path + search + hash for relative URLs
    const search = url.search || '';
    return url.pathname + search + url.hash;
  } catch {
    // Fallback: regex removal
    return href.replace(/[?&]lang=[^&#]+/, '').replace(/\?$/, '');
  }
}

/**
 * Get opposite locale (for toggle functionality)
 */
export function getAlternateLocale(current: Locale): Locale {
  return current === 'en' ? 'ru' : 'en';
}
