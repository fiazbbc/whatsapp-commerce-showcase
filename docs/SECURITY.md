# Security approach

The design emphasizes boundaries that are easy to test and difficult to bypass.

- HttpOnly sessions, rotating refresh credentials, login throttling, and
  password hashing protect authentication flows.
- Role checks operate after authenticated tenant membership has been
  established.
- Tenant scoping is applied at both the request and repository boundaries.
- Sensitive integration credentials are encrypted at rest and never returned
  to browser clients.
- Channel ingress is authenticated, replay-resistant, and idempotent.
- Commercial facts are produced by server-side services, not free-form model
  output.
- Suspension preserves tenant data and read access while blocking mutations.
- Audit records cover identity, membership, billing, inventory, order, and
  administrative changes.

The public demo contains no secrets, live endpoints, customer data, linked
accounts, infrastructure configuration, or deployable production backend.
