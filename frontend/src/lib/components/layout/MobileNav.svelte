<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { theme, type ThemeMode } from '$lib/stores/theme.js';
	import MenuIcon from '@lucide/svelte/icons/menu';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import type { Snippet } from 'svelte';

	let {
		children,
		showThemeToggle = true
	}: {
		children?: Snippet;
		showThemeToggle?: boolean;
	} = $props();

	let open = $state(false);

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

<Sheet.Root bind:open>
	<Sheet.Trigger>
		<Button variant="ghost" size="icon-sm" class="md:hidden" aria-label="Menu">
			<MenuIcon />
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left">
		<Sheet.Header>
			<Sheet.Title>PNGS-IE</Sheet.Title>
			<Sheet.Description>Menu de navigation</Sheet.Description>
		</Sheet.Header>
		<nav class="flex flex-col gap-2 p-4">
			{@render children?.()}
		</nav>
		<div class="mt-auto border-t p-4">
			{#if showThemeToggle}
				<Button variant="outline" size="sm" class="w-full" onclick={cycleTheme}>
					{#if currentTheme === 'dark'}
						<MoonIcon class="mr-2" />
					{:else}
						<SunIcon class="mr-2" />
					{/if}
					Thème : {currentTheme === 'light'
						? 'Clair'
						: currentTheme === 'dark'
							? 'Sombre'
							: 'Système'}
				</Button>
			{/if}
			<div class="mt-4 flex flex-col gap-2">
				<Button variant="ghost" size="sm" href="/auth/login" class="w-full">Connexion</Button>
				<Button size="sm" href="/auth/register" class="w-full">Inscription</Button>
			</div>
		</div>
	</Sheet.Content>
</Sheet.Root>
