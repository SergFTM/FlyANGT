/**
 * Form Validation
 *
 * Server-safe validation for form submissions.
 * Returns error keys instead of localized strings.
 */

import type { FormSpec, FieldSpec, ValidationRule } from '$config/forms/forms.config';
import type { FormValues } from './mapping';

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  fieldErrors: Record<string, string>;
}

/**
 * Email regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate a single field value against its rules
 */
function validateField(
  field: FieldSpec,
  value: string | boolean | undefined
): string | null {
  const stringValue = typeof value === 'string' ? value : '';

  // Check required
  if (field.required || field.validation?.some(r => r.type === 'required')) {
    if (!stringValue.trim()) {
      const rule = field.validation?.find(r => r.type === 'required');
      return rule?.messageKey || 'forms.validation.required';
    }
  }

  // Skip other validations if empty and not required
  if (!stringValue.trim()) {
    return null;
  }

  // Check validation rules
  if (field.validation) {
    for (const rule of field.validation) {
      const error = applyRule(rule, stringValue);
      if (error) return error;
    }
  }

  return null;
}

/**
 * Apply a single validation rule
 */
function applyRule(rule: ValidationRule, value: string): string | null {
  switch (rule.type) {
    case 'required':
      // Already handled above
      return null;

    case 'email':
      if (!EMAIL_REGEX.test(value)) {
        return rule.messageKey;
      }
      return null;

    case 'minLength':
      if (typeof rule.value === 'number' && value.length < rule.value) {
        return rule.messageKey;
      }
      return null;

    case 'maxLength':
      if (typeof rule.value === 'number' && value.length > rule.value) {
        return rule.messageKey;
      }
      return null;

    case 'pattern':
      if (typeof rule.value === 'string') {
        const regex = new RegExp(rule.value);
        if (!regex.test(value)) {
          return rule.messageKey;
        }
      }
      return null;

    default:
      return null;
  }
}

/**
 * Validate form values against a spec
 */
export function validateForm(
  spec: FormSpec,
  values: FormValues
): ValidationResult {
  const fieldErrors: Record<string, string> = {};

  for (const field of spec.fields) {
    const value = values[field.id];
    const error = validateField(field, value);

    if (error) {
      fieldErrors[field.id] = error;
    }
  }

  return {
    valid: Object.keys(fieldErrors).length === 0,
    fieldErrors,
  };
}

/**
 * Validate form submission request body
 */
export interface ValidateSubmitBodyResult {
  valid: boolean;
  error?: string;
  formId?: string;
  locale?: 'en' | 'ru';
  values?: FormValues;
}

export function validateSubmitBody(body: unknown): ValidateSubmitBodyResult {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'forms.errors.invalidBody' };
  }

  const data = body as Record<string, unknown>;

  // Check formId
  if (!data.formId || typeof data.formId !== 'string') {
    return { valid: false, error: 'forms.errors.missingFormId' };
  }

  // Check locale
  const locale = data.locale;
  if (locale !== 'en' && locale !== 'ru') {
    return { valid: false, error: 'forms.errors.invalidLocale' };
  }

  // Check values
  if (!data.values || typeof data.values !== 'object') {
    return { valid: false, error: 'forms.errors.missingValues' };
  }

  return {
    valid: true,
    formId: data.formId,
    locale,
    values: data.values as FormValues,
  };
}
