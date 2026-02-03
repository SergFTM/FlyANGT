<script lang="ts">
  /**
   * I18n Audit Page
   *
   * Dev-only tool for viewing translation coverage.
   * Shows missing keys per locale and module breakdown.
   */

  let { data } = $props();

  let searchQuery = $state('');
  let selectedLocale = $state<'en' | 'ru' | 'all'>('all');

  // Filter missing keys by search query
  const filteredMissingKeys = $derived(() => {
    let keys: { key: string; locale: string }[] = [];

    // Collect missing keys from all locales
    for (const locale of data.locales) {
      for (const key of locale.missingKeys) {
        keys.push({ key, locale: locale.locale });
      }
    }

    // Filter by locale
    if (selectedLocale !== 'all') {
      keys = keys.filter(k => k.locale === selectedLocale);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      keys = keys.filter(k => k.key.toLowerCase().includes(query));
    }

    return keys;
  });
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 py-8 px-4">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">I18n Audit</h1>
      <p class="text-gray-600">Dev tool for auditing translation coverage. Not available in production.</p>
    </div>

    <!-- Coverage Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-sm font-medium text-gray-500 mb-1">Total Registered Keys</h3>
        <p class="text-3xl font-bold text-gray-900">{data.totalKeys}</p>
      </div>

      {#each data.locales as locale}
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500 mb-1">{locale.locale.toUpperCase()} Coverage</h3>
          <div class="flex items-baseline gap-2">
            <p class="text-3xl font-bold {locale.coverage === 100 ? 'text-green-600' : 'text-amber-600'}">
              {locale.coverage}%
            </p>
            <span class="text-sm text-gray-500">
              ({locale.totalTranslated}/{locale.totalRegistered})
            </span>
          </div>
          {#if locale.missing > 0}
            <p class="text-sm text-red-600 mt-1">{locale.missing} missing keys</p>
          {:else}
            <p class="text-sm text-green-600 mt-1">All keys translated</p>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Module Breakdown -->
    <div class="bg-white rounded-lg shadow mb-8">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">Module Breakdown</h2>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {#each data.modules as mod}
            <div class="bg-gray-50 rounded-lg p-4 text-center">
              <p class="text-sm font-medium text-gray-600 mb-1">{mod.id}</p>
              <p class="text-xl font-bold text-gray-900">{mod.keyCount}</p>
              <p class="text-xs text-gray-500">keys</p>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Missing Keys Section -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Missing Keys</h2>

        <!-- Filters -->
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search keys..."
              bind:value={searchQuery}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              bind:value={selectedLocale}
              class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Locales</option>
              <option value="en">English (EN)</option>
              <option value="ru">Russian (RU)</option>
            </select>
          </div>
        </div>
      </div>

      <div class="p-6">
        {#if filteredMissingKeys().length === 0}
          <div class="text-center py-8 text-gray-500">
            {#if searchQuery}
              No missing keys match your search.
            {:else}
              No missing keys found. All translations are complete!
            {/if}
          </div>
        {:else}
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="py-3 px-4 text-sm font-semibold text-gray-600">Key</th>
                  <th class="py-3 px-4 text-sm font-semibold text-gray-600">Locale</th>
                </tr>
              </thead>
              <tbody>
                {#each filteredMissingKeys() as item, i}
                  <tr class="border-b border-gray-100 {i % 2 === 0 ? 'bg-gray-50' : ''}">
                    <td class="py-3 px-4 font-mono text-sm text-red-600">{item.key}</td>
                    <td class="py-3 px-4">
                      <span class="px-2 py-1 text-xs font-medium rounded-full {item.locale === 'en' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}">
                        {item.locale.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
          <p class="mt-4 text-sm text-gray-500">
            Showing {filteredMissingKeys().length} missing key(s)
          </p>
        {/if}
      </div>
    </div>

    <!-- Runtime Missing Keys -->
    {#if data.runtimeMissing.length > 0}
      <div class="bg-white rounded-lg shadow mt-8">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Runtime Missing Keys</h2>
          <p class="text-sm text-gray-500">Keys that were requested but not found during this session</p>
        </div>
        <div class="p-6">
          <ul class="space-y-2">
            {#each data.runtimeMissing as item}
              <li class="flex items-center gap-2">
                <span class="font-mono text-sm text-red-600">{item.key}</span>
                <span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                  {item.locale}
                </span>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    {/if}

    <!-- Footer Note -->
    <div class="mt-8 text-center text-sm text-gray-500">
      <p>This page is only available in development mode.</p>
      <p class="mt-1">Production builds will return a 404 for this route.</p>
    </div>
  </div>
</div>
