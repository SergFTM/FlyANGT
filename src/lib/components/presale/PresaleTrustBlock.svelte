<script lang="ts">
  /**
   * Presale Trust Block Component
   *
   * Links to the Trust Center for document review.
   */

  interface Props {
    title: string;
    text: string;
    button: string;
    trustCenterHref: string;
  }

  let { title, text, button, trustCenterHref }: Props = $props();
</script>

<section class="py-16 px-4 bg-blue-50">
  <div class="max-w-3xl mx-auto text-center">
    <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
      <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    </div>

    <h2 class="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
    <p class="text-gray-600 mb-6 max-w-xl mx-auto">{text}</p>

    <a
      href={trustCenterHref}
      class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {button}
    </a>
  </div>
</section>
