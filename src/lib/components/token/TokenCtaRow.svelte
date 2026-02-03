<script lang="ts">
  /**
   * Token CTA Row Component
   *
   * Row of CTAs for quick navigation to related pages.
   */

  interface CtaItem {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
  }

  interface Props {
    items: CtaItem[];
  }

  let { items }: Props = $props();
</script>

<div class="max-w-4xl mx-auto px-6 py-8">
  <div class="flex flex-wrap gap-4 justify-center">
    {#each items as item (item.href)}
      <a
        href={item.href}
        class="px-6 py-3 rounded-lg font-medium transition-colors {item.variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}"
      >
        {item.label}
      </a>
    {/each}
  </div>
</div>
