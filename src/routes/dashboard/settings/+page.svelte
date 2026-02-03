<script lang="ts">
  /**
   * Dashboard Settings Page
   *
   * Note: Only accessible by admin role
   */

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<div>
  <h1 class="text-3xl font-bold mb-6">{data.pageTitle}</h1>

  <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
    <h2 class="text-xl font-semibold mb-2">{data.placeholderTitle}</h2>
    <p class="text-gray-600">{data.placeholderText}</p>
  </div>

  <!-- Future: Settings form will go here -->
  <div class="mt-8 bg-white border border-gray-200 rounded-lg p-6">
    <p class="text-gray-500 text-center">Admin settings (restricted)</p>
  </div>
</div>
