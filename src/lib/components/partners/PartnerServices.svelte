<script lang="ts">
  /**
   * Partner Services Component
   *
   * Displays partner services and highlights.
   */

  interface Props {
    servicesTitle: string;
    services: string[];
    highlightsTitle?: string;
    highlights?: string[];
  }

  let { servicesTitle, services, highlightsTitle, highlights }: Props = $props();
</script>

<div class="space-y-6">
  <!-- Services -->
  <div>
    <h3 class="font-semibold text-gray-900 mb-3">{servicesTitle}</h3>
    <div class="flex flex-wrap gap-2">
      {#each services as service}
        <span class="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm">
          {service}
        </span>
      {/each}
    </div>
  </div>

  <!-- Highlights -->
  {#if highlights && highlights.length > 0 && highlightsTitle}
    <div>
      <h3 class="font-semibold text-gray-900 mb-3">{highlightsTitle}</h3>
      <ul class="space-y-2">
        {#each highlights as highlight}
          <li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-gray-600">{highlight}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
