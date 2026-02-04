<script lang="ts">
  /**
   * FormRenderer Component
   *
   * Renders a form based on FormSpec configuration.
   * Has default submit handler using /api/forms/submit endpoint.
   * Includes anti-spam protections: honeypot field and cooldown.
   */

  import type { FormSpec, FieldSpec, SelectOption } from '$config/forms/forms.config';

  interface AntiSpamClientConfig {
    honeypot: { enabled: boolean; fieldId: string };
    cooldown: { enabled: boolean; seconds: number; storageKeyPrefix: string };
  }

  interface Props {
    /** Form specification */
    spec: FormSpec;
    /** Current locale */
    locale: 'en' | 'ru';
    /** Translation function */
    t: (key: string) => string;
    /** Anti-spam config (client-safe subset) */
    antiSpam?: AntiSpamClientConfig;
    /** Custom submit handler (optional) */
    onSubmit?: (values: Record<string, string | boolean>) => Promise<{ ok: boolean; id?: string; error?: string; fieldErrors?: Record<string, string>; retryAfterSec?: number }>;
    /** Success callback */
    onSuccess?: (id: string) => void;
    /** Custom class for form wrapper */
    class?: string;
  }

  let {
    spec,
    locale,
    t,
    antiSpam,
    onSubmit,
    onSuccess,
    class: className = '',
  }: Props = $props();

  // Form values state
  let values = $state<Record<string, string | boolean>>({});
  let fieldErrors = $state<Record<string, string>>({});
  let submitting = $state(false);
  let submitError = $state<string | null>(null);
  let submitted = $state(false);
  let submittedId = $state<string | null>(null);

  // Honeypot field value
  let honeypotValue = $state('');

  // Cooldown state
  let cooldownRemaining = $state(0);
  let cooldownInterval: ReturnType<typeof setInterval> | null = null;

  // Initialize default values
  $effect(() => {
    const initial: Record<string, string | boolean> = {};
    for (const field of spec.fields) {
      if (field.defaultValue !== undefined) {
        initial[field.id] = field.defaultValue;
      } else if (field.type === 'checkbox') {
        initial[field.id] = false;
      } else {
        initial[field.id] = '';
      }
    }
    values = initial;
  });

  // Check cooldown on mount
  $effect(() => {
    if (typeof window === 'undefined') return;
    if (!antiSpam?.cooldown?.enabled) return;

    const key = `${antiSpam.cooldown.storageKeyPrefix}${spec.id}`;
    const stored = localStorage.getItem(key);

    if (stored) {
      const nextAllowedAt = parseInt(stored, 10);
      const now = Date.now();
      if (nextAllowedAt > now) {
        cooldownRemaining = Math.ceil((nextAllowedAt - now) / 1000);
        startCooldownTimer();
      }
    }

    return () => {
      if (cooldownInterval) clearInterval(cooldownInterval);
    };
  });

  function startCooldownTimer() {
    if (cooldownInterval) clearInterval(cooldownInterval);

    cooldownInterval = setInterval(() => {
      cooldownRemaining--;
      if (cooldownRemaining <= 0) {
        cooldownRemaining = 0;
        if (cooldownInterval) {
          clearInterval(cooldownInterval);
          cooldownInterval = null;
        }
      }
    }, 1000);
  }

  function setCooldown() {
    if (typeof window === 'undefined') return;
    if (!antiSpam?.cooldown?.enabled) return;

    const key = `${antiSpam.cooldown.storageKeyPrefix}${spec.id}`;
    const nextAllowedAt = Date.now() + antiSpam.cooldown.seconds * 1000;
    localStorage.setItem(key, String(nextAllowedAt));
    cooldownRemaining = antiSpam.cooldown.seconds;
    startCooldownTimer();
  }

  // Default submit handler
  async function defaultSubmit(vals: Record<string, string | boolean>) {
    const response = await fetch('/api/forms/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formId: spec.id,
        locale,
        values: vals,
      }),
    });

    const result = await response.json();
    return result;
  }

  // Handle form submission
  async function handleSubmit(e: Event) {
    e.preventDefault();

    // Check cooldown
    if (cooldownRemaining > 0) {
      const waitText = t('forms.cooldown.waitPrefix');
      const secText = t('forms.cooldown.seconds').replace('{n}', String(cooldownRemaining));
      submitError = `${waitText} ${secText}`;
      return;
    }

    submitting = true;
    submitError = null;
    fieldErrors = {};

    try {
      // Include honeypot value in submission
      const submitValues = { ...values };
      if (antiSpam?.honeypot?.enabled) {
        submitValues[antiSpam.honeypot.fieldId] = honeypotValue;
      }

      const handler = onSubmit || defaultSubmit;
      const result = await handler(submitValues);

      if (result.ok && result.id) {
        // Set cooldown on successful submission
        setCooldown();

        submitted = true;
        submittedId = result.id;
        onSuccess?.(result.id);
      } else {
        if (result.fieldErrors) {
          // Map error keys to localized messages
          const localized: Record<string, string> = {};
          for (const [field, key] of Object.entries(result.fieldErrors)) {
            localized[field] = t(key);
          }
          fieldErrors = localized;
        }
        submitError = result.error ? t(result.error) : t('forms.submit.failed');

        // Handle rate limit with retry info
        if (result.retryAfterSec) {
          const waitText = t('forms.cooldown.waitPrefix');
          const secText = t('forms.cooldown.seconds').replace('{n}', String(result.retryAfterSec));
          submitError = `${submitError}. ${waitText} ${secText}`;
        }
      }
    } catch (err) {
      submitError = t('forms.errors.serverError');
    } finally {
      submitting = false;
    }
  }

  // Edit handler (go back to form)
  function handleEdit() {
    submitted = false;
    submittedId = null;
  }

  // Get translated label for a field
  function getLabel(field: FieldSpec): string {
    return t(field.labelKey) + (field.required ? ' *' : '');
  }

  // Get translated option label
  function getOptionLabel(option: SelectOption): string {
    return t(option.labelKey);
  }
</script>

<div class="form-renderer {className}">
  {#if submitted}
    <!-- Success state -->
    <div class="text-center py-8 bg-green-50 rounded-xl border border-green-200">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">{t(spec.successTitleKey)}</h2>
      <p class="text-gray-600 mb-4">{t(spec.successTextKey)}</p>
      {#if submittedId}
        <p class="text-sm text-gray-500 mb-6">
          ID: <code class="px-2 py-1 bg-gray-100 rounded text-xs">{submittedId}</code>
        </p>
      {/if}
      <button
        type="button"
        onclick={handleEdit}
        class="px-4 py-2 text-green-600 hover:text-green-700 font-medium"
      >
        {locale === 'ru' ? 'Редактировать' : 'Edit'}
      </button>
    </div>
  {:else}
    <!-- Form -->
    {#if spec.titleKey}
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-3">{t(spec.titleKey)}</h2>
        {#if spec.descriptionKey}
          <p class="text-gray-600">{t(spec.descriptionKey)}</p>
        {/if}
      </div>
    {/if}

    <form onsubmit={handleSubmit} class="space-y-6">
      {#each spec.fields as field}
        {#if field.type !== 'hidden'}
          <div class="field-group">
            {#if field.type === 'checkbox'}
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  bind:checked={values[field.id]}
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span class="text-sm text-gray-700">{getLabel(field)}</span>
              </label>
            {:else}
              <label for="field-{field.id}" class="block text-sm font-medium text-gray-700 mb-1">
                {getLabel(field)}
              </label>

              {#if field.type === 'textarea'}
                <textarea
                  id="field-{field.id}"
                  bind:value={values[field.id]}
                  rows={field.rows || 4}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              {:else if field.type === 'select' && field.options}
                <select
                  id="field-{field.id}"
                  bind:value={values[field.id]}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">--</option>
                  {#each field.options as option}
                    <option value={option.value}>{getOptionLabel(option)}</option>
                  {/each}
                </select>
              {:else}
                <input
                  id="field-{field.id}"
                  type={field.type}
                  bind:value={values[field.id]}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              {/if}
            {/if}

            {#if fieldErrors[field.id]}
              <p class="mt-1 text-sm text-red-600">{fieldErrors[field.id]}</p>
            {/if}
          </div>
        {/if}
      {/each}

      <!-- Honeypot field (visually hidden) -->
      {#if antiSpam?.honeypot?.enabled}
        <div class="absolute left-[-9999px] opacity-0 pointer-events-none" aria-hidden="true">
          <label for="hp-{antiSpam.honeypot.fieldId}">{t('forms.honeypot.label')}</label>
          <input
            id="hp-{antiSpam.honeypot.fieldId}"
            type="text"
            bind:value={honeypotValue}
            tabindex="-1"
            autocomplete="off"
          />
        </div>
      {/if}

      <!-- Cooldown message -->
      {#if cooldownRemaining > 0}
        <div class="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700">
          {t('forms.cooldown.waitPrefix')} {t('forms.cooldown.seconds').replace('{n}', String(cooldownRemaining))}
        </div>
      {/if}

      <!-- Error message -->
      {#if submitError}
        <div class="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {submitError}
        </div>
      {/if}

      <!-- Submit button -->
      <button
        type="submit"
        disabled={submitting || cooldownRemaining > 0}
        class="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (locale === 'ru' ? 'Отправка...' : 'Sending...') : t(spec.submitLabelKey)}
      </button>
    </form>
  {/if}
</div>
