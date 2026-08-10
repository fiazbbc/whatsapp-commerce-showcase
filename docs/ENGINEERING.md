# Selected engineering decisions

## Tenant isolation at two layers

Authorization derives a tenant context from an authenticated user and an active
membership record. Domain repositories then include that tenant context in
every query. The sample in `src/domain/tenant-boundary.ts` demonstrates this
contract without exposing the production framework or schema.

## Explicit order state transitions

Order status is treated as a state machine rather than a freely editable field.
Invalid skips are rejected, while cancellation and return paths can trigger
inventory restoration in the authoritative service.

## Inventory conflict handling

Reservations use a compare-and-swap style version check. A stale writer must
retry with fresh state, and a reservation cannot reduce available quantity
below zero. The production implementation additionally relies on database
transactions and conflict retries.

## Controlled conversation tools

The sales assistant cannot invent commercial facts. Read tools return verified
projections; mutation tools are restricted to customer-chat mode; preview mode
is read-only. Unknown tools fail closed.

## Evidence before claims

The private implementation is verified through strict TypeScript checks, unit
tests, real-database end-to-end tests, production builds, dependency audits,
secret scans, and deployment-oriented smoke checks. Public numbers summarize a
completed acceptance run; they are not substitutes for the smaller runnable
tests included here.
