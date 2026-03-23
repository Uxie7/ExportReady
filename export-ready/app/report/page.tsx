"use client";

import { useState } from "react";
import Link from "next/link";
import { MARKETS, COMPLIANCE_DATA } from "@/lib/data";
import { Badge, ScoreRing, styles } from "@/lib/components";

export default function Report() {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // Use default form values (EU market, Organic Mango Pickle)
  const form = {
    productName: "Organic Mango Pickle",
    category: "Pickles & Preserves",
    market: "EU",
  };

  const reportData = form.market ? COMPLIANCE_DATA[form.market as keyof typeof COMPLIANCE_DATA] : COMPLIANCE_DATA.EU;
  const categories = ["All", ...new Set(reportData.items.map((i) => i.category))];
  const filtered = activeFilter === "All" ? reportData.items : reportData.items.filter((i) => i.category === activeFilter);
  const passCount = reportData.items.filter((i) => i.status === "pass").length;
  const failCount = reportData.items.filter((i) => i.status === "fail").length;
  const pendingCount = reportData.items.filter((i) => i.status === "pending").length;

  return (
    <div className="page-content" style={{ padding: "32px 40px", maxWidth: 1000, margin: "0 auto" }}>
      {/* ── HEADER ── */}
      <div style={{ background: "linear-gradient(135deg,#0a1628,#0f2347)", borderRadius: 20, padding: "26px 32px", marginBottom: 22, color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <div>
          <div style={{ fontSize: 11, color: "#475569", fontWeight: 700, letterSpacing: 1.5, marginBottom: 6 }}>COMPLIANCE REPORT</div>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{form.productName}</div>
          <div style={{ color: "#64748b", fontSize: 13, marginBottom: 14 }}>
            {MARKETS.find((m) => m.code === form.market)?.flag} {MARKETS.find((m) => m.code === form.market)?.name} · {form.category} · Generated just now
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            {[
              { v: passCount, l: "PASSED", c: "#10b981" },
              { v: failCount, l: "FAILED", c: "#ef4444" },
              { v: pendingCount, l: "PENDING", c: "#f59e0b" },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 26, fontWeight: 800, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 10, color: "#475569", fontWeight: 700 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <ScoreRing score={reportData.score} size={100} />
          <div>
            <div style={{ fontSize: 12, color: "#64748b", maxWidth: 160, marginBottom: 12, lineHeight: 1.5 }}>
              {reportData.score < 60 ? "⚠️ NOT export ready. Fix all critical items before shipping." : "🔄 Almost there — address remaining items."}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button style={{ background: "#1d6ef5", color: "#fff", border: "none", padding: "9px 16px", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                📥 Download PDF
              </button>
              <Link href="/check" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "9px 16px", borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: "pointer", textDecoration: "none", display: "inline-block" }}>
                + New Check
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveFilter(c)}
            style={{
              padding: "6px 16px",
              borderRadius: 99,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13,
              fontFamily: "DM Sans, sans-serif",
              transition: "all 0.15s",
              background: activeFilter === c ? "#1d6ef5" : "#fff",
              color: activeFilter === c ? "#fff" : "#64748b",
              border: `1px solid ${activeFilter === c ? "#1d6ef5" : "#e2e8f0"}`,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ── ITEMS LIST ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((item) => {
          const isExpanded = expandedItem === item.id;
          const scMap: Record<string, any> = {
            pass: { bg: "#f0fdf4", border: "#bbf7d0", dot: "#10b981", label: "Passed", icon: "✓" },
            fail: { bg: "#fef2f2", border: "#fecaca", dot: "#ef4444", label: "Action Required", icon: "✗" },
            pending: { bg: "#fffbeb", border: "#fde68a", dot: "#f59e0b", label: "Test Required", icon: "○" },
          };
          const sc = scMap[item.status] || scMap["pending"];
          return (
            <div key={item.id} style={{ background: isExpanded ? sc.bg : "#fff", borderRadius: 14, border: `1px solid ${isExpanded ? sc.border : "#e8edf5"}`, overflow: "hidden", transition: "all 0.2s" }}>
              <div
                onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                style={{ padding: "15px 20px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: `${sc.dot}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: sc.dot,
                    fontWeight: 800,
                    fontSize: 13,
                    flexShrink: 0,
                  }}
                >
                  {sc.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{item.req}</span>
                    {item.critical && <Badge color="#fef3c7" text="#92400e">REQUIRED</Badge>}
                  </div>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{item.category}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Badge color={`${sc.dot}18`} text={sc.dot}>{sc.label}</Badge>
                  <span style={{ color: "#94a3b8", fontSize: 16 }}>{isExpanded ? "↑" : "↓"}</span>
                </div>
              </div>
              {isExpanded && item.fix && (
                <div style={{ borderTop: `1px solid ${sc.border}`, padding: "14px 20px 14px 62px", background: `${sc.dot}08` }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 1, marginBottom: 6 }}>💡 HOW TO FIX</div>
                  <div style={{ fontSize: 14, color: "#0f1923", lineHeight: 1.6 }}>{item.fix}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
