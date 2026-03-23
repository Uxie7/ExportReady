"use client";

import Link from "next/link";
import { MARKETS, COMPLIANCE_DATA } from "@/lib/data";
import { Badge, ScoreRing, styles } from "@/lib/components";

export default function Markets() {
  return (
    <div className="page-content" style={{ padding: "48px 40px", maxWidth: 880, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 12, color: "#1d6ef5", fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>MARKET INTELLIGENCE</div>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 30, fontWeight: 800, margin: 0 }}>Export Market Overview</h2>
      </div>

      <div className="responsive-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {MARKETS.map((m) => {
          const d = COMPLIANCE_DATA[m.code as keyof typeof COMPLIANCE_DATA];
          return (
            <div key={m.code} style={{ ...styles.card, padding: 26 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <span style={{ fontSize: 34 }}>{m.flag}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Fraunces, serif", fontSize: 18, fontWeight: 700 }}>{m.name}</div>
                  <Badge
                    color={m.complexity === "High" ? "#fef2f2" : "#fffbeb"}
                    text={m.complexity === "High" ? "#dc2626" : "#d97706"}
                  >
                    {m.complexity} Complexity
                  </Badge>
                </div>
                <ScoreRing score={d.score} size={54} />
              </div>
              <div
                style={{
                  background: "#fef2f2",
                  borderRadius: 8,
                  padding: "9px 14px",
                  fontSize: 13,
                  color: "#dc2626",
                  fontWeight: 500,
                  marginBottom: 14,
                }}
              >
                ⚠️ {m.rejections} Indian products rejected (2020–24)
              </div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>
                {d.items.filter((i) => i.critical).length} critical requirements · {d.items.length} total checks
              </div>
              <Link
                href="/check"
                style={{
                  background: "#f0f5ff",
                  color: "#1d6ef5",
                  border: "1px solid #dbeafe",
                  padding: "9px 18px",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                Check Product for {m.name} →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
