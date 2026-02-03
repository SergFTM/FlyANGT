<script lang="ts">
  /**
   * Role Switch Component (Dev Only)
   *
   * A small UI to switch user role via URL query param.
   * Only shown in development mode.
   *
   * Note: This is for testing only, not real authentication.
   */

  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { rolesConfig, type Role } from '$config/permissions.config';
  import { appConfig } from '$config/app.config';

  interface Props {
    label?: string;
  }

  let { label = 'Role' }: Props = $props();

  let currentUrl: URL | null = $state(null);
  let currentRole: Role = $state('guest');

  page.subscribe(p => {
    currentUrl = p.url;
    const roleParam = p.url.searchParams.get('role');
    currentRole = (roleParam as Role) || 'guest';
  });

  function handleRoleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    const newRole = target.value as Role;

    if (currentUrl) {
      const newUrl = new URL(currentUrl);
      if (newRole === 'guest') {
        newUrl.searchParams.delete('role');
      } else {
        newUrl.searchParams.set('role', newRole);
      }
      goto(newUrl.pathname + newUrl.search, { replaceState: true });
    }
  }

  // Only show in dev mode
  const showSwitch = appConfig.isDev;
</script>

{#if showSwitch}
  <div class="flex items-center gap-2 text-xs">
    <span class="text-gray-400">{label}:</span>
    <select
      value={currentRole}
      onchange={handleRoleChange}
      class="text-xs px-2 py-1 border border-gray-600 rounded bg-gray-800 text-gray-300 cursor-pointer"
    >
      {#each rolesConfig as role (role.id)}
        <option value={role.id}>{role.name}</option>
      {/each}
    </select>
  </div>
{/if}
