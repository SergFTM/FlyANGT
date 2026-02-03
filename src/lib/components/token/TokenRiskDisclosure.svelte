<script lang="ts">
  /**
   * Token Risk Disclosure Component
   *
   * Required, visually distinct risk disclosure block.
   * Must always be rendered on the token page.
   */

  interface Props {
    title: string;
    points: string[];
    footer: string;
  }

  let { title, points, footer }: Props = $props();
</script>

<section class="my-12 mx-auto max-w-4xl px-6">
  <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-8">
    <div class="flex items-start gap-4 mb-6">
      <div class="flex-shrink-0 w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center">
        <svg class="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-amber-900">
        {title}
      </h2>
    </div>

    <ul class="space-y-4 mb-6">
      {#each points as point, index (index)}
        <li class="flex items-start gap-3">
          <span class="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-sm font-bold mt-0.5">
            {index + 1}
          </span>
          <span class="text-amber-900 leading-relaxed">{point}</span>
        </li>
      {/each}
    </ul>

    <div class="pt-4 border-t border-amber-300">
      <p class="text-amber-800 text-sm leading-relaxed">
        {footer}
      </p>
    </div>
  </div>
</section>
