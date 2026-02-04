<script lang="ts">
  /**
   * Retention Page
   *
   * DEV-ONLY tool for archiving old records based on age.
   */

  let { data } = $props();

  // Form state
  let days = $state(data.config.defaultDays);
  let includeNew = $state(data.config.defaultIncludeNew);

  // UI state
  let loading = $state(false);
  let report = $state<{
    eligibleCount: number;
    bySource: Record<string, number>;
    byStatus: Record<string, number>;
    byAge: Record<string, number>;
    capped: boolean;
  } | null>(null);
  let message = $state<{ type: 'success' | 'error'; text: string } | null>(null);
  let applyConfirm = $state(false);

  // Generate preview/report
  async function handlePreview() {
    loading = true;
    message = null;
    report = null;

    try {
      const params = new URLSearchParams({
        days: String(days),
        includeNew: String(includeNew),
      });

      const response = await fetch(`/api/retention?${params}`);
      const result = await response.json();

      if (result.success && result.report) {
        report = result.report;
        if (result.report.capped) {
          message = {
            type: 'error',
            text: data.labels.messages.capped.replace('{max}', String(data.config.maxApply)),
          };
        }
      } else {
        message = { type: 'error', text: result.error || 'Failed to generate report' };
      }
    } catch (err) {
      message = { type: 'error', text: 'Network error' };
    } finally {
      loading = false;
    }
  }

  // Apply archiving
  async function handleApply() {
    if (!applyConfirm) {
      applyConfirm = true;
      return;
    }

    loading = true;
    message = null;

    try {
      const response = await fetch('/api/retention', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          days,
          includeNew,
          confirm: true,
        }),
      });

      const result = await response.json();

      if (result.success) {
        message = {
          type: 'success',
          text: data.labels.messages.applied.replace('{count}', String(result.archivedCount)),
        };
        report = null;
      } else {
        if (result.error?.includes('Too many')) {
          message = {
            type: 'error',
            text: data.labels.errors.tooMany
              .replace('{count}', String(report?.eligibleCount || 0))
              .replace('{max}', String(data.config.maxApply)),
          };
        } else {
          message = { type: 'error', text: result.error || 'Failed to apply retention' };
        }
      }
    } catch (err) {
      message = { type: 'error', text: 'Network error' };
    } finally {
      loading = false;
      applyConfirm = false;
    }
  }

  // Reset confirmation when form changes
  $effect(() => {
    void days;
    void includeNew;
    applyConfirm = false;
  });
</script>

<svelte:head>
  <title>{data.labels.title}</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">{data.labels.title}</h1>
      <p class="text-gray-600 mt-1">{data.labels.subtitle}</p>
      <div class="mt-2 flex flex-wrap gap-2">
        <div class="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg inline-block">
          <span class="text-sm text-amber-700">{data.labels.devOnly}</span>
        </div>
        <a
          href="/admin"
          class="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg inline-block text-sm text-blue-700 hover:bg-blue-100 transition-colors"
        >
          Back to Admin
        </a>
      </div>
    </div>

    <!-- Form -->
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <!-- Days input -->
        <div>
          <label for="retention-days" class="block text-sm font-medium text-gray-700 mb-1">
            {data.labels.fields.days}
          </label>
          <input
            type="number"
            id="retention-days"
            bind:value={days}
            min="0"
            max="365"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <!-- Include new checkbox -->
        <div class="flex items-end">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={includeNew}
              class="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span class="text-sm text-gray-700">{data.labels.fields.includeNew}</span>
          </label>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3">
        <button
          type="button"
          onclick={handlePreview}
          disabled={loading}
          class="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '...' : data.labels.actions.dryRun}
        </button>

        {#if report && report.eligibleCount > 0 && report.eligibleCount <= data.config.maxApply}
          <button
            type="button"
            onclick={handleApply}
            disabled={loading}
            class="px-4 py-2 text-sm font-medium text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors {applyConfirm ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}"
          >
            {loading ? '...' : applyConfirm ? 'Confirm Archive' : data.labels.actions.apply}
          </button>
        {/if}
      </div>
    </div>

    <!-- Message -->
    {#if message}
      <div class="mb-6 p-4 rounded-lg {message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}">
        {message.text}
      </div>
    {/if}

    <!-- Report -->
    {#if report}
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{data.labels.report.title}</h2>

        <!-- Eligible count -->
        <div class="mb-6 p-4 bg-gray-50 rounded-lg">
          <div class="text-3xl font-bold text-gray-900">{report.eligibleCount}</div>
          <div class="text-sm text-gray-600">{data.labels.report.eligibleCount}</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- By Source -->
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">{data.labels.report.bySource}</h3>
            <ul class="space-y-1">
              {#each Object.entries(report.bySource) as [source, count]}
                {#if count > 0}
                  <li class="flex justify-between text-sm">
                    <span class="text-gray-600">{source}</span>
                    <span class="font-medium text-gray-900">{count}</span>
                  </li>
                {/if}
              {/each}
            </ul>
          </div>

          <!-- By Status -->
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">{data.labels.report.byStatus}</h3>
            <ul class="space-y-1">
              {#each Object.entries(report.byStatus) as [status, count]}
                {#if count > 0}
                  <li class="flex justify-between text-sm">
                    <span class="text-gray-600">{status}</span>
                    <span class="font-medium text-gray-900">{count}</span>
                  </li>
                {/if}
              {/each}
            </ul>
          </div>

          <!-- By Age -->
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">{data.labels.report.byAge}</h3>
            <ul class="space-y-1">
              {#each Object.entries(report.byAge) as [bucketId, count]}
                {#if count > 0}
                  <li class="flex justify-between text-sm">
                    <span class="text-gray-600">{data.bucketLabels[bucketId] || bucketId}</span>
                    <span class="font-medium text-gray-900">{count}</span>
                  </li>
                {/if}
              {/each}
            </ul>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
