<script lang="ts">
  /**
   * Trust Filters Component
   *
   * Category dropdown, type dropdown, and sort dropdown.
   */

  import type { TrustDocCategory, TrustDocType } from '$config/trust.config';

  interface CategoryOption {
    id: TrustDocCategory | 'all';
    label: string;
  }

  interface TypeOption {
    id: TrustDocType | 'all';
    label: string;
  }

  interface SortOption {
    id: 'newest' | 'oldest' | 'name';
    label: string;
  }

  interface Props {
    categoryLabel: string;
    typeLabel: string;
    categories: CategoryOption[];
    types: TypeOption[];
    sortOptions: SortOption[];
    selectedCategory: TrustDocCategory | 'all';
    selectedType: TrustDocType | 'all';
    selectedSort: 'newest' | 'oldest' | 'name';
    onCategoryChange: (category: TrustDocCategory | 'all') => void;
    onTypeChange: (type: TrustDocType | 'all') => void;
    onSortChange: (sort: 'newest' | 'oldest' | 'name') => void;
  }

  let {
    categoryLabel,
    typeLabel,
    categories,
    types,
    sortOptions,
    selectedCategory,
    selectedType,
    selectedSort,
    onCategoryChange,
    onTypeChange,
    onSortChange,
  }: Props = $props();

  function handleCategoryChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    onCategoryChange(target.value as TrustDocCategory | 'all');
  }

  function handleTypeChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    onTypeChange(target.value as TrustDocType | 'all');
  }

  function handleSortChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    onSortChange(target.value as 'newest' | 'oldest' | 'name');
  }
</script>

<div class="flex flex-wrap gap-4">
  <div class="flex items-center gap-2">
    <label for="category-filter" class="text-sm text-gray-600">{categoryLabel}:</label>
    <select
      id="category-filter"
      value={selectedCategory}
      onchange={handleCategoryChange}
      class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {#each categories as cat (cat.id)}
        <option value={cat.id}>{cat.label}</option>
      {/each}
    </select>
  </div>

  <div class="flex items-center gap-2">
    <label for="type-filter" class="text-sm text-gray-600">{typeLabel}:</label>
    <select
      id="type-filter"
      value={selectedType}
      onchange={handleTypeChange}
      class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {#each types as type (type.id)}
        <option value={type.id}>{type.label}</option>
      {/each}
    </select>
  </div>

  <div class="ml-auto">
    <select
      value={selectedSort}
      onchange={handleSortChange}
      class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {#each sortOptions as sort (sort.id)}
        <option value={sort.id}>{sort.label}</option>
      {/each}
    </select>
  </div>
</div>
