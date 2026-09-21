# Rendering Strategy

This document defines the intended rendering strategy for each type of page. Next.js Server Components are the default; Client Components are introduced only where interactivity or browser-only APIs require them.

## Default

Server Components are the default. Render work and data loading on the server unless a feature explicitly needs client-side interactivity.

## Static / SSG

Static rendering (prerendered at build time) is suitable for content that is the same for every user and does not change frequently.

**Suitable for:**

- `/about`
- `/faq`
- `/journal/[slug]` (where appropriate)
- `/journal` index (where appropriate)

## ISR

Incremental Static Regeneration is suitable for public discovery content where freshness matters and full SSR is unnecessary.

**Suitable for:**

- `/experiences/[slug]`
- `/categories/[slug]`
- `/hosts/[slug]`
- `/explore` (listing, where personalized data is not required)

## SSR / Request-Aware Rendering

Server-side rendering that is request-aware is suitable for pages that genuinely depend on per-request data (authentication, personalization).

**Suitable for:**

- Authenticated `/dashboard/*` pages
- Authenticated `/host/*` pages
- Authenticated `/admin/*` pages
- Any personalized server-rendered content where client hydration would be insufficient or slower

## CSR / Client Components

Client Components are suitable for interactivity, browser-only APIs, and complex client-side state.

**Suitable for:**

- Interactive dashboards
- Complex filters with live results
- Forms requiring real-time validation
- Data-heavy tables
- Charts
- Highly interactive UI

## Important Notes

- A page may use a hybrid approach. For example, a page may prerender static shell content and fetch personalized data client-side. Do not claim a page "must" use one strategy if the final implementation may use a hybrid.
- Prefer Server Components and keep Client Components minimal.
- This document does not mandate specific strategies; it records intent.
