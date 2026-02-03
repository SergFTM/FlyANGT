<script lang="ts">
  /**
   * Partners Trust Block Component
   *
   * Links to Trust Center for partner documentation.
   */

  interface Props {
    title: string;
    text: string;
    button: string;
    href: string;
  }

  let { title, text, button, href }: Props = $props();
</script>

<section class="py-12 bg-gray-50">
  <div class="max-w-4xl mx-auto px-6">
    <div class="bg-white rounded-xl border border-gray-200 p-8 text-center">
      <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
        <svg class="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
      <p class="text-gray-600 mb-6 max-w-xl mx-auto">{text}</p>
      <a
        {href}
        class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
      >
        {button}
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </a>
    </div>
  </div>
</section>
