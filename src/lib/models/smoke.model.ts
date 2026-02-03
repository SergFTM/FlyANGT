/**
 * Smoke Test Model
 *
 * Types and utilities for smoke test state management.
 */

import type {
  SmokeResult,
  SmokeResultStatus,
  SmokeTest,
  SmokeGroup,
} from '$config/smoke.config';

/**
 * Smoke test state (stored in localStorage)
 */
export interface SmokeState {
  results: Record<string, SmokeResult>;
  lastUpdated: string | null;
}

/**
 * Create default smoke result
 */
export function createDefaultResult(testId: string): SmokeResult {
  return {
    testId,
    status: 'untested',
    notes: '',
    testedAt: null,
  };
}

/**
 * Create default smoke state
 */
export function createDefaultState(): SmokeState {
  return {
    results: {},
    lastUpdated: null,
  };
}

/**
 * Get result for a test, creating default if not exists
 */
export function getResult(state: SmokeState, testId: string): SmokeResult {
  return state.results[testId] ?? createDefaultResult(testId);
}

/**
 * Update a test result
 */
export function updateResult(
  state: SmokeState,
  testId: string,
  status: SmokeResultStatus,
  notes?: string
): SmokeState {
  const now = new Date().toISOString();
  const existing = state.results[testId];

  return {
    results: {
      ...state.results,
      [testId]: {
        testId,
        status,
        notes: notes ?? existing?.notes ?? '',
        testedAt: now,
      },
    },
    lastUpdated: now,
  };
}

/**
 * Update notes for a test
 */
export function updateNotes(state: SmokeState, testId: string, notes: string): SmokeState {
  const existing = state.results[testId] ?? createDefaultResult(testId);

  return {
    results: {
      ...state.results,
      [testId]: {
        ...existing,
        notes,
      },
    },
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Reset a single test result
 */
export function resetResult(state: SmokeState, testId: string): SmokeState {
  const { [testId]: _, ...remaining } = state.results;

  return {
    results: remaining,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Reset all results
 */
export function resetAllResults(): SmokeState {
  return createDefaultState();
}

/**
 * Smoke summary statistics
 */
export interface SmokeSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  untested: number;
  passRate: number;
}

/**
 * Calculate summary statistics for tests
 */
export function calculateSummary(tests: SmokeTest[], state: SmokeState): SmokeSummary {
  const total = tests.length;
  let passed = 0;
  let failed = 0;
  let skipped = 0;

  for (const test of tests) {
    const result = state.results[test.id];
    if (result) {
      switch (result.status) {
        case 'pass':
          passed++;
          break;
        case 'fail':
          failed++;
          break;
        case 'skip':
          skipped++;
          break;
      }
    }
  }

  const untested = total - passed - failed - skipped;
  const testedCount = passed + failed;
  const passRate = testedCount > 0 ? Math.round((passed / testedCount) * 100) : 0;

  return {
    total,
    passed,
    failed,
    skipped,
    untested,
    passRate,
  };
}

/**
 * Group summary with tests
 */
export interface GroupWithTests {
  group: SmokeGroup;
  tests: SmokeTest[];
  summary: SmokeSummary;
}

/**
 * Build grouped test structure with summaries
 */
export function buildGroupedTests(
  groups: SmokeGroup[],
  tests: SmokeTest[],
  state: SmokeState
): GroupWithTests[] {
  return groups
    .map(group => {
      const groupTests = tests.filter(t => t.groupId === group.id);
      const summary = calculateSummary(groupTests, state);

      return {
        group,
        tests: groupTests,
        summary,
      };
    })
    .filter(g => g.tests.length > 0)
    .sort((a, b) => a.group.order - b.group.order);
}

/**
 * Export data structure
 */
export interface SmokeExportData {
  generatedAt: string;
  summary: SmokeSummary;
  groups: {
    id: string;
    title: string;
    summary: SmokeSummary;
    tests: {
      id: string;
      path: string;
      status: SmokeResultStatus;
      notes: string;
      testedAt: string | null;
    }[];
  }[];
}

/**
 * Build export data structure
 */
export function buildExportData(
  groups: SmokeGroup[],
  tests: SmokeTest[],
  state: SmokeState,
  getGroupTitle: (groupId: string) => string
): SmokeExportData {
  const groupedTests = buildGroupedTests(groups, tests, state);
  const overallSummary = calculateSummary(tests, state);

  return {
    generatedAt: new Date().toISOString(),
    summary: overallSummary,
    groups: groupedTests.map(({ group, tests: groupTests, summary }) => ({
      id: group.id,
      title: getGroupTitle(group.id),
      summary,
      tests: groupTests.map(test => {
        const result = getResult(state, test.id);
        return {
          id: test.id,
          path: test.samplePath ?? test.path,
          status: result.status,
          notes: result.notes,
          testedAt: result.testedAt,
        };
      }),
    })),
  };
}
