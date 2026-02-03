<script lang="ts">
  /**
   * Configurator Request Quote Component
   *
   * Modal/inline form for requesting a quote.
   * Stores to localStorage only (no API).
   * Respects prelaunch lock mode for draft storage.
   */

  import { browser } from '$app/environment';
  import { prelaunchConfig } from '$config/prelaunch.config';
  import { resolveDraftKey, shouldBlockDraftWrites } from '$lib/prelaunch';
  import type { SelectionState } from '$lib/models/configurator.model';

  interface FormFields {
    name: string;
    email: string;
    notes: string;
  }

  interface Props {
    isOpen: boolean;
    title: string;
    text: string;
    fields: FormFields;
    submitLabel: string;
    successTitle: string;
    successText: string;
    requiredError: string;
    emailError: string;
    editLabel: string;
    currentSelections: SelectionState;
    totalUsd: number;
    onClose: () => void;
    draftsBlockedMessage?: string;
  }

  let {
    isOpen,
    title,
    text,
    fields,
    submitLabel,
    successTitle,
    successText,
    requiredError,
    emailError,
    editLabel,
    currentSelections,
    totalUsd,
    onClose,
    draftsBlockedMessage = 'Draft saving is disabled.',
  }: Props = $props();

  const BASE_STORAGE_KEY = 'flyangt_quote_draft';
  const STORAGE_KEY = resolveDraftKey(BASE_STORAGE_KEY, prelaunchConfig);
  const draftsBlocked = shouldBlockDraftWrites(prelaunchConfig);

  interface FormData {
    name: string;
    email: string;
    notes: string;
  }

  interface FormErrors {
    name?: string;
    email?: string;
  }

  let formData = $state<FormData>({ name: '', email: '', notes: '' });
  let errors = $state<FormErrors>({});
  let isSubmitted = $state(false);

  // Load saved draft
  $effect(() => {
    if (browser && isOpen) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.formData) {
            formData = { ...formData, ...parsed.formData };
          }
          if (parsed._submitted) {
            isSubmitted = true;
          }
        } catch {
          // Ignore parse errors
        }
      }
    }
  });

  function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = requiredError;
    }
    if (!formData.email.trim()) {
      newErrors.email = requiredError;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = emailError;
    }

    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: Event) {
    e.preventDefault();

    if (!validate()) return;

    // Store to localStorage (respects lock mode)
    if (browser && !draftsBlocked) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          formData,
          selections: currentSelections,
          totalUsd,
          _submitted: true,
          _timestamp: Date.now(),
        })
      );
    }

    isSubmitted = true;
  }

  function handleEdit() {
    isSubmitted = false;
    if (browser && !draftsBlocked) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          formData,
          selections: currentSelections,
          totalUsd,
          _submitted: false,
        })
      );
    }
  }

  function handleInput(field: keyof FormData) {
    return (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      formData[field] = target.value;
      if (field in errors) {
        errors = { ...errors, [field]: undefined };
      }
    };
  }

  function handleClose() {
    onClose();
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_interactive_supports_focus -->
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    onclick={handleClose}
    role="dialog"
    aria-modal="true"
    aria-labelledby="quote-modal-title"
  >
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      class="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      onclick={(e) => e.stopPropagation()}
    >
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <h2 id="quote-modal-title" class="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            type="button"
            onclick={handleClose}
            aria-label="Close"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {#if isSubmitted}
          <div class="text-center py-8">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{successTitle}</h3>
            <p class="text-gray-600 mb-6">{successText}</p>
            <button
              type="button"
              onclick={handleEdit}
              class="text-blue-600 hover:text-blue-800 font-medium"
            >
              {editLabel}
            </button>
          </div>
        {:else}
          <p class="text-gray-600 mb-6">{text}</p>

          <form onsubmit={handleSubmit} class="space-y-4">
            {#if draftsBlocked}
              <div class="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                {draftsBlockedMessage}
              </div>
            {/if}
            <div>
              <label for="quote-name" class="block text-sm font-medium text-gray-700 mb-1">
                {fields.name} *
              </label>
              <input
                id="quote-name"
                type="text"
                value={formData.name}
                oninput={handleInput('name')}
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 {errors.name ? 'border-red-500' : 'border-gray-300'}"
              />
              {#if errors.name}
                <p class="mt-1 text-sm text-red-600">{errors.name}</p>
              {/if}
            </div>

            <div>
              <label for="quote-email" class="block text-sm font-medium text-gray-700 mb-1">
                {fields.email} *
              </label>
              <input
                id="quote-email"
                type="email"
                value={formData.email}
                oninput={handleInput('email')}
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 {errors.email ? 'border-red-500' : 'border-gray-300'}"
              />
              {#if errors.email}
                <p class="mt-1 text-sm text-red-600">{errors.email}</p>
              {/if}
            </div>

            <div>
              <label for="quote-notes" class="block text-sm font-medium text-gray-700 mb-1">
                {fields.notes}
              </label>
              <textarea
                id="quote-notes"
                value={formData.notes}
                oninput={handleInput('notes')}
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {submitLabel}
            </button>
          </form>
        {/if}
      </div>
    </div>
  </div>
{/if}
