<script lang="ts">
  /**
   * Customers Links Block Component
   *
   * Quick links to related pages.
   */

  interface LinkItem {
    title: string;
    text: string;
    href: string;
  }

  interface Props {
    title: string;
    text: string;
    items: LinkItem[];
  }

  let { title, text, items }: Props = $props();
</script>

<section class="py-12 bg-gray-50">
  <div class="max-w-6xl mx-auto px-6">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
      <p class="text-gray-600">{text}</p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each items as item}
        <a
          href={item.href}
          class="block p-5 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all group"
        >
          <h3 class="font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
            {item.title}
          </h3>
          <p class="text-sm text-gray-600">{item.text}</p>
          <div class="mt-3 flex items-center gap-1 text-emerald-600 text-sm font-medium">
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
