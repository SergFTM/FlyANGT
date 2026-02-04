/**
 * RC Compare Export Helpers
 *
 * Download and copy functions for diff reports.
 */

import type { DiffGroupReport, DiffSummary } from './diff';
import type { Locale } from '$config/i18n.config';

/**
 * Diff export structure
 */
export interface DiffExport {
  generatedAt: string;
  locale: Locale;
  aId: string;
  bId: string;
  summary: DiffSummary;
  groups: DiffGroupReport[];
}

/**
 * Generate export filename
 *
 * Format: {prefix}-{aId}-{bId}-{YYYYMMDD-HHMM}.json
 */
export function makeDiffExportFilename(
  prefix: string,
  aId: string,
  bId: string
): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');

  return `${prefix}-${aId}-${bId}-${yyyy}${mm}${dd}-${hh}${min}.json`;
}

/**
 * Download JSON data as file
 */
export function downloadDiffJson(filename: string, data: DiffExport): void {
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
export async function copyDiffJson(data: DiffExport): Promise<void> {
  const json = JSON.stringify(data, null, 2);
  await navigator.clipboard.writeText(json);
}

/**
 * Build diff export object
 */
export function buildDiffExport(
  locale: Locale,
  aId: string,
  bId: string,
  summary: DiffSummary,
  groups: DiffGroupReport[]
): DiffExport {
  return {
    generatedAt: new Date().toISOString(),
    locale,
    aId,
    bId,
    summary,
    groups,
  };
}
