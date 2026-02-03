<script lang="ts">
  /**
   * Cards Grid Component
   *
   * Displays items as cards in a grid layout.
   */

  interface CardItem {
    title: string;
    text: string;
    bullets?: string[];
  }

  interface Props {
    items: CardItem[];
  }

  let { items }: Props = $props();
</script>

<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each items as item}
    <div class="p-5 bg-white rounded-lg border border-gray-200 hover:border-emerald-200 transition-colors">
      <h4 class="font-semibold text-gray-900 mb-2">{item.title}</h4>
      <p class="text-gray-600 text-sm mb-3">{item.text}</p>
      {#if item.bullets && item.bullets.length > 0}
        <ul class="space-y-1">
          {#each item.bullets as bullet}
            <li class="flex items-start gap-2 text-sm text-gray-500">
              <span class="text-emerald-500 mt-0.5">-</span>
              <span>{bullet}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {/each}
</div>
