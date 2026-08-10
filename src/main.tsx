import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  availableTransitions,
  type OrderStatus,
} from "./domain/order-state-machine";
import { conversation, inventory, metrics, orders } from "./mock-data";
import "./styles.css";

const icons = {
  orders: "↗",
  messages: "◎",
  inventory: "◫",
  security: "◇",
};

function StatusPill({ status }: { status: OrderStatus }) {
  return (
    <span className={`status status-${status.toLowerCase()}`}>{status}</span>
  );
}

function App() {
  const [activeView, setActiveView] = useState<"operations" | "architecture">(
    "operations",
  );
  const [selectedOrder, setSelectedOrder] = useState(orders[0]?.id ?? "");

  const selected = useMemo(
    () => orders.find((order) => order.id === selectedOrder) ?? orders[0],
    [selectedOrder],
  );

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Showcase home">
          <span className="brand-mark">W</span>
          <span>
            <strong>Commerce OS</strong>
            <small>Engineering showcase</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <button
            className={activeView === "operations" ? "nav-active" : ""}
            onClick={() => setActiveView("operations")}
          >
            Product demo
          </button>
          <button
            className={activeView === "architecture" ? "nav-active" : ""}
            onClick={() => setActiveView("architecture")}
          >
            Engineering
          </button>
        </nav>
        <a className="outline-button" href="#scope">
          View project scope
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="pulse" /> Portfolio case study · synthetic data
            </div>
            <h1>WhatsApp commerce, operated from one reliable workspace.</h1>
            <p>
              A multi-tenant SaaS concept for catalog-grounded customer support,
              COD order capture, inventory control, delivery operations, and
              human handoff.
            </p>
            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => setActiveView("operations")}
              >
                Explore the dashboard
              </button>
              <a href="#engineering" className="text-link">
                Read the engineering decisions <span>→</span>
              </a>
            </div>
          </div>
          <div className="hero-proof" aria-label="Project validation summary">
            <span>Validated private implementation</span>
            <strong>127 automated tests</strong>
            <div className="proof-row">
              <span>88 unit</span>
              <span>39 end-to-end</span>
              <span>Strict TypeScript</span>
            </div>
          </div>
        </section>

        {activeView === "operations" ? (
          <section
            className="dashboard"
            aria-label="Synthetic operations dashboard"
          >
            <div className="dashboard-heading">
              <div>
                <span className="section-kicker">Demo Fashion Store</span>
                <h2>Good morning. Here is today’s operation.</h2>
              </div>
              <div className="live-chip">
                <span /> All systems operational
              </div>
            </div>

            <div className="metric-grid">
              {metrics.map((metric, index) => (
                <article className="metric-card" key={metric.label}>
                  <div className="metric-topline">
                    <span>{metric.label}</span>
                    <b>{Object.values(icons)[index]}</b>
                  </div>
                  <strong>{metric.value}</strong>
                  <small>{metric.change}</small>
                </article>
              ))}
            </div>

            <div className="operations-grid">
              <article className="panel orders-panel">
                <div className="panel-heading">
                  <div>
                    <span>Order operations</span>
                    <h3>Live fulfillment queue</h3>
                  </div>
                  <span className="count-chip">4 active</span>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Destination</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr
                          className={
                            selectedOrder === order.id ? "selected-row" : ""
                          }
                          key={order.id}
                          onClick={() => setSelectedOrder(order.id)}
                        >
                          <td>
                            <strong>{order.id}</strong>
                            <small>{order.customer}</small>
                          </td>
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
                {selected && (
                  <div className="selection-note">
                    <span>Selected {selected.id}</span>
                    <span>
                      Allowed next states:{" "}
                      {availableTransitions(selected.status).join(", ") ||
                        "None"}
                    </span>
                  </div>
                )}
              </article>

              <article className="panel conversation-panel">
                <div className="panel-heading">
                  <div>
                    <span>Conversation intelligence</span>
                    <h3>Verified sales assistance</h3>
                  </div>
                  <span className="ai-chip">AI active</span>
                </div>
                <div className="conversation">
                  {conversation.map((message, index) => (
                    <div className={`message ${message.side}`} key={index}>
                      <small>
                        {message.side === "assistant"
                          ? "Sales assistant"
                          : "Customer"}
                      </small>
                      <p>{message.text}</p>
                    </div>
                  ))}
                </div>
                <div className="verified-strip">
                  <span>✓ Price verified</span>
                  <span>✓ Stock verified</span>
                  <span>✓ Delivery verified</span>
                </div>
              </article>

              <article className="panel inventory-panel">
                <div className="panel-heading">
                  <div>
                    <span>Inventory control</span>
                    <h3>Availability and reservations</h3>
                  </div>
                </div>
                <div className="inventory-list">
                  {inventory.map((item) => {
                    const total = item.available + item.reserved;
                    return (
                      <div className="inventory-row" key={item.sku}>
                        <div>
                          <strong>{item.name}</strong>
                          <small>{item.sku}</small>
                        </div>
                        <div className="stock-visual">
                          <div className="stock-track">
                            <span
                              style={{
                                width: `${(item.available / total) * 100}%`,
                              }}
                            />
                          </div>
                          <small>
                            {item.available} available · {item.reserved}{" "}
                            reserved
                          </small>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>

              <article className="panel event-panel">
                <div className="panel-heading">
                  <div>
                    <span>Operational events</span>
                    <h3>Recent system activity</h3>
                  </div>
                </div>
                <ol className="event-list">
                  <li>
                    <i className="green" />
                    <div>
                      <strong>Inventory reserved atomically</strong>
                      <small>ORD-1048 · 2 units · just now</small>
                    </div>
                  </li>
                  <li>
                    <i className="blue" />
                    <div>
                      <strong>Order handed to fulfillment</strong>
                      <small>ORD-1047 · 8 minutes ago</small>
                    </div>
                  </li>
                  <li>
                    <i className="amber" />
                    <div>
                      <strong>Conversation assigned to agent</strong>
                      <small>Priority handoff · 14 minutes ago</small>
                    </div>
                  </li>
                </ol>
              </article>
            </div>
          </section>
        ) : (
          <ArchitectureView />
        )}

        <EngineeringSection />
      </main>

      <footer id="scope">
        <div>
          <strong>WhatsApp Commerce Engineering Showcase</strong>
          <p>
            Mock interface and generic code samples only. The production
            implementation remains private.
          </p>
        </div>
        <span>© 2026 M Abdullah · All rights reserved</span>
      </footer>
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
          The design keeps identity, tenant scope, commercial facts, and
          external delivery behind explicit server-owned boundaries.
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
            Inbound messages, order confirmation, inventory reservations, and
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
            UI concept · Architecture · Generic TypeScript patterns · Tests
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
