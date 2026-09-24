import "@/styles/globals.css";
import "antd/dist/reset.css";

import type { Metadata } from "next";
import { fontVars } from "@/config/fonts";
import { NovaThemeProvider } from "@/components/providers/nova-theme-provider";
import { cssThemeVars } from "@/styles/tokens";

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
    <html lang="fa" dir="rtl" className={fontVars} suppressHydrationWarning>
      <style dangerouslySetInnerHTML={{ __html: cssThemeVars() }} />
      <body>
        <NovaThemeProvider defaultMode="light">{children}</NovaThemeProvider>
      </body>
    </html>
  );
}
