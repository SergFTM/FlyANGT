/**
 * Backup Module
 *
 * Utilities for backup and restore operations.
 */

export {
  BACKUP_VERSION,
  type BackupFile,
  type BackupValidationError,
  type BackupCollision,
  type RestoreRequest,
  type RestoreReport,
  createEmptyReport,
  validateBackupStructure,
  validateBackupLeads,
  validateBackupRequests,
} from './types';
