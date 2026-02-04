/**
 * Repository Interfaces
 *
 * Abstract interfaces for data persistence.
 * These interfaces enable swapping between:
 * - Config file DB (MVP)
 * - Prisma/Postgres (production migration)
 */

import type {
  EntityId,
  LeadRecord,
  RequestRecord,
  CreateLeadInput,
  CreateRequestInput,
  ListParams,
  RecordPatch,
  WorkflowStatus,
} from './types';

/**
 * Extended list params with status filter
 */
export interface ExtendedListParams extends ListParams {
  status?: WorkflowStatus;
}

/**
 * Lead repository interface
 */
export interface LeadRepository {
  /**
   * Create a new lead record
   */
  create(input: CreateLeadInput): Promise<LeadRecord>;

  /**
   * Get a lead by ID
   */
  getById(id: EntityId): Promise<LeadRecord | null>;

  /**
   * List leads with optional filters
   */
  list(params?: ExtendedListParams): Promise<LeadRecord[]>;

  /**
   * Count leads with optional filters
   */
  count(params?: Pick<ExtendedListParams, 'source' | 'status'>): Promise<number>;

  /**
   * Update a lead record (status, notes, tags, archive)
   */
  update(id: EntityId, patch: RecordPatch): Promise<LeadRecord>;

  /**
   * Delete a lead by ID (for dev/admin purposes)
   */
  delete(id: EntityId): Promise<boolean>;
}

/**
 * Request repository interface
 */
export interface RequestRepository {
  /**
   * Create a new request record
   */
  create(input: CreateRequestInput): Promise<RequestRecord>;

  /**
   * Get a request by ID
   */
  getById(id: EntityId): Promise<RequestRecord | null>;

  /**
   * List requests with optional filters
   */
  list(params?: ExtendedListParams): Promise<RequestRecord[]>;

  /**
   * Count requests with optional filters
   */
  count(params?: Pick<ExtendedListParams, 'source' | 'status'>): Promise<number>;

  /**
   * Update a request record (status, notes, tags, archive)
   */
  update(id: EntityId, patch: RecordPatch): Promise<RequestRecord>;

  /**
   * Delete a request by ID (for dev/admin purposes)
   */
  delete(id: EntityId): Promise<boolean>;
}

/**
 * Combined repositories facade
 */
export interface Repositories {
  leads: LeadRepository;
  requests: RequestRepository;
}

/**
 * Repository error types
 */
export class RepositoryError extends Error {
  constructor(
    message: string,
    public readonly code: 'NOT_FOUND' | 'VALIDATION' | 'WRITE_ERROR' | 'READ_ERROR'
  ) {
    super(message);
    this.name = 'RepositoryError';
  }
}

/**
 * Not found error helper
 */
export function notFoundError(entity: string, id: EntityId): RepositoryError {
  return new RepositoryError(`${entity} not found: ${id}`, 'NOT_FOUND');
}

/**
 * Validation error helper
 */
export function validationError(message: string): RepositoryError {
  return new RepositoryError(message, 'VALIDATION');
}

/**
 * Write error helper
 */
export function writeError(message: string): RepositoryError {
  return new RepositoryError(message, 'WRITE_ERROR');
}

/**
 * Read error helper
 */
export function readError(message: string): RepositoryError {
  return new RepositoryError(message, 'READ_ERROR');
}
