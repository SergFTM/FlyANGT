<script lang="ts">
  /**
   * Release Check Row Component
   *
   * Individual check item with status, priority, notes.
   * Dumb component: accepts props only.
   */

  import type { ReleaseStatus, ReleasePriority } from '$config/release.config';
  import { formatUpdatedAt } from '$lib/models/release.model';

  interface StatusOption {
    value: ReleaseStatus;
    label: string;
  }

  interface Props {
    id: string;
    title: string;
    text?: string;
    priority: ReleasePriority;
    status: ReleaseStatus;
    notes: string;
    updatedAt: string;
    statusOptions: StatusOption[];
    priorityLabels: Record<ReleasePriority, string>;
    notesPlaceholder: string;
    onStatusChange: (id: string, status: ReleaseStatus) => void;
    onNotesChange: (id: string, notes: string) => void;
  }

  let {
    id,
    title,
    text,
    priority,
    status,
    notes,
    updatedAt,
    statusOptions,
    priorityLabels,
    notesPlaceholder,
    onStatusChange,
    onNotesChange,
  }: Props = $props();

  const priorityColors: Record<ReleasePriority, string> = {
    p0: 'bg-red-100 text-red-700',
    p1: 'bg-amber-100 text-amber-700',
    p2: 'bg-blue-100 text-blue-700',
  };

  const statusColors: Record<ReleaseStatus, string> = {
    todo: 'border-gray-300',
    in_progress: 'border-blue-400 bg-blue-50',
    blocked: 'border-red-400 bg-red-50',
    done: 'border-green-400 bg-green-50',
    na: 'border-gray-200 bg-gray-50 opacity-60',
  };

  const formattedDate = $derived(formatUpdatedAt(updatedAt));

  function handleStatusChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    onStatusChange(id, target.value as ReleaseStatus);
  }

  function handleNotesChange(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    onNotesChange(id, target.value);
  }
</script>

<div class="border rounded-lg p-4 {statusColors[status]} transition-colors">
  <div class="flex flex-col md:flex-row md:items-start gap-4">
    <!-- Title and Priority -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <h4 class="font-medium text-gray-900 truncate">{title}</h4>
        <span class="px-2 py-0.5 text-xs font-medium rounded {priorityColors[priority]}">
          {priorityLabels[priority]}
        </span>
      </div>
      {#if text}
        <p class="text-sm text-gray-600">{text}</p>
      {/if}
      <p class="text-xs text-gray-400 mt-1">{formattedDate}</p>
    </div>

    <!-- Status Select -->
    <div class="w-full md:w-36">
      <select
        value={status}
        onchange={handleStatusChange}
        class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {#each statusOptions as opt}
          <option value={opt.value}>{opt.label}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- Notes -->
  <div class="mt-3">
    <textarea
      value={notes}
      onchange={handleNotesChange}
      placeholder={notesPlaceholder}
      rows="2"
      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    ></textarea>
  </div>
</div>
