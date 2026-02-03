<script lang="ts">
  /**
   * Section Component
   *
   * Provides consistent section spacing and optional title/text.
   * Uses design tokens for consistent styling.
   */

  import type { Snippet } from 'svelte';

  interface Props {
    title?: string;
    text?: string;
    id?: string;
    bgColor?: 'white' | 'gray' | 'slate';
    children: Snippet;
  }

  let {
    title,
    text,
    id,
    bgColor = 'white',
    children,
  }: Props = $props();

  const bgClasses: Record<string, string> = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    slate: 'bg-slate-50',
  };
</script>

<section {id} class="py-12 {bgClasses[bgColor]}">
  <div class="max-w-6xl mx-auto px-6">
    {#if title || text}
      <div class="text-center mb-10">
        {#if title}
          <h2 class="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        {/if}
        {#if text}
          <p class="text-gray-600 max-w-2xl mx-auto">{text}</p>
        {/if}
      </div>
    {/if}
    {@render children()}
  </div>
</section>
