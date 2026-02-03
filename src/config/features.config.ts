/**
 * Feature Flags Configuration
 *
 * Enable/disable UI features without code changes.
 * These are UI toggles only, not business logic.
 */

export interface FeatureFlags {
  enablePresaleUI: boolean;
  enableDashboardUI: boolean;
  enable3DConfiguratorUI: boolean;
  enableNewsletterSignup: boolean;
  enableSocialSharing: boolean;
}

export const featureFlags: FeatureFlags = {
  // Disabled: presale UI not implemented yet
  enablePresaleUI: false,

  // Disabled: dashboard requires auth system
  enableDashboardUI: false,

  // Disabled: 3D configurator is future feature
  enable3DConfiguratorUI: false,

  // Disabled: newsletter requires backend
  enableNewsletterSignup: false,

  // Enabled: social sharing is static links
  enableSocialSharing: false,
};

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  return featureFlags[feature] ?? false;
}
