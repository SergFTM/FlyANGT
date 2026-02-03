<script lang="ts">
  /**
   * Access Denied Component
   *
   * Dumb component: displays access denied message.
   * Uses i18n strings passed as props.
   *
   * Note: This is UI gating only, not real security.
   */

  interface Props {
    title: string;
    text: string;
    backHref?: string;
    backLabel?: string;
  }

  let { title, text, backHref = '/', backLabel = 'Go Back' }: Props = $props();
</script>

<div class="max-w-lg mx-auto py-16 px-4 text-center">
  <div class="bg-red-50 border border-red-200 rounded-lg p-8">
    <div class="text-red-600 mb-4">
      <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <h1 class="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
    <p class="text-gray-600 mb-6">{text}</p>
    <a
      href={backHref}
      class="inline-block px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
    >
      {backLabel}
    </a>
  </div>
</div>
