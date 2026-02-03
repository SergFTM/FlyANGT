<script lang="ts">
  /**
   * Token Whitepaper Card Component
   *
   * Card linking to the whitepaper in Trust Center.
   */

  interface Props {
    title: string;
    text: string;
    ctaLabel: string;
    href: string;
  }

  let { title, text, ctaLabel, href }: Props = $props();
</script>

<div class="max-w-4xl mx-auto px-6 py-8">
  <div class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8 border border-indigo-100">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
          <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            {title}
          </h3>
          <p class="text-gray-600">
            {text}
          </p>
        </div>
      </div>
      <a
        href={href}
        class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        {ctaLabel}
      </a>
    </div>
  </div>
</div>
