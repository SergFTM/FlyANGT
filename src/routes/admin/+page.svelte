<script lang="ts">
  /**
   * Admin Viewer Page
   *
   * DEV-ONLY tool for viewing and exporting leads and requests.
   */

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { AdminTabId } from '$config/admin.config';
  import type { LeadRecord, RequestRecord, WorkflowStatus } from '$lib/domain/types';
  import {
    AdminTabs,
    AdminFilters,
    AdminList,
    AdminDetail,
  } from '$lib/components/admin';
  import {
    generateExportFilename,
    buildExportData,
    exportJson,
    copyJson,
  } from '$lib/utils/export.utils';

  let { data } = $props();

  // Local state
  let records = $state<(LeadRecord | RequestRecord)[]>([]);
  let loading = $state(true);
  let selectedId = $state<string | null>(null);
  let copied = $state(false);
  let saveMessage = $state<string | null>(null);

  // Derived filters from URL
  let activeTab = $derived(data.filters.tab);
  let sourceFilter = $derived(data.filters.source);
  let statusFilter = $derived(data.filters.status);
  let searchQuery = $derived(data.filters.search);
  let limit = $derived(data.filters.limit);

  // Selected record
  const selectedRecord = $derived(
    records.find(r => r.id === selectedId) || null
  );

  // Filtered records (client-side search filtering)
  const filteredRecords = $derived(() => {
    if (!searchQuery) return records;
    const q = searchQuery.toLowerCase();
    return records.filter(r => {
      if (r.id.toLowerCase().includes(q)) return true;
      if (r.kind === 'lead') {
        if (r.email?.toLowerCase().includes(q)) return true;
        if (r.name?.toLowerCase().includes(q)) return true;
      }
      return false;
    });
  });

  // Fetch records from API
  async function fetchRecords() {
    loading = true;
    selectedId = null;

    try {
      const endpoint = activeTab === 'leads' ? '/api/leads' : '/api/requests';
      const params = new URLSearchParams();
      if (sourceFilter) params.set('source', sourceFilter);
      if (statusFilter) params.set('status', statusFilter);
      params.set('limit', String(limit));

      const response = await fetch(`${endpoint}?${params}`);
      const result = await response.json();

      if (result.ok) {
        records = result.data || [];
      } else {
        records = [];
      }
    } catch {
      records = [];
    } finally {
      loading = false;
    }
  }

  // Update URL and refetch when filters change
  function updateFilters(updates: Record<string, string | number>) {
    const url = new URL($page.url);

    for (const [key, value] of Object.entries(updates)) {
      if (value === '' || value === null || value === undefined) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, String(value));
      }
    }

    goto(url.toString(), { replaceState: true, noScroll: true });
  }

  function handleTabChange(tab: AdminTabId) {
    updateFilters({ tab, source: '', status: '', q: '' });
  }

  function handleSourceChange(source: string) {
    updateFilters({ source });
  }

  function handleStatusChange(status: string) {
    updateFilters({ status });
  }

  function handleSearchChange(query: string) {
    updateFilters({ q: query });
  }

  function handleLimitChange(newLimit: number) {
    updateFilters({ limit: newLimit });
  }

  function handleSelectRecord(id: string) {
    selectedId = selectedId === id ? null : id;
  }

  function handleCloseDetail() {
    selectedId = null;
  }

  // Export actions
  function handleExport() {
    const exportData = buildExportData(
      filteredRecords(),
      activeTab,
      sourceFilter,
      searchQuery,
      limit
    );
    const filename = generateExportFilename(data.config.exportFilePrefix, activeTab);
    exportJson(filename, exportData);
  }

  async function handleCopy() {
    const exportData = buildExportData(
      filteredRecords(),
      activeTab,
      sourceFilter,
      searchQuery,
      limit
    );
    const success = await copyJson(exportData);
    if (success) {
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    }
  }

  // Workflow actions
  async function handleRecordUpdate(id: string, patch: Record<string, unknown>) {
    const endpoint = activeTab === 'leads' ? `/api/leads/${id}` : `/api/requests/${id}`;

    try {
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });

      const result = await response.json();

      if (result.ok && result.record) {
        // Update record in local state
        records = records.map(r => r.id === id ? result.record : r);
        saveMessage = data.labels.messages.saved;
        setTimeout(() => {
          saveMessage = null;
        }, 2000);
        return true;
      } else {
        saveMessage = data.labels.messages.error;
        setTimeout(() => {
          saveMessage = null;
        }, 3000);
        return false;
      }
    } catch {
      saveMessage = data.labels.messages.error;
      setTimeout(() => {
        saveMessage = null;
      }, 3000);
      return false;
    }
  }

  function handleStatusUpdate(id: string, status: WorkflowStatus) {
    handleRecordUpdate(id, { status });
  }

  function handleAddNote(id: string, text: string) {
    handleRecordUpdate(id, { noteText: text });
  }

  function handleArchive(id: string) {
    handleRecordUpdate(id, { archived: true });
  }

  // Fetch on mount and when URL changes
  $effect(() => {
    // Dependencies: activeTab, sourceFilter, statusFilter, limit
    void activeTab;
    void sourceFilter;
    void statusFilter;
    void limit;
    fetchRecords();
  });
</script>

<svelte:head>
  <title>{data.labels.title}</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">{data.labels.title}</h1>
      <p class="text-gray-600 mt-1">{data.labels.subtitle}</p>
      <div class="mt-2 flex flex-wrap gap-2">
        <div class="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg inline-block">
          <span class="text-sm text-amber-700">{data.labels.devOnly}</span>
        </div>
        <!-- Storage mode indicator (DEV only) -->
        <div class="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg inline-flex items-center gap-1.5">
          <span class="text-xs text-blue-600">{data.labels.storage.label}:</span>
          <span class="text-sm font-medium text-blue-700">
            {data.storageMode === 'config' ? data.labels.storage.config : data.labels.storage.prisma}
          </span>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="mb-6 max-w-xs">
      <AdminTabs
        {activeTab}
        leadsLabel={data.labels.tabs.leads}
        requestsLabel={data.labels.tabs.requests}
        onTabChange={handleTabChange}
      />
    </div>

    <!-- Filters and Actions Row -->
    <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div class="flex flex-wrap gap-3 items-end">
        <AdminFilters
          {sourceFilter}
          {searchQuery}
          {limit}
          sources={data.sourceOptions}
          limits={data.config.filters.limits}
          sourceLabel={data.labels.filters.source}
          searchLabel={data.labels.filters.search}
          limitLabel={data.labels.filters.limit}
          allSourcesLabel={data.labels.filters.all}
          onSourceChange={handleSourceChange}
          onSearchChange={handleSearchChange}
          onLimitChange={handleLimitChange}
        />

        <!-- Status filter -->
        <div class="flex flex-col gap-1">
          <label for="admin-status" class="text-xs text-gray-500 font-medium">{data.labels.filters.status}</label>
          <select
            id="admin-status"
            value={statusFilter}
            onchange={(e) => handleStatusChange((e.target as HTMLSelectElement).value)}
            class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{data.labels.filters.all}</option>
            {#each data.statusOptions as status}
              <option value={status.id}>{status.label}</option>
            {/each}
          </select>
        </div>
      </div>

      <div class="flex gap-2 flex-wrap">
        <!-- Export/Copy -->
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          onclick={handleExport}
        >
          {data.labels.actions.export}
        </button>
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          onclick={handleCopy}
        >
          {copied ? data.labels.actions.copyDone : data.labels.actions.copy}
        </button>

        <!-- API Links -->
        <a
          href="{data.config.links.apiLeads}?limit=50"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
        >
          {data.labels.actions.openApiLeads}
        </a>
        <a
          href="{data.config.links.apiRequests}?limit=50"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
        >
          {data.labels.actions.openApiRequests}
        </a>

        <!-- Dev Tools -->
        <a
          href="/backup"
          class="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
        >
          Backup
        </a>
        {#if data.retentionConfig?.enabled}
          <a
            href="/retention"
            class="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
          >
            {data.labels.retention.title}
          </a>
        {/if}
      </div>
    </div>

    <!-- Save message toast -->
    {#if saveMessage}
      <div class="fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 {saveMessage === data.labels.messages.saved ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}">
        {saveMessage}
      </div>
    {/if}

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- List -->
      <div class="lg:col-span-2">
        <div class="bg-white border border-gray-200 rounded-lg p-4 min-h-[400px]">
          {#if loading}
            <div class="flex items-center justify-center py-12">
              <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          {:else}
            <AdminList
              records={filteredRecords()}
              {selectedId}
              labels={data.labels.fields}
              sourceLabels={data.labels.sources}
              statusLabels={data.labels.statuses}
              emptyLabels={{
                title: data.labels.list.emptyTitle,
                text: data.labels.list.emptyText,
              }}
              onSelect={handleSelectRecord}
            />
          {/if}
        </div>
      </div>

      <!-- Detail Panel -->
      <div class="lg:col-span-1">
        {#if selectedRecord}
          <AdminDetail
            record={selectedRecord}
            labels={{
              title: data.labels.detail.title,
              rawJson: data.labels.detail.rawJson,
              ...data.labels.fields,
              copyLabel: data.labels.actions.copy,
              copyDoneLabel: data.labels.actions.copyDone,
              statusLabel: data.labels.filters.status,
              saveLabel: data.labels.actions.saveStatus,
              addNoteLabel: data.labels.actions.addNote,
              archiveLabel: data.labels.actions.archiveRecord,
              notesTitle: data.labels.notes.title,
              notesEmpty: data.labels.notes.empty,
              notesPlaceholder: data.labels.notes.placeholder,
            }}
            sourceLabels={data.labels.sources}
            statusLabels={data.labels.statuses}
            statusOptions={data.statusOptions}
            onClose={handleCloseDetail}
            onStatusChange={(status) => handleStatusUpdate(selectedRecord.id, status)}
            onAddNote={(text) => handleAddNote(selectedRecord.id, text)}
            onArchive={() => handleArchive(selectedRecord.id)}
          />
        {:else}
          <div class="bg-gray-100 border border-gray-200 rounded-lg p-8 text-center">
            <div class="text-gray-400 mb-2">
              <svg class="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p class="text-sm text-gray-500">
              {data.locale === 'ru' ? 'Выберите запись для просмотра деталей' : 'Select a record to view details'}
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
