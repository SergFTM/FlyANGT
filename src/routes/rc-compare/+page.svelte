<script lang="ts">
  /**
   * RC Compare Page
   *
   * Dev-only tool for comparing Release Candidates.
   */

  import { browser } from '$app/environment';
  import { appStore } from '$lib/stores/app.store';
  import { Container, Section, Card, Button } from '$lib/components/ui';
  import { formatRcDate, type RcRecord } from '$lib/models/rc.model';
  import { loadRcRecords, findRcById } from '$lib/rc/rcStorage';
  import { getByDotPath } from '$lib/rc/path';
  import { diffValues, summarizeAllGroups, formatValuePreview, type DiffGroupReport, type DiffKind } from '$lib/rc/diff';
  import { buildDiffExport, downloadDiffJson, copyDiffJson, makeDiffExportFilename } from '$lib/rc/export';
  import type { RcCompareGroupId, RcCompareGroup } from '$config/rc-compare.config';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });

  // RC Records state
  let records = $state<RcRecord[]>([]);

  // Selected RC ids
  let aId = $state<string>('');
  let bId = $state<string>('');

  // UI state - initialize showOnlyChanged based on config (default: true = show only changed)
  let showOnlyChanged = $state(true);
  let copied = $state(false);

  // Initialize showOnlyChanged from config on mount
  $effect(() => {
    if (data.rcCompareConfig?.ui) {
      showOnlyChanged = !data.rcCompareConfig.ui.showUnchangedGroups;
    }
  });

  // Load records on mount
  $effect(() => {
    if (browser && data.enabled && data.rcConfig) {
      records = loadRcRecords(data.rcConfig);
      // Default selection: most recent as A, second most recent as B
      if (records.length >= 2) {
        aId = records[0].id;
        bId = records[1].id;
      } else if (records.length === 1) {
        aId = records[0].id;
        bId = '';
      }
    }
  });

  // Get RC record A
  const rcA = $derived(aId ? findRcById(records, aId) : undefined);

  // Get RC record B
  const rcB = $derived(bId ? findRcById(records, bId) : undefined);

  // Compute diff reports
  const diffReports = $derived.by(() => {
    if (!rcA || !rcB || !data.rcCompareConfig) {
      return [];
    }

    const reports: DiffGroupReport[] = [];
    const enabledGroups = data.rcCompareConfig.groups.filter((g: RcCompareGroup) => g.enabled);

    for (const group of enabledGroups) {
      const aValue = getByDotPath(rcA, group.aPath);
      const bValue = getByDotPath(rcB, group.bPath);
      const report = diffValues(group.id, aValue, bValue, data.rcCompareConfig.ui.maxDiffItemsPerGroup);
      reports.push(report);
    }

    return reports;
  });

  // Compute summary
  const summary = $derived(summarizeAllGroups(diffReports));

  // Filter reports based on showOnlyChanged
  const visibleReports = $derived(
    showOnlyChanged ? diffReports.filter(r => r.changed) : diffReports
  );

  /**
   * Swap A and B
   */
  function handleSwap() {
    const temp = aId;
    aId = bId;
    bId = temp;
  }

  /**
   * Export diff report
   */
  function handleExport() {
    if (!rcA || !rcB) return;

    const exportData = buildDiffExport(data.locale, aId, bId, summary, diffReports);
    const filename = makeDiffExportFilename(data.rcCompareConfig.exportFilePrefix, aId, bId);
    downloadDiffJson(filename, exportData);
  }

  /**
   * Copy diff report
   */
  async function handleCopy() {
    if (!rcA || !rcB) return;

    const exportData = buildDiffExport(data.locale, aId, bId, summary, diffReports);
    await copyDiffJson(exportData);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2000);
  }

  /**
   * Get diff kind badge class
   */
  function getDiffKindClass(kind: DiffKind): string {
    switch (kind) {
      case 'added':
        return 'bg-green-100 text-green-800';
      case 'removed':
        return 'bg-red-100 text-red-800';
      case 'changed':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  /**
   * Get diff kind label
   */
  function getDiffKindLabel(kind: DiffKind): string {
    switch (kind) {
      case 'added':
        return data.labels.diffAdded;
      case 'removed':
        return data.labels.diffRemoved;
      case 'changed':
        return data.labels.diffChanged;
      default:
        return kind;
    }
  }

  /**
   * Get group title
   */
  function getGroupTitle(groupId: string): string {
    return data.labels.groupTitles[groupId as RcCompareGroupId] ?? groupId;
  }

  /**
   * Format RC option label
   */
  function formatRcOption(rc: RcRecord): string {
    return `${rc.id} (${formatRcDate(rc.createdAt)})`;
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
        {#if data.enabled && rcA && rcB}
          <div class="flex gap-2">
            <Button variant="primary" onclick={handleExport}>
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {data.labels.export}
            </Button>
            <Button variant="secondary" onclick={handleCopy}>
              {copied ? data.labels.copyDone : data.labels.copy}
            </Button>
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
    {:else if records.length < 2}
      <!-- Not enough RCs -->
      <Card>
        <div class="p-8 text-center">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="font-medium text-gray-600">{data.labels.emptyTitle}</p>
          <p class="text-sm text-gray-500 mt-1">{data.labels.emptyText}</p>
          <div class="mt-4">
            <a href="/rc">
              <Button variant="secondary">Go to RC Manager</Button>
            </a>
          </div>
        </div>
      </Card>
    {:else}
      <!-- Selection Controls -->
      <Card>
        <div class="p-4">
          <div class="flex flex-wrap items-end gap-4">
            <!-- Select A -->
            <div class="flex-1 min-w-[200px]">
              <label for="rc-a" class="block text-sm font-medium text-gray-700 mb-1">
                {data.labels.selectA}
              </label>
              <select
                id="rc-a"
                bind:value={aId}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">--</option>
                {#each records as rc (rc.id)}
                  <option value={rc.id} disabled={rc.id === bId}>
                    {formatRcOption(rc)}
                  </option>
                {/each}
              </select>
            </div>

            <!-- Swap Button -->
            <div>
              <Button variant="secondary" onclick={handleSwap} disabled={!aId || !bId}>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span class="ml-1.5">{data.labels.swap}</span>
              </Button>
            </div>

            <!-- Select B -->
            <div class="flex-1 min-w-[200px]">
              <label for="rc-b" class="block text-sm font-medium text-gray-700 mb-1">
                {data.labels.selectB}
              </label>
              <select
                id="rc-b"
                bind:value={bId}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">--</option>
                {#each records as rc (rc.id)}
                  <option value={rc.id} disabled={rc.id === aId}>
                    {formatRcOption(rc)}
                  </option>
                {/each}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {#if rcA && rcB}
        <!-- Summary -->
        <div class="mt-6">
          <Card>
            <div class="p-4 border-b border-gray-100">
              <h2 class="text-lg font-semibold text-gray-900">{data.labels.summaryTitle}</h2>
            </div>
            <div class="p-4">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="p-4 bg-gray-50 rounded-lg text-center">
                  <div class="text-2xl font-bold text-gray-900">{summary.changedGroups}</div>
                  <div class="text-sm text-gray-600">{data.labels.changedGroups}</div>
                </div>
                <div class="p-4 bg-gray-50 rounded-lg text-center">
                  <div class="text-2xl font-bold text-gray-900">{summary.totalChanges}</div>
                  <div class="text-sm text-gray-600">{data.labels.totalChanges}</div>
                </div>
                <div class="p-4 bg-green-50 rounded-lg text-center">
                  <div class="text-2xl font-bold text-green-700">{summary.countsOverall.added}</div>
                  <div class="text-sm text-green-600">{data.labels.diffAdded}</div>
                </div>
                <div class="p-4 bg-red-50 rounded-lg text-center">
                  <div class="text-2xl font-bold text-red-700">{summary.countsOverall.removed}</div>
                  <div class="text-sm text-red-600">{data.labels.diffRemoved}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- Toggle View -->
        <div class="mt-6 flex justify-end">
          <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={showOnlyChanged}
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            {showOnlyChanged ? data.labels.showOnlyChanged : data.labels.showAll}
          </label>
        </div>

        <!-- Group Reports -->
        <div class="mt-4 space-y-4">
          {#each visibleReports as report (report.groupId)}
            <Card>
              <div class="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 class="font-semibold text-gray-900">{getGroupTitle(report.groupId)}</h3>
                <div class="flex items-center gap-2">
                  {#if report.changed}
                    <span class="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                      {report.counts.total} changes
                    </span>
                  {:else}
                    <span class="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                      No changes
                    </span>
                  {/if}
                </div>
              </div>

              {#if report.changed}
                <div class="p-4">
                  <!-- Counts -->
                  <div class="flex gap-4 mb-4 text-sm">
                    {#if report.counts.added > 0}
                      <span class="text-green-600">+{report.counts.added} {data.labels.diffAdded.toLowerCase()}</span>
                    {/if}
                    {#if report.counts.removed > 0}
                      <span class="text-red-600">-{report.counts.removed} {data.labels.diffRemoved.toLowerCase()}</span>
                    {/if}
                    {#if report.counts.changed > 0}
                      <span class="text-yellow-600">~{report.counts.changed} {data.labels.diffChanged.toLowerCase()}</span>
                    {/if}
                  </div>

                  <!-- Items -->
                  <div class="space-y-2">
                    {#each report.items as item (item.path)}
                      <div class="p-3 bg-gray-50 rounded-lg">
                        <div class="flex items-start gap-3">
                          <span class="flex-shrink-0 text-xs px-1.5 py-0.5 rounded {getDiffKindClass(item.kind)}">
                            {getDiffKindLabel(item.kind)}
                          </span>
                          <div class="flex-1 min-w-0">
                            <div class="font-mono text-sm text-gray-900 break-all">
                              {item.path || '(root)'}
                            </div>
                            <div class="mt-1 text-xs text-gray-500">
                              {#if item.kind === 'added'}
                                <span class="text-green-600">{formatValuePreview(item.b)}</span>
                              {:else if item.kind === 'removed'}
                                <span class="text-red-600 line-through">{formatValuePreview(item.a)}</span>
                              {:else}
                                <span class="text-red-600 line-through">{formatValuePreview(item.a)}</span>
                                <span class="mx-1">-></span>
                                <span class="text-green-600">{formatValuePreview(item.b)}</span>
                              {/if}
                            </div>
                          </div>
                        </div>
                      </div>
                    {/each}
                    {#if report.truncated}
                      <div class="p-3 text-center text-sm text-gray-500">
                        ... and {report.counts.total - report.items.length} more items
                      </div>
                    {/if}
                  </div>
                </div>
              {:else}
                <div class="p-4 text-center text-gray-500 text-sm">
                  No differences in this group
                </div>
              {/if}
            </Card>
          {/each}

          {#if visibleReports.length === 0 && showOnlyChanged}
            <Card>
              <div class="p-8 text-center">
                <svg class="w-12 h-12 mx-auto text-green-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="font-medium text-gray-600">No changes detected</p>
                <p class="text-sm text-gray-500 mt-1">The selected RCs have identical artifacts</p>
              </div>
            </Card>
          {/if}
        </div>
      {/if}

      <!-- Dev Notice -->
      <div class="mt-8 text-center text-sm text-gray-500">
        <p>{data.labels.devOnly}</p>
      </div>
    {/if}
  </Container>
</Section>
