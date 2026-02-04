/**
 * Release Notes Types
 *
 * Structured document types for release notes.
 */

import type { KnownIssue } from './knownIssues.model';

/**
 * Output language
 */
export type ReleaseNotesLanguage = 'en' | 'ru';

/**
 * Gate status
 */
export type GateStatus = 'green' | 'yellow' | 'red';

/**
 * P0 summary data
 */
export interface P0Summary {
  total: number;
  done: number;
  open: number;
  blocked?: number;
  fail?: number;
}

/**
 * Readiness section data
 */
export interface ReadinessSummary {
  status: GateStatus;
  releaseP0: P0Summary;
  smokeP0: P0Summary;
  i18nMissing?: number;
}

/**
 * Quality section data
 */
export interface QualitySummary {
  releaseOverallPct: number;
  smokeOverallPct: number;
  releaseP0Open: number;
  smokeP0Open: number;
}

/**
 * Link item
 */
export interface ReleaseNotesLink {
  title: string;
  href: string;
}

/**
 * Meta section data
 */
export interface ReleaseNotesMeta {
  generatedAt: string;
  fromRc: string;
  toRc: string;
  language: ReleaseNotesLanguage;
}

/**
 * Complete release notes document
 */
export interface ReleaseNotesDoc {
  meta: ReleaseNotesMeta;
  readiness: ReadinessSummary;
  quality: QualitySummary;
  highlights: string[];
  changelogMd: string;
  knownIssues: KnownIssue[];
  links: ReleaseNotesLink[];
  nextSteps: string[];
}
