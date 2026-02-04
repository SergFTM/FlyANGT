/**
 * Release Notes Builders
 *
 * Reuses existing helpers to build release notes data.
 */

import { browser } from '$app/environment';
import type { RcRecord } from '$lib/models/rc.model';
import { loadRcRecords, findRcById } from '$lib/rc/rcStorage';
import { getByDotPath } from '$lib/rc/path';
import { diffValues, summarizeAllGroups, type DiffGroupReport } from '$lib/rc/diff';
import { buildChangelogDoc, type ChangelogLanguage } from '$lib/changelog/formatter';
import { renderChangelogMd, getMarkdownStrings } from '$lib/changelog/markdown';
import { readReleaseP0Summary, readSmokeP0Summary, computeGateStatus } from '$lib/devtools/readiness';
import type { RcConfig } from '$config/rc.config';
import type { RcCompareConfig, RcCompareGroup } from '$config/rc-compare.config';
import type { ChangelogConfig } from '$config/changelog.config';
import type { ReleaseNotesConfig } from '$config/release-notes.config';
import type {
  ReleaseNotesLanguage,
  ReadinessSummary,
  QualitySummary,
  ReleaseNotesLink,
  ReleaseNotesDoc,
} from './types';
import type { KnownIssue } from './knownIssues.model';

/**
 * Build readiness summary from current state
 */
export function buildReadinessSummary(): ReadinessSummary {
  const releaseP0 = readReleaseP0Summary();
  const smokeP0 = readSmokeP0Summary();
  const status = computeGateStatus(releaseP0, smokeP0);

  return {
    status,
    releaseP0: {
      total: releaseP0.p0Total,
      done: releaseP0.p0Done,
      open: releaseP0.p0Open,
      blocked: releaseP0.p0Blocked,
    },
    smokeP0: {
      total: smokeP0.p0Total,
      done: smokeP0.p0Pass,
      open: smokeP0.p0Open,
      fail: smokeP0.p0Fail,
    },
  };
}

/**
 * Build quality summary from current state
 */
export function buildQualitySummary(): QualitySummary {
  const releaseP0 = readReleaseP0Summary();
  const smokeP0 = readSmokeP0Summary();

  // Calculate overall percentages
  const releaseOverallPct =
    releaseP0.p0Total > 0
      ? Math.round((releaseP0.p0Done / releaseP0.p0Total) * 100)
      : 100;

  const smokeOverallPct =
    smokeP0.p0Total > 0
      ? Math.round((smokeP0.p0Pass / smokeP0.p0Total) * 100)
      : 100;

  return {
    releaseOverallPct,
    smokeOverallPct,
    releaseP0Open: releaseP0.p0Open,
    smokeP0Open: smokeP0.p0Open,
  };
}

/**
 * Build diff reports between two RC records
 */
export function buildDiffReports(
  rcA: RcRecord,
  rcB: RcRecord,
  rcCompareConfig: RcCompareConfig
): DiffGroupReport[] {
  const reports: DiffGroupReport[] = [];
  const enabledGroups = rcCompareConfig.groups.filter((g: RcCompareGroup) => g.enabled);

  for (const group of enabledGroups) {
    const aValue = getByDotPath(rcA, group.aPath);
    const bValue = getByDotPath(rcB, group.bPath);
    const report = diffValues(group.id, aValue, bValue, 100);
    reports.push(report);
  }

  return reports;
}

/**
 * Build highlights from diff reports (deterministic)
 */
export function buildHighlights(
  diffReports: DiffGroupReport[],
  groupTitles: Record<string, string>,
  language: ReleaseNotesLanguage,
  mostChangesLabel: string
): string[] {
  // Get top 3 groups with most changes
  const changedGroups = diffReports
    .filter(r => r.changed && r.counts.total > 0)
    .sort((a, b) => b.counts.total - a.counts.total)
    .slice(0, 3);

  if (changedGroups.length === 0) {
    return [];
  }

  const groupNames = changedGroups.map(g => groupTitles[g.groupId] ?? g.groupId);
  const highlight = `${mostChangesLabel}: ${groupNames.join(', ')}`;

  return [highlight];
}

/**
 * Build changelog docs for both languages
 */
export function buildChangelogDocs(
  aId: string,
  bId: string,
  diffReports: DiffGroupReport[],
  changelogConfig: ChangelogConfig,
  groupTitles: Record<string, string>
): {
  enDoc: ReturnType<typeof buildChangelogDoc>;
  ruDoc: ReturnType<typeof buildChangelogDoc>;
  enMd: string;
  ruMd: string;
} {
  const enDoc = buildChangelogDoc(aId, bId, 'en', diffReports, changelogConfig, groupTitles);
  const ruDoc = buildChangelogDoc(aId, bId, 'ru', diffReports, changelogConfig, groupTitles);

  const enStrings = getMarkdownStrings('en');
  const ruStrings = getMarkdownStrings('ru');

  const enMd = renderChangelogMd(enDoc, enStrings, changelogConfig.formatting.includeMetaHeader);
  const ruMd = renderChangelogMd(ruDoc, ruStrings, changelogConfig.formatting.includeMetaHeader);

  return { enDoc, ruDoc, enMd, ruMd };
}

/**
 * Build links list from config
 */
export function buildLinksList(
  config: ReleaseNotesConfig,
  linkLabels: Record<string, string>
): ReleaseNotesLink[] {
  const links: ReleaseNotesLink[] = [
    { title: linkLabels.home ?? 'Home', href: config.links.homePath },
    { title: linkLabels.trust ?? 'Trust Center', href: config.links.trustPath },
    { title: linkLabels.workflow ?? 'Workflow', href: config.links.workflowPath },
    { title: linkLabels.presale ?? 'Presale', href: config.links.presalePath },
    { title: linkLabels.configurator ?? 'Configurator', href: config.links.configuratorPath },
    { title: linkLabels.partners ?? 'Partners', href: config.links.partnersPath },
    { title: linkLabels.investors ?? 'Investors', href: config.links.investorsPath },
    { title: linkLabels.customers ?? 'Customers', href: config.links.customersPath },
    { title: linkLabels.token ?? 'Token', href: config.links.tokenPath },
  ];

  return links;
}

/**
 * Build complete release notes document
 */
export function buildReleaseNotesDoc(
  aId: string,
  bId: string,
  language: ReleaseNotesLanguage,
  diffReports: DiffGroupReport[],
  changelogMd: string,
  knownIssues: KnownIssue[],
  config: ReleaseNotesConfig,
  groupTitles: Record<string, string>,
  linkLabels: Record<string, string>,
  mostChangesLabel: string,
  nextStepsPlaceholder: string
): ReleaseNotesDoc {
  const readiness = buildReadinessSummary();
  const quality = buildQualitySummary();
  const highlights = buildHighlights(diffReports, groupTitles, language, mostChangesLabel);
  const links = buildLinksList(config, linkLabels);

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      fromRc: aId,
      toRc: bId,
      language,
    },
    readiness,
    quality,
    highlights,
    changelogMd,
    knownIssues,
    links,
    nextSteps: [nextStepsPlaceholder],
  };
}
