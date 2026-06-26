# PLAN — Frontend PNGS-IE

## Backlog

### FE-00 — Initialization (Phase 1 — Foundation)

**Scope:**

- Initialize SvelteKit project with TypeScript, Bun, Tailwind CSS
- Initialize Shadcn-Svelte with its official CLI
- Configure ESLint, Prettier, Playwright, Vitest
- Set up import aliases, theme variables, global styles, light/dark/system modes
- Configure API client skeleton, mock setup, error handling
- Create internal design system route (`/internal/design-system`)
- Ensure project builds, lints, typechecks, and tests pass

**Dependencies:** None (first step)

**Acceptance criteria:**

- `bun run dev` starts the dev server
- `bun run build` passes without errors
- `bun run lint` passes
- `bun run check` (typecheck) passes
- Shadcn-Svelte components render correctly
- Dark/light/system theme switching works
- Design system route is accessible at `/internal/design-system`
- Responsive layout works on mobile/tablet/desktop

### FE-01 — Windowed Material Foundation

**Scope:**

- Depth tokens (shadows, rings, borders, gradients) in theme.css
- Surface CSS classes with ring/inset-border effects in material.css
- WindowSurface, WindowHeader, WindowBody, WindowFooter Svelte components
- PanelSurface, FloatingSurface (with blur), InsetSurface Svelte components
- All surfaces documented in design system route
- Light/dark/system mode support via existing theme store

**Status:** Done

### FE-02 — Catalogue Shadcn

**Scope:**

- 6 category components (Navigation, Actions, Formulaires, Données, Feedback, Contenus)
- ComponentBlock.svelte shared wrapper with install command and live demo
- 56 installed shadcn-svelte components documented
- DatePicker/Combobox documented as compositions

**Status:** Done

### FE-03 — Layouts

**Scope:**

- Route group layouts for (public), (auth), (candidate), (company), (institution), (administration)
- Public layout: AppHeader with NavigationMenu, theme toggle, auth buttons; AppFooter
- Auth layout: centered PanelSurface card
- Sidebar layouts: Sidebar.Provider + AppSidebar with nav items + Sidebar.Inset content area
- Shared components: AppHeader, AppSidebar, AppFooter, MobileNav

**Status:** Done

### FE-04 — Session et guards

_Planned_

### FE-05 — API client et mocks

_Planned_

### FE-06 — Data Table System

_Planned_

### FE-07 — Form System

_Planned_

### FE-08 — Site public

_Planned_

### FE-09 — Espace candidat

_Planned_

### FE-10 — Espace entreprise

_Planned_

### FE-11 — Espace établissement

_Planned_

### FE-12 — Administration

_Planned_

### FE-13 — Ressources et mentorat

_Planned_

### FE-14 — Responsive et accessibilité

_Planned_

### FE-15 — Intégration API

_Planned_
