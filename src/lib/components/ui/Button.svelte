<script lang="ts">
  /**
   * Button Component
   *
   * Reusable button with variants and sizes.
   * Uses design tokens for consistent styling.
   */

  import type { Snippet } from 'svelte';

  type ButtonVariant = 'primary' | 'secondary' | 'ghost';
  type ButtonSize = 'sm' | 'md';

  interface Props {
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onclick?: () => void;
    children: Snippet;
  }

  let {
    variant = 'primary',
    size = 'md',
    href,
    type = 'button',
    disabled = false,
    onclick,
    children,
  }: Props = $props();

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300 focus:ring-gray-400',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';
</script>

{#if href && !disabled}
  <a
    {href}
    class="{baseClasses} {variantClasses[variant]} {sizeClasses[size]}"
    role="button"
  >
    {@render children()}
  </a>
{:else}
  <button
    {type}
    {disabled}
    onclick={onclick}
    class="{baseClasses} {variantClasses[variant]} {sizeClasses[size]} {disabled ? disabledClasses : ''}"
  >
    {@render children()}
  </button>
{/if}
