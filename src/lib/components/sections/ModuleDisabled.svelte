<script lang="ts">
  /**
   * Module Disabled Placeholder
   *
   * Shown when a module is not enabled.
   * Dumb component: accepts props only.
   */

  interface Props {
    title?: string;
    message: string;
  }

  let { title = 'Coming Soon', message }: Props = $props();
</script>

<section class="max-w-4xl mx-auto py-16 px-4">
  <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
    <h1 class="text-2xl font-bold mb-4 text-gray-900">{title}</h1>
    <p class="text-gray-700">{message}</p>
  </div>
</section>
