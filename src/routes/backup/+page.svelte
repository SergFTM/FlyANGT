<script lang="ts">
  /**
   * Backup & Restore Page
   *
   * DEV-ONLY tool for creating and restoring data backups.
   */

  import type { BackupFile, RestoreReport } from '$lib/backup';
  import type { RestoreMode } from '$config/backup.config';

  let { data } = $props();

  // State
  let backupData = $state<BackupFile | null>(null);
  let backupLoading = $state(false);
  let backupCopied = $state(false);

  let restoreJson = $state('');
  let restoreMode = $state<RestoreMode>(data.config.defaults.restoreMode);
  let restoreLoading = $state(false);
  let restoreReport = $state<RestoreReport | null>(null);
  let restoreError = $state<string | null>(null);

  /**
   * Create backup
   */
  async function handleCreateBackup() {
    backupLoading = true;
    backupData = null;

    try {
      const response = await fetch('/api/backup');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      backupData = await response.json();
    } catch (err) {
      console.error('Failed to create backup:', err);
    } finally {
      backupLoading = false;
    }
  }

  /**
   * Download backup as JSON file
   */
  function handleDownloadBackup() {
    if (!backupData) return;

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 16).replace('T', '-').replace(':', '');
    const filename = `${data.config.exportFilePrefix}-export-${dateStr}.json`;

    const json = JSON.stringify(backupData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Copy backup to clipboard
   */
  async function handleCopyBackup() {
    if (!backupData) return;

    try {
      const json = JSON.stringify(backupData, null, 2);
      await navigator.clipboard.writeText(json);
      backupCopied = true;
      setTimeout(() => { backupCopied = false; }, 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = JSON.stringify(backupData, null, 2);
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      backupCopied = true;
      setTimeout(() => { backupCopied = false; }, 2000);
    }
  }

  /**
   * Validate/restore from backup
   */
  async function handleRestore(dryRun: boolean) {
    restoreLoading = true;
    restoreReport = null;
    restoreError = null;

    // Validate JSON
    let backup: BackupFile;
    try {
      backup = JSON.parse(restoreJson);
    } catch {
      restoreError = data.labels.errors.invalidJson;
      restoreLoading = false;
      return;
    }

    // Check size
    if (restoreJson.length > data.config.limits.maxUploadBytes) {
      restoreError = data.labels.errors.tooLarge;
      restoreLoading = false;
      return;
    }

    try {
      const response = await fetch('/api/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: restoreMode,
          dryRun,
          backup,
        }),
      });

      const result = await response.json();
      restoreReport = result;
    } catch (err) {
      restoreError = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      restoreLoading = false;
    }
  }

  /**
   * Download restore report
   */
  function handleDownloadReport() {
    if (!restoreReport) return;

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 16).replace('T', '-').replace(':', '');
    const filename = `${data.config.exportFilePrefix}-report-${dateStr}.json`;

    const json = JSON.stringify(restoreReport, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<svelte:head>
  <title>{data.labels.title}</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <div class="max-w-5xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">{data.labels.title}</h1>
      <p class="text-gray-600 mt-1">{data.labels.subtitle}</p>
      <div class="mt-2 flex flex-wrap gap-2">
        <div class="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg inline-block">
          <span class="text-sm text-amber-700">{data.labels.devOnly}</span>
        </div>
        <div class="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg inline-flex items-center gap-1.5">
          <span class="text-xs text-blue-600">{data.labels.storage.label}:</span>
          <span class="text-sm font-medium text-blue-700">
            {data.storageMode === 'config' ? data.labels.storage.config : data.labels.storage.prisma}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Create Backup Section -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{data.labels.sections.create}</h2>

        <button
          type="button"
          class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          onclick={handleCreateBackup}
          disabled={backupLoading}
        >
          {backupLoading ? '...' : data.labels.actions.create}
        </button>

        {#if backupData}
          <!-- Backup Summary -->
          <div class="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 class="text-sm font-medium text-gray-700 mb-2">{data.labels.summary.counts}</h3>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Leads:</span>
                <span class="font-medium text-gray-900">{backupData.counts.leads}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Requests:</span>
                <span class="font-medium text-gray-900">{backupData.counts.requests}</span>
              </div>
            </div>
            <div class="text-xs text-gray-500 mt-2">
              {backupData.generatedAt}
            </div>
          </div>

          <!-- Backup Actions -->
          <div class="mt-4 flex gap-2">
            <button
              type="button"
              class="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              onclick={handleDownloadBackup}
            >
              {data.labels.actions.download}
            </button>
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              onclick={handleCopyBackup}
            >
              {backupCopied ? data.labels.actions.copyDone : data.labels.actions.copy}
            </button>
          </div>
        {/if}
      </div>

      <!-- Restore Section -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{data.labels.sections.restore}</h2>

        <!-- JSON Input -->
        <textarea
          bind:value={restoreJson}
          placeholder={data.labels.fields.pasteJsonPlaceholder}
          class="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>

        <!-- Restore Mode -->
        <div class="mt-4">
          <label for="restore-mode" class="block text-sm font-medium text-gray-700 mb-1">
            {data.labels.fields.restoreMode}
          </label>
          <select
            id="restore-mode"
            bind:value={restoreMode}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {#each data.restoreModeOptions as mode}
              <option value={mode}>
                {mode === 'merge' ? data.labels.modes.merge : data.labels.modes.overwrite}
              </option>
            {/each}
          </select>
        </div>

        <!-- Overwrite Warning -->
        {#if restoreMode === 'overwrite'}
          <div class="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-700">{data.labels.warning.overwrite}</p>
          </div>
        {/if}

        <!-- Error -->
        {#if restoreError}
          <div class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-700">{restoreError}</p>
          </div>
        {/if}

        <!-- Actions -->
        <div class="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            onclick={() => handleRestore(true)}
            disabled={restoreLoading || !restoreJson.trim()}
          >
            {data.labels.actions.validate}
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            onclick={() => handleRestore(true)}
            disabled={restoreLoading || !restoreJson.trim()}
          >
            {data.labels.actions.dryRun}
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            onclick={() => handleRestore(false)}
            disabled={restoreLoading || !restoreJson.trim()}
          >
            {restoreMode === 'merge' ? data.labels.actions.applyMerge : data.labels.actions.applyOverwrite}
          </button>
        </div>
      </div>
    </div>

    <!-- Restore Report -->
    {#if restoreReport}
      <div class="mt-6 bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">
            {restoreReport.dryRun ? 'Dry Run Report' : 'Restore Report'}
          </h2>
          <button
            type="button"
            class="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            onclick={handleDownloadReport}
          >
            {data.labels.actions.download}
          </button>
        </div>

        <!-- Status Badge -->
        <div class="mb-4">
          {#if restoreReport.success}
            <span class="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
              {restoreReport.dryRun ? 'Validation Passed' : 'Applied Successfully'}
            </span>
          {:else}
            <span class="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
              {restoreReport.errors.length} Error(s)
            </span>
          {/if}
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div class="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div class="text-2xl font-bold text-green-600">{restoreReport.stats.created.total}</div>
            <div class="text-sm text-green-700">{data.labels.report.created}</div>
            <div class="text-xs text-green-600 mt-1">
              {restoreReport.stats.created.leads} leads, {restoreReport.stats.created.requests} requests
            </div>
          </div>
          <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">{restoreReport.stats.updated.total}</div>
            <div class="text-sm text-blue-700">{data.labels.report.updated}</div>
            <div class="text-xs text-blue-600 mt-1">
              {restoreReport.stats.updated.leads} leads, {restoreReport.stats.updated.requests} requests
            </div>
          </div>
          <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div class="text-2xl font-bold text-red-600">{restoreReport.stats.deleted.total}</div>
            <div class="text-sm text-red-700">{data.labels.report.deleted}</div>
            <div class="text-xs text-red-600 mt-1">
              {restoreReport.stats.deleted.leads} leads, {restoreReport.stats.deleted.requests} requests
            </div>
          </div>
        </div>

        <!-- Applied At -->
        {#if restoreReport.appliedAt}
          <div class="mb-4 text-sm text-gray-600">
            Applied at: {restoreReport.appliedAt}
          </div>
        {/if}

        <!-- Errors -->
        {#if restoreReport.errors.length > 0}
          <div class="mb-4">
            <h3 class="text-sm font-medium text-red-700 mb-2">{data.labels.report.errors} ({restoreReport.errors.length})</h3>
            <div class="max-h-40 overflow-y-auto space-y-1">
              {#each restoreReport.errors as error}
                <div class="text-sm text-red-600 bg-red-50 px-3 py-1 rounded">
                  [{error.code}] {error.message}
                  {#if error.recordId}
                    <span class="text-red-500 ml-1">(ID: {error.recordId})</span>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Collisions Preview -->
        {#if restoreReport.collisions.length > 0}
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">
              Collisions (will be updated): {restoreReport.collisions.length}
            </h3>
            <div class="max-h-40 overflow-y-auto">
              <table class="w-full text-sm">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-2 py-1 text-left text-gray-600">ID</th>
                    <th class="px-2 py-1 text-left text-gray-600">Type</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  {#each restoreReport.collisions as collision}
                    <tr>
                      <td class="px-2 py-1 font-mono text-xs text-gray-700">{collision.id}</td>
                      <td class="px-2 py-1 text-gray-600">{collision.kind}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Links to related tools -->
    <div class="mt-8 flex gap-4">
      <a
        href={data.config.links.adminPath}
        class="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
      >
        {data.locale === 'ru' ? 'Админ-панель' : 'Admin Viewer'}
      </a>
      <a
        href={data.config.links.migratePath}
        class="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
      >
        {data.locale === 'ru' ? 'Миграция' : 'Migration Prep'}
      </a>
    </div>
  </div>
</div>
