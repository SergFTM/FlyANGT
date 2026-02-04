/**
 * Known Issues Model
 *
 * Types and utilities for known issues management.
 */

/**
 * Severity levels for known issues
 */
export type KnownIssueSeverity = 'low' | 'medium' | 'high';

/**
 * Known issue record
 */
export interface KnownIssue {
  id: string;
  title: string;
  severity: KnownIssueSeverity;
  owner?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
  ok: boolean;
  errors: Record<string, string>;
}

/**
 * Generate unique ID for an issue
 */
function generateId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `issue-${timestamp}-${random}`;
}

/**
 * Create a new issue with defaults
 */
export function newIssue(): KnownIssue {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    title: '',
    severity: 'medium',
    owner: '',
    notes: '',
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Validate an issue
 */
export function validateIssue(issue: KnownIssue): ValidationResult {
  const errors: Record<string, string> = {};

  if (!issue.title || issue.title.trim() === '') {
    errors.title = 'Title is required';
  }

  if (!issue.id || issue.id.trim() === '') {
    errors.id = 'ID is required';
  }

  if (!['low', 'medium', 'high'].includes(issue.severity)) {
    errors.severity = 'Invalid severity';
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Trim issues array to max limit (removes oldest first)
 */
export function trimIssues(issues: KnownIssue[], max: number): KnownIssue[] {
  if (issues.length <= max) {
    return issues;
  }
  // Sort by createdAt desc, keep newest
  const sorted = [...issues].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return sorted.slice(0, max);
}

/**
 * Update issue timestamps
 */
export function touchIssue(issue: KnownIssue): KnownIssue {
  return {
    ...issue,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Get severity order for sorting (high first)
 */
export function getSeverityOrder(severity: KnownIssueSeverity): number {
  switch (severity) {
    case 'high':
      return 0;
    case 'medium':
      return 1;
    case 'low':
      return 2;
    default:
      return 3;
  }
}

/**
 * Sort issues by severity (high first) then by date
 */
export function sortIssuesBySeverity(issues: KnownIssue[]): KnownIssue[] {
  return [...issues].sort((a, b) => {
    const severityDiff = getSeverityOrder(a.severity) - getSeverityOrder(b.severity);
    if (severityDiff !== 0) return severityDiff;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
