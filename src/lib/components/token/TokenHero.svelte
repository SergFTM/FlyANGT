<script lang="ts">
  /**
   * Token Hero Component
   *
   * Hero section for tokenization page with title and CTAs.
   */

  interface Props {
    h1: string;
    h2: string;
    primaryCta: string;
    secondaryCta: string;
    primaryHref: string;
    secondaryHref: string;
  }

  let { h1, h2, primaryCta, secondaryCta, primaryHref, secondaryHref }: Props = $props();
</script>

<section class="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
  <div class="max-w-4xl mx-auto px-6 text-center">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      {h1}
    </h1>
    <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      {h2}
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href={primaryHref}
        class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        {primaryCta}
      </a>
      <a
        href={secondaryHref}
        class="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
      >
        {secondaryCta}
      </a>
    </div>
  </div>
</section>
