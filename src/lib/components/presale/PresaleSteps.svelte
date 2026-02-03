<script lang="ts">
  /**
   * Presale Steps Component
   *
   * Timeline showing how the presale works.
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

<section class="py-16 px-4 bg-gray-50">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">{title}</h2>

    <div class="relative">
      <!-- Vertical line -->
      <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 -translate-x-1/2"></div>

      <div class="space-y-8">
        {#each items as item, index (index)}
          <div class="relative flex items-start gap-6 md:gap-8 {index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}">
            <!-- Circle marker -->
            <div class="absolute left-4 md:left-1/2 w-8 h-8 bg-blue-600 rounded-full -translate-x-1/2 flex items-center justify-center text-white font-bold text-sm z-10">
              {index + 1}
            </div>

            <!-- Content card -->
            <div class="ml-12 md:ml-0 md:w-1/2 {index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}">
              <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p class="text-gray-600">{item.text}</p>
              </div>
            </div>

            <!-- Spacer for alternating layout -->
            <div class="hidden md:block md:w-1/2"></div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
