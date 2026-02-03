<script lang="ts">
  /**
   * Dashboard Overview Page
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

  <!-- Future: Dashboard widgets will go here -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="text-gray-400 text-sm uppercase mb-2">Projects</div>
      <div class="text-3xl font-bold text-gray-900">0</div>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="text-gray-400 text-sm uppercase mb-2">Documents</div>
      <div class="text-3xl font-bold text-gray-900">0</div>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="text-gray-400 text-sm uppercase mb-2">Requests</div>
      <div class="text-3xl font-bold text-gray-900">0</div>
    </div>
  </div>
</div>
