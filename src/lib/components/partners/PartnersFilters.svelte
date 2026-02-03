<script lang="ts">
  /**
   * Partners Filters Component
   *
   * Filter controls for partner directory.
   */

  interface FilterOption {
    id: string;
    label: string;
  }

  interface Props {
    types: FilterOption[];
    regions: FilterOption[];
    services: FilterOption[];
    selectedType: string;
    selectedRegion: string;
    selectedServices: string[];
    allLabel: string;
    typeLabel: string;
    regionLabel: string;
    servicesLabel: string;
    onTypeChange: (type: string) => void;
    onRegionChange: (region: string) => void;
    onServiceToggle: (service: string) => void;
  }

  let {
    types,
    regions,
    services,
    selectedType,
    selectedRegion,
    selectedServices,
    allLabel,
    typeLabel,
    regionLabel,
    servicesLabel,
    onTypeChange,
    onRegionChange,
    onServiceToggle,
  }: Props = $props();
</script>

<div class="space-y-4">
  <!-- Type filter -->
  <div>
    <label for="partner-type-filter" class="block text-sm font-medium text-gray-700 mb-2">{typeLabel}</label>
    <select
      id="partner-type-filter"
      value={selectedType}
      onchange={(e) => onTypeChange((e.target as HTMLSelectElement).value)}
      class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
    >
      <option value="">{allLabel}</option>
      {#each types as type}
        <option value={type.id}>{type.label}</option>
      {/each}
    </select>
  </div>

  <!-- Region filter -->
  <div>
    <label for="partner-region-filter" class="block text-sm font-medium text-gray-700 mb-2">{regionLabel}</label>
    <select
      id="partner-region-filter"
      value={selectedRegion}
      onchange={(e) => onRegionChange((e.target as HTMLSelectElement).value)}
      class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
    >
      <option value="">{allLabel}</option>
      {#each regions as region}
        <option value={region.id}>{region.label}</option>
      {/each}
    </select>
  </div>

  <!-- Services filter -->
  <div>
    <span class="block text-sm font-medium text-gray-700 mb-2">{servicesLabel}</span>
    <div class="space-y-2 max-h-48 overflow-y-auto" role="group" aria-label={servicesLabel}>
      {#each services as service}
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedServices.includes(service.id)}
            onchange={() => onServiceToggle(service.id)}
            class="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
          />
          <span class="text-sm text-gray-600">{service.label}</span>
        </label>
      {/each}
    </div>
  </div>
</div>
