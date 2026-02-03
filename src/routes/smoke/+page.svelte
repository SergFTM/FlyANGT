<script lang="ts">
  /**
   * Smoke Test Runner Page
   *
   * Dev-only tool for manual smoke testing of all routes.
   */

  import { browser } from '$app/environment';
  import { appStore } from '$lib/stores/app.store';
  import { smokeStore } from '$lib/stores/smoke.store';
  import { Container, Section, Card, Button } from '$lib/components/ui';
  import {
    getResult,
    calculateSummary,
    type SmokeState,
  } from '$lib/models/smoke.model';
  import type { SmokeTest, SmokeResultStatus } from '$config/smoke.config';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });

  // Store state
  let smokeState = $state<SmokeState>({ results: {}, lastUpdated: null });

  // Subscribe to store
  $effect(() => {
    if (browser) {
      const unsubscribe = smokeStore.subscribe(state => {
        smokeState = state;
      });
      return unsubscribe;
    }
  });

  // Calculate overall summary
  const overallSummary = $derived(
    data.enabled ? calculateSummary(data.tests, smokeState) : null
  );

  // Expanded groups state
  let expandedGroups = $state<Record<string, boolean>>({});

  // Initialize all groups as expanded
  $effect(() => {
    if (data.enabled && data.groups) {
      const initial: Record<string, boolean> = {};
      data.groups.forEach((g: { id: string }) => {
        initial[g.id] = true;
      });
      expandedGroups = initial;
    }
  });

  /**
   * Toggle group expanded state
   */
  function toggleGroup(groupId: string) {
    expandedGroups = {
      ...expandedGroups,
      [groupId]: !expandedGroups[groupId],
    };
  }

  /**
   * Get tests for a group
   */
  function getGroupTests(groupId: string): SmokeTest[] {
    return data.tests.filter((t: SmokeTest) => t.groupId === groupId);
  }

  /**
   * Get group summary
   */
  function getGroupSummary(groupId: string) {
    const tests = getGroupTests(groupId);
    return calculateSummary(tests, smokeState);
  }

  /**
   * Get status badge class
   */
  function getStatusClass(status: SmokeResultStatus): string {
    switch (status) {
      case 'pass':
        return 'bg-green-100 text-green-800';
      case 'fail':
        return 'bg-red-100 text-red-800';
      case 'skip':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  /**
   * Get status label
   */
  function getStatusLabel(status: SmokeResultStatus): string {
    return data.labels.status[status] ?? status;
  }

  /**
   * Handle status change
   */
  function handleSetStatus(testId: string, status: SmokeResultStatus) {
    smokeStore.setStatus(testId, status);
  }

  /**
   * Handle notes change
   */
  function handleNotesChange(testId: string, event: Event) {
    const target = event.target as HTMLTextAreaElement;
    smokeStore.setNotes(testId, target.value);
  }

  /**
   * Handle reset single test
   */
  function handleResetTest(testId: string) {
    smokeStore.resetTest(testId);
  }

  /**
   * Handle reset all
   */
  function handleResetAll() {
    if (confirm('Reset all smoke test results?')) {
      smokeStore.resetAll();
    }
  }

  /**
   * Handle export
   */
  function handleExport() {
    smokeStore.exportJson(data.locale);
  }

  /**
   * Get test URL
   */
  function getTestUrl(test: SmokeTest): string {
    const path = test.samplePath ?? test.path;
    const langParam = data.locale !== 'en' ? `?lang=${data.locale}` : '';
    return `${path}${langParam}`;
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
          <p class="text-gray-600">{data.labels.devOnly}</p>
        </div>
      </Card>
    {:else}
      <!-- Summary Bar -->
      {#if overallSummary}
        <Card class="mb-6">
          <div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex flex-wrap gap-6">
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-900">{overallSummary.total}</div>
                  <div class="text-xs text-gray-500">{data.labels.summary.total}</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-600">{overallSummary.passed}</div>
                  <div class="text-xs text-gray-500">{data.labels.summary.passed}</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-red-600">{overallSummary.failed}</div>
                  <div class="text-xs text-gray-500">{data.labels.summary.failed}</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-yellow-600">{overallSummary.skipped}</div>
                  <div class="text-xs text-gray-500">{data.labels.summary.skipped}</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-400">{overallSummary.untested}</div>
                  <div class="text-xs text-gray-500">{data.labels.summary.untested}</div>
                </div>
                {#if overallSummary.passed + overallSummary.failed > 0}
                  <div class="text-center border-l border-gray-300 pl-6">
                    <div class="text-2xl font-bold text-indigo-600">{overallSummary.passRate}%</div>
                    <div class="text-xs text-gray-500">Pass Rate</div>
                  </div>
                {/if}
              </div>

              <div class="flex gap-2">
                <Button variant="secondary" size="sm" onclick={handleResetAll}>
                  {data.labels.resetAll}
                </Button>
                <Button variant="primary" size="sm" onclick={handleExport}>
                  <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {data.labels.export}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      {/if}

      <!-- Groups -->
      <div class="space-y-4">
        {#each data.groups as group (group.id)}
          {@const groupTests = getGroupTests(group.id)}
          {@const groupSummary = getGroupSummary(group.id)}
          {#if groupTests.length > 0}
            <Card>
              <!-- Group Header -->
              <button
                type="button"
                class="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                onclick={() => toggleGroup(group.id)}
              >
                <div class="flex items-center gap-3">
                  <svg
                    class="w-5 h-5 text-gray-400 transition-transform {expandedGroups[group.id] ? 'rotate-90' : ''}"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <h2 class="text-lg font-semibold text-gray-900">{group.title}</h2>
                  <span class="text-sm text-gray-500">({groupTests.length})</span>
                </div>

                <div class="flex items-center gap-4 text-sm">
                  {#if groupSummary.passed > 0}
                    <span class="text-green-600">{groupSummary.passed} passed</span>
                  {/if}
                  {#if groupSummary.failed > 0}
                    <span class="text-red-600">{groupSummary.failed} failed</span>
                  {/if}
                  {#if groupSummary.skipped > 0}
                    <span class="text-yellow-600">{groupSummary.skipped} skipped</span>
                  {/if}
                </div>
              </button>

              <!-- Group Tests -->
              {#if expandedGroups[group.id]}
                <div class="border-t border-gray-100">
                  {#each groupTests as test (test.id)}
                    {@const result = getResult(smokeState, test.id)}
                    <div class="p-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50">
                      <div class="flex items-start justify-between gap-4">
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center gap-2 mb-1">
                            <span class="font-mono text-sm text-gray-900 truncate">
                              {test.samplePath ?? test.path}
                            </span>
                            {#if test.isDynamic}
                              <span class="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded">dynamic</span>
                            {/if}
                          </div>
                          <div class="flex items-center gap-2">
                            <span class="text-xs px-2 py-0.5 rounded-full {getStatusClass(result.status)}">
                              {getStatusLabel(result.status)}
                            </span>
                            {#if result.testedAt}
                              <span class="text-xs text-gray-400">
                                {new Date(result.testedAt).toLocaleString()}
                              </span>
                            {/if}
                          </div>
                        </div>

                        <div class="flex items-center gap-2">
                          <a
                            href={getTestUrl(test)}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            {data.labels.openRoute}
                          </a>
                        </div>
                      </div>

                      <!-- Actions Row -->
                      <div class="mt-3 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          class="px-3 py-1 text-sm rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors {result.status === 'pass' ? 'ring-2 ring-green-500' : ''}"
                          onclick={() => handleSetStatus(test.id, 'pass')}
                        >
                          {data.labels.markPass}
                        </button>
                        <button
                          type="button"
                          class="px-3 py-1 text-sm rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors {result.status === 'fail' ? 'ring-2 ring-red-500' : ''}"
                          onclick={() => handleSetStatus(test.id, 'fail')}
                        >
                          {data.labels.markFail}
                        </button>
                        <button
                          type="button"
                          class="px-3 py-1 text-sm rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors {result.status === 'skip' ? 'ring-2 ring-yellow-500' : ''}"
                          onclick={() => handleSetStatus(test.id, 'skip')}
                        >
                          {data.labels.markSkip}
                        </button>
                        {#if result.status !== 'untested'}
                          <button
                            type="button"
                            class="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                            onclick={() => handleResetTest(test.id)}
                          >
                            {data.labels.reset}
                          </button>
                        {/if}
                      </div>

                      <!-- Notes -->
                      <div class="mt-3">
                        <textarea
                          class="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows="2"
                          placeholder={data.labels.notesPlaceholder}
                          value={result.notes}
                          onchange={(e) => handleNotesChange(test.id, e)}
                        ></textarea>
                      </div>
                    </div>
                  {/each}
                </div>
              {/if}
            </Card>
          {/if}
        {/each}
      </div>

      <!-- Dev Notice -->
      <div class="mt-8 text-center text-sm text-gray-500">
        <p>{data.labels.devOnly}</p>
      </div>
    {/if}
  </Container>
</Section>
