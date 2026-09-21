# Definition of Done

A feature is complete only when the appropriate conditions are met.

## Required Checks

- TypeScript passes (`pnpm typecheck`)
- ESLint passes (`pnpm lint`)
- Formatting passes (`pnpm format:check`)
- Build passes (`pnpm build`)

## Quality Checks

- Responsive behavior is checked
- RTL (Persian) behavior is checked
- LTR (English) behavior is checked when implemented
- Accessibility basics are checked
- Loading state exists when needed
- Error state exists when needed
- Empty state exists when needed

## Code Quality

- Reusable components are extracted when reuse is meaningful
- No unnecessary duplication exists
- No unnecessary dependency was introduced
- Git commit is meaningful

## Tests

- Do not require tests for trivial static changes.
- Require tests for important business logic and critical user flows when those features are implemented.

## Documentation

- Domain and behavior that affects other teams should be documented where relevant.
