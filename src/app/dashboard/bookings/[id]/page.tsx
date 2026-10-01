import { use } from "react";
import { notFound } from "next/navigation";
import { bookings as demoBookings } from "@/data/bookings";
import { experiences } from "@/data/experiences";
import { BookingDetailClient } from "./BookingDetailClient";

export default function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const demoBooking = demoBookings.find((b) => b.id === id);
  const experience = experiences.find(
    (e) => e.id === demoBooking?.experienceId,
  );

  if (!demoBooking) {
    notFound();
  }

  return (
    <BookingDetailClient
      bookingId={id}
      demoBooking={demoBooking}
      demoExperience={experience}
    />
  );
}
