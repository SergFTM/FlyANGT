<script lang="ts">
  /**
   * Admin Filters Component
   *
   * Filter controls for source, search, and limit.
   */

  import type { SubmissionSource } from '$lib/domain/types';

  interface SourceOption {
    id: SubmissionSource | '';
    label: string;
  }

  interface Props {
    sourceFilter: string;
    searchQuery: string;
    limit: number;
    sources: SourceOption[];
    limits: number[];
    sourceLabel: string;
    searchLabel: string;
    limitLabel: string;
    allSourcesLabel?: string;
    onSourceChange: (source: string) => void;
    onSearchChange: (query: string) => void;
    onLimitChange: (limit: number) => void;
  }

  let {
    sourceFilter,
    searchQuery,
    limit,
    sources,
    limits,
    sourceLabel,
    searchLabel,
    limitLabel,
    allSourcesLabel = 'All',
    onSourceChange,
    onSearchChange,
    onLimitChange,
  }: Props = $props();

  function handleSourceChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    onSourceChange(target.value);
  }

  function handleSearchInput(e: Event) {
    const target = e.target as HTMLInputElement;
    onSearchChange(target.value);
  }

  function handleLimitChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    onLimitChange(parseInt(target.value, 10));
  }
</script>

<div class="flex flex-wrap gap-3 items-end">
  <!-- Source filter -->
  <div class="flex flex-col gap-1">
    <label for="admin-source" class="text-xs text-gray-500 font-medium">{sourceLabel}</label>
    <select
      id="admin-source"
      value={sourceFilter}
      onchange={handleSourceChange}
      class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">{allSourcesLabel}</option>
      {#each sources as source}
        <option value={source.id}>{source.label}</option>
      {/each}
    </select>
  </div>

  <!-- Search input -->
  <div class="flex flex-col gap-1 flex-1 min-w-[200px]">
    <label for="admin-search" class="text-xs text-gray-500 font-medium">{searchLabel}</label>
    <input
      id="admin-search"
      type="text"
      value={searchQuery}
      oninput={handleSearchInput}
      placeholder="ID, email, name..."
      class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  <!-- Limit select -->
  <div class="flex flex-col gap-1">
    <label for="admin-limit" class="text-xs text-gray-500 font-medium">{limitLabel}</label>
    <select
      id="admin-limit"
      value={limit}
      onchange={handleLimitChange}
      class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      {#each limits as l}
        <option value={l}>{l}</option>
      {/each}
    </select>
  </div>
</div>
