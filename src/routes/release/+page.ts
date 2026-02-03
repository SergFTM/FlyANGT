/**
 * Release Checklist Page Data Loader
 *
 * Dev-only page for tracking release readiness.
 * Returns 404 in production builds.
 */

import type { PageLoad } from './$types';
import { releaseConfig } from '$config/release.config';
import { gateConfig } from '$config/gate.config';
import { t, isLocaleSupported, type Locale, type TranslationKey } from '$config/i18n.config';
import { assertDevToolAllowed } from '$lib/devtools/guard';

export const load: PageLoad = ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Get locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Helper to get translation
  const tr = (key: TranslationKey): string => t(key, locale);

  // Build status options
  const statusOptions = [
    { value: 'all' as const, label: tr('trust.filter.all') },
    { value: 'todo' as const, label: tr('release.status.todo') },
    { value: 'in_progress' as const, label: tr('release.status.in_progress') },
    { value: 'blocked' as const, label: tr('release.status.blocked') },
    { value: 'done' as const, label: tr('release.status.done') },
    { value: 'na' as const, label: tr('release.status.na') },
  ];

  // Build priority options
  const priorityOptions = [
    { value: 'all' as const, label: tr('trust.filter.all') },
    { value: 'p0' as const, label: tr('release.priority.p0') },
    { value: 'p1' as const, label: tr('release.priority.p1') },
    { value: 'p2' as const, label: tr('release.priority.p2') },
  ];

  // Build module options
  const moduleOptions = [
    { value: 'all', label: tr('trust.filter.all') },
    ...releaseConfig.modules.map(m => ({
      value: m.id,
      label: tr(m.titleKey as TranslationKey),
    })),
  ];

  // Build status labels for check rows
  const statusLabels = {
    todo: tr('release.status.todo'),
    in_progress: tr('release.status.in_progress'),
    blocked: tr('release.status.blocked'),
    done: tr('release.status.done'),
    na: tr('release.status.na'),
  };

  // Build priority labels
  const priorityLabels = {
    p0: tr('release.priority.p0'),
    p1: tr('release.priority.p1'),
    p2: tr('release.priority.p2'),
  };

  // Build modules with translated titles and check titles
  const modules = releaseConfig.modules.map(m => ({
    id: m.id,
    title: tr(m.titleKey as TranslationKey),
    order: m.order,
    checks: m.checks.map(c => ({
      id: c.id,
      title: tr(c.titleKey as TranslationKey),
      text: c.textKey ? tr(c.textKey as TranslationKey) : undefined,
      priority: c.priority,
      statusDefault: c.statusDefault,
      owner: c.owner,
    })),
  }));

  return {
    locale,
    title: tr('release.title'),
    subtitle: tr('release.subtitle'),
    modules,
    statusOptions,
    priorityOptions,
    moduleOptions,
    statusLabels,
    priorityLabels,
    labels: {
      status: tr('release.filters.status'),
      priority: tr('release.filters.priority'),
      module: tr('release.filters.module'),
      search: tr('ui.search'),
      reset: tr('release.actions.reset'),
      export: tr('release.actions.export'),
      collapseAll: tr('release.actions.collapseAll'),
      expandAll: tr('release.actions.expandAll'),
      notesPlaceholder: tr('release.notes.placeholder'),
      progress: tr('release.progress.label'),
      emptyTitle: tr('release.empty.title'),
      emptyText: tr('release.empty.text'),
    },
  };
};
