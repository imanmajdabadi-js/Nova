"use client";

import Link from "next/link";
import { IconButton } from "@/components/ui";
import { MenuOutlined } from "@ant-design/icons";
import { cn } from "@/lib";
import type { NavItem } from "@/config/navigation";

interface MobileNavProps {
  navigation: readonly NavItem[];
  currentPath: string;
}

export function MobileNav({ navigation, currentPath }: MobileNavProps) {
  return (
    <div className="md:hidden">
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 backdrop-blur-sm">
        <div className="flex items-center justify-around px-2 py-1">
          {navigation.slice(0, 5).map((item) => {
            const isActive =
              currentPath === item.href ||
              (item.href !== "/" && currentPath.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-md px-3 py-1.5 text-xs transition-colors duration-150",
                  isActive
                    ? "text-primary font-medium"
                    : "text-foreground-muted hover:text-foreground",
                )}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
          <IconButton
            label="منو"
            icon={<MenuOutlined />}
            variant="ghost"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
