<script lang="ts">
  /**
   * Configurator Steps Component
   *
   * Horizontal steps showing how the configurator works.
   */

  interface StepItem {
    title: string;
    text: string;
  }

  interface Props {
    title: string;
    items: StepItem[];
  }

  let { title, items }: Props = $props();
</script>

<section class="py-12 px-4 bg-gray-50">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-900 text-center mb-8">{title}</h2>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      {#each items as item, index (index)}
        <div class="relative">
          <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200 h-full">
            <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
              {index + 1}
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p class="text-gray-600 text-sm">{item.text}</p>
          </div>

          {#if index < items.length - 1}
            <div class="hidden md:block absolute top-12 -right-3 w-6 text-gray-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
