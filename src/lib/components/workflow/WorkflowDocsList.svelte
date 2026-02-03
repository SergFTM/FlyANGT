<script lang="ts">
  /**
   * Workflow Documents List Component
   *
   * Displays a list of required documents with links.
   */

  interface DocLink {
    label: string;
    href: string;
  }

  interface Props {
    title: string;
    docs: DocLink[];
  }

  let { title, docs }: Props = $props();
</script>

{#if docs.length > 0}
  <div class="bg-white rounded-lg border border-gray-200 p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    <ul class="space-y-3">
      {#each docs as doc, index (index)}
        <li>
          <a
            href={doc.href}
            class="flex items-center gap-3 text-blue-600 hover:text-blue-800 hover:underline"
          >
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            {doc.label}
          </a>
        </li>
      {/each}
    </ul>
  </div>
{/if}
