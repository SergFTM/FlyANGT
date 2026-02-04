/**
 * Seed Export Transformer
 *
 * Builds a Prisma seed-ready JSON structure with normalized tables.
 */

import type { LeadRecord, RequestRecord, WorkflowStatus } from '$lib/domain/types';

/**
 * Flattened Lead for seed (without embedded arrays)
 */
export interface SeedLead {
  id: string;
  createdAt: string;
  updatedAt: string;
  source: string;
  locale: string | null;
  status: WorkflowStatus;
  lastActionAt: string | null;
  email: string;
  name: string | null;
  phone: string | null;
  country: string | null;
  company: string | null;
  investorType: string | null;
  ticket: string | null;
  interest: string | null;
  notes: string | null;
  meta: Record<string, unknown> | null;
}

/**
 * Flattened Request for seed (without embedded arrays)
 */
export interface SeedRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
  source: string;
  locale: string | null;
  status: WorkflowStatus;
  lastActionAt: string | null;
  payload: Record<string, unknown>;
}

/**
 * Normalized Internal Note for seed
 */
export interface SeedInternalNote {
  id: string;
  entityType: 'lead' | 'request';
  entityId: string;
  text: string;
  createdAt: string;
  author: string | null;
}

/**
 * Normalized Tag for seed
 */
export interface SeedTag {
  id: string;
  entityType: 'lead' | 'request';
  entityId: string;
  value: string;
}

/**
 * Complete seed export structure
 */
export interface SeedExport {
  generatedAt: string;
  counts: {
    leads: number;
    requests: number;
    notes: number;
    tags: number;
  };
  Lead: SeedLead[];
  Request: SeedRequest[];
  InternalNote: SeedInternalNote[];
  Tag: SeedTag[];
}

/**
 * Generate a deterministic tag ID
 */
function generateTagId(entityType: string, entityId: string, value: string, index: number): string {
  return `tag-${entityType}-${entityId}-${index}`;
}

/**
 * Build seed-ready export from leads and requests
 *
 * Normalizes embedded notes and tags into separate tables.
 * All records sorted by id for deterministic output.
 */
export function buildSeedExport(
  leads: LeadRecord[],
  requests: RequestRecord[]
): SeedExport {
  const seedLeads: SeedLead[] = [];
  const seedRequests: SeedRequest[] = [];
  const seedNotes: SeedInternalNote[] = [];
  const seedTags: SeedTag[] = [];

  // Process leads
  for (const lead of leads) {
    // Flatten lead (without embedded arrays)
    seedLeads.push({
      id: lead.id,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
      source: lead.source,
      locale: lead.locale ?? null,
      status: lead.status,
      lastActionAt: lead.lastActionAt ?? null,
      email: lead.email,
      name: lead.name ?? null,
      phone: lead.phone ?? null,
      country: lead.country ?? null,
      company: lead.company ?? null,
      investorType: lead.investorType ?? null,
      ticket: lead.ticket ?? null,
      interest: lead.interest ?? null,
      notes: lead.notes ?? null,
      meta: lead.meta ?? null,
    });

    // Extract internal notes
    if (lead.internalNotes && lead.internalNotes.length > 0) {
      for (const note of lead.internalNotes) {
        seedNotes.push({
          id: note.id,
          entityType: 'lead',
          entityId: lead.id,
          text: note.text,
          createdAt: note.createdAt,
          author: note.author ?? null,
        });
      }
    }

    // Extract tags
    if (lead.tags && lead.tags.length > 0) {
      lead.tags.forEach((tag, index) => {
        seedTags.push({
          id: generateTagId('lead', lead.id, tag, index),
          entityType: 'lead',
          entityId: lead.id,
          value: tag,
        });
      });
    }
  }

  // Process requests
  for (const request of requests) {
    // Flatten request (without embedded arrays)
    seedRequests.push({
      id: request.id,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt,
      source: request.source,
      locale: request.locale ?? null,
      status: request.status,
      lastActionAt: request.lastActionAt ?? null,
      payload: request.payload,
    });

    // Extract internal notes
    if (request.internalNotes && request.internalNotes.length > 0) {
      for (const note of request.internalNotes) {
        seedNotes.push({
          id: note.id,
          entityType: 'request',
          entityId: request.id,
          text: note.text,
          createdAt: note.createdAt,
          author: note.author ?? null,
        });
      }
    }

    // Extract tags
    if (request.tags && request.tags.length > 0) {
      request.tags.forEach((tag, index) => {
        seedTags.push({
          id: generateTagId('request', request.id, tag, index),
          entityType: 'request',
          entityId: request.id,
          value: tag,
        });
      });
    }
  }

  // Sort all arrays by id for deterministic output
  seedLeads.sort((a, b) => a.id.localeCompare(b.id));
  seedRequests.sort((a, b) => a.id.localeCompare(b.id));
  seedNotes.sort((a, b) => a.id.localeCompare(b.id));
  seedTags.sort((a, b) => a.id.localeCompare(b.id));

  return {
    generatedAt: new Date().toISOString(),
    counts: {
      leads: seedLeads.length,
      requests: seedRequests.length,
      notes: seedNotes.length,
      tags: seedTags.length,
    },
    Lead: seedLeads,
    Request: seedRequests,
    InternalNote: seedNotes,
    Tag: seedTags,
  };
}
