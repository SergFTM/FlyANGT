<script lang="ts">
  /**
   * Container Component
   *
   * Wraps content with max-width and padding.
   * Uses design tokens for consistent styling.
   */

  import type { Snippet } from 'svelte';

  interface Props {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    children: Snippet;
  }

  let {
    size = 'lg',
    children,
  }: Props = $props();

  const sizeClasses: Record<string, string> = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
  };
</script>

<div class="{sizeClasses[size]} mx-auto px-4 sm:px-6">
  {@render children()}
</div>
