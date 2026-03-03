React 18 + TypeScript + Vite + Apollo Client (GraphQL) + Jotai + SCSS Modules.
Yarn. Absolute imports via `@/`. Prettier, ESLint, Stylelint configured.

# Architecture

## Project Structure

```
src/
  components/       # React components (char-card, char-list, details, header, pagination, etc.)
  routes/           # React Router config (app-router.tsx)
  hooks/            # Custom hooks (use-filter-search-params, use-click-outside)
  store/            # Jotai atoms (characters.store.ts — favorite characters)
  apolloClient/     # Apollo Client setup with ErrorLink + InMemoryCache
  queries/          # GraphQL queries (queries.gql)
  generated/        # Auto-generated types from graphql-codegen
  styles/           # Global CSS
  types/            # Shared TypeScript types
  utils/            # Helpers (debounce, get-random-collection)
  icons/            # SVG icons (imported via vite-plugin-svgr)
  assets/           # Images
```

## Routing (React Router 6)

- `/` — Welcome page
- `/home` — Characters list with filters and pagination
- `/home/empty` — Empty list fallback
- `/favorite` — Favorite characters
- `/favorite/empty` — Empty favorites fallback
- `*` — 404 (OhNo component)

Route error boundary: `RouteErrorBoundary` component with fallback UI.

## State Management

- **Jotai** — favorite characters stored as atom (array of IDs), no persistence
- **Apollo Client** — server state, InMemoryCache with type policies, Suspense queries (`useSuspenseQuery`)

## GraphQL

- API: `https://rickandmortyapi.com/graphql` (env var `VITE_REACT_APP_GRAPHQL_API`)
- Codegen config: `codegen.yml` → generates types to `src/generated/`
- Run `yarn codegen` to regenerate types after changing `src/queries/queries.gql`
- Build runs codegen automatically: `graphql-codegen && tsc && vite build`

## Key Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Dev server (port 3000) |
| `yarn build` | Codegen + type check + production build |
| `yarn test` | Run Vitest |
| `yarn codegen` | Generate GraphQL types |
| `yarn eslint-fix` | Auto-fix ESLint issues |
| `yarn stylelint-fix` | Auto-fix Stylelint issues |
| `yarn check-types` | TypeScript type check (no emit) |

# Code Conventions

## Components

- Functional components typed with `FC`
- File naming: `component-name.tsx`, `component-name.module.scss`, `index.ts` (re-export)
- Directory per component in `src/components/`

## Imports

- Absolute imports via `@/` alias (maps to `src/`)
- Order enforced by `eslint-plugin-simple-import-sort`: external → absolute (`@/`) → relative
- SVG imported as React components via `vite-plugin-svgr`

## Styling

- SCSS with CSS Modules (`.module.scss`)
- `classnames` package for conditional classes
- Stylelint with `stylelint-order` for property ordering

## Prettier

- Single quotes, trailing commas (`all`), semicolons
- Print width: 120, tab width: 2
- Bracket same line: true

## TypeScript

- Strict mode enabled
- `noUncheckedIndexedAccess: true`
- Target/Module: ESNext
- Path alias: `@/*` → `src/*`

## Pre-commit

Lint-staged hooks:
- `.scss` → stylelint
- `.js/.ts` → prettier + eslint
