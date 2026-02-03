/**
 * Application Store
 *
 * Global app state: locale, theme, app info
 * Minimal state management without external libraries.
 */

import { writable, get } from 'svelte/store';
import type { Locale } from '$config/i18n.config';
import { isLocaleSupported } from '$config/i18n.config';

export interface AppState {
  locale: Locale;
  theme: 'light' | 'dark';
  appReady: boolean;
}

function createAppStore() {
  const { subscribe, set, update } = writable<AppState>({
    locale: 'en',
    theme: 'light',
    appReady: false,
  });

  return {
    subscribe,

    setLocale: (locale: string) => {
      if (isLocaleSupported(locale)) {
        update(state => ({ ...state, locale }));
      }
    },

    getLocale: (): Locale => {
      return get({ subscribe }).locale;
    },

    setTheme: (theme: 'light' | 'dark') => {
      update(state => ({ ...state, theme }));
    },

    setReady: (ready: boolean) => {
      update(state => ({ ...state, appReady: ready }));
    },

    reset: () => {
      set({
        locale: 'en',
        theme: 'light',
        appReady: false,
      });
    },
  };
}

export const appStore = createAppStore();
