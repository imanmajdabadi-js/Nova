"use client";

import { notFound } from "next/navigation";
import { experiences } from "@/data/experiences";
import { useBookingStore } from "@/lib/booking-store";
import { BookingDetailView } from "@/components/domain/booking-detail-view";
import type { Booking } from "@/data/bookings";
import type { Experience } from "@/data/experiences";

interface BookingDetailClientProps {
  bookingId: string;
  demoBooking: Booking | undefined;
  demoExperience: Experience | undefined;
}

export function BookingDetailClient({
  bookingId,
  demoBooking,
  demoExperience,
}: BookingDetailClientProps) {
  const isHydrated = useBookingStore((state) => state.isHydrated);

  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse h-8 bg-surface-muted rounded" />
        <div className="animate-pulse h-32 bg-surface-muted rounded" />
      </div>
    );
  }

  const persistedBooking = useBookingStore.getState().getBooking(bookingId);
  const booking = persistedBooking ?? demoBooking;
  const experience =
    (persistedBooking
      ? experiences.find((e) => e.id === persistedBooking.experienceId)
      : demoExperience) ?? null;

  if (!booking || !experience) {
    notFound();
  }

  return <BookingDetailView booking={booking} experience={experience} />;
}
