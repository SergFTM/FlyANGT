<script lang="ts">
  /**
   * Navigation Menu Component
   *
   * Main navigation menu generated from config.
   */

  import { getPublicRoutes, type RouteConfig } from '$config/routes.config';
  import { isModuleNavVisible } from '$config/modules.config';
  import { t, type Locale, type TranslationKey } from '$config/i18n.config';
  import { appStore } from '$lib/stores/app.store';
  import { page } from '$app/stores';

  let currentLocale: Locale = $state('en');
  let currentPath: string = $state('/');

  appStore.subscribe(state => {
    currentLocale = state.locale;
  });

  page.subscribe(p => {
    currentPath = p.url.pathname;
  });

  // Filter routes: only public and nav-visible modules
  const navRoutes: RouteConfig[] = getPublicRoutes().filter(r =>
    isModuleNavVisible(r.moduleId)
  );

  function getLabel(route: RouteConfig): string {
    return t(route.titleKey as TranslationKey, currentLocale);
  }

  function getLangParam(): string {
    return currentLocale !== 'en' ? `?lang=${currentLocale}` : '';
  }
</script>

<nav class="flex gap-4 flex-wrap">
  {#each navRoutes as route (route.id)}
    <a
      href="{route.path}{getLangParam()}"
      class="px-3 py-2 rounded hover:bg-gray-100 transition font-medium {currentPath === route.path
        ? 'text-blue-600 bg-blue-50'
        : 'text-gray-700'}"
    >
      {getLabel(route)}
    </a>
  {/each}
</nav>
