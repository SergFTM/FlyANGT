<script lang="ts">
  /**
   * Become Partner Form Component
   *
   * Partner application form with localStorage persistence.
   * Respects prelaunch lock mode for draft storage.
   */

  import { prelaunchConfig } from '$config/prelaunch.config';
  import { resolveDraftKey, shouldBlockDraftWrites } from '$lib/prelaunch';

  interface TypeOption {
    id: string;
    label: string;
  }

  interface RegionOption {
    id: string;
    label: string;
  }

  interface Props {
    title: string;
    text: string;
    fields: {
      company: string;
      name: string;
      email: string;
      type: string;
      region: string;
      message: string;
    };
    submitLabel: string;
    successTitle: string;
    successText: string;
    editLabel: string;
    requiredLabel: string;
    invalidEmailLabel: string;
    types: TypeOption[];
    regions: RegionOption[];
    storageKey: string;
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
    requiredLabel,
    invalidEmailLabel,
    types,
    regions,
    storageKey,
    draftsBlockedMessage = 'Draft saving is disabled.',
  }: Props = $props();

  // Resolve storage key based on prelaunch mode
  const effectiveStorageKey = $derived(resolveDraftKey(storageKey, prelaunchConfig));
  const draftsBlocked = shouldBlockDraftWrites(prelaunchConfig);

  // Form state
  let company = $state('');
  let contactName = $state('');
  let email = $state('');
  let selectedType = $state('');
  let selectedRegion = $state('');
  let message = $state('');

  // UI state
  let submitted = $state(false);
  let errors = $state<Record<string, string>>({});

  // Load from localStorage on mount
  $effect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(effectiveStorageKey);
      if (stored) {
        try {
          const data = JSON.parse(stored);
          company = data.company || '';
          contactName = data.contactName || '';
          email = data.email || '';
          selectedType = data.selectedType || '';
          selectedRegion = data.selectedRegion || '';
          message = data.message || '';
          submitted = data.submitted || false;
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

    if (!company.trim()) {
      newErrors.company = requiredLabel;
    }
    if (!contactName.trim()) {
      newErrors.contactName = requiredLabel;
    }
    if (!email.trim()) {
      newErrors.email = requiredLabel;
    } else if (!validateEmail(email)) {
      newErrors.email = invalidEmailLabel;
    }
    if (!selectedType) {
      newErrors.selectedType = requiredLabel;
    }
    if (!selectedRegion) {
      newErrors.selectedRegion = requiredLabel;
    }

    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: Event) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Save to localStorage (respects lock mode)
    const data = {
      company,
      contactName,
      email,
      selectedType,
      selectedRegion,
      message,
      submitted: true,
      submittedAt: new Date().toISOString(),
    };

    if (typeof window !== 'undefined' && !draftsBlocked) {
      localStorage.setItem(effectiveStorageKey, JSON.stringify(data));
    }

    submitted = true;
  }

  function handleEdit() {
    submitted = false;

    // Update storage (respects lock mode)
    const data = {
      company,
      contactName,
      email,
      selectedType,
      selectedRegion,
      message,
      submitted: false,
    };

    if (typeof window !== 'undefined' && !draftsBlocked) {
      localStorage.setItem(effectiveStorageKey, JSON.stringify(data));
    }
  }
</script>

<section id="become-partner" class="py-12 bg-white">
  <div class="max-w-2xl mx-auto px-6">
    {#if submitted}
      <!-- Success state -->
      <div class="text-center py-8 bg-emerald-50 rounded-xl border border-emerald-200">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">{successTitle}</h2>
        <p class="text-gray-600 mb-6">{successText}</p>
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
        <!-- Company -->
        <div>
          <label for="partner-company" class="block text-sm font-medium text-gray-700 mb-1">{fields.company} *</label>
          <input
            id="partner-company"
            type="text"
            bind:value={company}
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          {#if errors.company}
            <p class="mt-1 text-sm text-red-600">{errors.company}</p>
          {/if}
        </div>

        <!-- Contact Name -->
        <div>
          <label for="partner-contact-name" class="block text-sm font-medium text-gray-700 mb-1">{fields.name} *</label>
          <input
            id="partner-contact-name"
            type="text"
            bind:value={contactName}
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          {#if errors.contactName}
            <p class="mt-1 text-sm text-red-600">{errors.contactName}</p>
          {/if}
        </div>

        <!-- Email -->
        <div>
          <label for="partner-email" class="block text-sm font-medium text-gray-700 mb-1">{fields.email} *</label>
          <input
            id="partner-email"
            type="email"
            bind:value={email}
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          {#if errors.email}
            <p class="mt-1 text-sm text-red-600">{errors.email}</p>
          {/if}
        </div>

        <!-- Type and Region -->
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label for="partner-type" class="block text-sm font-medium text-gray-700 mb-1">{fields.type} *</label>
            <select
              id="partner-type"
              bind:value={selectedType}
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">--</option>
              {#each types as type}
                <option value={type.id}>{type.label}</option>
              {/each}
            </select>
            {#if errors.selectedType}
              <p class="mt-1 text-sm text-red-600">{errors.selectedType}</p>
            {/if}
          </div>

          <div>
            <label for="partner-region" class="block text-sm font-medium text-gray-700 mb-1">{fields.region} *</label>
            <select
              id="partner-region"
              bind:value={selectedRegion}
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">--</option>
              {#each regions as region}
                <option value={region.id}>{region.label}</option>
              {/each}
            </select>
            {#if errors.selectedRegion}
              <p class="mt-1 text-sm text-red-600">{errors.selectedRegion}</p>
            {/if}
          </div>
        </div>

        <!-- Message -->
        <div>
          <label for="partner-message" class="block text-sm font-medium text-gray-700 mb-1">{fields.message}</label>
          <textarea
            id="partner-message"
            bind:value={message}
            rows={4}
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          ></textarea>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
        >
          {submitLabel}
        </button>
      </form>
    {/if}
  </div>
</section>
