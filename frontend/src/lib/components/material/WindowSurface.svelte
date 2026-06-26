<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		active = false,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { active?: boolean } = $props();
</script>

<div
	bind:this={ref}
	class={cn('window-surface', active && 'window-surface--active', className)}
	{...restProps}
>
	{@render children?.()}
</div>
