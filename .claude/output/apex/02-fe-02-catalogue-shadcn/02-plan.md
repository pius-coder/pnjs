# Step 02: Plan

**Task:** Implement FE-02 Catalogue Shadcn
**Started:** 2026-06-26T11:57:36Z

---

## Implementation Plan: FE-02 Catalogue Shadcn

### Overview

Refactor the design system page into 6 category sections with per-component documentation (live examples, variant matrices, props tables, code snippets, usage notes). Create reusable catalogue components in `src/lib/components/features/catalogue/` to keep the page manageable.

### Prerequisites
- [x] All 56 shadcn components installed (verified in analysis)
- [ ] AGENTS.md DOX update for new `features/catalogue/` directory

---

### Architecture Decision: Split into category components

**Decision**: Create 6 category `.svelte` files imported by `+page.svelte`, plus a shared `ComponentBlock` wrapper for consistent component documentation layout.

**Reasoning**:
- 56 components × ~25 lines avg = ~1400 lines for components alone
- Plus surfaces, typography, theme sections = ~200 lines
- Single page would exceed 1600+ lines — unmaintainable
- Category files average ~200-300 lines each — manageable

---

### File Changes

#### New File: `src/lib/components/features/catalogue/component-block.svelte`
- Reusable wrapper for component documentation sections
- Props: `name` (string), `description` (string), `variants` (string), `install` (string)
- Structure:
  - h3 with component name + badge showing category
  - Description paragraph
  - `<div class="window-surface p-4 space-y-4">`
    - Variant grid slot (default slot for live examples)
    - Props table (standardized format)
    - Code snippet `<pre><code>` block
    - Usage notes (secondary-text)
    - Install command (copyable)
  - Uses `cn()` and surface CSS classes

#### New File: `src/lib/components/features/catalogue/category-actions.svelte`
- Documents 9 components: Button, ButtonGroup, DropdownMenu, ContextMenu, Command, Toggle, ToggleGroup, Tooltip, Kbd
- Each component gets a ComponentBlock with:
  - Variant showcase (all variants in flex-wrap grid)
  - Props table (name, type, default)
  - Code example
  - Usage notes

#### New File: `src/lib/components/features/catalogue/category-navigation.svelte`
- Documents 11 components: Sidebar, NavigationMenu, Breadcrumb, Tabs, Menubar, Sheet, Drawer, Collapsible, ScrollArea, Resizable
- Same ComponentBlock pattern
- Tabs and Sheet shown with interactive state

#### New File: `src/lib/components/features/catalogue/category-formulaires.svelte`
- Documents 16 components: Field, Label, Input, InputGroup, InputOTP, Textarea, Checkbox, RadioGroup, Select, NativeSelect, Combobox (composed), Switch, Slider, Calendar, DatePicker (composed), RangeCalendar
- Combobox: compose from Command + Popover + Input
- DatePicker: compose from Calendar + Popover + Button
- Calendar/DatePicker shown inline with `@internationalized/date`

#### New File: `src/lib/components/features/catalogue/category-donnees.svelte`
- Documents 9 components: DataTable, Table, Pagination, Badge, Avatar, Progress, Chart, Item, HoverCard
- DataTable shown with sample columns and rows
- Chart shown with basic sample data (uses layerchart)
- HoverCard with trigger + content

#### New File: `src/lib/components/features/catalogue/category-feedback.svelte`
- Documents 8 components: Alert, AlertDialog, Empty, Skeleton, Spinner, Sonner, Dialog, Popover
- Dialog with bind:open for interactive demo
- Sonner with toast trigger
- AlertDialog with confirm/cancel
- Empty + Skeleton + Spinner as loading states

#### New File: `src/lib/components/features/catalogue/category-contenus.svelte`
- Documents 5 components: Card, Accordion, Carousel, AspectRatio, Separator
- Card with header/content/footer variants
- Accordion with multiple items
- Carousel with embla (already installed)
- AspectRatio with 16/9 example

#### Modify: `src/routes/(internal)/design-system/+page.svelte`
- Remove all inline component demos (lines 44-205)
- Keep: Theme section, Surfaces section, Typography section
- Add imports for all 6 category components
- Render each category in order (Navigation, Actions, Formulaires, Données, Feedback, Contenus)
- Each category wrapped in `<section> with `<Separator>` between
- Expected final length: ~150 lines (clean + maintainable)

#### Update: `frontend/AGENTS.md`
- Add `features/catalogue/` to DOX component hierarchy
- Document new `ComponentBlock` pattern

---

### ComponentBlock Template Design

```svelte
<script lang="ts">
let { name, description, install, variants, children }: {
    name: string;
    description: string;
    install?: string;
    variants: string;
    children?: import('svelte').Snippet;
} = $props();
</script>

<div class="space-y-2">
  <h3 class="section-title">{name}</h3>
  <p class="secondary-text">{description}</p>
  <span class="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium">{variants}</span>
  
  <div class="window-surface p-4 space-y-4">
    {@render children?.()}
  </div>
</div>
```

---

### Component Documentation Pattern (per component)

Each component section in a category file follows this pattern:

```svelte
<ComponentBlock
  name="Button"
  description="Displays a button element with multiple variants and sizes."
  install="npx shadcn-svelte@latest add button"
  variants="default | secondary | destructive | outline | ghost | link"
>
  <!-- Variant grid -->
  <div class="flex flex-wrap gap-2">
    <Button>Default</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
  <div class="flex flex-wrap gap-2">
    <Button size="sm">Small</Button>
    <Button size="lg">Large</Button>
    <Button size="icon"><Plus /></Button>
    <Button disabled>Disabled</Button>
  </div>
  
  <!-- Props table -->
  <div class="inset-surface overflow-x-auto">
    <table class="w-full text-sm">
      <thead><tr class="border-b"><th class="p-2 text-left">Prop</th><th class="p-2 text-left">Type</th><th class="p-2 text-left">Default</th></tr></thead>
      <tbody>
        <tr class="border-b"><td class="p-2">variant</td><td class="p-2 font-mono">"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"</td><td class="p-2 font-mono">"default"</td></tr>
        <tr class="border-b"><td class="p-2">size</td><td class="p-2 font-mono">"default" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"</td><td class="p-2 font-mono">"default"</td></tr>
        <tr class="border-b"><td class="p-2">disabled</td><td class="p-2 font-mono">boolean</td><td class="p-2 font-mono">false</td></tr>
      </tbody>
    </table>
  </div>
  
  <!-- Code snippet -->
  <pre class="inset-surface overflow-x-auto text-sm"><code>{`<Button variant="default">Click me</Button>`}</code></pre>
  
  <!-- Usage notes -->
  <div class="rounded-md bg-muted/50 p-3 text-sm">
    <p class="font-medium mb-1">Usage notes</p>
    <ul class="list-disc pl-4 space-y-1 secondary-text">
      <li>Use <code class="text-xs">variant="destructive"</code> for irreversible actions</li>
      <li>Use <code class="text-xs">size="icon"</code> with Lucide icons for icon-only buttons</li>
    </ul>
  </div>
</ComponentBlock>
```

---

### Acceptance Criteria Mapping
- [x] AC1: 6 category files created, each covering its spec component list
- [x] AC2: Each component block includes variants, props table, live example, code, notes
- [x] AC3: DatePicker and Combobox composed from Calendar+Popover+Button and Command+Popover
- [x] AC4: Code snippets shown in `<pre>` blocks for each component
- [x] AC5: All 56 components rendered in catalog, build will validate no SSR errors
- [x] AC6: Theme section preserved in +page.svelte, dark/light toggle works
- [x] AC7: Will run `bun run check` and `bun run lint` after implementation
- [x] AC8: Page split into 6 imported files, each <300 lines, main page <200 lines

---

### Risks & Considerations
- **Risk**: Some components require interactive state (Dialog, Sheet, Drawer) — mitigated by using `$state()` per category file
- **Risk**: Sonner requires `toast` import from sonner — use inline trigger example
- **Risk**: Chart requires sample data — use minimal hardcoded dataset
- **Risk**: Sidebar component requires specific sidebar context — show inline without sidebar provider
- **Risk**: DataTable requires column definitions — use inline example with sample columns
- **Risk**: ComponentBlock may need to be flexible for components with unusual structures — keep it simple, use slot for children

---

### Implementation Order
1. Create `features/catalogue/` directory
2. Create `component-block.svelte` (shared shell)
3. Create `category-actions.svelte` (start with simplest category)
4. Create `category-navigation.svelte`
5. Create `category-contenus.svelte`
6. Create `category-feedback.svelte`
7. Create `category-donnees.svelte`
8. Create `category-formulaires.svelte` (most complex — save for last)
9. Refactor `+page.svelte` to import categories
10. Update `frontend/AGENTS.md`
11. Run `bun run build`, `bun run check`, `bun run lint`

---

## Step Complete
**Status:** ✓ Complete
**Files to create:** 8 (component-block + 6 categories + AGENTS.md update)
**Files to modify:** 1 (+page.svelte)
**Next:** step-03-execute.md
**Timestamp:** 2026-06-26T11:59:00Z
