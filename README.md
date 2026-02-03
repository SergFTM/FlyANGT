# FlyANGT - Digital Aviation Platform

**Version**: 0.1.0 | **Status**: Foundation Scaffold (MVP)

A production-ready SvelteKit-based digital platform for aviation ownership, aircraft configuration, documentation, and tokenized participation.

## 🎯 Project Overview

FlyANGT is a configuration-driven, architecture-first platform designed for:

- ✈️ **Aviation Ownership** - Fractional and complete ownership management
- ⚙️ **Aircraft Configuration** - Complete documentation and setup
- 📋 **Compliance & Documentation** - Regulatory and documentation tools
- 🪙 **Tokenization** - Blockchain-ready tokenized participation
- 👥 **User Dashboards** - Personal portfolio and analytics
- 💰 **Presale & Ecosystem** - Early access and ecosystem modules

### Current Stage

**This is an MVP scaffold** - only the structural foundation is implemented. No business logic, authentication, payments, or blockchain integration yet.

## 📁 Architecture

### Core Principles

1. **Configuration-Driven** - All dynamic behavior comes from config files
2. **"Low Code, Many Files"** - Explicit structure > hidden complexity
3. **Content Separation** - Content lives separate from logic
4. **Type-Safe** - 100% TypeScript
5. **Database-Ready** - Adapter pattern for easy migration

## 🛠 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | SvelteKit (latest stable) |
| **Language** | TypeScript 5+ |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **State** | Svelte Stores (built-in) |
| **Database** | None (MVP) - Config files only |
| **Backend** | None (MVP) |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
```

## 📖 Routes Map

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Home landing | ✅ Ready |
| `/ecosystem` | Platform ecosystem | ✅ Ready |
| `/token` | Tokenization info | ✅ Ready |
| `/platform` | Core platform features | ✅ Ready |
| `/partners` | Partner information | ✅ Ready |
| `/investors` | Investment opportunities | ✅ Ready |
| `/customers` | Success stories | ✅ Ready |
| `/dashboard` | User dashboard | 📋 Placeholder |
| `/presale` | Presale program | 📋 Placeholder |

## 📁 Project Structure

```
src/
├── config/                    # Configuration layer
│   ├── app.config.ts
│   ├── routes.config.ts
│   ├── modules.config.ts
│   ├── content.config.ts
│   ├── permissions.config.ts
│   ├── i18n.config.ts
│   └── features.config.ts
├── content/pages/             # Content (static & semi-dynamic)
│   ├── home.ts
│   ├── ecosystem.ts
│   ├── tokenization.ts
│   ├── platform.ts
│   ├── partners.ts
│   ├── investors.ts
│   └── customers.ts
├── lib/
│   ├── components/            # UI components (dumb)
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── sections/
│   │   ├── buttons/
│   │   └── ui/
│   ├── stores/                # Svelte stores (app state)
│   │   ├── app.store.ts
│   │   ├── ui.store.ts
│   │   ├── user.store.ts
│   │   └── feature.store.ts
│   └── server/adapters/       # Data adapters
│       └── config.adapter.ts
└── routes/                    # SvelteKit routes
```

## 🎯 Key Features

- **Configuration-Driven** - All behavior driven by config files
- **Multi-Language** - English (en) and Russian (ru) supported
- **Type-Safe** - 100% TypeScript, strict mode
- **Component Architecture** - Reusable, dumb components
- **Database-Ready** - Adapter pattern for easy migration
- **Feature Flags** - Toggle features without recompiling
- **Module System** - Enable/disable modules dynamically

## 🏗️ What's NOT Implemented (By Design)

This is a MVP scaffold only:

- ❌ User authentication
- ❌ Payment processing
- ❌ Blockchain logic
- ❌ Database integration
- ❌ Real API integrations
- ❌ Backend server

## 📚 Documentation

- **README.md** (this file) - Project overview
- **ARCHITECTURE.md** - Detailed architecture
- **Config comments** - See `/src/config/` for detailed docs
- **Component comments** - See `/src/lib/components/` for component docs

## 🚨 Important Notes

1. This is a **scaffold only** - not a production app
2. All content is **placeholder**
3. Nothing persists - resets on refresh
4. No real authentication
5. No real payments

## 📝 Next Steps

1. Review the project structure
2. Explore `/src/config/` to understand configuration
3. Check `/src/content/` for content organization
4. Review component structure in `/src/lib/components/`
5. Start building business logic in Phase 1

## 📄 License

Proprietary - FlyANGT Platform

---

**Last Updated**: February 2026  
**Scaffold Version**: 1.0.0  
**Status**: Ready for Development ✅
