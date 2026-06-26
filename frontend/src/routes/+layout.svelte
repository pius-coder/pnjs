<script lang="ts">
	import '../app.css';
	import '../styles/theme.css';
	import '../styles/material.css';
	import '../styles/typography.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
