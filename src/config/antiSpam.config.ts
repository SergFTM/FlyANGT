/**
 * Anti-Spam Configuration
 *
 * Best-effort spam and abuse protections for form submissions.
 * In-memory rate limiting resets on server restart.
 *
 * Protections:
 * - Payload size limit
 * - Honeypot field detection
 * - Per-IP rate limiting
 * - Per-IP+formId rate limiting
 * - Temporary bans for repeated violations
 * - Client-side cooldown
 */

/**
 * Anti-spam configuration type
 */
export interface AntiSpamConfig {
  enabled: boolean;
  payload: {
    /** Maximum payload size in bytes */
    maxBytes: number;
  };
  honeypot: {
    /** Whether honeypot detection is enabled */
    enabled: boolean;
    /** Hidden field ID that should remain empty */
    fieldId: string;
    /** Optional label key if ever visible */
    labelKey: string;
  };
  rateLimit: {
    /** Whether rate limiting is enabled */
    enabled: boolean;
    /** Per-IP limits */
    ip: {
      /** Time window in seconds */
      windowSec: number;
      /** Maximum requests per window */
      max: number;
    };
    /** Per-IP+formId limits */
    ipForm: {
      /** Time window in seconds */
      windowSec: number;
      /** Maximum requests per window per form */
      max: number;
    };
    /** Ban configuration for repeated violations */
    ban: {
      /** Whether banning is enabled */
      enabled: boolean;
      /** Ban duration in seconds */
      banSec: number;
      /** Number of violations within window to trigger ban */
      threshold: number;
    };
  };
  cooldown: {
    /** Whether client-side cooldown is enabled */
    enabled: boolean;
    /** Cooldown duration in seconds */
    seconds: number;
    /** LocalStorage key prefix */
    storageKeyPrefix: string;
  };
}

/**
 * Default anti-spam configuration
 *
 * Best-effort protection.
 * In-memory rate limiting resets on server restart.
 */
export const antiSpamConfig: AntiSpamConfig = {
  enabled: true,

  // Payload size protection
  payload: {
    maxBytes: 20_000, // 20KB
  },

  // Honeypot field (hidden field that must be empty)
  honeypot: {
    enabled: true,
    fieldId: 'company', // Hidden field ID
    labelKey: 'forms.honeypot.label',
  },

  // Server-side rate limiting (in-memory)
  rateLimit: {
    enabled: true,
    // Per-IP limits
    ip: {
      windowSec: 60, // 1 minute window
      max: 20, // Max 20 requests per minute
    },
    // Per-IP+formId limits
    ipForm: {
      windowSec: 60, // 1 minute window
      max: 5, // Max 5 submissions per form per minute
    },
    // Ban for repeated violations
    ban: {
      enabled: true,
      banSec: 600, // 10 minute ban
      threshold: 3, // After 3 violations
    },
  },

  // Client-side cooldown
  cooldown: {
    enabled: true,
    seconds: 20, // 20 second cooldown between submissions
    storageKeyPrefix: 'flyangt_form_cooldown:',
  },
};

/**
 * Get honeypot field ID
 */
export function getHoneypotFieldId(): string {
  return antiSpamConfig.honeypot.fieldId;
}

/**
 * Get cooldown storage key for a form
 */
export function getCooldownKey(formId: string): string {
  return `${antiSpamConfig.cooldown.storageKeyPrefix}${formId}`;
}

/**
 * Check if anti-spam is enabled
 */
export function isAntiSpamEnabled(): boolean {
  return antiSpamConfig.enabled;
}
