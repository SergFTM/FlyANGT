<script lang="ts">
  /**
   * Home Hero Component
   *
   * Main hero section for the home page with gradient background.
   */

  import Button from '../buttons/Button.svelte';

  interface Props {
    h1: string;
    h2?: string;
    trustLine?: string;
    primaryCta?: string;
    primaryCtaHref?: string;
    secondaryCta?: string;
    secondaryCtaHref?: string;
    microText?: string;
  }

  let {
    h1,
    h2 = '',
    trustLine = '',
    primaryCta = '',
    primaryCtaHref = '#',
    secondaryCta = '',
    secondaryCtaHref = '#',
    microText = '',
  }: Props = $props();
</script>

<section class="relative py-24 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
  <div class="max-w-5xl mx-auto text-center relative z-10">
    {#if h2}
      <p class="text-blue-400 font-semibold mb-3 tracking-wide uppercase text-sm">{h2}</p>
    {/if}
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{h1}</h1>
    {#if trustLine}
      <p class="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">{trustLine}</p>
    {/if}
    <div class="flex gap-4 justify-center flex-wrap">
      {#if primaryCta}
        <a
          href={primaryCtaHref}
          class="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25"
        >
          {primaryCta}
        </a>
      {/if}
      {#if secondaryCta}
        <a
          href={secondaryCtaHref}
          class="px-8 py-4 border-2 border-slate-500 text-white font-semibold rounded-lg hover:bg-slate-700/50 transition-colors"
        >
          {secondaryCta}
        </a>
      {/if}
    </div>
    {#if microText}
      <p class="text-sm text-slate-400 mt-8">{microText}</p>
    {/if}
  </div>
</section>
