<script lang="ts">
  /**
   * Presale Calculator Component
   *
   * Calculates estimated tokens based on USD input.
   * All logic is client-side only.
   */

  interface Props {
    title: string;
    text: string;
    inputLabel: string;
    outputLabel: string;
    listingLabel: string;
    minError: string;
    maxError: string;
    activeWeekPrice: number;
    minCommitUsd: number;
    maxCommitUsd?: number;
    showListingComparison: boolean;
    assumedListingPriceUsd?: number;
    currency: string;
  }

  let {
    title,
    text,
    inputLabel,
    outputLabel,
    listingLabel,
    minError,
    maxError,
    activeWeekPrice,
    minCommitUsd,
    maxCommitUsd,
    showListingComparison,
    assumedListingPriceUsd,
    currency,
  }: Props = $props();

  let amountUsd = $state<number | ''>('');
  let errorMessage = $state<string | null>(null);

  // Derived calculations
  let estimatedTokens = $derived(() => {
    if (typeof amountUsd !== 'number' || amountUsd <= 0 || activeWeekPrice <= 0) return 0;
    return amountUsd / activeWeekPrice;
  });

  let estimatedListingValue = $derived(() => {
    if (!showListingComparison || !assumedListingPriceUsd) return 0;
    return estimatedTokens() * assumedListingPriceUsd;
  });

  function validateAmount(value: number | ''): string | null {
    if (value === '' || value <= 0) return null;
    if (value < minCommitUsd) return minError;
    if (maxCommitUsd && value > maxCommitUsd) return maxError;
    return null;
  }

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value === '' ? '' : parseFloat(target.value);
    amountUsd = value;
    errorMessage = validateAmount(value);
  }

  function formatNumber(num: number): string {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }

  function formatCurrency(num: number): string {
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
</script>

<section id="calculator" class="py-16 px-4 bg-white">
  <div class="max-w-2xl mx-auto">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
      <p class="text-gray-600">{text}</p>
    </div>

    <div class="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div class="mb-6">
        <label for="amount-input" class="block text-sm font-medium text-gray-700 mb-2">
          {inputLabel}
        </label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            id="amount-input"
            type="number"
            value={amountUsd}
            oninput={handleInput}
            min="0"
            step="100"
            placeholder="100"
            class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {#if errorMessage}
          <p class="mt-2 text-sm text-red-600">{errorMessage}</p>
        {/if}
      </div>

      <div class="space-y-4">
        <div class="flex justify-between items-center py-3 border-b border-gray-200">
          <span class="text-gray-600">{outputLabel}</span>
          <span class="text-2xl font-bold text-gray-900">
            {formatNumber(estimatedTokens())} ANGT
          </span>
        </div>

        {#if showListingComparison && assumedListingPriceUsd}
          <div class="flex justify-between items-center py-3">
            <span class="text-gray-600">{listingLabel}</span>
            <span class="text-xl font-semibold text-green-600">
              {formatCurrency(estimatedListingValue())}
            </span>
          </div>
        {/if}
      </div>

      <div class="mt-4 text-xs text-gray-500 text-center">
        Current price: ${activeWeekPrice.toFixed(2)} / token
      </div>
    </div>
  </div>
</section>
