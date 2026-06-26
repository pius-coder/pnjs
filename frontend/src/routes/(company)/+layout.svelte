<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/layout/AppSidebar.svelte';
	import { SidebarTrigger } from '$lib/components/ui/sidebar/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar>
		{#snippet header()}
			<div class="flex items-center gap-2 px-2">
				<SidebarTrigger />
				<span class="text-sm font-semibold">Entreprise</span>
			</div>
		{/snippet}
		{#snippet menu()}
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent="Tableau de bord">
						{#snippet child({ props })}
							<a href="/company/dashboard" {...props}>Tableau de bord</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent="Offres de stage">
						{#snippet child({ props })}
							<a href="/company/offres" {...props}>Offres de stage</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent="Candidatures">
						{#snippet child({ props })}
							<a href="/company/candidatures" {...props}>Candidatures</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent="Équipe">
						{#snippet child({ props })}
							<a href="/company/equipe" {...props}>Équipe</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent="Messages">
						{#snippet child({ props })}
							<a href="/company/messages" {...props}>Messages</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent="Paramètres">
						{#snippet child({ props })}
							<a href="/company/parametres" {...props}>Paramètres</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		{/snippet}
	</AppSidebar>
	<Sidebar.Inset>
		<header class="flex h-14 items-center gap-2 border-b px-4">
			<SidebarTrigger class="-ms-2 md:hidden" />
			<Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />
			<span class="text-sm font-medium">Espace Entreprise</span>
		</header>
		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>
