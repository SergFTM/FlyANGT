/**
 * Requests Config Repository
 *
 * File-based implementation of RequestRepository.
 * Stores one JSON file per request in /src/data/db/requests/
 */

import type { RequestRepository, ExtendedListParams } from '$lib/domain/repositories';
import { writeError, readError, notFoundError } from '$lib/domain/repositories';
import type {
  EntityId,
  RequestRecord,
  CreateRequestInput,
  RecordPatch,
  WorkflowStatus,
} from '$lib/domain/types';
import {
  toISO,
  validateRequestInput,
  makeNote,
} from '$lib/domain/types';
import { getRequestsPath, getRequestFilePath } from './configDb.paths';
import {
  generateId,
  safeWriteJson,
  safeReadJson,
  listJsonFiles,
  deleteJsonFile,
} from './configDb.utils';

/**
 * Normalize a request record to ensure all workflow fields exist
 * (Backward compatibility for records created before workflow fields)
 */
function normalizeRecord(record: RequestRecord): RequestRecord {
  return {
    ...record,
    status: record.status ?? 'new',
    internalNotes: record.internalNotes ?? [],
    tags: record.tags ?? [],
  };
}

/**
 * Config file-based Request Repository
 */
export class ConfigRequestRepository implements RequestRepository {
  /**
   * Create a new request record
   */
  async create(input: CreateRequestInput): Promise<RequestRecord> {
    // Validate input
    const validation = validateRequestInput(input);
    if (!validation.valid) {
      throw writeError(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const now = toISO();
    const id = generateId('rq');

    const record: RequestRecord = {
      id,
      kind: 'request',
      createdAt: now,
      updatedAt: now,
      source: input.source,
      locale: input.locale,
      // Workflow fields - new records start as 'new'
      status: 'new',
      lastActionAt: now,
      internalNotes: [],
      tags: [],
      // Request-specific fields
      payload: input.payload,
    };

    // Write to file
    const filePath = getRequestFilePath(id);
    try {
      await safeWriteJson(filePath, record);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw writeError(`Failed to save request: ${message}`);
    }

    return record;
  }

  /**
   * Get a request by ID
   */
  async getById(id: EntityId): Promise<RequestRecord | null> {
    const filePath = getRequestFilePath(id);
    try {
      const record = await safeReadJson<RequestRecord>(filePath);
      return record ? normalizeRecord(record) : null;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw readError(`Failed to read request: ${message}`);
    }
  }

  /**
   * List requests with optional filters
   */
  async list(params?: ExtendedListParams): Promise<RequestRecord[]> {
    const limit = params?.limit ?? 100;
    const offset = params?.offset ?? 0;
    const sourceFilter = params?.source;
    const statusFilter = params?.status;

    try {
      // Get all request IDs
      const ids = await listJsonFiles(getRequestsPath());

      // Load all requests
      const requests: RequestRecord[] = [];
      for (const id of ids) {
        const request = await this.getById(id);
        if (request) {
          // Apply source filter
          if (sourceFilter && request.source !== sourceFilter) {
            continue;
          }
          // Apply status filter
          if (statusFilter && request.status !== statusFilter) {
            continue;
          }
          requests.push(request);
        }
      }

      // Sort by createdAt descending (newest first)
      requests.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      // Apply pagination
      return requests.slice(offset, offset + limit);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw readError(`Failed to list requests: ${message}`);
    }
  }

  /**
   * Count requests with optional filters
   */
  async count(params?: Pick<ExtendedListParams, 'source' | 'status'>): Promise<number> {
    const sourceFilter = params?.source;
    const statusFilter = params?.status;

    try {
      const ids = await listJsonFiles(getRequestsPath());

      if (!sourceFilter && !statusFilter) {
        return ids.length;
      }

      // Count with filters
      let count = 0;
      for (const id of ids) {
        const request = await this.getById(id);
        if (request) {
          if (sourceFilter && request.source !== sourceFilter) {
            continue;
          }
          if (statusFilter && request.status !== statusFilter) {
            continue;
          }
          count++;
        }
      }

      return count;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw readError(`Failed to count requests: ${message}`);
    }
  }

  /**
   * Update a request record (status, notes, tags, archive)
   */
  async update(id: EntityId, patch: RecordPatch): Promise<RequestRecord> {
    // Load existing record
    const existing = await this.getById(id);
    if (!existing) {
      throw notFoundError('Request', id);
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
    const filePath = getRequestFilePath(id);
    try {
      await safeWriteJson(filePath, updated);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw writeError(`Failed to update request: ${message}`);
    }

    return updated;
  }

  /**
   * Delete a request by ID
   */
  async delete(id: EntityId): Promise<boolean> {
    const filePath = getRequestFilePath(id);
    try {
      return await deleteJsonFile(filePath);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw writeError(`Failed to delete request: ${message}`);
    }
  }
}

/**
 * Singleton instance
 */
let instance: ConfigRequestRepository | null = null;

/**
 * Get the config request repository instance
 */
export function getConfigRequestRepository(): ConfigRequestRepository {
  if (!instance) {
    instance = new ConfigRequestRepository();
  }
  return instance;
}
