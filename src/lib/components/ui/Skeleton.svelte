<script lang="ts">
  /**
   * Skeleton Component
   *
   * Loading placeholder with animated lines.
   * Uses design tokens for consistent styling.
   */

  interface Props {
    lines?: number;
    height?: 'sm' | 'md';
  }

  let {
    lines = 3,
    height = 'md',
  }: Props = $props();

  const heightClasses: Record<string, string> = {
    sm: 'h-3',
    md: 'h-4',
  };

  // Generate width variations for natural look
  const widths = ['w-full', 'w-11/12', 'w-4/5', 'w-3/4', 'w-5/6'];
</script>

<div class="animate-pulse space-y-3">
  {#each Array(lines) as _, i}
    <div
      class="bg-gray-200 rounded {heightClasses[height]} {widths[i % widths.length]}"
    ></div>
  {/each}
</div>

<style>
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>
