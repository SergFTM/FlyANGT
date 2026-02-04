/**
 * Release Candidate Model
 *
 * Types and utilities for RC state management.
 */

import type { RcConfig, RcArtifactId } from '$config/rc.config';
import type { Locale } from '$config/i18n.config';

/**
 * RC status levels
 */
export type RcStatus = 'green' | 'yellow' | 'red';

/**
 * RC summary data
 */
export interface RcSummary {
  releaseP0Open?: number;
  releaseP0Blocked?: number;
  smokeP0Open?: number;
  smokeP0Fail?: number;
  i18nMissingEn?: number;
  i18nMissingRu?: number;
}

/**
 * RC record
 */
export interface RcRecord {
  id: string;
  createdAt: string;
  locale: Locale;
  status: RcStatus;
  summary: RcSummary;
  artifacts: Partial<Record<RcArtifactId, unknown>>;
}

/**
 * Gate summary for RC
 */
export interface RcGateSummary {
  status: RcStatus;
  releaseP0: {
    total: number;
    done: number;
    open: number;
    blocked: number;
  };
  smokeP0: {
    total: number;
    pass: number;
    open: number;
    fail: number;
  };
}

/**
 * Generate RC ID based on config strategy
 */
export function makeRcId(config: RcConfig): string {
  const { prefix, strategy } = config.id;

  if (strategy === 'timestamp') {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    return `${prefix}-${yyyy}${mm}${dd}-${hh}${min}${ss}`;
  }

  // Random strategy
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPart = '';
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${randomPart}`;
}

/**
 * Compute RC status from gate summary
 */
export function computeRcStatusFromGate(gateSummary: RcGateSummary): RcStatus {
  // Red if any P0 is blocked or failed
  if (gateSummary.releaseP0.blocked > 0 || gateSummary.smokeP0.fail > 0) {
    return 'red';
  }

  // Yellow if any P0 is open
  if (gateSummary.releaseP0.open > 0 || gateSummary.smokeP0.open > 0) {
    return 'yellow';
  }

  // Green if all P0 are done/pass
  return 'green';
}

/**
 * Trim records array to max limit (removes oldest first)
 */
export function trimToLimit(records: RcRecord[], max: number): RcRecord[] {
  if (records.length <= max) {
    return records;
  }
  // Records are sorted newest first, so slice from start
  return records.slice(0, max);
}

/**
 * Generate export filename for RC artifact
 */
export function toExportFilename(
  rcId: string,
  artifactId: RcArtifactId,
  prefix: string
): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');

  return `${prefix}-${rcId}-${artifactId}-${yyyy}${mm}${dd}-${hh}${min}.json`;
}

/**
 * Download JSON data as file
 */
export function downloadJson(filename: string, data: unknown): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Copy JSON data to clipboard
 */
export async function copyJson(data: unknown): Promise<void> {
  const json = JSON.stringify(data, null, 2);
  await navigator.clipboard.writeText(json);
}

/**
 * Format date for display
 */
export function formatRcDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString();
}
