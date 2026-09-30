"use client";

import { useSyncExternalStore } from "react";
import { IconButton } from "@/components/ui";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useWishlistStore } from "@/lib/wishlist-store";
import { cn } from "@/lib";

function useClient() {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      window.addEventListener("hydration", callback);
      return () => window.removeEventListener("hydration", callback);
    },
    () => true,
    () => false
  );
}

export function WishlistToggle({
  experienceId,
  size = "sm",
  showLabel = true,
  className,
}: {
  experienceId: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}) {
  const isClient = useClient();
  const { isSaved, toggle, isHydrated } = useWishlistStore();
  const saved = isSaved(experienceId);

  if (!isClient || !isHydrated) {
    return (
      <IconButton
        label={showLabel ? (saved ? "ذخیره شده" : "ذخیره تجربه") : undefined}
        icon={<HeartOutlined />}
        variant="ghost"
        size={size}
        disabled
        className={cn("text-foreground-muted", className)}
      />
    );
  }

  const label = showLabel
    ? saved
      ? "حذف از ذخیره‌شده‌ها"
      : "ذخیره تجربه"
    : undefined;

  return (
    <IconButton
      label={label}
      icon={saved ? <HeartFilled /> : <HeartOutlined />}
      variant={saved ? "destructive" : "ghost"}
      size={size}
      onClick={() => toggle(experienceId)}
      className={cn(
        "transition-all duration-200",
        saved ? "text-error" : "text-foreground-muted",
        className,
      )}
    />
  );
}