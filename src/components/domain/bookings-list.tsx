"use client";

import { useState } from "react";
import {
  BookingTabs,
  type BookingFilter,
} from "@/components/domain/booking-tabs";
import { BookingCard } from "@/components/domain/booking-card";
import { experiences } from "@/data/experiences";
import { statusOrder } from "@/data/bookings";
import type { Booking } from "@/data/bookings";
import type { Experience } from "@/data/experiences";

function filterBookings(
  bookings: readonly Booking[],
  filter: BookingFilter,
): Booking[] {
  if (filter === "all") {
    return [...bookings].sort((a, b) => {
      const aIdx = statusOrder.indexOf(a.status);
      const bIdx = statusOrder.indexOf(b.status);
      return aIdx - bIdx;
    });
  }
  return [...bookings].filter((b) => b.status === filter);
}

function findExperience(id: string): Experience | undefined {
  return experiences.find((e) => e.id === id);
}

export function BookingsList({
  bookings,
  initialFilter,
}: {
  bookings: readonly Booking[];
  initialFilter: BookingFilter;
}) {
  const [filter, setFilter] = useState<BookingFilter>(initialFilter);
  const filtered = filterBookings(bookings, filter);

  return (
    <section>
      <BookingTabs active={filter} onChange={setFilter} />

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
            const experience = findExperience(booking.experienceId);
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
