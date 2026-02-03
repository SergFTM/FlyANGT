<script lang="ts">
  /**
   * Partners Page
   *
   * Public directory of ecosystem partners with search and filters.
   */

  import {
    PartnersHero,
    PartnersDirectory,
    BecomePartnerForm,
    PartnersTrustBlock,
  } from '$lib/components/partners';
  import ModuleDisabled from '$lib/components/sections/ModuleDisabled.svelte';
  import { appStore } from '$lib/stores/app.store';
  import { t } from '$config/i18n.config';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });

  // Build type and region options for the form
  const typeOptions = $derived(
    data.types.map(type => ({
      id: type.id,
      label: t(type.titleKey, data.locale),
    }))
  );

  const regionOptions = $derived(
    data.regions.map(region => ({
      id: region.id,
      label: t(region.titleKey, data.locale),
    }))
  );
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

{#if data.moduleEnabled}
  <PartnersHero
    h1={data.content.hero.h1}
    h2={data.content.hero.h2}
    primaryCta={data.content.hero.primaryCta}
    primaryCtaHref="#become-partner"
    secondaryCta={data.content.hero.secondaryCta}
    secondaryCtaHref="/trust"
  />

  <PartnersDirectory
    partners={data.partners}
    types={data.types}
    regions={data.regions}
    serviceTags={data.serviceTags}
    locale={data.locale}
    directoryTitle={data.content.directory.title}
    directoryText={data.content.directory.text}
    searchPlaceholder={data.content.directory.searchPlaceholder}
    filtersTitle={data.content.directory.filtersTitle}
    emptyTitle={data.content.directory.emptyTitle}
    emptyText={data.content.directory.emptyText}
    allTypesLabel={t('partner.filter.allTypes', data.locale)}
    allRegionsLabel={t('partner.filter.allRegions', data.locale)}
    servicesLabel={t('partner.filter.services', data.locale)}
    offlineLabel={t('partner.group.offline', data.locale)}
    digitalLabel={t('partner.group.digital', data.locale)}
    viewProfileLabel={t('partner.viewProfile', data.locale)}
    statusActiveLabel={t('partner.status.active', data.locale)}
    statusPilotLabel={t('partner.status.pilot', data.locale)}
    statusPlannedLabel={t('partner.status.planned', data.locale)}
  />

  <BecomePartnerForm
    title={data.content.becomePartner.title}
    text={data.content.becomePartner.text}
    fields={data.content.becomePartner.fields}
    submitLabel={data.content.becomePartner.submitLabel}
    successTitle={data.content.becomePartner.successTitle}
    successText={data.content.becomePartner.successText}
    editLabel={data.content.becomePartner.editLabel}
    requiredLabel={data.content.becomePartner.requiredLabel}
    invalidEmailLabel={data.content.becomePartner.invalidEmailLabel}
    types={typeOptions}
    regions={regionOptions}
    storageKey={data.leadDraftKey}
  />

  <PartnersTrustBlock
    title={data.content.trust.title}
    text={data.content.trust.text}
    button={data.content.trust.button}
    href="/trust"
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
