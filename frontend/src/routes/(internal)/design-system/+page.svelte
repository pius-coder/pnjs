<script lang="ts">
	import { theme, type ThemeMode } from '$lib/stores/theme';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import WindowSurface from '$lib/components/material/WindowSurface.svelte';
	import WindowHeader from '$lib/components/material/WindowHeader.svelte';
	import WindowBody from '$lib/components/material/WindowBody.svelte';
	import WindowFooter from '$lib/components/material/WindowFooter.svelte';
	import PanelSurface from '$lib/components/material/PanelSurface.svelte';
	import FloatingSurface from '$lib/components/material/FloatingSurface.svelte';
	import InsetSurface from '$lib/components/material/InsetSurface.svelte';

	import CategoryNavigation from '$lib/components/features/catalogue/category-navigation.svelte';
	import CategoryActions from '$lib/components/features/catalogue/category-actions.svelte';
	import CategoryFormulaires from '$lib/components/features/catalogue/category-formulaires.svelte';
	import CategoryDonnees from '$lib/components/features/catalogue/category-donnees.svelte';
	import CategoryFeedback from '$lib/components/features/catalogue/category-feedback.svelte';
	import CategoryContenus from '$lib/components/features/catalogue/category-contenus.svelte';

	let activeSurface = $state<'a' | 'b'>('a');

	function setMode(m: ThemeMode) {
		theme.set(m);
	}
</script>

<div class="page-title">Design System</div>
<p class="secondary-text">Catalogue complet des composants shadcn-svelte pour PNGS-IE.</p>

<Separator class="my-8" />

<section class="mb-12">
	<h2 class="section-title mb-4">Theme</h2>
	<div class="flex gap-2">
		<Button onclick={() => setMode('light')}>Light</Button>
		<Button onclick={() => setMode('dark')}>Dark</Button>
		<Button onclick={() => setMode('system')}>System</Button>
	</div>
</section>

<Separator class="my-8" />

<CategoryNavigation />

<Separator class="my-8" />

<CategoryActions />

<Separator class="my-8" />

<CategoryFormulaires />

<Separator class="my-8" />

<CategoryDonnees />

<Separator class="my-8" />

<CategoryFeedback />

<Separator class="my-8" />

<CategoryContenus />

<Separator class="my-8" />

<section class="mb-12">
	<h2 class="section-title mb-4">Material Surfaces</h2>
	<p class="secondary-text mb-6">
		Windowed Material System — 4-layer macOS-inspired shadows, inner highlight ring, compact header.
		See CAHIER_DE_CHARGE.md §10-12.
	</p>

	<h3 class="subtitle mb-3">Window — Active vs Inactive</h3>
	<div class="grid gap-6 md:grid-cols-2 mb-8">
		<button type="button" class="text-left cursor-pointer" onclick={() => (activeSurface = 'a')}>
			<WindowSurface active={activeSurface === 'a'}>
				<WindowHeader>
					<span class="window-title window-title--active">Active Window</span>
				</WindowHeader>
				<WindowBody>
					<p class="body-text mb-2">4 outer shadow layers + inner highlight ring (::after).</p>
					<p class="secondary-text">Active shadow: ambience, near glow, hairline, dark edge.</p>
				</WindowBody>
			</WindowSurface>
		</button>
		<button type="button" class="text-left cursor-pointer" onclick={() => (activeSurface = 'b')}>
			<WindowSurface active={activeSurface === 'b'}>
				<WindowHeader>
					<span class="window-title">Inactive Window</span>
				</WindowHeader>
				<WindowBody>
					<p class="body-text mb-2">Same structure, reduced shadow depth.</p>
					<p class="secondary-text">
						Click to activate. Active gets elevated shadows (50px 80px ambience).
					</p>
				</WindowBody>
			</WindowSurface>
		</button>
	</div>

	<h3 class="subtitle mb-3">Full Window Composition</h3>
	<WindowSurface>
		<WindowHeader>
			<span class="window-title">Document Editor</span>
		</WindowHeader>
		<WindowBody>
			<p class="body-text mb-2">
				Compact header with macOS gradient (2.5%→5% darken) and bottom highlight shadow.
			</p>
			<p class="secondary-text">
				The inner ring wraps the entire surface via <code>::after</code> pseudo-element. No CSS border
				— edges defined by shadow hairlines and ring (macOS pattern).
			</p>
		</WindowBody>
		<WindowFooter>
			<Button variant="ghost" size="sm">Cancel</Button>
			<Button size="sm">Save</Button>
		</WindowFooter>
	</WindowSurface>
</section>

<section class="mb-12">
	<h2 class="section-title mb-4">Surface Levels</h2>
	<p class="secondary-text mb-4">
		Four elevation levels. Each has distinct shadow depth, ring intensity, and background token.
	</p>
	<div class="grid gap-4 md:grid-cols-2">
		<WindowSurface>
			<WindowBody>
				<p class="font-medium">Window Surface</p>
				<p class="secondary-text text-xs mt-1">
					4-layer shadow / inner ring / card bg / <code>--radius-lg</code>
				</p>
				<p class="secondary-text mt-2">
					Main content surface. Deepest shadow, full inner highlight.
				</p>
			</WindowBody>
		</WindowSurface>
		<PanelSurface>
			<WindowBody>
				<p class="font-medium">Panel Surface</p>
				<p class="secondary-text text-xs mt-1">
					contact shadow / inner ring / card bg / <code>--radius-md</code>
				</p>
				<p class="secondary-text mt-2">Secondary surface. Flatter, lighter shadow.</p>
			</WindowBody>
		</PanelSurface>
		<FloatingSurface>
			<WindowBody>
				<p class="font-medium">Floating Surface</p>
				<p class="secondary-text text-xs mt-1">
					4-layer deep shadow / ring / popover bg / <code>--radius-lg</code>
				</p>
				<p class="secondary-text mt-2">Overlays, dialogs, dropdowns. Highest elevation.</p>
			</WindowBody>
		</FloatingSurface>
		<InsetSurface>
			<WindowBody>
				<p class="font-medium">Inset Surface</p>
				<p class="secondary-text text-xs mt-1">
					inner ring only / muted bg / <code>--radius-md</code>
				</p>
				<p class="secondary-text mt-2">
					Recessed toolbars, filters, search. Sits below content plane.
				</p>
			</WindowBody>
		</InsetSurface>
	</div>
</section>

<section class="mb-12">
	<h2 class="section-title mb-4">FloatingSurface with Blur</h2>
	<p class="secondary-text mb-4">
		Backdrop blur uses macOS <code>blur(30px) saturate(1.5)</code> with 75% translucent popover background.
		The blurred surface sits over a gradient background to demonstrate the frosted-glass effect.
	</p>
	<div
		class="relative grid gap-4 md:grid-cols-2 p-8 rounded-xl"
		style="background: linear-gradient(135deg, oklch(0.8 0.15 250), oklch(0.7 0.1 180), oklch(0.75 0.12 310));"
	>
		<FloatingSurface>
			<WindowBody>
				<p class="font-medium">Standard</p>
				<p class="secondary-text">Solid popover background</p>
			</WindowBody>
		</FloatingSurface>
		<FloatingSurface blur>
			<WindowBody>
				<p class="font-medium">Blurred</p>
				<p class="secondary-text">Frosted glass — backdrop blurs the gradient behind</p>
			</WindowBody>
		</FloatingSurface>
	</div>
</section>

<Separator class="my-8" />

<section class="mb-12">
	<h2 class="section-title mb-4">Typography</h2>
	<div class="window-surface p-5 space-y-2">
		<p class="page-title">Page Title (3xl bold)</p>
		<p class="window-title">Window Title (sm semibold, muted)</p>
		<p class="window-title window-title--active">Window Title Active (sm semibold, fg)</p>
		<p class="section-title">Section Title (base semibold)</p>
		<p class="subtitle">Subtitle (sm medium, muted)</p>
		<p class="body-text">Body text at default size with comfortable line height.</p>
		<p class="secondary-text">Secondary text in muted color.</p>
		<p class="caption">Caption text (xs)</p>
		<p class="metadata">Metadata label (xs)</p>
		<p class="stat-value">42,500</p>
	</div>
</section>
