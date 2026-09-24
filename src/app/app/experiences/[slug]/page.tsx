import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { IconButton } from "@/components/ui";
import type { SVGProps } from "react";
import type { Experience } from "@/data/experiences";
import { experiences } from "@/data/experiences";
import { ExperienceGallery } from "./ExperienceGallery";
import { BookingFlow } from "./BookingFlow";

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

function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      width={20}
      height={20}
      fill="currentColor"
      {...props}
    >
      <path d="M512 922.8c-15.4-13.8-594-526.6-594-526.6S74.2 312.2 74.2 182.4 185.6 74.4 300.8 74.4s222.8 101 211.2 225.2C598.4 185.4 646.8 74.4 762.4 74.4s228.8 107.2 228.8 228.8S676.2 385.4 512 922.8z" />
    </svg>
  );
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
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
            <span>{experience.location}</span>
          </div>
        </div>
        <IconButton
          label="افزودن به علاقه‌مندی‌ها"
          icon={<HeartIcon />}
          variant="ghost"
          size="md"
        />
      </div>
    </div>
  );
}

function BookingPanel({ experience }: { experience: Experience }) {
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
          <span className="text-foreground-muted">تاریخ</span>
          <span className="font-medium text-foreground">
            {experience.date || "نامشخص"}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground-muted">ظرفیت</span>
          <span className="font-medium text-foreground">
            {experience.availability || "نامشخص"}
          </span>
        </div>
      </div>

      <BookingFlow experience={experience} />

      <p className="text-center text-xs text-foreground-subtle">
        رزرو آنلاین امن با پشتیبانی ۲۴/۷
      </p>
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

      {experience.reviewSummary && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">نظرات</h2>
          <div className="rounded-xl border border-border bg-surface p-6">
            <div className="flex items-center gap-2 text-warning">
              <StarIcon />
              <span className="font-semibold">{experience.rating}</span>
              <span className="text-sm text-foreground-muted">
                ({experience.reviews} نظر)
              </span>
            </div>
            <blockquote className="mt-4 border-r-2 border-primary pr-4 text-lg italic text-foreground">
              &ldquo;{experience.reviewSummary.text}&rdquo;
            </blockquote>
            <p className="mt-2 text-sm text-foreground-muted">
              — {experience.reviewSummary.author}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const experience = experiences.find((e) => e.slug === slug);

  if (!experience) {
    notFound();
  }

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
