/**
 * Trust Center Content - English
 *
 * Content for trust center pages and document details.
 */

import type { PageContent } from './types';

// Trust Center landing page content
export const trustCenterContent: PageContent = {
  hero: {
    h1: 'Trust Center',
    h2: 'Access compliance documents, policies, manuals, and forms',
    trustLine: 'Transparency and compliance for aviation excellence',
    primaryCta: 'Browse Documents',
    secondaryCta: 'Contact Support',
  },
  sections: [
    {
      id: 'overview',
      title: 'Document Library',
      text: 'Our Trust Center provides comprehensive access to all compliance documentation, operational manuals, legal agreements, and quality standards. Find everything you need to ensure regulatory compliance and operational excellence.',
      bullets: [
        'Legal documents and terms of service',
        'Operational and maintenance manuals',
        'Quality assurance standards',
        'Partner and investor resources',
        'Application forms and templates',
      ],
    },
    {
      id: 'categories',
      title: 'Document Categories',
      text: 'Browse documents organized by category to quickly find what you need. Use filters and search to narrow down results.',
    },
  ],
  finalCta: {
    title: 'Need a specific document?',
    text: 'Contact our support team if you cannot find what you are looking for.',
    button: 'Contact Support',
  },
};

// Document detail content (keyed by document slug)
export const trustDocDetails: Record<string, { summary: string; keyPoints: string[] }> = {
  'terms-of-service': {
    summary:
      'These Terms of Service govern your use of the FlyANGT platform and services. By accessing or using our platform, you agree to be bound by these terms.',
    keyPoints: [
      'Platform usage rights and restrictions',
      'User account responsibilities',
      'Intellectual property rights',
      'Limitation of liability',
      'Dispute resolution procedures',
    ],
  },
  'privacy-policy': {
    summary:
      'Our Privacy Policy explains how we collect, use, and protect your personal information when you use the FlyANGT platform.',
    keyPoints: [
      'Data collection practices',
      'How we use your information',
      'Data sharing and third parties',
      'Your privacy rights',
      'Data retention and security',
    ],
  },
  'platform-user-manual': {
    summary:
      'The Platform User Manual provides comprehensive guidance on using all features of the FlyANGT platform effectively.',
    keyPoints: [
      'Getting started guide',
      'Dashboard navigation',
      'Document management',
      'Reporting features',
      'Troubleshooting common issues',
    ],
  },
  'aircraft-maintenance-guide': {
    summary:
      'The Aircraft Maintenance Guide outlines procedures and schedules for maintaining aircraft registered on the FlyANGT platform.',
    keyPoints: [
      'Pre-flight inspection checklists',
      'Scheduled maintenance intervals',
      'Documentation requirements',
      'Reporting maintenance issues',
      'Regulatory compliance guidelines',
    ],
  },
  'partner-sales-kit': {
    summary:
      'The Partner Sales Kit contains materials and resources to help partners effectively market and sell FlyANGT services.',
    keyPoints: [
      'Brand guidelines and assets',
      'Product feature sheets',
      'Pricing information',
      'Demo scripts and presentations',
      'Customer success stories',
    ],
  },
  'quality-assurance-standards': {
    summary:
      'Our Quality Assurance Standards document defines the quality benchmarks and processes we maintain across all operations.',
    keyPoints: [
      'Quality management framework',
      'Inspection procedures',
      'Performance metrics',
      'Continuous improvement process',
      'Certification requirements',
    ],
  },
  'partner-application-form': {
    summary:
      'The Partner Application Form is used by organizations interested in becoming official FlyANGT partners.',
    keyPoints: [
      'Company information requirements',
      'Business references',
      'Technical capabilities',
      'Partnership tier options',
      'Submission and review process',
    ],
  },
  'data-retention-policy': {
    summary:
      'The Data Retention Policy describes how long we keep different types of data and our data disposal procedures.',
    keyPoints: [
      'Data categories and retention periods',
      'Legal and regulatory requirements',
      'Data archival procedures',
      'Secure disposal methods',
      'User data deletion requests',
    ],
  },
  'flight-operations-manual': {
    summary:
      'The Flight Operations Manual provides detailed procedures for all flight-related activities on the platform.',
    keyPoints: [
      'Flight planning procedures',
      'Weather assessment guidelines',
      'Communication protocols',
      'Emergency procedures',
      'Post-flight documentation',
    ],
  },
  'regulatory-compliance': {
    summary:
      'This document links to external regulatory resources and explains our compliance with aviation regulations.',
    keyPoints: [
      'FAA compliance overview',
      'EASA requirements',
      'International aviation standards',
      'Audit and inspection history',
      'Compliance certification status',
    ],
  },
  'investor-presentation': {
    summary:
      'The Investor Presentation provides an overview of FlyANGT business model, market opportunity, and growth strategy.',
    keyPoints: [
      'Company overview and mission',
      'Market analysis and opportunity',
      'Product and technology roadmap',
      'Financial projections',
      'Investment terms and structure',
    ],
  },
  'security-policy': {
    summary:
      'Our Security Policy outlines the measures we take to protect your data and ensure platform security.',
    keyPoints: [
      'Infrastructure security measures',
      'Access control and authentication',
      'Data encryption standards',
      'Incident response procedures',
      'Security audit schedule',
    ],
  },
  whitepaper: {
    summary:
      'The FlyANGT Whitepaper provides detailed technical documentation of the tokenization framework, architecture, and governance mechanisms.',
    keyPoints: [
      'Tokenization framework overview',
      'Technical architecture and implementation',
      'Governance mechanisms and rules',
      'Operational procedures',
      'Risk factors and disclosures',
    ],
  },
};
