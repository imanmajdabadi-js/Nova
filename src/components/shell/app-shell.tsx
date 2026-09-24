"use client";

import { type ReactNode } from "react";
import { Header } from "@/components/shell/header";
import { MobileNav } from "@/components/shell/mobile-nav";
import { PageContainer } from "@/components/shell/page-container";
import { appNavigation, publicNavigation } from "@/config/navigation";
import { usePathname } from "@/lib";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAppPage = appNavigation.some((item) =>
    pathname.startsWith(item.href),
  );

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <Header
        navigation={isAppPage ? appNavigation : publicNavigation}
        currentPath={pathname}
      />
      <PageContainer>{children}</PageContainer>
      {isAppPage && (
        <MobileNav navigation={appNavigation} currentPath={pathname} />
      )}
    </div>
  );
}
