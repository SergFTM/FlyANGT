<script lang="ts">
  /**
   * Trust Document Detail Component
   *
   * Full document detail view with summary, key points, and actions.
   */

  import type { TrustDocType } from '$config/trust.config';
  import TrustDocMeta from './TrustDocMeta.svelte';

  interface Props {
    title: string;
    description: string;
    summary: string;
    keyPoints: string[];
    category: string;
    docType: TrustDocType;
    version: string;
    lastUpdated: string;
    isPublic: boolean;
    fileUrl: string | null;
    externalUrl: string | null;
    versionLabel: string;
    lastUpdatedLabel: string;
    downloadLabel: string;
    openLinkLabel: string;
    restrictedLabel: string;
    keyPointsLabel: string;
    backToCatalogLabel: string;
    backHref: string;
  }

  let {
    title,
    description,
    summary,
    keyPoints,
    category,
    docType,
    version,
    lastUpdated,
    isPublic,
    fileUrl,
    externalUrl,
    versionLabel,
    lastUpdatedLabel,
    downloadLabel,
    openLinkLabel,
    restrictedLabel,
    keyPointsLabel,
    backToCatalogLabel,
    backHref,
  }: Props = $props();
</script>

<div class="max-w-4xl mx-auto">
  <a href={backHref} class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    {backToCatalogLabel}
  </a>

  <h1 class="text-3xl font-bold text-gray-900 mb-4">{title}</h1>

  <TrustDocMeta
    {category}
    {docType}
    {version}
    {lastUpdated}
    {isPublic}
    {versionLabel}
    {lastUpdatedLabel}
    {restrictedLabel}
  />

  <div class="mt-8 bg-white border border-gray-200 rounded-lg p-6">
    <p class="text-gray-600 text-lg mb-6">{description}</p>

    <div class="prose prose-gray max-w-none mb-6">
      <p>{summary}</p>
    </div>

    {#if keyPoints.length > 0}
      <div class="mt-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{keyPointsLabel}</h2>
        <ul class="space-y-2">
          {#each keyPoints as point}
            <li class="flex items-start gap-3">
              <svg class="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">{point}</span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    <div class="mt-8 pt-6 border-t border-gray-200">
      {#if docType === 'link' && externalUrl}
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {openLinkLabel}
        </a>
      {:else if fileUrl}
        <a
          href={fileUrl}
          download
          class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {downloadLabel}
        </a>
      {/if}
    </div>
  </div>
</div>
