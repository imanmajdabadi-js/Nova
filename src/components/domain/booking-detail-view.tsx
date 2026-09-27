import Link from "next/link";
import Image from "next/image";
import { Badge, Card, CardHeader, CardBody, CardFooter } from "@/components/ui";
import { formatPriceFa } from "@/lib";
import { statusBadgeVariant, statusLabels } from "@/data/bookings";
import type { Booking } from "@/data/bookings";
import type { Experience } from "@/data/experiences";
import type { SVGProps, ReactNode } from "react";

function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      fill="currentColor"
      {...props}
    >
      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 17.446l-7.416 3.967 1.48-8.279L3.332 9.306z" />
    </svg>
  );
}

function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between py-2 text-sm">
      <span className="text-foreground-muted">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

function ExperienceSummary({ experience }: { experience: Experience }) {
  const formattedPrice = formatPriceFa(experience.price) + " تومان";

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-foreground">تجربه</h2>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-6">
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg bg-surface-muted sm:w-48">
            <Image
              src={experience.image}
              alt={experience.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-4">
            <Link
              href={`/app/experiences/${experience.slug}`}
              className="text-2xl font-bold text-foreground hover:text-primary"
            >
              {experience.title}
            </Link>
            <div className="flex flex-wrap gap-4 text-sm text-foreground-muted">
              <span className="flex items-center gap-1">
                <StarIcon className="text-warning" />
                <span>{experience.rating}</span>
                <span>({experience.reviews} نظر)</span>
              </span>
              <span className="flex items-center gap-1">
                <span>📍</span>
                <span>{experience.location}</span>
              </span>
            </div>
            <span className="inline-block rounded-md bg-surface-muted px-3 py-1 text-sm text-foreground-muted">
              {experience.category}
            </span>

            {experience.host && (
              <div className="flex items-start gap-3 pt-2">
                {experience.host.avatar && (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-surface-muted">
                    <Image
                      src={experience.host.avatar}
                      alt={experience.host.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-foreground-muted">
                    میزبان
                  </p>
                  <p className="font-medium text-foreground">
                    {experience.host.name}
                  </p>
                  {experience.host.bio && (
                    <p className="mt-1 max-w-md text-sm text-foreground-muted">
                      {experience.host.bio}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="pt-2 text-sm text-foreground-muted">
              <span>قیمت: </span>
              <span className="font-medium text-foreground">
                {formattedPrice}
              </span>
              <span className="mx-1 text-foreground-subtle">/</span>
              <span>برای هر نفر</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function SessionDetails({
  booking,
  experience,
}: {
  booking: Booking;
  experience: Experience;
}) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-foreground">اطلاعات جلسه</h2>
      </CardHeader>
      <CardBody>
        <div className="space-y-1">
          <InfoRow label="تاریخ" value={booking.session.date} />
          <InfoRow label="ساعت" value={booking.session.time} />
          <InfoRow label="تعداد مهمان" value={`${booking.participants} نفر`} />
          <InfoRow label="موقعیت" value={experience.location} />
        </div>
      </CardBody>
    </Card>
  );
}

function BookingSummary({ booking }: { booking: Booking }) {
  const variant = statusBadgeVariant[booking.status];
  const label = statusLabels[booking.status];
  const formattedPrice = formatPriceFa(booking.price) + " تومان";

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-foreground">خلاصه رزرو</h2>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          <InfoRow label="کد رزرو" value={booking.reference} />
          <InfoRow label="تاریخ رزرو" value={booking.createdAt} />
          <InfoRow label="وضعیت" value={label} />
          <InfoRow
            label="مجموع"
            value={
              <span className="font-semibold text-primary">
                {formattedPrice}
              </span>
            }
          />
        </div>
      </CardBody>
      <CardFooter>
        <Badge variant={variant} size="sm">
          {label}
        </Badge>
      </CardFooter>
    </Card>
  );
}

export function BookingDetailView({
  booking,
  experience,
}: {
  booking: Booking;
  experience: Experience;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col gap-6 lg:col-span-2 lg:order-1 lg:mb-2">
        <nav
          aria-label="راهنما"
          className="flex items-center gap-2 text-sm text-foreground-muted"
        >
          <Link href="/dashboard/bookings" className="hover:text-foreground">
            رزروهای من
          </Link>
          <span>/</span>
          <span className="truncate text-foreground">{booking.reference}</span>
        </nav>

        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <Badge variant={statusBadgeVariant[booking.status]} size="md">
            {statusLabels[booking.status]}
          </Badge>
          <span className="text-sm text-foreground-muted">
            کد رزرو:{" "}
            <span className="font-mono font-semibold text-foreground">
              {booking.reference}
            </span>
          </span>
        </div>
      </div>

      <div className="lg:col-span-2 lg:order-2">
        <ExperienceSummary experience={experience} />
      </div>

      <div className="space-y-6 lg:col-span-1 lg:order-3">
        <SessionDetails booking={booking} experience={experience} />
        <BookingSummary booking={booking} />
      </div>

      <div className="flex gap-3 lg:col-span-2 lg:order-4">
        <Link
          href={`/app/experiences/${experience.slug}`}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          مشاهده تجربه
        </Link>
        <Link
          href="/dashboard/bookings"
          className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-interactive"
        >
          بازگشت به رزروها
        </Link>
      </div>
    </div>
  );
}
