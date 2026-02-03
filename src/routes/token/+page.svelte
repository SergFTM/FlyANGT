<script lang="ts">
  /**
   * Tokenization Page
   *
   * Public token overview with sections and required risk disclosure.
   */

  import {
    TokenHero,
    TokenSectionsList,
    TokenRiskDisclosure,
    TokenWhitepaperCard,
  } from '$lib/components/token';
  import ModuleDisabled from '$lib/components/sections/ModuleDisabled.svelte';
  import { appStore } from '$lib/stores/app.store';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });

  // Get whitepaper section for the card
  const whitepaperSection = $derived(
    data.sections.find(s => s.id === 'whitepaper')
  );
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

{#if data.moduleEnabled}
  <!-- Hero -->
  <TokenHero
    h1={data.content.hero.h1}
    h2={data.content.hero.h2}
    primaryCta={data.content.hero.primaryCta}
    secondaryCta={data.content.hero.secondaryCta}
    primaryHref={data.trustCenterHref}
    secondaryHref={data.whitepaperHref}
  />

  <!-- Sections (excluding risk) -->
  <TokenSectionsList
    sections={data.sections}
    riskSectionId={data.riskSectionId}
  />

  <!-- Whitepaper Card -->
  {#if whitepaperSection}
    <TokenWhitepaperCard
      title={whitepaperSection.title}
      text={whitepaperSection.text}
      ctaLabel={whitepaperSection.ctaLabel ?? data.content.sectionCta.label}
      href={data.whitepaperHref}
    />
  {/if}

  <!-- Risk Disclosure (required, always visible) -->
  <TokenRiskDisclosure
    title={data.content.riskBlock.title}
    points={data.content.riskBlock.points}
    footer={data.content.riskBlock.footer}
  />

  <!-- Page Disclaimer -->
  <div class="max-w-4xl mx-auto px-6 py-8">
    <p class="text-sm text-gray-500 text-center leading-relaxed">
      {data.content.disclaimer}
    </p>
  </div>
{:else}
  <ModuleDisabled message={data.disabledMessage} />
{/if}
