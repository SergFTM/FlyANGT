/**
 * Path Resolution Helper
 *
 * Safe traversal of nested objects using dot paths.
 */

/**
 * Get value from object by dot path
 *
 * Supports paths like "artifacts.snapshot.configs.routes"
 * Returns undefined if path is invalid or missing
 */
export function getByDotPath(obj: unknown, path: string): unknown {
  if (obj === null || obj === undefined) {
    return undefined;
  }

  if (!path || path.trim() === '') {
    return obj;
  }

  const parts = path.split('.');
  let current: unknown = obj;

  for (const part of parts) {
    if (current === null || current === undefined) {
      return undefined;
    }

    if (typeof current !== 'object') {
      return undefined;
    }

    // Handle array index access if part is numeric
    if (Array.isArray(current)) {
      const index = parseInt(part, 10);
      if (isNaN(index) || index < 0 || index >= current.length) {
        return undefined;
      }
      current = current[index];
    } else {
      // Object access
      current = (current as Record<string, unknown>)[part];
    }
  }

  return current;
}

/**
 * Set value in object by dot path
 * Creates intermediate objects as needed
 */
export function setByDotPath(obj: Record<string, unknown>, path: string, value: unknown): void {
  if (!path || path.trim() === '') {
    return;
  }

  const parts = path.split('.');
  let current: Record<string, unknown> = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (current[part] === undefined || current[part] === null) {
      current[part] = {};
    }
    current = current[part] as Record<string, unknown>;
  }

  const lastPart = parts[parts.length - 1];
  current[lastPart] = value;
}
