/**
 * Admin Viewer Page Data Loader
 *
 * Dev-only tool for viewing and exporting leads and requests.
 * Returns 404 in production.
 */

import type { PageLoad } from './$types';
import { isLocaleSupported, t, type Locale } from '$config/i18n.config';
import { gateConfig } from '$config/gate.config';
import { adminConfig, isValidTab, getValidLimit, type AdminTabId } from '$config/admin.config';
import { assertDevToolAllowed } from '$lib/devtools/guard';
import { isValidSource, isValidStatus, type SubmissionSource, type WorkflowStatus } from '$lib/domain/types';
import { getStorageMode, type StorageMode } from '$config/storage.config';
import { retentionConfig } from '$config/retention.config';

/**
 * All workflow statuses for filter options
 */
const WORKFLOW_STATUSES: WorkflowStatus[] = ['new', 'reviewed', 'contacted', 'closed', 'archived'];

export const load: PageLoad = ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Resolve locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Parse query params
  const tabParam = url.searchParams.get('tab');
  const tab: AdminTabId = tabParam && isValidTab(tabParam) ? tabParam : adminConfig.defaultTab;

  const sourceParam = url.searchParams.get('source');
  const source: SubmissionSource | '' = sourceParam && isValidSource(sourceParam) ? sourceParam : '';

  const statusParam = url.searchParams.get('status');
  const status: WorkflowStatus | '' = statusParam && isValidStatus(statusParam) ? statusParam : '';

  const searchParam = url.searchParams.get('q') || '';

  const limitParam = url.searchParams.get('limit');
  const limit = limitParam ? getValidLimit(parseInt(limitParam, 10)) : adminConfig.defaults.limit;

  // Build source options with translations
  const sourceOptions = adminConfig.filters.sources.map(s => ({
    id: s,
    label: t(`admin.sources.${s}` as keyof typeof import('$config/i18n.config').translations.en, locale),
  }));

  // Build status options with translations
  const statusOptions = WORKFLOW_STATUSES.map(s => ({
    id: s,
    label: t(`admin.status.${s}` as keyof typeof import('$config/i18n.config').translations.en, locale),
  }));

  // Get current storage mode for indicator
  const storageMode: StorageMode = getStorageMode();

  return {
    locale,
    config: adminConfig,
    storageMode,
    filters: {
      tab,
      source,
      status,
      search: searchParam,
      limit,
    },
    sourceOptions,
    statusOptions,
    labels: {
      title: t('admin.title', locale),
      subtitle: t('admin.subtitle', locale),
      devOnly: t('admin.notice.devOnly', locale),
      tabs: {
        leads: t('admin.tabs.leads', locale),
        requests: t('admin.tabs.requests', locale),
      },
      filters: {
        source: t('admin.filters.source', locale),
        search: t('admin.filters.search', locale),
        limit: t('admin.filters.limit', locale),
        status: t('admin.status.label', locale),
        all: locale === 'ru' ? 'Все' : 'All',
      },
      actions: {
        export: t('admin.actions.export', locale),
        copy: t('admin.actions.copy', locale),
        copyDone: t('admin.actions.copyDone', locale),
        openApiLeads: t('admin.actions.openApiLeads', locale),
        openApiRequests: t('admin.actions.openApiRequests', locale),
        saveStatus: t('admin.actions.saveStatus', locale),
        addNote: t('admin.actions.addNote', locale),
        archiveRecord: t('admin.actions.archiveRecord', locale),
      },
      list: {
        emptyTitle: t('admin.list.empty.title', locale),
        emptyText: t('admin.list.empty.text', locale),
      },
      detail: {
        title: t('admin.detail.title', locale),
        rawJson: t('admin.detail.rawJson', locale),
      },
      fields: {
        id: t('admin.fields.id', locale),
        createdAt: t('admin.fields.createdAt', locale),
        updatedAt: t('admin.fields.updatedAt', locale),
        source: t('admin.fields.source', locale),
        email: t('admin.fields.email', locale),
        name: t('admin.fields.name', locale),
        phone: t('admin.fields.phone', locale),
      },
      sources: Object.fromEntries(
        adminConfig.filters.sources.map(s => [
          s,
          t(`admin.sources.${s}` as keyof typeof import('$config/i18n.config').translations.en, locale),
        ])
      ),
      statuses: Object.fromEntries(
        WORKFLOW_STATUSES.map(s => [
          s,
          t(`admin.status.${s}` as keyof typeof import('$config/i18n.config').translations.en, locale),
        ])
      ),
      notes: {
        title: t('admin.notes.title', locale),
        empty: t('admin.notes.empty', locale),
        placeholder: t('admin.notes.placeholder', locale),
      },
      messages: {
        saved: t('admin.messages.saved', locale),
        error: t('admin.messages.error', locale),
      },
      storage: {
        label: t('storage.mode.label', locale),
        config: t('storage.mode.config', locale),
        prisma: t('storage.mode.prisma', locale),
      },
      retention: {
        title: t('admin.retention.title', locale),
        openTool: t('admin.retention.openTool', locale),
        daysLabel: t('admin.retention.daysLabel', locale),
        preview: t('admin.retention.preview', locale),
        apply: t('admin.retention.apply', locale),
      },
    },
    retentionConfig: {
      enabled: retentionConfig.enabled,
      defaultDays: retentionConfig.defaults.days,
    },
  };
};
