/**
 * Post Release Store
 *
 * LocalStorage-based store for post-release reports.
 */

import { browser } from '$app/environment';
import { postReleaseConfig } from '$config/post-release.config';
import type {
  PostReleaseReport,
  SavedReportRef,
  PostReleaseStoreState,
} from './types';
import { extractReportRef } from './types';

/**
 * Subscriber callback type
 */
type Subscriber = (state: PostReleaseStoreState) => void;

/**
 * Create post-release store
 */
function createPostReleaseStore() {
  let state: PostReleaseStoreState = {
    reports: [],
    selectedReportId: null,
    currentReport: null,
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
   * Load reports list from localStorage
   */
  function loadReportsList(): void {
    if (!browser) return;

    try {
      const stored = localStorage.getItem(postReleaseConfig.storage.reportsKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          state = { ...state, reports: parsed };
        }
      }
    } catch {
      // Ignore parse errors
    }
  }

  /**
   * Save reports list to localStorage
   */
  function saveReportsList(): void {
    if (!browser) return;

    try {
      localStorage.setItem(
        postReleaseConfig.storage.reportsKey,
        JSON.stringify(state.reports)
      );
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Load selected report ID from localStorage
   */
  function loadSelectedReportId(): void {
    if (!browser) return;

    try {
      const stored = localStorage.getItem(postReleaseConfig.storage.selectedReportKey);
      if (stored) {
        state = { ...state, selectedReportId: stored };
      }
    } catch {
      // Ignore errors
    }
  }

  /**
   * Save selected report ID to localStorage
   */
  function saveSelectedReportId(): void {
    if (!browser) return;

    try {
      if (state.selectedReportId) {
        localStorage.setItem(
          postReleaseConfig.storage.selectedReportKey,
          state.selectedReportId
        );
      } else {
        localStorage.removeItem(postReleaseConfig.storage.selectedReportKey);
      }
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Get report storage key
   */
  function getReportKey(id: string): string {
    return `flyangt_post_release_report_${id}`;
  }

  /**
   * Load full report from localStorage
   */
  function loadReport(id: string): PostReleaseReport | null {
    if (!browser) return null;

    try {
      const stored = localStorage.getItem(getReportKey(id));
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore parse errors
    }
    return null;
  }

  /**
   * Save full report to localStorage
   */
  function saveReport(report: PostReleaseReport): void {
    if (!browser) return;

    try {
      localStorage.setItem(getReportKey(report.id), JSON.stringify(report));
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Delete report from localStorage
   */
  function deleteReportStorage(id: string): void {
    if (!browser) return;

    try {
      localStorage.removeItem(getReportKey(id));
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
   * Create and save a new report
   */
  function createReport(report: PostReleaseReport): boolean {
    // Save full report
    saveReport(report);

    // Add to reports list
    const ref = extractReportRef(report);
    state = {
      ...state,
      reports: [...state.reports, ref],
      selectedReportId: report.id,
      currentReport: report,
    };

    saveReportsList();
    saveSelectedReportId();
    notify();
    return true;
  }

  /**
   * Update an existing report
   */
  function updateReport(report: PostReleaseReport): boolean {
    const index = state.reports.findIndex(r => r.id === report.id);
    if (index === -1) {
      return false;
    }

    // Update timestamps
    const updated: PostReleaseReport = {
      ...report,
      updatedAt: new Date().toISOString(),
    };

    // Save full report
    saveReport(updated);

    // Update reports list
    const ref = extractReportRef(updated);
    const newReports = [...state.reports];
    newReports[index] = ref;

    state = {
      ...state,
      reports: newReports,
      currentReport: state.selectedReportId === report.id ? updated : state.currentReport,
    };

    saveReportsList();
    notify();
    return true;
  }

  /**
   * Select a report
   */
  function selectReport(id: string | null): boolean {
    if (id === null) {
      state = {
        ...state,
        selectedReportId: null,
        currentReport: null,
      };
      saveSelectedReportId();
      notify();
      return true;
    }

    const ref = state.reports.find(r => r.id === id);
    if (!ref) {
      return false;
    }

    const report = loadReport(id);
    state = {
      ...state,
      selectedReportId: id,
      currentReport: report,
    };

    saveSelectedReportId();
    notify();
    return true;
  }

  /**
   * Delete a report
   */
  function deleteReport(id: string): boolean {
    const index = state.reports.findIndex(r => r.id === id);
    if (index === -1) {
      return false;
    }

    // Delete storage
    deleteReportStorage(id);

    // Update state
    const newReports = state.reports.filter(r => r.id !== id);
    const newSelectedId = state.selectedReportId === id ? null : state.selectedReportId;
    const newCurrentReport = state.selectedReportId === id ? null : state.currentReport;

    state = {
      ...state,
      reports: newReports,
      selectedReportId: newSelectedId,
      currentReport: newCurrentReport,
    };

    saveReportsList();
    saveSelectedReportId();
    notify();
    return true;
  }

  /**
   * Get current report
   */
  function getCurrentReport(): PostReleaseReport | null {
    return state.currentReport;
  }

  /**
   * Get reports list
   */
  function getReports(): SavedReportRef[] {
    return [...state.reports];
  }

  /**
   * Reload from localStorage
   */
  function reload(): void {
    loadReportsList();
    loadSelectedReportId();

    if (state.selectedReportId) {
      const report = loadReport(state.selectedReportId);
      state = { ...state, currentReport: report };
    }

    notify();
  }

  /**
   * Reset all reports
   */
  function resetAll(): void {
    // Delete all report storage
    for (const report of state.reports) {
      deleteReportStorage(report.id);
    }

    state = {
      reports: [],
      selectedReportId: null,
      currentReport: null,
    };

    saveReportsList();
    saveSelectedReportId();
    notify();
  }

  // Initial load
  if (browser) {
    loadReportsList();
    loadSelectedReportId();

    if (state.selectedReportId) {
      const report = loadReport(state.selectedReportId);
      state = { ...state, currentReport: report };
    }
  }

  return {
    subscribe,
    createReport,
    updateReport,
    selectReport,
    deleteReport,
    getCurrentReport,
    getReports,
    reload,
    resetAll,
  };
}

/**
 * Post-release store singleton
 */
export const postReleaseStore = createPostReleaseStore();
