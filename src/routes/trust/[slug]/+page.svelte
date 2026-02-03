<script lang="ts">
  /**
   * Trust Center Document Detail Page
   *
   * Displays full document details with summary and key points.
   */

  import TrustDocDetail from '$lib/components/trust/TrustDocDetail.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<div class="bg-gray-50 min-h-screen py-8 px-4">
  <TrustDocDetail
    title={data.document.title}
    description={data.document.description}
    summary={data.document.summary}
    keyPoints={data.document.keyPoints}
    category={data.document.categoryLabel}
    docType={data.document.docType}
    version={data.document.version}
    lastUpdated={data.document.lastUpdated}
    isPublic={data.document.isPublic}
    fileUrl={data.document.fileUrl}
    externalUrl={data.document.externalUrl}
    versionLabel={data.versionLabel}
    lastUpdatedLabel={data.lastUpdatedLabel}
    downloadLabel={data.downloadLabel}
    openLinkLabel={data.openLinkLabel}
    restrictedLabel={data.restrictedLabel}
    keyPointsLabel={data.keyPointsLabel}
    backToCatalogLabel={data.backToCatalogLabel}
    backHref={data.backHref}
  />
</div>
