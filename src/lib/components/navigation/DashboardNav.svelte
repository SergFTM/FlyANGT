<script lang="ts">
  /**
   * Dashboard Navigation Component
   *
   * Dumb component: receives nav items via props.
   * Renders sidebar navigation list.
   */

  interface NavItem {
    id: string;
    path: string;
    label: string;
  }

  interface Props {
    items: NavItem[];
    currentPath: string;
    langParam?: string;
  }

  let { items, currentPath, langParam = '' }: Props = $props();

  function isActive(path: string): boolean {
    return currentPath === path;
  }
</script>

<nav class="space-y-1">
  {#each items as item (item.id)}
    <a
      href="{item.path}{langParam}"
      class="block px-4 py-2 rounded-lg transition-colors {isActive(item.path)
        ? 'bg-blue-100 text-blue-700 font-medium'
        : 'text-gray-700 hover:bg-gray-100'}"
    >
      {item.label}
    </a>
  {/each}
</nav>
