<script lang="ts">
	import { resolve } from '$app/paths';
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
				<span class="text-sm font-semibold">Administration</span>
			</div>
		{/snippet}
		{#snippet menu()}
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent="Tableau de bord">
						{#snippet child({ props })}
							<a href={resolve('/administration/dashboard')} {...props}>Tableau de bord</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent="Utilisateurs">
						{#snippet child({ props })}
							<a href={resolve('/administration/utilisateurs')} {...props}>Utilisateurs</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent="Établissements">
						{#snippet child({ props })}
							<a href={resolve('/administration/etablissements')} {...props}>Établissements</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent="Entreprises">
						{#snippet child({ props })}
							<a href={resolve('/administration/entreprises')} {...props}>Entreprises</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent="Stages">
						{#snippet child({ props })}
							<a href={resolve('/administration/stages')} {...props}>Stages</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent="Paramètres">
						{#snippet child({ props })}
							<a href={resolve('/administration/parametres')} {...props}>Paramètres</a>
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
			<span class="text-sm font-medium">Espace Administration</span>
		</header>
		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>
