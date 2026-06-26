<script lang="ts">
	import AppHeader from '$lib/components/layout/AppHeader.svelte';
	import AppFooter from '$lib/components/layout/AppFooter.svelte';
	import MobileNav from '$lib/components/layout/MobileNav.svelte';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';

	let { children } = $props();
</script>

<div class="flex min-h-svh flex-col">
	<AppHeader>
		{#snippet nav()}
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Link href="/stages">Offres de stage</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link href="/entreprises">Entreprises</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link href="/actualites">Actualités</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link href="/aide">Aide</NavigationMenu.Link>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		{/snippet}
		{#snippet mobileNav()}
			<MobileNav>
				<a href="/stages" class="text-foreground hover:text-muted-foreground px-3 py-2 text-sm"
					>Offres de stage</a
				>
				<a href="/entreprises" class="text-foreground hover:text-muted-foreground px-3 py-2 text-sm"
					>Entreprises</a
				>
				<a href="/actualites" class="text-foreground hover:text-muted-foreground px-3 py-2 text-sm"
					>Actualités</a
				>
				<a href="/aide" class="text-foreground hover:text-muted-foreground px-3 py-2 text-sm"
					>Aide</a
				>
			</MobileNav>
		{/snippet}
	</AppHeader>
	<main class="flex-1">
		{@render children()}
	</main>
	<AppFooter />
</div>
