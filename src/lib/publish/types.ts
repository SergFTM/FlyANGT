/**
 * Publish Types
 *
 * Structured types for publish packets.
 */

import type { PublishFileId, ChecklistPriority } from '$config/publish.config';
import type { ReleaseNotesDoc } from '$lib/releaseNotes/types';
import type { KnownIssue } from '$lib/releaseNotes/knownIssues.model';

/**
 * Packet status
 */
export type PacketStatus = 'draft' | 'ready' | 'published';

/**
 * Checklist item state
 */
export interface ChecklistItemState {
  id: string;
  checked: boolean;
  checkedAt?: string;
  checkedBy?: string;
}

/**
 * Publish file entry
 */
export interface PublishFile {
  id: PublishFileId;
  filename: string;
  content: string;
  format: 'json' | 'md' | 'txt';
  generated: boolean;
  generatedAt?: string;
}

/**
 * Publish manifest metadata
 */
export interface PublishManifest {
  version: string;
  buildDate: string;
  rcFrom: string;
  rcTo: string;
  gateStatus: 'green' | 'yellow' | 'red';
  releaseP0Done: number;
  releaseP0Total: number;
  smokeP0Pass: number;
  smokeP0Total: number;
  knownIssuesCount: number;
  filesCount: number;
  checklistComplete: number;
  checklistTotal: number;
}

/**
 * Deployment step
 */
export interface DeploymentStep {
  step: number;
  textEn: string;
  textRu: string;
  completed: boolean;
  completedAt?: string;
}

/**
 * Complete publish packet
 */
export interface PublishPacket {
  id: string;
  name: string;
  status: PacketStatus;
  createdAt: string;
  updatedAt: string;
  rcFrom: string;
  rcTo: string;
  manifest: PublishManifest;
  files: PublishFile[];
  checklist: ChecklistItemState[];
  deploymentSteps: DeploymentStep[];
  releaseNotesEn?: ReleaseNotesDoc;
  releaseNotesRu?: ReleaseNotesDoc;
  knownIssues: KnownIssue[];
}

/**
 * Saved packet reference (for listing)
 */
export interface SavedPacketRef {
  id: string;
  name: string;
  status: PacketStatus;
  createdAt: string;
  updatedAt: string;
  rcFrom: string;
  rcTo: string;
}

/**
 * Publish store state
 */
export interface PublishStoreState {
  packets: SavedPacketRef[];
  selectedPacketId: string | null;
  currentPacket: PublishPacket | null;
}

/**
 * File generation options
 */
export interface FileGenerationOptions {
  includeRcBundle: boolean;
  includeRcSnapshot: boolean;
  includeGateStatus: boolean;
  includeReleaseChecklist: boolean;
  includeSmokeTests: boolean;
  includeReleaseNotesEn: boolean;
  includeReleaseNotesRu: boolean;
  includeManifest: boolean;
  includeDeploymentSteps: boolean;
  includePublishChecklist: boolean;
}

/**
 * Default file generation options
 */
export const defaultFileGenerationOptions: FileGenerationOptions = {
  includeRcBundle: true,
  includeRcSnapshot: true,
  includeGateStatus: true,
  includeReleaseChecklist: true,
  includeSmokeTests: true,
  includeReleaseNotesEn: true,
  includeReleaseNotesRu: true,
  includeManifest: true,
  includeDeploymentSteps: true,
  includePublishChecklist: true,
};

/**
 * Checklist validation result
 */
export interface ChecklistValidation {
  valid: boolean;
  p0Complete: boolean;
  p1Complete: boolean;
  p2Complete: boolean;
  incomplete: string[];
}

/**
 * Generate unique packet ID
 */
export function generatePacketId(): string {
  return `packet_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create empty packet
 */
export function createEmptyPacket(
  name: string,
  rcFrom: string,
  rcTo: string
): PublishPacket {
  const now = new Date().toISOString();

  return {
    id: generatePacketId(),
    name,
    status: 'draft',
    createdAt: now,
    updatedAt: now,
    rcFrom,
    rcTo,
    manifest: {
      version: '1.0.0',
      buildDate: now,
      rcFrom,
      rcTo,
      gateStatus: 'yellow',
      releaseP0Done: 0,
      releaseP0Total: 0,
      smokeP0Pass: 0,
      smokeP0Total: 0,
      knownIssuesCount: 0,
      filesCount: 0,
      checklistComplete: 0,
      checklistTotal: 0,
    },
    files: [],
    checklist: [],
    deploymentSteps: [],
    knownIssues: [],
  };
}

/**
 * Extract saved packet reference from full packet
 */
export function extractPacketRef(packet: PublishPacket): SavedPacketRef {
  return {
    id: packet.id,
    name: packet.name,
    status: packet.status,
    createdAt: packet.createdAt,
    updatedAt: packet.updatedAt,
    rcFrom: packet.rcFrom,
    rcTo: packet.rcTo,
  };
}
