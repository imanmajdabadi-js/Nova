"use client";

import { IconButton } from "@/components/ui";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useWishlistStore } from "@/lib/wishlist-store";
import { cn } from "@/lib";

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
  const isHydrated = useWishlistStore((state) => state.isHydrated);
  const isSaved = useWishlistStore((state) => state.isSaved);
  const toggle = useWishlistStore((state) => state.toggle);
  const saved = isSaved(experienceId);

  if (!isHydrated) {
    return (
      <IconButton
        label={showLabel ? "ذخیره تجربه" : undefined}
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
