/**
 * Adapters Index
 *
 * Central factory for repository instances.
 * Storage mode is controlled by /src/config/storage.config.ts
 *
 * MVP: Uses file-based config DB (mode: 'config')
 * Future: Will use Prisma/Postgres (mode: 'prisma')
 */

import type { Repositories } from '$lib/domain/repositories';
import { getConfigLeadRepository, getConfigRequestRepository } from './configDb';
import { storageConfig, getStorageMode, type StorageMode } from '$config/storage.config';

/**
 * Database adapter type (legacy alias for StorageMode)
 * @deprecated Use StorageMode from storage.config.ts
 */
export type AdapterType = 'configDb' | 'prisma';

/**
 * Error thrown when Prisma mode is selected but not available
 */
export class PrismaModeNotAvailableError extends Error {
  constructor() {
    super(
      'Prisma mode is not enabled in MVP. ' +
      'The application is configured for Prisma storage but Prisma is not installed. ' +
      `See ${storageConfig.notes.migrationDocPath} for migration instructions.`
    );
    this.name = 'PrismaModeNotAvailableError';
  }
}

/**
 * Get repository instances
 *
 * Returns the appropriate repository implementations based on the storage mode
 * configured in /src/config/storage.config.ts
 *
 * For MVP: Returns config file-based repositories (mode: 'config')
 * For production: Will return Prisma repositories (mode: 'prisma')
 *
 * @throws {PrismaModeNotAvailableError} If mode is 'prisma' but Prisma is not installed
 */
export function getRepositories(): Repositories {
  const mode = getStorageMode();

  if (mode === 'prisma') {
    // Prisma mode requested but not available in MVP
    // This error provides clear guidance to developers
    throw new PrismaModeNotAvailableError();
  }

  // Default: Config file-based repositories (MVP)
  return {
    leads: getConfigLeadRepository(),
    requests: getConfigRequestRepository(),
  };
}

/**
 * Get the current storage mode
 *
 * Re-exported from storage.config for convenience
 */
export { getStorageMode } from '$config/storage.config';

/**
 * Get the current adapter type (legacy compatibility)
 * @deprecated Use getStorageMode() instead
 */
export function getCurrentAdapter(): AdapterType {
  const mode = getStorageMode();
  return mode === 'config' ? 'configDb' : 'prisma';
}

/**
 * Check if using file-based storage
 */
export function isFileBasedStorage(): boolean {
  return getStorageMode() === 'config';
}

/**
 * Check if using Prisma storage
 */
export function isPrismaStorage(): boolean {
  return getStorageMode() === 'prisma';
}
