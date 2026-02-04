<script lang="ts">
  /**
   * Release Notes Pack Page
   *
   * Dev-only tool for generating complete release documentation.
   */

  import { browser } from '$app/environment';
  import { appStore } from '$lib/stores/app.store';
  import { Container, Section, Card, Button } from '$lib/components/ui';
  import { formatRcDate, type RcRecord } from '$lib/models/rc.model';
  import { loadRcRecords, findRcById } from '$lib/rc/rcStorage';
  import {
    buildDiffReports,
    buildChangelogDocs,
    buildReleaseNotesDoc,
  } from '$lib/releaseNotes/builders';
  import {
    renderReleaseNotesMd,
    getReleaseNotesStrings,
  } from '$lib/releaseNotes/markdown';
  import { knownIssuesStore } from '$lib/releaseNotes/knownIssues.store';
  import {
    newIssue,
    type KnownIssue,
    type KnownIssueSeverity,
  } from '$lib/releaseNotes/knownIssues.model';
  import type { ReleaseNotesLanguage, ReleaseNotesDoc } from '$lib/releaseNotes/types';

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
  let previewLang = $state<ReleaseNotesLanguage>('en');

  // Known issues
  let knownIssues = $state<KnownIssue[]>([]);

  // UI state
  let copiedLang = $state<ReleaseNotesLanguage | null>(null);
  let editingIssueId = $state<string | null>(null);
  let showAddIssue = $state(false);
  let newIssueData = $state<KnownIssue>(newIssue());

  // Subscribe to known issues store
  $effect(() => {
    if (browser) {
      const unsubscribe = knownIssuesStore.subscribe(state => {
        knownIssues = state.issues;
      });
      return unsubscribe;
    }
  });

  // Load records on mount
  $effect(() => {
    if (browser && data.enabled && data.rcConfig) {
      records = loadRcRecords(data.rcConfig);
      // Default selection: oldest as A (from), newest as B (to)
      if (records.length >= 2) {
        aId = records[1].id;
        bId = records[0].id;
      } else if (records.length === 1) {
        aId = records[0].id;
        bId = '';
      }
    }
  });

  // Get RC records
  const rcA = $derived(aId ? findRcById(records, aId) : undefined);
  const rcB = $derived(bId ? findRcById(records, bId) : undefined);

  // Compute diff reports
  const diffReports = $derived.by(() => {
    if (!rcA || !rcB || !data.rcCompareConfig) return [];
    return buildDiffReports(rcA, rcB, data.rcCompareConfig);
  });

  // Build changelog docs
  const changelogDocs = $derived.by(() => {
    if (!rcA || !rcB || !data.changelogConfig) {
      return { enDoc: null, ruDoc: null, enMd: '', ruMd: '' };
    }
    return buildChangelogDocs(
      aId,
      bId,
      diffReports,
      data.changelogConfig,
      data.changelogGroupTitles
    );
  });

  // Build release notes docs
  const releaseNotesEnDoc = $derived.by(() => {
    if (!rcA || !rcB || !data.releaseNotesConfig) return null;
    return buildReleaseNotesDoc(
      aId,
      bId,
      'en',
      diffReports,
      changelogDocs.enMd,
      knownIssues,
      data.releaseNotesConfig,
      data.changelogGroupTitles,
      data.linkLabels,
      data.labels.mostChanges,
      data.labels.nextStepsPlaceholder
    );
  });

  const releaseNotesRuDoc = $derived.by(() => {
    if (!rcA || !rcB || !data.releaseNotesConfig) return null;
    return buildReleaseNotesDoc(
      aId,
      bId,
      'ru',
      diffReports,
      changelogDocs.ruMd,
      knownIssues,
      data.releaseNotesConfig,
      data.changelogGroupTitles,
      data.linkLabels,
      data.labels.mostChanges,
      data.labels.nextStepsPlaceholder
    );
  });

  // Current doc based on preview language
  const currentDoc = $derived(previewLang === 'ru' ? releaseNotesRuDoc : releaseNotesEnDoc);

  // Render markdown
  const markdownEn = $derived.by(() => {
    if (!releaseNotesEnDoc) return '';
    const strings = getReleaseNotesStrings('en');
    return renderReleaseNotesMd(
      releaseNotesEnDoc,
      strings,
      data.releaseNotesConfig?.formatting.maxKnownIssuesInMd ?? 10
    );
  });

  const markdownRu = $derived.by(() => {
    if (!releaseNotesRuDoc) return '';
    const strings = getReleaseNotesStrings('ru');
    return renderReleaseNotesMd(
      releaseNotesRuDoc,
      strings,
      data.releaseNotesConfig?.formatting.maxKnownIssuesInMd ?? 10
    );
  });

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
    if (!currentMarkdown || !data.releaseNotesConfig) return;
    const filename = `${data.releaseNotesConfig.exportFilePrefix}-${aId}-${bId}-${previewLang}-${makeTimestamp()}.md`;
    downloadText(filename, currentMarkdown, 'text/markdown');
  }

  /**
   * Export JSON
   */
  function handleExportJson() {
    if (!currentDoc || !data.releaseNotesConfig) return;
    const filename = `${data.releaseNotesConfig.exportFilePrefix}-${aId}-${bId}-${previewLang}-${makeTimestamp()}.json`;
    const json = JSON.stringify(currentDoc, null, 2);
    downloadText(filename, json, 'application/json');
  }

  /**
   * Copy EN markdown
   */
  async function handleCopyEn() {
    if (!markdownEn) return;
    await navigator.clipboard.writeText(markdownEn);
    copiedLang = 'en';
    setTimeout(() => { copiedLang = null; }, 2000);
  }

  /**
   * Copy RU markdown
   */
  async function handleCopyRu() {
    if (!markdownRu) return;
    await navigator.clipboard.writeText(markdownRu);
    copiedLang = 'ru';
    setTimeout(() => { copiedLang = null; }, 2000);
  }

  /**
   * Make timestamp for filename
   */
  function makeTimestamp(): string {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    return `${yyyy}${mm}${dd}-${hh}${min}`;
  }

  /**
   * Download text as file
   */
  function downloadText(filename: string, content: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Format RC option label
   */
  function formatRcOption(rc: RcRecord): string {
    return `${rc.id} (${formatRcDate(rc.createdAt)})`;
  }

  /**
   * Add new issue
   */
  function handleAddIssue() {
    if (newIssueData.title.trim()) {
      knownIssuesStore.addIssue(newIssueData);
      newIssueData = newIssue();
      showAddIssue = false;
    }
  }

  /**
   * Cancel add issue
   */
  function handleCancelAdd() {
    newIssueData = newIssue();
    showAddIssue = false;
  }

  /**
   * Start editing issue
   */
  function handleEditIssue(issue: KnownIssue) {
    editingIssueId = issue.id;
  }

  /**
   * Save edited issue
   */
  function handleSaveIssue(issue: KnownIssue) {
    knownIssuesStore.updateIssue(issue);
    editingIssueId = null;
  }

  /**
   * Cancel edit
   */
  function handleCancelEdit() {
    editingIssueId = null;
  }

  /**
   * Delete issue
   */
  function handleDeleteIssue(id: string) {
    knownIssuesStore.deleteIssue(id);
    if (editingIssueId === id) {
      editingIssueId = null;
    }
  }

  /**
   * Get severity badge class
   */
  function getSeverityClass(severity: KnownIssueSeverity): string {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
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
          <p class="font-medium text-gray-600">Select Two RCs</p>
          <p class="text-sm text-gray-500 mt-1">Create at least two release candidates to generate release notes.</p>
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

      {#if rcA && rcB}
        <!-- Known Issues Editor -->
        <div class="mt-6">
          <Card>
            <div class="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">{data.labels.sections.knownIssues}</h2>
              {#if !showAddIssue}
                <Button variant="secondary" size="sm" onclick={() => showAddIssue = true}>
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  {data.labels.knownIssues.add}
                </Button>
              {/if}
            </div>
            <div class="p-4">
              <!-- Add Issue Form -->
              {#if showAddIssue}
                <div class="p-4 bg-blue-50 rounded-lg mb-4">
                  <div class="space-y-3">
                    <input
                      type="text"
                      bind:value={newIssueData.title}
                      placeholder="Issue title..."
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <div class="flex gap-3">
                      <div class="flex-1">
                        <label class="block text-xs text-gray-600 mb-1">{data.labels.knownIssues.severityLabel}</label>
                        <select
                          bind:value={newIssueData.severity}
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="low">{data.labels.knownIssues.severity.low}</option>
                          <option value="medium">{data.labels.knownIssues.severity.medium}</option>
                          <option value="high">{data.labels.knownIssues.severity.high}</option>
                        </select>
                      </div>
                      <div class="flex-1">
                        <label class="block text-xs text-gray-600 mb-1">{data.labels.knownIssues.ownerLabel}</label>
                        <input
                          type="text"
                          bind:value={newIssueData.owner}
                          placeholder="Owner..."
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <textarea
                      bind:value={newIssueData.notes}
                      placeholder={data.labels.knownIssues.notesPlaceholder}
                      rows="2"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <div class="flex gap-2">
                      <Button variant="primary" size="sm" onclick={handleAddIssue}>
                        {data.labels.knownIssues.add}
                      </Button>
                      <Button variant="secondary" size="sm" onclick={handleCancelAdd}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              {/if}

              <!-- Issues List -->
              {#if knownIssues.length === 0}
                <p class="text-center text-gray-500 py-4">{data.labels.knownIssues.empty}</p>
              {:else}
                <div class="space-y-2">
                  {#each knownIssues as issue (issue.id)}
                    {#if editingIssueId === issue.id}
                      <!-- Editing -->
                      <div class="p-3 bg-gray-50 rounded-lg">
                        <div class="space-y-2">
                          <input
                            type="text"
                            bind:value={issue.title}
                            class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <div class="flex gap-2">
                            <select
                              bind:value={issue.severity}
                              class="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="low">{data.labels.knownIssues.severity.low}</option>
                              <option value="medium">{data.labels.knownIssues.severity.medium}</option>
                              <option value="high">{data.labels.knownIssues.severity.high}</option>
                            </select>
                            <input
                              type="text"
                              bind:value={issue.owner}
                              placeholder="Owner"
                              class="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <textarea
                            bind:value={issue.notes}
                            rows="2"
                            class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          ></textarea>
                          <div class="flex gap-2">
                            <button
                              type="button"
                              class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                              onclick={() => handleSaveIssue(issue)}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                              onclick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    {:else}
                      <!-- Display -->
                      <div class="p-3 bg-gray-50 rounded-lg flex items-start justify-between gap-3">
                        <div class="flex-1">
                          <div class="flex items-center gap-2">
                            <span class="text-xs px-1.5 py-0.5 rounded {getSeverityClass(issue.severity)}">
                              {data.labels.knownIssues.severity[issue.severity]}
                            </span>
                            <span class="font-medium text-gray-900">{issue.title}</span>
                            {#if issue.owner}
                              <span class="text-sm text-gray-500">({issue.owner})</span>
                            {/if}
                          </div>
                          {#if issue.notes}
                            <p class="text-sm text-gray-600 mt-1">{issue.notes}</p>
                          {/if}
                        </div>
                        <div class="flex gap-1">
                          <button
                            type="button"
                            class="p-1 text-gray-400 hover:text-blue-600 rounded"
                            onclick={() => handleEditIssue(issue)}
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            class="p-1 text-gray-400 hover:text-red-600 rounded"
                            onclick={() => handleDeleteIssue(issue.id)}
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    {/if}
                  {/each}
                </div>
              {/if}
            </div>
          </Card>
        </div>

        <!-- Preview -->
        <div class="mt-6">
          <Card>
            <div class="p-4 border-b border-gray-100">
              <h2 class="text-lg font-semibold text-gray-900">
                Markdown Preview ({previewLang.toUpperCase()})
              </h2>
            </div>
            <div class="p-4">
              <pre class="p-4 bg-gray-50 rounded-lg overflow-auto max-h-[600px] text-sm whitespace-pre-wrap text-gray-800">{currentMarkdown}</pre>
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
