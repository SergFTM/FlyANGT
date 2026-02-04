<script lang="ts">
  /**
   * Admin Detail Component
   *
   * Detail panel showing record fields, raw JSON, status management, and notes.
   */

  import type { LeadRecord, RequestRecord, WorkflowStatus } from '$lib/domain/types';

  interface StatusOption {
    id: WorkflowStatus;
    label: string;
  }

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
    statusLabel: string;
    saveLabel: string;
    addNoteLabel: string;
    archiveLabel: string;
    notesTitle: string;
    notesEmpty: string;
    notesPlaceholder: string;
  }

  interface SourceLabels {
    [key: string]: string;
  }

  interface StatusLabels {
    [key: string]: string;
  }

  interface Props {
    record: LeadRecord | RequestRecord;
    labels: Labels;
    sourceLabels: SourceLabels;
    statusLabels: StatusLabels;
    statusOptions: StatusOption[];
    onClose: () => void;
    onStatusChange: (status: WorkflowStatus) => void;
    onAddNote: (text: string) => void;
    onArchive: () => void;
  }

  let {
    record,
    labels,
    sourceLabels,
    statusLabels,
    statusOptions,
    onClose,
    onStatusChange,
    onAddNote,
    onArchive,
  }: Props = $props();

  let copied = $state(false);
  let noteText = $state('');
  let selectedStatus = $state<WorkflowStatus>(record.status);

  // Reset selected status when record changes
  $effect(() => {
    selectedStatus = record.status;
  });

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

  function handleStatusSave() {
    if (selectedStatus !== record.status) {
      onStatusChange(selectedStatus);
    }
  }

  function handleAddNote() {
    const trimmed = noteText.trim();
    if (trimmed) {
      onAddNote(trimmed);
      noteText = '';
    }
  }

  function handleArchive() {
    onArchive();
  }

  // Extract typed record for lead-specific fields
  const isLead = $derived(record.kind === 'lead');
  const leadRecord = $derived(record.kind === 'lead' ? record : null);
  const isArchived = $derived(record.status === 'archived');
</script>

<div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
  <!-- Header -->
  <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
    <h3 class="font-medium text-gray-900">{labels.title}</h3>
    <button
      type="button"
      class="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
      onclick={onClose}
      aria-label="Close"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <!-- Status Management -->
  <div class="p-4 border-b border-gray-200 bg-gray-50">
    <div class="flex items-end gap-2">
      <div class="flex-1">
        <label for="detail-status" class="block text-xs text-gray-500 mb-1">{labels.statusLabel}</label>
        <select
          id="detail-status"
          bind:value={selectedStatus}
          disabled={isArchived}
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          {#each statusOptions as option}
            <option value={option.id}>{option.label}</option>
          {/each}
        </select>
      </div>
      <button
        type="button"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onclick={handleStatusSave}
        disabled={selectedStatus === record.status || isArchived}
      >
        {labels.saveLabel}
      </button>
      {#if !isArchived}
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
          onclick={handleArchive}
        >
          {labels.archiveLabel}
        </button>
      {/if}
    </div>
  </div>

  <!-- Fields -->
  <div class="p-4 space-y-3 max-h-[300px] overflow-y-auto">
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

  <!-- Internal Notes Section -->
  <div class="border-t border-gray-200">
    <div class="px-4 py-3 bg-gray-50 border-b border-gray-200">
      <span class="text-sm font-medium text-gray-700">{labels.notesTitle}</span>
    </div>

    <!-- Add Note -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex gap-2">
        <textarea
          bind:value={noteText}
          placeholder={labels.notesPlaceholder}
          rows={2}
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        ></textarea>
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-end"
          onclick={handleAddNote}
          disabled={!noteText.trim()}
        >
          {labels.addNoteLabel}
        </button>
      </div>
    </div>

    <!-- Notes List -->
    <div class="max-h-[200px] overflow-y-auto">
      {#if record.internalNotes && record.internalNotes.length > 0}
        {#each record.internalNotes as note (note.id)}
          <div class="px-4 py-3 border-b border-gray-100 last:border-b-0">
            <div class="text-sm text-gray-900 whitespace-pre-wrap">{note.text}</div>
            <div class="mt-1 text-xs text-gray-400">
              {formatDate(note.createdAt)}
              {#if note.author}
                <span class="ml-2">- {note.author}</span>
              {/if}
            </div>
          </div>
        {/each}
      {:else}
        <div class="px-4 py-6 text-center text-sm text-gray-400">
          {labels.notesEmpty}
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
    <pre class="p-4 text-xs font-mono text-gray-700 bg-gray-50 overflow-x-auto max-h-48">{JSON.stringify(record, null, 2)}</pre>
  </div>
</div>
