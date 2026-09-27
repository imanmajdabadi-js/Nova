import { use } from "react";
import { notFound } from "next/navigation";
import { bookings } from "@/data/bookings";
import { experiences } from "@/data/experiences";
import { BookingDetailView } from "@/components/domain/booking-detail-view";

export default function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const booking = bookings.find((b) => b.id === id);
  const experience = experiences.find((e) => e.id === booking?.experienceId);

  if (!booking || !experience) {
    notFound();
  }

  return <BookingDetailView booking={booking} experience={experience} />;
}
