/**
 * Application Configuration
 *
 * Config-first MVP, no DB
 * Global app settings: name, locales, environment flags
 */

export type Locale = 'en' | 'ru';

export interface AppConfig {
  appName: string;
  version: string;
  description: string;
  defaultLocale: Locale;
  supportedLocales: Locale[];
  isDev: boolean;
  isProd: boolean;
}

export const appConfig: AppConfig = {
  appName: 'FlyANGT',
  version: '0.1.0',
  description: 'Digital aviation platform for ownership, configuration, and tokenized participation',
  defaultLocale: 'en',
  supportedLocales: ['en', 'ru'],
  isDev: import.meta.env.DEV ?? true,
  isProd: import.meta.env.PROD ?? false,
};
