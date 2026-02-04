/**
 * Release Notes Markdown Renderer
 *
 * Converts ReleaseNotesDoc to markdown format.
 */

import type { ReleaseNotesDoc, GateStatus } from './types';
import type { KnownIssue, KnownIssueSeverity } from './knownIssues.model';

/**
 * Markdown rendering strings
 */
export interface ReleaseNotesStrings {
  // Section titles
  title: string;
  metaTitle: string;
  readinessTitle: string;
  highlightsTitle: string;
  changelogTitle: string;
  qualityTitle: string;
  knownIssuesTitle: string;
  linksTitle: string;
  nextStepsTitle: string;
  // Meta labels
  generatedAt: string;
  fromRc: string;
  toRc: string;
  status: string;
  // Readiness labels
  overallStatus: string;
  releaseP0: string;
  smokeP0: string;
  i18nMissing: string;
  // Quality labels
  releaseChecklist: string;
  smokeChecklist: string;
  // Status labels
  statusGreen: string;
  statusYellow: string;
  statusRed: string;
  // Severity labels
  severityHigh: string;
  severityMedium: string;
  severityLow: string;
  // Other
  noKnownIssues: string;
  truncatedNote: string;
  openLabel: string;
  doneLabel: string;
  blockedLabel: string;
  failLabel: string;
}

/**
 * English strings
 */
export const releaseNotesStringsEn: ReleaseNotesStrings = {
  title: 'Release Notes',
  metaTitle: 'Meta',
  readinessTitle: 'Readiness',
  highlightsTitle: 'Highlights',
  changelogTitle: 'Changelog',
  qualityTitle: 'Quality Summary',
  knownIssuesTitle: 'Known Issues',
  linksTitle: 'Links',
  nextStepsTitle: 'Next Steps',
  generatedAt: 'Generated',
  fromRc: 'From RC',
  toRc: 'To RC',
  status: 'Status',
  overallStatus: 'Overall Status',
  releaseP0: 'Release P0',
  smokeP0: 'Smoke P0',
  i18nMissing: 'i18n Missing',
  releaseChecklist: 'Release Checklist',
  smokeChecklist: 'Smoke Tests',
  statusGreen: 'Ready',
  statusYellow: 'In Progress',
  statusRed: 'Blocked',
  severityHigh: 'HIGH',
  severityMedium: 'MEDIUM',
  severityLow: 'LOW',
  noKnownIssues: 'No known issues',
  truncatedNote: '... and more issues',
  openLabel: 'open',
  doneLabel: 'done',
  blockedLabel: 'blocked',
  failLabel: 'fail',
};

/**
 * Russian strings
 */
export const releaseNotesStringsRu: ReleaseNotesStrings = {
  title: 'Заметки о релизе',
  metaTitle: 'Мета',
  readinessTitle: 'Готовность',
  highlightsTitle: 'Основные изменения',
  changelogTitle: 'Журнал изменений',
  qualityTitle: 'Сводка качества',
  knownIssuesTitle: 'Известные проблемы',
  linksTitle: 'Ссылки',
  nextStepsTitle: 'Следующие шаги',
  generatedAt: 'Сгенерировано',
  fromRc: 'От RC',
  toRc: 'До RC',
  status: 'Статус',
  overallStatus: 'Общий статус',
  releaseP0: 'Релиз P0',
  smokeP0: 'Дымовые P0',
  i18nMissing: 'Отсутствуют i18n',
  releaseChecklist: 'Чеклист релиза',
  smokeChecklist: 'Дымовые тесты',
  statusGreen: 'Готово',
  statusYellow: 'В процессе',
  statusRed: 'Заблокировано',
  severityHigh: 'ВЫСОКАЯ',
  severityMedium: 'СРЕДНЯЯ',
  severityLow: 'НИЗКАЯ',
  noKnownIssues: 'Нет известных проблем',
  truncatedNote: '... и другие проблемы',
  openLabel: 'открыто',
  doneLabel: 'готово',
  blockedLabel: 'заблокировано',
  failLabel: 'провалено',
};

/**
 * Get strings for language
 */
export function getReleaseNotesStrings(lang: 'en' | 'ru'): ReleaseNotesStrings {
  return lang === 'ru' ? releaseNotesStringsRu : releaseNotesStringsEn;
}

/**
 * Format date for display
 */
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString();
}

/**
 * Get status label
 */
function getStatusLabel(status: GateStatus, strings: ReleaseNotesStrings): string {
  switch (status) {
    case 'green':
      return strings.statusGreen;
    case 'yellow':
      return strings.statusYellow;
    case 'red':
      return strings.statusRed;
    default:
      return status;
  }
}

/**
 * Get severity label
 */
function getSeverityLabel(severity: KnownIssueSeverity, strings: ReleaseNotesStrings): string {
  switch (severity) {
    case 'high':
      return strings.severityHigh;
    case 'medium':
      return strings.severityMedium;
    case 'low':
      return strings.severityLow;
    default:
      return severity;
  }
}

/**
 * Render a known issue to markdown
 */
function renderKnownIssue(issue: KnownIssue, strings: ReleaseNotesStrings): string {
  const severity = getSeverityLabel(issue.severity, strings);
  let line = `- [${severity}] ${issue.title}`;

  if (issue.owner) {
    line += ` (${issue.owner})`;
  }

  if (issue.notes) {
    line += ` - ${issue.notes}`;
  }

  return line;
}

/**
 * Render release notes document to markdown
 */
export function renderReleaseNotesMd(
  doc: ReleaseNotesDoc,
  strings: ReleaseNotesStrings,
  maxKnownIssues: number = 10
): string {
  const lines: string[] = [];

  // Title
  lines.push(`# ${strings.title}`);
  lines.push('');

  // Meta section
  lines.push(`## ${strings.metaTitle}`);
  lines.push('');
  lines.push(`**${strings.fromRc}:** ${doc.meta.fromRc}`);
  lines.push(`**${strings.toRc}:** ${doc.meta.toRc}`);
  lines.push(`**${strings.generatedAt}:** ${formatDate(doc.meta.generatedAt)}`);
  lines.push('');

  // Readiness section
  lines.push(`## ${strings.readinessTitle}`);
  lines.push('');
  lines.push(`**${strings.overallStatus}:** ${getStatusLabel(doc.readiness.status, strings)}`);
  lines.push('');
  lines.push(`| Metric | Total | ${strings.doneLabel} | ${strings.openLabel} | ${strings.blockedLabel}/${strings.failLabel} |`);
  lines.push('|--------|-------|------|------|----------|');
  lines.push(`| ${strings.releaseP0} | ${doc.readiness.releaseP0.total} | ${doc.readiness.releaseP0.done} | ${doc.readiness.releaseP0.open} | ${doc.readiness.releaseP0.blocked ?? 0} |`);
  lines.push(`| ${strings.smokeP0} | ${doc.readiness.smokeP0.total} | ${doc.readiness.smokeP0.done} | ${doc.readiness.smokeP0.open} | ${doc.readiness.smokeP0.fail ?? 0} |`);
  lines.push('');

  // Highlights section
  if (doc.highlights.length > 0) {
    lines.push(`## ${strings.highlightsTitle}`);
    lines.push('');
    for (const highlight of doc.highlights) {
      lines.push(`- ${highlight}`);
    }
    lines.push('');
  }

  // Quality section
  lines.push(`## ${strings.qualityTitle}`);
  lines.push('');
  lines.push(`- **${strings.releaseChecklist}:** ${doc.quality.releaseOverallPct}% (${doc.quality.releaseP0Open} P0 ${strings.openLabel})`);
  lines.push(`- **${strings.smokeChecklist}:** ${doc.quality.smokeOverallPct}% (${doc.quality.smokeP0Open} P0 ${strings.openLabel})`);
  lines.push('');

  // Changelog section
  lines.push(`## ${strings.changelogTitle}`);
  lines.push('');
  lines.push(doc.changelogMd);
  lines.push('');

  // Known Issues section
  lines.push(`## ${strings.knownIssuesTitle}`);
  lines.push('');
  if (doc.knownIssues.length === 0) {
    lines.push(`*${strings.noKnownIssues}*`);
  } else {
    const displayIssues = doc.knownIssues.slice(0, maxKnownIssues);
    for (const issue of displayIssues) {
      lines.push(renderKnownIssue(issue, strings));
    }
    if (doc.knownIssues.length > maxKnownIssues) {
      lines.push(`- *${strings.truncatedNote}*`);
    }
  }
  lines.push('');

  // Links section
  lines.push(`## ${strings.linksTitle}`);
  lines.push('');
  for (const link of doc.links) {
    lines.push(`- [${link.title}](${link.href})`);
  }
  lines.push('');

  // Next Steps section
  lines.push(`## ${strings.nextStepsTitle}`);
  lines.push('');
  for (const step of doc.nextSteps) {
    lines.push(`- ${step}`);
  }
  lines.push('');

  return lines.join('\n');
}
