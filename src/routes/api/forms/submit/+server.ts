/**
 * Unified Form Submit API Endpoint
 *
 * POST /api/forms/submit
 *
 * Accepts form submissions via FormSpec configuration.
 * Maps to leads or requests based on spec.target.
 *
 * Includes anti-spam protections:
 * - Payload size limit
 * - Honeypot detection
 * - Rate limiting
 *
 * Request body:
 * {
 *   formId: string,
 *   locale: 'en' | 'ru',
 *   values: Record<string, any>
 * }
 *
 * Response:
 * Success: { ok: true, id: string }
 * Failure: { ok: false, error: string, fieldErrors?: Record<string, string>, retryAfterSec?: number }
 */

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getFormSpec } from '$config/forms/forms.config';
import { antiSpamConfig } from '$config/antiSpam.config';
import { getRepositories } from '$lib/adapters';
import {
  validateSubmitBody,
  validateForm,
  normalizeValues,
  mapToLead,
  mapToRequest,
} from '$lib/forms';
import { checkRateLimit, getClientIp } from '$lib/server/rateLimit';

/**
 * POST /api/forms/submit
 */
export const POST: RequestHandler = async ({ request }) => {
  // Check payload size
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > antiSpamConfig.payload.maxBytes) {
    return json({
      ok: false,
      error: 'forms.errors.tooLarge',
    }, { status: 413 });
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({
      ok: false,
      error: 'forms.errors.invalidBody',
    }, { status: 400 });
  }

  // Validate request body structure
  const bodyResult = validateSubmitBody(body);
  if (!bodyResult.valid || !bodyResult.formId || !bodyResult.locale || !bodyResult.values) {
    return json({
      ok: false,
      error: bodyResult.error || 'forms.errors.invalidBody',
    }, { status: 400 });
  }

  const { formId, locale, values } = bodyResult;

  // Honeypot detection
  if (antiSpamConfig.honeypot.enabled) {
    const honeypotValue = values[antiSpamConfig.honeypot.fieldId];
    if (honeypotValue && String(honeypotValue).trim() !== '') {
      // Honeypot was filled - likely spam
      // Return success to not alert spammer, but don't store
      return json({
        ok: true,
        id: 'spam-blocked',
      });
    }
  }

  // Rate limiting
  if (antiSpamConfig.rateLimit.enabled) {
    const clientIp = getClientIp(request);
    const rateLimitResult = checkRateLimit(clientIp, formId, antiSpamConfig);

    if (!rateLimitResult.ok) {
      const errorKey = rateLimitResult.reason === 'banned'
        ? 'forms.errors.banned'
        : 'forms.errors.rateLimited';

      return json({
        ok: false,
        error: errorKey,
        retryAfterSec: rateLimitResult.retryAfterSec,
      }, { status: 429 });
    }
  }

  // Get form spec
  const spec = getFormSpec(formId);
  if (!spec) {
    return json({
      ok: false,
      error: 'forms.errors.unknownForm',
    }, { status: 404 });
  }

  // Normalize values (remove honeypot field if present)
  const cleanedValues = { ...values };
  if (antiSpamConfig.honeypot.enabled) {
    delete cleanedValues[antiSpamConfig.honeypot.fieldId];
  }
  const normalizedValues = normalizeValues(cleanedValues);

  // Validate form values
  const validation = validateForm(spec, normalizedValues);
  if (!validation.valid) {
    return json({
      ok: false,
      error: 'forms.errors.validationFailed',
      fieldErrors: validation.fieldErrors,
    }, { status: 400 });
  }

  // Get repositories
  const repos = getRepositories();

  try {
    let recordId: string;

    if (spec.target === 'lead') {
      // Map to lead and create
      const input = mapToLead(spec, normalizedValues, locale);
      const record = await repos.leads.create(input);
      recordId = record.id;
    } else {
      // Map to request and create
      const input = mapToRequest(spec, normalizedValues, locale);
      const record = await repos.requests.create(input);
      recordId = record.id;
    }

    return json({
      ok: true,
      id: recordId,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[forms/submit] Error: ${message}`);

    return json({
      ok: false,
      error: 'forms.errors.serverError',
    }, { status: 500 });
  }
};
