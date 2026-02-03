<script lang="ts">
  /**
   * Trust Category Chips Component
   *
   * Horizontal chip row for quick category filtering.
   */

  import type { TrustDocCategory } from '$config/trust.config';

  interface CategoryChip {
    id: TrustDocCategory | 'all';
    label: string;
  }

  interface Props {
    categories: CategoryChip[];
    selectedCategory: TrustDocCategory | 'all';
    onSelect: (category: TrustDocCategory | 'all') => void;
  }

  let { categories, selectedCategory, onSelect }: Props = $props();
</script>

<div class="flex flex-wrap gap-2">
  {#each categories as cat (cat.id)}
    <button
      type="button"
      onclick={() => onSelect(cat.id)}
      class="px-4 py-2 rounded-full text-sm font-medium transition-colors
        {selectedCategory === cat.id
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
    >
      {cat.label}
    </button>
  {/each}
</div>
