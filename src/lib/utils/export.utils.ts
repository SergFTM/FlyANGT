/**
 * Export Utilities
 *
 * Client-side helpers for exporting and copying JSON data.
 */

import type { LeadRecord, RequestRecord } from '$lib/domain/types';
import type { AdminTabId } from '$config/admin.config';

/**
 * Export data structure
 */
export interface ExportData {
  generatedAt: string;
  filters: {
    tab: AdminTabId;
    source: string;
    search: string;
    limit: number;
  };
  count: number;
  records: (LeadRecord | RequestRecord)[];
}

/**
 * Generate export filename
 *
 * Format: {prefix}-{tab}-{YYYYMMDD-HHMM}.json
 */
export function generateExportFilename(prefix: string, tab: AdminTabId): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${prefix}-${tab}-${year}${month}${day}-${hours}${minutes}.json`;
}

/**
 * Build export data object
 */
export function buildExportData(
  records: (LeadRecord | RequestRecord)[],
  tab: AdminTabId,
  source: string,
  search: string,
  limit: number
): ExportData {
  return {
    generatedAt: new Date().toISOString(),
    filters: {
      tab,
      source,
      search,
      limit,
    },
    count: records.length,
    records,
  };
}

/**
 * Export data to JSON file download
 */
export function exportJson(filename: string, data: ExportData): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Copy JSON data to clipboard
 *
 * Returns true if successful, false otherwise.
 */
export async function copyJson(data: ExportData): Promise<boolean> {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    await navigator.clipboard.writeText(jsonString);
    return true;
  } catch {
    return false;
  }
}
