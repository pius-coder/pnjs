<script lang="ts">
	import { resolve } from '$app/paths';
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
					<NavigationMenu.Link href={resolve('/stages')}>Offres de stage</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link href={resolve('/entreprises')}>Entreprises</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link href={resolve('/actualites')}>Actualités</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link href={resolve('/aide')}>Aide</NavigationMenu.Link>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		{/snippet}
		{#snippet mobileNav()}
			<MobileNav>
				<a
					href={resolve('/stages')}
					class="text-foreground hover:text-muted-foreground px-3 py-2 text-sm">Offres de stage</a
				>
				<a
					href={resolve('/entreprises')}
					class="text-foreground hover:text-muted-foreground px-3 py-2 text-sm">Entreprises</a
				>
				<a
					href={resolve('/actualites')}
					class="text-foreground hover:text-muted-foreground px-3 py-2 text-sm">Actualités</a
				>
				<a
					href={resolve('/aide')}
					class="text-foreground hover:text-muted-foreground px-3 py-2 text-sm">Aide</a
				>
			</MobileNav>
		{/snippet}
	</AppHeader>
	<main class="flex-1">
		{@render children()}
	</main>
	<AppFooter />
</div>
