const customerSafeReadTools = new Set([
  "search_products",
  "get_verified_price",
  "check_verified_stock",
  "check_delivery_zone",
  "get_order_status",
]);

const approvedWriteTools = new Set([
  "create_order_draft",
  "update_order_draft",
  "request_human_handoff",
]);

export type ToolMode = "CUSTOMER_CHAT" | "READ_ONLY_PREVIEW";

export class ToolPolicyError extends Error {}

export function assertToolAllowed(toolName: string, mode: ToolMode): void {
  if (customerSafeReadTools.has(toolName)) return;
  if (mode === "CUSTOMER_CHAT" && approvedWriteTools.has(toolName)) return;
  throw new ToolPolicyError(`Tool ${toolName} is not allowed in ${mode}`);
}

export interface VerifiedCommercialFact {
  source: "SERVER";
  value: string | number | boolean;
  verifiedAt: string;
}

export function commercialFact<T extends VerifiedCommercialFact>(fact: T): T {
  if (fact.source !== "SERVER" || Number.isNaN(Date.parse(fact.verifiedAt))) {
    throw new ToolPolicyError("Commercial facts must be server verified");
  }
  return fact;
}
