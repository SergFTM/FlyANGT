/**
 * Changelog Markdown Renderer
 *
 * Converts ChangelogDoc to markdown format.
 */

import type { ChangelogDoc, ChangelogSection, BucketType, ChangelogTemplates } from './formatter';

/**
 * Markdown rendering strings
 */
export interface MarkdownStrings {
  headerTitle: string;
  added: string;
  changed: string;
  removed: string;
  fixed: string;
  notes: string;
  truncatedNote: string;
  fromLabel: string;
  toLabel: string;
  generatedLabel: string;
}

/**
 * English markdown strings
 */
export const markdownStringsEn: MarkdownStrings = {
  headerTitle: 'Changelog',
  added: 'Added',
  changed: 'Changed',
  removed: 'Removed',
  fixed: 'Fixed',
  notes: 'Notes',
  truncatedNote: '... and more items',
  fromLabel: 'From RC',
  toLabel: 'To RC',
  generatedLabel: 'Generated',
};

/**
 * Russian markdown strings
 */
export const markdownStringsRu: MarkdownStrings = {
  headerTitle: 'Журнал изменений',
  added: 'Добавлено',
  changed: 'Изменено',
  removed: 'Удалено',
  fixed: 'Исправлено',
  notes: 'Заметки',
  truncatedNote: '... и другие элементы',
  fromLabel: 'От RC',
  toLabel: 'До RC',
  generatedLabel: 'Сгенерировано',
};

/**
 * Get markdown strings for language
 */
export function getMarkdownStrings(lang: 'en' | 'ru'): MarkdownStrings {
  return lang === 'ru' ? markdownStringsRu : markdownStringsEn;
}

/**
 * Get bucket heading
 */
function getBucketHeading(bucket: BucketType, strings: MarkdownStrings): string {
  switch (bucket) {
    case 'Added':
      return strings.added;
    case 'Changed':
      return strings.changed;
    case 'Removed':
      return strings.removed;
    case 'Fixed':
      return strings.fixed;
    case 'Notes':
      return strings.notes;
    default:
      return bucket;
  }
}

/**
 * Render a section to markdown
 */
function renderSection(section: ChangelogSection, strings: MarkdownStrings): string {
  const lines: string[] = [];

  // Section heading
  lines.push(`## ${section.groupTitle}`);
  lines.push('');

  // Render each bucket that has items
  const bucketOrder: BucketType[] = ['Added', 'Changed', 'Fixed', 'Removed', 'Notes'];

  for (const bucket of bucketOrder) {
    const items = section.buckets[bucket];
    if (items.length === 0) continue;

    // Bucket heading
    lines.push(`### ${getBucketHeading(bucket, strings)}`);
    lines.push('');

    // Bullet items
    for (const item of items) {
      lines.push(`- ${item}`);
    }

    lines.push('');
  }

  // Truncation note
  if (section.truncated) {
    lines.push(`*${strings.truncatedNote}*`);
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Format ISO date for display
 */
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString();
}

/**
 * Render a changelog document to markdown
 */
export function renderChangelogMd(
  doc: ChangelogDoc,
  strings: MarkdownStrings,
  includeMetaHeader: boolean = true
): string {
  const lines: string[] = [];

  // Main title
  lines.push(`# ${strings.headerTitle}`);
  lines.push('');

  // Meta header
  if (includeMetaHeader) {
    lines.push(`**${strings.fromLabel}:** ${doc.meta.fromRc}`);
    lines.push(`**${strings.toLabel}:** ${doc.meta.toRc}`);
    lines.push(`**${strings.generatedLabel}:** ${formatDate(doc.meta.generatedAt)}`);
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  // Separate main sections from notes sections
  const mainSections = doc.sections.filter(s => !s.isNotes);
  const notesSections = doc.sections.filter(s => s.isNotes);

  // Render main sections
  for (const section of mainSections) {
    lines.push(renderSection(section, strings));
  }

  // Render notes sections (if any)
  if (notesSections.length > 0) {
    lines.push('---');
    lines.push('');
    lines.push(`## ${strings.notes}`);
    lines.push('');

    for (const section of notesSections) {
      // For notes, render without the main section heading
      lines.push(`### ${section.groupTitle}`);
      lines.push('');

      // Flatten all buckets for notes
      const allItems: string[] = [];
      for (const bucket of Object.values(section.buckets)) {
        allItems.push(...bucket);
      }

      for (const item of allItems) {
        lines.push(`- ${item}`);
      }

      if (section.truncated) {
        lines.push(`- *${strings.truncatedNote}*`);
      }

      lines.push('');
    }
  }

  return lines.join('\n');
}
