/**
 * Presale Configuration
 *
 * 10-week price ladder and calculator settings.
 *
 * All numbers are illustrative for MVP.
 * Later will be driven by backend + on-chain sale.
 */

import type { TranslationKey } from './i18n.config';

// Week status
export type PresaleWeekStatus = 'upcoming' | 'active' | 'completed';

// Single week in the ladder
export interface PresaleWeek {
  week: number;
  labelKey: TranslationKey;
  priceUsd: number;
  bonusKey?: TranslationKey;
  status: PresaleWeekStatus;
}

// Calculator configuration
export interface PresaleCalculatorConfig {
  mode: 'estimate';
  showListingComparison: boolean;
  assumedListingPriceUsd?: number;
}

// Links configuration
export interface PresaleLinksConfig {
  trustCenterPath: string;
  docsSlug?: string;
}

// Main presale configuration
export interface PresaleConfig {
  enabled: boolean;
  totalWeeks: 10;
  currency: 'USD';
  minCommitUsd: number;
  maxCommitUsd?: number;
  expectedListingWeek: number;
  weeks: PresaleWeek[];
  calculator: PresaleCalculatorConfig;
  links: PresaleLinksConfig;
}

// Week 10 price for reference
const week10Price = 0.50;

// Assumed listing price (20% above week 10)
const assumedListingPrice = week10Price * 1.2;

/**
 * Presale configuration
 *
 * All numbers are illustrative for MVP.
 * Later will be driven by backend + on-chain sale.
 */
export const presaleConfig: PresaleConfig = {
  enabled: true,
  totalWeeks: 10,
  currency: 'USD',
  minCommitUsd: 100,
  maxCommitUsd: 50000,
  expectedListingWeek: 12,
  weeks: [
    {
      week: 1,
      labelKey: 'presale.week.1',
      priceUsd: 0.10,
      bonusKey: 'presale.bonus.early',
      status: 'completed',
    },
    {
      week: 2,
      labelKey: 'presale.week.2',
      priceUsd: 0.12,
      bonusKey: 'presale.bonus.early',
      status: 'completed',
    },
    {
      week: 3,
      labelKey: 'presale.week.3',
      priceUsd: 0.15,
      status: 'completed',
    },
    {
      week: 4,
      labelKey: 'presale.week.4',
      priceUsd: 0.18,
      status: 'completed',
    },
    {
      week: 5,
      labelKey: 'presale.week.5',
      priceUsd: 0.22,
      status: 'active',
    },
    {
      week: 6,
      labelKey: 'presale.week.6',
      priceUsd: 0.28,
      status: 'upcoming',
    },
    {
      week: 7,
      labelKey: 'presale.week.7',
      priceUsd: 0.34,
      status: 'upcoming',
    },
    {
      week: 8,
      labelKey: 'presale.week.8',
      priceUsd: 0.40,
      status: 'upcoming',
    },
    {
      week: 9,
      labelKey: 'presale.week.9',
      priceUsd: 0.45,
      status: 'upcoming',
    },
    {
      week: 10,
      labelKey: 'presale.week.10',
      priceUsd: week10Price,
      status: 'upcoming',
    },
  ],
  calculator: {
    mode: 'estimate',
    showListingComparison: true,
    assumedListingPriceUsd: assumedListingPrice,
  },
  links: {
    trustCenterPath: '/trust',
    docsSlug: 'terms-of-service',
  },
};

/**
 * Get active week
 */
export function getActiveWeek(): PresaleWeek | undefined {
  return presaleConfig.weeks.find(w => w.status === 'active');
}

/**
 * Get weeks by status
 */
export function getWeeksByStatus(status: PresaleWeekStatus): PresaleWeek[] {
  return presaleConfig.weeks.filter(w => w.status === status);
}

/**
 * Calculate estimated tokens for a given USD amount
 */
export function calculateEstimatedTokens(amountUsd: number): number {
  const activeWeek = getActiveWeek();
  if (!activeWeek || amountUsd <= 0) return 0;
  return amountUsd / activeWeek.priceUsd;
}

/**
 * Calculate estimated value at listing
 */
export function calculateListingValue(tokens: number): number {
  const { assumedListingPriceUsd } = presaleConfig.calculator;
  if (!assumedListingPriceUsd || tokens <= 0) return 0;
  return tokens * assumedListingPriceUsd;
}
