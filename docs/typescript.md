# TypeScript

Strict TypeScript is mandatory. Do not weaken configuration to silence errors.

## Rules

- Strict mode must remain enabled.
- No `any`.
- No `unknown`.
- No `@ts-ignore`.
- No unnecessary type assertions (`as`).
- Avoid duplicated types.
- Avoid giant universal types (e.g., overly broad shared interfaces).
- Domain types should be explicit.
- API input/output types should be explicit.
- Form types should be explicit.
- UI-specific types should be explicit.

## Style Philosophy

- Prefer readable types over clever type-level programming.
- Do not optimize for TypeScript complexity.
- Optimize for clarity.

## Configuration

- `strict: true`
- `noEmit: true`
- `moduleResolution: bundler`
- `isolatedModules: true`
- Path aliases: `@/*` → `./src/*`

## Validation

Type errors must be resolved at the source. Do not weaken configuration to make errors disappear.
