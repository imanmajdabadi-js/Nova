"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge, StarIcon } from "@/components/ui";
import { WishlistToggle } from "@/components/domain/wishlist-toggle";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useCanonicalExperienceById } from "@/lib/canonical-experiences";
import { formatPrice, cn } from "@/lib";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft">
        <svg
          className="h-10 w-10 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-3">
        تجربه‌ای ذخیره نشده
      </h2>
      <p className="text-foreground-muted max-w-sm mb-8 leading-relaxed">
        چیزهایی که هنوز برایشان آماده نیستی،
        <br />
        اما دلت نمی‌خواهد از دستشان بدهی.
      </p>
      <Link
        href="/app/discover"
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        کشف تجربه‌ها
      </Link>
    </div>
  );
}

function SavedExperienceCard({
  experienceId,
  index,
}: {
  experienceId: string;
  index: number;
}) {
  const { experience, isHydrated } = useCanonicalExperienceById(experienceId);

  if (!isHydrated) {
    return (
      <div className="aspect-[4/3] rounded-2xl bg-surface-muted animate-pulse" />
    );
  }

  if (!experience) {
    return null;
  }

  const formattedPrice = formatPrice(experience.price);

  const isFeatured = index === 0;

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300",
        "hover:shadow-elevated hover:-translate-y-1",
        isFeatured ? "lg:col-span-2 lg:row-span-2" : "lg:col-span-1",
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={
            isFeatured
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          priority={isFeatured}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="rounded-md bg-surface/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            {experience.category}
          </span>
          <WishlistToggle
            experienceId={experience.id}
            size="sm"
            showLabel={false}
          />
        </div>
      </div>
      <div className="p-5 space-y-3">
        <Link
          href={`/app/experiences/${experience.slug}`}
          className="block group"
        >
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {experience.title}
          </h3>
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-sm text-foreground-muted">
          <span className="flex items-center gap-1">
            <StarIcon />
            <span>{experience.rating}</span>
            <span>({experience.reviews} نظر)</span>
          </span>
          <span className="flex items-center gap-1">
            <span>📍</span>
            <span className="truncate max-w-[120px]">
              {experience.location}
            </span>
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="font-semibold text-foreground">
            {formattedPrice}
          </span>
          <span className="inline-block rounded-md bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-primary">
            {experience.availability}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function WishlistPage() {
  const { savedExperienceIds, isHydrated } = useWishlistStore();

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pb-12">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <header className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              تجربه‌های ذخیره‌شده
            </h1>
            <p className="mt-2 text-sm text-foreground-muted">
              چیزهایی که هنوز برایشان آماده نیستی، اما دلت نمی‌خواهد از دستشان
              بدهی.
            </p>
          </header>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-2xl bg-surface-muted animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <header className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                تجربه‌های ذخیره‌شده
              </h1>
              <p className="mt-2 text-sm text-foreground-muted">
                چیزهایی که هنوز برایشان آماده نیستی، اما دلت نمی‌خواهد از دستشان
                بدهی.
              </p>
            </div>
            <Badge variant="primary" size="sm">
              {savedExperienceIds.length} تجربه ذخیره‌شده
            </Badge>
          </div>
        </header>

        {savedExperienceIds.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{
              gridAutoFlow: "dense",
            }}
          >
            {savedExperienceIds.map((experienceId, index) => (
              <SavedExperienceCard
                key={experienceId}
                experienceId={experienceId}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
