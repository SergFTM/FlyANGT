/**
 * Requests API Endpoint
 *
 * POST /api/requests - Create a new request
 * GET /api/requests - List requests (dev only)
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getRepositories } from '$lib/adapters';
import { validateRequestInput, isValidSource, isValidStatus } from '$lib/domain/types';
import type { CreateRequestInput, SubmissionSource, WorkflowStatus } from '$lib/domain/types';
import { dev } from '$app/environment';

/**
 * POST /api/requests
 * Create a new request record
 */
export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();

    // Validate input
    const validation = validateRequestInput(body);
    if (!validation.valid) {
      return json(
        { ok: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Create request
    const repos = getRepositories();
    const input: CreateRequestInput = {
      source: body.source,
      locale: body.locale,
      payload: body.payload,
    };

    const requestRecord = await repos.requests.create(input);

    return json({
      ok: true,
      id: requestRecord.id,
      createdAt: requestRecord.createdAt,
    });
  } catch (err) {
    console.error('Failed to create request:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return json(
      { ok: false, errors: [message] },
      { status: 500 }
    );
  }
};

/**
 * GET /api/requests
 * List requests (dev only for security)
 */
export const GET: RequestHandler = async ({ url }) => {
  // Restrict to dev mode unless a secret token is provided
  const token = url.searchParams.get('token');
  const devToken = import.meta.env.VITE_API_DEV_TOKEN;

  if (!dev && token !== devToken) {
    throw error(404, 'Not found');
  }

  try {
    const repos = getRepositories();

    // Parse query params
    const source = url.searchParams.get('source');
    const status = url.searchParams.get('status');
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);

    const params: { source?: SubmissionSource; status?: WorkflowStatus; limit: number } = { limit };
    if (source && isValidSource(source)) {
      params.source = source;
    }
    if (status && isValidStatus(status)) {
      params.status = status;
    }

    const requests = await repos.requests.list(params);
    const countParams: { source?: SubmissionSource; status?: WorkflowStatus } = {};
    if (params.source) countParams.source = params.source;
    if (params.status) countParams.status = params.status;
    const count = await repos.requests.count(Object.keys(countParams).length > 0 ? countParams : undefined);

    return json({
      ok: true,
      data: requests,
      total: count,
      limit,
    });
  } catch (err) {
    console.error('Failed to list requests:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return json(
      { ok: false, errors: [message] },
      { status: 500 }
    );
  }
};
