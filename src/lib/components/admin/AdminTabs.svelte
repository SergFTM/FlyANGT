<script lang="ts">
  /**
   * Admin Tabs Component
   *
   * Tab switcher for leads/requests views.
   */

  import type { AdminTabId } from '$config/admin.config';

  interface Props {
    activeTab: AdminTabId;
    leadsLabel: string;
    requestsLabel: string;
    onTabChange: (tab: AdminTabId) => void;
  }

  let { activeTab, leadsLabel, requestsLabel, onTabChange }: Props = $props();

  const tabs: { id: AdminTabId; label: string }[] = $derived([
    { id: 'leads', label: leadsLabel },
    { id: 'requests', label: requestsLabel },
  ]);
</script>

<div class="flex gap-1 p-1 bg-gray-100 rounded-lg">
  {#each tabs as tab}
    <button
      type="button"
      class="flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors {activeTab === tab.id
        ? 'bg-white text-gray-900 shadow-sm'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}"
      onclick={() => onTabChange(tab.id)}
    >
      {tab.label}
    </button>
  {/each}
</div>
