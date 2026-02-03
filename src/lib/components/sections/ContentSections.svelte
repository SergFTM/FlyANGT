<script lang="ts">
  /**
   * Content Sections Component
   *
   * Renders a list of content sections with title, text, and optional bullets.
   * Dumb component: accepts props only, no config imports.
   */

  interface Section {
    id: string;
    title: string;
    text: string;
    bullets?: string[];
  }

  interface Props {
    sections: Section[];
  }

  let { sections }: Props = $props();
</script>

<div class="max-w-4xl mx-auto py-12 px-4">
  {#each sections as section (section.id)}
    <section class="mb-12 last:mb-0">
      <h2 class="text-2xl font-bold mb-4 text-gray-900">{section.title}</h2>
      <p class="text-gray-700 mb-4">{section.text}</p>
      {#if section.bullets && section.bullets.length > 0}
        <ul class="list-none space-y-2">
          {#each section.bullets as bullet}
            <li class="flex items-start">
              <span class="text-blue-600 mr-3 font-bold">•</span>
              <span class="text-gray-700">{bullet}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </section>
  {/each}
</div>
