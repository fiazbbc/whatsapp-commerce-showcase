export interface InventoryState {
  available: number;
  reserved: number;
  version: number;
}

export class InventoryConflictError extends Error {}

export function reserveInventory(
  current: Readonly<InventoryState>,
  quantity: number,
  expectedVersion: number,
): InventoryState {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new InventoryConflictError("Reservation quantity must be positive");
  }
  if (current.version !== expectedVersion) {
    throw new InventoryConflictError(
      "Inventory changed; retry with fresh state",
    );
  }
  if (current.available < quantity) {
    throw new InventoryConflictError("Insufficient inventory");
  }

  return {
    available: current.available - quantity,
    reserved: current.reserved + quantity,
    version: current.version + 1,
  };
}
