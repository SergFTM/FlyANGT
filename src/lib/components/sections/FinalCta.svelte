<script lang="ts">
  /**
   * Final CTA Component
   *
   * Call-to-action section at the bottom of pages.
   * Dumb component: accepts props only, no config imports.
   */

  import Button from '../buttons/Button.svelte';

  interface Props {
    title: string;
    text: string;
    button: string;
    buttonHref?: string;
  }

  let { title, text, button, buttonHref = '#' }: Props = $props();
</script>

<section class="bg-blue-600 py-16 px-4">
  <div class="max-w-3xl mx-auto text-center">
    <h2 class="text-3xl font-bold mb-4 text-white">{title}</h2>
    <p class="text-blue-100 mb-8 text-lg">{text}</p>
    <Button href={buttonHref} variant="secondary" size="lg">{button}</Button>
  </div>
</section>
