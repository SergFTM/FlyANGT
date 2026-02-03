<script lang="ts">
  /**
   * Gate Banner Component
   *
   * Displays prelaunch gate status warning in dev mode.
   * Dumb component - all data passed via props.
   */

  import type { GateStatus } from '$config/gate.config';

  interface Props {
    visible: boolean;
    status: GateStatus;
    message: string;
    details?: string;
    gatePath?: string;
  }

  let { visible, status, message, details, gatePath = '/gate' }: Props = $props();

  /**
   * Get status color classes
   */
  function getStatusClasses(s: GateStatus): string {
    switch (s) {
      case 'red':
        return 'bg-red-600 text-white';
      case 'yellow':
        return 'bg-yellow-500 text-yellow-900';
      case 'green':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  }

  /**
   * Get status indicator classes
   */
  function getIndicatorClasses(s: GateStatus): string {
    switch (s) {
      case 'red':
        return 'bg-red-300';
      case 'yellow':
        return 'bg-yellow-300';
      case 'green':
        return 'bg-green-300';
      default:
        return 'bg-gray-300';
    }
  }
</script>

{#if visible}
  <div class="fixed bottom-4 right-4 z-50 max-w-sm">
    <a
      href={gatePath}
      class="block rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 {getStatusClasses(status)}"
    >
      <div class="px-4 py-3">
        <div class="flex items-center gap-3">
          <!-- Status indicator -->
          <div class="flex-shrink-0">
            <span class="flex h-3 w-3 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 {getIndicatorClasses(status)}"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 {getIndicatorClasses(status)}"></span>
            </span>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">{message}</p>
            {#if details}
              <p class="text-xs opacity-80 truncate">{details}</p>
            {/if}
          </div>

          <!-- Arrow icon -->
          <div class="flex-shrink-0">
            <svg class="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  </div>
{/if}
