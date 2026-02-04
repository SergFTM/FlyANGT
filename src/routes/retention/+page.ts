/**
 * Retention Page Data Loader
 *
 * DEV-ONLY tool for archiving old records.
 * Returns 404 in production.
 */

import type { PageLoad } from './$types';
import { isLocaleSupported, t, type Locale } from '$config/i18n.config';
import { gateConfig } from '$config/gate.config';
import { retentionConfig, getBucketIds } from '$config/retention.config';
import { assertDevToolAllowed } from '$lib/devtools/guard';

export const load: PageLoad = ({ url }) => {
  // Unified dev tools guard
  assertDevToolAllowed(url.pathname, gateConfig);

  // Resolve locale
  const langParam = url.searchParams.get('lang');
  const locale: Locale = langParam && isLocaleSupported(langParam) ? langParam : 'en';

  // Build bucket labels
  const bucketLabels: Record<string, string> = {};
  for (const bucketId of getBucketIds()) {
    bucketLabels[bucketId] = t(`retention.bucket.${bucketId}` as keyof typeof import('$config/i18n.config').translations.en, locale);
  }

  return {
    locale,
    config: {
      defaultDays: retentionConfig.defaults.days,
      defaultIncludeNew: retentionConfig.defaults.includeNew,
      maxApply: retentionConfig.limits.maxApply,
      previewItems: retentionConfig.limits.previewItems,
    },
    bucketLabels,
    labels: {
      title: t('retention.title', locale),
      subtitle: t('retention.subtitle', locale),
      devOnly: t('retention.notice.devOnly', locale),
      actions: {
        dryRun: t('retention.actions.dryRun', locale),
        apply: t('retention.actions.apply', locale),
      },
      fields: {
        days: t('retention.fields.days', locale),
        includeNew: t('retention.fields.includeNew', locale),
      },
      report: {
        title: t('retention.report.title', locale),
        eligibleCount: t('retention.report.eligibleCount', locale),
        bySource: t('retention.report.bySource', locale),
        byStatus: t('retention.report.byStatus', locale),
        byAge: t('retention.report.byAge', locale),
      },
      messages: {
        applied: t('retention.messages.applied', locale),
        capped: t('retention.messages.capped', locale),
      },
      errors: {
        tooMany: t('retention.errors.tooMany', locale),
      },
    },
  };
};
