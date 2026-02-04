<script lang="ts">
  /**
   * Admin Detail Component
   *
   * Detail panel showing record fields and raw JSON.
   */

  import type { LeadRecord, RequestRecord } from '$lib/domain/types';

  interface Labels {
    title: string;
    rawJson: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    source: string;
    email: string;
    name: string;
    phone: string;
    copyLabel: string;
    copyDoneLabel: string;
  }

  interface SourceLabels {
    [key: string]: string;
  }

  interface Props {
    record: LeadRecord | RequestRecord;
    labels: Labels;
    sourceLabels: SourceLabels;
    onClose: () => void;
  }

  let { record, labels, sourceLabels, onClose }: Props = $props();

  let copied = $state(false);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(record, null, 2));
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    } catch {
      // Clipboard API not available
    }
  }

  // Extract typed record for lead-specific fields
  const isLead = $derived(record.kind === 'lead');
  const leadRecord = $derived(record.kind === 'lead' ? record : null);
</script>

<div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
  <!-- Header -->
  <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
    <h3 class="font-medium text-gray-900">{labels.title}</h3>
    <button
      type="button"
      class="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
      onclick={onClose}
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <!-- Fields -->
  <div class="p-4 space-y-3">
    <!-- ID -->
    <div>
      <div class="text-xs text-gray-500 mb-1">{labels.id}</div>
      <code class="text-sm text-gray-900 font-mono break-all">{record.id}</code>
    </div>

    <!-- Source -->
    <div>
      <div class="text-xs text-gray-500 mb-1">{labels.source}</div>
      <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
        {sourceLabels[record.source] || record.source}
      </span>
    </div>

    <!-- Lead-specific fields -->
    {#if isLead && leadRecord}
      {#if leadRecord.email}
        <div>
          <div class="text-xs text-gray-500 mb-1">{labels.email}</div>
          <div class="text-sm text-gray-900">{leadRecord.email}</div>
        </div>
      {/if}

      {#if leadRecord.name}
        <div>
          <div class="text-xs text-gray-500 mb-1">{labels.name}</div>
          <div class="text-sm text-gray-900">{leadRecord.name}</div>
        </div>
      {/if}

      {#if leadRecord.phone}
        <div>
          <div class="text-xs text-gray-500 mb-1">{labels.phone}</div>
          <div class="text-sm text-gray-900">{leadRecord.phone}</div>
        </div>
      {/if}

      {#if leadRecord.country}
        <div>
          <div class="text-xs text-gray-500 mb-1">Country</div>
          <div class="text-sm text-gray-900">{leadRecord.country}</div>
        </div>
      {/if}

      {#if leadRecord.company}
        <div>
          <div class="text-xs text-gray-500 mb-1">Company</div>
          <div class="text-sm text-gray-900">{leadRecord.company}</div>
        </div>
      {/if}

      {#if leadRecord.interest}
        <div>
          <div class="text-xs text-gray-500 mb-1">Interest</div>
          <div class="text-sm text-gray-900">{leadRecord.interest}</div>
        </div>
      {/if}

      {#if leadRecord.notes}
        <div>
          <div class="text-xs text-gray-500 mb-1">Notes</div>
          <div class="text-sm text-gray-900 whitespace-pre-wrap">{leadRecord.notes}</div>
        </div>
      {/if}
    {/if}

    <!-- Dates -->
    <div class="flex gap-4">
      <div class="flex-1">
        <div class="text-xs text-gray-500 mb-1">{labels.createdAt}</div>
        <div class="text-sm text-gray-900">{formatDate(record.createdAt)}</div>
      </div>
      {#if record.updatedAt && record.updatedAt !== record.createdAt}
        <div class="flex-1">
          <div class="text-xs text-gray-500 mb-1">{labels.updatedAt}</div>
          <div class="text-sm text-gray-900">{formatDate(record.updatedAt)}</div>
        </div>
      {/if}
    </div>
  </div>

  <!-- Raw JSON -->
  <div class="border-t border-gray-200">
    <div class="flex items-center justify-between px-4 py-2 bg-gray-50">
      <span class="text-xs font-medium text-gray-500">{labels.rawJson}</span>
      <button
        type="button"
        class="text-xs text-blue-600 hover:text-blue-700 font-medium"
        onclick={copyJson}
      >
        {copied ? labels.copyDoneLabel : labels.copyLabel}
      </button>
    </div>
    <pre class="p-4 text-xs font-mono text-gray-700 bg-gray-50 overflow-x-auto max-h-64">{JSON.stringify(record, null, 2)}</pre>
  </div>
</div>
