<script lang="ts">
  /**
   * Configurator Summary Component
   *
   * Shows selected options grouped and total estimate.
   */

  import ConfiguratorShare from './ConfiguratorShare.svelte';
  import type { OptionGroupId } from '$config/configurator.config';

  interface SelectedOption {
    groupId: OptionGroupId;
    groupTitle: string;
    optionId: string;
    optionTitle: string;
    priceUsd: number;
  }

  interface Props {
    selectedOptions: SelectedOption[];
    totalUsd: number;
    priceEstimateLabel: string;
    pricingNote: string;
    resetLabel: string;
    shareLabel: string;
    copiedLabel: string;
    requestQuoteLabel: string;
    onReset: () => void;
    onRequestQuote: () => void;
    getShareUrl: () => string;
  }

  let {
    selectedOptions,
    totalUsd,
    priceEstimateLabel,
    pricingNote,
    resetLabel,
    shareLabel,
    copiedLabel,
    requestQuoteLabel,
    onReset,
    onRequestQuote,
    getShareUrl,
  }: Props = $props();

  // Group options by group
  let groupedOptions = $derived(() => {
    const groups: Record<string, { title: string; options: SelectedOption[] }> = {};
    for (const opt of selectedOptions) {
      if (!groups[opt.groupId]) {
        groups[opt.groupId] = { title: opt.groupTitle, options: [] };
      }
      groups[opt.groupId].options.push(opt);
    }
    return Object.values(groups);
  });

  function formatPrice(price: number): string {
    return `$${price.toLocaleString()}`;
  }
</script>

<aside class="bg-white rounded-xl border border-gray-200 p-6 sticky top-4">
  <h3 class="text-xl font-bold text-gray-900 mb-4">Configuration Summary</h3>

  <div class="space-y-4 mb-6 max-h-80 overflow-y-auto">
    {#each groupedOptions() as group (group.title)}
      <div>
        <h4 class="text-sm font-semibold text-gray-500 uppercase mb-2">{group.title}</h4>
        <ul class="space-y-1">
          {#each group.options as opt (opt.optionId)}
            <li class="flex justify-between text-sm">
              <span class="text-gray-700">{opt.optionTitle}</span>
              <span class="text-gray-500">
                {opt.priceUsd === 0 ? 'Incl.' : formatPrice(opt.priceUsd)}
              </span>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>

  <div class="border-t border-gray-200 pt-4 mb-4">
    <div class="flex justify-between items-center">
      <span class="text-lg font-semibold text-gray-900">{priceEstimateLabel}</span>
      <span class="text-2xl font-bold text-blue-600">{formatPrice(totalUsd)}</span>
    </div>
    <p class="text-xs text-gray-500 mt-1">{pricingNote}</p>
  </div>

  <div class="space-y-3">
    <button
      type="button"
      onclick={onRequestQuote}
      class="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
    >
      {requestQuoteLabel}
    </button>

    <div class="flex gap-2">
      <ConfiguratorShare {shareLabel} {copiedLabel} {getShareUrl} />

      <button
        type="button"
        onclick={onReset}
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {resetLabel}
      </button>
    </div>
  </div>
</aside>
