<script lang="ts">
  /**
   * Home Page
   *
   * Orchestration hub for the FlyANGT ecosystem.
   * Renders blocks based on home config.
   */

  import {
    HomeHero,
    HomePaths,
    HomeModulesGrid,
    HomeHighlight,
    HomeQuickActions,
    HomeUpdates,
    HomeFinalCta,
  } from '$lib/components/home';
  import { appStore } from '$lib/stores/app.store';

  let { data } = $props();

  // Sync locale to store
  $effect(() => {
    appStore.setLocale(data.locale);
  });

  // Helper to check if block is enabled
  function isBlockEnabled(blockId: string): boolean {
    return data.blocks.some(b => b.id === blockId);
  }
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

{#if isBlockEnabled('hero')}
  <HomeHero
    h1={data.content.hero.h1}
    h2={data.content.hero.h2}
    trustLine={data.content.hero.trustLine}
    primaryCta={data.content.hero.primaryCta}
    primaryCtaHref={data.links.customersPath}
    secondaryCta={data.content.hero.secondaryCta}
    secondaryCtaHref={data.links.investorsPath}
    microText={data.content.hero.microText}
  />
{/if}

{#if isBlockEnabled('paths')}
  <HomePaths
    title={data.content.paths.title}
    text={data.content.paths.text}
    items={data.content.paths.items}
  />
{/if}

{#if isBlockEnabled('modules')}
  <HomeModulesGrid
    title={data.content.modules.title}
    text={data.content.modules.text}
    cardLabel={data.content.modules.cardLabel}
    modules={data.moduleCards}
  />
{/if}

{#if isBlockEnabled('trust_highlight')}
  <HomeHighlight
    title={data.content.trust.title}
    text={data.content.trust.text}
    button={data.content.trust.button}
    href={data.links.trustPath}
    variant="left"
    bgColor="white"
  />
{/if}

{#if isBlockEnabled('workflow_highlight')}
  <HomeHighlight
    title={data.content.workflow.title}
    text={data.content.workflow.text}
    button={data.content.workflow.button}
    href={data.links.workflowPath}
    variant="right"
    bgColor="slate"
  />
{/if}

{#if isBlockEnabled('quick_actions')}
  <HomeQuickActions
    title={data.content.quick.title}
    text={data.content.quick.text}
    items={data.content.quick.items}
  />
{/if}

{#if isBlockEnabled('latest_updates')}
  <HomeUpdates
    title={data.content.updates.title}
    text={data.content.updates.text}
    items={data.content.updates.items}
  />
{/if}

{#if isBlockEnabled('final_cta')}
  <HomeFinalCta
    title={data.content.finalCta.title}
    text={data.content.finalCta.text}
    buttonPrimary={data.content.finalCta.buttonPrimary}
    buttonPrimaryHref={data.links.dashboardPath}
    buttonSecondary={data.content.finalCta.buttonSecondary}
    buttonSecondaryHref={data.links.partnersPath}
  />
{/if}

<!-- Disclaimer -->
<section class="py-8 px-4 bg-gray-100 border-t border-gray-200">
  <div class="max-w-4xl mx-auto">
    <p class="text-sm text-gray-500 text-center">{data.content.disclaimer}</p>
  </div>
</section>
