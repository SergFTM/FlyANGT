<script lang="ts">
  /**
   * Workflow Overview Page
   *
   * Public page showing the "From Order to Flight" workflow steps.
   */

  import ModuleDisabled from '$lib/components/sections/ModuleDisabled.svelte';
  import WorkflowHero from '$lib/components/workflow/WorkflowHero.svelte';
  import WorkflowTimeline from '$lib/components/workflow/WorkflowTimeline.svelte';
  import WorkflowStepCard from '$lib/components/workflow/WorkflowStepCard.svelte';
  import WorkflowDashboardCta from '$lib/components/workflow/WorkflowDashboardCta.svelte';
  import { appStore } from '$lib/stores/app.store';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });

  function goToConfigurator() {
    window.location.href = data.configuratorHref;
  }

  function goToDashboard() {
    window.location.href = data.dashboardHref;
  }
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

{#if !data.moduleEnabled}
  <ModuleDisabled message={data.disabledMessage} />
{:else}
  <WorkflowHero
    h1={data.content.hero.h1}
    h2={data.content.hero.h2}
    primaryCta={data.content.hero.primaryCta}
    secondaryCta={data.content.hero.secondaryCta}
    onPrimaryClick={goToConfigurator}
    onSecondaryClick={goToDashboard}
  />

  <!-- Overview section -->
  <section class="py-16 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">{data.content.overview.title}</h2>
      <p class="text-lg text-gray-600">{data.content.overview.text}</p>
    </div>
  </section>

  <!-- Timeline -->
  <WorkflowTimeline steps={data.steps} />

  <!-- Steps list -->
  <section class="py-16 px-4 bg-white">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold text-gray-900 mb-3">{data.content.stepsIntro.title}</h2>
      <p class="text-gray-600 mb-8">{data.content.stepsIntro.text}</p>

      <div class="grid md:grid-cols-2 gap-4">
        {#each data.steps as step (step.id)}
          <WorkflowStepCard
            order={step.order}
            title={step.title}
            summary={step.summary}
            href={step.href}
          />
        {/each}
      </div>
    </div>
  </section>

  <!-- Dashboard CTA -->
  <WorkflowDashboardCta
    title={data.content.dashboard.title}
    text={data.content.dashboard.text}
    buttonLabel={data.content.dashboard.openDashboardLabel}
    dashboardHref={data.dashboardHref}
  />

  <!-- Disclaimer -->
  <section class="py-8 px-4 bg-gray-50 border-t border-gray-200">
    <div class="max-w-4xl mx-auto">
      <p class="text-sm text-gray-500 text-center">{data.content.disclaimer}</p>
    </div>
  </section>
{/if}
