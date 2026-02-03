<script lang="ts">
  /**
   * Release Progress Component
   *
   * Displays a progress bar with percentage.
   * Dumb component: accepts props only.
   */

  interface Props {
    done: number;
    total: number;
    pct: number;
    label?: string;
    size?: 'sm' | 'md';
  }

  let { done, total, pct, label, size = 'md' }: Props = $props();

  const heightClass = $derived(size === 'sm' ? 'h-2' : 'h-3');
  const textClass = $derived(size === 'sm' ? 'text-xs' : 'text-sm');
  const barColor = $derived(
    pct === 100 ? 'bg-green-500' : pct >= 50 ? 'bg-blue-500' : 'bg-amber-500'
  );
</script>

<div class="w-full">
  {#if label}
    <div class="flex justify-between items-center mb-1">
      <span class="{textClass} text-gray-600">{label}</span>
      <span class="{textClass} font-medium text-gray-900">{done}/{total} ({pct}%)</span>
    </div>
  {/if}
  <div class="w-full bg-gray-200 rounded-full {heightClass}">
    <div
      class="{barColor} {heightClass} rounded-full transition-all duration-300"
      style="width: {pct}%"
    ></div>
  </div>
</div>
