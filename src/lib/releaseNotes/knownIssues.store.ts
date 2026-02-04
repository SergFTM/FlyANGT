/**
 * Known Issues Store
 *
 * LocalStorage-based store for known issues.
 */

import { browser } from '$app/environment';
import { releaseNotesConfig } from '$config/release-notes.config';
import {
  type KnownIssue,
  validateIssue,
  touchIssue,
  sortIssuesBySeverity,
} from './knownIssues.model';

/**
 * Store state type
 */
interface KnownIssuesState {
  issues: KnownIssue[];
}

/**
 * Subscriber callback type
 */
type Subscriber = (state: KnownIssuesState) => void;

/**
 * Create known issues store
 */
function createKnownIssuesStore() {
  let state: KnownIssuesState = {
    issues: [],
  };

  const subscribers: Set<Subscriber> = new Set();

  /**
   * Notify all subscribers
   */
  function notify() {
    for (const subscriber of subscribers) {
      subscriber(state);
    }
  }

  /**
   * Load issues from localStorage
   */
  function load(): void {
    if (!browser) return;

    try {
      const stored = localStorage.getItem(releaseNotesConfig.storage.knownIssuesKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          state = { issues: sortIssuesBySeverity(parsed) };
          notify();
        }
      }
    } catch {
      // Ignore parse errors
    }
  }

  /**
   * Save issues to localStorage
   */
  function save(): void {
    if (!browser) return;

    try {
      localStorage.setItem(
        releaseNotesConfig.storage.knownIssuesKey,
        JSON.stringify(state.issues)
      );
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Subscribe to store changes
   */
  function subscribe(callback: Subscriber): () => void {
    subscribers.add(callback);
    callback(state);
    return () => subscribers.delete(callback);
  }

  /**
   * Add a new issue
   */
  function addIssue(issue: KnownIssue): boolean {
    const validation = validateIssue(issue);
    if (!validation.ok) {
      return false;
    }

    state = {
      issues: sortIssuesBySeverity([...state.issues, issue]),
    };
    save();
    notify();
    return true;
  }

  /**
   * Update an existing issue
   */
  function updateIssue(issue: KnownIssue): boolean {
    const validation = validateIssue(issue);
    if (!validation.ok) {
      return false;
    }

    const index = state.issues.findIndex(i => i.id === issue.id);
    if (index === -1) {
      return false;
    }

    const updated = touchIssue(issue);
    const newIssues = [...state.issues];
    newIssues[index] = updated;

    state = {
      issues: sortIssuesBySeverity(newIssues),
    };
    save();
    notify();
    return true;
  }

  /**
   * Delete an issue by id
   */
  function deleteIssue(id: string): boolean {
    const index = state.issues.findIndex(i => i.id === id);
    if (index === -1) {
      return false;
    }

    state = {
      issues: state.issues.filter(i => i.id !== id),
    };
    save();
    notify();
    return true;
  }

  /**
   * Reset all issues
   */
  function resetAll(): void {
    state = { issues: [] };
    save();
    notify();
  }

  /**
   * Get current issues
   */
  function getIssues(): KnownIssue[] {
    return [...state.issues];
  }

  /**
   * Reload from localStorage
   */
  function reload(): void {
    load();
  }

  // Initial load
  if (browser) {
    load();
  }

  return {
    subscribe,
    addIssue,
    updateIssue,
    deleteIssue,
    resetAll,
    getIssues,
    reload,
  };
}

/**
 * Known issues store singleton
 */
export const knownIssuesStore = createKnownIssuesStore();
