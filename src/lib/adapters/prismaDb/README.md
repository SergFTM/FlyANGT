# Prisma Database Adapter

This directory contains the Prisma/Postgres adapter for FlyANGT.

## Current Status

**MVP**: Prisma is NOT installed. This adapter is a stub/placeholder.

The MVP uses file-based storage via the `configDb` adapter. Prisma repositories will be implemented when the project migrates to PostgreSQL.

## Architecture

### Repository Pattern

Both `configDb` and `prismaDb` adapters implement the same interfaces:

```
src/lib/domain/repositories.ts
├── LeadRepository (interface)
└── RequestRepository (interface)

src/lib/adapters/
├── configDb/           <- MVP implementation (active)
│   ├── leads.configRepo.ts
│   └── requests.configRepo.ts
└── prismaDb/           <- Future implementation (stub)
    ├── prismaDb.stub.ts
    └── README.md (this file)
```

### Interface Contracts

The repository interfaces ensure that switching adapters requires no changes to application code:

```typescript
interface LeadRepository {
  create(input: CreateLeadInput): Promise<LeadRecord>;
  getById(id: EntityId): Promise<LeadRecord | null>;
  list(params?: ExtendedListParams): Promise<LeadRecord[]>;
  count(params?: Pick<ExtendedListParams, 'source' | 'status'>): Promise<number>;
  update(id: EntityId, patch: RecordPatch): Promise<LeadRecord>;
  delete(id: EntityId): Promise<boolean>;
}

interface RequestRepository {
  create(input: CreateRequestInput): Promise<RequestRecord>;
  getById(id: EntityId): Promise<RequestRecord | null>;
  list(params?: ExtendedListParams): Promise<RequestRecord[]>;
  count(params?: Pick<ExtendedListParams, 'source' | 'status'>): Promise<number>;
  update(id: EntityId, patch: RecordPatch): Promise<RequestRecord>;
  delete(id: EntityId): Promise<boolean>;
}
```

## Migration Plan

### Step 1: Install Prisma (Future)

```bash
npm install prisma --save-dev
npm install @prisma/client
```

**Note**: Do NOT install Prisma until migration begins.

### Step 2: Use Schema Blueprint

The Prisma schema blueprint is already created:

```
/prisma/schema.prisma
```

This file defines:
- Lead model
- Request model
- LeadNote model (normalized from embedded array)
- RequestNote model (normalized from embedded array)
- LeadTag model (normalized from embedded array)
- RequestTag model (normalized from embedded array)
- WorkflowStatus enum
- Source enum
- Locale enum

### Step 3: Import Data

Use the seed export from `/migrate` dev tool:

```bash
# Export from /migrate
# Files generated:
# - flyangt-migrate-seed.json
```

The seed.json contains normalized tables:
- `Lead[]` - Flattened lead records
- `Request[]` - Flattened request records
- `InternalNote[]` - All notes with entityType and entityId
- `Tag[]` - All tags with entityType and entityId

### Step 4: Implement Prisma Repositories

Create `prismaDb.ts` (replacing the stub):

```typescript
import { PrismaClient } from '@prisma/client';
import type { LeadRepository, RequestRepository } from '$lib/domain/repositories';

const prisma = new PrismaClient();

export class PrismaLeadRepository implements LeadRepository {
  async create(input: CreateLeadInput): Promise<LeadRecord> {
    const lead = await prisma.lead.create({
      data: {
        id: generateLeadId(),
        source: input.source,
        locale: input.locale,
        status: input.status ?? 'new',
        email: input.email,
        // ... other fields
      },
      include: {
        internalNotes: true,
        tags: true,
      },
    });
    return convertLeadFromPrisma(lead);
  }

  async getById(id: EntityId): Promise<LeadRecord | null> {
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        internalNotes: true,
        tags: true,
      },
    });
    return lead ? convertLeadFromPrisma(lead) : null;
  }

  async list(params?: ExtendedListParams): Promise<LeadRecord[]> {
    const leads = await prisma.lead.findMany({
      where: {
        source: params?.source,
        status: params?.status,
      },
      include: {
        internalNotes: true,
        tags: true,
      },
      take: params?.limit,
      skip: params?.offset,
      orderBy: { createdAt: 'desc' },
    });
    return leads.map(convertLeadFromPrisma);
  }

  // ... implement remaining methods
}
```

### Step 5: Switch Adapter

Update `/src/lib/adapters/index.ts`:

```typescript
// Change this line:
const CURRENT_ADAPTER: AdapterType = 'prisma'; // was 'configDb'
```

## File Structure (After Migration)

```
src/lib/adapters/prismaDb/
├── index.ts           <- Re-exports
├── prismaDb.ts        <- PrismaClient instance + repositories
├── prismaDb.utils.ts  <- Conversion utilities
└── README.md          <- This file
```

## Key Considerations

### ID Preservation

File DB uses string IDs that must be preserved:
- Leads: `ld-{timestamp}-{random}`
- Requests: `rq-{timestamp}-{random}`
- Notes: `note-{timestamp}-{random}`

Prisma schema uses `String @id` (not autoincrement) to support this.

### Timestamp Conversion

File DB stores timestamps as ISO strings. Prisma uses DateTime.

```typescript
// Import
createdAt: new Date(fileLead.createdAt)

// Export
createdAt: prismaLead.createdAt.toISOString()
```

### Relation Handling

File DB embeds notes and tags. Prisma normalizes to separate tables.

```typescript
// When reading: include relations
include: { internalNotes: true, tags: true }

// When returning: reconstruct embedded format
return {
  ...lead,
  internalNotes: lead.internalNotes.map(n => ({
    id: n.id,
    text: n.text,
    createdAt: n.createdAt.toISOString(),
    author: n.author,
  })),
  tags: lead.tags.map(t => t.value),
};
```

### Status and Note Updates

The `update` method handles workflow operations:

```typescript
async update(id: EntityId, patch: RecordPatch): Promise<LeadRecord> {
  // Update status
  if (patch.status) {
    await prisma.lead.update({
      where: { id },
      data: {
        status: patch.status,
        lastActionAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  // Add note
  if (patch.addNote) {
    await prisma.leadNote.create({
      data: {
        id: generateNoteId(),
        leadId: id,
        text: patch.addNote.text,
        author: patch.addNote.author,
      },
    });
  }

  // Archive (set status)
  if (patch.archived) {
    await prisma.lead.update({
      where: { id },
      data: {
        status: 'archived',
        lastActionAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  return this.getById(id);
}
```

## Testing

After implementing Prisma repositories:

1. Run `/migrate` to verify counts match
2. Run `/admin` to verify CRUD operations
3. Run `/smoke` to verify all tests pass
4. Run form submissions to verify creation works

## Related Documentation

- [Migration Blueprint](/docs/migration/PRISMA_POSTGRES_BLUEPRINT.md)
- [Field Mapping](/docs/migration/MIGRATION_MAP_APPENDIX.md)
- [Prisma Schema](/prisma/schema.prisma)
- [Repository Interfaces](/src/lib/domain/repositories.ts)

## Support

For migration questions:
1. Check the migration blueprint
2. Review the field mapping appendix
3. Use `/migrate` dev tool to export and validate data
