/**
 * Leads Config Repository
 *
 * File-based implementation of LeadRepository.
 * Stores one JSON file per lead in /src/data/db/leads/
 */

import type { LeadRepository, ExtendedListParams } from '$lib/domain/repositories';
import { writeError, readError, notFoundError } from '$lib/domain/repositories';
import type {
  EntityId,
  LeadRecord,
  CreateLeadInput,
  RecordPatch,
  WorkflowStatus,
} from '$lib/domain/types';
import {
  toISO,
  sanitizeString,
  validateLeadInput,
  makeNote,
} from '$lib/domain/types';
import { getLeadsPath, getLeadFilePath } from './configDb.paths';
import {
  generateId,
  safeWriteJson,
  safeReadJson,
  listJsonFiles,
  deleteJsonFile,
} from './configDb.utils';

/**
 * Normalize a lead record to ensure all workflow fields exist
 * (Backward compatibility for records created before workflow fields)
 */
function normalizeRecord(record: LeadRecord): LeadRecord {
  return {
    ...record,
    status: record.status ?? 'new',
    internalNotes: record.internalNotes ?? [],
    tags: record.tags ?? [],
  };
}

/**
 * Config file-based Lead Repository
 */
export class ConfigLeadRepository implements LeadRepository {
  /**
   * Create a new lead record
   */
  async create(input: CreateLeadInput): Promise<LeadRecord> {
    // Validate input
    const validation = validateLeadInput(input);
    if (!validation.valid) {
      throw writeError(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const now = toISO();
    const id = generateId('ld');

    const record: LeadRecord = {
      id,
      kind: 'lead',
      createdAt: now,
      updatedAt: now,
      source: input.source,
      locale: input.locale,
      // Workflow fields - new records start as 'new'
      status: 'new',
      lastActionAt: now,
      internalNotes: [],
      tags: [],
      // Lead-specific fields
      email: input.email.trim().toLowerCase(),
      name: sanitizeString(input.name, 200),
      phone: sanitizeString(input.phone, 50),
      country: sanitizeString(input.country, 100),
      company: sanitizeString(input.company, 200),
      investorType: sanitizeString(input.investorType, 100),
      ticket: sanitizeString(input.ticket, 100),
      interest: sanitizeString(input.interest, 500),
      notes: sanitizeString(input.notes, 2000),
      meta: input.meta,
    };

    // Write to file
    const filePath = getLeadFilePath(id);
    try {
      await safeWriteJson(filePath, record);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw writeError(`Failed to save lead: ${message}`);
    }

    return record;
  }

  /**
   * Get a lead by ID
   */
  async getById(id: EntityId): Promise<LeadRecord | null> {
    const filePath = getLeadFilePath(id);
    try {
      const record = await safeReadJson<LeadRecord>(filePath);
      return record ? normalizeRecord(record) : null;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw readError(`Failed to read lead: ${message}`);
    }
  }

  /**
   * List leads with optional filters
   */
  async list(params?: ExtendedListParams): Promise<LeadRecord[]> {
    const limit = params?.limit ?? 100;
    const offset = params?.offset ?? 0;
    const sourceFilter = params?.source;
    const statusFilter = params?.status;

    try {
      // Get all lead IDs
      const ids = await listJsonFiles(getLeadsPath());

      // Load all leads
      const leads: LeadRecord[] = [];
      for (const id of ids) {
        const lead = await this.getById(id);
        if (lead) {
          // Apply source filter
          if (sourceFilter && lead.source !== sourceFilter) {
            continue;
          }
          // Apply status filter
          if (statusFilter && lead.status !== statusFilter) {
            continue;
          }
          leads.push(lead);
        }
      }

      // Sort by createdAt descending (newest first)
      leads.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      // Apply pagination
      return leads.slice(offset, offset + limit);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw readError(`Failed to list leads: ${message}`);
    }
  }

  /**
   * Count leads with optional filters
   */
  async count(params?: Pick<ExtendedListParams, 'source' | 'status'>): Promise<number> {
    const sourceFilter = params?.source;
    const statusFilter = params?.status;

    try {
      const ids = await listJsonFiles(getLeadsPath());

      if (!sourceFilter && !statusFilter) {
        return ids.length;
      }

      // Count with filters
      let count = 0;
      for (const id of ids) {
        const lead = await this.getById(id);
        if (lead) {
          if (sourceFilter && lead.source !== sourceFilter) {
            continue;
          }
          if (statusFilter && lead.status !== statusFilter) {
            continue;
          }
          count++;
        }
      }

      return count;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw readError(`Failed to count leads: ${message}`);
    }
  }

  /**
   * Update a lead record (status, notes, tags, archive)
   */
  async update(id: EntityId, patch: RecordPatch): Promise<LeadRecord> {
    // Load existing record
    const existing = await this.getById(id);
    if (!existing) {
      throw notFoundError('Lead', id);
    }

    const now = toISO();
    let updated = { ...existing };
    let actionPerformed = false;

    // Apply status change
    if (patch.status !== undefined) {
      updated.status = patch.status;
      updated.lastActionAt = now;
      actionPerformed = true;
    }

    // Apply archived flag (sets status to 'archived')
    if (patch.archived === true) {
      updated.status = 'archived' as WorkflowStatus;
      updated.lastActionAt = now;
      actionPerformed = true;
    }

    // Add internal note
    if (patch.addNote) {
      const note = makeNote(patch.addNote.text, patch.addNote.author);
      updated.internalNotes = [note, ...(updated.internalNotes || [])];
      updated.lastActionAt = now;
      actionPerformed = true;
    }

    // Update tags
    if (patch.tags !== undefined) {
      updated.tags = patch.tags;
      actionPerformed = true;
    }

    // Update timestamp if any action was performed
    if (actionPerformed) {
      updated.updatedAt = now;
    }

    // Write back to file
    const filePath = getLeadFilePath(id);
    try {
      await safeWriteJson(filePath, updated);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw writeError(`Failed to update lead: ${message}`);
    }

    return updated;
  }

  /**
   * Delete a lead by ID
   */
  async delete(id: EntityId): Promise<boolean> {
    const filePath = getLeadFilePath(id);
    try {
      return await deleteJsonFile(filePath);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw writeError(`Failed to delete lead: ${message}`);
    }
  }
}

/**
 * Singleton instance
 */
let instance: ConfigLeadRepository | null = null;

/**
 * Get the config lead repository instance
 */
export function getConfigLeadRepository(): ConfigLeadRepository {
  if (!instance) {
    instance = new ConfigLeadRepository();
  }
  return instance;
}
