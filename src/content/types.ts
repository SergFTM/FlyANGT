/**
 * Content Types
 *
 * Shared type definitions for page content.
 */

import type { Locale } from '$config/i18n.config';

export interface HeroContent {
  h1: string;
  h2?: string;
  trustLine?: string;
  primaryCta?: string;
  secondaryCta?: string;
  microText?: string;
}

export interface SectionContent {
  id: string;
  title: string;
  text: string;
  bullets?: string[];
}

export interface FinalCtaContent {
  title: string;
  text: string;
  button: string;
}

export interface PageContent {
  hero: HeroContent;
  sections: SectionContent[];
  finalCta: FinalCtaContent;
}

export type LocalizedContent<T> = Record<Locale, T>;
