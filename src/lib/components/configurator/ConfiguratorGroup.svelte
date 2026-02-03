<script lang="ts">
  /**
   * Configurator Group Component
   *
   * A group of options with title and description.
   */

  import ConfiguratorOptionCard from './ConfiguratorOptionCard.svelte';

  interface OptionData {
    id: string;
    title: string;
    description?: string;
    priceUsd: number;
  }

  interface Props {
    groupId: string;
    title: string;
    description: string;
    selectionMode: 'single' | 'multi';
    options: OptionData[];
    selectedIds: string[];
    selectLabel: string;
    selectedLabel: string;
    onOptionToggle: (optionId: string, checked: boolean) => void;
  }

  let {
    groupId,
    title,
    description,
    selectionMode,
    options,
    selectedIds,
    selectLabel,
    selectedLabel,
    onOptionToggle,
  }: Props = $props();
</script>

<div class="bg-white rounded-xl border border-gray-200 p-6">
  <div class="mb-4">
    <h3 class="text-xl font-bold text-gray-900">{title}</h3>
    <p class="text-gray-600 text-sm">{description}</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    {#each options as option (option.id)}
      <ConfiguratorOptionCard
        optionId={option.id}
        title={option.title}
        description={option.description}
        priceUsd={option.priceUsd}
        isSelected={selectedIds.includes(option.id)}
        {selectionMode}
        {selectLabel}
        {selectedLabel}
        onToggle={(checked) => onOptionToggle(option.id, checked)}
      />
    {/each}
  </div>
</div>
