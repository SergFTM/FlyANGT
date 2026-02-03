<script lang="ts">
  /**
   * Release Filters Component
   *
   * Filter controls for status, priority, module, and search.
   * Dumb component: accepts props only.
   */

  import type { ReleaseStatus, ReleasePriority } from '$config/release.config';

  interface StatusOption {
    value: ReleaseStatus | 'all';
    label: string;
  }

  interface PriorityOption {
    value: ReleasePriority | 'all';
    label: string;
  }

  interface ModuleOption {
    value: string;
    label: string;
  }

  interface Props {
    statusOptions: StatusOption[];
    priorityOptions: PriorityOption[];
    moduleOptions: ModuleOption[];
    selectedStatus: ReleaseStatus | 'all';
    selectedPriority: ReleasePriority | 'all';
    selectedModule: string;
    searchQuery: string;
    statusLabel: string;
    priorityLabel: string;
    moduleLabel: string;
    searchPlaceholder: string;
    onStatusChange: (value: ReleaseStatus | 'all') => void;
    onPriorityChange: (value: ReleasePriority | 'all') => void;
    onModuleChange: (value: string) => void;
    onSearchChange: (value: string) => void;
  }

  let {
    statusOptions,
    priorityOptions,
    moduleOptions,
    selectedStatus,
    selectedPriority,
    selectedModule,
    searchQuery,
    statusLabel,
    priorityLabel,
    moduleLabel,
    searchPlaceholder,
    onStatusChange,
    onPriorityChange,
    onModuleChange,
    onSearchChange,
  }: Props = $props();

  function handleStatusChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    onStatusChange(target.value as ReleaseStatus | 'all');
  }

  function handlePriorityChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    onPriorityChange(target.value as ReleasePriority | 'all');
  }

  function handleModuleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    onModuleChange(target.value);
  }

  function handleSearchChange(e: Event) {
    const target = e.target as HTMLInputElement;
    onSearchChange(target.value);
  }
</script>

<div class="bg-white rounded-lg shadow p-4 mb-6">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Status Filter -->
    <div>
      <label for="release-filter-status" class="block text-sm font-medium text-gray-700 mb-1">{statusLabel}</label>
      <select
        id="release-filter-status"
        value={selectedStatus}
        onchange={handleStatusChange}
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {#each statusOptions as opt}
          <option value={opt.value}>{opt.label}</option>
        {/each}
      </select>
    </div>

    <!-- Priority Filter -->
    <div>
      <label for="release-filter-priority" class="block text-sm font-medium text-gray-700 mb-1">{priorityLabel}</label>
      <select
        id="release-filter-priority"
        value={selectedPriority}
        onchange={handlePriorityChange}
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {#each priorityOptions as opt}
          <option value={opt.value}>{opt.label}</option>
        {/each}
      </select>
    </div>

    <!-- Module Filter -->
    <div>
      <label for="release-filter-module" class="block text-sm font-medium text-gray-700 mb-1">{moduleLabel}</label>
      <select
        id="release-filter-module"
        value={selectedModule}
        onchange={handleModuleChange}
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {#each moduleOptions as opt}
          <option value={opt.value}>{opt.label}</option>
        {/each}
      </select>
    </div>

    <!-- Search -->
    <div>
      <label for="release-filter-search" class="block text-sm font-medium text-gray-700 mb-1">{searchPlaceholder}</label>
      <input
        id="release-filter-search"
        type="text"
        value={searchQuery}
        oninput={handleSearchChange}
        placeholder={searchPlaceholder}
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
</div>
