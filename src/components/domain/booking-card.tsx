import Link from "next/link";
import Image from "next/image";
import { Badge, StarIcon } from "@/components/ui";
import { cn, formatPrice } from "@/lib";
import type { Booking } from "@/data/bookings";
import type { Experience } from "@/data/experiences";
import type { CustomerBooking } from "@/lib/booking-store";
import { statusBadgeVariant, statusLabels } from "@/data/bookings";

type DisplayBooking = Booking | CustomerBooking;

function getBookingSessionDate(booking: DisplayBooking): string {
  if ("session" in booking) {
    return booking.session.date;
  }
  return booking.date;
}

function getBookingSessionTime(booking: DisplayBooking): string {
  if ("session" in booking) {
    return booking.session.time;
  }
  return booking.time;
}

function getBookingParticipants(booking: DisplayBooking): number {
  if ("participants" in booking) {
    return booking.participants;
  }
  return booking.guestCount;
}

function getBookingPrice(booking: DisplayBooking): number {
  if ("price" in booking) {
    return booking.price;
  }
  return booking.totalPrice;
}

export function BookingCard({
  booking,
  experience,
}: {
  booking: DisplayBooking;
  experience: Experience;
}) {
  const sessionDate = getBookingSessionDate(booking);
  const sessionTime = getBookingSessionTime(booking);
  const participants = getBookingParticipants(booking);
  const price = getBookingPrice(booking);
  const { reference, status } = booking;
  const formattedPrice = formatPrice(price);
  const variant = statusBadgeVariant[status];
  const statusLabel = statusLabels[status];

  return (
    <article
      className={cn(
        "flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-border bg-surface p-4 sm:p-6 shadow-subtle",
        status === "canceled" && "opacity-75",
      )}
    >
      <div className="relative aspect-[4/3] w-full sm:w-24 sm:aspect-square shrink-0 overflow-hidden rounded-lg bg-surface-muted">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">
            {experience.title}
          </h3>
          <Badge variant={variant} size="sm">
            {statusLabel}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground-muted">
          {experience.host && (
            <span className="flex items-center gap-1">
              <span>میزبان:</span>
              <span>{experience.host.name}</span>
            </span>
          )}
          <span className="flex items-center gap-1">
            <span>📍</span>
            <span>{experience.location}</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="flex items-center gap-1 text-foreground-muted">
            <span>📅</span>
            <span>{sessionDate}</span>
          </span>
          <span className="flex items-center gap-1 text-foreground-muted">
            <span>⏰</span>
            <span>{sessionTime}</span>
          </span>
          <span className="flex items-center gap-1 text-foreground-muted">
            <span>👥</span>
            <span>{participants} نفر</span>
          </span>
          <div className="flex items-center gap-1">
            <StarIcon className="text-warning" />
            <span className="text-foreground">{experience.rating}</span>
            <span className="text-foreground-muted">
              ({experience.reviews} نظر)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <span className="text-sm text-foreground-muted">
            کد رزرو:{" "}
            <span className="font-mono font-semibold text-foreground">
              {reference}
            </span>
          </span>
          <span className="font-semibold text-foreground">
            {formattedPrice}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-2">
        <Link
          href={`/dashboard/bookings/${booking.id}`}
          className="text-center text-sm font-medium text-primary hover:underline"
        >
          جزئیات رزرو
        </Link>
      </div>
    </article>
  );
}
