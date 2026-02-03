<script lang="ts">
  /**
   * Presale Week Card Component
   *
   * Single week card in the price ladder.
   */

  import type { PresaleWeekStatus } from '$config/presale.config';

  interface Props {
    week: number;
    label: string;
    priceUsd: number;
    bonus?: string;
    status: PresaleWeekStatus;
    statusLabel: string;
    currency: string;
  }

  let { week, label, priceUsd, bonus, status, statusLabel, currency }: Props = $props();

  function getStatusStyles(s: PresaleWeekStatus): string {
    switch (s) {
      case 'active':
        return 'border-green-500 bg-green-50';
      case 'completed':
        return 'border-gray-300 bg-gray-50 opacity-75';
      case 'upcoming':
      default:
        return 'border-blue-200 bg-white';
    }
  }

  function getStatusBadgeStyles(s: PresaleWeekStatus): string {
    switch (s) {
      case 'active':
        return 'bg-green-500 text-white';
      case 'completed':
        return 'bg-gray-400 text-white';
      case 'upcoming':
      default:
        return 'bg-blue-100 text-blue-800';
    }
  }
</script>

<div class="border-2 rounded-lg p-4 {getStatusStyles(status)} transition-all hover:shadow-md">
  <div class="flex justify-between items-start mb-2">
    <span class="font-semibold text-gray-900">{label}</span>
    <span class="px-2 py-1 text-xs rounded-full {getStatusBadgeStyles(status)}">
      {statusLabel}
    </span>
  </div>

  <div class="text-2xl font-bold text-gray-900 mb-1">
    ${priceUsd.toFixed(2)}
    <span class="text-sm font-normal text-gray-500">/ token</span>
  </div>

  {#if bonus}
    <div class="text-sm text-green-600 font-medium">
      {bonus}
    </div>
  {/if}
</div>
