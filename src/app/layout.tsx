import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOVA",
  description:
    "Persian-first platform for discovering and booking urban experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
