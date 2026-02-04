/**
 * Changelog Formatter
 *
 * Deterministic transformation of diff reports into changelog documents.
 * No AI, no fuzzy interpretation - pure rule-based mapping.
 */

import type { DiffGroupReport, DiffItem, DiffKind } from '$lib/rc/diff';
import type { ChangelogConfig, ChangelogGroup } from '$config/changelog.config';

/**
 * Supported output languages
 */
export type ChangelogLanguage = 'en' | 'ru';

/**
 * Bucket types for changelog items
 */
export type BucketType = 'Added' | 'Changed' | 'Removed' | 'Fixed' | 'Notes';

/**
 * Buckets structure
 */
export interface ChangelogBuckets {
  Added: string[];
  Changed: string[];
  Removed: string[];
  Fixed: string[];
  Notes: string[];
}

/**
 * Changelog section for a group
 */
export interface ChangelogSection {
  groupId: string;
  groupTitle: string;
  buckets: ChangelogBuckets;
  truncated: boolean;
  isNotes: boolean;
}

/**
 * Changelog meta information
 */
export interface ChangelogMeta {
  generatedAt: string;
  fromRc: string;
  toRc: string;
  language: ChangelogLanguage;
}

/**
 * Changelog summary
 */
export interface ChangelogSummary {
  changedGroups: number;
  totalItems: number;
}

/**
 * Complete changelog document
 */
export interface ChangelogDoc {
  meta: ChangelogMeta;
  sections: ChangelogSection[];
  summary: ChangelogSummary;
}

/**
 * Template strings for formatting
 */
export interface ChangelogTemplates {
  // Bucket headings
  added: string;
  changed: string;
  removed: string;
  fixed: string;
  notes: string;
  // Item templates
  itemAdded: string;     // e.g., "added {path}"
  itemChanged: string;   // e.g., "updated {path}"
  itemRemoved: string;   // e.g., "removed {path}"
  // Value hints
  objectHint: string;    // e.g., "(object)"
  arrayHint: string;     // e.g., "(array, {n} items)"
  // Misc
  truncatedNote: string;
}

/**
 * English templates
 */
export const templatesEn: ChangelogTemplates = {
  added: 'Added',
  changed: 'Changed',
  removed: 'Removed',
  fixed: 'Fixed',
  notes: 'Notes',
  itemAdded: 'added {path}',
  itemChanged: 'updated {path}',
  itemRemoved: 'removed {path}',
  objectHint: '(object)',
  arrayHint: '(array, {n} items)',
  truncatedNote: '... and {n} more items',
};

/**
 * Russian templates
 */
export const templatesRu: ChangelogTemplates = {
  added: 'Добавлено',
  changed: 'Изменено',
  removed: 'Удалено',
  fixed: 'Исправлено',
  notes: 'Заметки',
  itemAdded: 'добавлен {path}',
  itemChanged: 'обновлен {path}',
  itemRemoved: 'удален {path}',
  objectHint: '(объект)',
  arrayHint: '(массив, {n} элементов)',
  truncatedNote: '... и еще {n} элементов',
};

/**
 * Get templates for language
 */
export function getTemplates(lang: ChangelogLanguage): ChangelogTemplates {
  return lang === 'ru' ? templatesRu : templatesEn;
}

/**
 * Check if value is a plain object
 */
function isPlainObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

/**
 * Format value as short hint
 */
function formatValueHint(val: unknown, templates: ChangelogTemplates): string {
  if (val === undefined || val === null) {
    return '';
  }
  if (Array.isArray(val)) {
    return templates.arrayHint.replace('{n}', String(val.length));
  }
  if (isPlainObject(val)) {
    return templates.objectHint;
  }
  if (typeof val === 'string') {
    if (val.length > 30) {
      return `"${val.slice(0, 27)}..."`;
    }
    return `"${val}"`;
  }
  return String(val);
}

/**
 * Check if path should be ignored
 */
function shouldIgnorePath(path: string, ignorePrefixes: string[]): boolean {
  if (!path) return false;
  const pathLower = path.toLowerCase();
  for (const prefix of ignorePrefixes) {
    if (pathLower.startsWith(prefix.toLowerCase()) || pathLower.includes(`.${prefix.toLowerCase()}`)) {
      return true;
    }
  }
  return false;
}

/**
 * Check if path indicates a fix
 */
function isFixPath(path: string, fixHints: string[]): boolean {
  if (!path) return false;
  const pathLower = path.toLowerCase();
  for (const hint of fixHints) {
    if (pathLower.includes(hint.toLowerCase())) {
      return true;
    }
  }
  return false;
}

/**
 * Determine bucket for a diff item
 */
function determineBucket(
  item: DiffItem,
  fixHints: string[]
): BucketType {
  // Check for fix patterns (only applies to changed items)
  if (item.kind === 'changed' && isFixPath(item.path, fixHints)) {
    return 'Fixed';
  }

  // Standard mapping
  switch (item.kind) {
    case 'added':
      return 'Added';
    case 'removed':
      return 'Removed';
    case 'changed':
      return 'Changed';
    default:
      return 'Changed';
  }
}

/**
 * Format a diff item as a bullet string
 */
function formatDiffItem(
  item: DiffItem,
  templates: ChangelogTemplates
): string {
  const path = item.path || '(root)';

  // Select template based on kind
  let template: string;
  switch (item.kind) {
    case 'added':
      template = templates.itemAdded;
      break;
    case 'removed':
      template = templates.itemRemoved;
      break;
    case 'changed':
    default:
      template = templates.itemChanged;
      break;
  }

  let result = template.replace('{path}', path);

  // Add value hint for context
  if (item.kind === 'added' && item.b !== undefined) {
    const hint = formatValueHint(item.b, templates);
    if (hint) {
      result += ` ${hint}`;
    }
  } else if (item.kind === 'removed' && item.a !== undefined) {
    const hint = formatValueHint(item.a, templates);
    if (hint) {
      result += ` ${hint}`;
    }
  } else if (item.kind === 'changed') {
    // Show both old and new for changed items (briefly)
    const fromHint = formatValueHint(item.a, templates);
    const toHint = formatValueHint(item.b, templates);
    if (fromHint && toHint && fromHint !== toHint) {
      result += `: ${fromHint} -> ${toHint}`;
    }
  }

  return result;
}

/**
 * Process a single diff group into a changelog section
 */
function processGroup(
  group: ChangelogGroup,
  diffReport: DiffGroupReport | undefined,
  config: ChangelogConfig,
  templates: ChangelogTemplates,
  groupTitle: string
): ChangelogSection | null {
  const buckets: ChangelogBuckets = {
    Added: [],
    Changed: [],
    Removed: [],
    Fixed: [],
    Notes: [],
  };

  if (!diffReport || !diffReport.changed) {
    return null;
  }

  const ignorePrefixes = group.ignorePathPrefixes ?? [];
  const fixHints = config.mappingRules.fixedPathHints;
  const maxItems = config.formatting.maxItemsPerSection;

  let totalItems = 0;
  const bucketCounts: Record<BucketType, number> = {
    Added: 0,
    Changed: 0,
    Removed: 0,
    Fixed: 0,
    Notes: 0,
  };

  // Process all items
  for (const item of diffReport.items) {
    // Skip ignored paths
    if (shouldIgnorePath(item.path, ignorePrefixes)) {
      continue;
    }

    // Determine bucket
    let bucket = determineBucket(item, fixHints);

    // If this is a notes group, put everything in Notes
    if (group.isNotes) {
      bucket = 'Notes';
    }

    // Format the item
    const formatted = formatDiffItem(item, templates);

    // Add to bucket (respect max items)
    bucketCounts[bucket]++;
    totalItems++;

    if (buckets[bucket].length < maxItems) {
      buckets[bucket].push(formatted);
    }
  }

  // Check if any buckets have content
  const hasContent = Object.values(buckets).some(arr => arr.length > 0);
  if (!hasContent) {
    return null;
  }

  // Check for truncation
  const truncated = Object.entries(bucketCounts).some(
    ([bucket, count]) => count > buckets[bucket as BucketType].length
  );

  return {
    groupId: group.id,
    groupTitle,
    buckets,
    truncated,
    isNotes: group.isNotes ?? false,
  };
}

/**
 * Build a changelog document from diff reports
 */
export function buildChangelogDoc(
  fromRc: string,
  toRc: string,
  language: ChangelogLanguage,
  diffReports: DiffGroupReport[],
  config: ChangelogConfig,
  groupTitles: Record<string, string>
): ChangelogDoc {
  const templates = getTemplates(language);

  // Build diff report lookup
  const reportMap = new Map<string, DiffGroupReport>();
  for (const report of diffReports) {
    reportMap.set(report.groupId, report);
  }

  // Process each enabled group
  const sections: ChangelogSection[] = [];
  let changedGroups = 0;
  let totalItems = 0;

  for (const group of config.groups) {
    if (!group.enabled) continue;

    const diffReport = reportMap.get(group.sourceDiffGroupId);
    const groupTitle = groupTitles[group.id] ?? group.id;

    const section = processGroup(group, diffReport, config, templates, groupTitle);

    if (section) {
      sections.push(section);
      changedGroups++;

      // Count items
      for (const bucket of Object.values(section.buckets)) {
        totalItems += bucket.length;
      }
    }
  }

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      fromRc,
      toRc,
      language,
    },
    sections,
    summary: {
      changedGroups,
      totalItems,
    },
  };
}
