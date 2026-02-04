/**
 * Changelog Export Helpers
 *
 * Download and copy functions for changelog documents.
 */

import type { ChangelogDoc, ChangelogLanguage } from './formatter';

/**
 * Generate timestamp string for filenames
 */
function makeTimestamp(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');

  return `${yyyy}${mm}${dd}-${hh}${min}`;
}

/**
 * Generate markdown export filename
 */
export function makeChangelogMdFilename(
  prefix: string,
  fromRc: string,
  toRc: string,
  lang: ChangelogLanguage
): string {
  return `${prefix}-${fromRc}-${toRc}-${lang}-${makeTimestamp()}.md`;
}

/**
 * Generate JSON export filename
 */
export function makeChangelogJsonFilename(
  prefix: string,
  fromRc: string,
  toRc: string,
  lang: ChangelogLanguage
): string {
  return `${prefix}-${fromRc}-${toRc}-${lang}-${makeTimestamp()}.json`;
}

/**
 * Download text content as file
 */
export function downloadText(
  filename: string,
  content: string,
  mimeType: string = 'text/plain'
): void {
  const blob = new Blob([content], { type: mimeType });
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
 * Download markdown changelog
 */
export function downloadChangelogMd(
  prefix: string,
  fromRc: string,
  toRc: string,
  lang: ChangelogLanguage,
  content: string
): void {
  const filename = makeChangelogMdFilename(prefix, fromRc, toRc, lang);
  downloadText(filename, content, 'text/markdown');
}

/**
 * Download JSON changelog
 */
export function downloadChangelogJson(
  prefix: string,
  fromRc: string,
  toRc: string,
  lang: ChangelogLanguage,
  doc: ChangelogDoc
): void {
  const filename = makeChangelogJsonFilename(prefix, fromRc, toRc, lang);
  const json = JSON.stringify(doc, null, 2);
  downloadText(filename, json, 'application/json');
}

/**
 * Copy markdown to clipboard
 */
export async function copyChangelogMd(content: string): Promise<void> {
  await navigator.clipboard.writeText(content);
}

/**
 * Copy JSON to clipboard
 */
export async function copyChangelogJson(doc: ChangelogDoc): Promise<void> {
  const json = JSON.stringify(doc, null, 2);
  await navigator.clipboard.writeText(json);
}
