/**
 * Forms Configuration
 *
 * Config-driven form specifications for unified submission.
 * Server-safe: no browser-only code.
 *
 * Each FormSpec defines:
 * - field definitions with validation rules
 * - target: 'lead' | 'request'
 * - source identifier for repository
 */

/**
 * Field types supported
 */
export type FieldType = 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'checkbox' | 'hidden';

/**
 * Validation rule
 */
export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern';
  value?: number | string;
  messageKey: string;
}

/**
 * Select option
 */
export interface SelectOption {
  value: string;
  labelKey: string;
}

/**
 * Field specification
 */
export interface FieldSpec {
  id: string;
  type: FieldType;
  labelKey: string;
  placeholderKey?: string;
  required?: boolean;
  validation?: ValidationRule[];
  options?: SelectOption[];
  defaultValue?: string | boolean;
  rows?: number;
}

/**
 * Form target type
 */
export type FormTarget = 'lead' | 'request';

/**
 * Complete form specification
 */
export interface FormSpec {
  id: string;
  titleKey: string;
  descriptionKey?: string;
  source: string;
  target: FormTarget;
  fields: FieldSpec[];
  submitLabelKey: string;
  successTitleKey: string;
  successTextKey: string;
}

/**
 * All form specifications
 */
export const formSpecs: FormSpec[] = [
  {
    id: 'customers_docs',
    titleKey: 'forms.customersDocs.title',
    descriptionKey: 'forms.customersDocs.description',
    source: 'customers_docs',
    target: 'lead',
    fields: [
      {
        id: 'name',
        type: 'text',
        labelKey: 'forms.customersDocs.fields.name',
        required: true,
        validation: [
          { type: 'required', messageKey: 'forms.validation.required' },
        ],
      },
      {
        id: 'email',
        type: 'email',
        labelKey: 'forms.customersDocs.fields.email',
        required: true,
        validation: [
          { type: 'required', messageKey: 'forms.validation.required' },
          { type: 'email', messageKey: 'forms.validation.invalidEmail' },
        ],
      },
      {
        id: 'phone',
        type: 'tel',
        labelKey: 'forms.customersDocs.fields.phone',
        required: false,
      },
      {
        id: 'country',
        type: 'text',
        labelKey: 'forms.customersDocs.fields.country',
        required: true,
        validation: [
          { type: 'required', messageKey: 'forms.validation.required' },
        ],
      },
      {
        id: 'interest',
        type: 'select',
        labelKey: 'forms.customersDocs.fields.interest',
        required: true,
        validation: [
          { type: 'required', messageKey: 'forms.validation.required' },
        ],
        options: [
          { value: 'ownership', labelKey: 'forms.customersDocs.interest.ownership' },
          { value: 'charter', labelKey: 'forms.customersDocs.interest.charter' },
          { value: 'maintenance', labelKey: 'forms.customersDocs.interest.maintenance' },
          { value: 'other', labelKey: 'forms.customersDocs.interest.other' },
        ],
      },
      {
        id: 'notes',
        type: 'textarea',
        labelKey: 'forms.customersDocs.fields.notes',
        required: false,
        rows: 4,
      },
    ],
    submitLabelKey: 'forms.customersDocs.submit',
    successTitleKey: 'forms.customersDocs.successTitle',
    successTextKey: 'forms.customersDocs.successText',
  },
];

/**
 * Get form spec by ID
 */
export function getFormSpec(formId: string): FormSpec | null {
  return formSpecs.find(f => f.id === formId) || null;
}

/**
 * Get all form IDs
 */
export function getFormIds(): string[] {
  return formSpecs.map(f => f.id);
}
