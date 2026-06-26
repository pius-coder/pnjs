<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		type = 'button',
		child = undefined,
		children,
		...restProps
	}: DialogPrimitive.TriggerProps = $props();
</script>

{#if child}
	<DialogPrimitive.Trigger bind:ref data-slot="dialog-trigger" {type} {child} {...restProps} />
{:else}
	<DialogPrimitive.Trigger bind:ref data-slot="dialog-trigger" {type} {...restProps}>
		{@render children?.()}
	</DialogPrimitive.Trigger>
{/if}
