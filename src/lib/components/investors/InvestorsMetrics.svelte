<script lang="ts">
  /**
   * Investors Metrics Component
   *
   * Displays validation metrics placeholder cards.
   */

  import InvestorsMetricCard from './InvestorsMetricCard.svelte';

  interface MetricItem {
    label: string;
    note: string;
  }

  interface Props {
    title: string;
    text: string;
    items: MetricItem[];
  }

  let { title, text, items }: Props = $props();
</script>

<section class="py-12 bg-gray-50">
  <div class="max-w-6xl mx-auto px-6">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">{text}</p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {#each items as item}
        <InvestorsMetricCard label={item.label} note={item.note} />
      {/each}
    </div>
  </div>
</section>
