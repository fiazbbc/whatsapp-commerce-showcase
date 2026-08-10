import { describe, expect, it } from "vitest";
import {
  assertToolAllowed,
  commercialFact,
  ToolPolicyError,
} from "./ai-tool-policy";
import {
  InventoryConflictError,
  reserveInventory,
} from "./inventory-reservation";
import {
  InvalidOrderTransitionError,
  transitionOrder,
} from "./order-state-machine";
import {
  establishTenantContext,
  TenantAccessError,
  tenantScopedWhere,
} from "./tenant-boundary";

describe("tenant boundary", () => {
  const memberships = [
    {
      userId: "user-a",
      tenantId: "tenant-a",
      role: "OWNER" as const,
      active: true,
    },
    {
      userId: "user-a",
      tenantId: "tenant-b",
      role: "VIEWER" as const,
      active: false,
    },
  ];

  it("derives tenant context from an active membership", () => {
    expect(establishTenantContext("user-a", "tenant-a", memberships)).toEqual({
      userId: "user-a",
      tenantId: "tenant-a",
      role: "OWNER",
    });
  });

  it("rejects a client-selected tenant without membership", () => {
    expect(() =>
      establishTenantContext("user-a", "tenant-c", memberships),
    ).toThrow(TenantAccessError);
  });

  it("adds tenant scope to every repository filter", () => {
    const context = establishTenantContext("user-a", "tenant-a", memberships);
    expect(tenantScopedWhere(context, { status: "ACTIVE" })).toEqual({
      AND: [{ tenantId: "tenant-a" }, { status: "ACTIVE" }],
    });
  });
});

describe("order state machine", () => {
  it("allows a valid fulfillment transition", () => {
    expect(transitionOrder("CONFIRMED", "PROCESSING")).toBe("PROCESSING");
  });

  it("rejects skipping directly to delivered", () => {
    expect(() => transitionOrder("CONFIRMED", "DELIVERED")).toThrow(
      InvalidOrderTransitionError,
    );
  });
});

describe("inventory reservation", () => {
  it("moves available stock into reserved stock", () => {
    expect(
      reserveInventory({ available: 4, reserved: 1, version: 7 }, 2, 7),
    ).toEqual({
      available: 2,
      reserved: 3,
      version: 8,
    });
  });

  it("prevents overselling", () => {
    expect(() =>
      reserveInventory({ available: 1, reserved: 0, version: 2 }, 2, 2),
    ).toThrow(InventoryConflictError);
  });

  it("rejects stale concurrent writes", () => {
    expect(() =>
      reserveInventory({ available: 3, reserved: 0, version: 9 }, 1, 8),
    ).toThrow("retry with fresh state");
  });
});

describe("AI tool policy", () => {
  it("allows customer-safe reads in preview mode", () => {
    expect(() =>
      assertToolAllowed("get_verified_price", "READ_ONLY_PREVIEW"),
    ).not.toThrow();
  });

  it("blocks order mutations in preview mode", () => {
    expect(() =>
      assertToolAllowed("create_order_draft", "READ_ONLY_PREVIEW"),
    ).toThrow(ToolPolicyError);
  });

  it("accepts only server-verified commercial facts", () => {
    expect(
      commercialFact({
        source: "SERVER",
        value: 3490,
        verifiedAt: "2026-01-01T00:00:00.000Z",
      }).value,
    ).toBe(3490);
  });
});
