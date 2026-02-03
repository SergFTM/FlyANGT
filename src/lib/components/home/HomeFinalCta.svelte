<script lang="ts">
  /**
   * Home Final CTA Component
   *
   * Bottom call-to-action section with two buttons.
   */

  interface Props {
    title: string;
    text: string;
    buttonPrimary: string;
    buttonPrimaryHref?: string;
    buttonSecondary: string;
    buttonSecondaryHref?: string;
  }

  let {
    title,
    text,
    buttonPrimary,
    buttonPrimaryHref = '/dashboard',
    buttonSecondary,
    buttonSecondaryHref = '/partners',
  }: Props = $props();
</script>

<section class="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
  <div class="max-w-4xl mx-auto px-6 text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
    <p class="text-blue-100 mb-10 text-lg max-w-2xl mx-auto">{text}</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href={buttonPrimaryHref}
        class="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
      >
        {buttonPrimary}
      </a>
      <a
        href={buttonSecondaryHref}
        class="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
      >
        {buttonSecondary}
      </a>
    </div>
  </div>
</section>
