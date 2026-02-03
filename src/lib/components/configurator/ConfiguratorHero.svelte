<script lang="ts">
  /**
   * Configurator Hero Component
   *
   * Hero section for configurator page.
   */

  interface Props {
    h1: string;
    h2: string;
    primaryCta: string;
    secondaryCta: string;
    onPrimaryClick: () => void;
    onSecondaryClick: () => void;
  }

  let { h1, h2, primaryCta, secondaryCta, onPrimaryClick, onSecondaryClick }: Props = $props();
</script>

<section class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4">
  <div class="max-w-4xl mx-auto text-center">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">{h1}</h1>
    <h2 class="text-xl md:text-2xl text-slate-300 mb-8">{h2}</h2>

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        type="button"
        onclick={onPrimaryClick}
        class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        {primaryCta}
      </button>
      <button
        type="button"
        onclick={onSecondaryClick}
        class="px-8 py-3 border-2 border-slate-500 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors"
      >
        {secondaryCta}
      </button>
    </div>
  </div>
</section>
