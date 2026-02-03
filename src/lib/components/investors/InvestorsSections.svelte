<script lang="ts">
  /**
   * Investors Sections Component
   *
   * Renders all investor sections in order.
   */

  import InvestorsSectionBlock from './InvestorsSectionBlock.svelte';

  interface SectionData {
    id: string;
    title: string;
    text: string;
    bullets?: string[];
    variant?: 'default' | 'checklist' | 'cards';
    ctaLabel?: string;
    ctaHref?: string;
  }

  interface Props {
    sections: SectionData[];
  }

  let { sections }: Props = $props();
</script>

<div class="bg-white">
  {#each sections as section}
    <InvestorsSectionBlock
      id={section.id}
      title={section.title}
      text={section.text}
      bullets={section.bullets}
      variant={section.variant}
      ctaLabel={section.ctaLabel}
      ctaHref={section.ctaHref}
    />
  {/each}
</div>
