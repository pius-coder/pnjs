<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		blur = false,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { blur?: boolean } = $props();
</script>

<div
	bind:this={ref}
	class={cn('floating-surface', blur && 'floating-surface--blur', className)}
	{...restProps}
>
	{@render children?.()}
</div>
