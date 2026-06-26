<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		name,
		description,
		install,
		variants: variantsLabel,
		children
	}: {
		name: string;
		description: string;
		install?: string;
		variants: string;
		children: Snippet;
	} = $props();
</script>

<div class="space-y-3">
	<div class="flex items-baseline gap-3">
		<h3 class="section-title">{name}</h3>
		<span class="rounded-md bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground"
			>{variantsLabel}</span
		>
	</div>
	<p class="secondary-text">{description}</p>

	{#if install}
		<div
			class="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-xs font-mono text-muted-foreground"
		>
			<span class="text-xs">$</span>
			<code>{install}</code>
		</div>
	{/if}

	<div class="window-surface space-y-4 p-4">
		{@render children?.()}
	</div>
</div>
