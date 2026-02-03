<script lang="ts">
  /**
   * Token Section Component
   *
   * Single section with title, text, optional bullets and CTA.
   */

  interface Props {
    id: string;
    title: string;
    text: string;
    bullets?: string[];
    ctaLabel?: string;
    ctaHref?: string;
  }

  let { id, title, text, bullets, ctaLabel, ctaHref }: Props = $props();
</script>

<section id={id} class="py-12 border-b border-gray-200 last:border-b-0">
  <h2 class="text-2xl font-bold text-gray-900 mb-4">
    {title}
  </h2>
  <p class="text-gray-600 mb-6 leading-relaxed">
    {text}
  </p>

  {#if bullets && bullets.length > 0}
    <ul class="space-y-2 mb-6">
      {#each bullets as bullet}
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mt-0.5">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </span>
          <span class="text-gray-700">{bullet}</span>
        </li>
      {/each}
    </ul>
  {/if}

  {#if ctaLabel && ctaHref}
    <a
      href={ctaHref}
      class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
    >
      {ctaLabel}
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </a>
  {/if}
</section>
