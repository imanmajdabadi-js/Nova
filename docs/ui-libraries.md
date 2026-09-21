# UI Libraries

Documents the responsibility of each styling/UI technology. Libraries beyond Tailwind are recorded as intent only and are not installed in this task.

## Tailwind

Tailwind is the primary styling tool for custom layouts, marketing/public UI, responsive styling, and design token integration.

**Primary tool for:**

- Custom layouts
- Marketing/public UI
- Responsive styling
- Design token integration

## MUI

MUI is used where its specialized components provide meaningful value over a custom solution.

**Use when:**

- Data-heavy interfaces
- Advanced controls
- Complex widgets

**Rule:** Use MUI only when its components add meaningful value. Do not use a library component when a simple custom component is clearer.

## Ant Design

Ant Design is used primarily in Admin interfaces where its data-oriented components are appropriate.

**Primary area:**

- Admin interfaces

## Mixing Policy

**Rules:**

- Do NOT mix MUI and Ant Design arbitrarily inside the same component.
- Keep library boundaries clear per feature/page where possible.
- The final UI must visually feel like one product even though multiple UI libraries may exist underneath.
- Prefer a single consistent solution per component; combine only when justified by value.

## Notes

- Only Tailwind is installed in the current task.
- MUI and Ant Design decisions are deferred to feature tasks.
