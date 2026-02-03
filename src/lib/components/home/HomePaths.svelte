<script lang="ts">
  /**
   * Home Paths Component
   *
   * Three-column cards for customer/investor/partner paths.
   */

  interface PathItem {
    title: string;
    text: string;
    href: string;
  }

  interface Props {
    title: string;
    text: string;
    items: PathItem[];
  }

  let { title, text, items }: Props = $props();
</script>

<section class="py-16 bg-white">
  <div class="max-w-6xl mx-auto px-6">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">{text}</p>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      {#each items as item}
        <a
          href={item.href}
          class="group block p-8 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
        >
          <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          <p class="text-gray-600 mb-4">{item.text}</p>
          <div class="flex items-center gap-2 text-blue-600 font-medium">
            <span>Learn more</span>
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>
