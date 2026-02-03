<script lang="ts">
  /**
   * Configurator Option Card Component
   *
   * Single option card with selection state and price.
   */

  interface Props {
    optionId: string;
    title: string;
    description?: string;
    priceUsd: number;
    isSelected: boolean;
    selectionMode: 'single' | 'multi';
    selectLabel: string;
    selectedLabel: string;
    onToggle: (checked: boolean) => void;
  }

  let {
    optionId,
    title,
    description,
    priceUsd,
    isSelected,
    selectionMode,
    selectLabel,
    selectedLabel,
    onToggle,
  }: Props = $props();

  function formatPrice(price: number): string {
    if (price === 0) return 'Included';
    return `+$${price.toLocaleString()}`;
  }
</script>

<div
  class="border-2 rounded-lg p-4 cursor-pointer transition-all {isSelected
    ? 'border-blue-500 bg-blue-50'
    : 'border-gray-200 bg-white hover:border-gray-300'}"
  onclick={() => onToggle(!isSelected)}
  onkeypress={(e) => e.key === 'Enter' && onToggle(!isSelected)}
  role="button"
  tabindex="0"
>
  <div class="flex items-start justify-between gap-3">
    <div class="flex-1">
      <div class="flex items-center gap-3 mb-1">
        {#if selectionMode === 'single'}
          <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center {isSelected ? 'border-blue-500' : 'border-gray-300'}">
            {#if isSelected}
              <div class="w-3 h-3 rounded-full bg-blue-500"></div>
            {/if}
          </div>
        {:else}
          <div class="w-5 h-5 rounded border-2 flex items-center justify-center {isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}">
            {#if isSelected}
              <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            {/if}
          </div>
        {/if}

        <h4 class="font-medium text-gray-900">{title}</h4>
      </div>

      {#if description}
        <p class="text-sm text-gray-600 ml-8">{description}</p>
      {/if}
    </div>

    <div class="text-right flex-shrink-0">
      <div class="font-semibold {priceUsd === 0 ? 'text-green-600' : 'text-gray-900'}">
        {formatPrice(priceUsd)}
      </div>
    </div>
  </div>
</div>
