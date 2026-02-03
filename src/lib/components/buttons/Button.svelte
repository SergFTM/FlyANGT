<script lang="ts">
  /**
   * Button Component
   * 
   * Reusable button with variants and states.
   */

  type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
  type ButtonSize = 'sm' | 'md' | 'lg';

  export let variant: ButtonVariant = 'primary';
  export let size: ButtonSize = 'md';
  export let disabled = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let href: string | undefined = undefined;

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    tertiary: 'bg-transparent border border-gray-300 text-gray-900 hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
</script>

{#if href}
  <a
    {href}
    class="inline-block rounded font-medium transition {variantClasses[variant]} {sizeClasses[size]} {disabled
      ? 'opacity-50 cursor-not-allowed'
      : ''}"
  >
    <slot />
  </a>
{:else}
  <button
    {type}
    {disabled}
    class="rounded font-medium transition {variantClasses[variant]} {sizeClasses[size]} {disabled
      ? 'opacity-50 cursor-not-allowed'
      : ''}"
  >
    <slot />
  </button>
{/if}
