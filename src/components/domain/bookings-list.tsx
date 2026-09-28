"use client";

import { useState } from "react";
import {
  BookingTabs,
  type BookingFilter,
} from "@/components/domain/booking-tabs";
import { BookingCard } from "@/components/domain/booking-card";
import { useCanonicalExperiences } from "@/lib/canonical-experiences";
import { statusOrder } from "@/data/bookings";
import type { Booking } from "@/data/bookings";
import type { CustomerBooking } from "@/lib/booking-store";

type DisplayBooking = Booking | CustomerBooking;

function filterBookings(
  bookings: readonly DisplayBooking[],
  filter: BookingFilter,
): DisplayBooking[] {
  if (filter === "all") {
    return [...bookings].sort((a, b) => {
      const aIdx = statusOrder.indexOf(a.status);
      const bIdx = statusOrder.indexOf(b.status);
      return aIdx - bIdx;
    });
  }
  return [...bookings].filter((b) => b.status === filter);
}

export function BookingsList({
  bookings,
  initialFilter,
  onFilterChange,
}: {
  bookings: readonly DisplayBooking[];
  initialFilter: BookingFilter;
  onFilterChange?: (filter: BookingFilter) => void;
}) {
  const [filter, setFilter] = useState<BookingFilter>(initialFilter);
  const { experiences: canonicalExperiences } = useCanonicalExperiences();
  const filtered = filterBookings(bookings, filter);

  const handleFilterChange = (next: BookingFilter) => {
    setFilter(next);
    onFilterChange?.(next);
  };

  return (
    <section>
      <BookingTabs active={filter} onChange={handleFilterChange} />

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-foreground-muted">
          <p className="text-lg">رزروی یافت نشد.</p>
          <p className="mt-2 text-sm">
            فیلتر خود را تغییر دهید یا دوباره امتحان کنید.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((booking) => {
            const experience = canonicalExperiences.find(
              (e) => e.id === booking.experienceId,
            );
            if (!experience) return null;
            return (
              <BookingCard
                key={booking.id}
                booking={booking}
                experience={experience}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
