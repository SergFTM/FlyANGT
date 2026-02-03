<script lang="ts">
  /**
   * Workflow Step Detail Component
   *
   * Detailed view of a single workflow step.
   */

  interface DocLink {
    label: string;
    href: string;
  }

  interface Props {
    order: number;
    totalSteps: number;
    title: string;
    summary: string;
    checklistTitle: string;
    checklistItems: string[];
    docsTitle: string;
    docs: DocLink[];
    backLabel: string;
    backHref: string;
    stepOfLabel: string;
  }

  let {
    order,
    totalSteps,
    title,
    summary,
    checklistTitle,
    checklistItems,
    docsTitle,
    docs,
    backLabel,
    backHref,
    stepOfLabel,
  }: Props = $props();
</script>

<div class="max-w-4xl mx-auto py-12 px-4">
  <!-- Back link -->
  <a
    href={backHref}
    class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
    </svg>
    {backLabel}
  </a>

  <!-- Step header -->
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
        {order}
      </div>
      <div>
        <h1 class="text-3xl font-bold text-gray-900">{title}</h1>
        <p class="text-gray-500 text-sm">{stepOfLabel}</p>
      </div>
    </div>
    <p class="text-lg text-gray-600">{summary}</p>
  </div>

  <div class="grid md:grid-cols-2 gap-8">
    <!-- Checklist -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">{checklistTitle}</h2>
      <ul class="space-y-3">
        {#each checklistItems as item, index (index)}
          <li class="flex items-start gap-3">
            <div class="flex-shrink-0 w-5 h-5 mt-0.5 border-2 border-gray-300 rounded"></div>
            <span class="text-gray-700">{item}</span>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Required documents -->
    {#if docs.length > 0}
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{docsTitle}</h2>
        <ul class="space-y-3">
          {#each docs as doc, index (index)}
            <li>
              <a
                href={doc.href}
                class="flex items-center gap-3 text-blue-600 hover:text-blue-800 hover:underline"
              >
                <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                {doc.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>
