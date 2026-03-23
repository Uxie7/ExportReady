"use client";

import { useState } from "react";
import Link from "next/link";
import { MARKETS, CATEGORIES, COMPLIANCE_DATA, PARSE_STEPS } from "@/lib/data";
import { Badge, UploadBox, styles } from "@/lib/components";

interface FormState {
  productName: string;
  category: string;
  ingredients: string;
  shelfLife: string;
  storageConditions: string;
  market: string | null;
  label: boolean;
  fssai: boolean;
  labReport: boolean;
  orgCert: boolean;
}

export default function CheckProduct() {
  const [step, setStep] = useState(1); // 1=product, 2=market, 3=documents, 4=scanning
  const [form, setForm] = useState<FormState>({
    productName: "",
    category: "",
    ingredients: "",
    shelfLife: "",
    storageConditions: "",
    market: null,
    label: false,
    fssai: false,
    labReport: false,
    orgCert: false,
  });
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMessages, setScanMessages] = useState<any[]>([]);

  const prefill = () =>
    setForm((f) => ({
      ...f,
      productName: "Organic Mango Pickle",
      category: "Pickles & Preserves",
      ingredients: "Raw mango, mustard oil, salt, turmeric, red chilli, fenugreek seeds, nigella seeds, sulphites",
      shelfLife: "18 months",
      storageConditions: "Store in cool, dry place. Refrigerate after opening.",
    }));

  const startScan = () => {
    setStep(4);
    setScanProgress(0);
    setScanMessages([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i >= PARSE_STEPS.length) {
        clearInterval(interval);
        setTimeout(() => {
          window.location.href = "/report";
        }, 800);
        return;
      }
      const currentStep = PARSE_STEPS[i];
      if (currentStep) {
        setScanProgress(currentStep.pct);
        setScanMessages((prev) => [...prev, currentStep]);
      }
      i++;
    }, 500);
  };

  return (
    <div className="page-content" style={{ padding: "48px 40px", maxWidth: 760, margin: "0 auto" }}>
      {/* ── STEP INDICATOR ── */}
      {step < 4 && (
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 40 }}>
          {["Product Details", "Target Market", "Upload Documents"].map((s, i) => {
            const n = i + 1;
            const active = step === n;
            const done = step > n;
            return (
              <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: done ? "#10b981" : active ? "#1d6ef5" : "#e2e8f0",
                      color: done || active ? "#fff" : "#94a3b8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    {done ? "✓" : n}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? "#0f1923" : "#94a3b8", whiteSpace: "nowrap" }}>{s}</span>
                </div>
                {i < 2 && <div style={{ flex: 1, height: 2, background: done ? "#10b981" : "#e2e8f0", margin: "0 12px" }} />}
              </div>
            );
          })}
        </div>
      )}

      {/* ── STEP 1: PRODUCT DETAILS ── */}
      {step === 1 && (
        <div>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 32, fontWeight: 800, margin: "0 0 6px" }}>Tell Us About Your Product</h2>
          <p style={{ color: "#64748b", fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>We need these details to match your product against the correct regulations for your target market.</p>

          <div style={{ ...styles.card, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
              <button
                onClick={prefill}
                style={{ background: "#f0f5ff", color: "#1d6ef5", border: "1px solid #dbeafe", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
              >
                ✨ Auto-fill Sample Data
              </button>
            </div>

            {[
              { label: "PRODUCT NAME", placeholder: "e.g. Organic Mango Pickle", field: "productName", type: "input" },
              { label: "FULL INGREDIENT LIST", placeholder: "e.g. Raw mango, mustard oil, salt, turmeric, red chilli, fenugreek seeds...\n\nInclude ALL ingredients including preservatives and additives.", field: "ingredients", type: "textarea" },
            ].map((f) => (
              <div key={f.field} style={{ marginBottom: 22 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 1, display: "block", marginBottom: 8 }}>
                  {f.label} <span style={{ color: "#ef4444" }}>*</span>
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    rows={4}
                    value={form[f.field as "productName" | "ingredients"]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.field]: e.target.value }))}
                    placeholder={f.placeholder}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 10,
                      border: "1.5px solid #e2e8f0",
                      fontSize: 14,
                      fontFamily: "DM Sans, sans-serif",
                      resize: "vertical",
                      outline: "none",
                      boxSizing: "border-box",
                      background: "#fafbfd",
                      lineHeight: 1.6,
                    }}
                  />
                ) : (
                  <input
                    value={form[f.field as "productName" | "ingredients"]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.field]: e.target.value }))}
                    placeholder={f.placeholder}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 10,
                      border: "1.5px solid #e2e8f0",
                      fontSize: 14,
                      fontFamily: "DM Sans, sans-serif",
                      outline: "none",
                      boxSizing: "border-box",
                      background: "#fafbfd",
                    }}
                  />
                )}
              </div>
            ))}

            <div className="responsive-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 22 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 1, display: "block", marginBottom: 8 }}>
                  PRODUCT CATEGORY <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 10,
                    border: "1.5px solid #e2e8f0",
                    fontSize: 14,
                    fontFamily: "DM Sans, sans-serif",
                    outline: "none",
                    background: "#fafbfd",
                    color: form.category ? "#0f1923" : "#94a3b8",
                  }}
                >
                  <option value="">Select...</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 1, display: "block", marginBottom: 8 }}>SHELF LIFE</label>
                <input
                  value={form.shelfLife}
                  onChange={(e) => setForm((p) => ({ ...p, shelfLife: e.target.value }))}
                  placeholder="e.g. 18 months"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 10,
                    border: "1.5px solid #e2e8f0",
                    fontSize: 14,
                    fontFamily: "DM Sans, sans-serif",
                    outline: "none",
                    boxSizing: "border-box",
                    background: "#fafbfd",
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 1, display: "block", marginBottom: 8 }}>STORAGE CONDITIONS</label>
                <input
                  value={form.storageConditions}
                  onChange={(e) => setForm((p) => ({ ...p, storageConditions: e.target.value }))}
                  placeholder="e.g. Cool, dry place"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 10,
                    border: "1.5px solid #e2e8f0",
                    fontSize: 14,
                    fontFamily: "DM Sans, sans-serif",
                    outline: "none",
                    boxSizing: "border-box",
                    background: "#fafbfd",
                  }}
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!form.productName || !form.ingredients || !form.category}
              style={{ ...styles.primaryBtn, width: "100%", padding: "15px", fontSize: 16, opacity: !form.productName || !form.ingredients || !form.category ? 0.5 : 1 }}
            >
              Next: Select Market →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: TARGET MARKET ── */}
      {step === 2 && (
        <div>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 32, fontWeight: 800, margin: "0 0 6px" }}>Select Target Market</h2>
          <p style={{ color: "#64748b", fontSize: 15, marginBottom: 32 }}>Each market has different regulations. We'll cross-reference your product against the exact rules for your destination.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
            {MARKETS.map((m) => (
              <div
                key={m.code}
                onClick={() => setForm((p) => ({ ...p, market: m.code }))}
                style={{
                  ...styles.card,
                  padding: "20px 22px",
                  cursor: "pointer",
                  border: `2px solid ${form.market === m.code ? "#1d6ef5" : "#e8edf5"}`,
                  background: form.market === m.code ? "#eff6ff" : "#fff",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 32 }}>{m.flag}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: form.market === m.code ? "#1d4ed8" : "#0f1923" }}>{m.name}</div>
                    <div style={{ fontSize: 12, marginTop: 3, display: "flex", gap: 10 }}>
                      <span style={{ color: m.complexity === "High" ? "#ef4444" : "#f59e0b", fontWeight: 600 }}>{m.complexity} Complexity</span>
                      <span style={{ color: "#94a3b8" }}>{m.rejections} Indian rejections</span>
                    </div>
                  </div>
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      border: `2px solid ${form.market === m.code ? "#1d6ef5" : "#e2e8f0"}`,
                      background: form.market === m.code ? "#1d6ef5" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {form.market === m.code ? "✓" : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              ← Back
            </button>
            <button onClick={() => setStep(3)} disabled={!form.market} style={{ ...styles.primaryBtn, flex: 2, padding: "14px", opacity: !form.market ? 0.5 : 1 }}>
              Next: Upload Documents →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: UPLOAD DOCUMENTS ── */}
      {step === 3 && (
        <div>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 32, fontWeight: 800, margin: "0 0 6px" }}>Upload Your Documents</h2>
          <p style={{ color: "#64748b", fontSize: 15, marginBottom: 8, lineHeight: 1.6 }}>Upload what you already have. We'll check these against {MARKETS.find((m) => m.code === form.market)?.name} requirements and identify exactly what's missing.</p>

          <div style={{ background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 10, padding: "12px 16px", marginBottom: 28, fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
            💡 <strong>Don't have all documents?</strong> That's okay — upload what you have. We'll tell you exactly what's missing and how to get it. Uploading more docs = more accurate report.
          </div>

          <div style={{ ...styles.card, padding: 28, marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Required Documents</div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20 }}>These are mandatory for {MARKETS.find((m) => m.code === form.market)?.name} exports</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <UploadBox label="Product Label / Packaging" sublabel="Your current product label or packaging artwork" accepted="PDF, PNG, JPG — max 10MB" icon="🏷️" filled={form.label} onFill={() => setForm((p) => ({ ...p, label: !p.label }))} />
              <UploadBox label="FSSAI License / Export Certificate" sublabel="Your current FSSAI manufacturing or export license" accepted="PDF — max 5MB" icon="📄" filled={form.fssai} onFill={() => setForm((p) => ({ ...p, fssai: !p.fssai }))} />
            </div>
          </div>

          <div style={{ ...styles.card, padding: 28, marginBottom: 28 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Optional but Recommended</div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20 }}>Uploading these helps us give a more complete report</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <UploadBox label="Lab Test Reports" sublabel="Any existing pesticide, heavy metals, or nutritional lab reports" accepted="PDF — max 10MB" icon="🧪" filled={form.labReport} onFill={() => setForm((p) => ({ ...p, labReport: !p.labReport }))} />
              <UploadBox label="Organic / Other Certifications" sublabel="Organic cert, Halal cert, ISO, or other quality certifications" accepted="PDF — max 5MB" icon="🏆" filled={form.orgCert} onFill={() => setForm((p) => ({ ...p, orgCert: !p.orgCert }))} />
            </div>
          </div>

          {/* ── SUMMARY BEFORE SCAN ── */}
          <div style={{ ...styles.card, padding: 22, marginBottom: 20, background: "#f8fafc" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 12 }}>READY TO SCAN</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 13 }}>
              <div>
                <span style={{ color: "#94a3b8" }}>Product: </span>
                <span style={{ fontWeight: 600 }}>{form.productName}</span>
              </div>
              <div>
                <span style={{ color: "#94a3b8" }}>Market: </span>
                <span style={{ fontWeight: 600 }}>{MARKETS.find((m) => m.code === form.market)?.flag} {MARKETS.find((m) => m.code === form.market)?.name}</span>
              </div>
              <div>
                <span style={{ color: "#94a3b8" }}>Category: </span>
                <span style={{ fontWeight: 600 }}>{form.category}</span>
              </div>
              <div>
                <span style={{ color: "#94a3b8" }}>Documents: </span>
                <span style={{ fontWeight: 600 }}>{[form.label, form.fssai, form.labReport, form.orgCert].filter(Boolean).length} uploaded</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => setStep(2)} style={{ flex: 1, background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: 12, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              ← Back
            </button>
            <button onClick={startScan} style={{ ...styles.primaryBtn, flex: 2, padding: "14px", fontSize: 16 }}>
              Run Compliance Check — ₹4,999 →
            </button>
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", marginTop: 12 }}>Report ready in ~48 hours · All documents encrypted and not shared</p>
        </div>
      )}

      {/* ── STEP 4: SCANNING ── */}
      {step === 4 && (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 36, fontWeight: 800, marginBottom: 6 }}>
            {scanProgress < 100 ? "Scanning Your Product..." : "Scan Complete!"}
          </div>
          <div style={{ color: "#64748b", marginBottom: 6 }}>
            {form.productName} → {MARKETS.find((m) => m.code === form.market)?.flag} {MARKETS.find((m) => m.code === form.market)?.name}
          </div>
          <div style={{ fontFamily: "Fraunces, serif", fontSize: 56, fontWeight: 800, color: scanProgress === 100 ? "#10b981" : "#1d6ef5", marginBottom: 28, transition: "color 0.3s" }}>
            {Math.round(scanProgress)}%
          </div>

          {/* ── PROGRESS BAR ── */}
          <div style={{ background: "#e2e8f0", borderRadius: 8, height: 10, overflow: "hidden", marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
            <div
              style={{
                width: `${scanProgress}%`,
                height: "100%",
                borderRadius: 8,
                background: scanProgress === 100 ? "linear-gradient(90deg,#10b981,#059669)" : "linear-gradient(90deg,#1d6ef5,#10b981)",
                transition: "width 0.5s ease",
              }}
            />
          </div>

          {/* ── PARSE LOG ── */}
          <div style={{ ...styles.card, padding: "20px 24px", maxWidth: 520, margin: "0 auto", textAlign: "left" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 1, marginBottom: 14 }}>PARSING LOG</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 240, overflow: "auto" }}>
              {scanMessages.map((m: any, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: i === scanMessages.length - 1 ? "#0f1923" : "#94a3b8", fontWeight: i === scanMessages.length - 1 ? 600 : 400 }}>
                  <span>{m.icon}</span>
                  <span style={{ color: "#10b981", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span>{m.msg}</span>
                </div>
              ))}
            </div>
          </div>

          {[form.label, form.fssai, form.labReport, form.orgCert].filter(Boolean).length > 0 && (
            <div style={{ marginTop: 24, fontSize: 13, color: "#94a3b8" }}>
              Processing {[form.label && "label", form.fssai && "FSSAI cert", form.labReport && "lab report", form.orgCert && "certifications"].filter(Boolean).join(", ")}...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
