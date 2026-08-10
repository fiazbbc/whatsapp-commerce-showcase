# WhatsApp Commerce Operations — Engineering Showcase

A portfolio case study for a multi-tenant commerce platform that brings
WhatsApp conversations, catalog-grounded sales assistance, COD orders,
inventory, delivery operations, and human handoff into one workspace.

This repository is deliberately limited to a synthetic-data interface,
architecture documentation, and generic TypeScript patterns. The production
application, integrations, data model, infrastructure, and commercial logic are
maintained privately.

## What this demonstrates

- Product thinking across seller onboarding, conversations, orders, inventory,
  delivery, billing, and administration
- A responsive React and TypeScript operations interface
- Tenant authorization derived from verified membership—not client input
- Guarded order transitions and concurrency-safe inventory reservations
- Server-authoritative prices, stock, delivery fees, totals, and statuses
- Controlled sales-assistant tools with read-only preview enforcement
- Unit and end-to-end testing as delivery evidence

## Demo

The demo uses synthetic records only. It makes no network requests and contains
no real WhatsApp account, customer data, credentials, API endpoints, production
schema, or deployable backend.

```bash
corepack enable
pnpm install
pnpm dev
```

Open `http://127.0.0.1:4173`.

## Validation

```bash
pnpm typecheck
pnpm test
pnpm build
```

The private implementation's latest acceptance snapshot completed 88 unit tests
and 39 end-to-end tests. The smaller test suite in this repository verifies only
the public, generic domain examples.

## Repository map

```text
src/
  domain/                 Generic, independently testable engineering patterns
  main.tsx                Synthetic operations showcase
  mock-data.ts            Non-sensitive display records
docs/
  ARCHITECTURE.md         High-level system boundaries
  ENGINEERING.md          Selected decisions and tradeoffs
  SECURITY.md             Public security summary
NOTICE.md                 Portfolio-use and copyright notice
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Engineering decisions](docs/ENGINEERING.md)
- [Security approach](docs/SECURITY.md)

## Source availability

This is a portfolio demonstration, not an open-source distribution of the
commercial system. No open-source license is granted. See [NOTICE.md](NOTICE.md).
