<script lang="ts">
  /**
   * Admin Record Card Component
   *
   * Individual record card in the list view.
   */

  import type { LeadRecord, RequestRecord } from '$lib/domain/types';

  interface Labels {
    id: string;
    createdAt: string;
    source: string;
    email: string;
    name: string;
  }

  interface SourceLabels {
    [key: string]: string;
  }

  interface Props {
    record: LeadRecord | RequestRecord;
    isSelected: boolean;
    labels: Labels;
    sourceLabels: SourceLabels;
    onclick: () => void;
  }

  let { record, isSelected, labels, sourceLabels, onclick }: Props = $props();

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Extract display fields based on record type
  const email = $derived(record.kind === 'lead' ? record.email : undefined);
  const name = $derived(record.kind === 'lead' ? record.name : undefined);
</script>

<button
  type="button"
  class="w-full text-left p-4 border rounded-lg transition-colors {isSelected
    ? 'border-blue-500 bg-blue-50'
    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}"
  onclick={onclick}
>
  <div class="flex items-start justify-between gap-2 mb-2">
    <code class="text-xs text-gray-500 font-mono truncate flex-1">{record.id}</code>
    <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700 whitespace-nowrap">
      {sourceLabels[record.source] || record.source}
    </span>
  </div>

  {#if email || name}
    <div class="space-y-1">
      {#if email}
        <div class="text-sm text-gray-900 truncate">{email}</div>
      {/if}
      {#if name}
        <div class="text-sm text-gray-600 truncate">{name}</div>
      {/if}
    </div>
  {:else if record.kind === 'request'}
    <div class="text-sm text-gray-600">
      {record.source} request
    </div>
  {/if}

  <div class="mt-2 text-xs text-gray-400">
    {formatDate(record.createdAt)}
  </div>
</button>
