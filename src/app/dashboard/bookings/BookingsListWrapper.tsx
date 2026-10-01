"use client";

import { useSyncExternalStore } from "react";
import { useState, useMemo } from "react";
import { BookingsList } from "@/components/domain/bookings-list";
import { bookings as demoBookings } from "@/data/bookings";
import { useBookingStore } from "@/lib/booking-store";
import type { BookingFilter } from "@/components/domain/booking-tabs";

export function BookingsListWrapper({
  initialFilter,
}: {
  initialFilter: BookingFilter;
}) {
  // Get bookings from both demo data and persisted store
  const persistedBookings = useSyncExternalStore(
    useBookingStore.subscribe,
    () => useBookingStore.getState().getAllBookings(),
    () => [],
  );

  const [filter, setFilter] = useState<BookingFilter>(initialFilter);

  // Combine demo bookings with persisted bookings
  const allBookings = useMemo(() => {
    const persisted = persistedBookings || [];
    // Create a set of booking references to avoid duplicates
    const persistedRefs = new Set(persisted.map((b) => b.reference));
    const uniqueDemo = demoBookings.filter(
      (b) => !persistedRefs.has(b.reference),
    );
    return [...persisted, ...uniqueDemo];
  }, [persistedBookings]);

  return (
    <BookingsList
      bookings={allBookings}
      initialFilter={filter}
      onFilterChange={setFilter}
    />
  );
}
