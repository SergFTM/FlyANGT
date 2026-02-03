<script lang="ts">
  /**
   * Home Modules Grid Component
   *
   * Grid of platform module cards.
   */

  import HomeModuleCard from './HomeModuleCard.svelte';

  interface ModuleCard {
    id: string;
    title: string;
    path: string;
  }

  interface Props {
    title: string;
    text: string;
    cardLabel: string;
    modules: ModuleCard[];
  }

  let { title, text, cardLabel, modules }: Props = $props();
</script>

<section class="py-16 bg-gray-50">
  <div class="max-w-6xl mx-auto px-6">
    <div class="text-center mb-10">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
      <p class="text-gray-600 max-w-2xl mx-auto">{text}</p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each modules as mod}
        <HomeModuleCard
          title={mod.title}
          href={mod.path}
          {cardLabel}
        />
      {/each}
    </div>
  </div>
</section>
