<script lang="ts">
  /**
   * Release Checklist Page
   *
   * Dev-only tool for tracking release readiness.
   */

  import { appStore } from '$lib/stores/app.store';
  import { releaseStore } from '$lib/stores/release.store';
  import {
    ReleaseHeader,
    ReleaseFilters,
    ReleaseModuleCard,
    ReleaseCheckRow,
  } from '$lib/components/release';
  import { computeModuleProgress, computeOverallProgress } from '$lib/models/release.model';
  import { releaseConfig, type ReleaseStatus, type ReleasePriority } from '$config/release.config';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });

  // Filter state
  let selectedStatus = $state<ReleaseStatus | 'all'>('all');
  let selectedPriority = $state<ReleasePriority | 'all'>('all');
  let selectedModule = $state<string>('all');
  let searchQuery = $state('');

  // Expanded state for modules
  let expandedModules = $state<Set<string>>(new Set());

  // Initialize expanded modules from data
  $effect(() => {
    expandedModules = new Set(data.modules.map(m => m.id));
  });

  // Release state from store
  let releaseState = $state<Record<string, { status: ReleaseStatus; notes: string; updatedAt: string }>>({});

  releaseStore.subscribe(state => {
    releaseState = state;
  });

  // Compute overall progress
  const overallProgress = $derived(computeOverallProgress(releaseConfig, releaseState));

  // Filter modules and checks
  const filteredModules = $derived(() => {
    return data.modules
      .filter(mod => selectedModule === 'all' || mod.id === selectedModule)
      .map(mod => {
        const filteredChecks = mod.checks.filter(check => {
          const itemState = releaseState[check.id];

          // Status filter
          if (selectedStatus !== 'all' && itemState?.status !== selectedStatus) {
            return false;
          }

          // Priority filter
          if (selectedPriority !== 'all' && check.priority !== selectedPriority) {
            return false;
          }

          // Search filter
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchTitle = check.title.toLowerCase().includes(query);
            const matchId = check.id.toLowerCase().includes(query);
            const matchNotes = itemState?.notes?.toLowerCase().includes(query);
            if (!matchTitle && !matchId && !matchNotes) {
              return false;
            }
          }

          return true;
        });

        return {
          ...mod,
          checks: filteredChecks,
          progress: computeModuleProgress(
            releaseConfig.modules.find(m => m.id === mod.id)!,
            releaseState
          ),
        };
      })
      .filter(mod => mod.checks.length > 0);
  });

  // Status options for check rows (without "all")
  const checkStatusOptions = $derived(
    data.statusOptions
      .filter(opt => opt.value !== 'all')
      .map(opt => ({ value: opt.value as ReleaseStatus, label: opt.label }))
  );

  // Handlers
  function handleStatusChange(checkId: string, status: ReleaseStatus) {
    releaseStore.setStatus(checkId, status);
  }

  function handleNotesChange(checkId: string, notes: string) {
    releaseStore.setNotes(checkId, notes);
  }

  function handleModuleToggle(moduleId: string) {
    const newSet = new Set(expandedModules);
    if (newSet.has(moduleId)) {
      newSet.delete(moduleId);
    } else {
      newSet.add(moduleId);
    }
    expandedModules = newSet;
  }

  function handleExpandAll() {
    expandedModules = new Set(data.modules.map(m => m.id));
  }

  function handleCollapseAll() {
    expandedModules = new Set();
  }

  function handleReset() {
    if (confirm('Reset all checklist items to default? This cannot be undone.')) {
      releaseStore.resetAll();
    }
  }

  function handleExport() {
    releaseStore.exportJson();
  }
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 py-8 px-4">
  <div class="max-w-5xl mx-auto">
    <!-- Header -->
    <ReleaseHeader
      title={data.title}
      subtitle={data.subtitle}
      progress={overallProgress}
      progressLabel={data.labels.progress}
    />

    <!-- Filters -->
    <ReleaseFilters
      {selectedStatus}
      {selectedPriority}
      {selectedModule}
      {searchQuery}
      statusOptions={data.statusOptions}
      priorityOptions={data.priorityOptions}
      moduleOptions={data.moduleOptions}
      statusLabel={data.labels.status}
      priorityLabel={data.labels.priority}
      moduleLabel={data.labels.module}
      searchPlaceholder={data.labels.search}
      onStatusChange={(v) => selectedStatus = v}
      onPriorityChange={(v) => selectedPriority = v}
      onModuleChange={(v) => selectedModule = v}
      onSearchChange={(v) => searchQuery = v}
    />

    <!-- Actions -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        type="button"
        onclick={handleExpandAll}
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        {data.labels.expandAll}
      </button>
      <button
        type="button"
        onclick={handleCollapseAll}
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        {data.labels.collapseAll}
      </button>
      <button
        type="button"
        onclick={handleExport}
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {data.labels.export}
      </button>
      <button
        type="button"
        onclick={handleReset}
        class="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
      >
        {data.labels.reset}
      </button>
    </div>

    <!-- Modules List -->
    {#if filteredModules().length === 0}
      <div class="bg-white rounded-lg shadow p-8 text-center">
        <h3 class="text-lg font-medium text-gray-900 mb-2">{data.labels.emptyTitle}</h3>
        <p class="text-gray-600">{data.labels.emptyText}</p>
      </div>
    {:else}
      <div class="space-y-4">
        {#each filteredModules() as mod (mod.id)}
          <ReleaseModuleCard
            id={mod.id}
            title={mod.title}
            progress={mod.progress}
            expanded={expandedModules.has(mod.id)}
            onToggle={handleModuleToggle}
          >
            {#each mod.checks as check (check.id)}
              <ReleaseCheckRow
                id={check.id}
                title={check.title}
                text={check.text}
                priority={check.priority}
                status={releaseState[check.id]?.status ?? check.statusDefault}
                notes={releaseState[check.id]?.notes ?? ''}
                updatedAt={releaseState[check.id]?.updatedAt ?? new Date().toISOString()}
                statusOptions={checkStatusOptions}
                priorityLabels={data.priorityLabels}
                notesPlaceholder={data.labels.notesPlaceholder}
                onStatusChange={handleStatusChange}
                onNotesChange={handleNotesChange}
              />
            {/each}
          </ReleaseModuleCard>
        {/each}
      </div>
    {/if}

    <!-- Footer Note -->
    <div class="mt-8 text-center text-sm text-gray-500">
      <p>This page is only available in development mode.</p>
      <p class="mt-1">Production builds will return a 404 for this route.</p>
    </div>
  </div>
</div>
