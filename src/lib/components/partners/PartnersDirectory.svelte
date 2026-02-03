<script lang="ts">
  /**
   * Partners Directory Component
   *
   * Main directory with search, filters, and partner cards.
   */

  import PartnersFilters from './PartnersFilters.svelte';
  import PartnerCard from './PartnerCard.svelte';
  import { EmptyState } from '$lib/components/ui';

  interface Partner {
    slug: string;
    name: string;
    headline: string;
    type: string;
    typeLabel: string;
    region: string;
    regionLabel: string;
    status: string;
    statusLabel: string;
    services: string[];
    serviceLabels: string[];
    href: string;
    searchText: string;
  }

  interface FilterOption {
    id: string;
    label: string;
  }

  interface Props {
    title: string;
    text: string;
    partners: Partner[];
    types: FilterOption[];
    regions: FilterOption[];
    services: FilterOption[];
    searchPlaceholder: string;
    filtersTitle: string;
    emptyTitle: string;
    emptyText: string;
    allLabel: string;
    typeLabel: string;
    regionLabel: string;
    servicesLabel: string;
  }

  let {
    title,
    text,
    partners,
    types,
    regions,
    services,
    searchPlaceholder,
    filtersTitle,
    emptyTitle,
    emptyText,
    allLabel,
    typeLabel,
    regionLabel,
    servicesLabel,
  }: Props = $props();

  // Filter state
  let searchQuery = $state('');
  let selectedType = $state('');
  let selectedRegion = $state('');
  let selectedServices = $state<string[]>([]);

  // Filtered partners
  const filteredPartners = $derived(() => {
    let result = partners;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.searchText.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (selectedType) {
      result = result.filter(p => p.type === selectedType);
    }

    // Region filter
    if (selectedRegion) {
      result = result.filter(p => p.region === selectedRegion);
    }

    // Services filter
    if (selectedServices.length > 0) {
      result = result.filter(p =>
        selectedServices.some(s => p.services.includes(s))
      );
    }

    return result;
  });

  function handleTypeChange(type: string) {
    selectedType = type;
  }

  function handleRegionChange(region: string) {
    selectedRegion = region;
  }

  function handleServiceToggle(service: string) {
    if (selectedServices.includes(service)) {
      selectedServices = selectedServices.filter(s => s !== service);
    } else {
      selectedServices = [...selectedServices, service];
    }
  }
</script>

<section class="py-12 bg-gray-50">
  <div class="max-w-7xl mx-auto px-6">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">{text}</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Filters sidebar -->
      <div class="lg:w-64 flex-shrink-0">
        <div class="bg-white rounded-lg border border-gray-200 p-4 sticky top-4">
          <h3 class="font-semibold text-gray-900 mb-4">{filtersTitle}</h3>

          <!-- Search -->
          <div class="mb-4">
            <input
              type="text"
              bind:value={searchQuery}
              placeholder={searchPlaceholder}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <PartnersFilters
            {types}
            {regions}
            {services}
            {selectedType}
            {selectedRegion}
            {selectedServices}
            {allLabel}
            {typeLabel}
            {regionLabel}
            {servicesLabel}
            onTypeChange={handleTypeChange}
            onRegionChange={handleRegionChange}
            onServiceToggle={handleServiceToggle}
          />
        </div>
      </div>

      <!-- Partner cards grid -->
      <div class="flex-1">
        {#if filteredPartners().length > 0}
          <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {#each filteredPartners() as partner (partner.slug)}
              <PartnerCard
                slug={partner.slug}
                name={partner.name}
                headline={partner.headline}
                type={partner.typeLabel}
                region={partner.regionLabel}
                status={partner.status}
                statusLabel={partner.statusLabel}
                services={partner.serviceLabels}
                href={partner.href}
              />
            {/each}
          </div>
        {:else}
          <EmptyState
            title={emptyTitle}
            text={emptyText}
            variant="default"
          />
        {/if}
      </div>
    </div>
  </div>
</section>
