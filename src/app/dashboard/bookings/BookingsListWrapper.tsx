"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { BookingsList } from "@/components/domain/bookings-list";
import { bookings as demoBookings } from "@/data/bookings";
import { useBookingStore } from "@/lib/booking-store";
import type { BookingFilter } from "@/components/domain/booking-tabs";
import type { CustomerBooking } from "@/lib/booking-store";

export function BookingsListWrapper({
  initialFilter,
}: {
  initialFilter: BookingFilter;
}) {
  const router = useRouter();
  const persistedBookings = useBookingStore((state) => state.bookings);
  const isHydrated = useBookingStore((state) => state.isHydrated);

  const allBookings = useMemo(() => {
    const persisted = (isHydrated ? persistedBookings : []) || [];
    const persistedRefs = new Set(
      persisted.map((b: CustomerBooking) => b.reference),
    );
    const uniqueDemo = demoBookings.filter(
      (b) => !persistedRefs.has(b.reference),
    );
    return [...persisted, ...uniqueDemo].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    );
  }, [persistedBookings, isHydrated]);

  const handleFilterChange = (next: BookingFilter) => {
    const params = new URLSearchParams();
    if (next !== "all") params.set("filter", next);
    const url = params.toString() ? `?${params.toString()}` : "";
    router.replace(`/dashboard/bookings${url}`, { scroll: false });
  };

  return (
    <BookingsList
      bookings={allBookings}
      initialFilter={initialFilter}
      onFilterChange={handleFilterChange}
    />
  );
}
