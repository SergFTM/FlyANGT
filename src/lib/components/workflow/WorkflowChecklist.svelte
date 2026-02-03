<script lang="ts">
  /**
   * Workflow Checklist Component
   *
   * Displays a checklist of items for a workflow step.
   */

  interface Props {
    title: string;
    items: string[];
  }

  let { title, items }: Props = $props();
</script>

<div class="bg-white rounded-lg border border-gray-200 p-6">
  <h3 class="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
  <ul class="space-y-3">
    {#each items as item, index (index)}
      <li class="flex items-start gap-3">
        <div class="flex-shrink-0 w-5 h-5 mt-0.5 border-2 border-gray-300 rounded"></div>
        <span class="text-gray-700">{item}</span>
      </li>
    {/each}
  </ul>
</div>
