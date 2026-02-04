<script lang="ts">
  /**
   * Admin List Component
   *
   * List view of records with empty state.
   */

  import type { LeadRecord, RequestRecord } from '$lib/domain/types';
  import AdminRecordCard from './AdminRecordCard.svelte';

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

  interface EmptyLabels {
    title: string;
    text: string;
  }

  interface Props {
    records: (LeadRecord | RequestRecord)[];
    selectedId: string | null;
    labels: Labels;
    sourceLabels: SourceLabels;
    emptyLabels: EmptyLabels;
    onSelect: (id: string) => void;
  }

  let { records, selectedId, labels, sourceLabels, emptyLabels, onSelect }: Props = $props();
</script>

{#if records.length === 0}
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div class="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
      <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    </div>
    <h3 class="text-lg font-medium text-gray-900 mb-1">{emptyLabels.title}</h3>
    <p class="text-sm text-gray-500">{emptyLabels.text}</p>
  </div>
{:else}
  <div class="grid gap-3">
    {#each records as record (record.id)}
      <AdminRecordCard
        {record}
        isSelected={selectedId === record.id}
        {labels}
        {sourceLabels}
        onclick={() => onSelect(record.id)}
      />
    {/each}
  </div>
{/if}
