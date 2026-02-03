<script lang="ts">
  /**
   * Presale Ladder Component
   *
   * Displays the 10-week price ladder.
   */

  import type { PresaleWeekStatus } from '$config/presale.config';
  import PresaleWeekCard from './PresaleWeekCard.svelte';

  interface WeekData {
    week: number;
    label: string;
    priceUsd: number;
    bonus?: string;
    status: PresaleWeekStatus;
    statusLabel: string;
  }

  interface Props {
    title: string;
    text: string;
    weeks: WeekData[];
    currency: string;
  }

  let { title, text, weeks, currency }: Props = $props();
</script>

<section class="py-16 px-4 bg-gray-50">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-10">
      <h2 class="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">{text}</p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
      {#each weeks as week (week.week)}
        <PresaleWeekCard
          week={week.week}
          label={week.label}
          priceUsd={week.priceUsd}
          bonus={week.bonus}
          status={week.status}
          statusLabel={week.statusLabel}
          {currency}
        />
      {/each}
    </div>
  </div>
</section>
