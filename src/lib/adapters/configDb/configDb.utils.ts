/**
 * Config DB Utilities
 *
 * File system utilities for the config-based database.
 * Server-side only - uses Node.js fs module.
 */

import { readFile, writeFile, mkdir, readdir, unlink, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { dirname } from 'path';

/**
 * Generate a unique entity ID
 * Format: prefix-YYYYMMDDHHMMSS-random
 */
export function generateId(prefix: 'ld' | 'rq'): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const millis = String(now.getMilliseconds()).padStart(3, '0');

  // Add random suffix for uniqueness
  const rand = Math.random().toString(36).substring(2, 6);

  return `${prefix}-${year}${month}${day}${hours}${minutes}${seconds}${millis}-${rand}`;
}

/**
 * Ensure a directory exists
 */
export async function ensureDir(dirPath: string): Promise<void> {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true });
  }
}

/**
 * Safely write JSON to a file
 * - Ensures parent directory exists
 * - Writes atomically (write to temp, then rename - simplified for MVP)
 */
export async function safeWriteJson<T>(filePath: string, data: T): Promise<void> {
  try {
    // Ensure parent directory exists
    const dir = dirname(filePath);
    await ensureDir(dir);

    // Write JSON with pretty formatting
    const json = JSON.stringify(data, null, 2);
    await writeFile(filePath, json, 'utf-8');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to write file ${filePath}: ${message}`);
  }
}

/**
 * Safely read JSON from a file
 * - Returns null if file doesn't exist
 * - Throws on parse errors
 */
export async function safeReadJson<T>(filePath: string): Promise<T | null> {
  try {
    if (!existsSync(filePath)) {
      return null;
    }

    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to read file ${filePath}: ${message}`);
  }
}

/**
 * List all JSON files in a directory
 * Returns file names without extension
 */
export async function listJsonFiles(dirPath: string): Promise<string[]> {
  try {
    await ensureDir(dirPath);

    const entries = await readdir(dirPath, { withFileTypes: true });
    const jsonFiles = entries
      .filter(entry => entry.isFile() && entry.name.endsWith('.json'))
      .map(entry => entry.name.replace('.json', ''));

    return jsonFiles;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

/**
 * Delete a JSON file
 * Returns true if deleted, false if not found
 */
export async function deleteJsonFile(filePath: string): Promise<boolean> {
  try {
    if (!existsSync(filePath)) {
      return false;
    }

    await unlink(filePath);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}

/**
 * Get file stats (for sorting by creation time)
 */
export async function getFileStats(filePath: string): Promise<{ mtime: Date } | null> {
  try {
    const stats = await stat(filePath);
    return { mtime: stats.mtime };
  } catch {
    return null;
  }
}

/**
 * Delete all JSON files in a directory (DEV ONLY)
 * Used for backup overwrite restore.
 * Returns the number of files deleted.
 */
export async function clearJsonDir(dirPath: string): Promise<number> {
  try {
    await ensureDir(dirPath);

    const entries = await readdir(dirPath, { withFileTypes: true });
    const jsonFiles = entries.filter(entry => entry.isFile() && entry.name.endsWith('.json'));

    let deleted = 0;
    for (const entry of jsonFiles) {
      const filePath = `${dirPath}/${entry.name}`;
      await unlink(filePath);
      deleted++;
    }

    return deleted;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return 0;
    }
    throw error;
  }
}
