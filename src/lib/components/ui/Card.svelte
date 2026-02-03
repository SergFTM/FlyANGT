<script lang="ts">
  /**
   * Card Component
   *
   * Reusable card container with optional title.
   * Uses design tokens for consistent styling.
   */

  import type { Snippet } from 'svelte';

  type CardPadding = 'sm' | 'md';

  interface Props {
    title?: string;
    padding?: CardPadding;
    hoverable?: boolean;
    children: Snippet;
  }

  let {
    title,
    padding = 'md',
    hoverable = false,
    children,
  }: Props = $props();

  const paddingClasses: Record<CardPadding, string> = {
    sm: 'p-4',
    md: 'p-6',
  };
</script>

<div
  class="bg-white rounded-lg border border-gray-200 {paddingClasses[padding]} {hoverable ? 'hover:shadow-md hover:border-gray-300 transition-all' : ''}"
  style="box-shadow: var(--sh-1);"
>
  {#if title}
    <h3 class="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
  {/if}
  {@render children()}
</div>
