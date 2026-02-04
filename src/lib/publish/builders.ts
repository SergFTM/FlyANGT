/**
 * Publish Builders
 *
 * Functions to build publish packet content and files.
 */

import { browser } from '$app/environment';
import type { RcRecord } from '$lib/models/rc.model';
import { loadRcRecords, findRcById } from '$lib/rc/rcStorage';
import { getByDotPath } from '$lib/rc/path';
import { diffValues, type DiffGroupReport } from '$lib/rc/diff';
import { readReleaseP0Summary, readSmokeP0Summary, computeGateStatus } from '$lib/devtools/readiness';
import {
  buildReadinessSummary,
  buildQualitySummary,
  buildDiffReports,
  buildHighlights,
  buildChangelogDocs,
  buildLinksList,
  buildReleaseNotesDoc,
} from '$lib/releaseNotes/builders';
import {
  renderReleaseNotesMd,
  getReleaseNotesStrings,
} from '$lib/releaseNotes/markdown';
import { publishConfig, type PublishFileId } from '$config/publish.config';
import type { RcCompareConfig, RcCompareGroup } from '$config/rc-compare.config';
import type { ChangelogConfig } from '$config/changelog.config';
import type { ReleaseNotesConfig } from '$config/release-notes.config';
import type {
  PublishPacket,
  PublishFile,
  PublishManifest,
  DeploymentStep,
  ChecklistItemState,
  ChecklistValidation,
} from './types';
import { createEmptyPacket } from './types';
import type { KnownIssue } from '$lib/releaseNotes/knownIssues.model';
import type { ReleaseNotesDoc } from '$lib/releaseNotes/types';

/**
 * Build publish manifest from current state
 */
export function buildPublishManifest(
  rcFrom: string,
  rcTo: string,
  knownIssuesCount: number,
  filesCount: number,
  checklist: ChecklistItemState[]
): PublishManifest {
  const releaseP0 = readReleaseP0Summary();
  const smokeP0 = readSmokeP0Summary();
  const gateStatus = computeGateStatus(releaseP0, smokeP0);

  const checklistComplete = checklist.filter(i => i.checked).length;

  return {
    version: '1.0.0',
    buildDate: new Date().toISOString(),
    rcFrom,
    rcTo,
    gateStatus,
    releaseP0Done: releaseP0.p0Done,
    releaseP0Total: releaseP0.p0Total,
    smokeP0Pass: smokeP0.p0Pass,
    smokeP0Total: smokeP0.p0Total,
    knownIssuesCount,
    filesCount,
    checklistComplete,
    checklistTotal: publishConfig.checklistItems.length,
  };
}

/**
 * Build default deployment steps
 */
export function buildDeploymentSteps(): DeploymentStep[] {
  return [
    {
      step: 1,
      textEn: '1. Create production backup',
      textRu: '1. Создать резервную копию продакшена',
      completed: false,
    },
    {
      step: 2,
      textEn: '2. Deploy to staging environment',
      textRu: '2. Развернуть на staging-окружении',
      completed: false,
    },
    {
      step: 3,
      textEn: '3. Run smoke tests on staging',
      textRu: '3. Запустить дымовые тесты на staging',
      completed: false,
    },
    {
      step: 4,
      textEn: '4. Deploy to production',
      textRu: '4. Развернуть на продакшене',
      completed: false,
    },
    {
      step: 5,
      textEn: '5. Verify production deployment',
      textRu: '5. Проверить развёртывание на продакшене',
      completed: false,
    },
    {
      step: 6,
      textEn: '6. Notify stakeholders of release',
      textRu: '6. Уведомить стейкхолдеров о релизе',
      completed: false,
    },
  ];
}

/**
 * Build default checklist state
 */
export function buildDefaultChecklist(): ChecklistItemState[] {
  return publishConfig.checklistItems.map(item => ({
    id: item.id,
    checked: item.defaultChecked,
    checkedAt: item.defaultChecked ? new Date().toISOString() : undefined,
  }));
}

/**
 * Build RC bundle file content
 */
export function buildRcBundleFile(rcA: RcRecord, rcB: RcRecord): PublishFile {
  const content = JSON.stringify(
    {
      from: rcA,
      to: rcB,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );

  return {
    id: 'rc_bundle',
    filename: `${publishConfig.exportFilePrefix}-rc-bundle.json`,
    content,
    format: 'json',
    generated: true,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Build RC snapshot file content
 */
export function buildRcSnapshotFile(rcB: RcRecord): PublishFile {
  const content = JSON.stringify(rcB, null, 2);

  return {
    id: 'rc_snapshot',
    filename: `${publishConfig.exportFilePrefix}-rc-snapshot.json`,
    content,
    format: 'json',
    generated: true,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Build gate status file content
 */
export function buildGateStatusFile(): PublishFile {
  const releaseP0 = readReleaseP0Summary();
  const smokeP0 = readSmokeP0Summary();
  const gateStatus = computeGateStatus(releaseP0, smokeP0);

  const content = JSON.stringify(
    {
      status: gateStatus,
      releaseP0,
      smokeP0,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );

  return {
    id: 'rc_gate',
    filename: `${publishConfig.exportFilePrefix}-gate-status.json`,
    content,
    format: 'json',
    generated: true,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Build release checklist file content
 */
export function buildReleaseChecklistFile(): PublishFile {
  const releaseP0 = readReleaseP0Summary();

  const content = JSON.stringify(
    {
      p0Total: releaseP0.p0Total,
      p0Done: releaseP0.p0Done,
      p0Open: releaseP0.p0Open,
      p0Blocked: releaseP0.p0Blocked,
      completionPct: releaseP0.p0Total > 0
        ? Math.round((releaseP0.p0Done / releaseP0.p0Total) * 100)
        : 100,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );

  return {
    id: 'rc_release',
    filename: `${publishConfig.exportFilePrefix}-release-checklist.json`,
    content,
    format: 'json',
    generated: true,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Build smoke tests file content
 */
export function buildSmokeTestsFile(): PublishFile {
  const smokeP0 = readSmokeP0Summary();

  const content = JSON.stringify(
    {
      p0Total: smokeP0.p0Total,
      p0Pass: smokeP0.p0Pass,
      p0Open: smokeP0.p0Open,
      p0Fail: smokeP0.p0Fail,
      passPct: smokeP0.p0Total > 0
        ? Math.round((smokeP0.p0Pass / smokeP0.p0Total) * 100)
        : 100,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );

  return {
    id: 'rc_smoke',
    filename: `${publishConfig.exportFilePrefix}-smoke-tests.json`,
    content,
    format: 'json',
    generated: true,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Build release notes markdown file
 */
export function buildReleaseNotesMdFile(
  doc: ReleaseNotesDoc,
  language: 'en' | 'ru'
): PublishFile {
  const strings = getReleaseNotesStrings(language);
  const content = renderReleaseNotesMd(doc, strings);

  return {
    id: language === 'en' ? 'release_notes_en_md' : 'release_notes_ru_md',
    filename: `${publishConfig.exportFilePrefix}-release-notes-${language}.md`,
    content,
    format: 'md',
    generated: true,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Build release notes JSON file
 */
export function buildReleaseNotesJsonFile(
  doc: ReleaseNotesDoc,
  language: 'en' | 'ru'
): PublishFile {
  const content = JSON.stringify(doc, null, 2);

  return {
    id: language === 'en' ? 'release_notes_en_json' : 'release_notes_ru_json',
    filename: `${publishConfig.exportFilePrefix}-release-notes-${language}.json`,
    content,
    format: 'json',
    generated: true,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Build manifest file
 */
export function buildManifestFile(manifest: PublishManifest): PublishFile {
  const content = JSON.stringify(manifest, null, 2);

  return {
    id: 'manifest',
    filename: `${publishConfig.exportFilePrefix}-manifest.json`,
    content,
    format: 'json',
    generated: true,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Build deployment steps file
 */
export function buildDeploymentStepsFile(
  steps: DeploymentStep[],
  language: 'en' | 'ru'
): PublishFile {
  const lines: string[] = ['# Deployment Steps', ''];

  for (const step of steps) {
    const text = language === 'en' ? step.textEn : step.textRu;
    const status = step.completed ? '[x]' : '[ ]';
    lines.push(`- ${status} ${text}`);
    if (step.completed && step.completedAt) {
      lines.push(`  - Completed: ${new Date(step.completedAt).toLocaleString()}`);
    }
  }

  lines.push('');

  return {
    id: language === 'en' ? 'deployment_steps_en' : 'deployment_steps_ru',
    filename: `${publishConfig.exportFilePrefix}-deployment-steps-${language}.md`,
    content: lines.join('\n'),
    format: 'md',
    generated: true,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Build publish checklist file
 */
export function buildPublishChecklistFile(
  checklist: ChecklistItemState[],
  titles: Record<string, string>
): PublishFile {
  const lines: string[] = ['# Publish Checklist', ''];

  // Group by priority
  const p0Items = publishConfig.checklistItems.filter(i => i.priority === 'p0');
  const p1Items = publishConfig.checklistItems.filter(i => i.priority === 'p1');
  const p2Items = publishConfig.checklistItems.filter(i => i.priority === 'p2');

  const addSection = (items: typeof p0Items, title: string) => {
    if (items.length === 0) return;

    lines.push(`## ${title}`, '');
    for (const item of items) {
      const state = checklist.find(c => c.id === item.id);
      const checked = state?.checked ?? item.defaultChecked;
      const status = checked ? '[x]' : '[ ]';
      const label = titles[item.id] || item.id;
      lines.push(`- ${status} ${label}`);
    }
    lines.push('');
  };

  addSection(p0Items, 'P0 (Required)');
  addSection(p1Items, 'P1 (Important)');
  addSection(p2Items, 'P2 (Nice to have)');

  return {
    id: 'publish_checklist',
    filename: `${publishConfig.exportFilePrefix}-checklist.md`,
    content: lines.join('\n'),
    format: 'md',
    generated: true,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Validate checklist completion
 */
export function validateChecklist(checklist: ChecklistItemState[]): ChecklistValidation {
  const p0Items = publishConfig.checklistItems.filter(i => i.priority === 'p0');
  const p1Items = publishConfig.checklistItems.filter(i => i.priority === 'p1');
  const p2Items = publishConfig.checklistItems.filter(i => i.priority === 'p2');

  const isComplete = (items: typeof p0Items): boolean => {
    return items.every(item => {
      const state = checklist.find(c => c.id === item.id);
      return state?.checked ?? item.defaultChecked;
    });
  };

  const getIncomplete = (): string[] => {
    return publishConfig.checklistItems
      .filter(item => {
        const state = checklist.find(c => c.id === item.id);
        return !(state?.checked ?? item.defaultChecked);
      })
      .map(item => item.id);
  };

  const p0Complete = isComplete(p0Items);
  const p1Complete = isComplete(p1Items);
  const p2Complete = isComplete(p2Items);

  return {
    valid: p0Complete,
    p0Complete,
    p1Complete,
    p2Complete,
    incomplete: getIncomplete(),
  };
}

/**
 * Build complete publish packet
 */
export function buildPublishPacket(
  name: string,
  rcA: RcRecord,
  rcB: RcRecord,
  knownIssues: KnownIssue[],
  rcCompareConfig: RcCompareConfig,
  changelogConfig: ChangelogConfig,
  releaseNotesConfig: ReleaseNotesConfig,
  groupTitles: Record<string, string>,
  linkLabels: Record<string, string>,
  checklistTitles: Record<string, string>,
  mostChangesLabel: string,
  nextStepsPlaceholder: string
): PublishPacket {
  // Build diff reports
  const diffReports = buildDiffReports(rcA, rcB, rcCompareConfig);

  // Build changelog docs
  const { enMd, ruMd } = buildChangelogDocs(
    rcA.id,
    rcB.id,
    diffReports,
    changelogConfig,
    groupTitles
  );

  // Build release notes docs
  const releaseNotesEn = buildReleaseNotesDoc(
    rcA.id,
    rcB.id,
    'en',
    diffReports,
    enMd,
    knownIssues,
    releaseNotesConfig,
    groupTitles,
    linkLabels,
    mostChangesLabel,
    nextStepsPlaceholder
  );

  const releaseNotesRu = buildReleaseNotesDoc(
    rcA.id,
    rcB.id,
    'ru',
    diffReports,
    ruMd,
    knownIssues,
    releaseNotesConfig,
    groupTitles,
    linkLabels,
    mostChangesLabel,
    nextStepsPlaceholder
  );

  // Build files
  const files: PublishFile[] = [
    buildRcBundleFile(rcA, rcB),
    buildRcSnapshotFile(rcB),
    buildGateStatusFile(),
    buildReleaseChecklistFile(),
    buildSmokeTestsFile(),
    buildReleaseNotesMdFile(releaseNotesEn, 'en'),
    buildReleaseNotesMdFile(releaseNotesRu, 'ru'),
    buildReleaseNotesJsonFile(releaseNotesEn, 'en'),
    buildReleaseNotesJsonFile(releaseNotesRu, 'ru'),
  ];

  // Build checklist and deployment steps
  const checklist = buildDefaultChecklist();
  const deploymentSteps = buildDeploymentSteps();

  // Add deployment steps files
  files.push(buildDeploymentStepsFile(deploymentSteps, 'en'));
  files.push(buildDeploymentStepsFile(deploymentSteps, 'ru'));

  // Add checklist file
  files.push(buildPublishChecklistFile(checklist, checklistTitles));

  // Build manifest
  const manifest = buildPublishManifest(
    rcA.id,
    rcB.id,
    knownIssues.length,
    files.length + 1, // +1 for manifest itself
    checklist
  );

  // Add manifest file
  files.push(buildManifestFile(manifest));

  // Create packet
  const packet = createEmptyPacket(name, rcA.id, rcB.id);

  return {
    ...packet,
    manifest,
    files,
    checklist,
    deploymentSteps,
    releaseNotesEn,
    releaseNotesRu,
    knownIssues,
  };
}

/**
 * Regenerate packet files
 */
export function regeneratePacketFiles(
  packet: PublishPacket,
  checklistTitles: Record<string, string>
): PublishFile[] {
  const files: PublishFile[] = [];

  // Find existing files and regenerate
  for (const existingFile of packet.files) {
    switch (existingFile.id) {
      case 'rc_gate':
        files.push(buildGateStatusFile());
        break;
      case 'rc_release':
        files.push(buildReleaseChecklistFile());
        break;
      case 'rc_smoke':
        files.push(buildSmokeTestsFile());
        break;
      case 'deployment_steps_en':
        files.push(buildDeploymentStepsFile(packet.deploymentSteps, 'en'));
        break;
      case 'deployment_steps_ru':
        files.push(buildDeploymentStepsFile(packet.deploymentSteps, 'ru'));
        break;
      case 'publish_checklist':
        files.push(buildPublishChecklistFile(packet.checklist, checklistTitles));
        break;
      case 'manifest':
        const newManifest = buildPublishManifest(
          packet.rcFrom,
          packet.rcTo,
          packet.knownIssues.length,
          packet.files.length,
          packet.checklist
        );
        files.push(buildManifestFile(newManifest));
        break;
      default:
        // Keep existing file
        files.push(existingFile);
    }
  }

  return files;
}
