<script lang="ts">
  /**
   * Customers Sections Component
   *
   * Renders all customer sections in order.
   */

  import CustomerSectionBlock from './CustomerSectionBlock.svelte';

  interface SectionItem {
    title: string;
    text: string;
    bullets?: string[];
  }

  interface SectionData {
    id: string;
    title: string;
    text: string;
    bullets?: string[];
    variant?: 'default' | 'steps' | 'cards';
    items?: SectionItem[];
  }

  interface Props {
    sections: SectionData[];
  }

  let { sections }: Props = $props();
</script>

<div class="bg-white">
  {#each sections as section}
    <CustomerSectionBlock
      id={section.id}
      title={section.title}
      text={section.text}
      bullets={section.bullets}
      variant={section.variant}
      items={section.items}
    />
  {/each}
</div>
