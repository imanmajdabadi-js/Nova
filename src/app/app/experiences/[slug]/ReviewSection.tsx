import { StarIcon } from "@/components/ui";
import type { Experience } from "@/data/experiences";
import type { ExperienceReview } from "@/data/reviews";
import { getReviewsForExperience, selectReviewsToShow } from "@/data/reviews";

const STAR_LABELS_FA = ["۱", "۲", "۳", "۴", "۵"];

function VerifiedBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-xs font-medium text-success"
      aria-label="رزرو تأیید شده"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
      <span>رزرو شده</span>
    </span>
  );
}

function RatingRow({
  stars,
  count,
  maxCount,
}: {
  stars: number;
  count: number;
  maxCount: number;
}) {
  const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;
  const label = STAR_LABELS_FA[stars - 1] ?? `${stars}`;

  return (
    <div className="grid grid-cols-10 items-center gap-2 text-sm">
      <span className="col-span-1 flex items-center justify-end gap-0.5 text-foreground-muted">
        <span aria-hidden="true">{label}</span>
        <StarIcon className="h-3 w-3 text-warning" />
      </span>
      <div className="col-span-8 h-2 max-w-[280px] overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full bg-warning/20 transition-all"
          style={{ width: `${barWidth}%` }}
          aria-hidden="true"
        />
      </div>
      <span className="col-span-1 text-right text-xs text-foreground-subtle tabular-nums">
        {count}
      </span>
    </div>
  );
}

function RatingDistribution({
  distribution,
}: {
  distribution: readonly { stars: number; count: number }[];
}) {
  const maxCount = Math.max(...distribution.map((d) => d.count));

  return (
    <div className="space-y-1.5">
      {distribution.map((d) => (
        <RatingRow
          key={d.stars}
          stars={d.stars}
          count={d.count}
          maxCount={maxCount}
        />
      ))}
    </div>
  );
}

function ReviewItem({ review }: { review: ExperienceReview }) {
  const label = STAR_LABELS_FA[review.rating - 1] ?? `${review.rating}`;

  return (
    <div className="border-t border-divider px-0 py-5 first:border-0 first:pt-0">
      <header className="mb-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">
            {review.customerName}
          </span>
          {review.verifiedBooking && <VerifiedBadge />}
        </div>
        <div
          className="flex items-center gap-1 text-sm"
          aria-label={`امتیاز ${label} از ۵`}
        >
          <span className="tabular-nums text-foreground-muted">{label}</span>
          <StarIcon className="h-4 w-4 text-warning" />
        </div>
      </header>
      <h4 className="mb-1.5 text-sm font-semibold text-foreground leading-snug">
        {review.title}
      </h4>
      <p className="text-body-sm text-foreground-muted leading-relaxed">
        {review.comment}
      </p>
      <time
        dateTime={review.createdAt}
        className="mt-3 block text-xs text-foreground-subtle"
      >
        {review.createdAt}
      </time>
    </div>
  );
}

function ReviewList({ reviews }: { reviews: ExperienceReview[] }) {
  return (
    <div className="divide-y divide-divider">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
}

function ReviewEmpty() {
  return (
    <div className="py-12 text-center">
      <StarIcon
        className="mx-auto mb-4 h-6 w-6 text-foreground-muted/30"
        aria-hidden="true"
      />
      <p className="text-lg text-foreground-muted">هنوز نظری ثبت نشده</p>
      <p className="mt-1 text-sm text-foreground-subtle">
        اولین کسی باشید که این تجربه را ارزیابی می‌کند.
      </p>
    </div>
  );
}

export function ReviewSection({ experience }: { experience: Experience }) {
  const allReviews = getReviewsForExperience(experience.id);
  const visibleReviews = selectReviewsToShow(allReviews, 5);
  const hasReviews = allReviews.length > 0;
  const hasAggregate = experience.reviews > 0 && experience.rating > 0;
  const distribution = experience.ratingDistribution ?? [];

  return (
    <section className="space-y-6">
      <header className="flex items-baseline justify-between gap-4">
        <h2 className="text-h3 font-semibold text-foreground">نظرات</h2>
        {hasAggregate && (
          <div
            className="flex items-center gap-3"
            aria-label={`امتیاز ${experience.rating} از ۵ — بر اساس ${experience.reviews} نظر`}
          >
            <span className="text-2xl font-bold tabular-nums text-foreground">
              {experience.rating}
            </span>
            <StarIcon className="h-6 w-6 text-warning" />
            <span className="text-sm text-foreground-muted">از ۵</span>
            <span className="text-sm text-foreground-subtle">
              — بر اساس {experience.reviews} نظر
            </span>
          </div>
        )}
      </header>

      {hasAggregate && distribution.length > 0 && (
        <RatingDistribution distribution={distribution} />
      )}

      {hasReviews ? <ReviewList reviews={visibleReviews} /> : <ReviewEmpty />}

      {experience.reviewSummary && (
        <blockquote className="border-r-2 border-primary pr-4 text-lg italic text-foreground">
          &ldquo;{experience.reviewSummary.text}&rdquo;
          <p className="mt-1 text-sm text-foreground-muted">
            — {experience.reviewSummary.author}
          </p>
        </blockquote>
      )}
    </section>
  );
}
