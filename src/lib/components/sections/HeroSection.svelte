<script lang="ts">
  /**
   * Hero Section Component
   *
   * Dumb component: accepts props only, no config imports.
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

<section class="relative py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
  <div class="max-w-4xl mx-auto text-center">
    {#if h2}
      <p class="text-indigo-600 font-semibold mb-2">{h2}</p>
    {/if}
    <h1 class="text-5xl font-bold mb-6 text-gray-900">{h1}</h1>
    {#if trustLine}
      <p class="text-xl text-gray-600 mb-8">{trustLine}</p>
    {/if}
    <div class="flex gap-4 justify-center flex-wrap">
      {#if primaryCta}
        <Button href={primaryCtaHref} variant="primary" size="lg">{primaryCta}</Button>
      {/if}
      {#if secondaryCta}
        <Button href={secondaryCtaHref} variant="secondary" size="lg">{secondaryCta}</Button>
      {/if}
    </div>
    {#if microText}
      <p class="text-sm text-gray-500 mt-6">{microText}</p>
    {/if}
  </div>
</section>
