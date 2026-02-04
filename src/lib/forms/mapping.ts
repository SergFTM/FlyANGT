/**
 * Form Mapping Registry
 *
 * Maps form values to CreateLeadInput or CreateRequestInput.
 * Server-safe: no browser-only code.
 */

import type { CreateLeadInput, CreateRequestInput, EntityLocale, SubmissionSource } from '$lib/domain/types';
import type { FormSpec } from '$config/forms/forms.config';

/**
 * Form values type
 */
export type FormValues = Record<string, string | boolean | undefined>;

/**
 * Map form values to CreateLeadInput
 */
export function mapToLead(
  spec: FormSpec,
  values: FormValues,
  locale: EntityLocale
): CreateLeadInput {
  // Base fields
  const input: CreateLeadInput = {
    source: spec.source as SubmissionSource,
    locale,
    status: 'new',
    email: String(values.email || ''),
  };

  // Optional fields commonly used in leads
  if (values.name) input.name = String(values.name);
  if (values.phone) input.phone = String(values.phone);
  if (values.country) input.country = String(values.country);
  if (values.company) input.company = String(values.company);
  if (values.interest) input.interest = String(values.interest);
  if (values.notes) input.notes = String(values.notes);
  if (values.investorType) input.investorType = String(values.investorType);
  if (values.ticket) input.ticket = String(values.ticket);

  // Collect remaining values as meta
  const knownFields = ['name', 'email', 'phone', 'country', 'company', 'interest', 'notes', 'investorType', 'ticket'];
  const meta: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(values)) {
    if (!knownFields.includes(key) && value !== undefined && value !== '') {
      meta[key] = value;
    }
  }

  if (Object.keys(meta).length > 0) {
    input.meta = meta;
  }

  return input;
}

/**
 * Map form values to CreateRequestInput
 */
export function mapToRequest(
  spec: FormSpec,
  values: FormValues,
  locale: EntityLocale
): CreateRequestInput {
  return {
    source: spec.source as SubmissionSource,
    locale,
    status: 'new',
    payload: { ...values },
  };
}

/**
 * Normalize form values
 * - Trim strings
 * - Convert empty strings to undefined
 */
export function normalizeValues(values: FormValues): FormValues {
  const normalized: FormValues = {};

  for (const [key, value] of Object.entries(values)) {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      normalized[key] = trimmed || undefined;
    } else {
      normalized[key] = value;
    }
  }

  return normalized;
}
