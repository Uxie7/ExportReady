"use client";

import { EXPORT_HOUSES } from "@/lib/data";
import { Badge, ScoreRing, styles } from "@/lib/components";

export default function Dashboard() {
  return (
    <div style={{ padding: "36px 40px", maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, color: "#1d6ef5", fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>EXPORT HOUSE DASHBOARD</div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 30, fontWeight: 800, margin: 0 }}>Compliance Overview</h2>
      </div>

      {/* ── KEY METRICS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Products", value: "137", sub: "across 3 clients", color: "#1d6ef5" },
          { label: "Export Ready", value: "89", sub: "65% of portfolio", color: "#10b981" },
          { label: "Need Action", value: "31", sub: "critical issues", color: "#ef4444" },
          { label: "Pending Tests", value: "17", sub: "lab tests required", color: "#f59e0b" },
        ].map((k) => (
          <div key={k.label} style={{ ...styles.card, padding: "18px 22px" }}>
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 34, fontWeight: 700, color: k.color, lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#0f1923", marginTop: 5 }}>{k.label}</div>
            <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* ── EXPORT HOUSES TABLE ── */}
      <div style={{ ...styles.card, overflow: "hidden" }}>
        <div style={{ padding: "14px 22px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Managed Export Houses</div>
          <button style={{ background: "#1d6ef5", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
            + Add Client
          </button>
        </div>
        {EXPORT_HOUSES.map((eh, i) => (
          <div key={eh.id} style={{ padding: "16px 22px", borderBottom: i < EXPORT_HOUSES.length - 1 ? "1px solid #f1f5f9" : "none", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: "linear-gradient(135deg,#1d6ef5,#0d4fd4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              {eh.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{eh.name}</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>
                📍 {eh.city} · {eh.products} products · {eh.markets.join(", ")}
              </div>
            </div>
            <ScoreRing score={eh.score} size={54} />
            <Badge
              color={
                eh.status === "healthy"
                  ? "#dcfce7"
                  : eh.status === "critical"
                    ? "#fef2f2"
                    : "#fef3c7"
              }
              text={eh.status === "healthy" ? "#166534" : eh.status === "critical" ? "#dc2626" : "#92400e"}
            >
              {eh.status.toUpperCase()}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
