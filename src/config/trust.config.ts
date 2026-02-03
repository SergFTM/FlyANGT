/**
 * Trust Center Configuration
 *
 * Document types, categories, and seed data for the Trust Center.
 * All labels use TranslationKey for i18n support.
 */

import type { TranslationKey } from './i18n.config';

// Document categories
export type TrustDocCategory =
  | 'legal'
  | 'manuals'
  | 'maintenance'
  | 'sales'
  | 'quality'
  | 'forms'
  | 'policies';

// Document file types
export type TrustDocType = 'pdf' | 'docx' | 'link';

// Trust document interface
export interface TrustDoc {
  id: string;
  slug: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  category: TrustDocCategory;
  docType: TrustDocType;
  fileUrl: string | null;
  externalUrl: string | null;
  version: string;
  lastUpdated: string; // ISO date string
  isPublic: boolean;
  order: number;
}

// Category configuration
export interface TrustCategoryConfig {
  id: TrustDocCategory;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  order: number;
}

// Trust categories
export const trustCategories: TrustCategoryConfig[] = [
  {
    id: 'legal',
    titleKey: 'trust.category.legal',
    descriptionKey: 'trust.category.legal.desc',
    order: 1,
  },
  {
    id: 'manuals',
    titleKey: 'trust.category.manuals',
    descriptionKey: 'trust.category.manuals.desc',
    order: 2,
  },
  {
    id: 'maintenance',
    titleKey: 'trust.category.maintenance',
    descriptionKey: 'trust.category.maintenance.desc',
    order: 3,
  },
  {
    id: 'sales',
    titleKey: 'trust.category.sales',
    descriptionKey: 'trust.category.sales.desc',
    order: 4,
  },
  {
    id: 'quality',
    titleKey: 'trust.category.quality',
    descriptionKey: 'trust.category.quality.desc',
    order: 5,
  },
  {
    id: 'forms',
    titleKey: 'trust.category.forms',
    descriptionKey: 'trust.category.forms.desc',
    order: 6,
  },
  {
    id: 'policies',
    titleKey: 'trust.category.policies',
    descriptionKey: 'trust.category.policies.desc',
    order: 7,
  },
];

// Seed documents (10-14 items)
export const trustDocs: TrustDoc[] = [
  {
    id: 'doc-001',
    slug: 'terms-of-service',
    titleKey: 'trust.doc.terms.title',
    descriptionKey: 'trust.doc.terms.desc',
    category: 'legal',
    docType: 'pdf',
    fileUrl: '/docs/terms-of-service.pdf',
    externalUrl: null,
    version: '2.1',
    lastUpdated: '2024-12-01',
    isPublic: true,
    order: 1,
  },
  {
    id: 'doc-002',
    slug: 'privacy-policy',
    titleKey: 'trust.doc.privacy.title',
    descriptionKey: 'trust.doc.privacy.desc',
    category: 'legal',
    docType: 'pdf',
    fileUrl: '/docs/privacy-policy.pdf',
    externalUrl: null,
    version: '1.5',
    lastUpdated: '2024-11-15',
    isPublic: true,
    order: 2,
  },
  {
    id: 'doc-003',
    slug: 'platform-user-manual',
    titleKey: 'trust.doc.platform-manual.title',
    descriptionKey: 'trust.doc.platform-manual.desc',
    category: 'manuals',
    docType: 'pdf',
    fileUrl: '/docs/platform-user-manual.pdf',
    externalUrl: null,
    version: '3.0',
    lastUpdated: '2024-12-10',
    isPublic: true,
    order: 3,
  },
  {
    id: 'doc-004',
    slug: 'aircraft-maintenance-guide',
    titleKey: 'trust.doc.maintenance-guide.title',
    descriptionKey: 'trust.doc.maintenance-guide.desc',
    category: 'maintenance',
    docType: 'pdf',
    fileUrl: '/docs/maintenance-guide.pdf',
    externalUrl: null,
    version: '4.2',
    lastUpdated: '2024-10-20',
    isPublic: false,
    order: 4,
  },
  {
    id: 'doc-005',
    slug: 'partner-sales-kit',
    titleKey: 'trust.doc.sales-kit.title',
    descriptionKey: 'trust.doc.sales-kit.desc',
    category: 'sales',
    docType: 'docx',
    fileUrl: '/docs/partner-sales-kit.docx',
    externalUrl: null,
    version: '2.0',
    lastUpdated: '2024-11-01',
    isPublic: false,
    order: 5,
  },
  {
    id: 'doc-006',
    slug: 'quality-assurance-standards',
    titleKey: 'trust.doc.qa-standards.title',
    descriptionKey: 'trust.doc.qa-standards.desc',
    category: 'quality',
    docType: 'pdf',
    fileUrl: '/docs/qa-standards.pdf',
    externalUrl: null,
    version: '1.3',
    lastUpdated: '2024-09-15',
    isPublic: true,
    order: 6,
  },
  {
    id: 'doc-007',
    slug: 'partner-application-form',
    titleKey: 'trust.doc.partner-form.title',
    descriptionKey: 'trust.doc.partner-form.desc',
    category: 'forms',
    docType: 'docx',
    fileUrl: '/docs/partner-application.docx',
    externalUrl: null,
    version: '1.0',
    lastUpdated: '2024-08-01',
    isPublic: true,
    order: 7,
  },
  {
    id: 'doc-008',
    slug: 'data-retention-policy',
    titleKey: 'trust.doc.data-retention.title',
    descriptionKey: 'trust.doc.data-retention.desc',
    category: 'policies',
    docType: 'pdf',
    fileUrl: '/docs/data-retention-policy.pdf',
    externalUrl: null,
    version: '1.1',
    lastUpdated: '2024-10-05',
    isPublic: true,
    order: 8,
  },
  {
    id: 'doc-009',
    slug: 'flight-operations-manual',
    titleKey: 'trust.doc.flight-ops.title',
    descriptionKey: 'trust.doc.flight-ops.desc',
    category: 'manuals',
    docType: 'pdf',
    fileUrl: '/docs/flight-operations-manual.pdf',
    externalUrl: null,
    version: '5.0',
    lastUpdated: '2024-12-05',
    isPublic: false,
    order: 9,
  },
  {
    id: 'doc-010',
    slug: 'regulatory-compliance',
    titleKey: 'trust.doc.compliance.title',
    descriptionKey: 'trust.doc.compliance.desc',
    category: 'legal',
    docType: 'link',
    fileUrl: null,
    externalUrl: 'https://example.com/compliance',
    version: '1.0',
    lastUpdated: '2024-11-20',
    isPublic: true,
    order: 10,
  },
  {
    id: 'doc-011',
    slug: 'investor-presentation',
    titleKey: 'trust.doc.investor-deck.title',
    descriptionKey: 'trust.doc.investor-deck.desc',
    category: 'sales',
    docType: 'pdf',
    fileUrl: '/docs/investor-presentation.pdf',
    externalUrl: null,
    version: '3.1',
    lastUpdated: '2024-12-01',
    isPublic: false,
    order: 11,
  },
  {
    id: 'doc-012',
    slug: 'security-policy',
    titleKey: 'trust.doc.security.title',
    descriptionKey: 'trust.doc.security.desc',
    category: 'policies',
    docType: 'pdf',
    fileUrl: '/docs/security-policy.pdf',
    externalUrl: null,
    version: '2.0',
    lastUpdated: '2024-11-10',
    isPublic: true,
    order: 12,
  },
  {
    id: 'doc-013',
    slug: 'whitepaper',
    titleKey: 'trust.doc.whitepaper.title',
    descriptionKey: 'trust.doc.whitepaper.desc',
    category: 'legal',
    docType: 'pdf',
    fileUrl: '/docs/whitepaper.pdf',
    externalUrl: null,
    version: '1.0',
    lastUpdated: '2024-12-15',
    isPublic: true,
    order: 13,
  },
];

// Helper function to get documents by category
export function getDocsByCategory(category: TrustDocCategory): TrustDoc[] {
  return trustDocs
    .filter(doc => doc.category === category)
    .sort((a, b) => a.order - b.order);
}

// Helper function to get public documents only
export function getPublicDocs(): TrustDoc[] {
  return trustDocs
    .filter(doc => doc.isPublic)
    .sort((a, b) => a.order - b.order);
}

// Helper function to get document by slug
export function getDocBySlug(slug: string): TrustDoc | undefined {
  return trustDocs.find(doc => doc.slug === slug);
}
