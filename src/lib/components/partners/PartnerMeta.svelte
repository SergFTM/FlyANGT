<script lang="ts">
  /**
   * Partner Meta Component
   *
   * Displays partner type, region, and status badges.
   */

  interface Props {
    type: string;
    region: string;
    status: string;
    statusLabel: string;
  }

  let { type, region, status, statusLabel }: Props = $props();

  const statusColor = $derived(
    status === 'active' ? 'bg-green-100 text-green-700 border-green-200' :
    status === 'pilot' ? 'bg-blue-100 text-blue-700 border-blue-200' :
    'bg-gray-100 text-gray-600 border-gray-200'
  );
</script>

<div class="flex flex-wrap gap-3 mb-6">
  <span class="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-sm font-medium">
    {type}
  </span>
  <span class="px-3 py-1.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-full text-sm">
    {region}
  </span>
  <span class="px-3 py-1.5 {statusColor} border rounded-full text-sm font-medium">
    {statusLabel}
  </span>
</div>
