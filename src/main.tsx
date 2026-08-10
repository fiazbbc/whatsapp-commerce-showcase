import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  availableTransitions,
  type OrderStatus,
} from "./domain/order-state-machine";
import {
  conversations,
  deliveries,
  metrics,
  operationalEvents,
  orders,
  products,
  type DemoConversation,
} from "./mock-data";
import "./styles.css";

type PrimaryView = "demo" | "engineering";
type DemoScreen =
  "dashboard" | "conversations" | "orders" | "products" | "deliveries";

const demoScreens: ReadonlyArray<{
  id: DemoScreen;
  label: string;
  icon: string;
}> = [
  { id: "dashboard", label: "Dashboard", icon: "⌂" },
  { id: "conversations", label: "Conversations", icon: "◉" },
  { id: "orders", label: "Orders", icon: "□" },
  { id: "products", label: "Products & inventory", icon: "▦" },
  { id: "deliveries", label: "Deliveries", icon: "→" },
];

function StatusPill({ status }: { status: OrderStatus }) {
  return (
    <span className={`status status-${status.toLowerCase()}`}>{status}</span>
  );
}

function labelClass(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

function App() {
  const [primaryView, setPrimaryView] = useState<PrimaryView>("demo");
  const [activeScreen, setActiveScreen] = useState<DemoScreen>("dashboard");

  function openDemo(screen: DemoScreen) {
    setPrimaryView("demo");
    setActiveScreen(screen);
    window.requestAnimationFrame(() => {
      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  return (
    <div className="site-shell">
      <div className="demo-notice" role="note">
        <strong>Synthetic interactive demo</strong>
        <span>
          Every customer, message, product, order, and delivery shown here is
          fictional. Nothing connects to WhatsApp or a live business.
        </span>
      </div>

      <header className="topbar">
        <a className="brand" href="#top" aria-label="Showcase home">
          <span className="brand-mark">W</span>
          <span>
            <strong>Commerce OS</strong>
            <small>Interactive portfolio demo</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <button
            className={primaryView === "demo" ? "nav-active" : ""}
            onClick={() => openDemo("dashboard")}
          >
            Explore demo
          </button>
          <button
            className={primaryView === "engineering" ? "nav-active" : ""}
            onClick={() => setPrimaryView("engineering")}
          >
            How it is designed
          </button>
        </nav>
        <a className="outline-button" href="#scope">
          What is public?
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="pulse" /> No login or setup required
            </div>
            <h1>A guided demo of WhatsApp commerce operations.</h1>
            <p>
              See how a fictional online store could turn customer chats into
              verified cash-on-delivery orders, reserve stock, coordinate
              deliveries, and bring in a human when automation should stop.
            </p>
            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => openDemo("dashboard")}
              >
                Start exploring
              </button>
              <button
                className="text-button"
                onClick={() => openDemo("conversations")}
              >
                Open a sample conversation <span>→</span>
              </button>
            </div>
          </div>
          <div className="hero-proof" aria-label="What this demo contains">
            <span>Follow the fictional order journey</span>
            <strong>Chat → order → delivery</strong>
            <ol className="journey-list">
              <li>
                <b>1</b> A customer asks about a product
              </li>
              <li>
                <b>2</b> Verified price and stock form an order
              </li>
              <li>
                <b>3</b> The team tracks fulfillment or takes over
              </li>
            </ol>
          </div>
        </section>

        {primaryView === "demo" ? (
          <DemoWorkspace
            activeScreen={activeScreen}
            onScreenChange={setActiveScreen}
          />
        ) : (
          <ArchitectureView />
        )}

        <EngineeringSection />
      </main>

      <footer id="scope">
        <div>
          <strong>WhatsApp Commerce Engineering Showcase</strong>
          <p>
            Synthetic interface and generic code samples only. The production
            application, integrations, infrastructure, data model, and
            commercial logic remain private.
          </p>
        </div>
        <span>© 2026 M Abdullah · All rights reserved</span>
      </footer>
    </div>
  );
}

function DemoWorkspace({
  activeScreen,
  onScreenChange,
}: {
  activeScreen: DemoScreen;
  onScreenChange: (screen: DemoScreen) => void;
}) {
  return (
    <section
      className="dashboard"
      id="demo"
      aria-label="Synthetic commerce demo"
    >
      <div className="demo-intro">
        <div>
          <span className="section-kicker">Fictional store workspace</span>
          <h2>Demo Fashion Store</h2>
          <p>
            Choose any section below. The data is preloaded, the controls are
            safe to explore, and nothing is sent or saved.
          </p>
        </div>
        <div className="offline-chip">
          <span /> Offline · synthetic data
        </div>
      </div>

      <nav className="screen-tabs" aria-label="Demo screens">
        {demoScreens.map((screen) => (
          <button
            className={activeScreen === screen.id ? "screen-tab-active" : ""}
            key={screen.id}
            onClick={() => onScreenChange(screen.id)}
            aria-pressed={activeScreen === screen.id}
          >
            <b>{screen.icon}</b>
            <span>{screen.label}</span>
          </button>
        ))}
      </nav>

      <div className="screen-frame">
        {activeScreen === "dashboard" && (
          <DashboardScreen onScreenChange={onScreenChange} />
        )}
        {activeScreen === "conversations" && <ConversationsScreen />}
        {activeScreen === "orders" && <OrdersScreen />}
        {activeScreen === "products" && <ProductsScreen />}
        {activeScreen === "deliveries" && <DeliveriesScreen />}
      </div>
    </section>
  );
}

function ScreenHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="screen-heading">
      <div>
        <span>{kicker}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="sample-badge">Sample data</div>
    </div>
  );
}

function DashboardScreen({
  onScreenChange,
}: {
  onScreenChange: (screen: DemoScreen) => void;
}) {
  return (
    <div className="demo-screen">
      <ScreenHeading
        kicker="Today at a glance"
        title="Store operations dashboard"
        description="A simple overview of sales conversations, confirmed orders, stock, deliveries, and work needing attention."
      />

      <div className="metric-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <div className="metric-topline">
              <span>{metric.label}</span>
              <b>{metric.icon}</b>
            </div>
            <strong>{metric.value}</strong>
            <small>{metric.change}</small>
          </article>
        ))}
      </div>

      <div className="overview-grid">
        <article className="panel overview-orders">
          <div className="panel-heading">
            <div>
              <span>Order queue</span>
              <h3>What the team is fulfilling</h3>
            </div>
            <button
              className="panel-link"
              onClick={() => onScreenChange("orders")}
            >
              View all orders →
            </button>
          </div>
          <div className="compact-order-list">
            {orders.slice(0, 4).map((order) => (
              <div key={order.id}>
                <span>
                  <strong>{order.id}</strong>
                  <small>
                    {order.customer} · {order.items}
                  </small>
                </span>
                <span>
                  <b>{order.total}</b>
                  <StatusPill status={order.status} />
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel attention-panel">
          <div className="panel-heading">
            <div>
              <span>Needs attention</span>
              <h3>Human handoff active</h3>
            </div>
            <span className="handoff-chip">Agent joined</span>
          </div>
          <div className="attention-content">
            <div className="avatar">MS</div>
            <div>
              <strong>Mariam needs an address change</strong>
              <p>
                Her parcel is already in transit, so automation paused and
                assigned the conversation to Zara.
              </p>
              <button onClick={() => onScreenChange("conversations")}>
                See the handoff →
              </button>
            </div>
          </div>
        </article>

        <article className="panel inventory-summary">
          <div className="panel-heading">
            <div>
              <span>Stock health</span>
              <h3>Inventory alerts</h3>
            </div>
            <button
              className="panel-link"
              onClick={() => onScreenChange("products")}
            >
              Open inventory →
            </button>
          </div>
          <div className="mini-stock-list">
            {products.slice(1, 4).map((product) => (
              <div key={product.sku}>
                <span>
                  <strong>{product.name}</strong>
                  <small>{product.variant}</small>
                </span>
                <span
                  className={`stock-label stock-${labelClass(product.state)}`}
                >
                  {product.available} available
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel event-panel">
          <div className="panel-heading">
            <div>
              <span>Activity</span>
              <h3>What just happened</h3>
            </div>
          </div>
          <ol className="event-list">
            {operationalEvents.map((event) => (
              <li key={event.title}>
                <i className={event.tone} />
                <div>
                  <strong>{event.title}</strong>
                  <small>{event.detail}</small>
                </div>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </div>
  );
}

function ConversationsScreen() {
  const [selectedId, setSelectedId] = useState(conversations[0]?.id ?? "");
  const selected = useMemo(
    () =>
      conversations.find((item) => item.id === selectedId) ?? conversations[0],
    [selectedId],
  );

  return (
    <div className="demo-screen">
      <ScreenHeading
        kicker="Customer conversations"
        title="Sales assistance with a visible human handoff"
        description="Select a fictional customer to see product guidance, verified facts, order preparation, and when an agent takes control."
      />
      <div className="conversation-workspace panel">
        <aside className="conversation-list" aria-label="Sample conversations">
          {conversations.map((item) => (
            <button
              className={
                item.id === selected?.id ? "conversation-selected" : ""
              }
              key={item.id}
              onClick={() => setSelectedId(item.id)}
            >
              <span className="avatar">
                {item.customer.slice(0, 2).toUpperCase()}
              </span>
              <span className="conversation-summary">
                <span>
                  <strong>{item.customer}</strong>
                  <small>{item.updated}</small>
                </span>
                <b>{item.subject}</b>
                <small>{item.preview}</small>
                <em
                  className={`conversation-state state-${labelClass(item.status)}`}
                >
                  {item.status}
                </em>
              </span>
              {item.unread > 0 && <i>{item.unread}</i>}
            </button>
          ))}
        </aside>

        {selected && <ConversationDetail conversation={selected} />}
      </div>
    </div>
  );
}

function ConversationDetail({
  conversation,
}: {
  conversation: DemoConversation;
}) {
  const handedOff = conversation.status === "Human handoff";
  return (
    <article className="conversation-detail">
      <header>
        <div>
          <strong>{conversation.customer}</strong>
          <small>{conversation.subject}</small>
        </div>
        <span
          className={`conversation-state state-${labelClass(conversation.status)}`}
        >
          {conversation.status}
        </span>
      </header>
      {handedOff && (
        <div className="handoff-banner">
          <span>Human handoff</span>
          <div>
            <strong>{conversation.owner} is handling this chat</strong>
            <small>
              Automated replies are paused to prevent conflicting responses.
            </small>
          </div>
        </div>
      )}
      <div className="conversation transcript">
        {conversation.messages.map((message, index) => (
          <div
            className={`message ${message.side}`}
            key={`${message.time}-${index}`}
          >
            <small>
              {message.author} · {message.time}
            </small>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="verified-strip">
        <span>✓ Price from catalog</span>
        <span>✓ Stock checked</span>
        <span>✓ Delivery area checked</span>
        <span>✓ Synthetic record</span>
      </div>
    </article>
  );
}

function OrdersScreen() {
  const [selectedOrder, setSelectedOrder] = useState(orders[0]?.id ?? "");
  const selected = useMemo(
    () => orders.find((order) => order.id === selectedOrder) ?? orders[0],
    [selectedOrder],
  );

  return (
    <div className="demo-screen">
      <ScreenHeading
        kicker="Cash-on-delivery orders"
        title="From customer confirmation to fulfillment"
        description="Select an order to see its items, delivery reference, and the next valid workflow stages."
      />
      <div className="orders-layout">
        <article className="panel orders-panel">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Items</th>
                  <th>Destination</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    className={selectedOrder === order.id ? "selected-row" : ""}
                    key={order.id}
                    onClick={() => setSelectedOrder(order.id)}
                  >
                    <td>
                      <strong>{order.id}</strong>
                      <small>{order.customer}</small>
                    </td>
                    <td>{order.items}</td>
                    <td>{order.city}</td>
                    <td>{order.total}</td>
                    <td>
                      <StatusPill status={order.status} />
                    </td>
                    <td>{order.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        {selected && (
          <aside className="panel order-detail">
            <span className="section-kicker">Selected order</span>
            <div className="order-detail-title">
              <div>
                <h3>{selected.id}</h3>
                <small>
                  {selected.customer} · {selected.city}
                </small>
              </div>
              <StatusPill status={selected.status} />
            </div>
            <dl>
              <div>
                <dt>Items</dt>
                <dd>{selected.items}</dd>
              </div>
              <div>
                <dt>Payment</dt>
                <dd>{selected.payment}</dd>
              </div>
              <div>
                <dt>Verified total</dt>
                <dd>{selected.total}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>{selected.deliveryId}</dd>
              </div>
            </dl>
            <div className="next-state-box">
              <small>Valid next workflow stage</small>
              <strong>
                {availableTransitions(selected.status).join(" or ") ||
                  "Order complete"}
              </strong>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function ProductsScreen() {
  return (
    <div className="demo-screen">
      <ScreenHeading
        kicker="Products and inventory"
        title="One catalog view for price and stock"
        description="Fictional products show how available units, active reservations, variants, and reorder thresholds can be understood at a glance."
      />
      <div className="product-grid">
        {products.map((product) => {
          const total = product.available + product.reserved;
          return (
            <article className="panel product-card" key={product.sku}>
              <div className="product-art" aria-hidden="true">
                <span>{product.category.slice(0, 1)}</span>
              </div>
              <div className="product-copy">
                <div className="product-title-row">
                  <div>
                    <small>{product.category}</small>
                    <h3>{product.name}</h3>
                  </div>
                  <span
                    className={`stock-label stock-${labelClass(product.state)}`}
                  >
                    {product.state}
                  </span>
                </div>
                <p>
                  {product.variant} · {product.sku}
                </p>
                <strong className="product-price">{product.price}</strong>
                <div className="stock-visual">
                  <div className="stock-track">
                    <span
                      style={{ width: `${(product.available / total) * 100}%` }}
                    />
                  </div>
                  <div className="stock-numbers">
                    <span>
                      <b>{product.available}</b> available
                    </span>
                    <span>
                      <b>{product.reserved}</b> reserved
                    </span>
                    <span>
                      <b>{product.reorderAt}</b> reorder point
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function DeliveriesScreen() {
  return (
    <div className="demo-screen">
      <ScreenHeading
        kicker="Delivery operations"
        title="A clear view from pickup to doorstep"
        description="Each fictional shipment links back to an order and shows the latest checkpoint, expected arrival, and cash-on-delivery outcome."
      />
      <div className="delivery-grid">
        {deliveries.map((delivery) => (
          <article className="panel delivery-card" key={delivery.id}>
            <div className="delivery-topline">
              <div>
                <small>{delivery.id}</small>
                <strong>{delivery.orderId}</strong>
              </div>
              <span
                className={`delivery-status delivery-${labelClass(delivery.status)}`}
              >
                {delivery.status}
              </span>
            </div>
            <div className="delivery-destination">
              <div className="delivery-icon">⌖</div>
              <div>
                <strong>{delivery.customer}</strong>
                <small>
                  {delivery.city} · {delivery.carrier}
                </small>
              </div>
            </div>
            <div className="delivery-eta">
              <small>Expected</small>
              <strong>{delivery.eta}</strong>
              <span>{delivery.updated}</span>
            </div>
            <ol className="delivery-timeline">
              {delivery.timeline.map((event, index) => (
                <li
                  className={
                    index === delivery.timeline.length - 1 ? "current" : ""
                  }
                  key={event}
                >
                  <i /> <span>{event}</span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </div>
  );
}

function ArchitectureView() {
  const stages = [
    ["Channels", "WhatsApp · Seller UI"],
    ["API boundary", "Session · RBAC · Tenant guard"],
    ["Domain services", "Catalog · Orders · Conversations"],
    ["Data and jobs", "PostgreSQL · Redis · Workers"],
  ];
  return (
    <section className="architecture-view" id="architecture">
      <div className="section-heading">
        <span>System design</span>
        <h2>Boundaries before features.</h2>
        <p>
          This high-level view explains the private product’s design principles
          without exposing its implementation, data model, endpoints, or
          integrations.
        </p>
      </div>
      <div className="architecture-flow">
        {stages.map(([title, detail], index) => (
          <div className="architecture-stage" key={title}>
            <small>0{index + 1}</small>
            <strong>{title}</strong>
            <span>{detail}</span>
          </div>
        ))}
      </div>
      <div className="principle-grid">
        <article>
          <span>01</span>
          <h3>Tenant context is derived</h3>
          <p>
            Membership is verified before a request reaches domain logic.
            Repository filters apply tenant scope again as defense in depth.
          </p>
        </article>
        <article>
          <span>02</span>
          <h3>Commercial facts are authoritative</h3>
          <p>
            Prices, availability, delivery fees, totals, and order status
            originate from deterministic server services.
          </p>
        </article>
        <article>
          <span>03</span>
          <h3>Writes are idempotent</h3>
          <p>
            Inbound messages, confirmation, inventory reservations, and
            background work tolerate safe retries.
          </p>
        </article>
        <article>
          <span>04</span>
          <h3>Automation can hand off</h3>
          <p>
            Low confidence, policy failures, and customer requests transfer
            control to a human without racing automated replies.
          </p>
        </article>
      </div>
    </section>
  );
}

function EngineeringSection() {
  const decisions = [
    {
      icon: "◇",
      title: "Tenant isolation",
      text: "Route membership checks plus tenant-scoped repository filters prevent cross-business access.",
    },
    {
      icon: "↻",
      title: "Concurrency safety",
      text: "Versioned reservations and guarded transitions prevent overselling and duplicate confirmation.",
    },
    {
      icon: "⌁",
      title: "Controlled automation",
      text: "Approved tools expose verified facts; preview mode blocks mutations and unknown capabilities.",
    },
    {
      icon: "✓",
      title: "Acceptance evidence",
      text: "Unit, integration, end-to-end, build, dependency, and secret checks support every delivery claim.",
    },
  ];
  return (
    <section className="engineering" id="engineering">
      <div className="section-heading">
        <span>Selected engineering decisions</span>
        <h2>Designed for the failure paths.</h2>
        <p>
          The public samples focus on transferable patterns rather than
          production business logic.
        </p>
      </div>
      <div className="decision-grid">
        {decisions.map((decision) => (
          <article key={decision.title}>
            <b>{decision.icon}</b>
            <h3>{decision.title}</h3>
            <p>{decision.text}</p>
          </article>
        ))}
      </div>
      <div className="scope-banner">
        <div>
          <span>Public scope</span>
          <strong>
            Interactive synthetic UI · Architecture · Generic TypeScript
            patterns · Tests
          </strong>
        </div>
        <div>
          <span>Private scope</span>
          <strong>
            Production APIs · Data model · Integrations · Infrastructure ·
            Commercial logic
          </strong>
        </div>
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
