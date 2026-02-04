<script lang="ts">
  /**
   * Customers Page
   *
   * Public customer landing page with sections, links block, and docs request form.
   */

  import {
    CustomersHero,
    CustomersSections,
    CustomersLinksBlock,
    RequestDocsForm,
  } from '$lib/components/customers';
  import ModuleDisabled from '$lib/components/sections/ModuleDisabled.svelte';
  import { appStore } from '$lib/stores/app.store';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });

  // Build sections for display (filter out request_docs and cta - handled separately)
  const displaySections = $derived(
    data.content.sections
      .filter(s => s.id !== 'request_docs' && s.id !== 'cta')
      .map(section => ({
        id: section.id,
        title: section.title,
        text: section.text,
        bullets: section.bullets,
        variant: section.variant,
        items: section.items,
      }))
  );

  // Get CTA section content
  const ctaSection = $derived(
    data.content.sections.find(s => s.id === 'cta')
  );
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

{#if data.moduleEnabled}
  <CustomersHero
    h1={data.content.hero.h1}
    h2={data.content.hero.h2}
    primaryCta={data.content.hero.primaryCta}
    primaryCtaHref="#request-docs"
    secondaryCta={data.content.hero.secondaryCta}
    secondaryCtaHref={data.links.workflowPath}
    microText={data.content.hero.microText}
  />

  <CustomersSections sections={displaySections} />

  <CustomersLinksBlock
    title={data.content.linksBlock.title}
    text={data.content.linksBlock.text}
    items={data.content.linksBlock.items}
  />

  <RequestDocsForm
    title={data.content.requestDocs.title}
    text={data.content.requestDocs.text}
    fields={data.content.requestDocs.fields}
    interestOptions={data.content.requestDocs.interestOptions}
    submitLabel={data.content.requestDocs.submitLabel}
    successTitle={data.content.requestDocs.successTitle}
    successText={data.content.requestDocs.successText}
    editLabel={data.content.requestDocs.editLabel}
    requiredLabel={data.content.requestDocs.requiredLabel}
    invalidEmailLabel={data.content.requestDocs.invalidEmailLabel}
    storageKey={data.docsRequestDraftKey}
    locale={data.locale}
    sendingLabel={data.formLabels.sending}
    submitErrorLabel={data.formLabels.error}
    retryLabel={data.formLabels.retry}
    referenceIdLabel={data.formLabels.referenceId}
  />

  <!-- Final CTA -->
  {#if ctaSection}
    <section class="py-12 bg-emerald-600 text-white">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold mb-4">{ctaSection.title}</h2>
        <p class="text-emerald-100 mb-8 text-lg">{ctaSection.text}</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/configurator"
            class="px-8 py-3 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
          >
            {data.locale === 'ru' ? 'Конфигуратор' : 'Configure Aircraft'}
          </a>
          <a
            href={data.links.trustPath}
            class="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
          >
            {data.locale === 'ru' ? 'Центр доверия' : 'Trust Center'}
          </a>
        </div>
      </div>
    </section>
  {/if}

  <!-- Disclaimer -->
  <section class="py-8 px-4 bg-gray-100 border-t border-gray-200">
    <div class="max-w-4xl mx-auto">
      <p class="text-sm text-gray-500 text-center">{data.content.disclaimer}</p>
    </div>
  </section>
{:else}
  <ModuleDisabled message={data.disabledMessage} />
{/if}
