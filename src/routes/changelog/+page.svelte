<script lang="ts">
  /**
   * Changelog Generator Page
   *
   * Dev-only tool for generating release notes from RC diffs.
   */

  import { browser } from '$app/environment';
  import { appStore } from '$lib/stores/app.store';
  import { Container, Section, Card, Button } from '$lib/components/ui';
  import { formatRcDate, type RcRecord } from '$lib/models/rc.model';
  import { loadRcRecords, findRcById } from '$lib/rc/rcStorage';
  import { getByDotPath } from '$lib/rc/path';
  import { diffValues, type DiffGroupReport } from '$lib/rc/diff';
  import {
    buildChangelogDoc,
    getTemplates,
    type ChangelogDoc,
    type ChangelogLanguage,
  } from '$lib/changelog/formatter';
  import { renderChangelogMd, getMarkdownStrings } from '$lib/changelog/markdown';
  import {
    downloadChangelogMd,
    downloadChangelogJson,
    copyChangelogMd,
  } from '$lib/changelog/export';
  import type { RcCompareGroup } from '$config/rc-compare.config';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });

  // RC Records state
  let records = $state<RcRecord[]>([]);

  // Selected RC ids
  let aId = $state<string>('');
  let bId = $state<string>('');

  // Preview language
  let previewLang = $state<ChangelogLanguage>('en');

  // UI state
  let showJson = $state(false);
  let copiedLang = $state<ChangelogLanguage | null>(null);

  // Load records on mount
  $effect(() => {
    if (browser && data.enabled && data.rcConfig) {
      records = loadRcRecords(data.rcConfig);
      // Default selection: oldest as A (from), newest as B (to)
      if (records.length >= 2) {
        aId = records[1].id; // Second newest as "from"
        bId = records[0].id; // Newest as "to"
      } else if (records.length === 1) {
        aId = records[0].id;
        bId = '';
      }
    }
  });

  // Get RC record A (from)
  const rcA = $derived(aId ? findRcById(records, aId) : undefined);

  // Get RC record B (to)
  const rcB = $derived(bId ? findRcById(records, bId) : undefined);

  // Compute diff reports (reuse from rc-compare logic)
  const diffReports = $derived.by(() => {
    if (!rcA || !rcB || !data.rcCompareConfig) {
      return [];
    }

    const reports: DiffGroupReport[] = [];
    const enabledGroups = data.rcCompareConfig.groups.filter((g: RcCompareGroup) => g.enabled);

    for (const group of enabledGroups) {
      const aValue = getByDotPath(rcA, group.aPath);
      const bValue = getByDotPath(rcB, group.bPath);
      const report = diffValues(group.id, aValue, bValue, 100); // Higher limit for changelog
      reports.push(report);
    }

    return reports;
  });

  // Build changelog docs for both languages
  const changelogEn = $derived.by(() => {
    if (!rcA || !rcB || !data.changelogConfig) return null;
    return buildChangelogDoc(
      aId,
      bId,
      'en',
      diffReports,
      data.changelogConfig,
      data.labels.groupTitles
    );
  });

  const changelogRu = $derived.by(() => {
    if (!rcA || !rcB || !data.changelogConfig) return null;
    // Use Russian group titles
    const ruTitles: Record<string, string> = {};
    for (const group of data.changelogConfig.groups) {
      // Map to Russian titles (simplified - just use the EN titles for now
      // In production, you'd have separate RU titles)
      ruTitles[group.id] = data.labels.groupTitles[group.id] ?? group.id;
    }
    return buildChangelogDoc(
      aId,
      bId,
      'ru',
      diffReports,
      data.changelogConfig,
      ruTitles
    );
  });

  // Current changelog based on preview language
  const currentChangelog = $derived(previewLang === 'ru' ? changelogRu : changelogEn);

  // Rendered markdown
  const markdownEn = $derived.by(() => {
    if (!changelogEn) return '';
    const strings = getMarkdownStrings('en');
    return renderChangelogMd(changelogEn, strings, data.changelogConfig?.formatting.includeMetaHeader ?? true);
  });

  const markdownRu = $derived.by(() => {
    if (!changelogRu) return '';
    const strings = getMarkdownStrings('ru');
    return renderChangelogMd(changelogRu, strings, data.changelogConfig?.formatting.includeMetaHeader ?? true);
  });

  // Current markdown based on preview language
  const currentMarkdown = $derived(previewLang === 'ru' ? markdownRu : markdownEn);

  /**
   * Swap A and B
   */
  function handleSwap() {
    const temp = aId;
    aId = bId;
    bId = temp;
  }

  /**
   * Export markdown
   */
  function handleExportMd() {
    if (!currentMarkdown || !data.changelogConfig) return;
    downloadChangelogMd(
      data.changelogConfig.exportFilePrefix,
      aId,
      bId,
      previewLang,
      currentMarkdown
    );
  }

  /**
   * Export JSON
   */
  function handleExportJson() {
    if (!currentChangelog || !data.changelogConfig) return;
    downloadChangelogJson(
      data.changelogConfig.exportFilePrefix,
      aId,
      bId,
      previewLang,
      currentChangelog
    );
  }

  /**
   * Copy EN markdown
   */
  async function handleCopyEn() {
    if (!markdownEn) return;
    await copyChangelogMd(markdownEn);
    copiedLang = 'en';
    setTimeout(() => {
      copiedLang = null;
    }, 2000);
  }

  /**
   * Copy RU markdown
   */
  async function handleCopyRu() {
    if (!markdownRu) return;
    await copyChangelogMd(markdownRu);
    copiedLang = 'ru';
    setTimeout(() => {
      copiedLang = null;
    }, 2000);
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
          <div class="flex flex-wrap gap-2">
            <Button variant="primary" onclick={handleExportMd}>
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {data.labels.exportMd}
            </Button>
            <Button variant="secondary" onclick={handleExportJson}>
              {data.labels.exportJson}
            </Button>
            <Button variant="secondary" onclick={handleCopyEn}>
              {copiedLang === 'en' ? data.labels.copyDone : data.labels.copyEn}
            </Button>
            <Button variant="secondary" onclick={handleCopyRu}>
              {copiedLang === 'ru' ? data.labels.copyDone : data.labels.copyRu}
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
            <!-- Select A (from) -->
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

            <!-- Select B (to) -->
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

            <!-- Language Toggle -->
            <div class="min-w-[150px]">
              <label for="lang" class="block text-sm font-medium text-gray-700 mb-1">
                {data.labels.languageLabel}
              </label>
              <select
                id="lang"
                bind:value={previewLang}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="ru">Russian</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {#if rcA && rcB && currentChangelog}
        <!-- Summary -->
        <div class="mt-6">
          <Card>
            <div class="p-4 border-b border-gray-100">
              <h2 class="text-lg font-semibold text-gray-900">{data.labels.summaryTitle}</h2>
            </div>
            <div class="p-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-gray-50 rounded-lg text-center">
                  <div class="text-2xl font-bold text-gray-900">{currentChangelog.summary.changedGroups}</div>
                  <div class="text-sm text-gray-600">{data.labels.changedGroups}</div>
                </div>
                <div class="p-4 bg-gray-50 rounded-lg text-center">
                  <div class="text-2xl font-bold text-gray-900">{currentChangelog.summary.totalItems}</div>
                  <div class="text-sm text-gray-600">{data.labels.totalItems}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- View Toggle -->
        <div class="mt-6 flex justify-end">
          <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={showJson}
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            {data.labels.showJson}
          </label>
        </div>

        <!-- Preview -->
        <div class="mt-4">
          <Card>
            <div class="p-4 border-b border-gray-100">
              <h2 class="text-lg font-semibold text-gray-900">
                {showJson ? 'JSON' : 'Markdown'} Preview ({previewLang.toUpperCase()})
              </h2>
            </div>
            <div class="p-4">
              {#if showJson}
                <pre class="p-4 bg-gray-50 rounded-lg overflow-auto max-h-[600px] text-sm font-mono text-gray-800">{JSON.stringify(currentChangelog, null, 2)}</pre>
              {:else}
                <pre class="p-4 bg-gray-50 rounded-lg overflow-auto max-h-[600px] text-sm whitespace-pre-wrap text-gray-800">{currentMarkdown}</pre>
              {/if}
            </div>
          </Card>
        </div>
      {/if}

      <!-- Dev Notice -->
      <div class="mt-8 text-center text-sm text-gray-500">
        <p>{data.labels.devOnly}</p>
      </div>
    {/if}
  </Container>
</Section>
