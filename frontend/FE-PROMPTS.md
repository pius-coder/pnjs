# FE Prompts — Parallel Tracks

## Track A: Layouts → Sessions → Espace Pages

### FE-03 — Layouts (DONE)

- Route group layouts using existing AppHeader/AppSidebar/AppFooter/MobileNav
- (public): AppHeader + AppFooter with NavigationMenu, theme toggle, auth buttons
- (auth): centered card layout (WindowSurface)
- (candidate/company/institution/administration): Sidebar.Provider + AppSidebar + AppHeader

### FE-04 — Session et guards

```
Implement auth guards and session management per CAHIER_DE_CHARGE §17.

Route group (auth) exists. Create:
- Login page: (auth)/login/+page.svelte — email/password form
- Register pages: (auth)/register/candidate, (auth)/register/company, (auth)/register/institution
- Password reset: (auth)/forgot-password/+page.svelte

Create guards:
- src/lib/features/auth/guard.svelte.ts — `requireAuth(role: Role)` function
- src/lib/features/auth/stores.ts — session store (user, roles, status)
- src/lib/features/auth/types.ts — User, Role, AuthStatus types
- src/lib/features/auth/login-form.svelte — reusable login form component

Redirect logic:
- Unauthenticated → /auth/login
- Wrong role → / (or appropriate dashboard)
- Already authenticated → dashboard
- Session expired → /auth/login with message

Dependencies: FE-03 (layouts + route groups exist)
Verification: bun run build && bun run check && bun run lint
```

---

## Track B: API Client → Data Table → Forms

### FE-05 — API client et mocks

```
Flesh out API client system per CAHIER_DE_CHARGE §8.

Skeleton exists at src/lib/api/. Extend:
- src/lib/api/client.ts — typed fetch wrapper with interceptors (auth token, refresh, error transform)
- src/lib/api/errors.ts — typed error classes (ApiError, ValidationError, AuthError, NotFoundError)
- src/lib/api/providers.ts — React context / Svelte store providers for API state

Create mock system:
- src/lib/mocks/handlers/index.ts — MSW handlers per domain
- src/lib/mocks/fixtures/ — sample data (users, offers, applications, etc.)
- src/lib/mocks/scenarios/ — test scenarios (loading, empty, error, success)
- src/lib/mocks/factories/ — data factories with faker

Document API patterns used by all subsequent features.

Dependencies: None (independent of FE-03/04)
Verification: bun run build && bun run check && bun run lint && bun run test:unit
```

### FE-06 — Data Table System

```
Build reusable data table system per CAHIER_DE_CHARGE FE-06.

shadcn DataTable already installed. Create:
- src/lib/components/features/data-table/data-table.svelte — wrapper with toolbar, search, pagination
- src/lib/components/features/data-table/toolbar.svelte — filter controls, column toggle, export
- src/lib/components/features/data-table/pagination.svelte — page nav with page size selector
- src/lib/components/features/data-table/columns/ — reusable column definitions
- src/lib/components/features/data-table/mobile-card.svelte — card layout for mobile views

Use @tanstack/table-core for state management.
Support: sorting, filtering, column visibility, row selection, responsive/mobile.
Wire to API mocks for demo data.

Dependencies: FE-05 (API client for data fetching pattern)
Verification: bun run build && bun run check
```

### FE-07 — Form System

```
Build form system per CAHIER_DE_CHARGE FE-07.

Create:
- src/lib/features/forms/form-builder.svelte — dynamic form from schema
- src/lib/features/forms/field-components/ — reusable fields (text, select, date, checkbox, radio, file)
- src/lib/features/forms/section.svelte — collapsible form section with header
- src/lib/features/forms/validation.ts — validation rules + error messages
- src/lib/features/forms/actions.ts — form action bar (save, cancel, delete, draft)
- FormDialog.svelte — form in dialog
- FormDrawer.svelte — form in drawer
- AlertDialog confirmation on destructive actions

Use shadcn Field/Label/Input/Select/Checkbox/Switch components.
Support: client-side validation, error display, dirty state, autosave drafts.

Dependencies: FE-05 (API patterns), shadcn components (already installed)
Verification: bun run build && bun run check
```

---

## Execution Order

```
Week 1:
  Track A: FE-03 Layouts ──→ FE-04 Session/Guards
  Track B: FE-05 API Client ──→ FE-06 Data Table

Week 2:
  Track A: FE-08 Public Site ──→ FE-09 Candidate Space
  Track B: FE-07 Form System

Week 3:
  FE-10 Company Space ──→ FE-11 Institution Space ──→ FE-12 Admin

Week 4:
  FE-13 Resources ──→ FE-14 Responsive/Accessibility ──→ FE-15 API Integration
```

## Notes

- Tracks A & B are fully parallel — no shared dependencies
- FE-08 through FE-12 depend on FE-04 (guards) and FE-06/07 (data + forms)
- FE-13+ are polish/integration — lowest priority
- All FE use worktree pattern: `git worktree add .worktrees/feat-FE-NN/frontend/ main`
