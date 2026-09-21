# State Management

Defines the responsibility of each state layer. Libraries (TanStack Query, Redux Toolkit) are documented for intent only; they are not installed in this task.

## TanStack Query

Used for **server state**: remote data, caching, synchronization, mutations, and remote loading/error states.

**Use for:**

- Server state
- API data
- Caching
- Synchronization
- Mutations
- Loading/error states related to remote data

## Redux Toolkit

Used only for **genuinely global client state** that must be shared across distant components or persist across navigation.

**Potential examples:**

- Application-level UI state
- Global preferences
- Complex client workflows
- State that must be shared across distant client components

**Rules:**

- Do NOT put every API response into Redux.
- Prefer TanStack Query for server data even if it is shared.
- Keep Redux state minimal and clearly scoped.

## Local React State

Used for **component-local UI state**.

**Use for:**

- Component-local UI state
- Temporary interaction state
- Simple toggles
- Local input state when React Hook Form is not appropriate

## URL State

Used for **discovery and navigation state** that should survive refresh and be shareable.

**Use for:**

- Search queries
- Filters
- Sorting
- Pagination
- Shareable discovery state

**Rule:** URL state is preferred when the state should survive refresh and be shareable.

## Summary

| Concern                          | Layer                           |
| -------------------------------- | ------------------------------- |
| Remote data, caching, sync       | TanStack Query                  |
| Global client state              | Redux Toolkit                   |
| Component-local UI state         | React `useState` / `useReducer` |
| Discovery/filter/sort/pagination | URL state                       |

## Notes

- No stores or query clients are created in this task.
- The boundary between layers may evolve; keep it pragmatic.
