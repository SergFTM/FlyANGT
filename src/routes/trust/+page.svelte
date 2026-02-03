<script lang="ts">
  /**
   * Trust Center Catalog Page
   *
   * Displays filterable document catalog with search.
   */

  import TrustCenterHeader from '$lib/components/trust/TrustCenterHeader.svelte';
  import TrustCategoryChips from '$lib/components/trust/TrustCategoryChips.svelte';
  import TrustFilters from '$lib/components/trust/TrustFilters.svelte';
  import TrustDocCard from '$lib/components/trust/TrustDocCard.svelte';
  import { EmptyState } from '$lib/components/ui';
  import type { TrustDocCategory, TrustDocType } from '$config/trust.config';

  let { data } = $props();

  // Filter state
  let searchQuery = $state('');
  let selectedCategory = $state<TrustDocCategory | 'all'>('all');
  let selectedType = $state<TrustDocType | 'all'>('all');
  let selectedSort = $state<'newest' | 'oldest' | 'name'>('newest');

  // Filter and sort documents
  let filteredDocuments = $derived(() => {
    let docs = data.documents;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      docs = docs.filter(
        doc =>
          doc.title.toLowerCase().includes(query) ||
          doc.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      docs = docs.filter(doc => doc.category === selectedCategory);
    }

    // Filter by type
    if (selectedType !== 'all') {
      docs = docs.filter(doc => doc.docType === selectedType);
    }

    // Sort documents
    switch (selectedSort) {
      case 'newest':
        docs = [...docs].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'oldest':
        docs = [...docs].sort((a, b) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime());
        break;
      case 'name':
        docs = [...docs].sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return docs;
  });

  function getLangParam(): string {
    return data.locale !== 'en' ? `?lang=${data.locale}` : '';
  }
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<TrustCenterHeader
  title={data.pageTitle}
  subtitle={data.pageSubtitle}
  searchPlaceholder={data.searchPlaceholder}
  searchValue={searchQuery}
  onSearch={(value) => searchQuery = value}
/>

<div class="max-w-6xl mx-auto px-4 py-8">
  <div class="mb-6">
    <TrustCategoryChips
      categories={data.categoryChips}
      {selectedCategory}
      onSelect={(cat) => selectedCategory = cat}
    />
  </div>

  <div class="mb-8">
    <TrustFilters
      categoryLabel={data.categoryLabel}
      typeLabel={data.typeLabel}
      categories={data.categoryOptions}
      types={data.typeOptions}
      sortOptions={data.sortOptions}
      {selectedCategory}
      {selectedType}
      {selectedSort}
      onCategoryChange={(cat) => selectedCategory = cat}
      onTypeChange={(type) => selectedType = type}
      onSortChange={(sort) => selectedSort = sort}
    />
  </div>

  <div class="mb-4 text-gray-600">
    {filteredDocuments().length} {data.docCountLabel}
  </div>

  {#if filteredDocuments().length === 0}
    <EmptyState
      title={data.noResultsText}
      variant="default"
    />
  {:else}
    <div id="documents" class="space-y-4">
      {#each filteredDocuments() as doc (doc.id)}
        <TrustDocCard
          slug={doc.slug}
          title={doc.title}
          description={doc.description}
          category={doc.categoryLabel}
          docType={doc.docType}
          version={doc.version}
          lastUpdated={doc.lastUpdated}
          isPublic={doc.isPublic}
          versionLabel={data.versionLabel}
          lastUpdatedLabel={data.lastUpdatedLabel}
          downloadLabel={data.downloadLabel}
          openLinkLabel={data.openLinkLabel}
          restrictedLabel={data.restrictedLabel}
          detailHref="/trust/{doc.slug}{getLangParam()}"
          fileUrl={doc.fileUrl}
          externalUrl={doc.externalUrl}
        />
      {/each}
    </div>
  {/if}
</div>
