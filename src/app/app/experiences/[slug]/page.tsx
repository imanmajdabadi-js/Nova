"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { WishlistToggle } from "@/components/domain/wishlist-toggle";
import { StarIcon } from "@/components/ui";
import type { SVGProps } from "react";
import type { Experience, ExperienceSession } from "@/data/experiences";
import { findExperienceBySlug } from "@/data/experiences";
import { useCanonicalExperienceBySlug } from "@/lib/canonical-experiences";
import { statusLabels } from "@/data/experience-lifecycle";
import { ExperienceGallery } from "./ExperienceGallery";
import { BookingFlow } from "./BookingFlow";
import { ReviewSection } from "./ReviewSection";
import { formatPrice } from "@/lib";

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ExperienceHeader({ experience }: { experience: Experience }) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <span className="inline-block rounded-md bg-primary-soft px-3 py-1 text-sm font-medium text-primary">
            {experience.category}
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {experience.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
            <span className="flex items-center gap-1">
              <StarIcon className="text-warning" />
              <span>{experience.rating}</span>
              <span>({experience.reviews} نظر)</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <span>📍</span>
              <span>{experience.location}</span>
            </span>
          </div>
        </div>
        <WishlistToggle
          experienceId={experience.id}
          size="md"
          showLabel={true}
        />
      </div>
    </div>
  );
}

function SessionInfo({
  session,
  isAvailable,
}: {
  session: ExperienceSession;
  isAvailable: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border p-4 transition-colors ${isAvailable ? "border-border bg-surface hover:border-border-strong hover:bg-surface-interactive" : "border-border/50 bg-surface/50 opacity-60"}`}
    >
      <div className="flex flex-col items-center gap-1 shrink-0 w-16 rounded-lg bg-primary-soft p-3 text-primary text-center">
        <CalendarIcon className="w-5 h-5" />
        <span className="text-xs font-medium">{session.date}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-sm">
          <ClockIcon className="w-4 h-4 text-foreground-muted shrink-0" />
          <span className="font-medium text-foreground truncate">
            {session.time}
          </span>
          {isAvailable ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-xs font-medium text-success">
              <UsersIcon className="w-3 h-3" />
              {session.remainingCapacity} جای خالی
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-error-soft px-2 py-0.5 text-xs font-medium text-error">
              تکمیل شده
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function SessionsSection({ experience }: { experience: Experience }) {
  if (!experience.sessions || experience.sessions.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">جلسات موجود</h2>
        <div className="rounded-xl border border-border bg-surface p-6 text-center text-foreground-muted">
          <CalendarIcon className="mx-auto w-12 h-12 text-foreground-muted/30 mb-3" />
          <p className="text-lg">
            هیچ جلسه‌ای برای این تجربه برنامه‌ریزی نشده است.
          </p>
          <p className="mt-1 text-sm">به‌روزرسانی‌ها را پیگیری کنید.</p>
        </div>
      </section>
    );
  }

  const sessionsByDate = experience.sessions.reduce(
    (acc, session) => {
      if (!acc[session.date]) {
        acc[session.date] = [];
      }
      acc[session.date].push(session);
      return acc;
    },
    {} as Record<string, ExperienceSession[]>,
  );

  const sortedDates = Object.keys(sessionsByDate).sort();

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">جلسات موجود</h2>
      <p className="text-sm text-foreground-muted">
        تاریخ و ساعت را انتخاب کنید و سپس در پنل رزرو ثبت‌نام کنید.
      </p>
      <div className="space-y-6">
        {sortedDates.map((date) => (
          <div key={date} className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-foreground-muted">
              <CalendarIcon className="w-4 h-4 shrink-0" />
              <span className="font-medium text-foreground">{date}</span>
              <span className="text-foreground-muted">
                ({sessionsByDate[date].length} جلسه)
              </span>
            </div>
            <div className="space-y-2">
              {sessionsByDate[date].map((session) => (
                <SessionInfo
                  key={session.id}
                  session={session}
                  isAvailable={session.remainingCapacity > 0}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BookingPanel({ experience }: { experience: Experience }) {
  const hasAvailableSessions =
    experience.sessions?.some((s) => s.remainingCapacity > 0) ?? false;

  return (
    <div className="sticky top-20 space-y-4 rounded-xl border border-border bg-surface p-6 shadow-subtle">
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">
            {formatPrice(experience.price)}
          </span>
        </div>
        <p className="text-sm text-foreground-muted">برای هر نفر</p>
      </div>

      <div className="space-y-3 border-t border-border pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground-muted">تاریخ تجربه</span>
          <span className="font-medium text-foreground">
            {experience.date || "متغیر (بیشتر در جلسات)"}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground-muted">ظرفیت کل</span>
          <span className="font-medium text-foreground">
            {experience.availability || "متغیر"}
          </span>
        </div>
      </div>

      {hasAvailableSessions ? (
        <>
          <div className="border-t border-border pt-4">
            <p className="text-sm text-foreground-muted mb-3">
              جلسه را در پایین انتخاب کرده و اینجا رزرو کنید.
            </p>
            <BookingFlow experience={experience} />
          </div>
          <p className="text-center text-xs text-foreground-subtle">
            رزرو آنلاین امن با پشتیبانی ۲۴/۷
          </p>
        </>
      ) : (
        <div className="border-t border-border pt-4 text-center">
          <p className="text-sm text-foreground-muted mb-3">
            در حال حاضر جلسه‌ای با جای خالی وجود ندارد.
          </p>
          <p className="text-xs text-foreground-subtle">
            لطفاً بعداً مراجعه کنید.
          </p>
        </div>
      )}
    </div>
  );
}

function ExperienceContent({ experience }: { experience: Experience }) {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">درباره تجربه</h2>
        <p className="text-body text-foreground leading-relaxed">
          {experience.description}
        </p>
      </section>

      {experience.highlights && experience.highlights.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            چه چیزی در انتظار شماست
          </h2>
          <ul className="space-y-2">
            {experience.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 text-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <SessionsSection experience={experience} />

      {experience.host && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">میزبان</h2>
          <div className="flex items-start gap-4 rounded-xl border border-border bg-surface p-4">
            {experience.host.avatar && (
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-surface-muted">
                <Image
                  src={experience.host.avatar}
                  alt={experience.host.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">
                {experience.host.name}
              </h3>
              {experience.host.bio && (
                <p className="text-sm text-foreground-muted">
                  {experience.host.bio}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">موقعیت</h2>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-foreground">{experience.location}</p>
        </div>
      </section>

      <ReviewSection experience={experience} />
    </div>
  );
}

function NotAvailableMessage({ experience }: { experience: Experience }) {
  const statusLabel = statusLabels[experience.status];
  const router = useRouter();

  useEffect(() => {
    if (experience.status === "draft") {
      router.replace("/app/discover");
    }
  }, [experience.status, router]);

  if (experience.status === "draft") {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-border bg-surface p-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              تجربه یافت نشد
            </h1>
            <p className="text-foreground-muted mb-6">
              این تجربه در دسترس عموم مشتریان نیست.
            </p>
            <Link
              href="/app/discover"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              بازگشت به کشف تجربه‌ها
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-foreground-muted">
          <Link href="/app/discover" className="hover:text-foreground">
            کشف تجربه‌ها
          </Link>
          <span>/</span>
          <span className="truncate text-foreground">
            {experience.title || "تجربه بدون عنوان"}
          </span>
        </nav>
        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-info-soft p-4 text-info">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {experience.title}
          </h1>
          <p className="text-foreground-muted mb-2">
            این تجربه در حال حاضر در دسترس نیست.
          </p>
          <p className="text-sm text-foreground-muted">وضعیت: {statusLabel}</p>
          <Link
            href="/app/discover"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover mt-6"
          >
            بازگشت به کشف تجربه‌ها
          </Link>
        </div>
      </div>
    </div>
  );
}

function ExperienceDetailContent({ experience }: { experience: Experience }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-foreground-muted">
          <Link href="/app/discover" className="hover:text-foreground">
            کشف تجربه‌ها
          </Link>
          <span>/</span>
          <span className="text-foreground">{experience.category}</span>
          <span>/</span>
          <span className="truncate text-foreground">{experience.title}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 space-y-6">
            <ExperienceGallery
              images={experience.images ?? [experience.image]}
              title={experience.title}
            />
            <ExperienceHeader experience={experience} />
            <ExperienceContent experience={experience} />
          </div>

          <div className="mt-8 lg:col-span-5 lg:mt-0">
            <BookingPanel experience={experience} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceDetailPage() {
  const router = useRouter();
  const params = useParams() as { slug?: string };
  const slug = params?.slug ?? "";
  const { experience: canonicalExperience, isHydrated } =
    useCanonicalExperienceBySlug(slug);

  const resolvedExperience = isHydrated
    ? canonicalExperience
    : (canonicalExperience ?? findExperienceBySlug(slug));

  useEffect(() => {
    if (!resolvedExperience) {
      router.replace("/app/discover");
    }
  }, [resolvedExperience, router]);

  if (!resolvedExperience) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-foreground-muted">تجربه یافت نشد.</p>
          </div>
        </div>
      </div>
    );
  }

  if (resolvedExperience.status !== "published") {
    return <NotAvailableMessage experience={resolvedExperience} />;
  }

  return <ExperienceDetailContent experience={resolvedExperience} />;
}
