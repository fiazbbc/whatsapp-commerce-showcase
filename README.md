# WhatsApp Commerce Operations — Interactive Showcase

A public, synthetic demonstration of a commerce workspace designed around
WhatsApp conversations. It shows how a fictional online store can answer
product questions, prepare cash-on-delivery orders, track inventory and
deliveries, and transfer a conversation to a human agent.

This repository is intentionally limited to a static interface, architecture
documentation, and generic TypeScript patterns. The production application,
integrations, data model, infrastructure, and commercial logic remain private.

## Demo

**Live demo:** _Vercel URL will be added here after the first deployment._

No login, setup, or WhatsApp account is needed. Everything is already filled
with fictional sample data and runs entirely in the browser. Visitors can use
the tabs to explore:

- **Dashboard** — a plain-language summary of today’s store activity
- **Conversations** — sample customer questions, verified replies, and a human
  handoff
- **Orders** — fictional cash-on-delivery orders and their workflow stages
- **Products & inventory** — sample variants, prices, available stock, and
  reservations
- **Deliveries** — fictional parcel checkpoints and expected arrival times

Nothing in the demo sends messages, changes a real order, connects to an API,
or stores visitor data.

### Run locally

Requirements: Node.js 22 or newer and Corepack.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://127.0.0.1:4173`.

### Deploy on Vercel

Import this GitHub repository into Vercel and deploy it with the repository
root as the project root. The included `vercel.json` selects the Vite preset,
runs `pnpm build`, and publishes the generated `dist` directory. No environment
variables, database, serverless functions, or external services are required.

## What this demonstrates

- Product thinking across customer conversations, order capture, inventory,
  delivery operations, and human support
- A responsive React and TypeScript interface designed for non-technical users
- Tenant authorization derived from verified membership rather than client
  input
- Guarded order transitions and concurrency-safe inventory reservations
- Server-authoritative prices, stock, delivery fees, totals, and statuses
- Controlled sales-assistant tools with read-only preview enforcement
- Runnable tests for the generic engineering patterns included here

## Validation

```bash
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
```

`pnpm build` creates a self-contained static site in `dist/`.

## Repository map

```text
src/
  domain/                 Generic, independently testable engineering patterns
  main.tsx                Interactive synthetic operations showcase
  mock-data.ts            Fictional conversations, products, orders and delivery records
docs/
  ARCHITECTURE.md         High-level system boundaries
  ENGINEERING.md          Selected decisions and tradeoffs
  SECURITY.md             Public security summary
vercel.json               Static Vite deployment settings
NOTICE.md                 Portfolio-use and copyright notice
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Engineering decisions](docs/ENGINEERING.md)
- [Security approach](docs/SECURITY.md)

## Source availability

This is a portfolio demonstration, not an open-source distribution of the
commercial system. No open-source license is granted. See [NOTICE.md](NOTICE.md).
