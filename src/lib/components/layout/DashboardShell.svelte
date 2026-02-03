<script lang="ts">
  /**
   * Dashboard Shell Component
   *
   * Layout wrapper for dashboard pages.
   * Renders sidebar + content area.
   */

  import type { Snippet } from 'svelte';

  interface NavItem {
    id: string;
    path: string;
    label: string;
  }

  interface Props {
    navItems: NavItem[];
    currentPath: string;
    currentRole: string;
    roleLabel: string;
    langParam?: string;
    children: Snippet;
  }

  let {
    navItems,
    currentPath,
    currentRole,
    roleLabel,
    langParam = '',
    children,
  }: Props = $props();

  import DashboardNav from '../navigation/DashboardNav.svelte';

  function isActive(path: string): boolean {
    return currentPath === path;
  }
</script>

<div class="flex min-h-[calc(100vh-140px)]">
  <!-- Sidebar -->
  <aside class="w-64 bg-gray-50 border-r border-gray-200 p-4">
    <!-- Role indicator -->
    <div class="mb-6 px-4 py-2 bg-blue-50 rounded-lg">
      <p class="text-xs text-gray-500 uppercase">{roleLabel}</p>
      <p class="font-medium text-blue-700 capitalize">{currentRole}</p>
    </div>

    <!-- Navigation -->
    <DashboardNav items={navItems} {currentPath} {langParam} />
  </aside>

  <!-- Main content -->
  <main class="flex-1 p-8">
    {@render children()}
  </main>
</div>
