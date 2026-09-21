# Component Architecture

Defines the principles for organizing NOVA components into reusable layers. No final components are built here.

## UI Components

Reusable visual primitives. These know nothing about NOVA business concepts.

**Examples:**

- Button
- Input
- Badge
- Card
- Dialog
- Tabs
- Select

## Domain Components

Components that understand NOVA business concepts. These compose UI components and encode business semantics.

**Examples:**

- ExperienceCard
- BookingStatus
- ExperienceSchedule
- HostProfile

## Feature Components

Components specific to a single feature or screen. These compose domain and UI components.

**Examples:**

- BookingForm
- ExperienceFilters
- ExperienceEditor

## Page Composition

Pages should compose smaller components rather than being monolithic.

**Guidelines:**

- Compose small, focused components
- Single responsibility per component
- Reuse components where reuse is meaningful
- Avoid abstraction purely for abstraction

**Note:** Do not enforce an artificial line-count limit. Size is a signal, not a rule.

## Folder Convention (Intent)

```
src/components/
  ui/            # UI primitives (reusable, visual)
  domain/        # Domain-aware components
  features/      # Feature-specific components
```

This structure is documented as intent and may be refined during implementation.
