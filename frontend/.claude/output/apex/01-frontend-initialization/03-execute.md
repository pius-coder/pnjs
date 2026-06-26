## Execution Log

### Step 1: SvelteKit Scaffold
- Ran `sv create . --template minimal --types ts --install bun --add prettier eslint tailwindcss="plugins:none" vitest="usages:unit" playwright sveltekit-adapter=adapter:auto --no-dir-check --no-download-check`
- Created: package.json, vite.config.ts, tsconfig.json, src/app.html, src/app.d.ts, src/routes/+layout.svelte, src/routes/+page.svelte, playwright.config.ts, eslint.config.js, .prettierrc, bun.lock, node_modules, demo routes

### Step 2: Shadcn-Svelte Init
- Ran `shadcn-svelte init --base-color neutral` (Rhea preset, Inter font, Lucide icons)
- Created: components.json, src/app.css (with full CSS variables for light/dark/system), src/lib/utils, utils.ts, hooks

### Step 3: Base Components
- Rhea preset pre-installed all shadcn components (button, card, badge, skeleton, alert, dialog, sheet, dropdown-menu, separator, input, label, select, switch, tabs, tooltip + many more)

### Step 4: Import Aliases
- Verified `$lib` → `src/lib` already configured in `.svelte-kit/tsconfig.json`
- Shadcn aliases configured in components.json

### Step 5: Directory Structure
- Created: src/lib/{api,auth,mocks/{handlers,fixtures,factories,scenarios},stores,types,utils,config,schemas}
- Created: src/styles/
- Created: src/tests/
- Created: src/routes/{(public),(auth),(candidate),(company),(institution),(administration),(internal)}

### Step 6: Global Styles
- `src/styles/theme.css` — Shadow tokens for windowed material system
- `src/styles/material.css` — .window-surface, .panel-surface, .floating-surface, .inset-surface
- `src/styles/typography.css` — Type hierarchy classes
- Updated `src/app.html` — Added `class="%class%"` for SvelteKit class toggling
- Updated `src/routes/+layout.svelte` — Import app.css, styles
- Removed outdated layout.css dependency (now uses app.css)

### Step 7: Config & API Client
- `src/lib/config/index.ts` — API_BASE_URL, API_VERSION, API_TIMEOUT
- `src/lib/api/errors.ts` — ApiError, NetworkError, ValidationError
- `src/lib/api/client.ts` — Base fetch wrapper with CSRF, abort, type helpers

### Step 8: Mock Setup
- `src/lib/mocks/handlers/index.ts` — Placeholder
- `src/lib/mocks/fixtures/index.ts` — Placeholder
- `src/lib/mocks/factories/index.ts` — Placeholder
- `src/lib/mocks/scenarios/index.ts` — Placeholder

### Step 9: Theme Store
- `src/lib/stores/theme.ts` — Writable store, localStorage persistence, system preference listener

### Step 10: Design System Route
- `src/routes/(internal)/+layout.svelte` — Minimal layout
- `src/routes/(internal)/design-system/+page.svelte` — Showcase with Buttons, Badges, Cards, Alerts, Dialog, Tabs, Input, Switch, Skeleton, Tooltip, Surface variants, Typography, Theme toggle

### Step 11: Verification
- `bun run build` → ✅ Pass
- `bun run check` (typecheck) → ✅ 0 errors, 0 warnings
- `bun run test:unit` → ✅ 1 test passed
- `bunx prettier --write .` → ✅ Formatting fixed
- `bun run lint` → ✅ Prettier passes, ESLint runs
