import type { OrderStatus } from "./domain/order-state-machine";

export interface DemoOrder {
  id: string;
  customer: string;
  city: string;
  items: string;
  total: string;
  payment: "Cash on delivery";
  status: OrderStatus;
  deliveryId: string;
  age: string;
}

export interface DemoMessage {
  side: "customer" | "assistant" | "agent" | "system";
  author: string;
  text: string;
  time: string;
}

export interface DemoConversation {
  id: string;
  customer: string;
  subject: string;
  preview: string;
  status: "AI assisted" | "Human handoff" | "Awaiting confirmation";
  owner: string;
  unread: number;
  updated: string;
  messages: DemoMessage[];
}

export interface DemoProduct {
  sku: string;
  name: string;
  category: string;
  variant: string;
  price: string;
  available: number;
  reserved: number;
  reorderAt: number;
  state: "Healthy" | "Low stock" | "Reorder";
}

export interface DemoDelivery {
  id: string;
  orderId: string;
  customer: string;
  city: string;
  carrier: string;
  status: "Ready for pickup" | "In transit" | "Out for delivery" | "Delivered";
  eta: string;
  updated: string;
  timeline: readonly string[];
}

export interface DemoCustomer {
  id: string;
  name: string;
  city: string;
  segment: "New" | "Returning" | "High value";
  orders: number;
  totalSpent: string;
  lastOrder: string;
  lastContact: string;
  supportState: "Automated" | "Agent assigned" | "No open request";
}

export const metrics = [
  { label: "Revenue today", value: "PKR 184,600", change: "+18.4%", icon: "↗" },
  { label: "Confirmed orders", value: "47", change: "+9 today", icon: "□" },
  { label: "Conversations resolved", value: "76%", change: "+4.2%", icon: "◎" },
  { label: "Human handoffs", value: "8", change: "3 active", icon: "◇" },
];

export const orders: DemoOrder[] = [
  {
    id: "ORD-1048",
    customer: "Ayesha K.",
    city: "Lahore",
    items: "Urban Carry Bag × 1",
    total: "PKR 4,240",
    payment: "Cash on delivery",
    status: "CONFIRMED",
    deliveryId: "DEL-7018",
    age: "4 min",
  },
  {
    id: "ORD-1047",
    customer: "Hamza R.",
    city: "Karachi",
    items: "Cloud Cotton Tee × 2",
    total: "PKR 5,650",
    payment: "Cash on delivery",
    status: "PROCESSING",
    deliveryId: "DEL-7017",
    age: "12 min",
  },
  {
    id: "ORD-1046",
    customer: "Mariam S.",
    city: "Islamabad",
    items: "Flex Runner × 1",
    total: "PKR 9,940",
    payment: "Cash on delivery",
    status: "SHIPPED",
    deliveryId: "DEL-7016",
    age: "28 min",
  },
  {
    id: "ORD-1045",
    customer: "Bilal A.",
    city: "Faisalabad",
    items: "Everyday Overshirt × 1",
    total: "PKR 4,790",
    payment: "Cash on delivery",
    status: "DELIVERED",
    deliveryId: "DEL-7015",
    age: "1 hr",
  },
  {
    id: "ORD-1044",
    customer: "Sara N.",
    city: "Rawalpindi",
    items: "Cloud Cotton Tee × 1",
    total: "PKR 2,980",
    payment: "Cash on delivery",
    status: "DRAFT",
    deliveryId: "Not created",
    age: "2 hr",
  },
];

export const products: DemoProduct[] = [
  {
    sku: "BAG-URBAN-OLV",
    name: "Urban Carry Bag",
    category: "Bags",
    variant: "Olive",
    price: "PKR 3,950",
    available: 18,
    reserved: 4,
    reorderAt: 6,
    state: "Healthy",
  },
  {
    sku: "TEE-CLOUD-WHT",
    name: "Cloud Cotton Tee",
    category: "Apparel",
    variant: "White / Medium",
    price: "PKR 2,680",
    available: 7,
    reserved: 3,
    reorderAt: 8,
    state: "Low stock",
  },
  {
    sku: "SHOE-FLEX-GRY",
    name: "Flex Runner",
    category: "Footwear",
    variant: "Grey / EU 42",
    price: "PKR 9,650",
    available: 3,
    reserved: 2,
    reorderAt: 5,
    state: "Reorder",
  },
  {
    sku: "SHIRT-OVER-BLU",
    name: "Everyday Overshirt",
    category: "Apparel",
    variant: "Navy / Large",
    price: "PKR 4,500",
    available: 24,
    reserved: 5,
    reorderAt: 7,
    state: "Healthy",
  },
];

export const conversations: DemoConversation[] = [
  {
    id: "CONV-3021",
    customer: "Ayesha K.",
    subject: "Product availability and Lahore delivery",
    preview: "Great—please prepare the order.",
    status: "Awaiting confirmation",
    owner: "Sales assistant",
    unread: 1,
    updated: "2 min",
    messages: [
      {
        side: "customer",
        author: "Ayesha",
        text: "Do you have the Urban Carry Bag in olive, and can you deliver to Lahore?",
        time: "10:32",
      },
      {
        side: "assistant",
        author: "Sales assistant",
        text: "Yes. Olive is available, and Lahore is serviceable. The verified total is PKR 4,240 including delivery.",
        time: "10:32",
      },
      {
        side: "customer",
        author: "Ayesha",
        text: "Great—please prepare the order. I want to confirm the address first.",
        time: "10:34",
      },
      {
        side: "system",
        author: "System",
        text: "Draft order ORD-1048 prepared. Customer confirmation is still required.",
        time: "10:34",
      },
    ],
  },
  {
    id: "CONV-3020",
    customer: "Hamza R.",
    subject: "Size advice for two cotton tees",
    preview: "Medium should work. I need two.",
    status: "AI assisted",
    owner: "Sales assistant",
    unread: 0,
    updated: "11 min",
    messages: [
      {
        side: "customer",
        author: "Hamza",
        text: "I usually wear a 40-inch chest. Which size of the Cloud Cotton Tee should I order?",
        time: "10:20",
      },
      {
        side: "assistant",
        author: "Sales assistant",
        text: "Based on the demo size guide, Medium is the closest fit. Seven units are currently available in white.",
        time: "10:20",
      },
      {
        side: "customer",
        author: "Hamza",
        text: "Medium should work. I need two.",
        time: "10:22",
      },
    ],
  },
  {
    id: "CONV-3019",
    customer: "Mariam S.",
    subject: "Change delivery address after dispatch",
    preview: "A human agent has joined the conversation.",
    status: "Human handoff",
    owner: "Zara · Support agent",
    unread: 2,
    updated: "14 min",
    messages: [
      {
        side: "customer",
        author: "Mariam",
        text: "My parcel has shipped, but I need to change the delivery address. Can you update it?",
        time: "10:08",
      },
      {
        side: "assistant",
        author: "Sales assistant",
        text: "Because the parcel is already in transit, I am transferring this request to a support agent.",
        time: "10:08",
      },
      {
        side: "system",
        author: "System",
        text: "Automation paused. Conversation assigned to Zara.",
        time: "10:09",
      },
      {
        side: "agent",
        author: "Zara · Support agent",
        text: "I have joined the conversation and will check the address-change options with the demo carrier.",
        time: "10:10",
      },
    ],
  },
];

export const customers: DemoCustomer[] = [
  {
    id: "CUS-2018",
    name: "Ayesha K.",
    city: "Lahore",
    segment: "New",
    orders: 1,
    totalSpent: "PKR 4,240",
    lastOrder: "ORD-1048",
    lastContact: "2 minutes ago",
    supportState: "Automated",
  },
  {
    id: "CUS-2017",
    name: "Hamza R.",
    city: "Karachi",
    segment: "Returning",
    orders: 3,
    totalSpent: "PKR 14,420",
    lastOrder: "ORD-1047",
    lastContact: "11 minutes ago",
    supportState: "Automated",
  },
  {
    id: "CUS-2016",
    name: "Mariam S.",
    city: "Islamabad",
    segment: "High value",
    orders: 7,
    totalSpent: "PKR 62,180",
    lastOrder: "ORD-1046",
    lastContact: "14 minutes ago",
    supportState: "Agent assigned",
  },
  {
    id: "CUS-2015",
    name: "Bilal A.",
    city: "Faisalabad",
    segment: "Returning",
    orders: 2,
    totalSpent: "PKR 9,580",
    lastOrder: "ORD-1045",
    lastContact: "Yesterday",
    supportState: "No open request",
  },
];

export const deliveries: DemoDelivery[] = [
  {
    id: "DEL-7018",
    orderId: "ORD-1048",
    customer: "Ayesha K.",
    city: "Lahore",
    carrier: "Demo Express",
    status: "Ready for pickup",
    eta: "Tomorrow",
    updated: "Label created 3 min ago",
    timeline: ["Order confirmed", "Inventory reserved", "Label created"],
  },
  {
    id: "DEL-7017",
    orderId: "ORD-1047",
    customer: "Hamza R.",
    city: "Karachi",
    carrier: "Demo Express",
    status: "In transit",
    eta: "Tomorrow, 2–6 PM",
    updated: "Departed sorting center 18 min ago",
    timeline: ["Picked up", "Karachi sorting center", "In transit"],
  },
  {
    id: "DEL-7016",
    orderId: "ORD-1046",
    customer: "Mariam S.",
    city: "Islamabad",
    carrier: "Parcel Sandbox",
    status: "Out for delivery",
    eta: "Today, before 5 PM",
    updated: "Courier assigned 32 min ago",
    timeline: ["Picked up", "Islamabad hub", "Courier assigned"],
  },
  {
    id: "DEL-7015",
    orderId: "ORD-1045",
    customer: "Bilal A.",
    city: "Faisalabad",
    carrier: "Parcel Sandbox",
    status: "Delivered",
    eta: "Delivered today at 9:42 AM",
    updated: "Cash collected on delivery",
    timeline: ["Picked up", "Out for delivery", "Delivered"],
  },
];

export const operationalEvents = [
  {
    tone: "green",
    title: "Inventory reserved for confirmed order",
    detail: "ORD-1048 · Urban Carry Bag · just now",
  },
  {
    tone: "blue",
    title: "Parcel moved to out for delivery",
    detail: "DEL-7016 · Islamabad · 8 minutes ago",
  },
  {
    tone: "amber",
    title: "Conversation assigned to a human",
    detail: "CONV-3019 · address change · 14 minutes ago",
  },
];
