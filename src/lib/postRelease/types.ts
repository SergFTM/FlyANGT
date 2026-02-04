/**
 * Post Release Types
 *
 * Structured types for post-release reports.
 */

/**
 * Report locale
 */
export type PostReleaseLocale = 'en' | 'ru';

/**
 * Gate status
 */
export type PostReleaseGateStatus = 'green' | 'yellow' | 'red';

/**
 * Environment type
 */
export type PostReleaseEnvironment = 'prod' | 'staging';

/**
 * Simple item with text
 */
export interface PostReleaseItem {
  text: string;
}

/**
 * Action item with optional owner and due date
 */
export interface ActionItem {
  text: string;
  owner?: string;
  due?: string;
}

/**
 * Checklist summary from packet
 */
export interface ChecklistSummary {
  done: number;
  total: number;
  pct: number;
}

/**
 * Included file reference
 */
export interface IncludedFile {
  fileId: string;
  filename: string;
}

/**
 * Complete post-release report
 */
export interface PostReleaseReport {
  id: string;
  createdAt: string;
  updatedAt: string;
  locale: PostReleaseLocale;
  packetId: string;
  rcId: string;
  fromRc?: string;
  toRc?: string;
  checklistSummary?: ChecklistSummary;
  includes?: IncludedFile[];
  releaseDate?: string;
  environment?: PostReleaseEnvironment;
  deployUrl?: string;
  releaseTagOrCommit?: string;
  actualGateStatus?: PostReleaseGateStatus;
  issuesFound: PostReleaseItem[];
  incidents: PostReleaseItem[];
  actionItems: ActionItem[];
  notes?: string;
}

/**
 * Saved report reference (for listing)
 */
export interface SavedReportRef {
  id: string;
  createdAt: string;
  updatedAt: string;
  packetId: string;
  rcId: string;
  fromRc?: string;
  toRc?: string;
  environment?: PostReleaseEnvironment;
  actualGateStatus?: PostReleaseGateStatus;
}

/**
 * Store state
 */
export interface PostReleaseStoreState {
  reports: SavedReportRef[];
  selectedReportId: string | null;
  currentReport: PostReleaseReport | null;
}

/**
 * Generate report ID in format PR-YYYYMMDD-HHMMSS
 */
export function generateReportId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `PR-${year}${month}${day}-${hours}${minutes}${seconds}`;
}

/**
 * Extract saved report reference from full report
 */
export function extractReportRef(report: PostReleaseReport): SavedReportRef {
  return {
    id: report.id,
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
    packetId: report.packetId,
    rcId: report.rcId,
    fromRc: report.fromRc,
    toRc: report.toRc,
    environment: report.environment,
    actualGateStatus: report.actualGateStatus,
  };
}

/**
 * Create empty report from packet data
 */
export function createReportFromPacket(
  packetId: string,
  rcFrom: string,
  rcTo: string,
  checklistSummary: ChecklistSummary | undefined,
  includes: IncludedFile[] | undefined,
  locale: PostReleaseLocale = 'en'
): PostReleaseReport {
  const now = new Date().toISOString();

  return {
    id: generateReportId(),
    createdAt: now,
    updatedAt: now,
    locale,
    packetId,
    rcId: rcTo,
    fromRc: rcFrom,
    toRc: rcTo,
    checklistSummary,
    includes,
    issuesFound: [],
    incidents: [],
    actionItems: [],
  };
}
