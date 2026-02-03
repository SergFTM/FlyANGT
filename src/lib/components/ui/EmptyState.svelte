<script lang="ts">
  /**
   * EmptyState Component
   *
   * Displays when no content is available.
   * Uses Card and Container for consistent styling.
   */

  import Button from './Button.svelte';

  type EmptyStateVariant = 'default' | 'info';

  interface Props {
    title: string;
    text?: string;
    actionLabel?: string;
    actionHref?: string;
    variant?: EmptyStateVariant;
  }

  let {
    title,
    text,
    actionLabel,
    actionHref,
    variant = 'default',
  }: Props = $props();

  const iconColor = $derived(variant === 'info' ? 'text-blue-400' : 'text-gray-400');
  const bgColor = $derived(variant === 'info' ? 'bg-blue-50' : 'bg-gray-50');
</script>

<div class="max-w-md mx-auto">
  <div class="p-8 rounded-xl border border-gray-200 {bgColor} text-center">
    <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-sm">
      {#if variant === 'info'}
        <svg class="w-8 h-8 {iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      {:else}
        <svg class="w-8 h-8 {iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
      {/if}
    </div>
    <h3 class="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    {#if text}
      <p class="text-gray-600 mb-6">{text}</p>
    {/if}
    {#if actionLabel && actionHref}
      <Button href={actionHref} variant="primary" size="sm">
        {actionLabel}
      </Button>
    {/if}
  </div>
</div>
