/**
 * RC Diff Engine
 *
 * Pure TypeScript diff implementation for comparing RC artifacts.
 * No external dependencies.
 */

/**
 * Diff kind types
 */
export type DiffKind = 'added' | 'removed' | 'changed';

/**
 * Single diff item
 */
export interface DiffItem {
  kind: DiffKind;
  path: string;
  a?: unknown;
  b?: unknown;
}

/**
 * Counts for a diff group
 */
export interface DiffCounts {
  added: number;
  removed: number;
  changed: number;
  total: number;
}

/**
 * Diff report for a single group
 */
export interface DiffGroupReport {
  groupId: string;
  changed: boolean;
  counts: DiffCounts;
  items: DiffItem[];
  truncated: boolean;
}

/**
 * Overall summary across all groups
 */
export interface DiffSummary {
  changedGroups: number;
  totalChanges: number;
  countsOverall: DiffCounts;
}

/**
 * Check if value is a plain object
 */
function isPlainObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

/**
 * Check if array items have a common key field (id or slug)
 */
function getArrayKeyField(arr: unknown[]): 'id' | 'slug' | null {
  if (arr.length === 0) {
    return null;
  }

  // Check if all items have 'id' field
  const allHaveId = arr.every(
    item => isPlainObject(item) && typeof (item as Record<string, unknown>).id === 'string'
  );
  if (allHaveId) {
    return 'id';
  }

  // Check if all items have 'slug' field
  const allHaveSlug = arr.every(
    item => isPlainObject(item) && typeof (item as Record<string, unknown>).slug === 'string'
  );
  if (allHaveSlug) {
    return 'slug';
  }

  return null;
}

/**
 * Compare two values deeply and collect diff items
 */
function compareValues(
  a: unknown,
  b: unknown,
  path: string,
  items: DiffItem[]
): void {
  // Both undefined or null - no change
  if (a === undefined && b === undefined) {
    return;
  }
  if (a === null && b === null) {
    return;
  }

  // Added (a is undefined/null, b exists)
  if ((a === undefined || a === null) && b !== undefined && b !== null) {
    items.push({ kind: 'added', path, a, b });
    return;
  }

  // Removed (a exists, b is undefined/null)
  if (a !== undefined && a !== null && (b === undefined || b === null)) {
    items.push({ kind: 'removed', path, a, b });
    return;
  }

  // Both are arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    compareArrays(a, b, path, items);
    return;
  }

  // Both are plain objects
  if (isPlainObject(a) && isPlainObject(b)) {
    compareObjects(a, b, path, items);
    return;
  }

  // Primitives or type mismatch
  if (a !== b) {
    items.push({ kind: 'changed', path, a, b });
  }
}

/**
 * Compare two arrays
 */
function compareArrays(
  a: unknown[],
  b: unknown[],
  path: string,
  items: DiffItem[]
): void {
  // Check if we can key by id or slug
  const keyFieldA = getArrayKeyField(a);
  const keyFieldB = getArrayKeyField(b);

  if (keyFieldA && keyFieldA === keyFieldB) {
    // Key-based comparison
    const keyField = keyFieldA;
    const aMap = new Map<string, unknown>();
    const bMap = new Map<string, unknown>();

    for (const item of a) {
      const key = (item as Record<string, unknown>)[keyField] as string;
      aMap.set(key, item);
    }

    for (const item of b) {
      const key = (item as Record<string, unknown>)[keyField] as string;
      bMap.set(key, item);
    }

    // Get all keys, sorted for stable output
    const allKeys = new Set([...aMap.keys(), ...bMap.keys()]);
    const sortedKeys = Array.from(allKeys).sort();

    for (const key of sortedKeys) {
      const aItem = aMap.get(key);
      const bItem = bMap.get(key);
      const itemPath = `${path}[${keyField}=${key}]`;
      compareValues(aItem, bItem, itemPath, items);
    }
  } else {
    // Index-based comparison
    const maxLen = Math.max(a.length, b.length);

    for (let i = 0; i < maxLen; i++) {
      const aItem = i < a.length ? a[i] : undefined;
      const bItem = i < b.length ? b[i] : undefined;
      const itemPath = `${path}[${i}]`;
      compareValues(aItem, bItem, itemPath, items);
    }
  }
}

/**
 * Compare two objects
 */
function compareObjects(
  a: Record<string, unknown>,
  b: Record<string, unknown>,
  path: string,
  items: DiffItem[]
): void {
  // Get all keys, sorted for stable output
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);
  const sortedKeys = Array.from(allKeys).sort();

  for (const key of sortedKeys) {
    const aVal = a[key];
    const bVal = b[key];
    const propPath = path ? `${path}.${key}` : key;
    compareValues(aVal, bVal, propPath, items);
  }
}

/**
 * Compare two values and produce a diff group report
 */
export function diffValues(
  groupId: string,
  a: unknown,
  b: unknown,
  maxItems: number = 20
): DiffGroupReport {
  const allItems: DiffItem[] = [];

  compareValues(a, b, '', allItems);

  // Sort by path for stable output
  allItems.sort((x, y) => x.path.localeCompare(y.path));

  // Count by kind
  const counts: DiffCounts = {
    added: 0,
    removed: 0,
    changed: 0,
    total: allItems.length,
  };

  for (const item of allItems) {
    counts[item.kind]++;
  }

  // Truncate items if needed
  const truncated = allItems.length > maxItems;
  const items = truncated ? allItems.slice(0, maxItems) : allItems;

  return {
    groupId,
    changed: allItems.length > 0,
    counts,
    items,
    truncated,
  };
}

/**
 * Summarize all group reports
 */
export function summarizeAllGroups(reports: DiffGroupReport[]): DiffSummary {
  let changedGroups = 0;
  let totalChanges = 0;
  const countsOverall: DiffCounts = {
    added: 0,
    removed: 0,
    changed: 0,
    total: 0,
  };

  for (const report of reports) {
    if (report.changed) {
      changedGroups++;
    }
    totalChanges += report.counts.total;
    countsOverall.added += report.counts.added;
    countsOverall.removed += report.counts.removed;
    countsOverall.changed += report.counts.changed;
    countsOverall.total += report.counts.total;
  }

  return {
    changedGroups,
    totalChanges,
    countsOverall,
  };
}

/**
 * Format value for compact display
 */
export function formatValuePreview(val: unknown): string {
  if (val === undefined) {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (typeof val === 'string') {
    // Truncate long strings
    if (val.length > 50) {
      return `"${val.slice(0, 47)}..."`;
    }
    return `"${val}"`;
  }
  if (typeof val === 'number' || typeof val === 'boolean') {
    return String(val);
  }
  if (Array.isArray(val)) {
    return `[array: ${val.length} items]`;
  }
  if (isPlainObject(val)) {
    const keys = Object.keys(val);
    return `{object: ${keys.length} keys}`;
  }
  return String(val);
}
