<script lang="ts">
  /**
   * Investors Page
   *
   * Public investor landing page with sections, metrics, and deck request form.
   */

  import {
    InvestorsHero,
    InvestorsSections,
    InvestorsMetrics,
    InvestorsTrustBlock,
    InvestorsDeckRequestForm,
  } from '$lib/components/investors';
  import ModuleDisabled from '$lib/components/sections/ModuleDisabled.svelte';
  import { appStore } from '$lib/stores/app.store';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });

  // Build sections with content and CTA links
  const sectionsWithContent = $derived(
    data.content.sections
      .filter(s => s.id !== 'cta') // Filter out CTA section, handled separately
      .map(section => {
        // Find matching config section for CTA links
        const configSection = data.sections.find(cs => cs.id === section.id);
        return {
          id: section.id,
          title: section.title,
          text: section.text,
          bullets: section.bullets,
          variant: section.variant,
          ctaLabel: configSection?.cta?.labelKey
            ? data.content.sections.find(s => s.id === section.id)?.title
              ? undefined
              : undefined
            : undefined,
          ctaHref: configSection?.cta?.href,
        };
      })
  );

  // Build sections for display with proper CTAs
  const displaySections = $derived(
    data.content.sections
      .filter(s => s.id !== 'cta' && s.id !== 'trust')
      .map(section => {
        const configSection = data.sections.find(cs => cs.id === section.id);
        let ctaLabel: string | undefined;
        let ctaHref: string | undefined;

        if (configSection?.cta) {
          ctaHref = configSection.cta.href;
          // Get CTA label from content based on section
          if (section.id === 'presale_plan') {
            ctaLabel = 'View Presale Details';
            if (data.locale === 'ru') ctaLabel = 'Детали пресейла';
          } else if (section.id === 'token_role') {
            ctaLabel = 'Learn About Tokenization';
            if (data.locale === 'ru') ctaLabel = 'Узнать о токенизации';
          }
        }

        return {
          id: section.id,
          title: section.title,
          text: section.text,
          bullets: section.bullets,
          variant: section.variant,
          ctaLabel,
          ctaHref,
        };
      })
  );
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

{#if data.moduleEnabled}
  <InvestorsHero
    h1={data.content.hero.h1}
    h2={data.content.hero.h2}
    primaryCta={data.content.hero.primaryCta}
    primaryCtaHref="#deck-request"
    secondaryCta={data.content.hero.secondaryCta}
    secondaryCtaHref={data.links.trustCenterPath}
    microText={data.content.hero.microText}
  />

  <InvestorsSections sections={displaySections} />

  <InvestorsMetrics
    title={data.content.metrics.title}
    text={data.content.metrics.text}
    items={data.content.metrics.items}
  />

  <InvestorsDeckRequestForm
    title={data.content.deckRequest.title}
    text={data.content.deckRequest.text}
    fields={data.content.deckRequest.fields}
    investorTypes={data.content.deckRequest.investorTypes}
    ticketRanges={data.content.deckRequest.ticketRanges}
    submitLabel={data.content.deckRequest.submitLabel}
    successTitle={data.content.deckRequest.successTitle}
    successText={data.content.deckRequest.successText}
    editLabel={data.content.deckRequest.editLabel}
    requiredLabel={data.content.deckRequest.requiredLabel}
    invalidEmailLabel={data.content.deckRequest.invalidEmailLabel}
    storageKey={data.deckRequestDraftKey}
  />

  <InvestorsTrustBlock
    title={data.content.trust.title}
    text={data.content.trust.text}
    button={data.content.trust.button}
    href={data.links.trustCenterPath}
  />

  <!-- Disclaimer -->
  <section class="py-8 px-4 bg-gray-100 border-t border-gray-200">
    <div class="max-w-4xl mx-auto">
      <p class="text-sm text-gray-500 text-center">{data.content.disclaimer}</p>
    </div>
  </section>
{:else}
  <ModuleDisabled message={data.disabledMessage} />
{/if}
