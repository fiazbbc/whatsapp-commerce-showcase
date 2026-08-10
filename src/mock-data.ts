import type { OrderStatus } from "./domain/order-state-machine";

export interface DemoOrder {
  id: string;
  customer: string;
  city: string;
  total: string;
  status: OrderStatus;
  age: string;
}

export const metrics = [
  { label: "Revenue today", value: "PKR 184,600", change: "+18.4%" },
  { label: "Confirmed orders", value: "47", change: "+9 today" },
  { label: "AI resolution", value: "76%", change: "+4.2%" },
  { label: "Human handoffs", value: "8", change: "3 active" },
];

export const orders: DemoOrder[] = [
  {
    id: "ORD-1048",
    customer: "Customer 1048",
    city: "Lahore",
    total: "PKR 6,480",
    status: "CONFIRMED",
    age: "4 min",
  },
  {
    id: "ORD-1047",
    customer: "Customer 1047",
    city: "Karachi",
    total: "PKR 3,250",
    status: "PROCESSING",
    age: "12 min",
  },
  {
    id: "ORD-1046",
    customer: "Customer 1046",
    city: "Islamabad",
    total: "PKR 9,940",
    status: "SHIPPED",
    age: "28 min",
  },
  {
    id: "ORD-1045",
    customer: "Customer 1045",
    city: "Faisalabad",
    total: "PKR 4,790",
    status: "DELIVERED",
    age: "1 hr",
  },
];

export const inventory = [
  { sku: "BAG-URBAN-01", name: "Urban Carry Bag", available: 18, reserved: 4 },
  { sku: "TEE-CLOUD-02", name: "Cloud Cotton Tee", available: 7, reserved: 3 },
  { sku: "SHOE-FLEX-03", name: "Flex Runner", available: 3, reserved: 2 },
];

export const conversation = [
  {
    side: "customer" as const,
    text: "Do you have the Urban Carry Bag in olive, and can you deliver to Lahore?",
  },
  {
    side: "assistant" as const,
    text: "Yes. Olive is currently available, and your Lahore address is serviceable. The verified total for one bag is PKR 4,240 including delivery.",
  },
  {
    side: "customer" as const,
    text: "Great—please prepare the order. I want to confirm the address first.",
  },
];
