"use client";

import Link from "next/link";
import { Badge, styles } from "@/lib/components";

export default function Home() {
  return (
    <div>
      {/* ══ HERO ═════════════════════════════════════════════════════════════════════ */}
      <div style={{ background: "linear-gradient(135deg,#0a1628 0%,#0f2347 60%,#0a1628 100%)", padding: "72px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%,rgba(29,110,245,0.15) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(16,185,129,0.1) 0%,transparent 40%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(29,110,245,0.15)", border: "1px solid rgba(29,110,245,0.3)", borderRadius: 99, padding: "5px 16px", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
            <span style={{ fontSize: 11, color: "#93c5fd", fontWeight: 600, letterSpacing: 1 }}>BUILT ON FSSAI · APEDA · EU 178/2002 · FDA FSMA</span>
          </div>
          <h1 style={{ fontFamily: "Fraunces, serif", fontSize: 50, fontWeight: 800, color: "#fff", lineHeight: 1.08, margin: "0 0 18px", letterSpacing: -1 }}>
            Export Indian Food.<br />
            <span style={{ background: "linear-gradient(90deg,#1d6ef5,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Zero Compliance Surprises.</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 40px" }}>527 Indian food products rejected by EU in 4 years — not because of quality, because of compliance gaps. Upload your label and documents. We tell you exactly what's missing.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <Link href="/check" style={{ ...styles.primaryBtn, textDecoration: "none", display: "inline-block" }}>Check Your Product →</Link>
            <Link href="/dashboard" style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "13px 28px", fontWeight: 600, fontSize: 15, cursor: "pointer", textDecoration: "none", display: "inline-block" }}>View Dashboard</Link>
          </div>
        </div>
      </div>

      {/* ══ STATS ════════════════════════════════════════════════════════════════════ */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8edf5", padding: "24px 40px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {[
            { v: "527", l: "EU rejections of Indian food (2020–24)", icon: "🚫" },
            { v: "₹3,200Cr", l: "Lost annually in rejected shipments", icon: "💸" },
            { v: "4,000+", l: "Export houses needing compliance help", icon: "🏭" },
            { v: "6–8 months", l: "Current compliance process time", icon: "⏳" },
          ].map((s) => (
            <div key={s.v} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: "#f0f5ff", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ fontFamily: "Fraunces, serif", fontSize: 20, fontWeight: 700, lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2, lineHeight: 1.4 }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ WHO IT SERVES ═════════════════════════════════════════════════════════════ */}
      <div style={{ padding: "64px 40px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 34, fontWeight: 700, margin: "0 0 10px" }}>Who ExportReady Serves</h2>
          <p style={{ color: "#64748b", fontSize: 15 }}>Three customer types. All with real compliance pain. All with budget to solve it.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          {[
            { icon: "🏭", title: "Export Houses", tag: "PRIMARY", tagColor: "#dbeafe", tagText: "#1d4ed8", desc: "Manage compliance for 50–200 supplier products across multiple markets. Currently paying ₹5–15L/year to consultants.", pay: "₹15,000–25,000/month", saving: "Replaces ₹5–15L/year consultant" },
            { icon: "🌾", title: "Food Processors", tag: "SECONDARY", tagColor: "#dcfce7", tagText: "#166534", desc: "₹5–50Cr revenue businesses exporting directly. Have finance teams but no in-house compliance expertise.", pay: "₹4,999 per product report", saving: "10x cheaper than consultants" },
            { icon: "✈️", title: "International Importers", tag: "HIGHEST VALUE", tagColor: "#fef3c7", tagText: "#92400e", desc: "UK/EU/UAE buyers vetting Indian suppliers before signing purchase orders. Most to lose from non-compliance.", pay: "₹20,000–40,000 per audit", saving: "vs ₹2–5L for SGS / Bureau Veritas" },
          ].map((c) => (
            <div key={c.title} style={{ ...styles.card, padding: 26 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: "#f0f5ff", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>{c.icon}</div>
                <Badge color={c.tagColor} text={c.tagText}>{c.tag}</Badge>
              </div>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{c.title}</div>
              <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{c.desc}</p>
              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1d6ef5", marginBottom: 4 }}>💳 {c.pay}</div>
                <div style={{ fontSize: 12, color: "#10b981", fontWeight: 600 }}>✓ {c.saving}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
