<script lang="ts">
  /**
   * Workflow Step Card Component
   *
   * Card displaying a single workflow step overview.
   */

  interface Props {
    order: number;
    title: string;
    summary: string;
    href: string;
  }

  let { order, title, summary, href }: Props = $props();
</script>

<a
  {href}
  class="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all group"
>
  <div class="flex items-start gap-4">
    <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
      {order}
    </div>
    <div class="flex-1 min-w-0">
      <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
        {title}
      </h3>
      <p class="text-gray-600 text-sm line-clamp-2">
        {summary}
      </p>
    </div>
    <div class="flex-shrink-0 text-gray-400 group-hover:text-blue-600 transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </div>
  </div>
</a>
