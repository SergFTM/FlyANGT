<script lang="ts">
  /**
   * Token Sections List Component
   *
   * Renders a list of token sections excluding the risk section.
   */

  import TokenSection from './TokenSection.svelte';

  interface Section {
    id: string;
    title: string;
    text: string;
    bullets?: string[];
    ctaLabel?: string;
    ctaHref?: string;
  }

  interface Props {
    sections: Section[];
    riskSectionId: string;
  }

  let { sections, riskSectionId }: Props = $props();

  // Filter out risk section - it's rendered separately
  const displaySections = $derived(sections.filter(s => s.id !== riskSectionId));
</script>

<div class="max-w-4xl mx-auto px-6">
  {#each displaySections as section (section.id)}
    <TokenSection
      id={section.id}
      title={section.title}
      text={section.text}
      bullets={section.bullets}
      ctaLabel={section.ctaLabel}
      ctaHref={section.ctaHref}
    />
  {/each}
</div>
