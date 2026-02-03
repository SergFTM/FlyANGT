<script lang="ts">
  /**
   * Workflow Step Detail Page
   *
   * Shows details for a single workflow step.
   */

  import ModuleDisabled from '$lib/components/sections/ModuleDisabled.svelte';
  import WorkflowStepDetail from '$lib/components/workflow/WorkflowStepDetail.svelte';
  import { appStore } from '$lib/stores/app.store';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

{#if !data.moduleEnabled}
  <ModuleDisabled message={data.disabledMessage} />
{:else}
  <WorkflowStepDetail
    order={data.step.order}
    totalSteps={data.totalSteps}
    title={data.step.title}
    summary={data.step.summary}
    checklistTitle={data.labels.checklistTitle}
    checklistItems={data.checklistItems}
    docsTitle={data.labels.docsTitle}
    docs={data.docs}
    backLabel={data.labels.backLabel}
    backHref={data.backHref}
    stepOfLabel={data.stepOfLabel}
  />
{/if}
