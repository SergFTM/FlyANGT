# FlyANGT Architecture Guide

**A comprehensive guide to the FlyANGT project structure and design patterns.**

## 📋 Table of Contents

1. Core Principles
2. Layer Architecture
3. Design Patterns
4. Data Flow
5. Extension Guide
6. Future Migration

---

## 🎯 Core Principles

### 1. Configuration-Driven Design
Everything configurable lives in `/src/config/`. The app reads from these files at startup and never hardcodes behavior.

**Example:**
```typescript
// Add a new route - update config only
// routes.config.ts
{
  path: '/new-feature',
  label: 'New Feature',
  isVisible: true,
  module: 'new-feature'
}

// That's it - navigation auto-updates
```

### 2. Explicit Over Implicit
Each file has a single, clear responsibility. Complexity is explicit, not hidden.

**Bad (implicit complexity):**
```typescript
// Hidden logic in component
const isModuleEnabled = checkModuleWithConditions();
```

**Good (explicit):**
```typescript
// Check config, very clear
import { isModuleEnabled } from '$config/modules.config';
const enabled = isModuleEnabled('tokenization');
```

### 3. Content Separation
Content (text, data) is completely separate from rendering logic.

```typescript
// src/content/pages/home.ts - Pure data
export const homeContent = {
  headline: 'Welcome to FlyANGT',
  features: [...]
};

// src/routes/+page.svelte - Pure rendering
<HeroSection
  headline={data.content.headline}
  features={data.content.features}
/>
```

### 4. Type Safety
100% TypeScript. Every interface is defined, every function is typed.

```typescript
export interface Feature {
  id: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  { id: 'f1', title: '...', description: '...' }
];
```

### 5. Adapter Pattern for Data
Data comes from adapters, not direct config imports. Makes DB migration trivial.

```typescript
// Config adapter (current)
const data = configAdapter.getRoutes();

// Swap to database adapter later
const data = await dbAdapter.getRoutes();
// Same interface, different implementation
```

---

## 🏗️ Layer Architecture

### Layer 1: Configuration (`/src/config/`)
**Responsibility**: Define what the app can do.

```
app.config.ts          → App identity & environment
routes.config.ts       → Available routes & navigation
modules.config.ts      → Which modules are active
content.config.ts      → Content-to-route mapping
permissions.config.ts  → RBAC structure
i18n.config.ts         → Languages
features.config.ts     → Feature toggles
```

**Dependencies**: None (other than TypeScript)

**Used By**: Adapters, stores, components

### Layer 2: Content (`/src/content/`)
**Responsibility**: Define what the app says.

```
pages/home.ts          → Text & data for home page
pages/ecosystem.ts     → Text & data for ecosystem
... (one file per page)
```

**Rule**: No HTML, no logic - pure data structures.

**Dependencies**: None

**Used By**: Page loaders (+page.ts files)

### Layer 3: Stores (`/src/lib/stores/`)
**Responsibility**: Manage runtime state.

```
app.store.ts           → App state (locale, theme)
ui.store.ts            → UI state (modals, notifications)
user.store.ts          → User state (login info)
feature.store.ts       → Feature flag state
```

**Dependencies**: Svelte's writable store

**Used By**: Components, pages

### Layer 4: Adapters (`/src/lib/server/adapters/`)
**Responsibility**: Provide data to the app.

```
config.adapter.ts      → Loads from config files
db.adapter.ts          → (Future) Loads from database
```

**Interface**: IConfigAdapter (same for both)

**Dependencies**: Config or database

**Used By**: Page loaders

### Layer 5: Components (`/src/lib/components/`)
**Responsibility**: Render UI.

```
layout/                → Header, footer, structure
navigation/            → Navigation, menus
sections/              → Page sections (hero, grid)
buttons/               → Button component
ui/                    → Other UI components
```

**Rules**:
- Receive data only via props
- No side effects
- No config imports
- Fully typed

**Used By**: Pages

### Layer 6: Routes (`/src/routes/`)
**Responsibility**: SvelteKit routing and page loading.

```
+layout.svelte         → Root layout
+page.ts               → Data loader (load function)
+page.svelte           → Page component
[route]/               → Nested routes
```

**Pattern**:
1. `+page.ts` loads data from adapter
2. `+page.svelte` renders with data
3. Components keep everything DRY

---

## 🔄 Design Patterns

### Pattern 1: Config-Driven Features

**Problem**: How do we change app behavior without touching code?

**Solution**: Everything goes in config.

```typescript
// Add feature to config
features.config.ts:
{
  id: 'feature:payments',
  name: 'Payment Processing',
  enabled: false  // ← Toggle here
}

// Use in component
import { isFeatureEnabled } from '$config/features.config';

{#if isFeatureEnabled('feature:payments')}
  <PaymentSection />
{/if}
```

### Pattern 2: Content-Driven Pages

**Problem**: How do we keep pages DRY and maintainable?

**Solution**: Config + Content + Components

```typescript
// 1. Define route in config
routes.config.ts: { path: '/ecosystem', ... }

// 2. Create content
content/pages/ecosystem.ts: { headline, partners, ... }

// 3. Create page loader
routes/ecosystem/+page.ts: load() reads config + content

// 4. Create page component
routes/ecosystem/+page.svelte: receives data via props

// Result: Content lives in one place, reusable components
```

### Pattern 3: Adapter-Based Data

**Problem**: How do we switch from config to database?

**Solution**: Adapter pattern.

```typescript
// Define interface
export interface IConfigAdapter {
  getRoutes(): RouteConfig[];
  getModules(): ModuleConfig[];
  // ... other methods
}

// Current implementation
export class ConfigAdapter implements IConfigAdapter {
  getRoutes() { return routes; }
  getModules() { return modulesConfig; }
}

// Future implementation
export class DatabaseAdapter implements IConfigAdapter {
  async getRoutes() { return await db.query('SELECT * FROM routes'); }
  async getModules() { return await db.query('SELECT * FROM modules'); }
}

// Use same interface for both!
const adapter = useDatabase ? new DatabaseAdapter() : new ConfigAdapter();
const routes = await adapter.getRoutes();
```

### Pattern 4: Typed Stores

**Problem**: How do we manage state safely?

**Solution**: Typed Svelte stores.

```typescript
export interface AppState {
  locale: string;
  theme: 'light' | 'dark';
  appReady: boolean;
}

function createAppStore() {
  const { subscribe, set, update } = writable<AppState>({
    locale: 'en',
    theme: 'light',
    appReady: false,
  });

  return {
    subscribe,
    setLocale: (locale: string) => { /* ... */ },
    setTheme: (theme: 'light' | 'dark') => { /* ... */ },
    // ... other methods
  };
}
```

### Pattern 5: Dumb Components

**Problem**: How do we make components reusable?

**Solution**: Props only, no logic.

```svelte
<script lang="ts">
  // Props only - no imports from config
  export let headline: string;
  export let features: Feature[];
  export let columns: 1 | 2 | 3 = 3;
  
  // No config imports
  // No state mutations
  // No side effects
</script>

<section class={`grid grid-cols-${columns}`}>
  {#each features as feature (feature.id)}
    <Card {feature} />
  {/each}
</section>
```

---

## 📊 Data Flow

### Flow 1: Static Page Load

```
Route Definition
  ↓
routes.config.ts
  ↓
Page Loader (+page.ts)
  ↓
Config Adapter
  ↓
Import Config + Content
  ↓
Return Data to Page (+page.svelte)
  ↓
Props to Components
  ↓
Render HTML
```

**Example**: Loading home page

```typescript
// 1. routes.config.ts defines route
{ path: '/', label: 'Home', ... }

// 2. +page.ts loads data
import { homeContent } from '$content/pages/home';
export async function load() {
  return { content: homeContent };
}

// 3. +page.svelte receives data
let { data } = $props();
<HeroSection
  headline={data.content.heroSection.headline}
  ...
/>

// 4. Component renders
<HeroSection {...props} />
```

### Flow 2: Feature Toggle

```
Config Check
  ↓
features.config.ts
  ↓
isFeatureEnabled(featureId)
  ↓
Component Checks Status
  ↓
Conditional Render
```

**Example**: Showing feature

```svelte
import { isFeatureEnabled } from '$config/features.config';

{#if isFeatureEnabled('feature:payments')}
  <PaymentModule />
{/if}
```

### Flow 3: Language Switch

```
User Selects Language
  ↓
LanguageSwitcher Component
  ↓
appStore.setLocale()
  ↓
Store Subscription Updates
  ↓
Components Re-render
```

**Example**: Language switching

```svelte
<LanguageSwitcher />  <!-- Changes appStore.locale -->

<Component bind:locale={$appStore.locale} />
```

### Flow 4: Route Navigation

```
User Clicks Link
  ↓
Navigation Component
  ↓
SvelteKit Router
  ↓
+page.ts Load Function
  ↓
Get Data from Adapter
  ↓
+page.svelte Renders
```

---

## 🚀 Extension Guide

### How to Add a New Page

1. **Add route to config**
   ```typescript
   // src/config/routes.config.ts
   {
     path: '/my-page',
     label: 'My Page',
     icon: 'icon',
     isVisible: true,
     module: 'my-module'
   }
   ```

2. **Create content**
   ```typescript
   // src/content/pages/my-page.ts
   export interface MyPageContent {
     headline: string;
     description: string;
   }
   
   export const myPageContent: MyPageContent = {
     headline: '...',
     description: '...'
   };
   ```

3. **Create page loader**
   ```typescript
   // src/routes/my-page/+page.ts
   import { myPageContent } from '$content/pages/my-page';
   
   export async function load() {
     return { content: myPageContent };
   }
   ```

4. **Create page component**
   ```svelte
   // src/routes/my-page/+page.svelte
   <script lang="ts">
     let { data } = $props();
   </script>
   
   <HeroSection
     headline={data.content.headline}
     description={data.content.description}
   />
   ```

5. **Navigation auto-updates** ✨

### How to Add a New Module

1. **Enable in config**
   ```typescript
   // src/config/modules.config.ts
   {
     id: 'my-module',
     name: 'My Module',
     enabled: true,
     description: 'Module description'
   }
   ```

2. **Add permission (if needed)**
   ```typescript
   // src/config/permissions.config.ts
   {
     id: 'view:my-module',
     name: 'View My Module',
     description: '...'
   }
   ```

3. **Create components**
   ```typescript
   // src/lib/components/modules/MyModule.svelte
   ```

4. **Use in pages**
   ```svelte
   {#if isModuleEnabled('my-module')}
     <MyModule />
   {/if}
   ```

### How to Add a Feature Flag

1. **Add to config**
   ```typescript
   // src/config/features.config.ts
   {
     id: 'feature:my-feature',
     name: 'My Feature',
     enabled: true,
     description: '...'
   }
   ```

2. **Use in component**
   ```svelte
   {#if isFeatureEnabled('feature:my-feature')}
     <MyFeature />
   {/if}
   ```

### How to Add a Store

1. **Create store file**
   ```typescript
   // src/lib/stores/my.store.ts
   import { writable } from 'svelte/store';
   
   export interface MyState {
     // Define state shape
   }
   
   function createMyStore() {
     const { subscribe, set, update } = writable<MyState>({
       // Initial state
     });
     
     return {
       subscribe,
       // Add methods
     };
   }
   
   export const myStore = createMyStore();
   ```

2. **Use in component**
   ```svelte
   import { myStore } from '$lib/stores/my.store';
   
   {#if $myStore.condition}
     ...
   {/if}
   ```

---

## 🗄️ Future Database Migration

### When You're Ready

1. **Create database adapter**
   ```typescript
   // src/lib/server/adapters/db.adapter.ts
   export class DatabaseAdapter implements IConfigAdapter {
     // Implement interface
   }
   ```

2. **Update environment variable**
   ```bash
   VITE_USE_DATABASE=true
   ```

3. **Switch in config loader**
   ```typescript
   export function getConfigAdapter(): IConfigAdapter {
     const useDatabase = process.env.VITE_USE_DATABASE === 'true';
     return useDatabase ? new DatabaseAdapter() : new ConfigAdapter();
   }
   ```

4. **Everything else stays the same** ✨

### What Changes

```typescript
// Before (config)
const routes = routes.config.ts;

// After (database)
const routes = await db.query('SELECT * FROM routes');

// The interface is the same!
```

---

## 🎨 Styling Guide

### Tailwind CSS

All styling uses Tailwind CSS utility classes.

```svelte
<div class="max-w-6xl mx-auto px-4 py-16">
  <h1 class="text-4xl font-bold mb-6 text-gray-900">
    Heading
  </h1>
</div>
```

### Creating Global Styles

```css
/* app.css */
@import "tailwindcss";

.card {
  @apply bg-white rounded-lg border border-gray-200 p-6;
}

.card:hover {
  @apply shadow-lg;
}
```

### Component Styles

```svelte
<style>
  :global(body) {
    font-family: system-ui;
  }
</style>
```

---

## 🧪 Testing (Future)

When you add testing:

```typescript
// Component test
import { render } from '@testing-library/svelte';
import Button from '$lib/components/buttons/Button.svelte';

test('Button renders', () => {
  const { getByText } = render(Button, {
    props: { variant: 'primary' }
  });
  expect(getByText('Click me')).toBeInTheDocument();
});
```

---

## 📊 Performance

### Current

- ✅ No runtime config parsing
- ✅ All config loaded at build time
- ✅ Zero state managers overhead
- ✅ Optimized Tailwind CSS

### Future Optimizations

- [ ] Asset optimization
- [ ] Code splitting per route
- [ ] Image optimization
- [ ] Caching strategies
- [ ] CDN deployment

---

## ✨ Summary

FlyANGT's architecture is:

1. **Configuration-Driven** - Change behavior in config
2. **Content-Separated** - Content lives in one place
3. **Component-Based** - Reusable, typed components
4. **Type-Safe** - 100% TypeScript
5. **Adapter-Ready** - Easy DB migration
6. **Scalable** - Easy to extend
7. **Maintainable** - Clear responsibilities
8. **Documented** - Comments everywhere

The structure is designed to grow with your project while maintaining clarity and organization.

---

**For questions about specific files, browse the comments in `/src/config/`, `/src/lib/components/`, and other directories.**
