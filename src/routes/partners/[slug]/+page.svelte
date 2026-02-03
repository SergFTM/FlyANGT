<script lang="ts">
  /**
   * Partner Profile Page
   *
   * Individual partner detail view with services, contact, and highlights.
   */

  import {
    PartnerProfileHeader,
    PartnerMeta,
    PartnerServices,
    PartnerContact,
  } from '$lib/components/partners';
  import ModuleDisabled from '$lib/components/sections/ModuleDisabled.svelte';
  import { appStore } from '$lib/stores/app.store';
  import { t } from '$config/i18n.config';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });

  // Get translated headline and description
  const headline = $derived(t(data.partner.headlineKey, data.locale));
  const description = $derived(t(data.partner.descriptionKey, data.locale));
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

{#if data.moduleEnabled}
  <div class="min-h-screen bg-gray-50">
    <!-- Back link -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-6 py-4">
        <a
          href="/partners?lang={data.locale}"
          class="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          {data.content.partnerProfile.backLabel}
        </a>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-6 py-8">
      <!-- Header -->
      <div class="bg-white rounded-xl border border-gray-200 p-8 mb-6">
        <PartnerProfileHeader
          name={data.partner.name}
          headline={headline}
          description={description}
        />

        <!-- Meta badges -->
        <div class="mt-6">
          <PartnerMeta
            typeLabel={data.typeLabel}
            regionLabel={data.regionLabel}
            statusLabel={data.statusLabel}
            status={data.partner.status}
          />
        </div>
      </div>

      <!-- Content grid -->
      <div class="grid md:grid-cols-3 gap-6">
        <!-- Services and highlights (2/3) -->
        <div class="md:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <PartnerServices
            servicesTitle={data.content.partnerProfile.servicesTitle}
            services={data.serviceLabels}
            highlightsTitle={data.content.partnerProfile.highlightsTitle}
            highlights={data.highlightTexts}
          />
        </div>

        <!-- Contact (1/3) -->
        <div class="md:col-span-1">
          <PartnerContact
            title={data.content.partnerProfile.contactTitle}
            website={data.partner.website}
            email={data.partner.contact?.email}
            telegram={data.partner.contact?.telegram}
            websiteLabel={data.content.partnerProfile.websiteLabel}
            emailLabel={data.content.partnerProfile.emailLabel}
            telegramLabel={data.content.partnerProfile.telegramLabel}
          />
        </div>
      </div>
    </div>
  </div>
{:else}
  <ModuleDisabled message={data.disabledMessage} />
{/if}
