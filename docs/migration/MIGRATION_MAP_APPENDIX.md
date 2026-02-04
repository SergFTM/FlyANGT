# Migration Map Appendix

This document provides detailed field mapping between the file-based config DB and Prisma/Postgres schema.

## Table of Contents

1. [Lead Entity Mapping](#lead-entity-mapping)
2. [Request Entity Mapping](#request-entity-mapping)
3. [Internal Notes Mapping](#internal-notes-mapping)
4. [Tags Mapping](#tags-mapping)
5. [Enum Mappings](#enum-mappings)
6. [Compatibility Contracts](#compatibility-contracts)
7. [Type Conversions](#type-conversions)

---

## Lead Entity Mapping

### File DB: LeadRecord

Source: `/src/lib/domain/types.ts`

| File DB Field | Type | Required | Description |
|---------------|------|----------|-------------|
| id | string | Yes | Format: `ld-{timestamp}-{random}` |
| kind | 'lead' | Yes | Discriminator (not stored in Prisma) |
| createdAt | string (ISO) | Yes | Creation timestamp |
| updatedAt | string (ISO) | Yes | Last update timestamp |
| source | SubmissionSource | Yes | Submission source enum |
| locale | EntityLocale | No | en or ru |
| status | WorkflowStatus | Yes | Workflow status enum |
| lastActionAt | string (ISO) | No | Last workflow action timestamp |
| tags | string[] | No | Embedded tag array |
| internalNotes | InternalNote[] | No | Embedded notes array |
| email | string | Yes | Contact email |
| name | string | No | Contact name |
| phone | string | No | Contact phone |
| country | string | No | Country |
| company | string | No | Company name |
| investorType | string | No | Investor classification |
| ticket | string | No | Ticket size |
| interest | string | No | Interest area |
| notes | string | No | User-provided notes |
| meta | object | No | Additional metadata |

### Prisma: Lead Model

Target: `/prisma/schema.prisma`

| Prisma Field | Type | Required | Default | Notes |
|--------------|------|----------|---------|-------|
| id | String | Yes | - | @id, preserves file DB ID |
| createdAt | DateTime | Yes | now() | Auto-generated |
| updatedAt | DateTime | Yes | @updatedAt | Auto-updated |
| source | Source | Yes | - | Enum type |
| locale | Locale | No | null | Enum type |
| status | WorkflowStatus | Yes | new | Enum type |
| lastActionAt | DateTime | No | null | - |
| email | String | Yes | - | - |
| name | String | No | null | - |
| phone | String | No | null | - |
| country | String | No | null | - |
| company | String | No | null | - |
| investorType | String | No | null | - |
| ticket | String | No | null | - |
| interest | String | No | null | - |
| notes | String | No | null | - |
| meta | Json | No | null | - |
| internalNotes | LeadNote[] | - | - | Relation |
| tags | LeadTag[] | - | - | Relation |

### Mapping Notes

- `kind` field not stored in Prisma (model name serves as discriminator)
- `tags` array normalized to LeadTag table
- `internalNotes` array normalized to LeadNote table

---

## Request Entity Mapping

### File DB: RequestRecord

Source: `/src/lib/domain/types.ts`

| File DB Field | Type | Required | Description |
|---------------|------|----------|-------------|
| id | string | Yes | Format: `rq-{timestamp}-{random}` |
| kind | 'request' | Yes | Discriminator (not stored in Prisma) |
| createdAt | string (ISO) | Yes | Creation timestamp |
| updatedAt | string (ISO) | Yes | Last update timestamp |
| source | SubmissionSource | Yes | Submission source enum |
| locale | EntityLocale | No | en or ru |
| status | WorkflowStatus | Yes | Workflow status enum |
| lastActionAt | string (ISO) | No | Last workflow action timestamp |
| tags | string[] | No | Embedded tag array |
| internalNotes | InternalNote[] | No | Embedded notes array |
| payload | object | Yes | Form submission data |

### Prisma: Request Model

Target: `/prisma/schema.prisma`

| Prisma Field | Type | Required | Default | Notes |
|--------------|------|----------|---------|-------|
| id | String | Yes | - | @id, preserves file DB ID |
| createdAt | DateTime | Yes | now() | Auto-generated |
| updatedAt | DateTime | Yes | @updatedAt | Auto-updated |
| source | Source | Yes | - | Enum type |
| locale | Locale | No | null | Enum type |
| status | WorkflowStatus | Yes | new | Enum type |
| lastActionAt | DateTime | No | null | - |
| payload | Json | Yes | - | JSONB in Postgres |
| internalNotes | RequestNote[] | - | - | Relation |
| tags | RequestTag[] | - | - | Relation |

### Mapping Notes

- `kind` field not stored in Prisma
- `tags` array normalized to RequestTag table
- `internalNotes` array normalized to RequestNote table

---

## Internal Notes Mapping

### File DB: InternalNote (Embedded)

Source: `/src/lib/domain/types.ts`

| File DB Field | Type | Required | Description |
|---------------|------|----------|-------------|
| id | string | Yes | Format: `note-{timestamp}-{random}` |
| text | string | Yes | Note content |
| createdAt | string (ISO) | Yes | Creation timestamp |
| author | string | No | Note author |

### Seed Export: SeedInternalNote (Normalized)

Source: `/src/lib/migrate/seed.ts`

| Field | Type | Description |
|-------|------|-------------|
| id | string | Preserved from embedded note |
| entityType | 'lead' or 'request' | Parent entity type |
| entityId | string | Parent entity ID |
| text | string | Note content |
| createdAt | string (ISO) | Creation timestamp |
| author | string or null | Note author |

### Prisma: LeadNote / RequestNote

| Prisma Field | Type | Required | Notes |
|--------------|------|----------|-------|
| id | String | Yes | @id, preserves note ID |
| leadId / requestId | String | Yes | Foreign key |
| createdAt | DateTime | Yes | default(now()) |
| author | String | No | null |
| text | String | Yes | - |

### Import Transformation

```
SeedInternalNote where entityType='lead' -> LeadNote
SeedInternalNote where entityType='request' -> RequestNote
```

---

## Tags Mapping

### File DB: Tags (Embedded Array)

Stored as `string[]` in LeadRecord/RequestRecord.

### Seed Export: SeedTag (Normalized)

Source: `/src/lib/migrate/seed.ts`

| Field | Type | Description |
|-------|------|-------------|
| id | string | Format: `tag-{entityType}-{entityId}-{index}` |
| entityType | 'lead' or 'request' | Parent entity type |
| entityId | string | Parent entity ID |
| value | string | Tag value |

### Prisma: LeadTag / RequestTag

| Prisma Field | Type | Required | Notes |
|--------------|------|----------|-------|
| id | String | Yes | @id, preserves generated ID |
| leadId / requestId | String | Yes | Foreign key |
| value | String | Yes | Tag value |

### Constraints

- `@@unique([leadId, value])` prevents duplicate tags per lead
- `@@unique([requestId, value])` prevents duplicate tags per request

---

## Enum Mappings

### WorkflowStatus

| Value | File DB | Prisma | Description |
|-------|---------|--------|-------------|
| new | 'new' | new | Initial state |
| reviewed | 'reviewed' | reviewed | Admin has seen |
| contacted | 'contacted' | contacted | Outreach made |
| closed | 'closed' | closed | Complete |
| archived | 'archived' | archived | Hidden |

**Contract**: Values must match exactly (case-sensitive).

### SubmissionSource / Source

| Value | File DB | Prisma | Description |
|-------|---------|--------|-------------|
| presale | 'presale' | presale | Presale form |
| configurator_quote | 'configurator_quote' | configurator_quote | Configurator |
| partners | 'partners' | partners | Partner form |
| investors_deck | 'investors_deck' | investors_deck | Investor form |
| customers_docs | 'customers_docs' | customers_docs | Customer docs |

**Contract**: Values must match exactly (case-sensitive, underscores preserved).

### EntityLocale / Locale

| Value | File DB | Prisma | Description |
|-------|---------|--------|-------------|
| en | 'en' | en | English |
| ru | 'ru' | ru | Russian |

**Contract**: Values must match exactly.

---

## Compatibility Contracts

These contracts MUST be maintained for successful migration:

### ID Stability

```
CRITICAL: IDs must remain stable across migration.

Lead IDs:    ld-{timestamp}-{random}   -> preserved as String @id
Request IDs: rq-{timestamp}-{random}   -> preserved as String @id
Note IDs:    note-{timestamp}-{random} -> preserved as String @id
Tag IDs:     tag-{type}-{entityId}-{n} -> preserved as String @id
```

### Enum String Stability

```
CRITICAL: Enum values must not change.

WorkflowStatus: new, reviewed, contacted, closed, archived
Source:         presale, configurator_quote, partners, investors_deck, customers_docs
Locale:         en, ru
```

### Timestamp Format

```
File DB:  ISO 8601 string  "2024-01-15T10:30:00.000Z"
Prisma:   DateTime         Prisma Client handles conversion
Import:   new Date(isoString) -> DateTime
```

### JSON Field Preservation

```
Lead.meta:      object -> Json (JSONB in Postgres)
Request.payload: object -> Json (JSONB in Postgres)

Structure must be preserved exactly.
Nested objects and arrays supported.
```

### Null vs Undefined

```
File DB:  undefined (missing key) or null
Prisma:   null only

Transformation: undefined -> null
```

---

## Type Conversions

### During Import

| File DB Type | Prisma Type | Conversion |
|--------------|-------------|------------|
| string (ISO) | DateTime | `new Date(isoString)` |
| string | String | Direct |
| number | Int/Float | Direct |
| boolean | Boolean | Direct |
| object | Json | Direct (JSONB) |
| array | Json | Direct (JSONB) |
| undefined | null | `value ?? null` |
| string enum | Enum | Direct (validated) |

### During Export (Prisma to Application)

| Prisma Type | Application Type | Conversion |
|-------------|------------------|------------|
| DateTime | string (ISO) | `.toISOString()` |
| String | string | Direct |
| Int/Float | number | Direct |
| Boolean | boolean | Direct |
| Json | object | Direct |
| Enum | string union | Direct |

### Example Conversion Code

```typescript
// Import: File DB -> Prisma
function convertLeadForImport(fileLead: SeedLead) {
  return {
    id: fileLead.id,
    createdAt: new Date(fileLead.createdAt),
    updatedAt: new Date(fileLead.updatedAt),
    source: fileLead.source as Source,
    locale: fileLead.locale as Locale | null,
    status: fileLead.status as WorkflowStatus,
    lastActionAt: fileLead.lastActionAt ? new Date(fileLead.lastActionAt) : null,
    email: fileLead.email,
    name: fileLead.name,
    phone: fileLead.phone,
    country: fileLead.country,
    company: fileLead.company,
    investorType: fileLead.investorType,
    ticket: fileLead.ticket,
    interest: fileLead.interest,
    notes: fileLead.notes,
    meta: fileLead.meta,
  };
}

// Export: Prisma -> Application (LeadRecord)
function convertLeadFromPrisma(prismaLead: PrismaLead): LeadRecord {
  return {
    id: prismaLead.id,
    kind: 'lead',
    createdAt: prismaLead.createdAt.toISOString(),
    updatedAt: prismaLead.updatedAt.toISOString(),
    source: prismaLead.source as SubmissionSource,
    locale: prismaLead.locale as EntityLocale | undefined,
    status: prismaLead.status as WorkflowStatus,
    lastActionAt: prismaLead.lastActionAt?.toISOString(),
    email: prismaLead.email,
    name: prismaLead.name ?? undefined,
    phone: prismaLead.phone ?? undefined,
    country: prismaLead.country ?? undefined,
    company: prismaLead.company ?? undefined,
    investorType: prismaLead.investorType ?? undefined,
    ticket: prismaLead.ticket ?? undefined,
    interest: prismaLead.interest ?? undefined,
    notes: prismaLead.notes ?? undefined,
    meta: prismaLead.meta as Record<string, unknown> | undefined,
    tags: prismaLead.tags?.map(t => t.value),
    internalNotes: prismaLead.internalNotes?.map(n => ({
      id: n.id,
      text: n.text,
      createdAt: n.createdAt.toISOString(),
      author: n.author ?? undefined,
    })),
  };
}
```

---

## Summary Table

| Entity | File DB | Seed Export | Prisma Model |
|--------|---------|-------------|--------------|
| Lead | LeadRecord | SeedLead | Lead |
| Request | RequestRecord | SeedRequest | Request |
| Lead Note | InternalNote (embedded) | SeedInternalNote | LeadNote |
| Request Note | InternalNote (embedded) | SeedInternalNote | RequestNote |
| Lead Tag | string[] (embedded) | SeedTag | LeadTag |
| Request Tag | string[] (embedded) | SeedTag | RequestTag |

---

## Related Documents

- [PRISMA_POSTGRES_BLUEPRINT.md](./PRISMA_POSTGRES_BLUEPRINT.md) - Full migration guide
- [/prisma/schema.prisma](../../prisma/schema.prisma) - Prisma schema blueprint
- [/src/lib/domain/types.ts](../../src/lib/domain/types.ts) - TypeScript domain types
- [/src/lib/migrate/seed.ts](../../src/lib/migrate/seed.ts) - Seed export transformer
