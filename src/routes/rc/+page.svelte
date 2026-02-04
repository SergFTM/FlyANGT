<script lang="ts">
  /**
   * RC Manager Page
   *
   * Dev-only tool for managing Release Candidates.
   */

  import { browser } from '$app/environment';
  import { appStore } from '$lib/stores/app.store';
  import { rcStore } from '$lib/stores/rc.store';
  import { Container, Section, Card, Button } from '$lib/components/ui';
  import { formatRcDate, type RcRecord, type RcStatus } from '$lib/models/rc.model';
  import type { RcArtifactId } from '$config/rc.config';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });

  // Store state
  let records = $state<RcRecord[]>([]);
  let selectedId = $state<string | null>(null);

  // Subscribe to store
  $effect(() => {
    if (browser) {
      const unsubscribe = rcStore.subscribe(state => {
        records = state.records;
        selectedId = state.selectedId;
      });
      return unsubscribe;
    }
  });

  // UI state
  let viewingRcId = $state<string | null>(null);
  let confirmDeleteId = $state<string | null>(null);
  let copiedArtifact = $state<string | null>(null);

  // Get viewing RC record
  const viewingRc = $derived(
    viewingRcId ? records.find(r => r.id === viewingRcId) : null
  );

  /**
   * Create new RC
   */
  function handleCreate() {
    const rc = rcStore.createRc(data.locale);
    if (rc) {
      viewingRcId = rc.id;
    }
  }

  /**
   * Select RC
   */
  function handleSelect(id: string) {
    rcStore.selectRc(id);
  }

  /**
   * Unselect RC
   */
  function handleUnselect() {
    rcStore.clearSelection();
  }

  /**
   * View RC details
   */
  function handleView(id: string) {
    viewingRcId = id;
  }

  /**
   * Close details
   */
  function handleCloseDetails() {
    viewingRcId = null;
    confirmDeleteId = null;
  }

  /**
   * Initiate delete
   */
  function handleDeleteClick(id: string) {
    confirmDeleteId = id;
  }

  /**
   * Confirm delete
   */
  function handleConfirmDelete() {
    if (confirmDeleteId) {
      rcStore.deleteRc(confirmDeleteId);
      if (viewingRcId === confirmDeleteId) {
        viewingRcId = null;
      }
      confirmDeleteId = null;
    }
  }

  /**
   * Cancel delete
   */
  function handleCancelDelete() {
    confirmDeleteId = null;
  }

  /**
   * Download artifact
   */
  function handleDownload(rcId: string, artifactId: RcArtifactId) {
    rcStore.exportArtifact(rcId, artifactId);
  }

  /**
   * Copy artifact
   */
  async function handleCopy(rcId: string, artifactId: RcArtifactId) {
    const success = await rcStore.copyArtifact(rcId, artifactId);
    if (success) {
      copiedArtifact = `${rcId}-${artifactId}`;
      setTimeout(() => {
        copiedArtifact = null;
      }, 2000);
    }
  }

  /**
   * Get status badge class
   */
  function getStatusClass(status: RcStatus): string {
    switch (status) {
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  /**
   * Get status label
   */
  function getStatusLabel(status: RcStatus): string {
    return data.labels.status[status] ?? status;
  }

  /**
   * Get artifact label
   */
  function getArtifactLabel(artifactId: RcArtifactId): string {
    return data.labels.artifacts[artifactId] ?? artifactId;
  }

  /**
   * Get enabled artifact ids
   */
  function getEnabledArtifacts(): RcArtifactId[] {
    return data.rcConfig.artifacts
      .filter((a: { enabled: boolean }) => a.enabled)
      .map((a: { id: RcArtifactId }) => a.id);
  }
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<Section padding="lg">
  <Container size="lg">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-2">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{data.title}</h1>
          <p class="text-gray-600 mt-1">{data.subtitle}</p>
        </div>
        {#if data.enabled}
          <div class="flex gap-2">
            <Button variant="primary" onclick={handleCreate}>
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {data.labels.create}
            </Button>
            <a href={data.rcConfig.links.gatePath}>
              <Button variant="secondary" size="sm">{data.labels.openGate}</Button>
            </a>
            <a href={data.rcConfig.links.exportPath}>
              <Button variant="secondary" size="sm">{data.labels.openExport}</Button>
            </a>
          </div>
        {/if}
      </div>
    </div>

    {#if !data.enabled}
      <!-- Disabled State -->
      <Card>
        <div class="p-8 text-center">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <p class="text-gray-600">{data.labels.devOnly}</p>
        </div>
      </Card>
    {:else}
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- RC List -->
        <div>
          <Card>
            <div class="p-4 border-b border-gray-100">
              <h2 class="text-lg font-semibold text-gray-900">{data.labels.listTitle}</h2>
            </div>
            <div class="max-h-[600px] overflow-y-auto">
              {#if records.length === 0}
                <div class="p-8 text-center">
                  <svg class="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p class="font-medium text-gray-600">{data.labels.emptyTitle}</p>
                  <p class="text-sm text-gray-500 mt-1">{data.labels.emptyText}</p>
                </div>
              {:else}
                <ul class="divide-y divide-gray-100">
                  {#each records as rc (rc.id)}
                    <li class="p-4 hover:bg-gray-50 transition-colors {viewingRcId === rc.id ? 'bg-blue-50' : ''}">
                      <div class="flex items-start justify-between gap-3">
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center gap-2 mb-1">
                            <span class="font-mono font-medium text-gray-900">{rc.id}</span>
                            {#if selectedId === rc.id}
                              <span class="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">
                                {data.labels.fields.selected}
                              </span>
                            {/if}
                          </div>
                          <div class="flex items-center gap-3 text-sm text-gray-500">
                            <span>{formatRcDate(rc.createdAt)}</span>
                            <span class="px-2 py-0.5 rounded-full text-xs {getStatusClass(rc.status)}">
                              {getStatusLabel(rc.status)}
                            </span>
                          </div>
                        </div>
                        <div class="flex items-center gap-1">
                          <button
                            type="button"
                            class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="View"
                            onclick={() => handleView(rc.id)}
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          {#if selectedId === rc.id}
                            <button
                              type="button"
                              class="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                              title={data.labels.unselect}
                              onclick={handleUnselect}
                            >
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            </button>
                          {:else}
                            <button
                              type="button"
                              class="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
                              title={data.labels.select}
                              onclick={() => handleSelect(rc.id)}
                            >
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            </button>
                          {/if}
                        </div>
                      </div>
                    </li>
                  {/each}
                </ul>
              {/if}
            </div>
          </Card>
        </div>

        <!-- RC Detail Panel -->
        <div>
          {#if viewingRc}
            <Card>
              <div class="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900">{data.labels.detailTitle}</h2>
                <button
                  type="button"
                  class="p-1.5 text-gray-400 hover:text-gray-600 rounded transition-colors"
                  onclick={handleCloseDetails}
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="p-4 space-y-4">
                <!-- Metadata -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <div class="text-xs text-gray-500 uppercase tracking-wider">{data.labels.fields.id}</div>
                    <div class="font-mono font-medium text-gray-900">{viewingRc.id}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 uppercase tracking-wider">{data.labels.fields.status}</div>
                    <span class="inline-block px-2 py-0.5 rounded-full text-sm {getStatusClass(viewingRc.status)}">
                      {getStatusLabel(viewingRc.status)}
                    </span>
                  </div>
                  <div class="col-span-2">
                    <div class="text-xs text-gray-500 uppercase tracking-wider">{data.labels.fields.createdAt}</div>
                    <div class="text-gray-900">{formatRcDate(viewingRc.createdAt)}</div>
                  </div>
                </div>

                <!-- Summary -->
                {#if viewingRc.summary}
                  <div class="p-3 bg-gray-50 rounded-lg">
                    <div class="grid grid-cols-2 gap-2 text-sm">
                      {#if viewingRc.summary.releaseP0Open !== undefined}
                        <div class="flex justify-between">
                          <span class="text-gray-600">Release P0 Open:</span>
                          <span class="font-medium {viewingRc.summary.releaseP0Open > 0 ? 'text-yellow-600' : 'text-green-600'}">{viewingRc.summary.releaseP0Open}</span>
                        </div>
                      {/if}
                      {#if viewingRc.summary.releaseP0Blocked !== undefined}
                        <div class="flex justify-between">
                          <span class="text-gray-600">Release P0 Blocked:</span>
                          <span class="font-medium {viewingRc.summary.releaseP0Blocked > 0 ? 'text-red-600' : 'text-green-600'}">{viewingRc.summary.releaseP0Blocked}</span>
                        </div>
                      {/if}
                      {#if viewingRc.summary.smokeP0Open !== undefined}
                        <div class="flex justify-between">
                          <span class="text-gray-600">Smoke P0 Open:</span>
                          <span class="font-medium {viewingRc.summary.smokeP0Open > 0 ? 'text-yellow-600' : 'text-green-600'}">{viewingRc.summary.smokeP0Open}</span>
                        </div>
                      {/if}
                      {#if viewingRc.summary.smokeP0Fail !== undefined}
                        <div class="flex justify-between">
                          <span class="text-gray-600">Smoke P0 Failed:</span>
                          <span class="font-medium {viewingRc.summary.smokeP0Fail > 0 ? 'text-red-600' : 'text-green-600'}">{viewingRc.summary.smokeP0Fail}</span>
                        </div>
                      {/if}
                      {#if viewingRc.summary.i18nMissingEn !== undefined}
                        <div class="flex justify-between">
                          <span class="text-gray-600">i18n Missing (EN):</span>
                          <span class="font-medium">{viewingRc.summary.i18nMissingEn}</span>
                        </div>
                      {/if}
                      {#if viewingRc.summary.i18nMissingRu !== undefined}
                        <div class="flex justify-between">
                          <span class="text-gray-600">i18n Missing (RU):</span>
                          <span class="font-medium">{viewingRc.summary.i18nMissingRu}</span>
                        </div>
                      {/if}
                    </div>
                  </div>
                {/if}

                <!-- Artifacts -->
                <div>
                  <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Artifacts</div>
                  <div class="space-y-2">
                    {#each getEnabledArtifacts() as artifactId (artifactId)}
                      {#if viewingRc.artifacts[artifactId]}
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span class="font-medium text-gray-900">{getArtifactLabel(artifactId)}</span>
                          <div class="flex gap-2">
                            <button
                              type="button"
                              class="px-3 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                              onclick={() => handleDownload(viewingRc.id, artifactId)}
                            >
                              {data.labels.download}
                            </button>
                            <button
                              type="button"
                              class="px-3 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                              onclick={() => handleCopy(viewingRc.id, artifactId)}
                            >
                              {copiedArtifact === `${viewingRc.id}-${artifactId}` ? data.labels.copyDone : data.labels.copy}
                            </button>
                          </div>
                        </div>
                      {/if}
                    {/each}
                  </div>
                </div>

                <!-- Delete Section -->
                <div class="pt-4 border-t border-gray-100">
                  {#if confirmDeleteId === viewingRc.id}
                    <div class="p-3 bg-red-50 rounded-lg">
                      <p class="font-medium text-red-800 mb-1">{data.labels.confirmDelete.title}</p>
                      <p class="text-sm text-red-600 mb-3">{data.labels.confirmDelete.text}</p>
                      <div class="flex gap-2">
                        <button
                          type="button"
                          class="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          onclick={handleConfirmDelete}
                        >
                          {data.labels.delete}
                        </button>
                        <button
                          type="button"
                          class="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                          onclick={handleCancelDelete}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  {:else}
                    <button
                      type="button"
                      class="w-full px-3 py-2 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors"
                      onclick={() => handleDeleteClick(viewingRc.id)}
                    >
                      {data.labels.delete}
                    </button>
                  {/if}
                </div>
              </div>
            </Card>
          {:else}
            <Card>
              <div class="p-8 text-center">
                <svg class="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <p class="text-gray-500">Select an RC to view details</p>
              </div>
            </Card>
          {/if}
        </div>
      </div>

      <!-- Dev Notice -->
      <div class="mt-8 text-center text-sm text-gray-500">
        <p>{data.labels.devOnly}</p>
      </div>
    {/if}
  </Container>
</Section>
