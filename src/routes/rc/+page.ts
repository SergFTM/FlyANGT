/**
 * RC Manager Page Data Loader
 *
 * Dev-only tool for managing Release Candidates.
 * Returns 404 in production.
 */

import type { PageLoad } from './$types';
import { isLocaleSupported, t, type Locale } from '$config/i18n.config';
import { rcConfig } from '$config/rc.config';
import { gateConfig } from '$config/gate.config';
import { assertDevToolAllowed } from '$lib/devtools/guard';

export const load: PageLoad = ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Resolve locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Check if RC manager is enabled
  if (!rcConfig.enabled) {
    return {
      locale,
      enabled: false,
      title: t('rc.title', locale),
      subtitle: t('rc.subtitle', locale),
      labels: {
        devOnly: t('rc.notice.devOnly', locale),
      },
    };
  }

  return {
    locale,
    enabled: true,
    title: t('rc.title', locale),
    subtitle: t('rc.subtitle', locale),
    rcConfig,
    labels: {
      create: t('rc.actions.create', locale),
      delete: t('rc.actions.delete', locale),
      select: t('rc.actions.select', locale),
      unselect: t('rc.actions.unselect', locale),
      download: t('rc.actions.download', locale),
      copy: t('rc.actions.copy', locale),
      copyDone: t('rc.actions.copyDone', locale),
      openGate: t('rc.actions.openGate', locale),
      openExport: t('rc.actions.openExport', locale),
      openRelease: t('rc.actions.openRelease', locale),
      openSmoke: t('rc.actions.openSmoke', locale),
      listTitle: t('rc.list.title', locale),
      emptyTitle: t('rc.list.empty.title', locale),
      emptyText: t('rc.list.empty.text', locale),
      detailTitle: t('rc.detail.title', locale),
      devOnly: t('rc.notice.devOnly', locale),
      fields: {
        id: t('rc.fields.id', locale),
        createdAt: t('rc.fields.createdAt', locale),
        status: t('rc.fields.status', locale),
        selected: t('rc.fields.selected', locale),
      },
      status: {
        green: t('rc.status.green', locale),
        yellow: t('rc.status.yellow', locale),
        red: t('rc.status.red', locale),
      },
      artifacts: {
        snapshot: t('rc.artifact.snapshot', locale),
        bundle: t('rc.artifact.bundle', locale),
        release: t('rc.artifact.release', locale),
        smoke: t('rc.artifact.smoke', locale),
        gate: t('rc.artifact.gate', locale),
      },
      confirmDelete: {
        title: t('rc.confirmDelete.title', locale),
        text: t('rc.confirmDelete.text', locale),
      },
    },
  };
};
