<script lang="ts">
  /**
   * Configurator Disclaimer Component
   *
   * Bottom disclaimer text.
   */

  interface Props {
    text: string;
  }

  let { text }: Props = $props();
</script>

<section class="py-8 px-4 bg-gray-100 border-t border-gray-200">
  <div class="max-w-4xl mx-auto">
    <p class="text-sm text-gray-500 text-center">{text}</p>
  </div>
</section>
