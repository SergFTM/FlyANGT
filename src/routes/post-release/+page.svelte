<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { postReleaseStore } from '$lib/postRelease/store';
  import {
    renderPostReleaseMd,
    getPostReleaseStrings,
    generateExportFilename,
  } from '$lib/postRelease/markdown';
  import {
    createReportFromPacket,
    type PostReleaseReport,
    type SavedReportRef,
    type PostReleaseItem,
    type ActionItem,
    type ChecklistSummary,
    type IncludedFile,
    type PostReleaseGateStatus,
    type PostReleaseEnvironment,
  } from '$lib/postRelease/types';
  import type { SavedPacketRef, PublishPacket } from '$lib/publish/types';

  let { data } = $props();

  // State
  let packets = $state<SavedPacketRef[]>([]);
  let selectedPacketId = $state<string>('');
  let reports = $state<SavedReportRef[]>([]);
  let currentReport = $state<PostReleaseReport | null>(null);
  let previewLanguage = $state<'en' | 'ru'>('en');
  let copyState = $state<Record<string, boolean>>({});

  // Form fields for editing
  let releaseDate = $state<string>('');
  let environment = $state<PostReleaseEnvironment | ''>('');
  let deployUrl = $state<string>('');
  let releaseTagOrCommit = $state<string>('');
  let actualGateStatus = $state<PostReleaseGateStatus | ''>('');
  let notes = $state<string>('');

  // Lists
  let issuesFound = $state<PostReleaseItem[]>([]);
  let incidents = $state<PostReleaseItem[]>([]);
  let actionItems = $state<ActionItem[]>([]);

  // New item inputs
  let newIssue = $state<string>('');
  let newIncident = $state<string>('');
  let newActionText = $state<string>('');
  let newActionOwner = $state<string>('');
  let newActionDue = $state<string>('');

  // Derived
  let previewMd = $derived(() => {
    if (!currentReport) return '';
    const reportToRender: PostReleaseReport = {
      ...currentReport,
      releaseDate: releaseDate || undefined,
      environment: environment || undefined,
      deployUrl: deployUrl || undefined,
      releaseTagOrCommit: releaseTagOrCommit || undefined,
      actualGateStatus: actualGateStatus || undefined,
      notes: notes || undefined,
      issuesFound,
      incidents,
      actionItems,
    };
    const strings = getPostReleaseStrings(previewLanguage);
    return renderPostReleaseMd(reportToRender, previewLanguage, strings);
  });

  // Load packets and reports on mount
  onMount(() => {
    if (browser && data.enabled) {
      // Load publish packets from localStorage
      loadPackets();

      // Subscribe to post-release store
      const unsubscribe = postReleaseStore.subscribe((state) => {
        reports = state.reports;
        if (state.currentReport) {
          setReportFields(state.currentReport);
        } else {
          currentReport = null;
        }
      });

      return () => {
        unsubscribe();
      };
    }
  });

  function loadPackets() {
    if (!browser || !data.publishPacketsKey) return;

    try {
      const stored = localStorage.getItem(data.publishPacketsKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          packets = parsed;
        }
      }
    } catch {
      // Ignore errors
    }
  }

  function loadPacketData(packetId: string): PublishPacket | null {
    if (!browser || !data.publishChecklistKeyPrefix) return null;

    try {
      const key = `${data.publishChecklistKeyPrefix}${packetId}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore errors
    }
    return null;
  }

  function setReportFields(report: PostReleaseReport) {
    currentReport = report;
    releaseDate = report.releaseDate || '';
    environment = report.environment || '';
    deployUrl = report.deployUrl || '';
    releaseTagOrCommit = report.releaseTagOrCommit || '';
    actualGateStatus = report.actualGateStatus || '';
    notes = report.notes || '';
    issuesFound = [...report.issuesFound];
    incidents = [...report.incidents];
    actionItems = [...report.actionItems];
  }

  function handleCreateReport() {
    if (!selectedPacketId) return;

    const packet = loadPacketData(selectedPacketId);
    if (!packet) return;

    // Build checklist summary
    const checklistSummary: ChecklistSummary | undefined = packet.manifest
      ? {
          done: packet.manifest.checklistComplete,
          total: packet.manifest.checklistTotal,
          pct: packet.manifest.checklistTotal > 0
            ? Math.round((packet.manifest.checklistComplete / packet.manifest.checklistTotal) * 100)
            : 0,
        }
      : undefined;

    // Build includes
    const includes: IncludedFile[] = packet.files
      ? packet.files.map(f => ({ fileId: f.id, filename: f.filename }))
      : [];

    const report = createReportFromPacket(
      packet.id,
      packet.rcFrom,
      packet.rcTo,
      checklistSummary,
      includes,
      data.locale
    );

    postReleaseStore.createReport(report);
  }

  function handleSelectReport(id: string) {
    postReleaseStore.selectReport(id);
  }

  function handleDeleteReport(id: string) {
    postReleaseStore.deleteReport(id);
  }

  function handleSave() {
    if (!currentReport) return;

    const updated: PostReleaseReport = {
      ...currentReport,
      releaseDate: releaseDate || undefined,
      environment: environment || undefined,
      deployUrl: deployUrl || undefined,
      releaseTagOrCommit: releaseTagOrCommit || undefined,
      actualGateStatus: actualGateStatus || undefined,
      notes: notes || undefined,
      issuesFound,
      incidents,
      actionItems,
    };

    postReleaseStore.updateReport(updated);
  }

  // Issue management
  function handleAddIssue() {
    if (!newIssue.trim()) return;
    issuesFound = [...issuesFound, { text: newIssue.trim() }];
    newIssue = '';
  }

  function handleRemoveIssue(index: number) {
    issuesFound = issuesFound.filter((_, i) => i !== index);
  }

  // Incident management
  function handleAddIncident() {
    if (!newIncident.trim()) return;
    incidents = [...incidents, { text: newIncident.trim() }];
    newIncident = '';
  }

  function handleRemoveIncident(index: number) {
    incidents = incidents.filter((_, i) => i !== index);
  }

  // Action item management
  function handleAddAction() {
    if (!newActionText.trim()) return;
    actionItems = [
      ...actionItems,
      {
        text: newActionText.trim(),
        owner: newActionOwner.trim() || undefined,
        due: newActionDue.trim() || undefined,
      },
    ];
    newActionText = '';
    newActionOwner = '';
    newActionDue = '';
  }

  function handleRemoveAction(index: number) {
    actionItems = actionItems.filter((_, i) => i !== index);
  }

  // Export functions
  function handleExportMd() {
    if (!currentReport) return;

    const md = previewMd();
    const filename = generateExportFilename(
      data.postReleaseConfig.exportFilePrefix,
      currentReport.id,
      previewLanguage,
      'md'
    );

    downloadText(md, filename);
  }

  function handleExportJson() {
    if (!currentReport) return;

    const reportToExport: PostReleaseReport = {
      ...currentReport,
      releaseDate: releaseDate || undefined,
      environment: environment || undefined,
      deployUrl: deployUrl || undefined,
      releaseTagOrCommit: releaseTagOrCommit || undefined,
      actualGateStatus: actualGateStatus || undefined,
      notes: notes || undefined,
      issuesFound,
      incidents,
      actionItems,
    };

    const json = JSON.stringify(reportToExport, null, 2);
    const filename = generateExportFilename(
      data.postReleaseConfig.exportFilePrefix,
      currentReport.id,
      previewLanguage,
      'json'
    );

    downloadText(json, filename);
  }

  async function handleCopy(lang: 'en' | 'ru') {
    if (!currentReport) return;

    const reportToRender: PostReleaseReport = {
      ...currentReport,
      releaseDate: releaseDate || undefined,
      environment: environment || undefined,
      deployUrl: deployUrl || undefined,
      releaseTagOrCommit: releaseTagOrCommit || undefined,
      actualGateStatus: actualGateStatus || undefined,
      notes: notes || undefined,
      issuesFound,
      incidents,
      actionItems,
    };

    const strings = getPostReleaseStrings(lang);
    const md = renderPostReleaseMd(reportToRender, lang, strings);

    try {
      await navigator.clipboard.writeText(md);
      copyState[lang] = true;
      setTimeout(() => {
        copyState[lang] = false;
      }, 2000);
    } catch {
      // Ignore copy errors
    }
  }

  function downloadText(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function formatDate(isoString: string): string {
    return new Date(isoString).toLocaleString();
  }

  function getStatusClass(status: string | undefined): string {
    switch (status) {
      case 'green': return 'status-green';
      case 'yellow': return 'status-yellow';
      case 'red': return 'status-red';
      default: return '';
    }
  }
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<main class="post-release-page">
  <header class="page-header">
    <h1>{data.title}</h1>
    <p class="subtitle">{data.subtitle}</p>
    <p class="dev-notice">{data.labels.devOnly}</p>
  </header>

  {#if !data.enabled}
    <section class="disabled-notice">
      <p>Post Release Report is disabled.</p>
    </section>
  {:else}
    <div class="page-layout">
      <!-- Left Panel: Create & Saved Reports -->
      <aside class="side-panel">
        <!-- Create New Report -->
        <section class="panel-section">
          <h2>{data.labels.newReport}</h2>

          <div class="form-group">
            <label for="packet-select">{data.labels.selectPacket}</label>
            <select id="packet-select" bind:value={selectedPacketId}>
              <option value="">-- {data.labels.selectPacket} --</option>
              {#each packets as packet}
                <option value={packet.id}>{packet.name} ({packet.rcFrom} - {packet.rcTo})</option>
              {/each}
            </select>
          </div>

          <button
            class="btn btn-primary"
            onclick={handleCreateReport}
            disabled={!selectedPacketId}
          >
            {data.labels.newReport}
          </button>
        </section>

        <!-- Saved Reports -->
        <section class="panel-section">
          <h2>{data.labels.list.title}</h2>

          {#if reports.length === 0}
            <div class="empty-state">
              <p class="empty-title">{data.labels.list.emptyTitle}</p>
              <p class="empty-text">{data.labels.list.emptyText}</p>
            </div>
          {:else}
            <ul class="reports-list">
              {#each reports as report}
                <li class="report-item" class:active={currentReport?.id === report.id}>
                  <div class="report-info">
                    <span class="report-id">{report.id}</span>
                    <span class="report-meta">{report.fromRc} - {report.toRc}</span>
                    {#if report.actualGateStatus}
                      <span class="report-status {getStatusClass(report.actualGateStatus)}">
                        {data.labels.status[report.actualGateStatus]}
                      </span>
                    {/if}
                    <span class="report-date">{formatDate(report.updatedAt)}</span>
                  </div>
                  <div class="report-actions">
                    <button
                      class="btn btn-small"
                      onclick={() => handleSelectReport(report.id)}
                    >
                      Load
                    </button>
                    <button
                      class="btn btn-small btn-danger"
                      onclick={() => handleDeleteReport(report.id)}
                    >
                      {data.labels.delete}
                    </button>
                  </div>
                </li>
              {/each}
            </ul>
          {/if}
        </section>
      </aside>

      <!-- Main Content -->
      <div class="main-content">
        {#if !currentReport}
          <section class="empty-state-main">
            <p>{data.labels.list.emptyText}</p>
          </section>
        {:else}
          <!-- Actions Bar -->
          <div class="actions-bar">
            <button class="btn btn-primary" onclick={handleSave}>
              {data.labels.save}
            </button>
            <button class="btn" onclick={handleExportMd}>
              {data.labels.exportMd}
            </button>
            <button class="btn" onclick={handleExportJson}>
              {data.labels.exportJson}
            </button>
            <button class="btn" onclick={() => handleCopy('en')}>
              {copyState['en'] ? data.labels.copyDone : data.labels.copyEn}
            </button>
            <button class="btn" onclick={() => handleCopy('ru')}>
              {copyState['ru'] ? data.labels.copyDone : data.labels.copyRu}
            </button>
          </div>

          <div class="content-grid">
            <!-- Form Panel -->
            <div class="form-panel">
              <!-- Meta Section -->
              <section class="form-section">
                <h3>{data.labels.sections.meta}</h3>
                <div class="meta-info">
                  <div class="meta-row">
                    <span class="meta-label">Report ID:</span>
                    <span class="meta-value">{currentReport.id}</span>
                  </div>
                  <div class="meta-row">
                    <span class="meta-label">Packet ID:</span>
                    <span class="meta-value">{currentReport.packetId}</span>
                  </div>
                  <div class="meta-row">
                    <span class="meta-label">RC:</span>
                    <span class="meta-value">{currentReport.fromRc} - {currentReport.toRc}</span>
                  </div>
                  {#if currentReport.checklistSummary}
                    <div class="meta-row">
                      <span class="meta-label">Checklist:</span>
                      <span class="meta-value">
                        {currentReport.checklistSummary.done}/{currentReport.checklistSummary.total}
                        ({currentReport.checklistSummary.pct}%)
                      </span>
                    </div>
                  {/if}
                </div>
              </section>

              <!-- Deployment Section -->
              <section class="form-section">
                <h3>{data.labels.sections.deployment}</h3>

                <div class="form-group">
                  <label for="release-date">{data.labels.fields.releaseDate}</label>
                  <input
                    id="release-date"
                    type="datetime-local"
                    bind:value={releaseDate}
                  />
                </div>

                <div class="form-group">
                  <label for="environment">{data.labels.fields.environment}</label>
                  <select id="environment" bind:value={environment}>
                    <option value="">--</option>
                    <option value="prod">{data.labels.env.prod}</option>
                    <option value="staging">{data.labels.env.staging}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="deploy-url">{data.labels.fields.deployUrl}</label>
                  <input
                    id="deploy-url"
                    type="text"
                    bind:value={deployUrl}
                    placeholder="https://..."
                  />
                </div>

                <div class="form-group">
                  <label for="tag-commit">{data.labels.fields.tagOrCommit}</label>
                  <input
                    id="tag-commit"
                    type="text"
                    bind:value={releaseTagOrCommit}
                    placeholder="v1.0.0 or abc123"
                  />
                </div>

                <div class="form-group">
                  <label for="gate-status">{data.labels.fields.gateStatus}</label>
                  <select id="gate-status" bind:value={actualGateStatus}>
                    <option value="">--</option>
                    <option value="green">{data.labels.status.green}</option>
                    <option value="yellow">{data.labels.status.yellow}</option>
                    <option value="red">{data.labels.status.red}</option>
                  </select>
                </div>
              </section>

              <!-- Issues Found Section -->
              <section class="form-section">
                <h3>{data.labels.sections.issues}</h3>

                <ul class="items-list">
                  {#each issuesFound as issue, index}
                    <li class="item-row">
                      <span class="item-text">{issue.text}</span>
                      <button
                        class="btn-icon"
                        onclick={() => handleRemoveIssue(index)}
                        aria-label="Remove"
                      >x</button>
                    </li>
                  {/each}
                </ul>

                <div class="add-item-row">
                  <input
                    type="text"
                    bind:value={newIssue}
                    placeholder="Add issue..."
                    onkeydown={(e) => e.key === 'Enter' && handleAddIssue()}
                  />
                  <button class="btn btn-small" onclick={handleAddIssue}>+</button>
                </div>
              </section>

              <!-- Incidents Section -->
              <section class="form-section">
                <h3>{data.labels.sections.incidents}</h3>

                <ul class="items-list">
                  {#each incidents as incident, index}
                    <li class="item-row">
                      <span class="item-text">{incident.text}</span>
                      <button
                        class="btn-icon"
                        onclick={() => handleRemoveIncident(index)}
                        aria-label="Remove"
                      >x</button>
                    </li>
                  {/each}
                </ul>

                <div class="add-item-row">
                  <input
                    type="text"
                    bind:value={newIncident}
                    placeholder="Add incident..."
                    onkeydown={(e) => e.key === 'Enter' && handleAddIncident()}
                  />
                  <button class="btn btn-small" onclick={handleAddIncident}>+</button>
                </div>
              </section>

              <!-- Action Items Section -->
              <section class="form-section">
                <h3>{data.labels.sections.actions}</h3>

                <ul class="items-list">
                  {#each actionItems as action, index}
                    <li class="item-row action-item">
                      <div class="action-content">
                        <span class="item-text">{action.text}</span>
                        {#if action.owner}
                          <span class="action-meta">{data.labels.fields.owner}: {action.owner}</span>
                        {/if}
                        {#if action.due}
                          <span class="action-meta">{data.labels.fields.due}: {action.due}</span>
                        {/if}
                      </div>
                      <button
                        class="btn-icon"
                        onclick={() => handleRemoveAction(index)}
                        aria-label="Remove"
                      >x</button>
                    </li>
                  {/each}
                </ul>

                <div class="add-action-form">
                  <input
                    type="text"
                    bind:value={newActionText}
                    placeholder="Action item..."
                    class="action-text-input"
                  />
                  <input
                    type="text"
                    bind:value={newActionOwner}
                    placeholder={data.labels.fields.owner}
                    class="action-owner-input"
                  />
                  <input
                    type="text"
                    bind:value={newActionDue}
                    placeholder={data.labels.fields.due}
                    class="action-due-input"
                  />
                  <button class="btn btn-small" onclick={handleAddAction}>+</button>
                </div>
              </section>

              <!-- Notes Section -->
              <section class="form-section">
                <h3>{data.labels.sections.notes}</h3>

                <textarea
                  bind:value={notes}
                  placeholder={data.labels.fields.notes}
                  rows="4"
                ></textarea>
              </section>
            </div>

            <!-- Preview Panel -->
            <div class="preview-panel">
              <div class="preview-header">
                <h3>Preview</h3>
                <div class="preview-lang-toggle">
                  <label>
                    {data.labels.languageLabel}:
                    <select bind:value={previewLanguage}>
                      <option value="en">EN</option>
                      <option value="ru">RU</option>
                    </select>
                  </label>
                </div>
              </div>

              <div class="preview-content">
                <pre>{previewMd()}</pre>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</main>

<style>
  .post-release-page {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  .page-header {
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
    padding-bottom: 1rem;
  }

  .page-header h1 {
    margin: 0 0 0.5rem;
    font-size: 1.75rem;
  }

  .subtitle {
    margin: 0 0 0.5rem;
    color: var(--text-secondary, #6b7280);
  }

  .dev-notice {
    margin: 0;
    font-size: 0.875rem;
    color: var(--warning-color, #d97706);
    background: var(--warning-bg, #fef3c7);
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    display: inline-block;
  }

  .disabled-notice {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--text-secondary, #6b7280);
  }

  .page-layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
  }

  .side-panel {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .panel-section {
    background: var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .panel-section h2 {
    margin: 0 0 1rem;
    font-size: 1rem;
    font-weight: 600;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color, #d1d5db);
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 80px;
  }

  .btn {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color, #d1d5db);
    border-radius: 0.25rem;
    background: var(--btn-bg, #ffffff);
    cursor: pointer;
    font-size: 0.875rem;
  }

  .btn:hover:not(:disabled) {
    background: var(--btn-hover-bg, #f3f4f6);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-primary {
    background: var(--primary-color, #2563eb);
    color: white;
    border-color: var(--primary-color, #2563eb);
  }

  .btn-primary:hover:not(:disabled) {
    background: var(--primary-hover, #1d4ed8);
  }

  .btn-small {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }

  .btn-danger {
    color: var(--danger-color, #dc2626);
    border-color: var(--danger-color, #dc2626);
  }

  .btn-danger:hover:not(:disabled) {
    background: var(--danger-bg, #fef2f2);
  }

  .btn-icon {
    padding: 0.25rem 0.5rem;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--text-secondary, #6b7280);
    font-size: 0.875rem;
  }

  .btn-icon:hover {
    color: var(--danger-color, #dc2626);
  }

  .empty-state {
    text-align: center;
    padding: 1rem;
    color: var(--text-secondary, #6b7280);
  }

  .empty-title {
    font-weight: 500;
    margin: 0 0 0.25rem;
  }

  .empty-text {
    font-size: 0.875rem;
    margin: 0;
  }

  .reports-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .report-item {
    padding: 0.75rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 0.25rem;
    margin-bottom: 0.5rem;
  }

  .report-item.active {
    border-color: var(--primary-color, #2563eb);
    background: var(--primary-bg, #eff6ff);
  }

  .report-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 0.5rem;
  }

  .report-id {
    font-weight: 500;
    font-family: monospace;
    font-size: 0.875rem;
  }

  .report-meta {
    font-size: 0.75rem;
    color: var(--text-secondary, #6b7280);
  }

  .report-status {
    font-size: 0.75rem;
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    display: inline-block;
    width: fit-content;
  }

  .status-green {
    background: var(--success-bg, #d1fae5);
    color: var(--success-text, #047857);
  }

  .status-yellow {
    background: var(--warning-bg, #fef3c7);
    color: var(--warning-text, #d97706);
  }

  .status-red {
    background: var(--danger-bg, #fee2e2);
    color: var(--danger-text, #dc2626);
  }

  .report-date {
    font-size: 0.75rem;
    color: var(--text-secondary, #6b7280);
  }

  .report-actions {
    display: flex;
    gap: 0.5rem;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .empty-state-main {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 0.5rem;
    color: var(--text-secondary, #6b7280);
  }

  .actions-bar {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .form-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-section {
    background: var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .form-section h3 {
    margin: 0 0 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary, #374151);
  }

  .meta-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .meta-row {
    display: flex;
    gap: 0.5rem;
    font-size: 0.875rem;
  }

  .meta-label {
    color: var(--text-secondary, #6b7280);
    min-width: 80px;
  }

  .meta-value {
    font-weight: 500;
  }

  .items-list {
    list-style: none;
    padding: 0;
    margin: 0 0 0.75rem;
  }

  .item-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.5rem;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
  }

  .item-row:last-child {
    border-bottom: none;
  }

  .item-text {
    font-size: 0.875rem;
    flex: 1;
  }

  .action-item {
    flex-direction: column;
    gap: 0.25rem;
  }

  .action-content {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    flex: 1;
  }

  .action-meta {
    font-size: 0.75rem;
    color: var(--text-secondary, #6b7280);
  }

  .add-item-row {
    display: flex;
    gap: 0.5rem;
  }

  .add-item-row input {
    flex: 1;
    padding: 0.375rem 0.5rem;
    border: 1px solid var(--border-color, #d1d5db);
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }

  .add-action-form {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .action-text-input {
    flex: 2;
    min-width: 150px;
    padding: 0.375rem 0.5rem;
    border: 1px solid var(--border-color, #d1d5db);
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }

  .action-owner-input,
  .action-due-input {
    flex: 1;
    min-width: 80px;
    padding: 0.375rem 0.5rem;
    border: 1px solid var(--border-color, #d1d5db);
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }

  .preview-panel {
    background: var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 200px);
  }

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
  }

  .preview-header h3 {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .preview-lang-toggle label {
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .preview-lang-toggle select {
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--border-color, #d1d5db);
    border-radius: 0.25rem;
    font-size: 0.75rem;
  }

  .preview-content {
    flex: 1;
    overflow: auto;
    padding: 1rem;
  }

  .preview-content pre {
    margin: 0;
    font-size: 0.75rem;
    line-height: 1.5;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: monospace;
  }

  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
    }

    .preview-panel {
      max-height: 400px;
    }
  }

  @media (max-width: 768px) {
    .page-layout {
      grid-template-columns: 1fr;
    }
  }
</style>
