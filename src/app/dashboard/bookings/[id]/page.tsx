import { use } from "react";
import { bookings as demoBookings } from "@/data/bookings";
import { BookingDetailClient } from "./BookingDetailClient";

export default function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const demoBooking = demoBookings.find((b) => b.id === id);

  return <BookingDetailClient bookingId={id} demoBooking={demoBooking} />;
}
