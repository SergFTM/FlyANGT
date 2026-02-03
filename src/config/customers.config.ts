/**
 * Customers Configuration
 *
 * Section ordering and content structure for customer landing page.
 * MVP content-driven, no document delivery.
 * Will be connected to CRM and workflows later.
 */

import type { TranslationKey } from './i18n.config';

/**
 * Customer section identifiers
 */
export type CustomerSectionId =
  | 'what_you_get'
  | 'why_owner_assisted'
  | 'journey'
  | 'service'
  | 'training'
  | 'ownership'
  | 'digital_cabinet'
  | 'cta'
  | 'request_docs';

/**
 * Section display variants
 */
export type CustomerSectionVariant = 'default' | 'steps' | 'cards';

/**
 * Section configuration
 */
export interface CustomerSection {
  id: CustomerSectionId;
  titleKey: TranslationKey;
  textKey: TranslationKey;
  bulletsKeys?: TranslationKey[];
  variant?: CustomerSectionVariant;
}

/**
 * Customers module configuration
 */
export interface CustomersConfig {
  enabled: boolean;
  sections: CustomerSection[];
  links: {
    trustPath: string;
    workflowPath: string;
    partnersPath: string;
    configuratorPath: string;
  };
  persistence: {
    docsRequestDraftKey: string;
  };
}

/**
 * Customer sections in narrative order
 */
const customerSections: CustomerSection[] = [
  {
    id: 'what_you_get',
    titleKey: 'customers.section.what_you_get.title',
    textKey: 'customers.section.what_you_get.text',
    bulletsKeys: [
      'customers.section.what_you_get.bullet.1',
      'customers.section.what_you_get.bullet.2',
      'customers.section.what_you_get.bullet.3',
      'customers.section.what_you_get.bullet.4',
      'customers.section.what_you_get.bullet.5',
    ],
    variant: 'default',
  },
  {
    id: 'why_owner_assisted',
    titleKey: 'customers.section.why_owner_assisted.title',
    textKey: 'customers.section.why_owner_assisted.text',
    bulletsKeys: [
      'customers.section.why_owner_assisted.bullet.1',
      'customers.section.why_owner_assisted.bullet.2',
      'customers.section.why_owner_assisted.bullet.3',
    ],
    variant: 'default',
  },
  {
    id: 'journey',
    titleKey: 'customers.section.journey.title',
    textKey: 'customers.section.journey.text',
    variant: 'steps',
  },
  {
    id: 'ownership',
    titleKey: 'customers.section.ownership.title',
    textKey: 'customers.section.ownership.text',
    variant: 'cards',
  },
  {
    id: 'service',
    titleKey: 'customers.section.service.title',
    textKey: 'customers.section.service.text',
    bulletsKeys: [
      'customers.section.service.bullet.1',
      'customers.section.service.bullet.2',
      'customers.section.service.bullet.3',
      'customers.section.service.bullet.4',
      'customers.section.service.bullet.5',
    ],
    variant: 'default',
  },
  {
    id: 'training',
    titleKey: 'customers.section.training.title',
    textKey: 'customers.section.training.text',
    bulletsKeys: [
      'customers.section.training.bullet.1',
      'customers.section.training.bullet.2',
      'customers.section.training.bullet.3',
      'customers.section.training.bullet.4',
    ],
    variant: 'default',
  },
  {
    id: 'digital_cabinet',
    titleKey: 'customers.section.digital_cabinet.title',
    textKey: 'customers.section.digital_cabinet.text',
    bulletsKeys: [
      'customers.section.digital_cabinet.bullet.1',
      'customers.section.digital_cabinet.bullet.2',
      'customers.section.digital_cabinet.bullet.3',
      'customers.section.digital_cabinet.bullet.4',
    ],
    variant: 'default',
  },
  {
    id: 'request_docs',
    titleKey: 'customers.section.request_docs.title',
    textKey: 'customers.section.request_docs.text',
    variant: 'default',
  },
  {
    id: 'cta',
    titleKey: 'customers.section.cta.title',
    textKey: 'customers.section.cta.text',
    variant: 'default',
  },
];

/**
 * Main customers configuration
 */
export const customersConfig: CustomersConfig = {
  enabled: true,
  sections: customerSections,
  links: {
    trustPath: '/trust',
    workflowPath: '/workflow',
    partnersPath: '/partners',
    configuratorPath: '/configurator',
  },
  persistence: {
    docsRequestDraftKey: 'flyangt_customer_docs_request_draft',
  },
};

// ============================================================================
// Helper functions
// ============================================================================

/**
 * Get all customer sections
 */
export function getCustomerSections(): CustomerSection[] {
  return customersConfig.sections;
}

/**
 * Get customer section by ID
 */
export function getCustomerSectionById(id: CustomerSectionId): CustomerSection | undefined {
  return customersConfig.sections.find(s => s.id === id);
}

/**
 * Get customer links
 */
export function getCustomerLinks(): CustomersConfig['links'] {
  return customersConfig.links;
}

/**
 * Get docs request draft storage key
 */
export function getDocsRequestDraftKey(): string {
  return customersConfig.persistence.docsRequestDraftKey;
}
