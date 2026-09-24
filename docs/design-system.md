# NOVA Design System

A Persian-first (RTL), design-token-driven system built for Next.js 16, Tailwind CSS v4, and Ant Design v6.

## Architecture

### Token Source of Truth

All design tokens live in `src/styles/tokens.ts` — the single source of truth for colors, spacing, typography, shadows, and motion. The file exports:

- `palette` — raw color scales (numeric keys 50–950) for primary, secondary, accent, neutral, success, warning, error, info.
- `semantic` — mode-aware semantic tokens (`light` / `dark`) mapping to palette references or CSS variables.
- `spacing`, `radius`, `shadows`, `motion`, `breakpoints`, `typography` — structural tokens.
- `novaTheme` — the full theme object combining all tokens.
- `antdToken(mode)` — generates an Ant Design `ThemeConfig` object using verified `AliasToken` keys for a given mode.

### CSS Layer

Global styles are defined in `src/styles/globals.css`:

- `@theme inline` registers all palette scales, semantic tokens, motion/timing tokens, radius tokens, and shadow tokens as CSS custom properties.
- `:root` and `:root.dark` (plus `@media (prefers-color-scheme: dark)`) define light/dark semantic variable overrides.
- `@layer base` provides a global `:focus-visible` ring rule for accessibility.
- Typography utilities (`@utility text-display`, `text-h1`–`text-h4`, `text-body`, `text-body-lg`, `text-body-sm`, `text-caption`, `text-label`) are defined at the top level (not nested inside `@layer`) per Tailwind v4 rules.

### Font Configuration

`src/config/fonts.ts` uses `next/font/google` to load:

- **Inter** (variable, `--font-en`) — for English/LTR content.
- **Vazirmatn** (variable, `--font-fa`) — for Persian/RTL content, with `arabic` subset.

Language-specific font assignment is handled via `html[lang="fa"]` and `html[lang="en"]` CSS rules.

### Theme Provider

`src/components/providers/nova-theme-provider.tsx` wraps the application with:

- Ant Design `ConfigProvider` (direction `rtl`, themed tokens, dark/light algorithm).
- A `ThemeContext` exposing `mode`, `toggleTheme`, and `setMode`.
- Client-side dark mode: reads `localStorage` preference on first render, falls back to `prefers-color-scheme` media query. Persists changes to `localStorage`.

The root layout (`src/app/layout.tsx`) sets `<html lang="fa" dir="rtl">` and applies font variable classes.

## Component Library

All UI primitives are in `src/components/ui/` and use **utility classes only** (no `@apply`). They are framework-agnostic where possible and accept `forwardRef`.

### Available Primitives

| Component      | File                    | Description                                                                                                           |
| -------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Button**     | `button/index.tsx`      | Variants: primary, secondary, outline, ghost, destructive. Sizes: sm, md, lg. Supports `loading`, `icon`, `disabled`. |
| **IconButton** | `icon-button/index.tsx` | Button with icon-only presentation; supports `label` (ARIA), `variant`, `size`, `loading`.                            |
| **Spinner**    | `spinner/index.tsx`     | SVG spinner; sizes: sm, md, lg.                                                                                       |
| **Label**      | `label/index.tsx`       | Form label with `required` indicator via `::after` content. Re-exports `useFieldId`.                                  |
| **Input**      | `input/index.tsx`       | Text input with label, helper text, error state, prefix/suffix slots, ARIA attributes.                                |
| **Textarea**   | `textarea/index.tsx`    | Textarea with label, helper text, error state, ARIA attributes.                                                       |
| **Badge**      | `badge/index.tsx`       | 8 variants: primary, secondary, accent, success, warning, error, info, neutral.                                       |
| **Divider**    | `divider/index.tsx`     | Horizontal divider with optional center label.                                                                        |
| **Card**       | `card/index.tsx`        | Card with Header, Body, Footer sub-components; `hoverable` support.                                                   |

Export barrel: `src/components/ui/index.ts`

### Design Principles

- **RTL-first**: All components use logical properties (`start`/`end` via Tailwind) by default.
- **Utility classes only**: No `@apply` — components compose Tailwind utility classes directly.
- **A11y**: Focus-visible outlines, ARIA attributes, semantic HTML, proper labeling with generated IDs.
- **Ant Design integration**: Components use the same token values via `antdToken()` for visual consistency when Ant components are used alongside NOVA primitives.

## Development

### Scripts

```bash
pnpm dev          # Start dev server
pnpm build        # Production build (Turbopack)
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm typecheck    # Run tsc --noEmit
pnpm format       # Format with Prettier
pnpm format:check # Check formatting
```

### Validation Checklist

Before committing:

1. `pnpm typecheck` — no type errors
2. `pnpm lint` — no errors or warnings
3. `pnpm format:check` — all files formatted
4. `pnpm build` — production build succeeds

### Showcase

A visual reference page is available at `/showcase` (development only, under `src/app/(dev)/showcase/`). It renders all tokens, primitives, and Ant Design integration components for visual review.

## Token Reference

### Palette Scales

Each palette has keys `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950` with OKLCH color values.

### Semantic Tokens (Light)

| Token        | Value                                 |
| ------------ | ------------------------------------- |
| `background` | `oklch(100% 0 0)`                     |
| `surface`    | `oklch(100% 0 0)`                     |
| `foreground` | `oklch(20.8% 0.042 265.755)`          |
| `primary`    | `var(--color-primary-500)` (teal 500) |
| `border`     | `var(--color-neutral-300)`            |

### Semantic Tokens (Dark)

| Token        | Value                        |
| ------------ | ---------------------------- |
| `background` | `oklch(12.9% 0.042 264.695)` |
| `surface`    | `oklch(20.8% 0.042 265.755)` |
| `foreground` | `oklch(92.9% 0.013 255.508)` |
| `primary`    | `var(--color-primary-400)`   |
| `border`     | `var(--color-neutral-700)`   |

### Spacing

`xs2` (0.125rem) through `xl6` (3rem), plus `xs`, `sm`, `md`, `lg`, `xl`.

### Border Radius

`none`, `sm`, `md`, `lg`, `xl`, `xl2`, `xl3`, `full`.

### Shadows

`none`, `subtle`, `medium`, `elevated`, `focused` (all CSS box-shadow strings).

### Motion

`fast` (120ms), `normal` (220ms), `slow` (320ms), with `ease-out` and `ease-in-out` easing functions.

### Typography

| Utility        | Font Size | Line Height | Weight |
| -------------- | --------- | ----------- | ------ |
| `text-display` | 2.75rem   | 1.05        | 800    |
| `text-h1`      | 2.25rem   | 1.1         | 700    |
| `text-h2`      | 1.625rem  | 1.2         | 600    |
| `text-h3`      | 1.3125rem | 1.25        | 600    |
| `text-h4`      | 1.0625rem | 1.3         | 600    |
| `text-body-lg` | 1.125rem  | 1.6         | 400    |
| `text-body`    | 1rem      | 1.65        | 400    |
| `text-body-sm` | 0.8125rem | 1.5         | 400    |
| `text-caption` | 0.75rem   | 1.35        | 500    |
| `text-label`   | 0.8125rem | 1.4         | 600    |

## Dependencies

- `antd@6.6.5` + `@ant-design/icons@6.3.4` — component library and icons (sole icon library)
- `next@16.3.5` — React framework with Turbopack
- `tailwindcss@4.3.3` — styling engine
- `react@19.2.8` — UI runtime
- No form/state libraries: primitives are framework-agnostic

## Notes

- Ant Design screen tokens (`screenSM`, `screenMD`, etc.) are intentionally omitted from `antdToken()` to avoid conflicts with Tailwind's default breakpoint system.
- The `useTheme()` hook throws if used outside of `NovaThemeProvider`.
- `suppressHydrationWarning` is set on `<html>` to handle dark-mode class toggling on the client side.
