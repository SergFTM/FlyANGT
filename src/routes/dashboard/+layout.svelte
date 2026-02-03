<script lang="ts">
  /**
   * Dashboard Layout
   *
   * Wraps all dashboard pages with sidebar navigation.
   * Uses DashboardShell component.
   */

  import DashboardShell from '$lib/components/layout/DashboardShell.svelte';
  import AccessDenied from '$lib/components/sections/AccessDenied.svelte';
  import { appStore } from '$lib/stores/app.store';
  import { userStore } from '$lib/stores/user.store';
  import { page } from '$app/stores';
  import { t, type TranslationKey } from '$config/i18n.config';
  import { canAccessRouteId } from '$config/permissions.config';
  import { getRouteByPath } from '$config/routes.config';

  let { data, children } = $props();

  let currentPath = $state('/dashboard');

  // Sync locale and role to stores
  $effect(() => {
    appStore.setLocale(data.locale);
    userStore.setRole(data.role);
  });

  // Track current path
  page.subscribe(p => {
    currentPath = p.url.pathname;
  });

  // Check if user can access current route
  function canAccessCurrentRoute(): boolean {
    const route = getRouteByPath(currentPath);
    if (!route) return false;
    return canAccessRouteId(data.role, route.id);
  }
</script>

{#if data.role === 'guest'}
  <!-- Guests cannot access dashboard at all -->
  <AccessDenied
    title={t('dash.accessDenied.title', data.locale)}
    text={t('dash.accessDenied.text', data.locale)}
    backHref="/{data.queryParam}"
    backLabel={t('nav.home', data.locale)}
  />
{:else if !canAccessCurrentRoute()}
  <!-- User doesn't have permission for this specific route -->
  <AccessDenied
    title={t('dash.accessDenied.title', data.locale)}
    text={t('dash.accessDenied.text', data.locale)}
    backHref="/dashboard{data.queryParam}"
    backLabel={t('dash.overview', data.locale)}
  />
{:else}
  <DashboardShell
    navItems={data.navItems}
    {currentPath}
    currentRole={data.role}
    roleLabel={data.roleLabel}
    langParam={data.queryParam}
  >
    {@render children()}
  </DashboardShell>
{/if}
