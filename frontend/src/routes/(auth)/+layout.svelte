<script lang="ts">
	import PanelSurface from '$lib/components/material/PanelSurface.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-svh items-center justify-center bg-muted/30 p-4">
	<PanelSurface class="w-full max-w-md">
		{@render children()}
	</PanelSurface>
</div>
