<script lang="ts">
  /**
   * Request Card Component
   *
   * Card displaying a user request with progress.
   */

  import ProgressBar from './ProgressBar.svelte';

  interface Props {
    id: string;
    title: string;
    status: string;
    statusLabel: string;
    currentStep: string;
    currentStepLabel: string;
    progressPct: number;
    progressLabel: string;
    createdAt: string;
    workflowHref: string;
    configuratorHref?: string | null;
    presaleHref?: string | null;
    configuratorLabel?: string;
    presaleLabel?: string;
  }

  let {
    id,
    title,
    status,
    statusLabel,
    currentStep,
    currentStepLabel,
    progressPct,
    progressLabel,
    createdAt,
    workflowHref,
    configuratorHref,
    presaleHref,
    configuratorLabel,
    presaleLabel,
  }: Props = $props();

  const statusColorClass = $derived(() => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'in_review':
        return 'bg-yellow-100 text-yellow-700';
      case 'scheduled':
        return 'bg-purple-100 text-purple-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  });
</script>

<div class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-shadow">
  <div class="flex items-start justify-between mb-4">
    <div>
      <h3 class="text-lg font-semibold text-gray-900">{title}</h3>
      <p class="text-sm text-gray-500">{createdAt}</p>
    </div>
    <span class="px-3 py-1 rounded-full text-xs font-medium {statusColorClass()}">
      {statusLabel}
    </span>
  </div>

  <div class="mb-4">
    <div class="flex justify-between items-center text-sm mb-1">
      <span class="text-gray-600">{progressLabel}</span>
      <span class="font-medium text-gray-900">{progressPct}%</span>
    </div>
    <ProgressBar percent={progressPct} />
  </div>

  <div class="text-sm text-gray-600 mb-4">
    <span class="font-medium">{currentStepLabel}:</span> {currentStep}
  </div>

  <div class="flex flex-wrap gap-2">
    <a
      href={workflowHref}
      class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
    >
      View Progress
    </a>
    {#if configuratorHref}
      <a
        href={configuratorHref}
        class="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
      >
        {configuratorLabel}
      </a>
    {/if}
    {#if presaleHref}
      <a
        href={presaleHref}
        class="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
      >
        {presaleLabel}
      </a>
    {/if}
  </div>
</div>
