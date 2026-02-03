<script lang="ts">
  /**
   * Root Layout
   *
   * Main application layout wrapping all pages.
   * Includes header, footer, and global styles.
   */

  import '../app.css';
  import { browser } from '$app/environment';
  import { appStore } from '$lib/stores/app.store';
  import { appConfig } from '$config/app.config';
  import { prelaunchConfig } from '$config/prelaunch.config';
  import { gateConfig, type GateStatus } from '$config/gate.config';
  import { t } from '$config/i18n.config';
  import { shouldShowBanner } from '$lib/prelaunch';
  import { getGateReadiness } from '$lib/devtools/readiness';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import { PrelaunchBanner } from '$lib/components/prelaunch';
  import GateBanner from '$lib/components/gate/GateBanner.svelte';

  let { children } = $props();

  // Initialize app
  appStore.setReady(true);

  // Prelaunch banner visibility (dev only)
  const isDev = import.meta.env.DEV;
  const showBanner = shouldShowBanner(prelaunchConfig, isDev);
  const bannerMessage = t(prelaunchConfig.banner.messageKey as 'prelaunch.banner', 'en');

  // Gate banner state (dev only)
  let gateStatus = $state<GateStatus>('green');
  let gateDetails = $state<string>('');
  const gateEnabled = isDev && gateConfig.banner.enabledInDev;
  const gateBannerMessage = t(gateConfig.banner.messageKey as 'gate.banner.message', 'en');

  // Load gate readiness on client
  $effect(() => {
    if (browser && gateEnabled) {
      const readiness = getGateReadiness();
      gateStatus = readiness.status;
      // Build details string
      const parts: string[] = [];
      if (readiness.release.p0Open > 0) {
        parts.push(`Release P0: ${readiness.release.p0Open}`);
      }
      if (readiness.release.p0Blocked > 0) {
        parts.push(`Blocked: ${readiness.release.p0Blocked}`);
      }
      if (readiness.smoke.p0Open > 0) {
        parts.push(`Smoke P0: ${readiness.smoke.p0Open}`);
      }
      if (readiness.smoke.p0Fail > 0) {
        parts.push(`Failed: ${readiness.smoke.p0Fail}`);
      }
      gateDetails = parts.join(' | ');
    }
  });

  // Show gate banner only if not green
  const showGateBanner = $derived(gateEnabled && gateStatus !== 'green');
</script>

<svelte:head>
  <title>{appConfig.appName} - {appConfig.description}</title>
  <meta name="description" content={appConfig.description} />
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<PrelaunchBanner message={bannerMessage} visible={showBanner} />

<!-- Gate banner (dev only, shows when P0 items are open) -->
<GateBanner
  visible={showGateBanner}
  status={gateStatus}
  message={gateBannerMessage}
  details={gateDetails}
  gatePath={gateConfig.links.gatePath}
/>

<div class="flex flex-col min-h-screen" class:pt-10={showBanner}>
  <Header />
  <main class="flex-1">
    {@render children()}
  </main>
  <Footer />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
      'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(*) {
    box-sizing: border-box;
  }
</style>
