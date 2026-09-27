"use client";

import { BookingStatus, statusLabels } from "@/data/bookings";
import { cn } from "@/lib";

export type BookingFilter = "all" | BookingStatus;

const tabs: { value: BookingFilter; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "pending", label: statusLabels.pending },
  { value: "confirmed", label: statusLabels.confirmed },
  { value: "completed", label: statusLabels.completed },
  { value: "canceled", label: statusLabels.canceled },
  { value: "refunded", label: statusLabels.refunded },
];

export function BookingTabs({
  active,
  onChange,
}: {
  active: BookingFilter;
  onChange: (value: BookingFilter) => void;
}) {
  return (
    <nav
      role="tablist"
      aria-orientation="horizontal"
      className="mb-6 -mx-4 -mx-6 overflow-x-auto border-b border-border sm:mx-0 sm:rounded-lg sm:border"
    >
      <div className="flex h-12 min-w-max items-center justify-center gap-1 p-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active === tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              active === tab.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-foreground-muted hover:bg-surface-muted hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
