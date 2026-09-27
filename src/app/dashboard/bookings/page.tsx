import { use } from "react";
import { Suspense } from "react";
import { BookingsListWrapper } from "./BookingsListWrapper";
import { statusOrder } from "@/data/bookings";
import type { BookingFilter } from "@/components/domain/booking-tabs";

const pageDescription =
  "همه‌ی رزروهای شما در یکجا. وضعیت رزروها، تاریخ‌ها و جزئیات را مدیریت کنید.";

const validFilters: readonly string[] = ["all", ...statusOrder];

export default function DashboardBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const filterParam = use(searchParams).filter;
  const initialFilter: BookingFilter =
    filterParam && validFilters.includes(filterParam)
      ? (filterParam as BookingFilter)
      : "all";

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            رزروهای من
          </h1>
          <p className="mt-2 text-sm text-foreground-muted">
            {pageDescription}
          </p>
        </header>

        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="animate-pulse h-24 bg-surface-muted rounded" />
              <div className="animate-pulse h-24 bg-surface-muted rounded" />
              <div className="animate-pulse h-24 bg-surface-muted rounded" />
            </div>
          }
        >
          <BookingsListWrapper initialFilter={initialFilter} />
        </Suspense>
      </div>
    </div>
  );
}
