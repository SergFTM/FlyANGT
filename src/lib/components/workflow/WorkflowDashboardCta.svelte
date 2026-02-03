<script lang="ts">
  /**
   * Workflow Dashboard CTA Component
   *
   * Call to action for users to access their dashboard.
   */

  interface Props {
    title: string;
    text: string;
    buttonLabel: string;
    dashboardHref: string;
  }

  let { title, text, buttonLabel, dashboardHref }: Props = $props();
</script>

<section class="py-16 px-4">
  <div class="max-w-2xl mx-auto text-center bg-blue-50 rounded-2xl p-8 border border-blue-100">
    <h2 class="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
    <p class="text-gray-600 mb-6">{text}</p>
    <a
      href={dashboardHref}
      class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
    >
      {buttonLabel}
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
      </svg>
    </a>
  </div>
</section>
