<script lang="ts">
  /**
   * Export Center Page
   *
   * Dev-only tool for downloading configuration artifacts.
   */

  import { browser } from '$app/environment';
  import { appStore } from '$lib/stores/app.store';
  import { Container, Section, Card, Button } from '$lib/components/ui';
  import {
    buildSnapshot,
    buildReleaseState,
    buildI18nReport,
    buildSmokeLinks,
    buildBundle,
    loadReleaseStateFromStorage,
    generateFilename,
    type SmokeLink,
  } from '$lib/export/builders';
  import type { ExportArtifactId } from '$config/export.config';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });

  // Copy feedback state per artifact
  let copiedState = $state<Record<string, boolean>>({});

  // Artifact preview data
  let previews = $state<Record<string, { count: number; detail: string }>>({});

  // Smoke links for display
  let smokeLinks = $state<SmokeLink[]>([]);

  // Initialize client-side data
  $effect(() => {
    if (browser && data.enabled) {
      loadPreviews();
    }
  });

  /**
   * Load preview data for each artifact
   */
  function loadPreviews() {
    const baseUrl = window.location.origin;

    // Snapshot preview
    const snapshot = buildSnapshot() as { configs: Record<string, unknown> };
    previews.snapshot = {
      count: Object.keys(snapshot.configs).length,
      detail: 'configs',
    };

    // Release preview
    const storedState = loadReleaseStateFromStorage();
    const release = buildReleaseState(storedState) as { overallProgress: { pct: number } };
    previews.release = {
      count: release.overallProgress.pct,
      detail: '% complete',
    };

    // I18n preview
    const i18n = buildI18nReport() as { locales: { en: { missing: number }; ru: { missing: number } } };
    const enMissing = i18n.locales.en?.missing ?? 0;
    const ruMissing = i18n.locales.ru?.missing ?? 0;
    previews.i18n = {
      count: enMissing + ruMissing,
      detail: 'missing keys',
    };

    // Smoke preview
    const smoke = buildSmokeLinks(data.locale, baseUrl) as { links: SmokeLink[]; filteredCount: number };
    smokeLinks = smoke.links;
    previews.smoke = {
      count: smoke.filteredCount,
      detail: 'links',
    };

    // Bundle preview
    previews.bundle = {
      count: 4,
      detail: 'artifacts',
    };
  }

  /**
   * Build artifact data
   */
  function getArtifactData(id: ExportArtifactId): object {
    const baseUrl = browser ? window.location.origin : '';
    const storedState = loadReleaseStateFromStorage();

    switch (id) {
      case 'snapshot':
        return buildSnapshot();
      case 'release':
        return buildReleaseState(storedState);
      case 'i18n':
        return buildI18nReport();
      case 'smoke':
        return buildSmokeLinks(data.locale, baseUrl);
      case 'bundle':
        return buildBundle(data.locale, storedState, baseUrl);
      default:
        return {};
    }
  }

  /**
   * Get file prefix for artifact
   */
  function getFilePrefix(id: ExportArtifactId): string {
    const artifact = data.artifacts.find((a: { id: ExportArtifactId }) => a.id === id);
    return artifact?.filePrefix ?? `flyangt-${id}`;
  }

  /**
   * Download artifact as JSON file
   */
  function handleDownload(id: ExportArtifactId) {
    const artifactData = getArtifactData(id);
    const json = JSON.stringify(artifactData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = generateFilename(getFilePrefix(id));
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Copy artifact to clipboard
   */
  async function handleCopy(id: ExportArtifactId) {
    const artifactData = getArtifactData(id);
    const json = JSON.stringify(artifactData, null, 2);
    await navigator.clipboard.writeText(json);

    copiedState = { ...copiedState, [id]: true };
    setTimeout(() => {
      copiedState = { ...copiedState, [id]: false };
    }, 2000);
  }

  /**
   * Open all smoke links in new tabs
   */
  function handleOpenAll() {
    const maxToOpen = Math.min(smokeLinks.length, data.smokeConfig.maxLinks);
    for (let i = 0; i < maxToOpen; i++) {
      window.open(smokeLinks[i].url, '_blank');
    }
  }
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<Section padding="lg">
  <Container size="lg">
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
          <p class="text-gray-600">Export center is disabled.</p>
        </div>
      </Card>
    {:else}
      <!-- Artifacts Grid -->
      <div class="grid gap-6 md:grid-cols-2">
        {#each data.artifacts.filter((a: { id: ExportArtifactId }) => a.id !== 'bundle') as artifact (artifact.id)}
          <Card>
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h2 class="text-lg font-semibold text-gray-900">{artifact.title}</h2>
                  <p class="text-sm text-gray-600 mt-1">{artifact.text}</p>
                </div>
                {#if previews[artifact.id]}
                  <div class="text-right">
                    <div class="text-2xl font-bold text-blue-600">{previews[artifact.id].count}</div>
                    <div class="text-xs text-gray-500">{previews[artifact.id].detail}</div>
                  </div>
                {/if}
              </div>

              <div class="flex gap-2">
                <Button variant="primary" size="sm" onclick={() => handleDownload(artifact.id)}>
                  <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {data.labels.download}
                </Button>
                <Button variant="secondary" size="sm" onclick={() => handleCopy(artifact.id)}>
                  {#if copiedState[artifact.id]}
                    <svg class="w-4 h-4 mr-1.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {data.labels.copyDone}
                  {:else}
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    {data.labels.copy}
                  {/if}
                </Button>
              </div>
            </div>
          </Card>
        {/each}
      </div>

      <!-- Bundle Section -->
      {#each data.artifacts.filter((a: { id: ExportArtifactId }) => a.id === 'bundle') as artifact (artifact.id)}
        <Card class="mt-6">
          <div class="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h2 class="text-lg font-semibold text-gray-900">{artifact.title}</h2>
                <p class="text-sm text-gray-600 mt-1">{artifact.text}</p>
              </div>
              {#if previews[artifact.id]}
                <div class="text-right">
                  <div class="text-2xl font-bold text-indigo-600">{previews[artifact.id].count}</div>
                  <div class="text-xs text-gray-500">{previews[artifact.id].detail}</div>
                </div>
              {/if}
            </div>

            <div class="flex gap-2">
              <Button variant="primary" onclick={() => handleDownload(artifact.id)}>
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {data.labels.download}
              </Button>
              <Button variant="secondary" onclick={() => handleCopy(artifact.id)}>
                {#if copiedState[artifact.id]}
                  <svg class="w-4 h-4 mr-1.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {data.labels.copyDone}
                {:else}
                  <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  {data.labels.copy}
                {/if}
              </Button>
            </div>
          </div>
        </Card>
      {/each}

      <!-- Smoke Links Section -->
      {#if smokeLinks.length > 0}
        <Card class="mt-6">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900">Smoke Test Links</h2>
              <Button variant="secondary" size="sm" onclick={handleOpenAll}>
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {data.labels.openAll}
              </Button>
            </div>

            <div class="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
              <ul class="divide-y divide-gray-100">
                {#each smokeLinks as link (link.id)}
                  <li class="px-4 py-2 hover:bg-gray-50">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-between text-sm"
                    >
                      <span class="font-medium text-gray-900">{link.path}</span>
                      <span class="text-gray-500 text-xs">{link.id}</span>
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </Card>
      {/if}
    {/if}

    <!-- Dev Notice -->
    <div class="mt-8 text-center text-sm text-gray-500">
      <p>{data.labels.devOnly}</p>
    </div>
  </Container>
</Section>
