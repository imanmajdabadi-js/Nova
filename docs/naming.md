# Naming Convention

One consistent convention across the project: descriptive, readable names; PascalCase for React components and types; camelCase for functions, variables, and files.

## Files

- TypeScript files: camelCase or kebab-case, lowercase filenames.
- React components: PascalCase filenames matching the component (e.g., `ExperienceCard.tsx`).
- Pages: `page.tsx`, `layout.tsx`, `loading.tsx`, etc. (App Router convention).

## Folders

- kebab-case or lowercase feature folders (e.g., `components`, `lib`, `types`, `config`, `constants`).

## Components

- PascalCase. Match filename to component name.

## Hooks

- Prefix with `use`. camelCase (e.g., `useExperience`, `useBookings`).

## Types

- PascalCase (e.g., `Experience`, `BookingStatus`).
- Prefer interfaces for object shapes that may be extended; prefer type aliases for unions and tuples.

## Constants

- UPPER_SNAKE_CASE for true module-level constants.
- camelCase exportable config objects (e.g., `appConfig`).

## Functions

- camelCase. Descriptive verb-first (e.g., `formatPrice`, `isBookingConfirmed`).

## Variables

- camelCase.

## Routes

- kebab-case segments for SEO-friendly, readable URLs.
- Dynamic segments: `[slug]`, `[id]`.

## General

- Prefer descriptive names over abbreviations.
- Avoid abbreviations unless they are standard (e.g., `id`, `ui`).
- Avoid single-letter names except in tight local loops.
