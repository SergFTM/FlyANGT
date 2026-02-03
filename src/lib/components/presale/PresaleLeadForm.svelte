<script lang="ts">
  /**
   * Presale Lead Form Component
   *
   * Collects user interest. Stores to localStorage only (no API).
   * Respects prelaunch lock mode for draft storage.
   */

  import { browser } from '$app/environment';
  import { prelaunchConfig } from '$config/prelaunch.config';
  import { resolveDraftKey, shouldBlockDraftWrites } from '$lib/prelaunch';

  interface FieldLabels {
    name: string;
    email: string;
    country: string;
    interest: string;
    amountUsd: string;
  }

  interface Props {
    title: string;
    text: string;
    fields: FieldLabels;
    submitLabel: string;
    successTitle: string;
    successText: string;
    editLabel: string;
    requiredError: string;
    emailError: string;
    draftsBlockedMessage?: string;
  }

  let {
    title,
    text,
    fields,
    submitLabel,
    successTitle,
    successText,
    editLabel,
    requiredError,
    emailError,
    draftsBlockedMessage = 'Draft saving is disabled.',
  }: Props = $props();

  const BASE_STORAGE_KEY = 'flyangt_presale_lead_draft';
  const STORAGE_KEY = resolveDraftKey(BASE_STORAGE_KEY, prelaunchConfig);
  const draftsBlocked = shouldBlockDraftWrites(prelaunchConfig);

  interface FormData {
    name: string;
    email: string;
    country: string;
    interest: string;
    amountUsd: string;
  }

  interface FormErrors {
    name?: string;
    email?: string;
    country?: string;
  }

  let formData = $state<FormData>({
    name: '',
    email: '',
    country: '',
    interest: '',
    amountUsd: '',
  });

  let errors = $state<FormErrors>({});
  let isSubmitted = $state(false);

  // Load saved draft on mount
  $effect(() => {
    if (browser) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          formData = { ...formData, ...parsed };
          // Check if this was a completed submission
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
    if (!formData.country.trim()) {
      newErrors.country = requiredError;
    }

    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: Event) {
    e.preventDefault();

    if (!validate()) return;

    // Store to localStorage with submission flag (respects lock mode)
    if (browser && !draftsBlocked) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...formData, _submitted: true, _timestamp: Date.now() })
      );
    }

    isSubmitted = true;
  }

  function handleEdit() {
    isSubmitted = false;
    // Remove submission flag but keep data (respects lock mode)
    if (browser && !draftsBlocked) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...formData, _submitted: false })
      );
    }
  }

  function handleInput(field: keyof FormData) {
    return (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      formData[field] = target.value;
      // Clear error on input
      if (field in errors) {
        errors = { ...errors, [field]: undefined };
      }
      // Auto-save draft (respects lock mode)
      if (browser && !draftsBlocked) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      }
    };
  }
</script>

<section id="form" class="py-16 px-4 bg-gray-50">
  <div class="max-w-xl mx-auto">
    {#if isSubmitted}
      <div class="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">{successTitle}</h3>
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
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
        <p class="text-gray-600">{text}</p>
      </div>

      <form onsubmit={handleSubmit} class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        {#if draftsBlocked}
          <div class="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            {draftsBlockedMessage}
          </div>
        {/if}
        <div class="space-y-4">
          <!-- Name -->
          <div>
            <label for="lead-name" class="block text-sm font-medium text-gray-700 mb-1">
              {fields.name} *
            </label>
            <input
              id="lead-name"
              type="text"
              value={formData.name}
              oninput={handleInput('name')}
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 {errors.name ? 'border-red-500' : 'border-gray-300'}"
            />
            {#if errors.name}
              <p class="mt-1 text-sm text-red-600">{errors.name}</p>
            {/if}
          </div>

          <!-- Email -->
          <div>
            <label for="lead-email" class="block text-sm font-medium text-gray-700 mb-1">
              {fields.email} *
            </label>
            <input
              id="lead-email"
              type="email"
              value={formData.email}
              oninput={handleInput('email')}
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 {errors.email ? 'border-red-500' : 'border-gray-300'}"
            />
            {#if errors.email}
              <p class="mt-1 text-sm text-red-600">{errors.email}</p>
            {/if}
          </div>

          <!-- Country -->
          <div>
            <label for="lead-country" class="block text-sm font-medium text-gray-700 mb-1">
              {fields.country} *
            </label>
            <input
              id="lead-country"
              type="text"
              value={formData.country}
              oninput={handleInput('country')}
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 {errors.country ? 'border-red-500' : 'border-gray-300'}"
            />
            {#if errors.country}
              <p class="mt-1 text-sm text-red-600">{errors.country}</p>
            {/if}
          </div>

          <!-- Interest -->
          <div>
            <label for="lead-interest" class="block text-sm font-medium text-gray-700 mb-1">
              {fields.interest}
            </label>
            <textarea
              id="lead-interest"
              value={formData.interest}
              oninput={handleInput('interest')}
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Amount USD -->
          <div>
            <label for="lead-amount" class="block text-sm font-medium text-gray-700 mb-1">
              {fields.amountUsd}
            </label>
            <input
              id="lead-amount"
              type="number"
              value={formData.amountUsd}
              oninput={handleInput('amountUsd')}
              min="100"
              placeholder="100"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          {submitLabel}
        </button>
      </form>
    {/if}
  </div>
</section>
