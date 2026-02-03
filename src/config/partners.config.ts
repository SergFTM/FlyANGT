/**
 * Partners Configuration
 *
 * Directory is config-driven for MVP.
 * Replace by DB later.
 *
 * Defines partner types, regions, services, and seed data.
 */

import type { TranslationKey } from './i18n.config';

/**
 * Partner type categories
 */
export type PartnerType =
  | 'dealer'
  | 'mro'
  | 'hangar'
  | 'flight_school'
  | 'marketing_pr'
  | 'payments'
  | 'crm_support'
  | 'market_making'
  | 'integrator';

/**
 * Partner regions
 */
export type PartnerRegion = 'cyprus' | 'eu' | 'mena' | 'global';

/**
 * Partner status
 */
export type PartnerStatus = 'planned' | 'active' | 'pilot';

/**
 * Service tags for filtering
 */
export type PartnerServiceTag =
  | 'sales'
  | 'build_assist'
  | 'maintenance'
  | 'hangar_storage'
  | 'training'
  | 'payments'
  | 'crm'
  | 'support'
  | 'liquidity'
  | 'compliance';

/**
 * Partner type configuration
 */
export interface PartnerTypeConfig {
  id: PartnerType;
  titleKey: TranslationKey;
  group: 'offline' | 'digital';
  order: number;
}

/**
 * Partner region configuration
 */
export interface PartnerRegionConfig {
  id: PartnerRegion;
  titleKey: TranslationKey;
  order: number;
}

/**
 * Service tag configuration
 */
export interface PartnerServiceTagConfig {
  id: PartnerServiceTag;
  titleKey: TranslationKey;
}

/**
 * Partner entity
 */
export interface Partner {
  id: string;
  slug: string;
  name: string;
  type: PartnerType;
  region: PartnerRegion;
  status: PartnerStatus;
  headlineKey: TranslationKey;
  descriptionKey: TranslationKey;
  services: PartnerServiceTag[];
  website?: string;
  contact?: {
    email?: string;
    telegram?: string;
  };
  highlightsKeys?: TranslationKey[];
}

/**
 * Partners module configuration
 */
export interface PartnersConfig {
  enabled: boolean;
  types: PartnerTypeConfig[];
  regions: PartnerRegionConfig[];
  serviceTags: PartnerServiceTagConfig[];
  partners: Partner[];
  persistence: {
    leadDraftKey: string;
  };
}

/**
 * Partner types configuration
 */
const partnerTypes: PartnerTypeConfig[] = [
  // Offline partners
  { id: 'dealer', titleKey: 'partner.type.dealer', group: 'offline', order: 1 },
  { id: 'mro', titleKey: 'partner.type.mro', group: 'offline', order: 2 },
  { id: 'hangar', titleKey: 'partner.type.hangar', group: 'offline', order: 3 },
  { id: 'flight_school', titleKey: 'partner.type.flight_school', group: 'offline', order: 4 },
  // Digital partners
  { id: 'marketing_pr', titleKey: 'partner.type.marketing_pr', group: 'digital', order: 5 },
  { id: 'payments', titleKey: 'partner.type.payments', group: 'digital', order: 6 },
  { id: 'crm_support', titleKey: 'partner.type.crm_support', group: 'digital', order: 7 },
  { id: 'market_making', titleKey: 'partner.type.market_making', group: 'digital', order: 8 },
  { id: 'integrator', titleKey: 'partner.type.integrator', group: 'digital', order: 9 },
];

/**
 * Partner regions configuration
 */
const partnerRegions: PartnerRegionConfig[] = [
  { id: 'cyprus', titleKey: 'partner.region.cyprus', order: 1 },
  { id: 'eu', titleKey: 'partner.region.eu', order: 2 },
  { id: 'mena', titleKey: 'partner.region.mena', order: 3 },
  { id: 'global', titleKey: 'partner.region.global', order: 4 },
];

/**
 * Service tags configuration
 */
const serviceTags: PartnerServiceTagConfig[] = [
  { id: 'sales', titleKey: 'partner.service.sales' },
  { id: 'build_assist', titleKey: 'partner.service.build_assist' },
  { id: 'maintenance', titleKey: 'partner.service.maintenance' },
  { id: 'hangar_storage', titleKey: 'partner.service.hangar_storage' },
  { id: 'training', titleKey: 'partner.service.training' },
  { id: 'payments', titleKey: 'partner.service.payments' },
  { id: 'crm', titleKey: 'partner.service.crm' },
  { id: 'support', titleKey: 'partner.service.support' },
  { id: 'liquidity', titleKey: 'partner.service.liquidity' },
  { id: 'compliance', titleKey: 'partner.service.compliance' },
];

/**
 * Seed partner data
 * Directory is config-driven for MVP. Replace by DB later.
 */
const partners: Partner[] = [
  // Offline partners - Dealers
  {
    id: 'p-001',
    slug: 'aero-cyprus-dealers',
    name: 'Aero Cyprus Dealers',
    type: 'dealer',
    region: 'cyprus',
    status: 'active',
    headlineKey: 'partner.aero_cyprus.headline',
    descriptionKey: 'partner.aero_cyprus.description',
    services: ['sales', 'build_assist', 'compliance'],
    website: 'https://example.com',
    contact: { email: 'info@example.com' },
    highlightsKeys: ['partner.aero_cyprus.highlight.1', 'partner.aero_cyprus.highlight.2'],
  },
  {
    id: 'p-002',
    slug: 'skybridge-eu',
    name: 'SkyBridge EU',
    type: 'dealer',
    region: 'eu',
    status: 'active',
    headlineKey: 'partner.skybridge.headline',
    descriptionKey: 'partner.skybridge.description',
    services: ['sales', 'build_assist'],
    website: 'https://example.com',
    highlightsKeys: ['partner.skybridge.highlight.1'],
  },
  {
    id: 'p-003',
    slug: 'gulf-aviation-sales',
    name: 'Gulf Aviation Sales',
    type: 'dealer',
    region: 'mena',
    status: 'pilot',
    headlineKey: 'partner.gulf_aviation.headline',
    descriptionKey: 'partner.gulf_aviation.description',
    services: ['sales', 'compliance'],
  },

  // Offline partners - MRO
  {
    id: 'p-004',
    slug: 'cyprus-aircraft-services',
    name: 'Cyprus Aircraft Services',
    type: 'mro',
    region: 'cyprus',
    status: 'active',
    headlineKey: 'partner.cyprus_aircraft.headline',
    descriptionKey: 'partner.cyprus_aircraft.description',
    services: ['maintenance', 'compliance'],
    contact: { email: 'service@example.com' },
    highlightsKeys: ['partner.cyprus_aircraft.highlight.1', 'partner.cyprus_aircraft.highlight.2'],
  },
  {
    id: 'p-005',
    slug: 'eurotech-mro',
    name: 'EuroTech MRO',
    type: 'mro',
    region: 'eu',
    status: 'pilot',
    headlineKey: 'partner.eurotech.headline',
    descriptionKey: 'partner.eurotech.description',
    services: ['maintenance', 'build_assist'],
  },

  // Offline partners - Hangars
  {
    id: 'p-006',
    slug: 'larnaca-hangar-solutions',
    name: 'Larnaca Hangar Solutions',
    type: 'hangar',
    region: 'cyprus',
    status: 'active',
    headlineKey: 'partner.larnaca_hangar.headline',
    descriptionKey: 'partner.larnaca_hangar.description',
    services: ['hangar_storage', 'maintenance'],
    highlightsKeys: ['partner.larnaca_hangar.highlight.1'],
  },
  {
    id: 'p-007',
    slug: 'dubai-sky-storage',
    name: 'Dubai Sky Storage',
    type: 'hangar',
    region: 'mena',
    status: 'planned',
    headlineKey: 'partner.dubai_storage.headline',
    descriptionKey: 'partner.dubai_storage.description',
    services: ['hangar_storage'],
  },

  // Offline partners - Flight Schools
  {
    id: 'p-008',
    slug: 'mediterranean-flight-academy',
    name: 'Mediterranean Flight Academy',
    type: 'flight_school',
    region: 'cyprus',
    status: 'active',
    headlineKey: 'partner.med_flight.headline',
    descriptionKey: 'partner.med_flight.description',
    services: ['training', 'compliance'],
    website: 'https://example.com',
    highlightsKeys: ['partner.med_flight.highlight.1', 'partner.med_flight.highlight.2'],
  },
  {
    id: 'p-009',
    slug: 'eu-pilot-training',
    name: 'EU Pilot Training Center',
    type: 'flight_school',
    region: 'eu',
    status: 'pilot',
    headlineKey: 'partner.eu_pilot.headline',
    descriptionKey: 'partner.eu_pilot.description',
    services: ['training'],
  },

  // Digital partners - Marketing
  {
    id: 'p-010',
    slug: 'aviation-media-global',
    name: 'Aviation Media Global',
    type: 'marketing_pr',
    region: 'global',
    status: 'active',
    headlineKey: 'partner.aviation_media.headline',
    descriptionKey: 'partner.aviation_media.description',
    services: ['support'],
    website: 'https://example.com',
  },

  // Digital partners - Payments
  {
    id: 'p-011',
    slug: 'flyfi-payments',
    name: 'FlyFi Payments',
    type: 'payments',
    region: 'global',
    status: 'pilot',
    headlineKey: 'partner.flyfi.headline',
    descriptionKey: 'partner.flyfi.description',
    services: ['payments', 'compliance'],
    highlightsKeys: ['partner.flyfi.highlight.1'],
  },

  // Digital partners - CRM/Support
  {
    id: 'p-012',
    slug: 'aerocrm-solutions',
    name: 'AeroCRM Solutions',
    type: 'crm_support',
    region: 'global',
    status: 'active',
    headlineKey: 'partner.aerocrm.headline',
    descriptionKey: 'partner.aerocrm.description',
    services: ['crm', 'support'],
    website: 'https://example.com',
  },

  // Digital partners - Market Making
  {
    id: 'p-013',
    slug: 'liquidity-partners',
    name: 'Liquidity Partners',
    type: 'market_making',
    region: 'global',
    status: 'planned',
    headlineKey: 'partner.liquidity.headline',
    descriptionKey: 'partner.liquidity.description',
    services: ['liquidity', 'compliance'],
  },

  // Digital partners - Integrators
  {
    id: 'p-014',
    slug: 'skyconnect-integrations',
    name: 'SkyConnect Integrations',
    type: 'integrator',
    region: 'eu',
    status: 'active',
    headlineKey: 'partner.skyconnect.headline',
    descriptionKey: 'partner.skyconnect.description',
    services: ['support', 'compliance'],
    contact: { telegram: '@skyconnect' },
  },
  {
    id: 'p-015',
    slug: 'mena-aviation-tech',
    name: 'MENA Aviation Tech',
    type: 'integrator',
    region: 'mena',
    status: 'pilot',
    headlineKey: 'partner.mena_tech.headline',
    descriptionKey: 'partner.mena_tech.description',
    services: ['support', 'crm'],
  },
];

/**
 * Main partners configuration
 */
export const partnersConfig: PartnersConfig = {
  enabled: true,
  types: partnerTypes,
  regions: partnerRegions,
  serviceTags: serviceTags,
  partners: partners,
  persistence: {
    leadDraftKey: 'flyangt_partner_lead_draft',
  },
};

// ============================================================================
// Helper functions
// ============================================================================

/**
 * Get all partners
 */
export function getPartners(): Partner[] {
  return partnersConfig.partners;
}

/**
 * Get partner by slug
 */
export function getPartnerBySlug(slug: string): Partner | undefined {
  return partnersConfig.partners.find(p => p.slug === slug);
}

/**
 * Get partner by ID
 */
export function getPartnerById(id: string): Partner | undefined {
  return partnersConfig.partners.find(p => p.id === id);
}

/**
 * Get partners by type
 */
export function getPartnersByType(type: PartnerType): Partner[] {
  return partnersConfig.partners.filter(p => p.type === type);
}

/**
 * Get partners by region
 */
export function getPartnersByRegion(region: PartnerRegion): Partner[] {
  return partnersConfig.partners.filter(p => p.region === region);
}

/**
 * Get partners by status
 */
export function getPartnersByStatus(status: PartnerStatus): Partner[] {
  return partnersConfig.partners.filter(p => p.status === status);
}

/**
 * Get partner types sorted by order
 */
export function getPartnerTypes(): PartnerTypeConfig[] {
  return [...partnersConfig.types].sort((a, b) => a.order - b.order);
}

/**
 * Get partner types by group
 */
export function getPartnerTypesByGroup(group: 'offline' | 'digital'): PartnerTypeConfig[] {
  return partnersConfig.types
    .filter(t => t.group === group)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get partner regions sorted by order
 */
export function getPartnerRegions(): PartnerRegionConfig[] {
  return [...partnersConfig.regions].sort((a, b) => a.order - b.order);
}

/**
 * Get service tags
 */
export function getServiceTags(): PartnerServiceTagConfig[] {
  return partnersConfig.serviceTags;
}

/**
 * Get partner type config by ID
 */
export function getPartnerTypeById(id: PartnerType): PartnerTypeConfig | undefined {
  return partnersConfig.types.find(t => t.id === id);
}

/**
 * Get partner region config by ID
 */
export function getPartnerRegionById(id: PartnerRegion): PartnerRegionConfig | undefined {
  return partnersConfig.regions.find(r => r.id === id);
}

/**
 * Get service tag config by ID
 */
export function getServiceTagById(id: PartnerServiceTag): PartnerServiceTagConfig | undefined {
  return partnersConfig.serviceTags.find(s => s.id === id);
}

/**
 * Get lead draft storage key
 */
export function getLeadDraftKey(): string {
  return partnersConfig.persistence.leadDraftKey;
}
