<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { theme, type ThemeMode } from '$lib/stores/theme.js';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import type { Snippet } from 'svelte';

	let {
		menu,
		header,
		footer,
		side = 'left' as 'left' | 'right',
		variant = 'sidebar' as 'sidebar' | 'floating' | 'inset',
		collapsible = 'icon' as 'offcanvas' | 'icon' | 'none'
	}: {
		menu?: Snippet;
		header?: Snippet;
		footer?: Snippet;
		side?: 'left' | 'right';
		variant?: 'sidebar' | 'floating' | 'inset';
		collapsible?: 'offcanvas' | 'icon' | 'none';
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

<Sidebar.Root {side} {variant} {collapsible}>
	{#if header}
		<Sidebar.Header>
			{@render header()}
		</Sidebar.Header>
	{/if}
	<Sidebar.Content>
		{@render menu?.()}
	</Sidebar.Content>
	<Sidebar.Footer>
		{#if footer}
			{@render footer()}
		{/if}
		<Button
			variant="ghost"
			size="icon-sm"
			onclick={cycleTheme}
			aria-label="Basculer le thème"
			class="self-center"
		>
			{#if currentTheme === 'dark'}
				<MoonIcon />
			{:else}
				<SunIcon />
			{/if}
		</Button>
	</Sidebar.Footer>
</Sidebar.Root>
