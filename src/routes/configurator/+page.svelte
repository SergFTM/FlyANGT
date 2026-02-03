<script lang="ts">
  /**
   * Configurator Page
   *
   * Aircraft configuration builder with option groups,
   * price estimation, and quote request.
   */

  import { onMount } from 'svelte';
  import ModuleDisabled from '$lib/components/sections/ModuleDisabled.svelte';
  import ConfiguratorHero from '$lib/components/configurator/ConfiguratorHero.svelte';
  import ConfiguratorSteps from '$lib/components/configurator/ConfiguratorSteps.svelte';
  import ConfiguratorBuilder from '$lib/components/configurator/ConfiguratorBuilder.svelte';
  import ConfiguratorSummary from '$lib/components/configurator/ConfiguratorSummary.svelte';
  import ConfiguratorRequestQuote from '$lib/components/configurator/ConfiguratorRequestQuote.svelte';
  import ConfiguratorDisclaimer from '$lib/components/configurator/ConfiguratorDisclaimer.svelte';
  import { configuratorStore } from '$lib/stores/configurator.store';
  import { configuratorConfig, type OptionGroupId } from '$config/configurator.config';
  import { appStore } from '$lib/stores/app.store';

  let { data } = $props();

  let showQuoteModal = $state(false);

  // Subscribe to store
  let storeState = $state({ selections: {} as Record<OptionGroupId, string[]>, totalUsd: 0 });

  $effect(() => {
    const unsubscribe = configuratorStore.subscribe(state => {
      storeState = state;
    });
    return unsubscribe;
  });

  $effect(() => {
    appStore.setLocale(data.locale);
  });

  onMount(() => {
    // Initialize from URL if share param present
    configuratorStore.initFromUrl();
  });

  function scrollToBuilder() {
    const el = document.getElementById('builder');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function handleOptionToggle(groupId: OptionGroupId, optionId: string, checked: boolean) {
    configuratorStore.setOption(groupId, optionId, checked);
  }

  function handleReset() {
    configuratorStore.reset();
  }

  function handleRequestQuote() {
    showQuoteModal = true;
  }

  function handleCloseQuote() {
    showQuoteModal = false;
  }

  function getShareUrl(): string {
    return configuratorStore.getShareUrl();
  }

  // Build selected options for summary
  let selectedOptions = $derived(() => {
    const result: Array<{
      groupId: OptionGroupId;
      groupTitle: string;
      optionId: string;
      optionTitle: string;
      priceUsd: number;
    }> = [];

    for (const group of configuratorConfig.groups) {
      const selectedIds = storeState.selections[group.id] || [];
      for (const optionId of selectedIds) {
        const option = group.options.find(o => o.id === optionId);
        if (option) {
          result.push({
            groupId: group.id,
            groupTitle: data.groupTitles[group.id],
            optionId: option.id,
            optionTitle: data.optionTitles[option.id] || option.id,
            priceUsd: option.priceUsd,
          });
        }
      }
    }

    return result;
  });
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

{#if !data.moduleEnabled || !data.configuratorEnabled}
  <ModuleDisabled message={data.disabledMessage} />
{:else}
  <ConfiguratorHero
    h1={data.content.hero.h1}
    h2={data.content.hero.h2}
    primaryCta={data.content.hero.primaryCta}
    secondaryCta={data.content.hero.secondaryCta}
    onPrimaryClick={scrollToBuilder}
    onSecondaryClick={scrollToBuilder}
  />

  <ConfiguratorSteps
    title={data.content.steps.title}
    items={data.content.steps.items}
  />

  <div class="bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <ConfiguratorBuilder
            groups={data.groups}
            selections={storeState.selections}
            selectLabel={data.content.ui.selectLabel}
            selectedLabel={data.content.ui.selectedLabel}
            onOptionToggle={handleOptionToggle}
          />
        </div>

        <div class="lg:col-span-1">
          <ConfiguratorSummary
            selectedOptions={selectedOptions()}
            totalUsd={storeState.totalUsd}
            priceEstimateLabel={data.content.ui.priceEstimateLabel}
            pricingNote={data.pricingNote}
            resetLabel={data.content.ui.resetLabel}
            shareLabel={data.content.ui.shareLabel}
            copiedLabel={data.content.ui.copiedLabel}
            requestQuoteLabel={data.content.ui.requestQuoteLabel}
            onReset={handleReset}
            onRequestQuote={handleRequestQuote}
            {getShareUrl}
          />
        </div>
      </div>
    </div>
  </div>

  <ConfiguratorDisclaimer text={data.content.disclaimer} />

  <ConfiguratorRequestQuote
    isOpen={showQuoteModal}
    title={data.content.ui.requestQuoteTitle}
    text={data.content.ui.requestQuoteText}
    fields={data.content.ui.formFields}
    submitLabel={data.content.ui.submitLabel}
    successTitle={data.content.ui.successTitle}
    successText={data.content.ui.successText}
    requiredError={data.content.ui.requiredError}
    emailError={data.content.ui.emailError}
    editLabel={data.content.ui.editLabel}
    currentSelections={storeState.selections}
    totalUsd={storeState.totalUsd}
    onClose={handleCloseQuote}
  />
{/if}
