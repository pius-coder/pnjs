# Step 02: Plan

**Task:** FE-00 frontend initialization
**Started:** 2026-06-25T21:34:53Z

---

## Planning Progress

## Implementation Plan: FE-00 Frontend Initialization

### Strategy

Scaffold SvelteKit via CLI, init Shadcn-Svelte, then create skeleton files/directories for styles, API client, mocks, theme store, and design system route.

### Execution Order

#### Step 1: Scaffold SvelteKit

CLI: `sv create . --template minimal --types ts --install bun --add prettier eslint tailwindcss vitest="usages:unit+usages:component" playwright sveltekit-adapter=adapter:auto --no-dir-check --no-download-check`
Creates: package.json, svelte.config.js, tsconfig.json, vite.config.ts, src/app.html, src/app.d.ts, src/app.css, ESLint/Prettier config, Vitest/Playwright config

#### Step 2: Init Shadcn-Svelte

CLI: `bunx shadcn-svelte@latest init --base-color neutral --overwrite`
Adds: components.json, CSS variables, src/lib/components/ui/

#### Step 3: Add Base Components

CLI: `bunx shadcn-svelte@latest add button card badge skeleton alert dialog sheet`

#### Step 4: Verify Import Aliases

Files: svelte.config.js, tsconfig.json — ensure $lib alias works

#### Step 5: Create Directory Structure

```
src/lib/api/  src/lib/auth/  src/lib/mocks/handlers/  fixtures/  factories/  scenarios/
src/lib/stores/  src/lib/types/  src/lib/utils/  src/lib/config/  src/lib/schemas/
src/styles/  src/tests/
src/routes/(public)/ (auth)/ (candidate)/ (company)/ (institution)/ (administration)/ (internal)/
```

#### Step 6: Global Styles

- src/styles/theme.css — Shadcn tokens + material tokens, light/dark/system
- src/styles/material.css — .window-surface, .panel-surface, .floating-surface, .inset-surface
- src/styles/typography.css — type hierarchy classes
- src/styles/app.css — imports all, base styles
- Update src/app.html — data-theme attribute + class toggling

#### Step 7: Config & API Client Skeleton

- src/lib/config/index.ts — API_BASE_URL, constants
- src/lib/api/errors.ts — ApiError, NetworkError, ValidationError
- src/lib/api/client.ts — base fetch wrapper, CSRF, abort, type helpers

#### Step 8: Mock Setup Skeleton

- src/lib/mocks/handlers/index.ts — MSW or interceptor skeleton
- src/lib/mocks/fixtures/ — domain placeholder files
- src/lib/mocks/factories/ — factory function stub
- src/lib/mocks/scenarios/ — scenario composition stub

#### Step 9: Theme Store

- src/lib/stores/theme.ts — writable store, localStorage persistence, class toggling

#### Step 10: Internal Design System Route

- src/routes/(internal)/+layout.svelte — minimal layout
- src/routes/(internal)/design-system/+page.svelte — component showcase (Button, Card, Badge, Skeleton, Alert, Dialog trigger, Sheet, surface variants, typography, Data Table, form, theme toggle, responsive demo)

#### Step 11: Verification

- bun run build
- bun run lint
- bun run check
- bun run test:unit

### Testing Strategy

- src/lib/api/errors.test.ts — error instantiation + type checking
- src/lib/stores/theme.test.ts — toggle, persistence, system pref
- src/lib/config/index.test.ts — config values
- Scaffold demo test (created by CLI)

### AC Mapping

- AC1 (dev starts): Step 1
- AC2 (build passes): Step 11
- AC3 (lint passes): Step 11
- AC4 (check passes): Step 11
- AC5 (Shadcn renders): Step 2-3, Step 10
- AC6 (theme switching): Step 6, Step 9
- AC7 (design system route): Step 10
- AC8 (responsive): Step 6, Step 10
- AC9 (API client): Step 7
- AC10 (mock setup): Step 8
- AC11 (import aliases): Step 4
