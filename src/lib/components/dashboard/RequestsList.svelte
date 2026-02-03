<script lang="ts">
  /**
   * Requests List Component
   *
   * List of user requests with cards.
   */

  import RequestCard from './RequestCard.svelte';

  interface RequestItem {
    id: string;
    title: string;
    status: string;
    statusLabel: string;
    currentStep: string;
    currentStepLabel: string;
    progressPct: number;
    createdAt: string;
    workflowHref: string;
    configuratorHref?: string | null;
    presaleHref?: string | null;
  }

  interface Props {
    requests: RequestItem[];
    emptyMessage: string;
    progressLabel: string;
    configuratorLabel: string;
    presaleLabel: string;
  }

  let { requests, emptyMessage, progressLabel, configuratorLabel, presaleLabel }: Props = $props();
</script>

<div class="space-y-4">
  {#if requests.length === 0}
    <div class="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
      <p class="text-gray-500">{emptyMessage}</p>
    </div>
  {:else}
    {#each requests as request (request.id)}
      <RequestCard
        id={request.id}
        title={request.title}
        status={request.status}
        statusLabel={request.statusLabel}
        currentStep={request.currentStep}
        currentStepLabel={request.currentStepLabel}
        progressPct={request.progressPct}
        {progressLabel}
        createdAt={request.createdAt}
        workflowHref={request.workflowHref}
        configuratorHref={request.configuratorHref}
        presaleHref={request.presaleHref}
        {configuratorLabel}
        {presaleLabel}
      />
    {/each}
  {/if}
</div>
