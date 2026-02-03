<script lang="ts">
  /**
   * Language Switcher Component
   *
   * Allows users to switch between EN/RU.
   * Updates URL with ?lang= parameter.
   */

  import { appStore } from '$lib/stores/app.store';
  import { locales, type Locale } from '$config/i18n.config';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let currentLocale: Locale = $state('en');
  let currentUrl: URL | null = $state(null);

  appStore.subscribe(state => {
    currentLocale = state.locale;
  });

  page.subscribe(p => {
    currentUrl = p.url;
  });

  function handleLocaleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    const newLocale = target.value as Locale;

    appStore.setLocale(newLocale);

    // Update URL with new lang parameter
    if (currentUrl) {
      const newUrl = new URL(currentUrl);
      if (newLocale === 'en') {
        newUrl.searchParams.delete('lang');
      } else {
        newUrl.searchParams.set('lang', newLocale);
      }
      goto(newUrl.pathname + newUrl.search, { replaceState: true });
    }
  }
</script>

<select
  value={currentLocale}
  onchange={handleLocaleChange}
  class="px-3 py-2 border border-gray-300 rounded bg-white text-gray-900 font-medium cursor-pointer"
>
  {#each locales as locale (locale.code)}
    <option value={locale.code}>{locale.nativeName}</option>
  {/each}
</select>
