<script lang="ts">
  /**
   * Gate Summary Page
   *
   * Dev-only overview of prelaunch readiness.
   * Shows P0 status for release and smoke tests.
   */

  import { browser } from '$app/environment';
  import { appStore } from '$lib/stores/app.store';
  import { Container, Section, Card, Button } from '$lib/components/ui';
  import {
    readReleaseP0Summary,
    readSmokeP0Summary,
    computeGateStatus,
    type ReleaseP0Summary,
    type SmokeP0Summary,
  } from '$lib/devtools/readiness';
  import type { GateStatus } from '$config/gate.config';

  let { data } = $props();

  $effect(() => {
    appStore.setLocale(data.locale);
  });

  // Readiness state
  let releaseP0 = $state<ReleaseP0Summary>({ p0Total: 0, p0Done: 0, p0Open: 0, p0Blocked: 0 });
  let smokeP0 = $state<SmokeP0Summary>({ p0Total: 0, p0Pass: 0, p0Open: 0, p0Fail: 0 });
  let gateStatus = $state<GateStatus>('green');

  // Load readiness data on client
  $effect(() => {
    if (browser) {
      releaseP0 = readReleaseP0Summary(data.releaseConfig);
      smokeP0 = readSmokeP0Summary(data.smokeConfig);
      gateStatus = computeGateStatus(releaseP0, smokeP0);
    }
  });

  /**
   * Get status badge class
   */
  function getStatusClass(status: GateStatus): string {
    switch (status) {
      case 'green':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'red':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  }

  /**
   * Get status label
   */
  function getStatusLabel(status: GateStatus): string {
    return data.labels.status[status] ?? status;
  }

  /**
   * Get card gradient class based on status
   */
  function getCardGradient(hasIssues: boolean): string {
    return hasIssues
      ? 'bg-gradient-to-r from-red-50 to-orange-50'
      : 'bg-gradient-to-r from-green-50 to-emerald-50';
  }
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<Section padding="lg">
  <Container size="lg">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">{data.title}</h1>
      <p class="text-gray-600">{data.subtitle}</p>
    </div>

    <!-- Overall Status Card -->
    <Card class="mb-6">
      <div class="p-6 {getCardGradient(gateStatus !== 'green')}">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-gray-900 mb-1">{data.labels.overall}</h2>
            <p class="text-sm text-gray-600">
              {#if gateStatus === 'green'}
                All P0 items complete
              {:else if gateStatus === 'yellow'}
                P0 items pending
              {:else}
                P0 items blocked or failed
              {/if}
            </p>
          </div>
          <div class="px-4 py-2 rounded-lg border-2 {getStatusClass(gateStatus)}">
            <span class="text-lg font-bold">{getStatusLabel(gateStatus)}</span>
          </div>
        </div>
      </div>
    </Card>

    <!-- Summary Cards Grid -->
    <div class="grid gap-6 md:grid-cols-2 mb-8">
      <!-- Release P0 Card -->
      <Card>
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">{data.labels.releaseP0}</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-3 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900">{releaseP0.p0Total}</div>
              <div class="text-xs text-gray-500">Total P0</div>
            </div>
            <div class="text-center p-3 bg-green-50 rounded-lg">
              <div class="text-2xl font-bold text-green-600">{releaseP0.p0Done}</div>
              <div class="text-xs text-gray-500">Done</div>
            </div>
            <div class="text-center p-3 bg-yellow-50 rounded-lg">
              <div class="text-2xl font-bold text-yellow-600">{releaseP0.p0Open}</div>
              <div class="text-xs text-gray-500">Open</div>
            </div>
            <div class="text-center p-3 bg-red-50 rounded-lg">
              <div class="text-2xl font-bold text-red-600">{releaseP0.p0Blocked}</div>
              <div class="text-xs text-gray-500">Blocked</div>
            </div>
          </div>
          <div class="mt-4">
            <a href={data.gateConfig.links.releasePath}>
              <Button variant="secondary" size="sm" class="w-full">
                {data.labels.openRelease}
              </Button>
            </a>
          </div>
        </div>
      </Card>

      <!-- Smoke P0 Card -->
      <Card>
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">{data.labels.smokeP0}</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-3 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900">{smokeP0.p0Total}</div>
              <div class="text-xs text-gray-500">Total P0</div>
            </div>
            <div class="text-center p-3 bg-green-50 rounded-lg">
              <div class="text-2xl font-bold text-green-600">{smokeP0.p0Pass}</div>
              <div class="text-xs text-gray-500">Pass</div>
            </div>
            <div class="text-center p-3 bg-yellow-50 rounded-lg">
              <div class="text-2xl font-bold text-yellow-600">{smokeP0.p0Open}</div>
              <div class="text-xs text-gray-500">Untested</div>
            </div>
            <div class="text-center p-3 bg-red-50 rounded-lg">
              <div class="text-2xl font-bold text-red-600">{smokeP0.p0Fail}</div>
              <div class="text-xs text-gray-500">Failed</div>
            </div>
          </div>
          <div class="mt-4">
            <a href={data.gateConfig.links.smokePath}>
              <Button variant="secondary" size="sm" class="w-full">
                {data.labels.openSmoke}
              </Button>
            </a>
          </div>
        </div>
      </Card>
    </div>

    <!-- Dev Tools Quick Links -->
    <Card>
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">{data.labels.devTools}</h3>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <a href={data.gateConfig.links.releasePath} class="block">
            <div class="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span class="font-medium text-gray-900">{data.labels.openRelease}</span>
              </div>
            </div>
          </a>
          <a href={data.gateConfig.links.smokePath} class="block">
            <div class="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="font-medium text-gray-900">{data.labels.openSmoke}</span>
              </div>
            </div>
          </a>
          <a href={data.gateConfig.links.exportPath} class="block">
            <div class="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span class="font-medium text-gray-900">{data.labels.openExport}</span>
              </div>
            </div>
          </a>
          <a href={data.gateConfig.links.snapshotPath} class="block">
            <div class="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="font-medium text-gray-900">{data.labels.openSnapshot}</span>
              </div>
            </div>
          </a>
          <a href={data.gateConfig.links.i18nAuditPath} class="block">
            <div class="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span class="font-medium text-gray-900">{data.labels.openI18n}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </Card>

    <!-- Dev Notice -->
    <div class="mt-8 text-center text-sm text-gray-500">
      <p>{data.labels.devOnly}</p>
    </div>
  </Container>
</Section>
