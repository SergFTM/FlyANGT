<script lang="ts">
  /**
   * Steps List Component
   *
   * Displays a numbered list of journey steps.
   */

  interface StepItem {
    title: string;
    text: string;
  }

  interface Props {
    items: StepItem[];
  }

  let { items }: Props = $props();
</script>

<div class="space-y-4">
  {#each items as item, index}
    <div class="flex gap-4">
      <div
        class="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center"
      >
        {index + 1}
      </div>
      <div class="flex-1 pt-1">
        <h4 class="font-semibold text-gray-900">{item.title}</h4>
        <p class="text-gray-600 text-sm mt-1">{item.text}</p>
      </div>
    </div>
  {/each}
</div>
