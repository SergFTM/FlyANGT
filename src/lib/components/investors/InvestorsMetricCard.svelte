<script lang="ts">
  /**
   * Investors Metric Card Component
   *
   * Single metric placeholder card.
   */

  interface Props {
    label: string;
    note: string;
  }

  let { label, note }: Props = $props();
</script>

<div class="p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-200 transition-colors">
  <div class="flex items-start gap-3">
    <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
      <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        ></path>
      </svg>
    </div>
    <div>
      <h4 class="font-semibold text-gray-900">{label}</h4>
      <p class="text-sm text-gray-500">{note}</p>
    </div>
  </div>
</div>
