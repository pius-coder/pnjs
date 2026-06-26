<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { theme, type ThemeMode } from '$lib/stores/theme.js';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import type { Snippet } from 'svelte';

	let {
		children,
		nav,
		mobileNav,
		showThemeToggle = true,
		showMobileMenu = true,
		showAuth = true
	}: {
		children?: Snippet;
		nav?: Snippet;
		mobileNav?: Snippet;
		showThemeToggle?: boolean;
		showMobileMenu?: boolean;
		showAuth?: boolean;
	} = $props();

	let currentTheme: ThemeMode = $state('system');

	theme.subscribe((t) => {
		currentTheme = t;
	});

	function cycleTheme() {
		const modes: ThemeMode[] = ['light', 'dark', 'system'];
		const idx = modes.indexOf(currentTheme);
		theme.set(modes[(idx + 1) % modes.length]);
	}
</script>

<header class="flex h-14 items-center justify-between border-b px-4">
	<div class="flex items-center gap-4">
		{#if showMobileMenu}
			{@render mobileNav?.()}
		{/if}
		<a href="/" class="flex items-center gap-2 font-semibold">
			<span class="sr-only">Accueil</span>
			PNGS-IE
		</a>
		{#if nav}
			<NavigationMenu.Root class="hidden md:flex">
				{@render nav()}
			</NavigationMenu.Root>
		{/if}
	</div>
	<div class="flex items-center gap-2">
		{#if showThemeToggle}
			<Button variant="ghost" size="icon-sm" onclick={cycleTheme} aria-label="Basculer le thème">
				{#if currentTheme === 'dark'}
					<MoonIcon />
				{:else}
					<SunIcon />
				{/if}
			</Button>
		{/if}
		{#if showAuth}
			<Button variant="ghost" size="sm" href="/auth/login">Connexion</Button>
			<Button size="sm" href="/auth/register">Inscription</Button>
		{/if}
		{@render children?.()}
	</div>
</header>
