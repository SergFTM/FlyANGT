<script lang="ts">
  /**
   * Home Quick Actions Component
   *
   * Grid of quick action links (Presale, Configurator, Token, Dashboard).
   */

  interface QuickItem {
    title: string;
    text: string;
    href: string;
  }

  interface Props {
    title: string;
    text: string;
    items: QuickItem[];
  }

  let { title, text, items }: Props = $props();
</script>

<section class="py-16 bg-white">
  <div class="max-w-6xl mx-auto px-6">
    <div class="text-center mb-10">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">{text}</p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each items as item}
        <a
          href={item.href}
          class="group block p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50"
        >
          <h3 class="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          <p class="text-sm text-gray-600">{item.text}</p>
        </a>
      {/each}
    </div>
  </div>
</section>
