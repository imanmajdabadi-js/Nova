"use client";

import Link from "next/link";
import { Button, IconButton } from "@/components/ui";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useTheme } from "@/components/providers/nova-theme-provider";
import { cn } from "@/lib";
import type { NavItem } from "@/config/navigation";

interface HeaderProps {
  navigation: readonly NavItem[];
  currentPath: string;
}

export function Header({ navigation, currentPath }: HeaderProps) {
  const { mode, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"
          >
            <span className="text-2xl font-extrabold text-primary">N</span>
            <span className="hidden sm:inline">NOVA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1" aria-label="اصلی">
            {navigation.map((item) => {
              const isActive =
                currentPath === item.href ||
                (item.href !== "/" && currentPath.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm transition-colors duration-150",
                    isActive
                      ? "text-foreground font-medium"
                      : "text-foreground-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <IconButton
            label={mode === "dark" ? "حالت روشن" : "حالت شبی"}
            icon={mode === "dark" ? <SunOutlined /> : <MoonOutlined />}
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="hidden sm:inline-flex"
          />
          <Button variant="primary" size="sm" className="hidden sm:inline-flex">
            ورود
          </Button>
        </div>
      </div>
    </header>
  );
}
