<script lang="ts">
  /**
   * Configurator Share Component
   *
   * Share button with copy-to-clipboard functionality.
   */

  import { browser } from '$app/environment';

  interface Props {
    shareLabel: string;
    copiedLabel: string;
    getShareUrl: () => string;
  }

  let { shareLabel, copiedLabel, getShareUrl }: Props = $props();

  let showCopied = $state(false);

  async function handleShare() {
    if (!browser) return;

    const url = getShareUrl();

    try {
      await navigator.clipboard.writeText(url);
      showCopied = true;
      setTimeout(() => {
        showCopied = false;
      }, 2000);
    } catch {
      // Fallback: show the URL in a prompt
      prompt('Copy this link:', url);
    }
  }
</script>

<button
  type="button"
  onclick={handleShare}
  class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
>
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
  {showCopied ? copiedLabel : shareLabel}
</button>
