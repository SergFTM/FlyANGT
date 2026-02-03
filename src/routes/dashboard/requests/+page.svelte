<script lang="ts">
  /**
   * Dashboard Requests Page
   *
   * Shows user's service requests with links to workflow.
   */

  import RequestsList from '$lib/components/dashboard/RequestsList.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<div>
  <h1 class="text-3xl font-bold mb-6">{data.pageTitle}</h1>

  <RequestsList
    requests={data.requests}
    emptyMessage={data.labels.noRequests}
    progressLabel={data.labels.progressLabel}
    configuratorLabel={data.labels.configuratorLabel}
    presaleLabel={data.labels.presaleLabel}
  />
</div>
