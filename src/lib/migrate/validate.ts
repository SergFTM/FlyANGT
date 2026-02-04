/**
 * Data Validation Engine
 *
 * Validates leads and requests for data integrity issues.
 */

import type { LeadRecord, RequestRecord, WorkflowStatus } from '$lib/domain/types';
import { isValidEmail, isValidStatus } from '$lib/domain/types';

/**
 * Validation issue for a single record
 */
export interface ValidationIssue {
  id: string;
  kind: 'lead' | 'request';
  source: string;
  email?: string;
  fields?: string[];
  status?: string;
}

/**
 * Duplicate email group
 */
export interface DuplicateGroup {
  email: string;
  ids: string[];
  kinds: string[];
  sources: string[];
}

/**
 * Oversized note entry
 */
export interface OversizedNote {
  id: string;
  noteId: string;
  length: number;
  kind: 'lead' | 'request';
  source: string;
}

/**
 * Warning entry
 */
export interface Warning {
  id: string;
  kind: 'lead' | 'request';
  message: string;
}

/**
 * Complete validation report
 */
export interface ValidationReport {
  generatedAt: string;
  counts: {
    leads: number;
    requests: number;
    notes: number;
    tags: number;
  };
  issues: {
    invalidEmails: ValidationIssue[];
    missingFields: ValidationIssue[];
    invalidStatuses: ValidationIssue[];
    duplicatesByEmail: DuplicateGroup[];
    oversizedNotes: OversizedNote[];
    warnings: Warning[];
  };
  summary: {
    totalIssues: number;
    hasIssues: boolean;
  };
}

/**
 * Valid workflow statuses
 */
const VALID_STATUSES: WorkflowStatus[] = ['new', 'reviewed', 'contacted', 'closed', 'archived'];

/**
 * Validate data and generate report
 */
export function validateData(
  leads: LeadRecord[],
  requests: RequestRecord[],
  maxNotesLen: number = 2000
): ValidationReport {
  const invalidEmails: ValidationIssue[] = [];
  const missingFields: ValidationIssue[] = [];
  const invalidStatuses: ValidationIssue[] = [];
  const oversizedNotes: OversizedNote[] = [];
  const warnings: Warning[] = [];

  // For duplicate detection
  const emailMap = new Map<string, { ids: string[]; kinds: string[]; sources: string[] }>();

  // Count totals
  let totalNotes = 0;
  let totalTags = 0;

  // Validate leads
  for (const lead of leads) {
    const missingFieldsList: string[] = [];

    // Email validation (required for leads)
    if (!lead.email) {
      missingFieldsList.push('email');
    } else if (!isValidEmail(lead.email)) {
      invalidEmails.push({
        id: lead.id,
        kind: 'lead',
        source: lead.source,
        email: lead.email,
      });
    } else {
      // Track for duplicate detection (normalize to lowercase)
      const normalizedEmail = lead.email.toLowerCase().trim();
      const existing = emailMap.get(normalizedEmail);
      if (existing) {
        existing.ids.push(lead.id);
        existing.kinds.push('lead');
        existing.sources.push(lead.source);
      } else {
        emailMap.set(normalizedEmail, {
          ids: [lead.id],
          kinds: ['lead'],
          sources: [lead.source],
        });
      }
    }

    // Required field validation
    if (!lead.createdAt) missingFieldsList.push('createdAt');
    if (!lead.updatedAt) missingFieldsList.push('updatedAt');
    if (!lead.source) missingFieldsList.push('source');

    if (missingFieldsList.length > 0) {
      missingFields.push({
        id: lead.id,
        kind: 'lead',
        source: lead.source,
        fields: missingFieldsList,
      });
    }

    // Status validation
    if (lead.status && !isValidStatus(lead.status)) {
      invalidStatuses.push({
        id: lead.id,
        kind: 'lead',
        source: lead.source,
        status: lead.status,
      });
    }

    // Internal notes validation
    if (lead.internalNotes) {
      totalNotes += lead.internalNotes.length;
      for (const note of lead.internalNotes) {
        if (note.text && note.text.length > maxNotesLen) {
          oversizedNotes.push({
            id: lead.id,
            noteId: note.id,
            length: note.text.length,
            kind: 'lead',
            source: lead.source,
          });
        }
      }
    }

    // Tags count
    if (lead.tags) {
      totalTags += lead.tags.length;
    }

    // Warnings
    if (lead.status && lead.status !== 'new' && !lead.lastActionAt) {
      warnings.push({
        id: lead.id,
        kind: 'lead',
        message: `Status is '${lead.status}' but lastActionAt is missing`,
      });
    }
  }

  // Validate requests
  for (const request of requests) {
    const missingFieldsList: string[] = [];

    // Required field validation
    if (!request.createdAt) missingFieldsList.push('createdAt');
    if (!request.updatedAt) missingFieldsList.push('updatedAt');
    if (!request.source) missingFieldsList.push('source');
    if (!request.payload || typeof request.payload !== 'object') {
      missingFieldsList.push('payload');
    }

    if (missingFieldsList.length > 0) {
      missingFields.push({
        id: request.id,
        kind: 'request',
        source: request.source,
        fields: missingFieldsList,
      });
    }

    // Status validation
    if (request.status && !isValidStatus(request.status)) {
      invalidStatuses.push({
        id: request.id,
        kind: 'request',
        source: request.source,
        status: request.status,
      });
    }

    // Internal notes validation
    if (request.internalNotes) {
      totalNotes += request.internalNotes.length;
      for (const note of request.internalNotes) {
        if (note.text && note.text.length > maxNotesLen) {
          oversizedNotes.push({
            id: request.id,
            noteId: note.id,
            length: note.text.length,
            kind: 'request',
            source: request.source,
          });
        }
      }
    }

    // Tags count
    if (request.tags) {
      totalTags += request.tags.length;
    }

    // Warnings
    if (request.status && request.status !== 'new' && !request.lastActionAt) {
      warnings.push({
        id: request.id,
        kind: 'request',
        message: `Status is '${request.status}' but lastActionAt is missing`,
      });
    }
  }

  // Build duplicates list (only entries with more than 1 occurrence)
  const duplicatesByEmail: DuplicateGroup[] = [];
  for (const [email, data] of emailMap.entries()) {
    if (data.ids.length > 1) {
      duplicatesByEmail.push({
        email,
        ids: data.ids,
        kinds: data.kinds,
        sources: data.sources,
      });
    }
  }

  // Calculate total issues
  const totalIssues =
    invalidEmails.length +
    missingFields.length +
    invalidStatuses.length +
    duplicatesByEmail.length +
    oversizedNotes.length;

  return {
    generatedAt: new Date().toISOString(),
    counts: {
      leads: leads.length,
      requests: requests.length,
      notes: totalNotes,
      tags: totalTags,
    },
    issues: {
      invalidEmails,
      missingFields,
      invalidStatuses,
      duplicatesByEmail,
      oversizedNotes,
      warnings,
    },
    summary: {
      totalIssues,
      hasIssues: totalIssues > 0,
    },
  };
}
