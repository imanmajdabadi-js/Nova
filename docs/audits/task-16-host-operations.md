# Task 16 Audit: Host Operations Completion & Cross-Role Integrity

## 1. Product Objective

Establish the first complete two-sided NOVA workflow where Host mutations to Experience data propagate correctly to the Customer journey. The primary goal is domain integrity, lifecycle integrity, state ownership, persistence, cross-role consistency, and workflow correctness — not additional UI.

```
HOST → Manage Experience → Edit Experience → Validate Readiness → Publish/Pause
   ↓
CANONICAL EXPERIENCE
   ↓
CUSTOMER → Discover → Experience Detail → Book
```

## 2. Existing Architecture

Before changes, NOVA had the following architecture:

### State Sources

- `src/data/experiences.ts` — Immutable seed data (`const experiences: readonly Experience[]`). The canonical definitions of all experiences.
- `src/lib/host-experiences-store.ts` — Zustand store with `persist` (localStorage). Stores **patches** (`Record<string, ExperiencePatch>`) keyed by experience ID. Uses `applyPatch()` to merge patches onto seed data.
- `src/lib/booking-store.ts` — Zustand store for customer bookings.
- `src/lib/wishlist-store.ts` — Zustand store for wishlist (stores IDs only).

### Critical Problem Discovered

**Customer pages read from the immutable `experiences` array, NOT from the Host store's patched data.** This meant Host edits were invisible to customers.

Files reading from seed `experiences` directly:

- `src/app/app/discover/page.tsx` — `import { experiences }` → `filterExperiences(experiences, filters)`
- `src/app/app/experiences/page.tsx` — `import { experiences }` → `experiences.map(...)`
- `src/app/app/experiences/[slug]/page.tsx` — `experiences.find((e) => e.slug === slug)`
- `src/app/dashboard/wishlist/page.tsx` — `experiences.find((e) => e.id === id)`
- `src/components/domain/bookings-list.tsx` — `experiences.find((e) => e.id === id)`
- `src/app/dashboard/bookings/[id]/page.tsx` — `experiences.find((e) => e.id === demoBooking.experienceId)`
- `src/app/dashboard/bookings/[id]/BookingDetailClient.tsx` — `experiences.find((e) => e.id === persistedBooking.experienceId)`
- `src/lib/index.ts` — re-exported `findExperienceById`, `findSessionById`, `validateBooking`, `calculateBookingTotal` (all read from seed)

### Lifecycle

- `src/data/experience-lifecycle.ts` — Already existed with:
  - `statusLabels`, `statusVariants`
  - `canTransition()`, `getAllowedTransitions()`
  - `checkReadiness()` — validates required fields (title, description, category, location, price, image, host, sessions)
  - `canPublish()` — wrapper around `checkReadiness`

### Valid Transitions (existing)

```
Draft  → [draft, published]
Published → [published, paused]
Paused → [paused, published, draft]
```

**Issue**: `Paused → Draft` allows returning to draft, which the task spec says should not exist unless explicitly required. This was corrected.

## 3. Host Workflow

The implemented flow:

1. **Host opens** `/dashboard/host/experiences` (Server Component)
2. Server passes seed experiences for `hostId = "h1"` to `HostExperiencesList` (Client Component)
3. `HostExperiencesList` uses `useHostExperiencesStore` — when hydrated, calls `getHostExperiences()` which applies patches; before hydration, shows seed data
4. Host clicks "Edit" → navigates to `/dashboard/host/experiences/[id]` (Server Component)
5. `HostExperienceEditor` (Client Component) loads, uses `getHostExperience()` when hydrated, falls back to seed
6. Host edits fields → calls `updateExperience(id, patch)` → patches stored in Zustand + localStorage
7. Host saves → patches persist in localStorage
8. Host clicks "Publish" or "Pause" → calls `setStatus(id, status)` → status patch stored
9. Host navigates to Customer Discovery

## 4. Experience Lifecycle

Statuses: `draft | published | paused`

### Valid Transitions (after fix)

```
Draft     → Published  (requires readiness)
Published → Paused
Paused    → Published  (requires readiness)
```

**Removed**: `Paused → Draft` transition. Draft is a pre-publication state; once published, an experience should not return to draft.

### Status Labels

| Status      | Label     | Semantic Meaning                                  |
| ----------- | --------- | ------------------------------------------------- |
| `draft`     | پیش‌نویس  | Not yet published. Not visible to customers.      |
| `published` | منتشر شده | Live and visible. Bookable.                       |
| `paused`    | متوقف     | Temporarily taken down. Not visible to customers. |

## 5. Readiness

Readiness is checked by `checkReadiness()` in `experience-lifecycle.ts`. An Experience is publishable when all of these are truthy:

| Field               | Requirement                                                     |
| ------------------- | --------------------------------------------------------------- |
| `title`             | Non-empty string                                                |
| `description`       | Non-empty string                                                |
| `category`          | Non-empty string                                                |
| `location`          | Non-empty string                                                |
| `price`             | >= 0                                                            |
| `image` or `images` | At least one present                                            |
| `host.name`         | Non-empty string                                                |
| `sessions`          | At least one session with date, time, and remainingCapacity > 0 |

If not ready, the Host UI shows: "آماده نیست" with a list of missing fields.

## 6. State Ownership

| State                | Layer                                 | Persistence                            | Scope                 |
| -------------------- | ------------------------------------- | -------------------------------------- | --------------------- |
| Experience seed data | `data/experiences.ts`                 | Static (code)                          | Canonical definitions |
| Host edits (patches) | `host-experiences-store.ts` (Zustand) | localStorage (`nova-host-experiences`) | Host operations       |
| Booking data         | `booking-store.ts` (Zustand)          | localStorage (`nova-bookings`)         | Customer bookings     |
| Wishlist IDs         | `wishlist-store.ts` (Zustand)         | localStorage (`nova-wishlist`)         | Customer wishlist     |
| UI filters           | Local component state + URL           | URL params                             | Per-page              |
| Form inputs          | Local component state                 | None (transient)                       | Editor                |

### Canonical Data Layer

New module: `src/lib/canonical-experiences.ts`

Provides hooks that merge seed data with Host store patches:

- `useCanonicalExperiences()` — all experiences with patches applied
- `useCanonicalExperienceById(id)` — single experience by ID
- `useCanonicalExperienceBySlug(slag)` — single experience by slug
- `useCanonicalSession(experienceId, sessionId)` — single session
- `filterVisibleExperiences(experiences)` — filters to published only
- `isExperienceBookable(experience)` — published + has available sessions

All hooks follow the `isHydrated` gating pattern:

- Before hydration: return seed data (SSR-safe)
- After hydration: return canonical (seed + patches)

## 7. Canonical Data Strategy

```
                     Experience (canonical)
                           │
              ┌────────────┴────────────┐
              ↓                         ↓
        Customer View              Host View
     (canonical hooks)          (Host store + editor)
```

**Strategy**: Single canonical Experience entity. The Host store stores patches (deltas). A new "canonical" layer merges seed + patches. Both Host and Customer read from the same merged result.

- Slug is immutable (not in `ExperiencePatch`) — canonical lookup by slug always finds the seed
- All customer-visible fields (title, description, category, location, price, image, sessions, status) are patchable
- No separate `CustomerExperience` or `HostExperience` types exist

**Implementation**:

- `host-experiences-store.ts` exports `getCanonicalExperiences()`, `getCanonicalExperienceById()`, `getCanonicalExperienceBySlug()`
- `canonical-experiences.ts` provides React hooks wrapping these store functions with hydration gating
- `applyPatch` is exported from the store for reuse

## 8. Booking Integrity

**Decision**: Bookings store `experienceId` and `sessionId` as references. They do NOT store copies of Experience data. When displaying a booking, the experience is resolved from the canonical (patched) store at display time.

**Historical Booking Behavior**:

- When a Host edits an Experience (e.g., changes the title), existing bookings show the **updated** title, because the booking only stores the ID reference
- The booking's `date`, `time`, `price`, and `guestCount` are stored at booking time and are immutable
- Session details (date, time, participants) are stored in the booking at creation time

**Rationale**: This is a prototype-only decision. In a real backend:

- Bookings would snapshot essential experience data at creation time
- Or use event-sourcing to reconstruct historical state
- For the prototype, showing current canonical data for existing bookings is acceptable and demonstrates cross-role consistency

**Session Integrity**: The `validateBooking` function now accepts the `Experience` and `ExperienceSession` objects directly (instead of looking up by ID from seed data). This ensures that when a Customer books an experience, the validation uses the canonical (patched) session data.

## 9. Customer/Host Synchronization

### How Host edits propagate to Customer:

| Host Action               | Customer Effect                                 | Mechanism                                           |
| ------------------------- | ----------------------------------------------- | --------------------------------------------------- |
| Edit title                | Discovery, Detail, Booking card show new title  | `useCanonicalExperiences()` in Discover page        |
| Edit description          | Experience Detail shows new description         | `useCanonicalExperienceBySlug()` in detail page     |
| Edit price                | Discovery, Detail, Booking total show new price | Canonical experience flows to `BookingFlow`         |
| Edit sessions             | BookingFlow uses updated sessions               | `validateBooking(experience, session, guests)`      |
| Edit category             | Discovery filter updates                        | Canonical experiences flow to `filterExperiences()` |
| Edit location             | Discovery filter + Detail show new location     | Canonical data                                      |
| Edit image                | All Customer views show new image               | Image URLs patched in store                         |
| Publish (draft→published) | Experience appears in Discovery                 | `filterVisibleExperiences()`                        |
| Pause (published→paused)  | Experience disappears from Discovery            | `filterVisibleExperiences()`                        |
| Resume (paused→published) | Experience reappears in Discovery               | `filterVisibleExperiences()`                        |

### Visibility Rules:

- **Discovery**: Only `published` experiences are visible (`filterVisibleExperiences`)
- **Experience Detail**: Non-published experiences show a "not available" message with the current status
- **Experience Listing** (`/app/experiences`): Only `published` experiences
- **Booking Flow**: Only starts if `isExperienceBookable()` returns true (published + has available sessions)

## 10. Backend Migration Path

The current patch-based architecture maps cleanly to future REST API boundaries:

```
Current (prototype):
  Host Edits → Zustand patches (localStorage)
  → applyPatch(seed, patch) = canonical experience
  → Customer reads canonical experience

Future (backend):
  Host Edits → PATCH /host/experiences/:id
  → Server applies patch to database
  → GET /experiences → returns canonical experiences
  → Customer reads from API
```

The `ExperiencePatch` type maps directly to the PATCH request body. The `applyPatch` function maps to the server's merge logic. The canonical hooks (`useCanonicalExperiences`, etc.) would be replaced by API calls, but their return types would remain identical.

### Future API Boundaries:

```
GET    /experiences          → list all (with status filter: published only)
GET    /experiences/:id      → single experience
GET    /experiences/:slug    → single by slug
PATCH  /host/experiences/:id → update fields
PATCH  /host/experiences/:id/sessions → update sessions
PATCH  /host/experiences/:id/status   → status change (publish/pause)
POST   /host/experiences    → create new
```

## 11. UX Decisions

### Host Workspace Information Hierarchy

The Host Experiences page (`/dashboard/host/experiences`) answers:

1. **"What am I managing?"** — Page title: "تجربه‌های من" with host avatar and verified badge
2. **"What needs attention?"** — Draft and unpublished experiences show "آماده نیست" with missing fields revealed on click
3. **"What is live?"** — Status pills: "منتشر شده" (green), "متوقف" (blue), "پیش‌نویس" (amber)
4. **"What is incomplete?"** — Readiness indicator with expandable missing fields list
5. **"What should I do next?"** — Status transition buttons: "منتشر" (publish), "متوقف" (pause), direct "ویرایش" (edit) link

### Status Indicators (colorblind-safe):

- Published: green checkmark icon + "منتشر شده" text
- Paused: pause icon + "متوقف" text
- Draft: pencil icon + "پیش‌نویس" text
- All include both icon and text (no color-only indicators)

### Non-Published Experience Detail:

- Draft: Redirects to Discovery (private)
- Paused: Shows "temporarily unavailable" message with status and back-to-discovery link

## 12. Deferred Work

### Explicitly NOT added:

- Authentication / Authorization (demo hostId = "h1" hardcoded)
- Payment processing
- Notifications
- Analytics
- Real capacity decrement (capacity is static; bookings validate against `remainingCapacity` but do not decrement it)
- Real-time collaboration
- File upload backend (images are URL string fields)
- Real API / database
- Moderation workflows
- Rating/review submission (review data is read-only mock data)

## 13. Server/Client Boundaries

### Client Components (`"use client"`):

- `src/app/app/discover/page.tsx` — Already client; now uses canonical hooks
- `src/app/app/experiences/[slug]/page.tsx` — **Converted**: was Server Component, now Client Component
- `src/app/app/experiences/page.tsx` — **Converted**: was Server Component, now Client Component
- `src/app/app/experiences/[slug]/BookingFlow.tsx` — Already client
- `src/app/dashboard/wishlist/page.tsx` — Already client
- `src/components/domain/bookings-list.tsx` — Already client
- `src/app/dashboard/bookings/[id]/BookingDetailClient.tsx` — Already client
- `src/app/dashboard/host/experiences/page.tsx` (via `HostExperiencesList`) — Already client
- `src/app/dashboard/host/experiences/[id]/page.tsx` (via `HostExperienceEditor`) — Already client

### Server Components (kept server):

- `src/app/dashboard/host/experiences/page.tsx` — Server; passes seed to Client
- `src/app/dashboard/host/experiences/[id]/page.tsx` — Server; passes seed to Client
- `src/app/dashboard/bookings/page.tsx` — Server; passes filter to Client

**Rationale**: Server Components handle routing, not-found, and initial seed data. Client Components handle canonical data merging and interactive state. The server-side pages call `notFound()` for truly non-existent slugs/IDs (based on seed data), while Client Components handle canonical state changes after hydration.

## 14. Accessibility

- All status indicators use both icon + text (no color-only)
- `aria-label` on status pills: "وضعیت: منتشر شده", etc.
- Verified badge: `aria-label="رزرو تأیید شده"`
- Form labels present on all inputs
- Back buttons/links use semantic `<Link>` elements
- Navigation breadcrumbs are semantic
- Focus outlines preserved via CSS
- RTL direction set via `dir="rtl"` on AppShell and root layout

## 15. Responsive QA

### Verified breakpoints:

- **320px** (mobile): Single column, stack nav, cards full-width
- **375px** (mobile): Same as 320px
- **768px** (tablet): Two-column grid in Discover, side panels adjust
- **1024px** (desktop): Three-column grid in Discover, two-column layout in Detail
- **1440px** (wide): Full-width content, five-column grid in Wishlist

### Key responsive patterns:

- Discover: `sm:grid-cols-2 lg:grid-cols-3`
- Detail: `lg:grid lg:grid-cols-12` (7 col content, 5 col sidebar)
- Host list: `grid-cols-12` with responsive column spans on cards
- Session editor: `sm:grid-cols-3` for session inputs

## 16. Browser QA

### Host QA:

- [x] Host list loads with correct experiences for host h1
- [x] Empty state for hosts with no experiences
- [x] Existing experience cards show title, status, readiness, sessions
- [x] Edit navigates to editor with pre-filled fields
- [x] Validation shows missing fields
- [x] Save persists patches to localStorage
- [x] Readiness indicator updates after field changes
- [x] Publish transitions status to "published" (disabled if not ready)
- [x] Pause transitions status to "paused"
- [x] Resume transitions from paused to published
- [x] Session editing: add/remove/edit sessions

### Cross-role QA:

- [x] Host edit → Customer Discovery shows updated field
- [x] Host edit → Experience Detail shows updated field
- [x] Host publish → Experience appears in Discovery
- [x] Host pause → Experience disappears from Discovery
- [x] Host edit → Wishlist shows updated experience
- [x] Host edit → Existing Booking Detail shows updated experience
- [x] Host edit → Booking list shows updated experience

### Persistence:

- [x] Refresh preserves Host store patches
- [x] Direct URL access to Experience Detail resolves canonical data
- [x] Hydration: Server renders seed, Client hydrates with canonical
- [x] Malformed localStorage: Zustand persist handles gracefully

### Console:

- No hydration errors
- No runtime errors
- No infinite loops
- No React warnings introduced by this task
- Navigation works correctly

## 17. Validation Results

```
pnpm typecheck  → PASS (0 errors)
pnpm lint       → PASS (0 errors, 12 warnings — pre-existing)
pnpm format:check → PASS (all files formatted)
pnpm build      → PASS (all routes compile and prerender)
```

### Warnings (pre-existing, not introduced by this task):

- `host-experience-editor.tsx`: `window.location.href` usage (Host-only, acceptable for prototype)
- `host-experience-editor.tsx`: `<img>` instead of `<Image>` (Host avatar, pre-existing)
- `host-experience-editor.tsx`: unused `sessionsChanged` variable, missing deps in `useMemo`
- `host-experiences-list.tsx`: unused imports (`Badge`, `StarIcon`, `formatPrice`)
- `host-experiences-list.tsx`: `window.location.href` usage

**Introduced warnings: 0**

## 18. Performance Observations

- Hydration: Server renders seed data, Client overlays canonical data within milliseconds
- No additional network requests (all data is in-memory/Zustand)
- `useMemo` gates canonical data computation on `isHydrated`
- `filterVisibleExperiences` is O(n) on 8 experiences — negligible
- `useCanonicalExperienceBySlug` performs a slug lookup O(n) then applies a small patch — negligible

## 19. Files Changed

| File                                                      | Change                                                                                                                                 |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/host-experiences-store.ts`                       | Added `getCanonicalExperiences`, `getCanonicalExperienceById`, `getCanonicalExperienceBySlug`; exported `applyPatch`                   |
| `src/lib/canonical-experiences.ts`                        | **New file** — canonical hooks and utilities                                                                                           |
| `src/lib/index.ts`                                        | Re-exported `applyPatch` and canonical functions                                                                                       |
| `src/data/experiences.ts`                                 | Updated `validateBooking` and `calculateBookingTotal` to accept `Experience` objects; updated `findSessionById` to accept `Experience` |
| `src/app/app/discover/page.tsx`                           | Uses `useCanonicalExperiences()` + `filterVisibleExperiences()`                                                                        |
| `src/app/app/experiences/[slug]/page.tsx`                 | **Converted to Client Component**; uses `useCanonicalExperienceBySlug`; handles non-published states                                   |
| `src/app/app/experiences/[slug]/BookingFlow.tsx`          | Updated `validateBooking`/`calculateBookingTotal` calls to pass Experience object                                                      |
| `src/app/app/experiences/page.tsx`                        | **Converted to Client Component**; uses canonical data, filters to published                                                           |
| `src/app/dashboard/wishlist/page.tsx`                     | Uses `useCanonicalExperienceById` for per-card resolution                                                                              |
| `src/components/domain/bookings-list.tsx`                 | Uses `useCanonicalExperiences()` for experience lookup                                                                                 |
| `src/app/dashboard/bookings/[id]/BookingDetailClient.tsx` | Uses `useCanonicalExperienceById` for experience resolution                                                                            |
| `src/app/dashboard/bookings/[id]/page.tsx`                | Simplified — passes only booking, client resolves experience                                                                           |
| `src/app/dashboard/host/experiences/page.tsx`             | Cleaned up unused imports (pre-existing warnings)                                                                                      |
| `src/data/experience-lifecycle.ts`                        | Updated lifecycle transitions (removed `paused → draft`)                                                                               |

## 20. Quality Gate

### Architecture

- ✅ Yes — one canonical Experience. Seed data + patches merged via `applyPatch`. No duplicated types.

### State

- ✅ Host state stored in the simplest appropriate place: Zustand + localStorage patches. Customer state in booking/wishlist stores (same pattern).

### Lifecycle

- ✅ Cannot create impossible states. `canTransition` enforces valid transitions. `Paused → Draft` removed. Publishing requires `checkReadiness()`.

### Customer integrity

- ✅ Host changes correctly propagate. All Customer pages now read from canonical data via hooks.

### Booking integrity

- ✅ Host edits cannot break historical bookings. Bookings store IDs only. Experience resolved canonically at display time.

### UX

- ✅ Host workspace communicates what needs attention via readiness indicators, status pills, and actionable transition buttons.

### Design

- ✅ Host workspace uses the same NOVA design system (same color tokens, typography, spacing). Not a generic admin template.

### Complexity

- ✅ No unnecessary abstractions. Canonical hooks wrap the existing store. No new state machines, no new frameworks.

### Future

- ✅ Backend can replace local storage by keeping the same hook interfaces. The `ExperiencePatch` type maps directly to a PATCH request body.

## 21. Remaining Risks

1. **Hydration mismatch**: Server renders seed data, Client may render canonical data. In practice, the seed and canonical differ only when Host has made patches. The initial render shows seed data, then updates after hydration. This is acceptable for a prototype.

2. **Draft persistence isolation**: The Host store uses `selectedHostId = "h1"` hardcoded. In a real app, the host would be determined by auth context. The current architecture supports per-host patches, but the UI doesn't switch hosts.

3. **No real capacity decrement**: Booking validation checks `remainingCapacity` but doesn't decrement it. Multiple bookings on the same session would all succeed. This is a prototype limitation — capacity management requires backend authority.

4. **Direct URL access to draft/paused**: Draft experiences redirect to Discovery. Paused experiences show a "not available" message. Both are correct, but a Host might want to preview a draft via direct link (not supported — drafts are private).

## 22. Recommended Next Task

**Task 17: Host Experience Detail View**

Create a Host-facing Experience Detail page (within `/dashboard/host/experiences/[id]`) that:

- Shows the full experience as the Host would see it
- Includes analytics-style metrics (booking count, revenue estimate) — using mock data only
- Shows a timeline of the experience (upcoming sessions, past sessions)
- Provides quick actions (pause/publish, edit sessions)
- Demonstrates the "what happens to existing bookings" view (showing how current experience data maps to historical bookings)

This would complete the Host's operational workspace and provide visibility into the booking-experience relationship.
