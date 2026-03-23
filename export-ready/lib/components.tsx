"use client";

import React, { useState } from "react";

// ─── NAVBAR ═════════════════════════════════════════════════════════════════
export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <a href="/" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-logo">🌐</div>
          <div>
            <div className="brand-title">ExportReady</div>
            <div className="brand-subtitle">FOOD COMPLIANCE PLATFORM</div>
          </div>
        </a>
      </div>

      <button className="hamburger" onClick={() => setMobileMenuOpen((p) => !p)} aria-label="Toggle menu" type="button">
        {mobileMenuOpen ? "✖" : "☰"}
      </button>

      <nav className={`navbar-menu ${mobileMenuOpen ? "open" : ""}`}>
        {[
          { href: "/", label: "Home" },
          { href: "/check", label: "Check Product" },
          { href: "/dashboard", label: "Dashboard" },
          { href: "/markets", label: "Markets" },
        ].map((nav) => (
          <a key={nav.href} href={nav.href} className="navbar-item" onClick={() => setMobileMenuOpen(false)}>
            {nav.label}
          </a>
        ))}
        <a href="/check" className="cta-btn" onClick={() => setMobileMenuOpen(false)}>
          Get Started →
        </a>
      </nav>
    </header>
  );
};

// ─── BADGE ═════════════════════════════════════════════════════════════════
export const Badge = ({ children, color, text }: { children: React.ReactNode; color: string; text: string }) => (
  <span style={{ background: color, color: text, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700 }}>{children}</span>
);

// ─── SCORE RING ════════════════════════════════════════════════════════════
export const ScoreRing = ({ score, size = 80 }: { score: number; size?: number }) => {
  const color = score >= 70 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";
  const label = score >= 70 ? "GOOD" : score >= 50 ? "AT RISK" : "CRITICAL";
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `${Math.max(5, size * 0.07)}px solid ${color}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `${color}11`,
          flexShrink: 0,
        }}
      >
        <div style={{ fontFamily: "Fraunces,serif", fontSize: size * 0.28, fontWeight: 800, color, lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: size * 0.1, color, fontWeight: 700, letterSpacing: 0.5 }}>{label}</div>
      </div>
    </div>
  );
};

// ─── UPLOAD BOX ════════════════════════════════════════════════════════════
export const UploadBox = ({
  label,
  sublabel,
  accepted,
  icon,
  filled,
  onFill,
}: {
  label: string;
  sublabel: string;
  accepted: string;
  icon: string;
  filled: boolean;
  onFill: () => void;
}) => (
  <div
    onClick={onFill}
    style={{
      border: `2px dashed ${filled ? "#10b981" : "#cbd5e1"}`,
      borderRadius: 12,
      padding: "20px 18px",
      cursor: "pointer",
      background: filled ? "#f0fdf4" : "#fafbfd",
      transition: "all 0.2s",
      display: "flex",
      alignItems: "center",
      gap: 14,
    }}
    onMouseEnter={(e) => !filled && ((e.currentTarget as HTMLDivElement).style.borderColor = "#1d6ef5")}
    onMouseLeave={(e) => !filled && ((e.currentTarget as HTMLDivElement).style.borderColor = "#cbd5e1")}
  >
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 10,
        flexShrink: 0,
        background: filled ? "#dcfce7" : "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
      }}
    >
      {filled ? "✅" : icon}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 700, fontSize: 14, color: filled ? "#166534" : "#0f1923" }}>
        {filled ? `${label} — Uploaded` : label}
      </div>
      <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{filled ? "Click to re-upload" : sublabel}</div>
      <div style={{ fontSize: 11, color: "#cbd5e1", marginTop: 2 }}>{accepted}</div>
    </div>
    {!filled && (
      <div
        style={{
          background: "#f0f5ff",
          color: "#1d6ef5",
          border: "1px solid #dbeafe",
          borderRadius: 8,
          padding: "6px 14px",
          fontSize: 12,
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        Upload →
      </div>
    )}
  </div>
);

// ─── STYLE UTILS ════════════════════════════════════════════════════════════
export const styles = {
  card: { background: "#fff", borderRadius: 16, border: "1px solid #e8edf5", boxShadow: "0 2px 12px rgba(15,25,35,0.06)" },
  primaryBtn: { background: "linear-gradient(135deg,#1d6ef5,#0d4fd4)", color: "#fff", border: "none", borderRadius: 12, padding: "13px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "DM Sans, sans-serif" } as React.CSSProperties,
  navBtn: (active: boolean) => ({ padding: "8px 16px", border: "none", cursor: "pointer", borderRadius: 8, background: active ? "#1d6ef5" : "transparent", color: active ? "#fff" : "#94a3b8", fontWeight: 600, fontSize: 13, fontFamily: "DM Sans, sans-serif", transition: "all 0.2s" } as React.CSSProperties),
};
