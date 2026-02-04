/**
 * Raw Export Transformer
 *
 * Builds a raw JSON export of all leads and requests.
 */

import type { LeadRecord, RequestRecord } from '$lib/domain/types';

/**
 * Raw export structure
 */
export interface RawExport {
  generatedAt: string;
  counts: {
    leads: number;
    requests: number;
  };
  leads: LeadRecord[];
  requests: RequestRecord[];
}

/**
 * Build raw export from leads and requests
 *
 * Records are sorted by createdAt descending (newest first).
 */
export function buildRawExport(
  leads: LeadRecord[],
  requests: RequestRecord[]
): RawExport {
  // Sort by createdAt descending
  const sortedLeads = [...leads].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const sortedRequests = [...requests].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return {
    generatedAt: new Date().toISOString(),
    counts: {
      leads: sortedLeads.length,
      requests: sortedRequests.length,
    },
    leads: sortedLeads,
    requests: sortedRequests,
  };
}
