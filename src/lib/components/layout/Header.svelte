<script lang="ts">
  /**
   * Header Component
   *
   * Application header with navigation and branding.
   */

  import { appConfig } from '$config/app.config';
  import { appStore } from '$lib/stores/app.store';
  import type { Locale } from '$config/i18n.config';
  import Navigation from '../navigation/Navigation.svelte';
  import LanguageSwitcher from '../navigation/LanguageSwitcher.svelte';

  let currentLocale: Locale = $state('en');

  appStore.subscribe(state => {
    currentLocale = state.locale;
  });

  function getLangParam(): string {
    return currentLocale !== 'en' ? `?lang=${currentLocale}` : '';
  }
</script>

<header class="bg-white border-b border-gray-200 py-4 px-6">
  <div class="max-w-7xl mx-auto flex justify-between items-center">
    <a href="/{getLangParam()}" class="text-2xl font-bold text-blue-600">{appConfig.appName}</a>
    <div class="flex items-center gap-6">
      <Navigation />
      <LanguageSwitcher />
    </div>
  </div>
</header>
