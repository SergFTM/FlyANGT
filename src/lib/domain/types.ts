/**
 * Domain Types
 *
 * Core entity types for the application.
 * Migration-ready: these types will map to Prisma models later.
 */

/**
 * Entity identifier type
 */
export type EntityId = string;

/**
 * Source of the submission
 */
export type SubmissionSource =
  | 'presale'
  | 'configurator_quote'
  | 'partners'
  | 'investors_deck'
  | 'customers_docs';

/**
 * Supported locales
 */
export type EntityLocale = 'en' | 'ru';

/**
 * Workflow status for leads and requests
 * - new: freshly created
 * - reviewed: admin has seen it
 * - contacted: outreach has been made
 * - closed: workflow complete
 * - archived: removed from active view
 */
export type WorkflowStatus = 'new' | 'reviewed' | 'contacted' | 'closed' | 'archived';

/**
 * Internal note for admin tracking
 */
export interface InternalNote {
  id: string;
  text: string;
  createdAt: string;
  author?: string;
}

/**
 * Base entity fields shared by all records
 */
export interface BaseEntity {
  id: EntityId;
  createdAt: string;
  updatedAt: string;
  source: SubmissionSource;
  locale?: EntityLocale;
  // Workflow fields
  status: WorkflowStatus;
  lastActionAt?: string;
  tags?: string[];
  internalNotes?: InternalNote[];
}

/**
 * Lead record - for contact/interest submissions
 */
export interface LeadRecord extends BaseEntity {
  kind: 'lead';
  name?: string;
  email: string;
  phone?: string;
  country?: string;
  company?: string;
  investorType?: string;
  ticket?: string;
  interest?: string;
  notes?: string;
  meta?: Record<string, unknown>;
}

/**
 * Request record - for structured form submissions
 */
export interface RequestRecord extends BaseEntity {
  kind: 'request';
  payload: Record<string, unknown>;
}

/**
 * Input type for creating a lead (without auto-generated fields)
 */
export type CreateLeadInput = Omit<LeadRecord, 'id' | 'createdAt' | 'updatedAt' | 'kind'>;

/**
 * Input type for creating a request (without auto-generated fields)
 */
export type CreateRequestInput = Omit<RequestRecord, 'id' | 'createdAt' | 'updatedAt' | 'kind'>;

/**
 * Query parameters for listing entities
 */
export interface ListParams {
  source?: SubmissionSource;
  limit?: number;
  offset?: number;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Sanitize string input
 * - Trims whitespace
 * - Limits length
 * - Returns undefined if empty
 */
export function sanitizeString(
  value: unknown,
  maxLength: number = 1000
): string | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value !== 'string') return undefined;

  const trimmed = value.trim();
  if (trimmed.length === 0) return undefined;

  return trimmed.length > maxLength ? trimmed.substring(0, maxLength) : trimmed;
}

/**
 * Get current ISO timestamp
 */
export function toISO(): string {
  return new Date().toISOString();
}

/**
 * Validate submission source
 */
export function isValidSource(source: unknown): source is SubmissionSource {
  const validSources: SubmissionSource[] = [
    'presale',
    'configurator_quote',
    'partners',
    'investors_deck',
    'customers_docs',
  ];
  return typeof source === 'string' && validSources.includes(source as SubmissionSource);
}

/**
 * Validate locale
 */
export function isValidLocale(locale: unknown): locale is EntityLocale {
  return locale === 'en' || locale === 'ru';
}

/**
 * Validate lead input
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateLeadInput(input: unknown): ValidationResult {
  const errors: string[] = [];

  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Invalid input'] };
  }

  const data = input as Record<string, unknown>;

  // Required: email
  if (!data.email || !isValidEmail(data.email as string)) {
    errors.push('Valid email is required');
  }

  // Required: source
  if (!isValidSource(data.source)) {
    errors.push('Valid source is required');
  }

  // Optional locale validation
  if (data.locale !== undefined && !isValidLocale(data.locale)) {
    errors.push('Invalid locale');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate request input
 */
export function validateRequestInput(input: unknown): ValidationResult {
  const errors: string[] = [];

  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Invalid input'] };
  }

  const data = input as Record<string, unknown>;

  // Required: source
  if (!isValidSource(data.source)) {
    errors.push('Valid source is required');
  }

  // Required: payload
  if (!data.payload || typeof data.payload !== 'object') {
    errors.push('Payload object is required');
  }

  // Optional locale validation
  if (data.locale !== undefined && !isValidLocale(data.locale)) {
    errors.push('Invalid locale');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Valid workflow statuses
 */
const WORKFLOW_STATUSES: WorkflowStatus[] = ['new', 'reviewed', 'contacted', 'closed', 'archived'];

/**
 * Check if a value is a valid workflow status
 */
export function isValidStatus(status: unknown): status is WorkflowStatus {
  return typeof status === 'string' && WORKFLOW_STATUSES.includes(status as WorkflowStatus);
}

/**
 * Normalize status input to a valid WorkflowStatus
 * Returns 'new' if invalid
 */
export function normalizeStatus(input: unknown): WorkflowStatus {
  if (isValidStatus(input)) return input;
  return 'new';
}

/**
 * Generate a unique note ID
 */
function generateNoteId(): string {
  const now = new Date();
  const rand = Math.random().toString(36).substring(2, 6);
  return `note-${now.getTime()}-${rand}`;
}

/**
 * Create a new internal note
 */
export function makeNote(text: string, author?: string): InternalNote {
  return {
    id: generateNoteId(),
    text: text.trim(),
    createdAt: new Date().toISOString(),
    author,
  };
}

/**
 * Patch input for updating records
 */
export interface RecordPatch {
  status?: WorkflowStatus;
  addNote?: { text: string; author?: string };
  tags?: string[];
  archived?: boolean;
}

/**
 * Validate patch input
 */
export function validatePatch(input: unknown): ValidationResult {
  const errors: string[] = [];

  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Invalid patch input'] };
  }

  const data = input as Record<string, unknown>;

  // Validate status if provided
  if (data.status !== undefined && !isValidStatus(data.status)) {
    errors.push('Invalid status value');
  }

  // Validate addNote if provided
  if (data.addNote !== undefined) {
    if (typeof data.addNote !== 'object' || data.addNote === null) {
      errors.push('addNote must be an object');
    } else {
      const note = data.addNote as Record<string, unknown>;
      if (!note.text || typeof note.text !== 'string' || note.text.trim().length === 0) {
        errors.push('Note text is required');
      }
    }
  }

  // Validate tags if provided
  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags)) {
      errors.push('Tags must be an array');
    } else if (!data.tags.every(t => typeof t === 'string')) {
      errors.push('All tags must be strings');
    }
  }

  // Validate archived if provided
  if (data.archived !== undefined && typeof data.archived !== 'boolean') {
    errors.push('Archived must be a boolean');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
