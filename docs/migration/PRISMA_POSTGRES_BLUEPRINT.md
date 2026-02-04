# Prisma/Postgres Migration Blueprint

This document provides a step-by-step migration plan for transitioning FlyANGT from file-based storage (MVP) to Prisma with PostgreSQL.

## Table of Contents

1. [Purpose and Scope](#purpose-and-scope)
2. [Preconditions](#preconditions)
3. [Step-by-Step Migration Plan](#step-by-step-migration-plan)
4. [Adapter Switch Strategy](#adapter-switch-strategy)
5. [Verification Checklist](#verification-checklist)
6. [Rollback Plan](#rollback-plan)
7. [Production Readiness Checklist](#production-readiness-checklist)

---

## Purpose and Scope

### Current State (MVP)

- Storage: File-based config DB (`/src/data/db/`)
- Each record stored as individual JSON file
- Leads: `leads/ld-{timestamp}-{random}.json`
- Requests: `requests/rq-{timestamp}-{random}.json`
- No external database dependency

### Target State (Post-MVP)

- Storage: PostgreSQL via Prisma ORM
- Normalized tables for leads, requests, notes, tags
- Full ACID compliance
- Proper indexing and query optimization
- Scalable for production workloads

### Scope

This migration covers:
- Lead records
- Request records
- Internal notes (normalized from embedded arrays)
- Tags (normalized from embedded arrays)
- Workflow status lifecycle
- All existing data preservation

---

## Preconditions

### Infrastructure Requirements

- [ ] PostgreSQL instance available (local, Docker, or managed service)
- [ ] `DATABASE_URL` environment variable configured
- [ ] Network access from application to database

### Backup Requirements

- [ ] Full backup of `/src/data/db` folder
- [ ] Export artifacts from `/migrate` tool:
  - `flyangt-migrate-raw.json` (original format)
  - `flyangt-migrate-seed.json` (normalized tables)
  - `flyangt-migrate-validation.json` (data integrity report)
  - `flyangt-migrate-map.json` (field mapping)

### Development Environment

- [ ] Node.js 18+ installed
- [ ] Git repository clean (no uncommitted changes)
- [ ] All tests passing on current MVP

### Knowledge Requirements

- Familiarity with Prisma CLI
- Understanding of PostgreSQL basics
- Access to `/migrate` dev tool for exports

---

## Step-by-Step Migration Plan

### Phase 1: Preparation

#### Step 1.1: Export Current Data

```bash
# Navigate to /migrate in dev mode
# Download all export artifacts:
# - raw.json
# - seed.json
# - validation.json
# - map.json

# Store exports in a safe location
mkdir -p ./migration-backup
cp ./exports/* ./migration-backup/
```

#### Step 1.2: Verify Data Integrity

Open `/migrate` and check:
- [ ] Validation report shows no critical issues
- [ ] All invalid emails documented
- [ ] All duplicate emails documented
- [ ] Note counts match expectations

#### Step 1.3: Backup File DB

```bash
# Create timestamped backup
cp -r ./src/data/db ./src/data/db-backup-$(date +%Y%m%d)
```

### Phase 2: Prisma Setup

#### Step 2.1: Install Prisma

```bash
# Install Prisma dependencies
npm install prisma --save-dev
npm install @prisma/client

# Verify installation
npx prisma --version
```

#### Step 2.2: Configure Environment

```bash
# Create or update .env file
echo 'DATABASE_URL="postgresql://user:password@localhost:5432/flyangt?schema=public"' >> .env

# Add to .gitignore if not present
echo '.env' >> .gitignore
```

#### Step 2.3: Initialize Prisma

```bash
# Schema already exists at /prisma/schema.prisma
# Generate Prisma Client
npx prisma generate
```

### Phase 3: Database Migration

#### Step 3.1: Create Database Tables

```bash
# Create migration from schema
npx prisma migrate dev --name init

# This creates:
# - Lead table
# - Request table
# - LeadNote table
# - RequestNote table
# - LeadTag table
# - RequestTag table
# - All indexes and constraints
```

#### Step 3.2: Verify Schema

```bash
# Open Prisma Studio to inspect tables
npx prisma studio
```

### Phase 4: Data Import

#### Step 4.1: Create Import Script

Create `/scripts/import-seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import seedData from '../migration-backup/flyangt-migrate-seed.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting import...');

  // Import Leads
  console.log(`Importing ${seedData.Lead.length} leads...`);
  for (const lead of seedData.Lead) {
    await prisma.lead.upsert({
      where: { id: lead.id },
      update: {
        createdAt: new Date(lead.createdAt),
        updatedAt: new Date(lead.updatedAt),
        source: lead.source,
        locale: lead.locale,
        status: lead.status,
        lastActionAt: lead.lastActionAt ? new Date(lead.lastActionAt) : null,
        email: lead.email,
        name: lead.name,
        phone: lead.phone,
        country: lead.country,
        company: lead.company,
        investorType: lead.investorType,
        ticket: lead.ticket,
        interest: lead.interest,
        notes: lead.notes,
        meta: lead.meta,
      },
      create: {
        id: lead.id,
        createdAt: new Date(lead.createdAt),
        updatedAt: new Date(lead.updatedAt),
        source: lead.source,
        locale: lead.locale,
        status: lead.status,
        lastActionAt: lead.lastActionAt ? new Date(lead.lastActionAt) : null,
        email: lead.email,
        name: lead.name,
        phone: lead.phone,
        country: lead.country,
        company: lead.company,
        investorType: lead.investorType,
        ticket: lead.ticket,
        interest: lead.interest,
        notes: lead.notes,
        meta: lead.meta,
      },
    });
  }

  // Import Requests
  console.log(`Importing ${seedData.Request.length} requests...`);
  for (const request of seedData.Request) {
    await prisma.request.upsert({
      where: { id: request.id },
      update: {
        createdAt: new Date(request.createdAt),
        updatedAt: new Date(request.updatedAt),
        source: request.source,
        locale: request.locale,
        status: request.status,
        lastActionAt: request.lastActionAt ? new Date(request.lastActionAt) : null,
        payload: request.payload,
      },
      create: {
        id: request.id,
        createdAt: new Date(request.createdAt),
        updatedAt: new Date(request.updatedAt),
        source: request.source,
        locale: request.locale,
        status: request.status,
        lastActionAt: request.lastActionAt ? new Date(request.lastActionAt) : null,
        payload: request.payload,
      },
    });
  }

  // Import Lead Notes
  console.log(`Importing ${seedData.InternalNote.filter(n => n.entityType === 'lead').length} lead notes...`);
  for (const note of seedData.InternalNote.filter(n => n.entityType === 'lead')) {
    await prisma.leadNote.upsert({
      where: { id: note.id },
      update: {
        leadId: note.entityId,
        createdAt: new Date(note.createdAt),
        author: note.author,
        text: note.text,
      },
      create: {
        id: note.id,
        leadId: note.entityId,
        createdAt: new Date(note.createdAt),
        author: note.author,
        text: note.text,
      },
    });
  }

  // Import Request Notes
  console.log(`Importing ${seedData.InternalNote.filter(n => n.entityType === 'request').length} request notes...`);
  for (const note of seedData.InternalNote.filter(n => n.entityType === 'request')) {
    await prisma.requestNote.upsert({
      where: { id: note.id },
      update: {
        requestId: note.entityId,
        createdAt: new Date(note.createdAt),
        author: note.author,
        text: note.text,
      },
      create: {
        id: note.id,
        requestId: note.entityId,
        createdAt: new Date(note.createdAt),
        author: note.author,
        text: note.text,
      },
    });
  }

  // Import Lead Tags
  console.log(`Importing ${seedData.Tag.filter(t => t.entityType === 'lead').length} lead tags...`);
  for (const tag of seedData.Tag.filter(t => t.entityType === 'lead')) {
    await prisma.leadTag.upsert({
      where: { id: tag.id },
      update: {
        leadId: tag.entityId,
        value: tag.value,
      },
      create: {
        id: tag.id,
        leadId: tag.entityId,
        value: tag.value,
      },
    });
  }

  // Import Request Tags
  console.log(`Importing ${seedData.Tag.filter(t => t.entityType === 'request').length} request tags...`);
  for (const tag of seedData.Tag.filter(t => t.entityType === 'request')) {
    await prisma.requestTag.upsert({
      where: { id: tag.id },
      update: {
        requestId: tag.entityId,
        value: tag.value,
      },
      create: {
        id: tag.id,
        requestId: tag.entityId,
        value: tag.value,
      },
    });
  }

  console.log('Import complete!');

  // Verify counts
  const leadCount = await prisma.lead.count();
  const requestCount = await prisma.request.count();
  const leadNoteCount = await prisma.leadNote.count();
  const requestNoteCount = await prisma.requestNote.count();
  const leadTagCount = await prisma.leadTag.count();
  const requestTagCount = await prisma.requestTag.count();

  console.log('\nVerification:');
  console.log(`Leads: ${leadCount} (expected: ${seedData.Lead.length})`);
  console.log(`Requests: ${requestCount} (expected: ${seedData.Request.length})`);
  console.log(`Lead Notes: ${leadNoteCount}`);
  console.log(`Request Notes: ${requestNoteCount}`);
  console.log(`Lead Tags: ${leadTagCount}`);
  console.log(`Request Tags: ${requestTagCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

#### Step 4.2: Run Import

```bash
# Run with ts-node or compile first
npx ts-node scripts/import-seed.ts
```

#### Step 4.3: Verify Import Counts

Compare output with `/migrate` validation report:
- [ ] Lead count matches
- [ ] Request count matches
- [ ] Note counts match (split by entity type)
- [ ] Tag counts match (split by entity type)

### Phase 5: Adapter Switch

#### Step 5.1: Implement Prisma Repositories

Update `/src/lib/adapters/prismaDb/prismaDb.ts` (new file):

```typescript
import { PrismaClient } from '@prisma/client';
import type { LeadRepository, RequestRepository } from '$lib/domain/repositories';
// ... full implementation
```

#### Step 5.2: Update Adapter Configuration

In `/src/lib/adapters/index.ts`, change:

```typescript
const CURRENT_ADAPTER: AdapterType = 'prisma'; // was 'configDb'
```

#### Step 5.3: Test with Dev Tools

- [ ] Run `/admin` - verify leads and requests load
- [ ] Run `/migrate` - verify counts match
- [ ] Run `/smoke` - verify all smoke tests pass
- [ ] Run `/gate` - verify all gate checks pass

### Phase 6: Verification

#### Step 6.1: Run Full Test Suite

```bash
npm run build
npm run test
```

#### Step 6.2: Manual Spot Checks

- [ ] Pick 5 random lead IDs from seed.json
- [ ] Verify each exists in Postgres with correct data
- [ ] Check status, notes, and tags preserved

#### Step 6.3: Functional Testing

- [ ] Submit new lead via presale form
- [ ] Submit new request via configurator
- [ ] Update status in /admin
- [ ] Add internal note in /admin
- [ ] Add tag in /admin

### Phase 7: Cleanup

#### Step 7.1: Deprecate File DB

```bash
# Rename to indicate deprecated
mv ./src/data/db ./src/data/db-deprecated-readonly

# Add README
echo "This folder is deprecated. Data has been migrated to Postgres." > ./src/data/db-deprecated-readonly/README.txt
```

#### Step 7.2: Update Documentation

- [ ] Update README.md with new database requirements
- [ ] Update deployment documentation
- [ ] Archive this migration guide

---

## Adapter Switch Strategy

### Configuration Flag

The adapter system uses a single flag to control storage mode:

```typescript
// In /src/lib/adapters/index.ts
const CURRENT_ADAPTER: AdapterType = 'configDb' | 'prisma';
```

### Repository Interface Stability

The repository interfaces remain unchanged:
- `LeadRepository`
- `RequestRepository`

Both `configDb` and `prisma` adapters implement these same interfaces.

### Gradual Rollout Plan

For zero-downtime migration:

1. **Phase A**: Read from Prisma, write to both
   - Prisma is primary read source
   - Writes go to both Prisma and file DB
   - File DB serves as backup

2. **Phase B**: Full Prisma mode
   - All reads and writes go to Prisma
   - File DB export runs daily as backup

3. **Phase C**: Deprecate file DB
   - Remove file DB write logic
   - Keep read-only backup for rollback

---

## Verification Checklist

### Data Integrity

- [ ] Lead count matches validation report
- [ ] Request count matches validation report
- [ ] Note count matches validation report
- [ ] Tag count matches validation report
- [ ] No data loss (spot check 10 random records)

### Field Preservation

- [ ] All IDs preserved (ld-*, rq-*, note-*)
- [ ] All timestamps preserved (createdAt, updatedAt, lastActionAt)
- [ ] All status values preserved (new, reviewed, contacted, closed, archived)
- [ ] All source values preserved (presale, configurator_quote, etc.)
- [ ] All locale values preserved (en, ru)
- [ ] All JSON fields preserved (meta, payload)

### Functionality

- [ ] Forms still submit successfully
- [ ] Admin viewer shows all records
- [ ] Status updates work
- [ ] Note creation works
- [ ] Tag management works
- [ ] Export functions work

### Dev Tools

- [ ] /migrate exports match previous counts
- [ ] /admin loads and filters correctly
- [ ] /smoke all tests pass
- [ ] /gate all checks pass
- [ ] /release shows green status

---

## Rollback Plan

If issues are discovered after migration:

### Immediate Rollback (within 24 hours)

1. Switch adapter back to configDb:
   ```typescript
   const CURRENT_ADAPTER: AdapterType = 'configDb';
   ```

2. Restore file DB backup:
   ```bash
   rm -rf ./src/data/db
   cp -r ./src/data/db-backup-YYYYMMDD ./src/data/db
   ```

3. Rebuild and redeploy:
   ```bash
   npm run build
   # Deploy to production
   ```

### Partial Rollback (after data divergence)

If new data was created in Prisma:

1. Export new records from Prisma:
   ```sql
   SELECT * FROM "Lead" WHERE "createdAt" > '2024-XX-XX';
   SELECT * FROM "Request" WHERE "createdAt" > '2024-XX-XX';
   ```

2. Convert to file DB format and add to backup

3. Follow immediate rollback steps

### Prevention

- Run migration during low-traffic period
- Monitor error rates for 24 hours post-migration
- Keep file DB backup for 30 days minimum

---

## Production Readiness Checklist

Before going live with Prisma:

### Infrastructure

- [ ] Production Postgres instance provisioned
- [ ] Database backups configured (daily)
- [ ] Connection pooling configured (if needed)
- [ ] DATABASE_URL in production environment

### Performance

- [ ] Index usage verified with EXPLAIN ANALYZE
- [ ] Query performance acceptable (<100ms for common queries)
- [ ] Connection pool size appropriate for load

### Security

- [ ] Database user has minimal required permissions
- [ ] SSL connection enabled
- [ ] DATABASE_URL not logged or exposed

### Monitoring

- [ ] Database metrics monitored (connections, query time)
- [ ] Application error tracking configured
- [ ] Alerts set for database issues

### Documentation

- [ ] Runbook updated with database procedures
- [ ] On-call documentation includes DB access
- [ ] Recovery procedures documented and tested

### Testing

- [ ] Load testing completed
- [ ] Failover testing completed (if applicable)
- [ ] Rollback procedure tested

---

## Appendix

### Related Documents

- [MIGRATION_MAP_APPENDIX.md](./MIGRATION_MAP_APPENDIX.md) - Field mapping details
- [/src/lib/adapters/prismaDb/README.md](../../src/lib/adapters/prismaDb/README.md) - Adapter implementation notes
- [/prisma/schema.prisma](../../prisma/schema.prisma) - Schema blueprint

### Dev Tools Reference

- `/migrate` - Export data and validation reports
- `/admin` - View and manage records
- `/smoke` - Run smoke tests
- `/gate` - Check release readiness
- `/release` - Release management

### Support

For migration issues:
1. Check validation report from /migrate
2. Compare counts before and after
3. Review import script logs
4. Check Prisma Studio for data inspection
