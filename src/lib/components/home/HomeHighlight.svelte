<script lang="ts">
  /**
   * Home Highlight Component
   *
   * Highlight section for Trust Center or Workflow.
   * Alternating layout based on variant prop.
   */

  interface Props {
    title: string;
    text: string;
    button: string;
    href: string;
    variant?: 'left' | 'right';
    bgColor?: 'white' | 'slate';
  }

  let {
    title,
    text,
    button,
    href,
    variant = 'left',
    bgColor = 'white',
  }: Props = $props();
</script>

<section class="py-16 {bgColor === 'slate' ? 'bg-slate-50' : 'bg-white'}">
  <div class="max-w-5xl mx-auto px-6">
    <div class="flex flex-col {variant === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10">
      <div class="flex-1 text-center md:text-left">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <p class="text-gray-600 mb-6 leading-relaxed">{text}</p>
        <a
          {href}
          class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          {button}
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div class="flex-1 flex justify-center">
        <div class="w-64 h-48 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center">
          <div class="text-slate-400 text-6xl">
            {#if title.toLowerCase().includes('trust')}
              <svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            {:else}
              <svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
