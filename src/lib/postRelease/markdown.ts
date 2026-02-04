/**
 * Post Release Markdown Renderer
 *
 * Converts PostReleaseReport to markdown format.
 */

import type { PostReleaseReport, PostReleaseGateStatus, PostReleaseEnvironment } from './types';

/**
 * Markdown rendering strings
 */
export interface PostReleaseStrings {
  // Title
  title: string;
  // Section titles
  metaTitle: string;
  deploymentTitle: string;
  readinessTitle: string;
  issuesTitle: string;
  incidentsTitle: string;
  actionsTitle: string;
  notesTitle: string;
  // Field labels
  reportId: string;
  packetId: string;
  rcId: string;
  fromRc: string;
  toRc: string;
  createdAt: string;
  releaseDate: string;
  environment: string;
  deployUrl: string;
  tagOrCommit: string;
  gateStatus: string;
  checklistStatus: string;
  includedFiles: string;
  owner: string;
  due: string;
  // Status labels
  statusGreen: string;
  statusYellow: string;
  statusRed: string;
  // Environment labels
  envProd: string;
  envStaging: string;
  // Placeholder
  none: string;
}

/**
 * English strings
 */
export const postReleaseStringsEn: PostReleaseStrings = {
  title: 'Post Release Report',
  metaTitle: 'Meta',
  deploymentTitle: 'Deployment',
  readinessTitle: 'Readiness',
  issuesTitle: 'Issues Found',
  incidentsTitle: 'Incidents',
  actionsTitle: 'Action Items',
  notesTitle: 'Notes',
  reportId: 'Report ID',
  packetId: 'Packet ID',
  rcId: 'RC ID',
  fromRc: 'From RC',
  toRc: 'To RC',
  createdAt: 'Created',
  releaseDate: 'Release Date',
  environment: 'Environment',
  deployUrl: 'Deploy URL',
  tagOrCommit: 'Tag/Commit',
  gateStatus: 'Gate Status',
  checklistStatus: 'Checklist',
  includedFiles: 'Included Files',
  owner: 'Owner',
  due: 'Due',
  statusGreen: 'Green',
  statusYellow: 'Yellow',
  statusRed: 'Red',
  envProd: 'Production',
  envStaging: 'Staging',
  none: 'none',
};

/**
 * Russian strings
 */
export const postReleaseStringsRu: PostReleaseStrings = {
  title: 'Отчет после релиза',
  metaTitle: 'Мета',
  deploymentTitle: 'Развертывание',
  readinessTitle: 'Готовность',
  issuesTitle: 'Обнаруженные проблемы',
  incidentsTitle: 'Инциденты',
  actionsTitle: 'Задачи',
  notesTitle: 'Заметки',
  reportId: 'ID отчета',
  packetId: 'ID пакета',
  rcId: 'ID RC',
  fromRc: 'От RC',
  toRc: 'До RC',
  createdAt: 'Создан',
  releaseDate: 'Дата релиза',
  environment: 'Окружение',
  deployUrl: 'URL развертывания',
  tagOrCommit: 'Тег/Коммит',
  gateStatus: 'Статус Gate',
  checklistStatus: 'Чеклист',
  includedFiles: 'Включенные файлы',
  owner: 'Ответственный',
  due: 'Срок',
  statusGreen: 'Зеленый',
  statusYellow: 'Желтый',
  statusRed: 'Красный',
  envProd: 'Продакшен',
  envStaging: 'Стейджинг',
  none: 'нет',
};

/**
 * Get strings for language
 */
export function getPostReleaseStrings(lang: 'en' | 'ru'): PostReleaseStrings {
  return lang === 'ru' ? postReleaseStringsRu : postReleaseStringsEn;
}

/**
 * Format date for display
 */
function formatDate(isoString: string | undefined): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString();
}

/**
 * Get status label
 */
function getStatusLabel(status: PostReleaseGateStatus | undefined, strings: PostReleaseStrings): string {
  if (!status) return '';
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
 * Get environment label
 */
function getEnvLabel(env: PostReleaseEnvironment | undefined, strings: PostReleaseStrings): string {
  if (!env) return '';
  switch (env) {
    case 'prod':
      return strings.envProd;
    case 'staging':
      return strings.envStaging;
    default:
      return env;
  }
}

/**
 * Render post-release report to markdown
 */
export function renderPostReleaseMd(
  report: PostReleaseReport,
  language: 'en' | 'ru',
  strings: PostReleaseStrings
): string {
  const lines: string[] = [];
  const noneLabel = `- ${strings.none}`;

  // Title
  lines.push(`# ${strings.title}`);
  lines.push('');

  // Meta section
  lines.push(`## ${strings.metaTitle}`);
  lines.push('');
  lines.push(`- **${strings.reportId}:** ${report.id}`);
  lines.push(`- **${strings.packetId}:** ${report.packetId}`);
  lines.push(`- **${strings.rcId}:** ${report.rcId}`);
  if (report.fromRc) {
    lines.push(`- **${strings.fromRc}:** ${report.fromRc}`);
  }
  if (report.toRc) {
    lines.push(`- **${strings.toRc}:** ${report.toRc}`);
  }
  lines.push(`- **${strings.createdAt}:** ${formatDate(report.createdAt)}`);
  lines.push('');

  // Deployment section
  lines.push(`## ${strings.deploymentTitle}`);
  lines.push('');
  if (report.releaseDate) {
    lines.push(`- **${strings.releaseDate}:** ${formatDate(report.releaseDate)}`);
  }
  if (report.environment) {
    lines.push(`- **${strings.environment}:** ${getEnvLabel(report.environment, strings)}`);
  }
  if (report.deployUrl) {
    lines.push(`- **${strings.deployUrl}:** ${report.deployUrl}`);
  }
  if (report.releaseTagOrCommit) {
    lines.push(`- **${strings.tagOrCommit}:** ${report.releaseTagOrCommit}`);
  }
  if (!report.releaseDate && !report.environment && !report.deployUrl && !report.releaseTagOrCommit) {
    lines.push(noneLabel);
  }
  lines.push('');

  // Readiness section
  lines.push(`## ${strings.readinessTitle}`);
  lines.push('');
  if (report.actualGateStatus) {
    lines.push(`- **${strings.gateStatus}:** ${getStatusLabel(report.actualGateStatus, strings)}`);
  }
  if (report.checklistSummary) {
    lines.push(`- **${strings.checklistStatus}:** ${report.checklistSummary.done}/${report.checklistSummary.total} (${report.checklistSummary.pct}%)`);
  }
  if (report.includes && report.includes.length > 0) {
    lines.push(`- **${strings.includedFiles}:** ${report.includes.length}`);
    for (const file of report.includes) {
      lines.push(`  - ${file.filename}`);
    }
  }
  if (!report.actualGateStatus && !report.checklistSummary && (!report.includes || report.includes.length === 0)) {
    lines.push(noneLabel);
  }
  lines.push('');

  // Issues Found section
  lines.push(`## ${strings.issuesTitle}`);
  lines.push('');
  if (report.issuesFound.length === 0) {
    lines.push(noneLabel);
  } else {
    for (const issue of report.issuesFound) {
      lines.push(`- ${issue.text}`);
    }
  }
  lines.push('');

  // Incidents section
  lines.push(`## ${strings.incidentsTitle}`);
  lines.push('');
  if (report.incidents.length === 0) {
    lines.push(noneLabel);
  } else {
    for (const incident of report.incidents) {
      lines.push(`- ${incident.text}`);
    }
  }
  lines.push('');

  // Action Items section
  lines.push(`## ${strings.actionsTitle}`);
  lines.push('');
  if (report.actionItems.length === 0) {
    lines.push(noneLabel);
  } else {
    for (const action of report.actionItems) {
      let line = `- ${action.text}`;
      if (action.owner) {
        line += ` (${strings.owner}: ${action.owner})`;
      }
      if (action.due) {
        line += ` [${strings.due}: ${action.due}]`;
      }
      lines.push(line);
    }
  }
  lines.push('');

  // Notes section
  lines.push(`## ${strings.notesTitle}`);
  lines.push('');
  if (report.notes && report.notes.trim()) {
    lines.push(report.notes.trim());
  } else {
    lines.push(noneLabel);
  }
  lines.push('');

  return lines.join('\n');
}

/**
 * Generate export filename
 */
export function generateExportFilename(
  prefix: string,
  reportId: string,
  language: 'en' | 'ru',
  extension: 'md' | 'json'
): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${prefix}-${reportId}-${language}-${year}${month}${day}-${hours}${minutes}.${extension}`;
}
