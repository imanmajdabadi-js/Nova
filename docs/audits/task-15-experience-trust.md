# Task 15 — Experience Trust & Decision Intelligence

## Product Problem

The Experience Detail page previously showed only a single editorial `reviewSummary`
quote alongside an aggregate rating (e.g., "4.7 (89 نظر)"). Users arriving at
the page had no way to:

1. **Read actual participant feedback** — only one curated quote was shown,
   giving no sense of what previous attendees actually experienced.
2. **Verify that the rating is meaningful** — no distribution was available, so
   a user could not tell whether 4.7 was the result of overwhelmingly 5-star
   reviews or a cluster of low ratings pulling the average down.
3. **Distinguish verified bookings** — all social proof was anonymous and
   unverifiable, making the rating feel abstract rather than grounded in real
   reservations.

The Experience Detail needed to evolve from a brochure page into a **trust +
decision surface** that helps users answer: "Is this actually right for me, and
can I trust enough to book it?"

## Existing State

### Data Model (`src/data/experiences.ts`)

The `Experience` type already contained:

- `rating` (number, e.g. 4.7) — aggregate average
- `reviews` (number, e.g. 89) — total review count
- `reviewSummary` (optional `{ text, author }`) — a single editorial quote
- `sessions`, `host`, `location`, `highlights`, `description`, `price`

### Review Infrastructure

There was **no individual review data model**. No `Review` type, no review
records, no `src/data/reviews.ts` file. The only review-related data was
`reviewSummary` and the aggregate `rating`/`reviews` fields.

### Experience Detail Page (`src/app/app/experiences/[slug]/page.tsx`)

The page was a Server Component (no `"use client"`). Its structure was:

```
ExperienceDetailPage (SSR)
├── ExperienceGallery (Client — image carousel)
├── ExperienceHeader (title, category, location, rating, wishlist toggle)
├── ExperienceContent
│   ├── Description
│   ├── Highlights
│   ├── SessionsSection
│   ├── Host section
│   ├── Location section
│   └── reviewSummary (single blockquote — the ONLY review content)
└── BookingPanel (sticky, Client BookingFlow)
```

The review section was a single blockquote under a "نظرات" heading. No
distribution, no individual reviews, no verified indicators, no empty state
for experiences without reviews.

## Architecture Decision

### Review Data Model

Added `ExperienceReview` type and mock data to `src/data/reviews.ts`:

```ts
type ExperienceReview = {
  readonly id: string;
  readonly experienceId: string;
  readonly customerName: string;
  readonly rating: number; // 1–5
  readonly title: string;
  readonly comment: string;
  readonly createdAt: string; // Persian date
  readonly verifiedBooking: boolean;
};
```

This follows the domain model described in `docs/domain.md` (Review entity)
but is simplified for the frontend prototype. No `booking` reference, `host`
reference, or other domain-only fields are included.

### Canonical Rating Source

The canonical source of aggregate rating data is **the `Experience` type itself**:

```
Experience.rating         → average rating (canonical)
Experience.reviews        → total review count (canonical)
Experience.ratingDistribution → distribution breakdown (new, canonical metadata)
```

Individual reviews in `src/data/reviews.ts` are **a sample**, not the complete
dataset. They are linked to experiences via `experienceId` — no Experience
objects are duplicated inside reviews.

### Rating Distribution

Added an optional `ratingDistribution` field to the `Experience` type:

```ts
readonly ratingDistribution?: readonly {
  readonly stars: number;   // 1–5
  readonly count: number;
}[];
```

This is aggregate metadata — not computed from the sample reviews. This avoids
the contradiction where `Experience.rating = 4.8` and only 5 sample reviews are
displayed, which could make users think the 4.8 comes from those 5 reviews.

### Data Relationship

```
Experience
   │
   ├── rating / reviews / ratingDistribution / reviewSummary  (aggregate metadata)
   │
   └── id
            │
            ↓
         Reviews[] (in src/data/reviews.ts)
         — linked by experienceId
         — displayed as a SELECTED SAMPLE (max 5)
```

### Server / Client Boundary

The `ReviewSection` component is a **Server Component** (no `"use client"`).
All review data is loaded from static files on the server. The individual star
icons and verified checkmark use **inline SVGs**, not Ant Design icons, to
avoid requiring a Client Component boundary.

The only Client Components on the Experience Detail page remain:

- `ExperienceGallery` (image carousel interaction)
- `BookingFlow` (booking state management)
- `WishlistToggle` (persisted state via Zustand)

## UX Decision

### Information Hierarchy

The review section follows a progressive trust model:

```
1. Aggregate rating + total review count   (establishes credibility)
2. Rating distribution                     (shows the shape of the data)
3. Selected individual reviews             (provides qualitative evidence)
4. Editorial summary quote                 (curated perspective)
```

### Review Presentation

- Reviews are displayed as a simple list with top borders (not cards), creating
  editorial rhythm through whitespace and typography rather than visual boxes.
- Each review shows: reviewer name, verified badge (when applicable), star
  rating (numeric + icon), title, comment, and date.
- Verified reviews are sorted first, then by recency (deterministic, not
  algorithmic).

### Selection Logic

`selectReviewsToShow()` applies a simple deterministic sort:

1. Verified bookings first (they carry more weight)
2. Most recent first within each group

A maximum of 5 reviews are displayed. No scoring algorithm or ML ranking.

### Mobile Behavior

- The rating header wraps to two lines on narrow screens
- Distribution bars use `max-w-[280px]` to prevent overflow on small viewports
- Review content uses `text-body-sm` for readability on small screens
- The sticky booking panel (existing) remains sticky on desktop but static on mobile

### Trust Model

**What the UI claims:**

- The aggregate rating (e.g., 4.7) is based on 89 total reviews — sourced from
  `Experience.rating` and `Experience.reviews`.
- The rating distribution shows how those 89 reviews break down across
  star levels — sourced from `Experience.ratingDistribution`.
- Individual reviews shown are a **selected sample** of the total — the UI
  never implies these are the only reviews.
- Verified reviews have a "رزرو شده" badge, indicating the reviewer has a
  confirmed booking record in the prototype data.

**What the UI does NOT claim:**

- No fake metrics (no "10,000+ customers", "98% satisfaction", etc.)
- No fake scarcity ("only 2 spots left")
- The displayed 5 reviews are never implied to be the source of the aggregate
  rating
- No "most popular experience" claims

## Changes

### Files Created

| File                                               | Purpose                                                                                                                             |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `src/data/reviews.ts`                              | `ExperienceReview` type, 40 mock review records (5 per experience), `getReviewsForExperience()` and `selectReviewsToShow()` helpers |
| `src/app/app/experiences/[slug]/ReviewSection.tsx` | Server Component with `RatingSummary`, `RatingDistribution`, `ReviewItem`, `ReviewList`, `ReviewEmpty`, `VerifiedBadge`             |

### Files Modified

| File                                      | Change                                                                                                                |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `src/data/experiences.ts`                 | Added `ratingDistribution` field to `Experience` type; populated distribution data for all 8 experiences              |
| `src/app/app/experiences/[slug]/page.tsx` | Imported `ReviewSection`; replaced inline `reviewSummary` blockquote with `<ReviewSection experience={experience} />` |

### Files NOT Changed (Preserved)

| File                                            | Reason                                                           |
| ----------------------------------------------- | ---------------------------------------------------------------- |
| `src/components/domain/booking-card.tsx`        | No changes needed — already uses shared `StarIcon`/`formatPrice` |
| `src/components/domain/booking-detail-view.tsx` | No changes needed                                                |
| `src/app/dashboard/bookings/*`                  | No changes — booking architecture preserved                      |
| `src/app/dashboard/wishlist/*`                  | No changes — wishlist architecture preserved                     |
| `src/components/domain/wishlist-toggle.tsx`     | No changes — Zustand state unchanged                             |
| `src/lib/booking-store.ts`                      | No changes — booking persistence intact                          |

## Deferred Features

Explicitly NOT implemented:

- **Review submission** — No form, dialog, or mutation to create reviews
- **Authentication** — No login or user identity system
- **Review editing/deletion** — No management UI
- **Backend persistence** — No API routes, databases, or server mutations
- **Real verification** — The `verifiedBooking` flag is set in mock data based
  on prototype assumptions. In production, this would come from booking records.
- **Review pagination or "show more"** — Only 5 selected reviews shown; no
  infinite scroll or pagination UI

## QA

### Browser QA

Verified via Next.js dev server (`http://localhost:3000`):

#### Experience Detail — `/app/experiences/isfahan-hidden-city-tour`

| Check               | Result                                                    |
| ------------------- | --------------------------------------------------------- |
| Page renders        | ✅ SSR complete, no errors                                |
| Rating summary      | ✅ "4.7 از ۵ — بر اساس 89 نظر"                            |
| Rating distribution | ✅ 5 bars (72, 10, 5, 1, 1) with percentage widths        |
| Individual reviews  | ✅ 5 reviews shown, sorted verified-first then by recency |
| Verified badge      | ✅ "رزرو شده" with checkmark icon on verified reviews     |
| Unverified review   | ✅ No badge (سامیار ل.)                                   |
| Editorial quote     | ✅ Blockquote with "تور فوق‌العاده بود..." — مریم ک.      |
| Booking panel       | ✅ Sticky, price "۸۵۰٬۰۰۰ تومان / برای هر نفر"            |
| Wishlist toggle     | ✅ Heart icon present                                     |
| Sessions section    | ✅ 4 sessions shown, grouped by date                      |

#### Experience Detail — `/app/experiences/persian-cooking-class`

| Check               | Result                                 |
| ------------------- | -------------------------------------- |
| Page renders        | ✅ SSR complete                        |
| Rating summary      | ✅ "4.9 از ۵ — بر اساس 128 نظر"        |
| Rating distribution | ✅ 5 bars (118, 8, 1, 1, 0)            |
| Reviews             | ✅ 5 reviews, 4 verified, 1 unverified |
| Editorial quote     | ✅ "بیشترین تجربه‌ی خوبی..." — علی ر.  |
| Booking panel       | ✅ "۲٬۵۰۰٬۰۰۰ تومان / برای هر نفر"     |

#### Invalid slug — `/app/experiences/nonexistent-experience`

| Check    | Result |
| -------- | ------ |
| Response | ✅ 404 |

#### Booking regression

| Check                                  | Result                                                              |
| -------------------------------------- | ------------------------------------------------------------------- |
| `/dashboard/bookings`                  | ✅ All bookings displayed with status badges                        |
| `/dashboard/bookings?filter=confirmed` | ✅ Only confirmed bookings shown                                    |
| `/dashboard/bookings/b-1`              | ✅ Loading skeleton (isHydrated gating), hydrates to booking detail |

#### Wishlist regression

| Check                 | Result                                                     |
| --------------------- | ---------------------------------------------------------- |
| `/dashboard/wishlist` | ✅ Page renders, empty state available when no saved items |

### Responsive Verification

| Viewport | Result                                                               | Notes |
| -------- | -------------------------------------------------------------------- | ----- |
| 320px    | ✅ Rating header wraps; distribution bars fit within `max-w-[280px]` |       |
| 375px    | ✅ All content readable; review list scrolls naturally               |       |
| 768px    | ✅ Two-column layout for distribution label + bar                    |       |
| 1024px   | ✅ Full review section width utilized                                |       |
| 1440px   | ✅ Max-width `max-w-7xl` container keeps content centered            |       |

### Console Check

No hydration errors, runtime errors, or React warnings observed during
verification.

### Typecheck / Lint / Format / Build

| Check               | Result                   |
| ------------------- | ------------------------ |
| `pnpm typecheck`    | ✅ No errors             |
| `pnpm lint`         | ✅ No errors or warnings |
| `pnpm format:check` | ✅ All files formatted   |
