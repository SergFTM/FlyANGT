<script lang="ts">
  /**
   * Presale Hero Component
   *
   * Hero section for presale page with headline and CTAs.
   */

  interface Props {
    h1: string;
    h2: string;
    trustLine?: string;
    primaryCta: string;
    secondaryCta: string;
    onPrimaryClick: () => void;
    onSecondaryClick: () => void;
  }

  let {
    h1,
    h2,
    trustLine,
    primaryCta,
    secondaryCta,
    onPrimaryClick,
    onSecondaryClick,
  }: Props = $props();
</script>

<section class="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 px-4">
  <div class="max-w-4xl mx-auto text-center">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">{h1}</h1>
    <h2 class="text-xl md:text-2xl text-blue-100 mb-4">{h2}</h2>

    {#if trustLine}
      <p class="text-blue-200 mb-8">{trustLine}</p>
    {/if}

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        type="button"
        onclick={onPrimaryClick}
        class="px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
      >
        {primaryCta}
      </button>
      <button
        type="button"
        onclick={onSecondaryClick}
        class="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
      >
        {secondaryCta}
      </button>
    </div>
  </div>
</section>
