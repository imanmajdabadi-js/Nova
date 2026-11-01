import { use } from "react";
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
  const demoExperience = demoBooking
    ? experiences.find((e) => e.id === demoBooking.experienceId)
    : undefined;

  return (
    <BookingDetailClient
      bookingId={id}
      demoBooking={demoBooking}
      demoExperience={demoExperience}
    />
  );
}
