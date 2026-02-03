<script lang="ts">
  /**
   * Dashboard Workflow Page
   *
   * User's workflow progress view with request list and detail panel.
   */

  import RequestsList from '$lib/components/dashboard/RequestsList.svelte';
  import ProgressBar from '$lib/components/dashboard/ProgressBar.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<div>
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-3xl font-bold">{data.pageTitle}</h1>
    <a
      href={data.publicWorkflowHref}
      class="text-blue-600 hover:text-blue-800 text-sm font-medium"
    >
      {data.labels.viewWorkflow} &rarr;
    </a>
  </div>

  {#if data.selectedRequest}
    <!-- Detail panel for selected request -->
    <div class="bg-white rounded-lg border border-gray-200 p-6 mb-8">
      <div class="flex items-start justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">{data.selectedRequest.title}</h2>
          <p class="text-gray-500">{data.selectedRequest.createdAt}</p>
        </div>
        <span class="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
          {data.selectedRequest.statusLabel}
        </span>
      </div>

      <!-- Progress -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <span class="text-gray-600">{data.labels.progressLabel}</span>
          <span class="font-semibold text-gray-900">{data.selectedRequest.progressPct}%</span>
        </div>
        <ProgressBar percent={data.selectedRequest.progressPct} />
      </div>

      <!-- Step progress -->
      <div class="mb-6">
        <h3 class="font-semibold text-gray-900 mb-3">{data.labels.currentStepLabel}: {data.selectedRequest.currentStep}</h3>
        <div class="flex flex-wrap gap-2">
          {#each data.selectedRequest.workflowSteps as step (step.id)}
            <div class="flex items-center gap-2 px-3 py-1 rounded-full text-sm {step.isCompleted ? 'bg-green-100 text-green-700' : step.isCurrent ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-100 text-gray-500'}">
              <span class="w-5 h-5 rounded-full flex items-center justify-center text-xs {step.isCompleted ? 'bg-green-500 text-white' : step.isCurrent ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}">
                {#if step.isCompleted}
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                {:else}
                  {step.order}
                {/if}
              </span>
              {step.title}
            </div>
          {/each}
        </div>
      </div>

      <!-- Checklist for current step -->
      {#if data.selectedRequest.checklistItems.length > 0}
        <div>
          <h3 class="font-semibold text-gray-900 mb-3">{data.labels.checklistTitle}</h3>
          <ul class="space-y-2">
            {#each data.selectedRequest.checklistItems as item, index (index)}
              <li class="flex items-start gap-3">
                <div class="flex-shrink-0 w-5 h-5 mt-0.5 border-2 border-gray-300 rounded"></div>
                <span class="text-gray-700">{item}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/if}

      <!-- Back to list -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <a
          href="/dashboard/workflow{data.queryParam}"
          class="text-blue-600 hover:text-blue-800 text-sm"
        >
          &larr; {data.labels.backLabel}
        </a>
      </div>
    </div>
  {/if}

  <!-- Requests list -->
  <h2 class="text-xl font-semibold text-gray-900 mb-4">
    {#if data.selectedRequest}All Requests{:else}Your Requests{/if}
  </h2>
  <RequestsList
    requests={data.requests}
    emptyMessage={data.labels.noRequests}
    progressLabel={data.labels.progressLabel}
    configuratorLabel={data.labels.configuratorLabel}
    presaleLabel={data.labels.presaleLabel}
  />
</div>
