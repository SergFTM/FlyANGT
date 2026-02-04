/**
 * Publish Configuration
 *
 * Dev tool only.
 * Configures publish packet generation and checklist.
 */

/**
 * Publish file identifiers
 */
export type PublishFileId =
  | 'rc_bundle'
  | 'rc_snapshot'
  | 'rc_gate'
  | 'rc_release'
  | 'rc_smoke'
  | 'release_notes_en_md'
  | 'release_notes_ru_md'
  | 'release_notes_en_json'
  | 'release_notes_ru_json'
  | 'manifest'
  | 'deployment_steps_en'
  | 'deployment_steps_ru'
  | 'publish_checklist';

/**
 * Publish file configuration
 */
export interface PublishFile {
  id: PublishFileId;
  enabled: boolean;
}

/**
 * Checklist item priority
 */
export type ChecklistPriority = 'p0' | 'p1' | 'p2';

/**
 * Publish checklist item
 */
export interface PublishChecklistItem {
  id: string;
  titleKey: string;
  priority: ChecklistPriority;
  defaultChecked: boolean;
}

/**
 * Storage configuration
 */
export interface PublishStorage {
  packetsKey: string;
  selectedPacketKey: string;
  checklistKeyPrefix: string;
}

/**
 * Templates configuration
 */
export interface PublishTemplates {
  deploymentStepsEn: string[];
  deploymentStepsRu: string[];
}

/**
 * Links configuration
 */
export interface PublishLinks {
  rcPath: string;
  gatePath: string;
  exportPath: string;
  releaseNotesPath: string;
  smokePath: string;
  releasePath: string;
}

/**
 * Complete publish configuration
 */
export interface PublishConfig {
  enabled: boolean;
  devOnly: boolean;
  storage: PublishStorage;
  exportFilePrefix: string;
  files: PublishFile[];
  checklist: PublishChecklistItem[];
  templates: PublishTemplates;
  links: PublishLinks;
}

/**
 * Default publish configuration
 *
 * Dev tool only.
 */
export const publishConfig: PublishConfig = {
  enabled: true,
  devOnly: true,

  storage: {
    packetsKey: 'flyangt_publish_packets',
    selectedPacketKey: 'flyangt_publish_selected',
    checklistKeyPrefix: 'flyangt_publish_checklist_',
  },

  exportFilePrefix: 'flyangt-publish',

  files: [
    { id: 'rc_bundle', enabled: true },
    { id: 'rc_snapshot', enabled: true },
    { id: 'rc_gate', enabled: true },
    { id: 'rc_release', enabled: true },
    { id: 'rc_smoke', enabled: true },
    { id: 'release_notes_en_md', enabled: true },
    { id: 'release_notes_ru_md', enabled: true },
    { id: 'release_notes_en_json', enabled: true },
    { id: 'release_notes_ru_json', enabled: true },
    { id: 'manifest', enabled: true },
    { id: 'deployment_steps_en', enabled: true },
    { id: 'deployment_steps_ru', enabled: true },
    { id: 'publish_checklist', enabled: true },
  ],

  checklist: [
    {
      id: 'gate_green',
      titleKey: 'publish.check.gate_green.title',
      priority: 'p0',
      defaultChecked: false,
    },
    {
      id: 'smoke_p0_pass',
      titleKey: 'publish.check.smoke_p0_pass.title',
      priority: 'p0',
      defaultChecked: false,
    },
    {
      id: 'release_p0_done',
      titleKey: 'publish.check.release_p0_done.title',
      priority: 'p0',
      defaultChecked: false,
    },
    {
      id: 'snapshot_created',
      titleKey: 'publish.check.snapshot_created.title',
      priority: 'p0',
      defaultChecked: false,
    },
    {
      id: 'bundle_created',
      titleKey: 'publish.check.bundle_created.title',
      priority: 'p0',
      defaultChecked: false,
    },
    {
      id: 'release_notes_reviewed',
      titleKey: 'publish.check.release_notes_reviewed.title',
      priority: 'p0',
      defaultChecked: false,
    },
    {
      id: 'known_issues_updated',
      titleKey: 'publish.check.known_issues_updated.title',
      priority: 'p1',
      defaultChecked: false,
    },
    {
      id: 'trust_center_checked',
      titleKey: 'publish.check.trust_center_checked.title',
      priority: 'p1',
      defaultChecked: false,
    },
    {
      id: 'presale_flow_reviewed',
      titleKey: 'publish.check.presale_flow_reviewed.title',
      priority: 'p1',
      defaultChecked: false,
    },
    {
      id: 'build_passes',
      titleKey: 'publish.check.build_passes.title',
      priority: 'p0',
      defaultChecked: false,
    },
    {
      id: 'dev_tools_blocked',
      titleKey: 'publish.check.dev_tools_blocked.title',
      priority: 'p0',
      defaultChecked: false,
    },
    {
      id: 'i18n_complete',
      titleKey: 'publish.check.i18n_complete.title',
      priority: 'p1',
      defaultChecked: false,
    },
    {
      id: 'team_signoff',
      titleKey: 'publish.check.team_signoff.title',
      priority: 'p2',
      defaultChecked: false,
    },
    {
      id: 'stakeholder_approval',
      titleKey: 'publish.check.stakeholder_approval.title',
      priority: 'p2',
      defaultChecked: false,
    },
  ],

  templates: {
    deploymentStepsEn: [
      'publish.deploy.step1.en',
      'publish.deploy.step2.en',
      'publish.deploy.step3.en',
      'publish.deploy.step4.en',
      'publish.deploy.step5.en',
      'publish.deploy.step6.en',
    ],
    deploymentStepsRu: [
      'publish.deploy.step1.ru',
      'publish.deploy.step2.ru',
      'publish.deploy.step3.ru',
      'publish.deploy.step4.ru',
      'publish.deploy.step5.ru',
      'publish.deploy.step6.ru',
    ],
  },

  links: {
    rcPath: '/rc',
    gatePath: '/gate',
    exportPath: '/export',
    releaseNotesPath: '/release-notes',
    smokePath: '/smoke',
    releasePath: '/release',
  },
};

/**
 * Get enabled files
 */
export function getEnabledFiles(): PublishFile[] {
  return publishConfig.files.filter(f => f.enabled);
}

/**
 * Get checklist items sorted by priority
 */
export function getSortedChecklist(): PublishChecklistItem[] {
  const priorityOrder: Record<ChecklistPriority, number> = { p0: 0, p1: 1, p2: 2 };
  return [...publishConfig.checklist].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
}

/**
 * Get P0 checklist items
 */
export function getP0ChecklistItems(): PublishChecklistItem[] {
  return publishConfig.checklist.filter(item => item.priority === 'p0');
}
