export const orderStatuses = [
  "DRAFT",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
] as const;

export type OrderStatus = (typeof orderStatuses)[number];

const allowedTransitions: Readonly<
  Record<OrderStatus, readonly OrderStatus[]>
> = {
  DRAFT: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PROCESSING", "CANCELLED"],
  PROCESSING: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED", "RETURNED"],
  DELIVERED: ["RETURNED"],
  CANCELLED: [],
  RETURNED: [],
};

export class InvalidOrderTransitionError extends Error {}

export function transitionOrder(
  current: OrderStatus,
  requested: OrderStatus,
): OrderStatus {
  if (!allowedTransitions[current].includes(requested)) {
    throw new InvalidOrderTransitionError(
      `Order cannot move from ${current} to ${requested}`,
    );
  }
  return requested;
}

export function availableTransitions(
  status: OrderStatus,
): readonly OrderStatus[] {
  return allowedTransitions[status];
}
