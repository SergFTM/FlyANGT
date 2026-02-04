/**
 * Prisma DB Adapter Stub
 *
 * Migration-ready stub for Prisma/Postgres implementation.
 * Replace configDb adapter with Prisma repositories when MVP is migrated to Postgres.
 *
 * IMPORTANT: This is a placeholder. Prisma is NOT installed.
 * To migrate:
 * 1. Install Prisma: npm install prisma @prisma/client
 * 2. Initialize Prisma: npx prisma init
 * 3. Define schema in prisma/schema.prisma
 * 4. Generate client: npx prisma generate
 * 5. Implement these classes using PrismaClient
 * 6. Update getRepositories() in adapters/index.ts to use Prisma repositories
 */

import type { LeadRepository, RequestRepository, ExtendedListParams, BulkUpsertResult } from '$lib/domain/repositories';
import type {
  EntityId,
  LeadRecord,
  RequestRecord,
  CreateLeadInput,
  CreateRequestInput,
  RecordPatch,
} from '$lib/domain/types';

/**
 * Prisma Lead Repository (Stub)
 *
 * TODO: Implement with PrismaClient when migrating to Postgres
 *
 * Example schema.prisma:
 * ```prisma
 * enum WorkflowStatus {
 *   new
 *   reviewed
 *   contacted
 *   closed
 *   archived
 * }
 *
 * model Lead {
 *   id            String         @id @default(cuid())
 *   createdAt     DateTime       @default(now())
 *   updatedAt     DateTime       @updatedAt
 *   source        String
 *   locale        String?
 *   // Workflow fields
 *   status        WorkflowStatus @default(new)
 *   lastActionAt  DateTime?
 *   tags          String[]       @default([])
 *   // Lead-specific fields
 *   email         String
 *   name          String?
 *   phone         String?
 *   country       String?
 *   company       String?
 *   investorType  String?
 *   ticket        String?
 *   interest      String?
 *   notes         String?
 *   meta          Json?
 *   // Relations
 *   internalNotes InternalNote[]
 * }
 *
 * model InternalNote {
 *   id        String   @id @default(cuid())
 *   createdAt DateTime @default(now())
 *   text      String
 *   author    String?
 *   // Relations
 *   leadId    String?
 *   lead      Lead?    @relation(fields: [leadId], references: [id])
 *   requestId String?
 *   request   Request? @relation(fields: [requestId], references: [id])
 * }
 * ```
 */
export class PrismaLeadRepository implements LeadRepository {
  async create(_input: CreateLeadInput): Promise<LeadRecord> {
    throw new Error('PrismaLeadRepository.create() not implemented. Install Prisma and implement.');
  }

  async getById(_id: EntityId): Promise<LeadRecord | null> {
    throw new Error('PrismaLeadRepository.getById() not implemented. Install Prisma and implement.');
  }

  async list(_params?: ExtendedListParams): Promise<LeadRecord[]> {
    throw new Error('PrismaLeadRepository.list() not implemented. Install Prisma and implement.');
  }

  async count(_params?: Pick<ExtendedListParams, 'source' | 'status'>): Promise<number> {
    throw new Error('PrismaLeadRepository.count() not implemented. Install Prisma and implement.');
  }

  async update(_id: EntityId, _patch: RecordPatch): Promise<LeadRecord> {
    throw new Error('PrismaLeadRepository.update() not implemented. Install Prisma and implement.');
  }

  async delete(_id: EntityId): Promise<boolean> {
    throw new Error('PrismaLeadRepository.delete() not implemented. Install Prisma and implement.');
  }

  async upsert(_record: LeadRecord): Promise<LeadRecord> {
    throw new Error('PrismaLeadRepository.upsert() not implemented. Install Prisma and implement.');
  }

  async bulkUpsert(_records: LeadRecord[]): Promise<BulkUpsertResult> {
    throw new Error('PrismaLeadRepository.bulkUpsert() not implemented. Install Prisma and implement.');
  }

  async clearAll(): Promise<void> {
    throw new Error('PrismaLeadRepository.clearAll() not implemented. Install Prisma and implement.');
  }
}

/**
 * Prisma Request Repository (Stub)
 *
 * TODO: Implement with PrismaClient when migrating to Postgres
 *
 * Example schema.prisma:
 * ```prisma
 * model Request {
 *   id            String         @id @default(cuid())
 *   createdAt     DateTime       @default(now())
 *   updatedAt     DateTime       @updatedAt
 *   source        String
 *   locale        String?
 *   // Workflow fields
 *   status        WorkflowStatus @default(new)
 *   lastActionAt  DateTime?
 *   tags          String[]       @default([])
 *   // Request-specific fields
 *   payload       Json
 *   // Relations
 *   internalNotes InternalNote[]
 * }
 * ```
 */
export class PrismaRequestRepository implements RequestRepository {
  async create(_input: CreateRequestInput): Promise<RequestRecord> {
    throw new Error('PrismaRequestRepository.create() not implemented. Install Prisma and implement.');
  }

  async getById(_id: EntityId): Promise<RequestRecord | null> {
    throw new Error('PrismaRequestRepository.getById() not implemented. Install Prisma and implement.');
  }

  async list(_params?: ExtendedListParams): Promise<RequestRecord[]> {
    throw new Error('PrismaRequestRepository.list() not implemented. Install Prisma and implement.');
  }

  async count(_params?: Pick<ExtendedListParams, 'source' | 'status'>): Promise<number> {
    throw new Error('PrismaRequestRepository.count() not implemented. Install Prisma and implement.');
  }

  async update(_id: EntityId, _patch: RecordPatch): Promise<RequestRecord> {
    throw new Error('PrismaRequestRepository.update() not implemented. Install Prisma and implement.');
  }

  async delete(_id: EntityId): Promise<boolean> {
    throw new Error('PrismaRequestRepository.delete() not implemented. Install Prisma and implement.');
  }

  async upsert(_record: RequestRecord): Promise<RequestRecord> {
    throw new Error('PrismaRequestRepository.upsert() not implemented. Install Prisma and implement.');
  }

  async bulkUpsert(_records: RequestRecord[]): Promise<BulkUpsertResult> {
    throw new Error('PrismaRequestRepository.bulkUpsert() not implemented. Install Prisma and implement.');
  }

  async clearAll(): Promise<void> {
    throw new Error('PrismaRequestRepository.clearAll() not implemented. Install Prisma and implement.');
  }
}

/**
 * Get Prisma repositories (stub - not implemented)
 */
export function getPrismaRepositories(): { leads: PrismaLeadRepository; requests: PrismaRequestRepository } {
  throw new Error('Prisma not installed. Use getRepositories() from adapters/index.ts which uses configDb.');
}
