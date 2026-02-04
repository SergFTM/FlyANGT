<script lang="ts">
  /**
   * Request Docs Form Component
   *
   * Form for requesting documentation with localStorage persistence.
   * Respects prelaunch lock mode for draft storage.
   * Submits to /api/leads with source='customers_docs'.
   */

  import { prelaunchConfig } from '$config/prelaunch.config';
  import { resolveDraftKey, shouldBlockDraftWrites } from '$lib/prelaunch';

  interface InterestOption {
    id: string;
    label: string;
  }

  interface Props {
    title: string;
    text: string;
    fields: {
      name: string;
      email: string;
      phone: string;
      country: string;
      interest: string;
      notes: string;
    };
    interestOptions: InterestOption[];
    submitLabel: string;
    successTitle: string;
    successText: string;
    editLabel: string;
    requiredLabel: string;
    invalidEmailLabel: string;
    storageKey: string;
    draftsBlockedMessage?: string;
    locale?: 'en' | 'ru';
    // i18n labels for submission
    sendingLabel?: string;
    submitErrorLabel?: string;
    retryLabel?: string;
    referenceIdLabel?: string;
  }

  let {
    title,
    text,
    fields,
    interestOptions,
    submitLabel,
    successTitle,
    successText,
    editLabel,
    requiredLabel,
    invalidEmailLabel,
    storageKey,
    draftsBlockedMessage = 'Draft saving is disabled.',
    locale = 'en',
    sendingLabel = 'Sending...',
    submitErrorLabel = 'Failed to submit. Please try again.',
    retryLabel = 'Retry',
    referenceIdLabel = 'Reference ID',
  }: Props = $props();

  // Resolve storage key based on prelaunch mode
  const effectiveStorageKey = $derived(resolveDraftKey(storageKey, prelaunchConfig));
  const draftsBlocked = shouldBlockDraftWrites(prelaunchConfig);

  // Form state
  let name = $state('');
  let email = $state('');
  let phone = $state('');
  let country = $state('');
  let interest = $state('');
  let notes = $state('');

  // UI state
  let submitted = $state(false);
  let submitting = $state(false);
  let submitError = $state<string | null>(null);
  let submittedId = $state<string | null>(null);
  let errors = $state<Record<string, string>>({});

  // Load from localStorage on mount
  $effect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(effectiveStorageKey);
      if (stored) {
        try {
          const data = JSON.parse(stored);
          name = data.name || '';
          email = data.email || '';
          phone = data.phone || '';
          country = data.country || '';
          interest = data.interest || '';
          notes = data.notes || '';
          submitted = data.submitted || false;
          submittedId = data.submittedId || null;
        } catch {
          // Invalid stored data, ignore
        }
      }
    }
  });

  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = requiredLabel;
    }
    if (!email.trim()) {
      newErrors.email = requiredLabel;
    } else if (!validateEmail(email)) {
      newErrors.email = invalidEmailLabel;
    }
    if (!country.trim()) {
      newErrors.country = requiredLabel;
    }
    if (!interest) {
      newErrors.interest = requiredLabel;
    }

    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Reset error state
    submitError = null;
    submitting = true;

    try {
      // Submit to API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'customers_docs',
          locale,
          email,
          name,
          phone: phone || undefined,
          country,
          interest,
          notes: notes || undefined,
          meta: {
            interestLabel: interestOptions.find(o => o.id === interest)?.label,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.errors?.join(', ') || 'Submission failed');
      }

      // Store the submitted ID
      submittedId = result.id;

      // Save to localStorage (respects lock mode)
      const data = {
        name,
        email,
        phone,
        country,
        interest,
        notes,
        submitted: true,
        submittedAt: new Date().toISOString(),
        submittedId: result.id,
      };

      if (typeof window !== 'undefined' && !draftsBlocked) {
        localStorage.setItem(effectiveStorageKey, JSON.stringify(data));
      }

      submitted = true;
    } catch (err) {
      submitError = err instanceof Error ? err.message : submitErrorLabel;
    } finally {
      submitting = false;
    }
  }

  function handleEdit() {
    submitted = false;

    // Update storage (respects lock mode)
    const data = {
      name,
      email,
      phone,
      country,
      interest,
      notes,
      submitted: false,
    };

    if (typeof window !== 'undefined' && !draftsBlocked) {
      localStorage.setItem(effectiveStorageKey, JSON.stringify(data));
    }
  }
</script>

<section id="request-docs" class="py-12 bg-white">
  <div class="max-w-2xl mx-auto px-6">
    {#if submitted}
      <!-- Success state -->
      <div class="text-center py-8 bg-emerald-50 rounded-xl border border-emerald-200">
        <div
          class="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center"
        >
          <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">{successTitle}</h2>
        <p class="text-gray-600 mb-4">{successText}</p>
        {#if submittedId}
          <p class="text-sm text-gray-500 mb-6">
            {referenceIdLabel}: <code class="px-2 py-1 bg-gray-100 rounded text-xs">{submittedId}</code>
          </p>
        {/if}
        <button
          onclick={handleEdit}
          class="px-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium"
        >
          {editLabel}
        </button>
      </div>
    {:else}
      <!-- Form -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
        <p class="text-gray-600">{text}</p>
      </div>

      <form onsubmit={handleSubmit} class="space-y-6">
        {#if draftsBlocked}
          <div class="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            {draftsBlockedMessage}
          </div>
        {/if}
        <!-- Name -->
        <div>
          <label for="docs-name" class="block text-sm font-medium text-gray-700 mb-1"
            >{fields.name} *</label
          >
          <input
            id="docs-name"
            type="text"
            bind:value={name}
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          {#if errors.name}
            <p class="mt-1 text-sm text-red-600">{errors.name}</p>
          {/if}
        </div>

        <!-- Email and Phone -->
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label for="docs-email" class="block text-sm font-medium text-gray-700 mb-1"
              >{fields.email} *</label
            >
            <input
              id="docs-email"
              type="email"
              bind:value={email}
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            {#if errors.email}
              <p class="mt-1 text-sm text-red-600">{errors.email}</p>
            {/if}
          </div>

          <div>
            <label for="docs-phone" class="block text-sm font-medium text-gray-700 mb-1"
              >{fields.phone}</label
            >
            <input
              id="docs-phone"
              type="tel"
              bind:value={phone}
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        <!-- Country and Interest -->
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label for="docs-country" class="block text-sm font-medium text-gray-700 mb-1"
              >{fields.country} *</label
            >
            <input
              id="docs-country"
              type="text"
              bind:value={country}
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            {#if errors.country}
              <p class="mt-1 text-sm text-red-600">{errors.country}</p>
            {/if}
          </div>

          <div>
            <label for="docs-interest" class="block text-sm font-medium text-gray-700 mb-1"
              >{fields.interest} *</label
            >
            <select
              id="docs-interest"
              bind:value={interest}
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">--</option>
              {#each interestOptions as option}
                <option value={option.id}>{option.label}</option>
              {/each}
            </select>
            {#if errors.interest}
              <p class="mt-1 text-sm text-red-600">{errors.interest}</p>
            {/if}
          </div>
        </div>

        <!-- Notes -->
        <div>
          <label for="docs-notes" class="block text-sm font-medium text-gray-700 mb-1"
            >{fields.notes}</label
          >
          <textarea
            id="docs-notes"
            bind:value={notes}
            rows={4}
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          ></textarea>
        </div>

        <!-- Error message -->
        {#if submitError}
          <div class="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {submitError}
          </div>
        {/if}

        <!-- Submit -->
        <button
          type="submit"
          disabled={submitting}
          class="w-full px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? sendingLabel : submitLabel}
        </button>
      </form>
    {/if}
  </div>
</section>
