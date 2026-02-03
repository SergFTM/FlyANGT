<script lang="ts">
  /**
   * Footer Component
   *
   * Footer with navigation and disclaimer.
   * Uses i18n for translations.
   * Includes dev-only role switch.
   */

  import { appConfig } from '$config/app.config';
  import { t, type Locale, type TranslationKey } from '$config/i18n.config';
  import { appStore } from '$lib/stores/app.store';
  import RoleSwitch from '$lib/components/dev/RoleSwitch.svelte';

  let currentLocale: Locale = $state('en');

  appStore.subscribe(state => {
    currentLocale = state.locale;
  });

  const currentYear = new Date().getFullYear();

  function getLangParam(): string {
    return currentLocale !== 'en' ? `?lang=${currentLocale}` : '';
  }

  function label(key: TranslationKey): string {
    return t(key, currentLocale);
  }
</script>

<footer class="bg-gray-900 text-white py-12 px-4">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <div>
        <h4 class="font-bold mb-4">{appConfig.appName}</h4>
        <p class="text-gray-400 text-sm">{appConfig.description}</p>
      </div>
      <div>
        <h5 class="font-semibold mb-3">{label('nav.platform')}</h5>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="/ecosystem{getLangParam()}" class="hover:text-white">{label('nav.ecosystem')}</a></li>
          <li><a href="/platform{getLangParam()}" class="hover:text-white">{label('nav.platform')}</a></li>
          <li><a href="/token{getLangParam()}" class="hover:text-white">{label('nav.token')}</a></li>
        </ul>
      </div>
      <div>
        <h5 class="font-semibold mb-3">{label('nav.partners')}</h5>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="/partners{getLangParam()}" class="hover:text-white">{label('nav.partners')}</a></li>
          <li><a href="/investors{getLangParam()}" class="hover:text-white">{label('nav.investors')}</a></li>
          <li><a href="/customers{getLangParam()}" class="hover:text-white">{label('nav.customers')}</a></li>
        </ul>
      </div>
      <div>
        <h5 class="font-semibold mb-3">Fintechme</h5>
        <p class="text-gray-400 text-sm">fintechme.pro</p>
      </div>
    </div>
    <div class="border-t border-gray-800 pt-8">
      <p class="text-gray-400 text-sm mb-4">{label('footer.disclaimer')}</p>
      <div class="flex justify-between items-center">
        <p class="text-gray-500 text-sm">&copy; {currentYear} {appConfig.appName}</p>
        <!-- Dev-only role switch -->
        <RoleSwitch label={label('common.role')} />
      </div>
    </div>
  </div>
</footer>
