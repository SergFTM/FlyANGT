/**
 * Configurator Configuration
 *
 * Option groups, pricing, and persistence settings for the aircraft configurator.
 *
 * All values are illustrative for MVP.
 * Final specifications confirmed in documentation/contract.
 */

import type { TranslationKey } from './i18n.config';

// Option identifier
export type OptionId = string;

// Option group identifiers
export type OptionGroupId = 'model' | 'exterior' | 'interior' | 'avionics' | 'safety' | 'packages';

// Single configuration option
export interface ConfigOption {
  id: OptionId;
  titleKey: TranslationKey;
  descriptionKey?: TranslationKey;
  priceUsd: number;
  tags?: string[];
  default?: boolean;
}

// Option group
export interface OptionGroup {
  id: OptionGroupId;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  selectionMode: 'single' | 'multi';
  options: ConfigOption[];
}

// Pricing configuration
export interface PricingConfig {
  showEstimate: boolean;
  noteKey: TranslationKey;
}

// Persistence configuration
export interface PersistenceConfig {
  localStorageKey: string;
  shareParamKey: string;
}

// Main configurator configuration
export interface ConfiguratorConfig {
  enabled: boolean;
  currency: 'USD';
  groups: OptionGroup[];
  pricing: PricingConfig;
  persistence: PersistenceConfig;
}

/**
 * Configurator configuration
 *
 * Illustrative MVP values - not real pricing.
 */
export const configuratorConfig: ConfiguratorConfig = {
  enabled: true,
  currency: 'USD',
  groups: [
    // Model selection (single)
    {
      id: 'model',
      titleKey: 'cfg.group.model',
      descriptionKey: 'cfg.group.model.desc',
      selectionMode: 'single',
      options: [
        {
          id: 'model-light',
          titleKey: 'cfg.opt.model.light',
          descriptionKey: 'cfg.opt.model.light.desc',
          priceUsd: 450000,
          tags: ['economy', 'training'],
          default: true,
        },
        {
          id: 'model-standard',
          titleKey: 'cfg.opt.model.standard',
          descriptionKey: 'cfg.opt.model.standard.desc',
          priceUsd: 620000,
          tags: ['versatile'],
        },
        {
          id: 'model-performance',
          titleKey: 'cfg.opt.model.performance',
          descriptionKey: 'cfg.opt.model.performance.desc',
          priceUsd: 780000,
          tags: ['speed', 'range'],
        },
        {
          id: 'model-executive',
          titleKey: 'cfg.opt.model.executive',
          descriptionKey: 'cfg.opt.model.executive.desc',
          priceUsd: 950000,
          tags: ['luxury', 'business'],
        },
      ],
    },

    // Exterior options (single)
    {
      id: 'exterior',
      titleKey: 'cfg.group.exterior',
      descriptionKey: 'cfg.group.exterior.desc',
      selectionMode: 'single',
      options: [
        {
          id: 'ext-white',
          titleKey: 'cfg.opt.ext.white',
          priceUsd: 0,
          default: true,
        },
        {
          id: 'ext-silver',
          titleKey: 'cfg.opt.ext.silver',
          priceUsd: 8500,
        },
        {
          id: 'ext-blue',
          titleKey: 'cfg.opt.ext.blue',
          priceUsd: 12000,
        },
        {
          id: 'ext-black',
          titleKey: 'cfg.opt.ext.black',
          priceUsd: 15000,
        },
        {
          id: 'ext-custom',
          titleKey: 'cfg.opt.ext.custom',
          descriptionKey: 'cfg.opt.ext.custom.desc',
          priceUsd: 25000,
        },
      ],
    },

    // Interior options (single)
    {
      id: 'interior',
      titleKey: 'cfg.group.interior',
      descriptionKey: 'cfg.group.interior.desc',
      selectionMode: 'single',
      options: [
        {
          id: 'int-standard',
          titleKey: 'cfg.opt.int.standard',
          descriptionKey: 'cfg.opt.int.standard.desc',
          priceUsd: 0,
          default: true,
        },
        {
          id: 'int-comfort',
          titleKey: 'cfg.opt.int.comfort',
          descriptionKey: 'cfg.opt.int.comfort.desc',
          priceUsd: 18000,
        },
        {
          id: 'int-executive',
          titleKey: 'cfg.opt.int.executive',
          descriptionKey: 'cfg.opt.int.executive.desc',
          priceUsd: 35000,
        },
        {
          id: 'int-luxury',
          titleKey: 'cfg.opt.int.luxury',
          descriptionKey: 'cfg.opt.int.luxury.desc',
          priceUsd: 55000,
        },
      ],
    },

    // Avionics options (single)
    {
      id: 'avionics',
      titleKey: 'cfg.group.avionics',
      descriptionKey: 'cfg.group.avionics.desc',
      selectionMode: 'single',
      options: [
        {
          id: 'avio-basic',
          titleKey: 'cfg.opt.avio.basic',
          descriptionKey: 'cfg.opt.avio.basic.desc',
          priceUsd: 0,
          default: true,
        },
        {
          id: 'avio-advanced',
          titleKey: 'cfg.opt.avio.advanced',
          descriptionKey: 'cfg.opt.avio.advanced.desc',
          priceUsd: 42000,
        },
        {
          id: 'avio-premium',
          titleKey: 'cfg.opt.avio.premium',
          descriptionKey: 'cfg.opt.avio.premium.desc',
          priceUsd: 75000,
        },
        {
          id: 'avio-integrated',
          titleKey: 'cfg.opt.avio.integrated',
          descriptionKey: 'cfg.opt.avio.integrated.desc',
          priceUsd: 120000,
        },
      ],
    },

    // Safety options (multi)
    {
      id: 'safety',
      titleKey: 'cfg.group.safety',
      descriptionKey: 'cfg.group.safety.desc',
      selectionMode: 'multi',
      options: [
        {
          id: 'safe-parachute',
          titleKey: 'cfg.opt.safe.parachute',
          descriptionKey: 'cfg.opt.safe.parachute.desc',
          priceUsd: 28000,
          default: true,
        },
        {
          id: 'safe-tracker',
          titleKey: 'cfg.opt.safe.tracker',
          descriptionKey: 'cfg.opt.safe.tracker.desc',
          priceUsd: 4500,
        },
        {
          id: 'safe-beacon',
          titleKey: 'cfg.opt.safe.beacon',
          descriptionKey: 'cfg.opt.safe.beacon.desc',
          priceUsd: 3200,
        },
        {
          id: 'safe-oxygen',
          titleKey: 'cfg.opt.safe.oxygen',
          descriptionKey: 'cfg.opt.safe.oxygen.desc',
          priceUsd: 8500,
        },
        {
          id: 'safe-fire',
          titleKey: 'cfg.opt.safe.fire',
          descriptionKey: 'cfg.opt.safe.fire.desc',
          priceUsd: 5500,
        },
      ],
    },

    // Packages (multi)
    {
      id: 'packages',
      titleKey: 'cfg.group.packages',
      descriptionKey: 'cfg.group.packages.desc',
      selectionMode: 'multi',
      options: [
        {
          id: 'pkg-training',
          titleKey: 'cfg.opt.pkg.training',
          descriptionKey: 'cfg.opt.pkg.training.desc',
          priceUsd: 15000,
          default: true,
        },
        {
          id: 'pkg-maintenance',
          titleKey: 'cfg.opt.pkg.maintenance',
          descriptionKey: 'cfg.opt.pkg.maintenance.desc',
          priceUsd: 12000,
        },
        {
          id: 'pkg-warranty',
          titleKey: 'cfg.opt.pkg.warranty',
          descriptionKey: 'cfg.opt.pkg.warranty.desc',
          priceUsd: 22000,
        },
        {
          id: 'pkg-delivery',
          titleKey: 'cfg.opt.pkg.delivery',
          descriptionKey: 'cfg.opt.pkg.delivery.desc',
          priceUsd: 8000,
        },
        {
          id: 'pkg-insurance',
          titleKey: 'cfg.opt.pkg.insurance',
          descriptionKey: 'cfg.opt.pkg.insurance.desc',
          priceUsd: 18000,
        },
        {
          id: 'pkg-hangar',
          titleKey: 'cfg.opt.pkg.hangar',
          descriptionKey: 'cfg.opt.pkg.hangar.desc',
          priceUsd: 6000,
        },
      ],
    },
  ],
  pricing: {
    showEstimate: true,
    noteKey: 'cfg.pricing.note',
  },
  persistence: {
    localStorageKey: 'flyangt_configurator_state',
    shareParamKey: 'cfg',
  },
};

/**
 * Get option group by ID
 */
export function getOptionGroup(groupId: OptionGroupId): OptionGroup | undefined {
  return configuratorConfig.groups.find(g => g.id === groupId);
}

/**
 * Get option by ID within a group
 */
export function getOption(groupId: OptionGroupId, optionId: OptionId): ConfigOption | undefined {
  const group = getOptionGroup(groupId);
  return group?.options.find(o => o.id === optionId);
}

/**
 * Get all option group IDs
 */
export function getGroupIds(): OptionGroupId[] {
  return configuratorConfig.groups.map(g => g.id);
}
