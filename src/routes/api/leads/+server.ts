/**
 * Leads API Endpoint
 *
 * POST /api/leads - Create a new lead
 * GET /api/leads - List leads (dev only)
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getRepositories } from '$lib/adapters';
import { validateLeadInput, isValidSource, isValidStatus } from '$lib/domain/types';
import type { CreateLeadInput, SubmissionSource, WorkflowStatus } from '$lib/domain/types';
import { dev } from '$app/environment';

/**
 * POST /api/leads
 * Create a new lead record
 */
export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();

    // Validate input
    const validation = validateLeadInput(body);
    if (!validation.valid) {
      return json(
        { ok: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Create lead
    const repos = getRepositories();
    const input: CreateLeadInput = {
      source: body.source,
      locale: body.locale,
      email: body.email,
      name: body.name,
      phone: body.phone,
      country: body.country,
      company: body.company,
      investorType: body.investorType,
      ticket: body.ticket,
      interest: body.interest,
      notes: body.notes,
      meta: body.meta,
    };

    const lead = await repos.leads.create(input);

    return json({
      ok: true,
      id: lead.id,
      createdAt: lead.createdAt,
    });
  } catch (err) {
    console.error('Failed to create lead:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return json(
      { ok: false, errors: [message] },
      { status: 500 }
    );
  }
};

/**
 * GET /api/leads
 * List leads (dev only for security)
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

    const leads = await repos.leads.list(params);
    const countParams: { source?: SubmissionSource; status?: WorkflowStatus } = {};
    if (params.source) countParams.source = params.source;
    if (params.status) countParams.status = params.status;
    const count = await repos.leads.count(Object.keys(countParams).length > 0 ? countParams : undefined);

    return json({
      ok: true,
      data: leads,
      total: count,
      limit,
    });
  } catch (err) {
    console.error('Failed to list leads:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return json(
      { ok: false, errors: [message] },
      { status: 500 }
    );
  }
};
