<script lang="ts">
  /**
   * Release Module Card Component
   *
   * Module card with progress and check items.
   * Dumb component: accepts props only.
   */

  import type { Snippet } from 'svelte';
  import ReleaseProgress from './ReleaseProgress.svelte';
  import type { ReleaseProgress as ProgressType } from '$lib/models/release.model';

  interface Props {
    id: string;
    title: string;
    progress: ProgressType;
    expanded: boolean;
    onToggle: (id: string) => void;
    children: Snippet;
  }

  let { id, title, progress, expanded, onToggle, children }: Props = $props();

  function handleToggle() {
    onToggle(id);
  }
</script>

<div class="bg-white rounded-lg shadow overflow-hidden">
  <!-- Header (clickable) -->
  <button
    type="button"
    onclick={handleToggle}
    class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
  >
    <div class="flex items-center gap-4 flex-1 min-w-0">
      <h3 class="text-lg font-semibold text-gray-900">{title}</h3>
      <div class="w-32 hidden sm:block">
        <ReleaseProgress
          done={progress.done}
          total={progress.total}
          pct={progress.pct}
          size="sm"
        />
      </div>
      <span class="text-sm text-gray-500 sm:hidden">
        {progress.done}/{progress.total}
      </span>
    </div>
    <svg
      class="w-5 h-5 text-gray-500 transition-transform {expanded ? 'rotate-180' : ''}"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </button>

  <!-- Content (collapsible) -->
  {#if expanded}
    <div class="px-4 pb-4 space-y-3 border-t border-gray-100">
      {@render children()}
    </div>
  {/if}
</div>
