<script lang="ts">
  /**
   * Migration Prep Page
   *
   * DEV-ONLY tool for exporting data in formats ready for Prisma/Postgres migration.
   */

  let { data } = $props();

  // Copy state per artifact
  let copiedRaw = $state(false);
  let copiedSeed = $state(false);
  let copiedMap = $state(false);
  let copiedMapMd = $state(false);
  let copiedValidation = $state(false);

  /**
   * Download JSON data as a file
   */
  function downloadJson(filename: string, content: unknown) {
    const json = JSON.stringify(content, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Download text content as a file
   */
  function downloadText(filename: string, content: string) {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Copy content to clipboard
   */
  async function copyToClipboard(content: unknown, setCopied: (v: boolean) => void) {
    const text = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  // Download handlers
  function handleDownloadRaw() {
    downloadJson(`${data.config.exportFilePrefix}-raw.json`, data.rawExport);
  }

  function handleDownloadSeed() {
    downloadJson(`${data.config.exportFilePrefix}-seed.json`, data.seedExport);
  }

  function handleDownloadMapJson() {
    downloadJson(`${data.config.exportFilePrefix}-map.json`, data.migrationMap);
  }

  function handleDownloadMapMd() {
    downloadText(`${data.config.exportFilePrefix}-map.md`, data.migrationMapMd);
  }

  function handleDownloadValidation() {
    downloadJson(`${data.config.exportFilePrefix}-validation.json`, data.validationReport);
  }

  // Copy handlers
  function handleCopyRaw() {
    copyToClipboard(data.rawExport, (v) => { copiedRaw = v; });
  }

  function handleCopySeed() {
    copyToClipboard(data.seedExport, (v) => { copiedSeed = v; });
  }

  function handleCopyMapJson() {
    copyToClipboard(data.migrationMap, (v) => { copiedMap = v; });
  }

  function handleCopyMapMd() {
    copyToClipboard(data.migrationMapMd, (v) => { copiedMapMd = v; });
  }

  function handleCopyValidation() {
    copyToClipboard(data.validationReport, (v) => { copiedValidation = v; });
  }

  // Validation summary
  const validationSummary = $derived(() => {
    const r = data.validationReport;
    return [
      { label: data.labels.validation.invalidEmails, count: r.issues.invalidEmails.length },
      { label: data.labels.validation.duplicates, count: r.issues.duplicatesByEmail.length },
      { label: data.labels.validation.missingFields, count: r.issues.missingFields.length },
      { label: data.labels.validation.invalidStatuses, count: r.issues.invalidStatuses.length },
      { label: data.labels.validation.oversizedNotes, count: r.issues.oversizedNotes.length },
      { label: data.labels.validation.warnings, count: r.issues.warnings.length },
    ];
  });
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
      <div class="mt-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg inline-block">
        <span class="text-sm text-amber-700">{data.labels.devOnly}</span>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white border border-gray-200 rounded-lg p-4">
        <div class="text-2xl font-bold text-blue-600">{data.seedExport.counts.leads}</div>
        <div class="text-sm text-gray-600">{data.labels.summary.leadsCount}</div>
      </div>
      <div class="bg-white border border-gray-200 rounded-lg p-4">
        <div class="text-2xl font-bold text-green-600">{data.seedExport.counts.requests}</div>
        <div class="text-sm text-gray-600">{data.labels.summary.requestsCount}</div>
      </div>
      <div class="bg-white border border-gray-200 rounded-lg p-4">
        <div class="text-2xl font-bold text-purple-600">{data.seedExport.counts.notes}</div>
        <div class="text-sm text-gray-600">{data.labels.summary.notesCount}</div>
      </div>
      <div class="bg-white border border-gray-200 rounded-lg p-4">
        <div class="text-2xl font-bold text-orange-600">{data.seedExport.counts.tags}</div>
        <div class="text-sm text-gray-600">{data.labels.summary.tagsCount}</div>
      </div>
    </div>

    <!-- Export Artifacts Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- Raw Export -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-2">{data.labels.sections.export}</h2>
        <p class="text-sm text-gray-500 mb-4">
          {data.locale === 'ru' ? 'Полные данные лидов и заявок в оригинальном формате.' : 'Complete leads and requests data in original format.'}
        </p>
        <div class="flex gap-2">
          <button
            type="button"
            class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            onclick={handleDownloadRaw}
          >
            {data.labels.actions.downloadRaw}
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            onclick={handleCopyRaw}
          >
            {copiedRaw ? data.labels.actions.copyDone : data.labels.actions.copy}
          </button>
        </div>
      </div>

      <!-- Seed Export -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-2">{data.labels.sections.seed}</h2>
        <p class="text-sm text-gray-500 mb-4">
          {data.locale === 'ru' ? 'Нормализованные таблицы для Prisma seed.' : 'Normalized tables ready for Prisma seed.'}
        </p>
        <div class="flex gap-2">
          <button
            type="button"
            class="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            onclick={handleDownloadSeed}
          >
            {data.labels.actions.downloadSeed}
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            onclick={handleCopySeed}
          >
            {copiedSeed ? data.labels.actions.copyDone : data.labels.actions.copy}
          </button>
        </div>
      </div>

      <!-- Migration Map JSON -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-2">{data.labels.sections.map}</h2>
        <p class="text-sm text-gray-500 mb-4">
          {data.locale === 'ru' ? 'Схема маппинга полей для миграции (JSON).' : 'Field mapping schema for migration (JSON).'}
        </p>
        <div class="flex gap-2">
          <button
            type="button"
            class="flex-1 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            onclick={handleDownloadMapJson}
          >
            {data.labels.actions.downloadMapJson}
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            onclick={handleCopyMapJson}
          >
            {copiedMap ? data.labels.actions.copyDone : data.labels.actions.copy}
          </button>
        </div>
        <!-- Markdown version -->
        <div class="flex gap-2 mt-2">
          <button
            type="button"
            class="flex-1 px-4 py-2 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
            onclick={handleDownloadMapMd}
          >
            {data.labels.actions.downloadMapMd}
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            onclick={handleCopyMapMd}
          >
            {copiedMapMd ? data.labels.actions.copyDone : data.labels.actions.copy}
          </button>
        </div>
      </div>

      <!-- Validation Report -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-2">{data.labels.sections.validation}</h2>
        <p class="text-sm text-gray-500 mb-4">
          {data.locale === 'ru' ? 'Отчет о проверке целостности данных.' : 'Data integrity validation report.'}
        </p>
        <div class="flex gap-2">
          <button
            type="button"
            class="flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
            onclick={handleDownloadValidation}
          >
            {data.labels.actions.downloadValidation}
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            onclick={handleCopyValidation}
          >
            {copiedValidation ? data.labels.actions.copyDone : data.labels.actions.copy}
          </button>
        </div>
      </div>
    </div>

    <!-- Validation Summary -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">{data.labels.validation.title}</h2>

      {#if data.validationReport.summary.hasIssues}
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          {#each validationSummary() as item}
            <div class="flex items-center justify-between p-3 rounded-lg {item.count > 0 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}">
              <span class="text-sm text-gray-700">{item.label}</span>
              <span class="font-semibold {item.count > 0 ? 'text-red-600' : 'text-green-600'}">{item.count}</span>
            </div>
          {/each}
        </div>
      {:else}
        <div class="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-green-700 font-medium">{data.labels.validation.passed}</span>
        </div>
      {/if}
    </div>

    <!-- Links to related tools -->
    <div class="mt-8 flex gap-4">
      <a
        href={data.config.links.adminPath}
        class="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
      >
        {data.locale === 'ru' ? 'Админ-панель' : 'Admin Viewer'}
      </a>
      <a
        href={data.config.links.publishPath}
        class="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
      >
        {data.locale === 'ru' ? 'Публикация' : 'Publish Tool'}
      </a>
    </div>
  </div>
</div>
