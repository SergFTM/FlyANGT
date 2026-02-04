/**
 * Post Release Configuration
 *
 * Dev-only tool for generating post-release reports.
 */

/**
 * Storage configuration
 */
export interface PostReleaseStorageConfig {
  reportsKey: string;
  selectedReportKey: string;
}

/**
 * Template configuration
 */
export interface PostReleaseTemplatesConfig {
  defaultActionItemsEn: string[];
  defaultActionItemsRu: string[];
}

/**
 * Links configuration
 */
export interface PostReleaseLinksConfig {
  publishPath: string;
  gatePath: string;
  releaseNotesPath: string;
}

/**
 * Complete post-release configuration
 */
export interface PostReleaseConfig {
  enabled: boolean;
  devOnly: boolean;
  storage: PostReleaseStorageConfig;
  exportFilePrefix: string;
  templates: PostReleaseTemplatesConfig;
  links: PostReleaseLinksConfig;
}

/**
 * Default post-release configuration
 */
export const postReleaseConfig: PostReleaseConfig = {
  // Post-release reporting enabled
  enabled: true,

  // Only available in development mode
  devOnly: true,

  // Storage keys
  storage: {
    reportsKey: 'flyangt_post_release_reports',
    selectedReportKey: 'flyangt_post_release_selected',
  },

  // Export file prefix
  exportFilePrefix: 'flyangt-post-release',

  // Default templates
  templates: {
    defaultActionItemsEn: [
      'Review deployment logs',
      'Update documentation',
      'Notify stakeholders',
    ],
    defaultActionItemsRu: [
      'Проверить логи развертывания',
      'Обновить документацию',
      'Уведомить стейкхолдеров',
    ],
  },

  // Related links
  links: {
    publishPath: '/publish',
    gatePath: '/gate',
    releaseNotesPath: '/release-notes',
  },
};
