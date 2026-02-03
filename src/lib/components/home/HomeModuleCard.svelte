<script lang="ts">
  /**
   * Home Module Card Component
   *
   * Single module card for the modules grid.
   */

  interface Props {
    title: string;
    href: string;
    cardLabel: string;
  }

  let { title, href, cardLabel }: Props = $props();
</script>

<a
  {href}
  class="group block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
>
  <h3 class="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
    {title}
  </h3>
  <div class="flex items-center gap-1 text-blue-600 text-sm font-medium">
    <span>{cardLabel}</span>
    <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
    </svg>
  </div>
</a>
