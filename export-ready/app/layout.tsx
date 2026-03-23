import type { Metadata } from "next";
import { Navbar } from "@/lib/components";
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
      <body className="app-shell">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
