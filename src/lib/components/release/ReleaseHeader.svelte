<script lang="ts">
  /**
   * Release Header Component
   *
   * Displays title, subtitle, and overall progress.
   * Dumb component: accepts props only.
   */

  import ReleaseProgress from './ReleaseProgress.svelte';
  import type { ReleaseProgress as ProgressType } from '$lib/models/release.model';

  interface Props {
    title: string;
    subtitle: string;
    progress: ProgressType;
    progressLabel: string;
  }

  let { title, subtitle, progress, progressLabel }: Props = $props();
</script>

<div class="bg-white rounded-lg shadow p-6 mb-6">
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">{title}</h1>
      <p class="text-gray-600 mt-1">{subtitle}</p>
    </div>
    <div class="w-full md:w-64">
      <ReleaseProgress
        done={progress.done}
        total={progress.total}
        pct={progress.pct}
        label={progressLabel}
      />
    </div>
  </div>
</div>
