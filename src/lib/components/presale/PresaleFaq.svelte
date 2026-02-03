<script lang="ts">
  /**
   * Presale FAQ Component
   *
   * Accordion-style FAQ section.
   */

  interface FaqItem {
    q: string;
    a: string;
  }

  interface Props {
    title: string;
    items: FaqItem[];
  }

  let { title, items }: Props = $props();

  let openIndex = $state<number | null>(null);

  function toggle(index: number) {
    openIndex = openIndex === index ? null : index;
  }
</script>

<section class="py-16 px-4 bg-white">
  <div class="max-w-3xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-900 text-center mb-10">{title}</h2>

    <div class="space-y-4">
      {#each items as item, index (index)}
        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onclick={() => toggle(index)}
            class="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span class="font-medium text-gray-900">{item.q}</span>
            <svg
              class="w-5 h-5 text-gray-500 transition-transform {openIndex === index ? 'rotate-180' : ''}"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {#if openIndex === index}
            <div class="px-6 py-4 bg-white">
              <p class="text-gray-600">{item.a}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
