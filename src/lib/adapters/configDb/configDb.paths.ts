/**
 * Config DB Paths
 *
 * Resolves file system paths for the config-based database.
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Get the project root directory
 * In SvelteKit, we need to resolve relative to the source
 */
function getProjectRoot(): string {
  // In Node.js/SvelteKit server context
  // We use process.cwd() which points to the project root
  return process.cwd();
}

/**
 * Base path for the config database
 */
export function getDbBasePath(): string {
  return join(getProjectRoot(), 'src', 'data', 'db');
}

/**
 * Path to leads storage directory
 */
export function getLeadsPath(): string {
  return join(getDbBasePath(), 'leads');
}

/**
 * Path to requests storage directory
 */
export function getRequestsPath(): string {
  return join(getDbBasePath(), 'requests');
}

/**
 * Path to a specific lead file
 */
export function getLeadFilePath(id: string): string {
  return join(getLeadsPath(), `${id}.json`);
}

/**
 * Path to a specific request file
 */
export function getRequestFilePath(id: string): string {
  return join(getRequestsPath(), `${id}.json`);
}

/**
 * Path to index file (optional, for quick listing)
 */
export function getIndexPath(collection: 'leads' | 'requests'): string {
  return join(getDbBasePath(), `${collection}-index.json`);
}
