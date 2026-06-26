# Step 01: Analyze

**Task:** Implement FE-02 Catalogue Shadcn
**Started:** 2026-06-26T11:57:36Z

---

## Context Discovery

## Codebase Context

### Existing Design System Page
- **File**: `src/routes/(internal)/design-system/+page.svelte` (246 lines)
- Shows 11 sections: Theme, Buttons, Badges, Cards, Alerts, Input/Form, Dialog, Tabs, Skeleton/Tooltip, Surfaces (CSS), Typography
- **No code snippets, no prop tables, no organized catalog structure**
- Uses direct `.svelte` file imports (not barrel/index pattern)
- All surface demos use CSS classes on divs — no WindowSurface/etc Svelte components exist

### Material Surface Components — DO NOT EXIST
- `src/lib/components/material/` — directory does not exist
- `src/lib/components/layout/` — directory does not exist  
- `src/lib/components/features/` — directory does not exist
- `src/lib/components/patterns/` — directory does not exist
- Only CSS classes in `src/styles/material.css` (window-surface, panel-surface, floating-surface, inset-surface)
- Typography classes in `src/styles/typography.css` (page-title, window-title, section-title, etc.)

### Installed shadcn Components (56 directories)
accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, button-group, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, data-table, dialog, drawer, dropdown-menu, empty, field, form, hover-card, input, input-group, input-otp, item, kbd, label, menubar, native-select, navigation-menu, pagination, popover, progress, radio-group, range-calendar, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, spinner, switch, table, tabs, textarea, toggle, toggle-group, tooltip

### Missing Components (need composition/documentation)
- **date-picker**: Not installed — compose from Calendar + Popover + Button
- **combobox**: Not installed — compose from Command + Popover

### Import Patterns
1. **Direct `.svelte` import** (in page files): `import Button from '$lib/components/ui/button/button.svelte'`
2. **Barrel/index.js import** (in component composition): `import { Button } from '$lib/components/ui/button/index.js'`
3. **Namespace import**: `import * as Dialog from '$lib/components/ui/dialog/index.js'`

### Component Patterns (Svelte 5 Runes)
- `$props()` with destructuring for all props
- `$bindable(null)` for ref forwarding and open/value binding
- `$derived()` for computed values
- `WithElementRef<T>` utility type for ref types
- `{@render children?.()}` for snippet rendering
- `tv()` (tailwind-variants) for variant systems in Button, Badge, Sidebar-menu-button

### Dependencies
- `shadcn-svelte` ^1.3.0, `bits-ui` ^2.16.3, `svelte` ^5.56.1
- `@internationalized/date` for Calendar date handling
- `@lucide/svelte` ^1.21.0 for icons

### Spec Requirements (CAHIER_DE_CHARGE.md)
- **§15** (lines 664-745): 6 categories — Navigation (11), Actions (9), Formulaires (16), Données (9), Feedback (8), Contenus (5)
- **§FE-02** (lines 1709-1714): Installation, Validation, Documentation d'usage
- **§32** (lines 1547-1571): Route must show all shadcn components, light/dark modes, surfaces, data tables, forms, overlays, states, gradients, densities, typography, responsive behavior

## Documentation Insights

### DatePicker Composition
- Base: Calendar (bits-ui CalendarPrimitive) + Popover (bits-ui PopoverPrimitive) + Button
- `@internationalized/date` provides DateFormatter, getLocalTimeZone — already in use by Calendar
- Standard shadcn-svelte pattern: inline composition in catalog page, not separate component

### Combobox Composition
- Base: Command (bits-ui CommandPrimitive) + Popover
- Alternative: Select with custom styling
- `input-group.svelte` CSS already references `in-data-[slot=combobox-content]`

## Research Findings

### Page Organization Strategy
- Current page is ~250 lines with flat structure
- 56 components × multiple variants = will exceed 500+ lines
- Need section-level organization with category grouping
- Per CAHIER_DE_CHARGE §32: must show states (loading, empty, error) and responsive behavior

## Inferred Acceptance Criteria
- [ ] AC1: Design system page organized into 6 category sections (Navigation, Actions, Formulaires, Données, Feedback, Contenus)
- [ ] AC2: Each component shows: name, variant/state matrix, live interactive example, usage notes
- [ ] AC3: Missing components (DatePicker, Combobox) composed/documented using existing primitives
- [ ] AC4: Code snippets shown for each component usage
- [ ] AC5: All 56 components render without SSR errors (bun run build passes)
- [ ] AC6: Light and dark mode toggle works across all sections
- [ ] AC7: TypeScript and lint checks pass (bun run check, bun run lint)
- [ ] AC8: Page stays maintainable (<500 lines or split into imported category components)
