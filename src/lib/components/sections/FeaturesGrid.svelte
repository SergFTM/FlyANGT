<script lang="ts">
  /**
   * Features Grid Component
   * 
   * Displays a grid of feature cards.
   */

  interface Feature {
    id: string;
    title: string;
    description: string;
    icon?: string;
  }

  export let features: Feature[] = [];
  export let columns: 1 | 2 | 3 | 4 = 3;

  const colsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };
</script>

<section class="py-16 px-4">
  <div class="max-w-6xl mx-auto">
    <div class={`grid gap-8 ${colsClass[columns]}`}>
      {#each features as feature (feature.id)}
        <div class="p-6 rounded-lg border border-gray-200 bg-white hover:shadow-lg transition">
          {#if feature.icon}
            <div class="text-3xl mb-3">{feature.icon}</div>
          {/if}
          <h3 class="text-lg font-bold mb-2 text-gray-900">{feature.title}</h3>
          <p class="text-gray-600">{feature.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
