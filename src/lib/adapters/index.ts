/**
 * Adapters Index
 *
 * Central factory for repository instances.
 * Currently uses config file-based storage (MVP).
 * Can be switched to Prisma by changing the implementation below.
 */

import type { Repositories } from '$lib/domain/repositories';
import { getConfigLeadRepository, getConfigRequestRepository } from './configDb';

/**
 * Database adapter type
 * - 'configDb': File-based storage (MVP)
 * - 'prisma': Postgres via Prisma (future migration)
 */
export type AdapterType = 'configDb' | 'prisma';

/**
 * Current adapter type
 * Change this to 'prisma' when migrating to Postgres
 */
const CURRENT_ADAPTER: AdapterType = 'configDb';

/**
 * Get repository instances
 *
 * Returns the appropriate repository implementations based on the current adapter.
 * For MVP, this returns config file-based repositories.
 * For production migration, switch CURRENT_ADAPTER to 'prisma'.
 */
export function getRepositories(): Repositories {
  if (CURRENT_ADAPTER === 'prisma') {
    // Future: import and return Prisma repositories
    // import { getPrismaRepositories } from './prismaDb';
    // return getPrismaRepositories();
    throw new Error('Prisma adapter not implemented. Set CURRENT_ADAPTER to "configDb".');
  }

  // Default: Config file-based repositories (MVP)
  return {
    leads: getConfigLeadRepository(),
    requests: getConfigRequestRepository(),
  };
}

/**
 * Get the current adapter type
 */
export function getCurrentAdapter(): AdapterType {
  return CURRENT_ADAPTER;
}

/**
 * Check if using file-based storage
 */
export function isFileBasedStorage(): boolean {
  return CURRENT_ADAPTER === 'configDb';
}

/**
 * Check if using Prisma storage
 */
export function isPrismaStorage(): boolean {
  return CURRENT_ADAPTER === 'prisma';
}
