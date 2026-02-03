<script lang="ts">
  /**
   * Snapshot Page
   *
   * Dev-only tool for exporting configuration snapshot.
   * Allows downloading or copying JSON snapshot.
   */

  import { appStore } from '$lib/stores/app.store';
  import { Container, Section, Card, Button } from '$lib/components/ui';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });

  // Copy feedback state
  let copied = $state(false);

  /**
   * Generate export filename with timestamp
   */
  function generateFilename(): string {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');

    return `${data.exportFilePrefix}-${yyyy}${mm}${dd}-${hh}${min}.json`;
  }

  /**
   * Download snapshot as JSON file
   */
  function handleDownload() {
    if (!data.snapshot) return;

    const json = JSON.stringify(data.snapshot, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = generateFilename();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Copy snapshot to clipboard
   */
  async function handleCopy() {
    if (!data.snapshot) return;

    const json = JSON.stringify(data.snapshot, null, 2);
    await navigator.clipboard.writeText(json);
    copied = true;

    setTimeout(() => {
      copied = false;
    }, 2000);
  }

  /**
   * Format date for display
   */
  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<Section padding="lg">
  <Container size="md">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">{data.title}</h1>
      <p class="text-gray-600">{data.subtitle}</p>
    </div>

    {#if !data.enabled}
      <!-- Disabled State -->
      <Card>
        <div class="p-8 text-center">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <p class="text-gray-600">{data.disabledMessage}</p>
        </div>
      </Card>
    {:else}
      <!-- Summary Card -->
      <Card>
        <div class="p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Snapshot Summary</h2>

          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-sm text-gray-500">{data.labels.mode}</div>
              <div class="text-lg font-medium text-gray-900 capitalize">{data.snapshot.prelaunch.mode}</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-sm text-gray-500">{data.labels.configs}</div>
              <div class="text-lg font-medium text-gray-900">{data.configCount}</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-sm text-gray-500">{data.labels.pages}</div>
              <div class="text-lg font-medium text-gray-900">{data.pageCount}</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="text-sm text-gray-500">{data.labels.generated}</div>
              <div class="text-lg font-medium text-gray-900">{formatDate(data.snapshot.generatedAt)}</div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-wrap gap-3">
            <Button variant="primary" onclick={handleDownload}>
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {data.labels.download}
            </Button>
            <Button variant="secondary" onclick={handleCopy}>
              {#if copied}
                <svg class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {data.labels.copied}
              {:else}
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                {data.labels.copy}
              {/if}
            </Button>
          </div>
        </div>
      </Card>

      <!-- Config Details -->
      <Card class="mt-6">
        <div class="p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Included Configs</h2>

          <div class="space-y-3">
            {#each Object.entries(data.snapshot.configs) as [name, info]}
              <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span class="font-medium text-gray-700">{name}</span>
                <span class="text-sm text-gray-500">
                  {#if 'count' in info}
                    {info.count} items
                  {:else if 'ids' in info}
                    {info.ids.length} items
                  {:else if 'modulesCount' in info}
                    {info.modulesCount} modules, {info.totalChecks} checks
                  {:else if 'groupsCount' in info}
                    {info.groupsCount} groups, {info.optionsCount} options
                  {:else if 'categoriesCount' in info}
                    {info.categoriesCount} categories, {info.documentsCount} docs
                  {:else if 'tiersCount' in info}
                    {info.tiersCount} tiers
                  {:else if 'stepsCount' in info}
                    {info.stepsCount} steps
                  {:else if 'phasesCount' in info}
                    {info.phasesCount} phases
                  {:else if 'weeksCount' in info}
                    {info.weeksCount} weeks
                  {:else if 'sectionsCount' in info}
                    {info.sectionsCount} sections
                  {:else if 'enabledModules' in info}
                    {info.enabledModules.length} enabled
                  {:else}
                    -
                  {/if}
                </span>
              </div>
            {/each}
          </div>
        </div>
      </Card>
    {/if}

    <!-- Dev Notice -->
    <div class="mt-8 text-center text-sm text-gray-500">
      <p>{data.labels.devOnly}</p>
    </div>
  </Container>
</Section>
