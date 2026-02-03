<script lang="ts">
  /**
   * Home Updates Component
   *
   * Latest updates placeholder section.
   * Will be replaced by CMS later.
   */

  interface UpdateItem {
    title: string;
    text: string;
    date: string;
    href: string;
  }

  interface Props {
    title: string;
    text: string;
    items: UpdateItem[];
  }

  let { title, text, items }: Props = $props();
</script>

<section class="py-16 bg-gray-50">
  <div class="max-w-6xl mx-auto px-6">
    <div class="text-center mb-10">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">{text}</p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each items as item}
        <a
          href={item.href}
          class="group block p-5 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
        >
          <div class="text-xs text-gray-400 mb-2 font-medium">{item.date}</div>
          <h3 class="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          <p class="text-sm text-gray-600 line-clamp-2">{item.text}</p>
        </a>
      {/each}
    </div>
  </div>
</section>
