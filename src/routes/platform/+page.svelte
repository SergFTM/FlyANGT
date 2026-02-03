<script lang="ts">
  /**
   * Platform Page
   */

  import HeroSection from '$lib/components/sections/HeroSection.svelte';
  import ContentSections from '$lib/components/sections/ContentSections.svelte';
  import FinalCta from '$lib/components/sections/FinalCta.svelte';
  import ModuleDisabled from '$lib/components/sections/ModuleDisabled.svelte';
  import { appStore } from '$lib/stores/app.store';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

{#if data.moduleEnabled}
  <HeroSection
    h1={data.content.hero.h1}
    h2={data.content.hero.h2}
    trustLine={data.content.hero.trustLine}
    primaryCta={data.content.hero.primaryCta}
    primaryCtaHref="#"
    secondaryCta={data.content.hero.secondaryCta}
    secondaryCtaHref="#features"
  />

  <ContentSections sections={data.content.sections} />

  <FinalCta
    title={data.content.finalCta.title}
    text={data.content.finalCta.text}
    button={data.content.finalCta.button}
    buttonHref="#"
  />
{:else}
  <ModuleDisabled message={data.disabledMessage} />
{/if}
