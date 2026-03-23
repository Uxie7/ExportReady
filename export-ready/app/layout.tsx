import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ExportReady - Food Compliance Platform",
  description: "Export Indian food with zero compliance surprises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Fraunces:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'DM Sans', sans-serif", background: "#f7f8fc", minHeight: "100vh", color: "#0f1923", margin: 0 }}>
        {/* NAV */}
        <nav
          style={{
            background: "#0a1628",
            padding: "0 32px",
            height: 62,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                background: "linear-gradient(135deg,#1d6ef5,#0d4fd4)",
                width: 34,
                height: 34,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 17,
              }}
            >
              🌐
            </div>
            <div>
              <div style={{ fontFamily: "Fraunces, serif", fontWeight: 800, fontSize: 16, color: "#fff", lineHeight: 1 }}>ExportReady</div>
              <div style={{ fontSize: 9, color: "#475569", letterSpacing: 1.5, fontWeight: 600 }}>FOOD COMPLIANCE PLATFORM</div>
            </div>
          </Link>

          <div style={{ display: "flex", gap: 4 }}>
            {[
              { href: "/", label: "Home" },
              { href: "/check", label: "Check Product" },
              { href: "/dashboard", label: "Dashboard" },
              { href: "/markets", label: "Markets" },
            ].map((nav) => (
              <Link
                key={nav.href}
                href={nav.href}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 8,
                  background: "transparent",
                  color: "#94a3b8",
                  fontWeight: 600,
                  fontSize: 13,
                  fontFamily: "DM Sans, sans-serif",
                  transition: "all 0.2s",
                  textDecoration: "none",
                }}
              >
                {nav.label}
              </Link>
            ))}
          </div>

          <button
            style={{
              background: "#1d6ef5",
              color: "#fff",
              border: "none",
              padding: "8px 18px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Get Started →
          </button>
        </nav>

        {children}
      </body>
    </html>
  );
}
