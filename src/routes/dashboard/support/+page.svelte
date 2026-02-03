<script lang="ts">
  /**
   * Dashboard Support Page
   */

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<div>
  <h1 class="text-3xl font-bold mb-6">{data.pageTitle}</h1>

  <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
    <h2 class="text-xl font-semibold mb-2">{data.placeholderTitle}</h2>
    <p class="text-gray-600">{data.placeholderText}</p>
  </div>

  <!-- Future: Support tickets will go here -->
  <div class="mt-8 bg-white border border-gray-200 rounded-lg p-6">
    <p class="text-gray-500 text-center">No support tickets yet</p>
  </div>
</div>
