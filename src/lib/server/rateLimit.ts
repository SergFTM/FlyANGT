/**
 * Server-side Rate Limiter
 *
 * In-memory rate limiting with sliding window.
 * Resets on server restart.
 *
 * Best-effort protection for form submissions.
 */

import type { AntiSpamConfig } from '$config/antiSpam.config';

/**
 * Rate limit check result
 */
export type RateLimitResult =
  | { ok: true }
  | { ok: false; reason: 'rate_limited' | 'banned'; retryAfterSec: number };

/**
 * Ban record
 */
interface BanRecord {
  bannedUntil: number;
  violations: number[];
}

/**
 * In-memory storage for rate limiting
 */
const ipTimestamps = new Map<string, number[]>();
const ipFormTimestamps = new Map<string, number[]>();
const banRecords = new Map<string, BanRecord>();

/**
 * Get current time in seconds
 */
function nowSec(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Clean old timestamps outside the window
 */
function cleanOldTimestamps(timestamps: number[], windowSec: number): number[] {
  const cutoff = nowSec() - windowSec;
  return timestamps.filter(t => t > cutoff);
}

/**
 * Clean old violations outside the window
 */
function cleanOldViolations(violations: number[], windowSec: number): number[] {
  const cutoff = nowSec() - windowSec;
  return violations.filter(t => t > cutoff);
}

/**
 * Note a rate limit violation for potential banning
 */
export function noteViolation(ip: string, config: AntiSpamConfig): void {
  if (!config.rateLimit.ban.enabled) return;

  const now = nowSec();
  let record = banRecords.get(ip);

  if (!record) {
    record = { bannedUntil: 0, violations: [] };
    banRecords.set(ip, record);
  }

  // Clean old violations
  record.violations = cleanOldViolations(record.violations, config.rateLimit.ip.windowSec);

  // Add new violation
  record.violations.push(now);

  // Check if should ban
  if (record.violations.length >= config.rateLimit.ban.threshold) {
    record.bannedUntil = now + config.rateLimit.ban.banSec;
    record.violations = []; // Reset violations after banning
  }
}

/**
 * Check if IP is banned
 */
function checkBan(ip: string): { banned: boolean; retryAfterSec: number } {
  const record = banRecords.get(ip);
  if (!record) return { banned: false, retryAfterSec: 0 };

  const now = nowSec();
  if (record.bannedUntil > now) {
    return { banned: true, retryAfterSec: record.bannedUntil - now };
  }

  return { banned: false, retryAfterSec: 0 };
}

/**
 * Check rate limit
 */
export function checkRateLimit(
  ip: string,
  formId: string,
  config: AntiSpamConfig
): RateLimitResult {
  if (!config.rateLimit.enabled) {
    return { ok: true };
  }

  const now = nowSec();

  // Check ban first
  const banCheck = checkBan(ip);
  if (banCheck.banned) {
    return { ok: false, reason: 'banned', retryAfterSec: banCheck.retryAfterSec };
  }

  // Check per-IP rate limit
  let ipTs = ipTimestamps.get(ip) || [];
  ipTs = cleanOldTimestamps(ipTs, config.rateLimit.ip.windowSec);

  if (ipTs.length >= config.rateLimit.ip.max) {
    // Calculate retry after
    const oldest = ipTs[0];
    const retryAfterSec = Math.max(1, oldest + config.rateLimit.ip.windowSec - now);
    noteViolation(ip, config);
    return { ok: false, reason: 'rate_limited', retryAfterSec };
  }

  // Check per-IP+formId rate limit
  const ipFormKey = `${ip}:${formId}`;
  let ipFormTs = ipFormTimestamps.get(ipFormKey) || [];
  ipFormTs = cleanOldTimestamps(ipFormTs, config.rateLimit.ipForm.windowSec);

  if (ipFormTs.length >= config.rateLimit.ipForm.max) {
    // Calculate retry after
    const oldest = ipFormTs[0];
    const retryAfterSec = Math.max(1, oldest + config.rateLimit.ipForm.windowSec - now);
    noteViolation(ip, config);
    return { ok: false, reason: 'rate_limited', retryAfterSec };
  }

  // Record this request
  ipTs.push(now);
  ipFormTs.push(now);
  ipTimestamps.set(ip, ipTs);
  ipFormTimestamps.set(ipFormKey, ipFormTs);

  return { ok: true };
}

/**
 * Extract client IP from request
 */
export function getClientIp(request: Request): string {
  // Try X-Forwarded-For header first
  const xff = request.headers.get('x-forwarded-for');
  if (xff) {
    // Take the first IP in the list
    const firstIp = xff.split(',')[0].trim();
    if (firstIp) return firstIp;
  }

  // Fallback to X-Real-IP
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;

  // Fallback to a default (for local development)
  return '127.0.0.1';
}

/**
 * Cleanup old data (call periodically if needed)
 */
export function cleanupOld(maxAgeSec: number = 3600): void {
  const cutoff = nowSec() - maxAgeSec;

  // Clean IP timestamps
  for (const [ip, timestamps] of ipTimestamps.entries()) {
    const cleaned = timestamps.filter(t => t > cutoff);
    if (cleaned.length === 0) {
      ipTimestamps.delete(ip);
    } else {
      ipTimestamps.set(ip, cleaned);
    }
  }

  // Clean IP+form timestamps
  for (const [key, timestamps] of ipFormTimestamps.entries()) {
    const cleaned = timestamps.filter(t => t > cutoff);
    if (cleaned.length === 0) {
      ipFormTimestamps.delete(key);
    } else {
      ipFormTimestamps.set(key, cleaned);
    }
  }

  // Clean ban records
  const now = nowSec();
  for (const [ip, record] of banRecords.entries()) {
    if (record.bannedUntil < now && record.violations.length === 0) {
      banRecords.delete(ip);
    }
  }
}
