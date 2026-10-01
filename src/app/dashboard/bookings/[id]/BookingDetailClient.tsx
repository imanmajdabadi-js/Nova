"use client";

import { useSyncExternalStore } from "react";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { experiences } from "@/data/experiences";
import { useBookingStore } from "@/lib/booking-store";
import { BookingDetailView } from "@/components/domain/booking-detail-view";
import type { Booking } from "@/data/bookings";
import type { Experience } from "@/data/experiences";
import type { CustomerBooking } from "@/lib/booking-store";

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
  const router = useRouter();

  const isClient = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      window.addEventListener("hydration", callback);
      return () => window.removeEventListener("hydration", callback);
    },
    () => true,
    () => false,
  );

  const isHydrated = useSyncExternalStore(
    useBookingStore.subscribe,
    () => useBookingStore.getState().isHydrated,
    () => false,
  );

  // Resolve booking during render - no useEffect needed
  let resolvedBooking: {
    booking: CustomerBooking | null;
    experience: Experience | null;
  } = {
    booking: null,
    experience: null,
  };

  if (isClient && isHydrated) {
    const persistedBooking = useBookingStore.getState().getBooking(bookingId);
    if (persistedBooking) {
      const experience =
        experiences.find((e) => e.id === persistedBooking.experienceId) || null;
      if (experience) {
        resolvedBooking = { booking: persistedBooking, experience };
      }
    } else if (demoBooking) {
      if (demoExperience) {
        resolvedBooking = { booking: null, experience: demoExperience };
      }
    }
  }

  if (
    !resolvedBooking.booking &&
    !resolvedBooking.experience &&
    isClient &&
    isHydrated
  ) {
    router.push("/dashboard/bookings");
  }

  if (!isClient || !isHydrated) {
    return (
      <Suspense
        fallback={
          <div className="space-y-6">
            <div className="animate-pulse h-8 bg-surface-muted rounded" />
            <div className="animate-pulse h-32 bg-surface-muted rounded" />
          </div>
        }
      >
        <div className="space-y-6">
          <div className="animate-pulse h-8 bg-surface-muted rounded" />
          <div className="animate-pulse h-32 bg-surface-muted rounded" />
        </div>
      </Suspense>
    );
  }

  if (!resolvedBooking.booking || !resolvedBooking.experience) {
    return <Suspense fallback={<div />} />;
  }

  const booking = resolvedBooking.booking as CustomerBooking;
  const experience = resolvedBooking.experience as Experience;

  return <BookingDetailView booking={booking} experience={experience} />;
}
