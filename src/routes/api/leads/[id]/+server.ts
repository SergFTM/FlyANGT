/**
 * Lead Detail API Endpoint
 *
 * GET /api/leads/:id - Get lead by ID (dev only)
 * PATCH /api/leads/:id - Update lead status/notes/tags (dev only)
 *
 * DEV ONLY: Returns 404 in production.
 * Not a security boundary - process gate only.
 */

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getRepositories } from '$lib/adapters';
import { validatePatch } from '$lib/domain/types';
import type { RecordPatch } from '$lib/domain/types';
import { dev } from '$app/environment';

/**
 * Dev guard - returns 404 in production
 */
function assertDevOnly() {
  if (!dev) {
    throw error(404, 'Not found');
  }
}

/**
 * GET /api/leads/:id
 * Get a single lead by ID (dev only)
 */
export const GET: RequestHandler = async ({ params }) => {
  assertDevOnly();

  try {
    const repos = getRepositories();
    const lead = await repos.leads.getById(params.id);

    if (!lead) {
      throw error(404, 'Lead not found');
    }

    return json({
      ok: true,
      data: lead,
    });
  } catch (err) {
    if (err && typeof err === 'object' && 'status' in err) {
      throw err; // Re-throw SvelteKit errors
    }
    console.error('Failed to get lead:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return json(
      { ok: false, errors: [message] },
      { status: 500 }
    );
  }
};

/**
 * PATCH /api/leads/:id
 * Update lead status, notes, tags, or archive (dev only)
 */
export const PATCH: RequestHandler = async ({ params, request }) => {
  assertDevOnly();

  try {
    const body = await request.json();

    // Validate patch input
    const validation = validatePatch(body);
    if (!validation.valid) {
      return json(
        { ok: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Build patch object
    const patch: RecordPatch = {};

    if (body.status !== undefined) {
      patch.status = body.status;
    }

    if (body.noteText) {
      patch.addNote = {
        text: body.noteText,
        author: body.noteAuthor,
      };
    }

    if (body.tags !== undefined) {
      patch.tags = body.tags;
    }

    if (body.archived !== undefined) {
      patch.archived = body.archived;
    }

    // Update lead
    const repos = getRepositories();
    const updated = await repos.leads.update(params.id, patch);

    return json({
      ok: true,
      record: updated,
    });
  } catch (err) {
    if (err && typeof err === 'object' && 'status' in err) {
      throw err;
    }
    console.error('Failed to update lead:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';

    // Check for not found error
    if (message.includes('not found')) {
      throw error(404, 'Lead not found');
    }

    return json(
      { ok: false, errors: [message] },
      { status: 500 }
    );
  }
};
