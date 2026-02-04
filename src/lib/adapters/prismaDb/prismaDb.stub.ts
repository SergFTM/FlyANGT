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

import type { LeadRepository, RequestRepository } from '$lib/domain/repositories';
import type {
  EntityId,
  LeadRecord,
  RequestRecord,
  CreateLeadInput,
  CreateRequestInput,
  ListParams,
} from '$lib/domain/types';

/**
 * Prisma Lead Repository (Stub)
 *
 * TODO: Implement with PrismaClient when migrating to Postgres
 *
 * Example schema.prisma:
 * ```
 * model Lead {
 *   id          String   @id @default(cuid())
 *   createdAt   DateTime @default(now())
 *   updatedAt   DateTime @updatedAt
 *   source      String
 *   locale      String?
 *   email       String
 *   name        String?
 *   phone       String?
 *   country     String?
 *   company     String?
 *   investorType String?
 *   ticket      String?
 *   interest    String?
 *   notes       String?
 *   meta        Json?
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

  async list(_params?: ListParams): Promise<LeadRecord[]> {
    throw new Error('PrismaLeadRepository.list() not implemented. Install Prisma and implement.');
  }

  async count(_params?: Pick<ListParams, 'source'>): Promise<number> {
    throw new Error('PrismaLeadRepository.count() not implemented. Install Prisma and implement.');
  }

  async delete(_id: EntityId): Promise<boolean> {
    throw new Error('PrismaLeadRepository.delete() not implemented. Install Prisma and implement.');
  }
}

/**
 * Prisma Request Repository (Stub)
 *
 * TODO: Implement with PrismaClient when migrating to Postgres
 *
 * Example schema.prisma:
 * ```
 * model Request {
 *   id          String   @id @default(cuid())
 *   createdAt   DateTime @default(now())
 *   updatedAt   DateTime @updatedAt
 *   source      String
 *   locale      String?
 *   payload     Json
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

  async list(_params?: ListParams): Promise<RequestRecord[]> {
    throw new Error('PrismaRequestRepository.list() not implemented. Install Prisma and implement.');
  }

  async count(_params?: Pick<ListParams, 'source'>): Promise<number> {
    throw new Error('PrismaRequestRepository.count() not implemented. Install Prisma and implement.');
  }

  async delete(_id: EntityId): Promise<boolean> {
    throw new Error('PrismaRequestRepository.delete() not implemented. Install Prisma and implement.');
  }
}

/**
 * Get Prisma repositories (stub - not implemented)
 */
export function getPrismaRepositories(): { leads: PrismaLeadRepository; requests: PrismaRequestRepository } {
  throw new Error('Prisma not installed. Use getRepositories() from adapters/index.ts which uses configDb.');
}
