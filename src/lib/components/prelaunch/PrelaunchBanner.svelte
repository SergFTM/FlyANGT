<script lang="ts">
  /**
   * Prelaunch Banner Component
   *
   * Shows a small banner when content is locked.
   * Dumb component: accepts props only.
   * Only displayed in dev mode.
   */

  interface Props {
    message: string;
    visible: boolean;
  }

  let { message, visible }: Props = $props();
</script>

{#if visible}
  <div class="prelaunch-banner">
    <div class="prelaunch-banner__content">
      <svg class="prelaunch-banner__icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
      </svg>
      <span class="prelaunch-banner__text">{message}</span>
    </div>
  </div>
{/if}

<style>
  .prelaunch-banner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background: linear-gradient(90deg, #f59e0b, #d97706);
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    text-align: center;
  }

  .prelaunch-banner__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .prelaunch-banner__icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }

  .prelaunch-banner__text {
    white-space: nowrap;
  }
</style>
