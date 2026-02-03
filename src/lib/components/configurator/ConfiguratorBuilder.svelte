<script lang="ts">
  /**
   * Configurator Builder Component
   *
   * Main builder UI that renders all option groups.
   */

  import ConfiguratorGroup from './ConfiguratorGroup.svelte';
  import type { OptionGroupId } from '$config/configurator.config';

  interface OptionData {
    id: string;
    title: string;
    description?: string;
    priceUsd: number;
  }

  interface GroupData {
    id: OptionGroupId;
    title: string;
    description: string;
    selectionMode: 'single' | 'multi';
    options: OptionData[];
  }

  interface Props {
    groups: GroupData[];
    selections: Record<OptionGroupId, string[]>;
    selectLabel: string;
    selectedLabel: string;
    onOptionToggle: (groupId: OptionGroupId, optionId: string, checked: boolean) => void;
  }

  let { groups, selections, selectLabel, selectedLabel, onOptionToggle }: Props = $props();
</script>

<section id="builder" class="py-8 px-4">
  <div class="max-w-4xl mx-auto space-y-6">
    {#each groups as group (group.id)}
      <ConfiguratorGroup
        groupId={group.id}
        title={group.title}
        description={group.description}
        selectionMode={group.selectionMode}
        options={group.options}
        selectedIds={selections[group.id] || []}
        {selectLabel}
        {selectedLabel}
        onOptionToggle={(optionId, checked) => onOptionToggle(group.id, optionId, checked)}
      />
    {/each}
  </div>
</section>
