<script lang="ts">
	import { theme, type ThemeMode } from '$lib/stores/theme';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';

	import CategoryNavigation from '$lib/components/features/catalogue/category-navigation.svelte';
	import CategoryActions from '$lib/components/features/catalogue/category-actions.svelte';
	import CategoryFormulaires from '$lib/components/features/catalogue/category-formulaires.svelte';
	import CategoryDonnees from '$lib/components/features/catalogue/category-donnees.svelte';
	import CategoryFeedback from '$lib/components/features/catalogue/category-feedback.svelte';
	import CategoryContenus from '$lib/components/features/catalogue/category-contenus.svelte';

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
	<h2 class="section-title mb-4">Surfaces</h2>
	<div class="grid gap-4 md:grid-cols-2">
		<div class="window-surface p-6">
			<p class="font-medium">Window Surface</p>
			<p class="secondary-text">Main content surface with full shadow</p>
		</div>
		<div class="panel-surface p-6">
			<p class="font-medium">Panel Surface</p>
			<p class="secondary-text">Secondary surface with contact shadow</p>
		</div>
		<div class="floating-surface p-6">
			<p class="font-medium">Floating Surface</p>
			<p class="secondary-text">Elevated surface for overlays</p>
		</div>
		<div class="inset-surface p-6">
			<p class="font-medium">Inset Surface</p>
			<p class="secondary-text">Recessed surface for toolbars</p>
		</div>
	</div>
</section>

<Separator class="my-8" />

<section class="mb-12">
	<h2 class="section-title mb-4">Typography</h2>
	<div class="space-y-2">
		<p class="page-title">Page Title (3xl bold)</p>
		<p class="window-title">Window Title (lg semibold)</p>
		<p class="section-title">Section Title (base semibold)</p>
		<p class="subtitle">Subtitle (sm medium, muted)</p>
		<p class="body-text">Body text at default size with comfortable line height.</p>
		<p class="secondary-text">Secondary text in muted color.</p>
		<p class="caption">Caption text (xs)</p>
		<p class="metadata">Metadata label (xs)</p>
		<p class="stat-value">42,500</p>
	</div>
</section>
