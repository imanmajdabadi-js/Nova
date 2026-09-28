"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/lib/booking-store";
import { useCanonicalExperienceById } from "@/lib/canonical-experiences";
import { BookingDetailView } from "@/components/domain/booking-detail-view";
import type { Booking } from "@/data/bookings";
import type { CustomerBooking } from "@/lib/booking-store";

interface BookingDetailClientProps {
  bookingId: string;
  demoBooking: Booking | undefined;
}

export function BookingDetailClient({
  bookingId,
  demoBooking,
}: BookingDetailClientProps) {
  const router = useRouter();
  const isHydrated = useBookingStore((state) => state.isHydrated);
  const persistedBooking = useBookingStore((state) =>
    state.getBooking(bookingId),
  );
  const booking = persistedBooking ?? demoBooking;

  const experienceId = booking?.experienceId ?? "";
  const { experience } = useCanonicalExperienceById(experienceId);

  useEffect(() => {
    if (isHydrated && !booking) {
      router.replace("/dashboard/bookings");
    }
  }, [isHydrated, booking, router]);

  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse h-8 bg-surface-muted rounded" />
        <div className="animate-pulse h-32 bg-surface-muted rounded" />
      </div>
    );
  }

  if (!booking) {
    return null;
  }

  if (!experience) {
    return (
      <div className="text-center py-12 text-foreground-muted">
        <p className="text-lg">تجربه مرتبط یافت نشد.</p>
      </div>
    );
  }

  return (
    <BookingDetailView
      booking={booking as Booking | CustomerBooking}
      experience={experience}
    />
  );
}
