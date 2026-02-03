<script lang="ts">
  /**
   * Presale Page
   *
   * UI skeleton for presale with hero, ladder, calculator,
   * steps, FAQ, lead form, and trust links.
   */

  import ModuleDisabled from '$lib/components/sections/ModuleDisabled.svelte';
  import PresaleHero from '$lib/components/presale/PresaleHero.svelte';
  import PresaleLadder from '$lib/components/presale/PresaleLadder.svelte';
  import PresaleCalculator from '$lib/components/presale/PresaleCalculator.svelte';
  import PresaleSteps from '$lib/components/presale/PresaleSteps.svelte';
  import PresaleFaq from '$lib/components/presale/PresaleFaq.svelte';
  import PresaleLeadForm from '$lib/components/presale/PresaleLeadForm.svelte';
  import PresaleTrustBlock from '$lib/components/presale/PresaleTrustBlock.svelte';
  import PresaleDisclaimer from '$lib/components/presale/PresaleDisclaimer.svelte';
  import { appStore } from '$lib/stores/app.store';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });

  function scrollToCalculator() {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function scrollToForm() {
    const el = document.getElementById('form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function goToTrust() {
    window.location.href = data.trustCenterHref;
  }
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

{#if !data.moduleEnabled || !data.presaleEnabled}
  <ModuleDisabled title={data.disabledTitle} message={data.disabledMessage} />
{:else}
  <PresaleHero
    h1={data.content.hero.h1}
    h2={data.content.hero.h2}
    trustLine={data.content.hero.trustLine}
    primaryCta={data.content.hero.primaryCta}
    secondaryCta={data.content.hero.secondaryCta}
    onPrimaryClick={scrollToCalculator}
    onSecondaryClick={goToTrust}
  />

  <PresaleLadder
    title={data.content.ladder.title}
    text={data.content.ladder.text}
    weeks={data.weeks}
    currency={data.currency}
  />

  <PresaleCalculator
    title={data.content.calculator.title}
    text={data.content.calculator.text}
    inputLabel={data.content.calculator.inputLabel}
    outputLabel={data.content.calculator.outputLabel}
    listingLabel={data.content.calculator.listingLabel}
    minError={data.content.calculator.minError}
    maxError={data.content.calculator.maxError}
    activeWeekPrice={data.activeWeekPrice}
    minCommitUsd={data.minCommitUsd}
    maxCommitUsd={data.maxCommitUsd}
    showListingComparison={data.showListingComparison}
    assumedListingPriceUsd={data.assumedListingPriceUsd}
    currency={data.currency}
  />

  <PresaleSteps
    title={data.content.steps.title}
    items={data.content.steps.items}
  />

  <PresaleFaq
    title={data.content.faq.title}
    items={data.content.faq.items}
  />

  <PresaleLeadForm
    title={data.content.leadForm.title}
    text={data.content.leadForm.text}
    fields={data.content.leadForm.fields}
    submitLabel={data.content.leadForm.submitLabel}
    successTitle={data.content.leadForm.successTitle}
    successText={data.content.leadForm.successText}
    editLabel={data.content.leadForm.editLabel}
    requiredError={data.content.leadForm.requiredError}
    emailError={data.content.leadForm.emailError}
  />

  <PresaleTrustBlock
    title={data.content.trust.title}
    text={data.content.trust.text}
    button={data.content.trust.button}
    trustCenterHref={data.trustCenterHref}
  />

  <PresaleDisclaimer text={data.content.disclaimer} />
{/if}
