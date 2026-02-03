<script lang="ts">
  /**
   * Progress Bar Component
   *
   * Simple progress bar for displaying completion percentage.
   */

  interface Props {
    percent: number;
    showLabel?: boolean;
  }

  let { percent, showLabel = false }: Props = $props();

  const clampedPercent = $derived(Math.min(100, Math.max(0, percent)));
</script>

<div class="w-full">
  <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
    <div
      class="h-full bg-blue-600 rounded-full transition-all duration-300"
      style="width: {clampedPercent}%"
    ></div>
  </div>
  {#if showLabel}
    <span class="text-sm text-gray-500 mt-1 inline-block">{clampedPercent}%</span>
  {/if}
</div>
