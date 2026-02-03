<script lang="ts">
  /**
   * Investors Section Block Component
   *
   * Renders a single investor section with optional variants.
   */

  interface Props {
    id: string;
    title: string;
    text: string;
    bullets?: string[];
    variant?: 'default' | 'checklist' | 'cards';
    ctaLabel?: string;
    ctaHref?: string;
  }

  let { id, title, text, bullets, variant = 'default', ctaLabel, ctaHref }: Props = $props();
</script>

<section {id} class="py-12 border-b border-gray-100 last:border-b-0">
  <div class="max-w-4xl mx-auto px-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
    <p class="text-gray-600 mb-6">{text}</p>

    {#if bullets && bullets.length > 0}
      {#if variant === 'checklist'}
        <!-- Checklist variant -->
        <ul class="space-y-3">
          {#each bullets as bullet}
            <li class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span class="text-gray-700">{bullet}</span>
            </li>
          {/each}
        </ul>
      {:else if variant === 'cards'}
        <!-- Cards variant -->
        <div class="grid md:grid-cols-2 gap-4">
          {#each bullets as bullet}
            <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p class="text-gray-700">{bullet}</p>
            </div>
          {/each}
        </div>
      {:else}
        <!-- Default variant -->
        <ul class="space-y-2">
          {#each bullets as bullet}
            <li class="flex items-start gap-2">
              <span class="text-emerald-500 mt-1">-</span>
              <span class="text-gray-700">{bullet}</span>
            </li>
          {/each}
        </ul>
      {/if}
    {/if}

    {#if ctaLabel && ctaHref}
      <div class="mt-6">
        <a
          href={ctaHref}
          class="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
        >
          {ctaLabel}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </a>
      </div>
    {/if}
  </div>
</section>
