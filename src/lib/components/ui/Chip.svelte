<script lang="ts">
  /**
   * Chip/Tag Component
   *
   * Reusable chip for filters and tags.
   * Uses design tokens for consistent styling.
   */

  interface Props {
    text: string;
    selected?: boolean;
    clickable?: boolean;
    onclick?: () => void;
  }

  let {
    text,
    selected = false,
    clickable = false,
    onclick,
  }: Props = $props();
</script>

{#if clickable}
  <button
    type="button"
    onclick={onclick}
    class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors
      {selected
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
  >
    {text}
  </button>
{:else}
  <span
    class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
      {selected
        ? 'bg-blue-100 text-blue-800'
        : 'bg-gray-100 text-gray-700'}"
  >
    {text}
  </span>
{/if}
