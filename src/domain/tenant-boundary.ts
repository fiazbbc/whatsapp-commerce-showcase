export type TenantRole = "OWNER" | "ADMIN" | "MANAGER" | "AGENT" | "VIEWER";

export interface Membership {
  userId: string;
  tenantId: string;
  role: TenantRole;
  active: boolean;
}

export interface TenantContext {
  userId: string;
  tenantId: string;
  role: TenantRole;
}

export class TenantAccessError extends Error {}

export function establishTenantContext(
  authenticatedUserId: string,
  routeTenantId: string,
  memberships: readonly Membership[],
): TenantContext {
  const membership = memberships.find(
    (candidate) =>
      candidate.userId === authenticatedUserId &&
      candidate.tenantId === routeTenantId &&
      candidate.active,
  );

  if (!membership) {
    throw new TenantAccessError(
      "No active membership for the requested tenant",
    );
  }

  return {
    userId: membership.userId,
    tenantId: membership.tenantId,
    role: membership.role,
  };
}

export function tenantScopedWhere<T extends Record<string, unknown>>(
  context: TenantContext,
  additionalFilters: T,
): { AND: readonly [{ tenantId: string }, T] } {
  return { AND: [{ tenantId: context.tenantId }, additionalFilters] };
}
