import { describe, expect, it } from "vitest";
import {
  conversations,
  customers,
  deliveries,
  orders,
  products,
} from "./mock-data";

describe("synthetic showcase data", () => {
  it("preloads every visitor-facing area", () => {
    expect(conversations.length).toBeGreaterThanOrEqual(3);
    expect(customers.length).toBeGreaterThanOrEqual(4);
    expect(orders.length).toBeGreaterThanOrEqual(4);
    expect(products.length).toBeGreaterThanOrEqual(4);
    expect(deliveries.length).toBeGreaterThanOrEqual(4);
  });

  it("includes a visible human handoff example", () => {
    const handoff = conversations.find(
      (conversation) => conversation.status === "Human handoff",
    );

    expect(handoff?.owner).toContain("Support agent");
    expect(handoff?.messages.some((message) => message.side === "agent")).toBe(
      true,
    );
  });

  it("links prepared shipments to their sample orders", () => {
    const orderIds = new Set(orders.map((order) => order.id));

    expect(deliveries.every((delivery) => orderIds.has(delivery.orderId))).toBe(
      true,
    );
  });

  it("contains no endpoints or phone-number-shaped records", () => {
    const publicDemoData = JSON.stringify({
      conversations,
      customers,
      deliveries,
      orders,
      products,
    });

    expect(publicDemoData).not.toMatch(/https?:\/\//i);
    expect(publicDemoData).not.toMatch(/\+?\d{10,}/);
  });
});
