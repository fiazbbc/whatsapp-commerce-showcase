# WhatsApp Commerce Operations Showcase

A synthetic-data engineering showcase for a larger multi-tenant WhatsApp
commerce system, presented as a setup-free interactive demo.

## Live Demo
[**Try the interactive demo →**](https://whatsapp-commerce-showcase.vercel.app)

Replace the placeholder after the first Vercel deployment. The demo is static
and offline: it is not connected to WhatsApp, production services, or real
customer data.

## What the project does

The interface follows a fictional retailer from a customer’s product question
through catalog assistance, cash-on-delivery order capture, stock reservation,
fulfillment, delivery tracking, and human support. No login or setup is needed.

Visitors can explore Dashboard, Conversations, Customers, Orders, Products &
Inventory, and Deliveries using preloaded synthetic records.

## Key features

- AI-assisted catalog sales with server-authoritative price and stock concepts
- WhatsApp commerce and cash-on-delivery workflow demonstration
- Customer, order, product, inventory, and delivery operations
- Inventory reservations and guarded order-status transitions
- Visible human handoff when automation should stop
- Responsive, accessible navigation for desktop and mobile
- Fully static browser experience with no API or data persistence

## Engineering highlights

- Multi-tenant boundaries with membership-derived tenant context
- Role-based permissions and tenant isolation at multiple layers
- Concurrency-safe inventory reservation patterns
- Idempotent message, order, and background-work concepts
- Allowlisted automation tools and authoritative commercial facts
- Strict TypeScript and independently testable generic domain examples

## Architecture

The larger private system separates channel adapters, authenticated API
boundaries, tenant-scoped domain services, data, and background work. This
repository includes only a high-level diagram and generic examples—never the
production schema or integrations.

See [Architecture](docs/ARCHITECTURE.md) and
[Engineering decisions](docs/ENGINEERING.md).

## Security and design principles

- Every displayed identity, conversation, order, product, and shipment is
  fictional.
- No WhatsApp session, phone number, credential, secret, production URL, or
  customer record is required or included.
- Prices, inventory, delivery fees, totals, and statuses are treated as
  authoritative server facts in the documented design.
- Automation yields to a human on policy, confidence, or customer-request
  boundaries.
- The public demo performs no network requests and stores no visitor data.

See the [public security summary](docs/SECURITY.md).

## Tech stack

- React 19
- TypeScript 5 with strict checking
- Vite 7
- Vitest
- CSS with no runtime UI dependency
- pnpm workspace tooling
- Vercel static hosting configuration

## Running locally

Requirements: Node.js 22 or newer. pnpm is the recommended package manager.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://127.0.0.1:4173`.

Standard npm commands are also supported:

```bash
npm install
npm run build
```

## Deploying to Vercel

Import this GitHub repository as a new Vercel project and keep the repository
root as the project root. The committed `vercel.json` selects Vite, installs
with the frozen pnpm lockfile, runs `pnpm build`, publishes `dist`, and provides
SPA fallback routing. No environment variables or external services are
needed.

## Tests

```bash
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
```

The tests cover the public generic domain patterns and enforce synthetic-demo
data invariants. `pnpm build` produces a self-contained static site in `dist/`.

## Repository limitations

This repository intentionally excludes the private production application,
APIs, database schema, prompts, integrations, infrastructure, credentials,
customer data, and proprietary commercial logic. It is a portfolio
demonstration, not an open-source distribution or a production WhatsApp client.
No open-source license is granted; see [NOTICE.md](NOTICE.md).

## Suggested GitHub metadata

Configure these manually in the repository’s **About** settings:

**Description**

> Interactive showcase of an AI-assisted WhatsApp commerce operations platform
> built with React + TypeScript.

**Topics**

`react` · `typescript` · `whatsapp` · `ai` · `ecommerce` · `saas` ·
`inventory-management` · `order-management`

After deployment, place the Vercel URL in GitHub’s **Website** field and replace
the Live Demo placeholder near the top of this file.
