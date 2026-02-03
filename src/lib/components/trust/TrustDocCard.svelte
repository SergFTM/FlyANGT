<script lang="ts">
  /**
   * Trust Document Card Component
   *
   * Card with icon, title, description, meta, and download/link button.
   */

  import type { TrustDocType } from '$config/trust.config';

  interface Props {
    slug: string;
    title: string;
    description: string;
    category: string;
    docType: TrustDocType;
    version: string;
    lastUpdated: string;
    isPublic: boolean;
    versionLabel: string;
    lastUpdatedLabel: string;
    downloadLabel: string;
    openLinkLabel: string;
    restrictedLabel: string;
    detailHref: string;
    fileUrl: string | null;
    externalUrl: string | null;
  }

  let {
    slug,
    title,
    description,
    category,
    docType,
    version,
    lastUpdated,
    isPublic,
    versionLabel,
    lastUpdatedLabel,
    downloadLabel,
    openLinkLabel,
    restrictedLabel,
    detailHref,
    fileUrl,
    externalUrl,
  }: Props = $props();

  // Get icon based on document type
  function getTypeIcon(type: TrustDocType): string {
    switch (type) {
      case 'pdf':
        return 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z';
      case 'docx':
        return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
      case 'link':
        return 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14';
      default:
        return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
    }
  }

  function getTypeColor(type: TrustDocType): string {
    switch (type) {
      case 'pdf':
        return 'text-red-500';
      case 'docx':
        return 'text-blue-500';
      case 'link':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  }
</script>

<div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
  <div class="flex items-start gap-4">
    <div class="flex-shrink-0">
      <svg class="h-10 w-10 {getTypeColor(docType)}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={getTypeIcon(docType)} />
      </svg>
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <a href={detailHref} class="text-lg font-semibold text-gray-900 hover:text-blue-600 truncate">
          {title}
        </a>
        {#if !isPublic}
          <span class="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
            {restrictedLabel}
          </span>
        {/if}
      </div>

      <p class="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

      <div class="flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <span class="px-2 py-1 bg-gray-100 rounded">{category}</span>
        <span class="uppercase">{docType}</span>
        <span>{versionLabel} {version}</span>
        <span>{lastUpdatedLabel}: {lastUpdated}</span>
      </div>
    </div>

    <div class="flex-shrink-0">
      {#if docType === 'link' && externalUrl}
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {openLinkLabel}
        </a>
      {:else if fileUrl}
        <a
          href={fileUrl}
          download
          class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {downloadLabel}
        </a>
      {/if}
    </div>
  </div>
</div>
