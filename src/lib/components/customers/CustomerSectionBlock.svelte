<script lang="ts">
  /**
   * Customer Section Block Component
   *
   * Renders a single customer section with optional variants.
   */

  import StepsList from './StepsList.svelte';
  import CardsGrid from './CardsGrid.svelte';

  interface SectionItem {
    title: string;
    text: string;
    bullets?: string[];
  }

  interface Props {
    id: string;
    title: string;
    text: string;
    bullets?: string[];
    variant?: 'default' | 'steps' | 'cards';
    items?: SectionItem[];
  }

  let { id, title, text, bullets, variant = 'default', items }: Props = $props();
</script>

<section {id} class="py-12 border-b border-gray-100 last:border-b-0">
  <div class="max-w-4xl mx-auto px-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
    <p class="text-gray-600 mb-6">{text}</p>

    {#if variant === 'steps' && items && items.length > 0}
      <StepsList {items} />
    {:else if variant === 'cards' && items && items.length > 0}
      <CardsGrid {items} />
    {:else if bullets && bullets.length > 0}
      <ul class="space-y-2">
        {#each bullets as bullet}
          <li class="flex items-start gap-2">
            <svg
              class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span class="text-gray-700">{bullet}</span>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</section>
