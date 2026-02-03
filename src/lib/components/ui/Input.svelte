<script lang="ts">
  /**
   * Input Component
   *
   * Reusable text input with label and error states.
   * Uses design tokens for consistent styling.
   */

  interface Props {
    label?: string;
    value?: string;
    placeholder?: string;
    type?: string;
    error?: string;
    required?: boolean;
    id?: string;
    name?: string;
    disabled?: boolean;
  }

  let {
    label,
    value = $bindable(''),
    placeholder = '',
    type = 'text',
    error,
    required = false,
    id,
    name,
    disabled = false,
  }: Props = $props();

  // Generate stable ID on component creation
  const generatedId = `input-${Math.random().toString(36).slice(2, 9)}`;
  const inputId = $derived(id || generatedId);
</script>

<div class="w-full">
  {#if label}
    <label for={inputId} class="block text-sm font-medium text-gray-700 mb-1">
      {label}{#if required}<span class="text-red-500 ml-0.5">*</span>{/if}
    </label>
  {/if}
  <input
    id={inputId}
    {name}
    {type}
    {placeholder}
    {disabled}
    {required}
    bind:value
    class="w-full px-3 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500
      {error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}"
  />
  {#if error}
    <p class="mt-1 text-sm text-red-600">{error}</p>
  {/if}
</div>
