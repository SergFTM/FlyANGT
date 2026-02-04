<script lang="ts">
  /**
   * Leads Viewer Page
   *
   * Dev-only page for viewing submitted leads from the config DB.
   */

  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import type { LeadRecord, SubmissionSource } from '$lib/domain/types';

  let { data } = $props();

  // State
  let leads = $state<LeadRecord[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);
  let sourceFilter = $state<SubmissionSource | ''>('');
  let total = $state(0);

  // Load leads
  async function loadLeads() {
    if (!browser) return;

    loading = true;
    error = null;

    try {
      const params = new URLSearchParams();
      params.set('limit', '50');
      if (sourceFilter) {
        params.set('source', sourceFilter);
      }

      const response = await fetch(`/api/leads?${params.toString()}`);
      const result = await response.json();

      if (!result.ok) {
        throw new Error(result.errors?.join(', ') || 'Failed to load leads');
      }

      leads = result.data;
      total = result.total;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading = false;
    }
  }

  // Delete lead
  async function handleDelete(id: string) {
    if (!confirm(data.labels.confirmDelete)) return;

    try {
      // For dev viewer, we'll just call the API with DELETE method
      // Note: We'd need to add DELETE endpoint, but for MVP we skip this
      // Instead, show a message that deletion should be done manually
      alert(`To delete lead ${id}, remove the file from src/data/db/leads/${id}.json`);
    } catch (err) {
      error = err instanceof Error ? err.message : 'Delete failed';
    }
  }

  // Format date
  function formatDate(isoString: string): string {
    return new Date(isoString).toLocaleString();
  }

  // Get source badge class
  function getSourceClass(source: string): string {
    const classes: Record<string, string> = {
      customers_docs: 'bg-emerald-100 text-emerald-700',
      investors_deck: 'bg-blue-100 text-blue-700',
      configurator_quote: 'bg-purple-100 text-purple-700',
      partners: 'bg-orange-100 text-orange-700',
      presale: 'bg-pink-100 text-pink-700',
    };
    return classes[source] || 'bg-gray-100 text-gray-700';
  }

  // Load on mount
  onMount(() => {
    loadLeads();
  });

  // Reload when filter changes
  $effect(() => {
    if (browser) {
      loadLeads();
    }
  });
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<main class="leads-page">
  <header class="page-header">
    <h1>{data.title}</h1>
    <p class="subtitle">{data.subtitle}</p>
    <p class="dev-notice">{data.labels.devOnly}</p>
  </header>

  <div class="controls">
    <div class="filter-group">
      <label for="source-filter">{data.labels.source}:</label>
      <select id="source-filter" bind:value={sourceFilter}>
        <option value="">All</option>
        <option value="customers_docs">Customers Docs</option>
        <option value="investors_deck">Investors Deck</option>
        <option value="configurator_quote">Configurator Quote</option>
        <option value="partners">Partners</option>
        <option value="presale">Presale</option>
      </select>
    </div>

    <button class="btn" onclick={loadLeads}>
      {data.labels.refresh}
    </button>
  </div>

  {#if loading}
    <div class="loading-state">
      <p>{data.labels.loading}</p>
    </div>
  {:else if error}
    <div class="error-state">
      <p>{error}</p>
      <button class="btn" onclick={loadLeads}>{data.labels.refresh}</button>
    </div>
  {:else if leads.length === 0}
    <div class="empty-state">
      <p>{data.labels.empty}</p>
    </div>
  {:else}
    <div class="leads-summary">
      <p>{data.labels.total}: <strong>{total}</strong></p>
    </div>

    <div class="leads-table-wrapper">
      <table class="leads-table">
        <thead>
          <tr>
            <th>{data.labels.source}</th>
            <th>{data.labels.email}</th>
            <th>{data.labels.name}</th>
            <th>{data.labels.country}</th>
            <th>{data.labels.createdAt}</th>
            <th>{data.labels.actions}</th>
          </tr>
        </thead>
        <tbody>
          {#each leads as lead}
            <tr>
              <td>
                <span class="source-badge {getSourceClass(lead.source)}">
                  {lead.source}
                </span>
              </td>
              <td class="email-cell">{lead.email}</td>
              <td>{lead.name || '-'}</td>
              <td>{lead.country || '-'}</td>
              <td class="date-cell">{formatDate(lead.createdAt)}</td>
              <td>
                <button
                  class="btn btn-small btn-danger"
                  onclick={() => handleDelete(lead.id)}
                >
                  {data.labels.delete}
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</main>

<style>
  .leads-page {
    max-width: 1200px;
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

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .filter-group label {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .filter-group select {
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

  .btn:hover {
    background: var(--btn-hover-bg, #f3f4f6);
  }

  .btn-small {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }

  .btn-danger {
    color: var(--danger-color, #dc2626);
    border-color: var(--danger-color, #dc2626);
  }

  .btn-danger:hover {
    background: var(--danger-bg, #fef2f2);
  }

  .loading-state,
  .error-state,
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 0.5rem;
    color: var(--text-secondary, #6b7280);
  }

  .error-state {
    color: var(--danger-color, #dc2626);
  }

  .leads-summary {
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: var(--text-secondary, #6b7280);
  }

  .leads-table-wrapper {
    overflow-x: auto;
    background: var(--card-bg, #ffffff);
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 0.5rem;
  }

  .leads-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }

  .leads-table th,
  .leads-table td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color, #e5e7eb);
  }

  .leads-table th {
    background: var(--gray-bg, #f9fafb);
    font-weight: 600;
    color: var(--text-secondary, #374151);
  }

  .leads-table tbody tr:hover {
    background: var(--row-hover-bg, #f9fafb);
  }

  .source-badge {
    display: inline-block;
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .email-cell {
    font-family: monospace;
    font-size: 0.8125rem;
  }

  .date-cell {
    font-size: 0.8125rem;
    color: var(--text-secondary, #6b7280);
  }
</style>
