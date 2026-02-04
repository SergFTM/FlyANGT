/**
 * Migration Map Generator
 *
 * Generates a JSON document describing how current file DB fields
 * map to future Prisma schema.
 */

/**
 * Field mapping
 */
export interface FieldMapping {
  from: string;
  to: string;
  type: string;
  required: boolean;
  notes?: string;
}

/**
 * Relation mapping
 */
export interface RelationMapping {
  type: 'one-to-many' | 'many-to-one';
  from: string;
  to: string;
  notes?: string;
}

/**
 * Enum mapping
 */
export interface EnumMapping {
  name: string;
  values: string[];
}

/**
 * Entity mapping
 */
export interface EntityMapping {
  name: string;
  description: string;
  primaryKey: string;
  fields: FieldMapping[];
  relations?: RelationMapping[];
  enums?: EnumMapping[];
}

/**
 * Complete migration map
 */
export interface MigrationMap {
  generatedAt: string;
  target: string;
  entities: EntityMapping[];
  notes: string[];
}

/**
 * Build migration map document
 */
export function buildMigrationMap(): MigrationMap {
  return {
    generatedAt: new Date().toISOString(),
    target: 'Prisma + Postgres',
    entities: [
      {
        name: 'Lead',
        description: 'Contact/interest submissions from various sources',
        primaryKey: 'id',
        fields: [
          { from: 'id', to: 'id', type: 'String @id @default(cuid())', required: true },
          { from: 'createdAt', to: 'createdAt', type: 'DateTime @default(now())', required: true },
          { from: 'updatedAt', to: 'updatedAt', type: 'DateTime @updatedAt', required: true },
          { from: 'source', to: 'source', type: 'String', required: true, notes: 'Consider SubmissionSource enum' },
          { from: 'locale', to: 'locale', type: 'String?', required: false },
          { from: 'status', to: 'status', type: 'WorkflowStatus @default(new)', required: true },
          { from: 'lastActionAt', to: 'lastActionAt', type: 'DateTime?', required: false },
          { from: 'email', to: 'email', type: 'String', required: true, notes: 'Add @unique if no duplicates allowed' },
          { from: 'name', to: 'name', type: 'String?', required: false },
          { from: 'phone', to: 'phone', type: 'String?', required: false },
          { from: 'country', to: 'country', type: 'String?', required: false },
          { from: 'company', to: 'company', type: 'String?', required: false },
          { from: 'investorType', to: 'investorType', type: 'String?', required: false },
          { from: 'ticket', to: 'ticket', type: 'String?', required: false },
          { from: 'interest', to: 'interest', type: 'String?', required: false },
          { from: 'notes', to: 'notes', type: 'String?', required: false, notes: 'User-provided notes (not internal)' },
          { from: 'meta', to: 'meta', type: 'Json?', required: false },
          { from: 'tags[]', to: 'tags', type: 'String[] @default([])', required: false, notes: 'Or normalize to Tag model' },
        ],
        relations: [
          { type: 'one-to-many', from: 'Lead', to: 'InternalNote', notes: 'internalNotes embedded in file DB, normalized in Postgres' },
        ],
        enums: [
          { name: 'WorkflowStatus', values: ['new', 'reviewed', 'contacted', 'closed', 'archived'] },
        ],
      },
      {
        name: 'Request',
        description: 'Structured form submissions with arbitrary payload',
        primaryKey: 'id',
        fields: [
          { from: 'id', to: 'id', type: 'String @id @default(cuid())', required: true },
          { from: 'createdAt', to: 'createdAt', type: 'DateTime @default(now())', required: true },
          { from: 'updatedAt', to: 'updatedAt', type: 'DateTime @updatedAt', required: true },
          { from: 'source', to: 'source', type: 'String', required: true },
          { from: 'locale', to: 'locale', type: 'String?', required: false },
          { from: 'status', to: 'status', type: 'WorkflowStatus @default(new)', required: true },
          { from: 'lastActionAt', to: 'lastActionAt', type: 'DateTime?', required: false },
          { from: 'payload', to: 'payload', type: 'Json', required: true },
          { from: 'tags[]', to: 'tags', type: 'String[] @default([])', required: false },
        ],
        relations: [
          { type: 'one-to-many', from: 'Request', to: 'InternalNote', notes: 'internalNotes embedded in file DB, normalized in Postgres' },
        ],
      },
      {
        name: 'InternalNote',
        description: 'Admin notes attached to leads or requests',
        primaryKey: 'id',
        fields: [
          { from: 'id', to: 'id', type: 'String @id @default(cuid())', required: true },
          { from: 'createdAt', to: 'createdAt', type: 'DateTime @default(now())', required: true },
          { from: 'text', to: 'text', type: 'String', required: true },
          { from: 'author', to: 'author', type: 'String?', required: false },
          { from: '(embedded in lead)', to: 'leadId', type: 'String?', required: false, notes: 'Foreign key to Lead' },
          { from: '(embedded in request)', to: 'requestId', type: 'String?', required: false, notes: 'Foreign key to Request' },
        ],
        relations: [
          { type: 'many-to-one', from: 'InternalNote', to: 'Lead', notes: 'Optional relation via leadId' },
          { type: 'many-to-one', from: 'InternalNote', to: 'Request', notes: 'Optional relation via requestId' },
        ],
      },
      {
        name: 'Tag',
        description: 'Optional: normalized tags if not using String[] (alternative approach)',
        primaryKey: 'id',
        fields: [
          { from: 'id', to: 'id', type: 'String @id @default(cuid())', required: true },
          { from: '(index in tags[])', to: 'value', type: 'String', required: true },
          { from: '(entity type)', to: 'entityType', type: 'String', required: true, notes: 'lead or request' },
          { from: '(entity id)', to: 'entityId', type: 'String', required: true },
        ],
        notes: 'Alternative to String[] tags. Use if you need queryable tags or tag metadata.',
      },
    ],
    notes: [
      'File DB stores internalNotes and tags as embedded arrays within each record.',
      'For Postgres migration, normalize internalNotes to separate InternalNote table.',
      'Tags can remain as String[] using Postgres array type, or normalize to Tag table.',
      'Consider adding indexes on: Lead.email, Lead.source, Request.source, InternalNote.leadId/requestId.',
      'WorkflowStatus enum shared between Lead and Request models.',
      'The kind field (lead/request) is implicit in Prisma via model type.',
      'Maintain backward compatibility during migration with soft migration scripts.',
    ],
  };
}
