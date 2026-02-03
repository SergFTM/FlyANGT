<script lang="ts">
  /**
   * Partner Profile Header Component
   *
   * Header section for partner detail page.
   */

  interface Props {
    name: string;
    headline: string;
    description: string;
  }

  let { name, headline, description }: Props = $props();
</script>

<div class="mb-8">
  <h1 class="text-3xl font-bold text-gray-900 mb-3">{name}</h1>
  <p class="text-xl text-emerald-600 font-medium mb-4">{headline}</p>
  <p class="text-gray-600 leading-relaxed">{description}</p>
</div>
