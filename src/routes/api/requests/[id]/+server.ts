/**
 * Request Detail API Endpoint
 *
 * GET /api/requests/:id - Get request by ID (dev only)
 * PATCH /api/requests/:id - Update request status/notes/tags (dev only)
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
 * GET /api/requests/:id
 * Get a single request by ID (dev only)
 */
export const GET: RequestHandler = async ({ params }) => {
  assertDevOnly();

  try {
    const repos = getRepositories();
    const request = await repos.requests.getById(params.id);

    if (!request) {
      throw error(404, 'Request not found');
    }

    return json({
      ok: true,
      data: request,
    });
  } catch (err) {
    if (err && typeof err === 'object' && 'status' in err) {
      throw err; // Re-throw SvelteKit errors
    }
    console.error('Failed to get request:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return json(
      { ok: false, errors: [message] },
      { status: 500 }
    );
  }
};

/**
 * PATCH /api/requests/:id
 * Update request status, notes, tags, or archive (dev only)
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

    // Update request
    const repos = getRepositories();
    const updated = await repos.requests.update(params.id, patch);

    return json({
      ok: true,
      record: updated,
    });
  } catch (err) {
    if (err && typeof err === 'object' && 'status' in err) {
      throw err;
    }
    console.error('Failed to update request:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';

    // Check for not found error
    if (message.includes('not found')) {
      throw error(404, 'Request not found');
    }

    return json(
      { ok: false, errors: [message] },
      { status: 500 }
    );
  }
};
