<script lang="ts">
  /**
   * Investors Hero Component
   *
   * Hero section for investor landing page.
   */

  interface Props {
    h1: string;
    h2: string;
    primaryCta: string;
    primaryCtaHref: string;
    secondaryCta: string;
    secondaryCtaHref: string;
    microText?: string;
  }

  let { h1, h2, primaryCta, primaryCtaHref, secondaryCta, secondaryCtaHref, microText }: Props =
    $props();
</script>

<section class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
  <div class="max-w-4xl mx-auto px-6 text-center">
    <h1 class="text-4xl md:text-5xl font-bold mb-6">{h1}</h1>
    <p class="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">{h2}</p>

    <div class="flex flex-col sm:flex-row gap-4 justify-center mb-4">
      <a
        href={primaryCtaHref}
        class="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
      >
        {primaryCta}
      </a>
      <a
        href={secondaryCtaHref}
        class="px-8 py-3 border border-slate-500 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors"
      >
        {secondaryCta}
      </a>
    </div>

    {#if microText}
      <p class="text-sm text-slate-400">{microText}</p>
    {/if}
  </div>
</section>
