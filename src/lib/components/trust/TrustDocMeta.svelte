<script lang="ts">
  /**
   * Trust Document Meta Component
   *
   * Displays version, lastUpdated, and category badge.
   */

  import type { TrustDocType } from '$config/trust.config';

  interface Props {
    category: string;
    docType: TrustDocType;
    version: string;
    lastUpdated: string;
    isPublic: boolean;
    versionLabel: string;
    lastUpdatedLabel: string;
    restrictedLabel: string;
  }

  let {
    category,
    docType,
    version,
    lastUpdated,
    isPublic,
    versionLabel,
    lastUpdatedLabel,
    restrictedLabel,
  }: Props = $props();

  function getTypeColor(type: TrustDocType): string {
    switch (type) {
      case 'pdf':
        return 'bg-red-100 text-red-800';
      case 'docx':
        return 'bg-blue-100 text-blue-800';
      case 'link':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
</script>

<div class="flex flex-wrap items-center gap-3">
  <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
    {category}
  </span>

  <span class="px-3 py-1 {getTypeColor(docType)} rounded-full text-sm font-medium uppercase">
    {docType}
  </span>

  {#if !isPublic}
    <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
      {restrictedLabel}
    </span>
  {/if}

  <span class="text-gray-500 text-sm">
    {versionLabel} {version}
  </span>

  <span class="text-gray-500 text-sm">
    {lastUpdatedLabel}: {lastUpdated}
  </span>
</div>
