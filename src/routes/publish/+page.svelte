<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import { loadRcRecords, findRcById } from '$lib/rc/rcStorage';
  import { publishStore } from '$lib/publish/store';
  import { knownIssuesStore } from '$lib/releaseNotes/knownIssues.store';
  import { buildPublishPacket, regeneratePacketFiles, validateChecklist } from '$lib/publish/builders';
  import type { RcRecord } from '$lib/models/rc.model';
  import type { PublishPacket, PublishFile, SavedPacketRef } from '$lib/publish/types';
  import type { KnownIssue } from '$lib/releaseNotes/knownIssues.model';

  let { data } = $props();

  // State
  let rcRecords = $state<RcRecord[]>([]);
  let selectedRcFromId = $state<string>('');
  let selectedRcToId = $state<string>('');
  let packetName = $state<string>('');
  let currentPacket = $state<PublishPacket | null>(null);
  let savedPackets = $state<SavedPacketRef[]>([]);
  let knownIssues = $state<KnownIssue[]>([]);
  let copyState = $state<Record<string, boolean>>({});

  // Derived
  let canCreate = $derived(
    selectedRcFromId !== '' &&
    selectedRcToId !== '' &&
    selectedRcFromId !== selectedRcToId &&
    packetName.trim() !== ''
  );

  let checklistValidation = $derived(
    currentPacket ? validateChecklist(currentPacket.checklist) : null
  );

  // Load data on mount
  onMount(() => {
    if (browser) {
      rcRecords = loadRcRecords();
      knownIssues = knownIssuesStore.getIssues();

      // Subscribe to store
      const unsubscribe = publishStore.subscribe((state) => {
        savedPackets = state.packets;
        currentPacket = state.currentPacket;

        // Pre-fill RC selection from current packet
        if (state.currentPacket) {
          selectedRcFromId = state.currentPacket.rcFrom;
          selectedRcToId = state.currentPacket.rcTo;
          packetName = state.currentPacket.name;
        }
      });

      // Subscribe to known issues
      const unsubKnown = knownIssuesStore.subscribe((state) => {
        knownIssues = state.issues;
      });

      return () => {
        unsubscribe();
        unsubKnown();
      };
    }
  });

  // Actions
  function handleCreatePacket() {
    if (!canCreate || !data.enabled) return;

    const rcA = findRcById(selectedRcFromId);
    const rcB = findRcById(selectedRcToId);

    if (!rcA || !rcB) return;

    const packet = buildPublishPacket(
      packetName.trim(),
      rcA,
      rcB,
      knownIssues,
      data.rcCompareConfig,
      data.changelogConfig,
      data.releaseNotesConfig,
      data.changelogGroupTitles,
      data.linkLabels,
      data.checklistTitles,
      data.labels.mostChanges,
      data.labels.nextStepsPlaceholder
    );

    publishStore.createPacket(packet);
  }

  function handleLoadPacket(id: string) {
    publishStore.selectPacket(id);
  }

  function handleDeletePacket(id: string) {
    publishStore.deletePacket(id);
  }

  function handleChecklistChange(itemId: string, checked: boolean) {
    if (!currentPacket) return;
    publishStore.updateChecklistItem(currentPacket.id, itemId, checked);
  }

  function handleDeploymentStepChange(step: number, completed: boolean) {
    if (!currentPacket) return;
    publishStore.updateDeploymentStep(currentPacket.id, step, completed);
  }

  function handleRegenerateFiles() {
    if (!currentPacket) return;

    const newFiles = regeneratePacketFiles(currentPacket, data.checklistTitles);
    const updated: PublishPacket = {
      ...currentPacket,
      files: newFiles,
      updatedAt: new Date().toISOString(),
    };

    publishStore.updatePacket(updated);
  }

  function handleDownloadFile(file: PublishFile) {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleDownloadAll() {
    if (!currentPacket) return;

    for (const file of currentPacket.files) {
      handleDownloadFile(file);
    }
  }

  async function handleCopyFile(file: PublishFile) {
    try {
      await navigator.clipboard.writeText(file.content);
      copyState[file.id] = true;
      setTimeout(() => {
        copyState[file.id] = false;
      }, 2000);
    } catch {
      // Ignore copy errors
    }
  }

  function handleStatusChange(status: PublishPacket['status']) {
    if (!currentPacket) return;
    publishStore.updatePacketStatus(currentPacket.id, status);
  }

  function formatDate(isoString: string): string {
    return new Date(isoString).toLocaleString();
  }

  function getGateStatusClass(status: string): string {
    switch (status) {
      case 'green': return 'status-green';
      case 'yellow': return 'status-yellow';
      case 'red': return 'status-red';
      default: return '';
    }
  }

  function getPacketStatusClass(status: string): string {
    switch (status) {
      case 'ready': return 'status-ready';
      case 'published': return 'status-published';
      default: return 'status-draft';
    }
  }
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<main class="publish-page">
  <header class="page-header">
    <h1>{data.title}</h1>
    <p class="subtitle">{data.subtitle}</p>
    <p class="dev-notice">{data.labels.devOnly}</p>
  </header>

  {#if !data.enabled}
    <section class="disabled-notice">
      <p>Publish Center is disabled.</p>
    </section>
  {:else}
    <div class="publish-layout">
      <!-- Left Panel: Saved Packets & Create -->
      <aside class="side-panel">
        <!-- Create New Packet -->
        <section class="panel-section">
          <h2>{data.labels.createPacket}</h2>

          <div class="form-group">
            <label for="packet-name">{data.labels.packet.nameLabel}</label>
            <input
              id="packet-name"
              type="text"
              bind:value={packetName}
              placeholder={data.labels.packet.namePlaceholder}
            />
          </div>

          <div class="form-group">
            <label for="rc-from">{data.labels.manifest.rcFrom}</label>
            <select id="rc-from" bind:value={selectedRcFromId}>
              <option value="">-- {data.labels.selectRc} --</option>
              {#each rcRecords as rc}
                <option value={rc.id}>{rc.id}</option>
              {/each}
            </select>
          </div>

          <div class="form-group">
            <label for="rc-to">{data.labels.manifest.rcTo}</label>
            <select id="rc-to" bind:value={selectedRcToId}>
              <option value="">-- {data.labels.selectRc} --</option>
              {#each rcRecords as rc}
                <option value={rc.id}>{rc.id}</option>
              {/each}
            </select>
          </div>

          <button
            class="btn btn-primary"
            onclick={handleCreatePacket}
            disabled={!canCreate}
          >
            {data.labels.createPacket}
          </button>
        </section>

        <!-- Saved Packets -->
        <section class="panel-section">
          <h2>{data.labels.sections.savedPackets}</h2>

          {#if savedPackets.length === 0}
            <p class="empty-message">{data.labels.savedPackets.empty}</p>
          {:else}
            <ul class="saved-packets-list">
              {#each savedPackets as packet}
                <li class="saved-packet-item" class:active={currentPacket?.id === packet.id}>
                  <div class="packet-info">
                    <span class="packet-name">{packet.name}</span>
                    <span class="packet-status {getPacketStatusClass(packet.status)}">
                      {data.statusLabels[packet.status]}
                    </span>
                    <span class="packet-date">{formatDate(packet.updatedAt)}</span>
                  </div>
                  <div class="packet-actions">
                    <button
                      class="btn btn-small"
                      onclick={() => handleLoadPacket(packet.id)}
                    >
                      {data.labels.savedPackets.load}
                    </button>
                    <button
                      class="btn btn-small btn-danger"
                      onclick={() => handleDeletePacket(packet.id)}
                    >
                      {data.labels.savedPackets.delete}
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
        {#if !currentPacket}
          <section class="empty-state">
            <p>Create or load a packet to get started.</p>
          </section>
        {:else}
          <!-- Packet Info -->
          <section class="content-section">
            <h2>{data.labels.sections.packet}</h2>

            <div class="packet-meta">
              <div class="meta-row">
                <span class="meta-label">{data.labels.packet.nameLabel}:</span>
                <span class="meta-value">{currentPacket.name}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">{data.labels.manifest.rcFrom}:</span>
                <span class="meta-value">{currentPacket.rcFrom}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">{data.labels.manifest.rcTo}:</span>
                <span class="meta-value">{currentPacket.rcTo}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">{data.labels.packet.createdLabel}:</span>
                <span class="meta-value">{formatDate(currentPacket.createdAt)}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Gate Status:</span>
                <span class="meta-value {getGateStatusClass(currentPacket.manifest.gateStatus)}">
                  {currentPacket.manifest.gateStatus.toUpperCase()}
                </span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Packet Status:</span>
                <select
                  class="status-select"
                  value={currentPacket.status}
                  onchange={(e) => handleStatusChange(e.currentTarget.value as PublishPacket['status'])}
                >
                  <option value="draft">{data.statusLabels.draft}</option>
                  <option value="ready">{data.statusLabels.ready}</option>
                  <option value="published">{data.statusLabels.published}</option>
                </select>
              </div>
            </div>
          </section>

          <!-- Checklist -->
          <section class="content-section">
            <h2>{data.labels.sections.checklist}</h2>

            {#if checklistValidation}
              <div class="checklist-summary">
                <span class:valid={checklistValidation.p0Complete} class:invalid={!checklistValidation.p0Complete}>
                  P0: {checklistValidation.p0Complete ? 'Complete' : 'Incomplete'}
                </span>
                <span class:valid={checklistValidation.p1Complete} class:invalid={!checklistValidation.p1Complete}>
                  P1: {checklistValidation.p1Complete ? 'Complete' : 'Incomplete'}
                </span>
                <span class:valid={checklistValidation.p2Complete} class:invalid={!checklistValidation.p2Complete}>
                  P2: {checklistValidation.p2Complete ? 'Complete' : 'Incomplete'}
                </span>
              </div>
            {/if}

            <div class="checklist-groups">
              {#each ['p0', 'p1', 'p2'] as priority}
                {@const items = data.publishConfig.checklistItems.filter(i => i.priority === priority)}
                {#if items.length > 0}
                  <div class="checklist-group">
                    <h3>{data.priorityLabels[priority]}</h3>
                    <ul class="checklist-items">
                      {#each items as item}
                        {@const state = currentPacket.checklist.find(c => c.id === item.id)}
                        {@const checked = state?.checked ?? item.defaultChecked}
                        <li class="checklist-item">
                          <label>
                            <input
                              type="checkbox"
                              checked={checked}
                              onchange={(e) => handleChecklistChange(item.id, e.currentTarget.checked)}
                            />
                            <span>{data.checklistTitles[item.id]}</span>
                          </label>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}
              {/each}
            </div>
          </section>

          <!-- Deployment Steps -->
          <section class="content-section">
            <h2>{data.labels.sections.deployment}</h2>

            <ul class="deployment-steps">
              {#each currentPacket.deploymentSteps as step}
                <li class="deployment-step">
                  <label>
                    <input
                      type="checkbox"
                      checked={step.completed}
                      onchange={(e) => handleDeploymentStepChange(step.step, e.currentTarget.checked)}
                    />
                    <span>{data.locale === 'ru' ? step.textRu : step.textEn}</span>
                  </label>
                  {#if step.completed && step.completedAt}
                    <span class="step-completed-at">({formatDate(step.completedAt)})</span>
                  {/if}
                </li>
              {/each}
            </ul>
          </section>

          <!-- Files -->
          <section class="content-section">
            <h2>{data.labels.sections.files}</h2>

            <div class="files-actions">
              <button class="btn" onclick={handleRegenerateFiles}>
                {data.labels.regenerate}
              </button>
              <button class="btn btn-primary" onclick={handleDownloadAll}>
                {data.labels.downloadAll}
              </button>
            </div>

            <ul class="files-list">
              {#each currentPacket.files as file}
                <li class="file-item">
                  <div class="file-info">
                    <span class="file-title">{data.fileTitles[file.id] || file.id}</span>
                    <span class="file-name">{file.filename}</span>
                    <span class="file-format">{file.format.toUpperCase()}</span>
                  </div>
                  <div class="file-actions">
                    <button
                      class="btn btn-small"
                      onclick={() => handleCopyFile(file)}
                    >
                      {copyState[file.id] ? data.labels.copyDone : data.labels.copy}
                    </button>
                    <button
                      class="btn btn-small"
                      onclick={() => handleDownloadFile(file)}
                    >
                      {data.labels.download}
                    </button>
                  </div>
                </li>
              {/each}
            </ul>
          </section>
        {/if}
      </div>
    </div>
  {/if}
</main>

<style>
  .publish-page {
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

  .publish-layout {
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
  .form-group select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color, #d1d5db);
    border-radius: 0.25rem;
    font-size: 0.875rem;
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

  .empty-message {
    color: var(--text-secondary, #6b7280);
    font-size: 0.875rem;
    font-style: italic;
  }

  .saved-packets-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .saved-packet-item {
    padding: 0.75rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 0.25rem;
    margin-bottom: 0.5rem;
  }

  .saved-packet-item.active {
    border-color: var(--primary-color, #2563eb);
    background: var(--primary-bg, #eff6ff);
  }

  .packet-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 0.5rem;
  }

  .packet-name {
    font-weight: 500;
  }

  .packet-status {
    font-size: 0.75rem;
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    display: inline-block;
    width: fit-content;
  }

  .status-draft {
    background: var(--gray-bg, #f3f4f6);
    color: var(--gray-text, #6b7280);
  }

  .status-ready {
    background: var(--success-bg, #d1fae5);
    color: var(--success-text, #047857);
  }

  .status-published {
    background: var(--primary-bg, #dbeafe);
    color: var(--primary-text, #1d4ed8);
  }

  .packet-date {
    font-size: 0.75rem;
    color: var(--text-secondary, #6b7280);
  }

  .packet-actions {
    display: flex;
    gap: 0.5rem;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 0.5rem;
    color: var(--text-secondary, #6b7280);
  }

  .content-section {
    background: var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 0.5rem;
    padding: 1.5rem;
  }

  .content-section h2 {
    margin: 0 0 1rem;
    font-size: 1.125rem;
    font-weight: 600;
  }

  .packet-meta {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
  }

  .meta-row {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .meta-label {
    font-size: 0.75rem;
    color: var(--text-secondary, #6b7280);
    text-transform: uppercase;
  }

  .meta-value {
    font-weight: 500;
  }

  .status-green {
    color: var(--success-color, #047857);
  }

  .status-yellow {
    color: var(--warning-color, #d97706);
  }

  .status-red {
    color: var(--danger-color, #dc2626);
  }

  .status-select {
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--border-color, #d1d5db);
    border-radius: 0.25rem;
    font-size: 0.875rem;
    width: auto;
  }

  .checklist-summary {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 0.75rem;
    background: var(--gray-bg, #f9fafb);
    border-radius: 0.25rem;
  }

  .checklist-summary span {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .checklist-summary .valid {
    color: var(--success-color, #047857);
  }

  .checklist-summary .invalid {
    color: var(--danger-color, #dc2626);
  }

  .checklist-groups {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .checklist-group h3 {
    margin: 0 0 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary, #374151);
  }

  .checklist-items {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .checklist-item {
    margin-bottom: 0.5rem;
  }

  .checklist-item label {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .checklist-item input {
    margin-top: 0.125rem;
  }

  .deployment-steps {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .deployment-step {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
  }

  .deployment-step:last-child {
    border-bottom: none;
  }

  .deployment-step label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
    flex: 1;
  }

  .step-completed-at {
    font-size: 0.75rem;
    color: var(--text-secondary, #6b7280);
  }

  .files-actions {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .files-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 0.25rem;
    margin-bottom: 0.5rem;
  }

  .file-info {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .file-title {
    font-weight: 500;
    font-size: 0.875rem;
  }

  .file-name {
    font-size: 0.75rem;
    color: var(--text-secondary, #6b7280);
    font-family: monospace;
  }

  .file-format {
    font-size: 0.625rem;
    padding: 0.125rem 0.375rem;
    background: var(--gray-bg, #f3f4f6);
    border-radius: 0.25rem;
    display: inline-block;
    width: fit-content;
  }

  .file-actions {
    display: flex;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    .publish-layout {
      grid-template-columns: 1fr;
    }

    .packet-meta {
      grid-template-columns: 1fr;
    }

    .checklist-groups {
      grid-template-columns: 1fr;
    }
  }
</style>
