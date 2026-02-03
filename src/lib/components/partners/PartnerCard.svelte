<script lang="ts">
  /**
   * Partner Card Component
   *
   * Displays a partner summary in the directory.
   */

  interface Props {
    slug: string;
    name: string;
    headline: string;
    type: string;
    region: string;
    status: string;
    statusLabel: string;
    services: string[];
    href: string;
  }

  let { slug, name, headline, type, region, status, statusLabel, services, href }: Props = $props();

  const statusColor = $derived(
    status === 'active' ? 'bg-green-100 text-green-700' :
    status === 'pilot' ? 'bg-blue-100 text-blue-700' :
    'bg-gray-100 text-gray-600'
  );
</script>

<a
  {href}
  class="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-emerald-300 transition-all"
>
  <div class="flex items-start justify-between mb-3">
    <h3 class="text-lg font-semibold text-gray-900">{name}</h3>
    <span class="px-2 py-1 rounded-full text-xs font-medium {statusColor}">
      {statusLabel}
    </span>
  </div>

  <p class="text-gray-600 text-sm mb-4 line-clamp-2">{headline}</p>

  <div class="flex flex-wrap gap-2 mb-4">
    <span class="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-medium">
      {type}
    </span>
    <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
      {region}
    </span>
  </div>

  {#if services.length > 0}
    <div class="flex flex-wrap gap-1">
      {#each services.slice(0, 3) as service}
        <span class="px-2 py-0.5 bg-gray-50 text-gray-500 rounded text-xs">
          {service}
        </span>
      {/each}
      {#if services.length > 3}
        <span class="px-2 py-0.5 text-gray-400 text-xs">
          +{services.length - 3}
        </span>
      {/if}
    </div>
  {/if}
</a>
