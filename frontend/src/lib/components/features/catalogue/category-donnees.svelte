<script lang="ts">
	import ComponentBlock from './component-block.svelte';
	import TableRoot from '$lib/components/ui/table/table.svelte';
	import TableBody from '$lib/components/ui/table/table-body.svelte';
	import TableCaption from '$lib/components/ui/table/table-caption.svelte';
	import TableCell from '$lib/components/ui/table/table-cell.svelte';
	import TableFooter from '$lib/components/ui/table/table-footer.svelte';
	import TableHead from '$lib/components/ui/table/table-head.svelte';
	import TableHeader from '$lib/components/ui/table/table-header.svelte';
	import TableRow from '$lib/components/ui/table/table-row.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import AvatarRoot from '$lib/components/ui/avatar/avatar.svelte';
	import AvatarImage from '$lib/components/ui/avatar/avatar-image.svelte';
	import AvatarFallback from '$lib/components/ui/avatar/avatar-fallback.svelte';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import HoverCardRoot from '$lib/components/ui/hover-card/hover-card.svelte';
	import HoverCardContent from '$lib/components/ui/hover-card/hover-card-content.svelte';
	import HoverCardTrigger from '$lib/components/ui/hover-card/hover-card-trigger.svelte';
	import ItemRoot from '$lib/components/ui/item/item.svelte';
	import ItemHeader from '$lib/components/ui/item/item-header.svelte';
	import ItemContent from '$lib/components/ui/item/item-content.svelte';
	import ItemTitle from '$lib/components/ui/item/item-title.svelte';
	import ItemDescription from '$lib/components/ui/item/item-description.svelte';
	import ItemActions from '$lib/components/ui/item/item-actions.svelte';
	import ItemMedia from '$lib/components/ui/item/item-media.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
</script>

<section class="space-y-8">
	<h2 class="window-title">Données</h2>
	<p class="secondary-text">Composants d'affichage et de manipulation de données.</p>

	<Separator class="my-6" />

	<!-- DataTable -->
	<ComponentBlock
		name="DataTable"
		description="Feature-rich data table with sorting, filtering, pagination (uses @tanstack/table-core)."
		install="npx shadcn-svelte@latest add data-table"
		variants="—"
	>
		<p class="text-sm text-muted-foreground">
			DataTable utilise <code>@tanstack/table-core</code> pour créer des tables avec tri, filtrage, pagination,
			sélection de colonnes. Voir TanStack Table pour l'API complète.
		</p>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<script lang="ts">
import { createSvelteTable } from '$lib/components/ui/data-table/index.js';
const table = createSvelteTable({ columns, data });
&lt;/script>`}</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Notes d'utilisation</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li>Nécessite <code class="text-xs">@tanstack/table-core</code> (déjà installé)</li>
				<li>
					Composants internes: <code class="text-xs">FlexRender</code>,
					<code class="text-xs">renderComponent</code>, <code class="text-xs">renderSnippet</code>
				</li>
				<li>
					Utiliser avec les composants <code class="text-xs">&lt;Table&gt;</code> pour le rendu
				</li>
			</ul>
		</div>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Table -->
	<ComponentBlock
		name="Table"
		description="Basic table component for displaying tabular data."
		install="npx shadcn-svelte@latest add table"
		variants="—"
	>
		<TableRoot>
			<TableCaption>Liste des utilisateurs</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead class="w-[100px]">Nom</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Rôle</TableHead>
					<TableHead class="text-right">Statut</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Jean Dupont</TableCell>
					<TableCell>jean@example.com</TableCell>
					<TableCell>Étudiant</TableCell>
					<TableCell class="text-right"><Badge variant="outline">Actif</Badge></TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Marie Curie</TableCell>
					<TableCell>marie@example.com</TableCell>
					<TableCell>Tuteur</TableCell>
					<TableCell class="text-right"><Badge variant="secondary">En attente</Badge></TableCell>
				</TableRow>
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colspan={4} class="text-sm text-muted-foreground">2 utilisateurs</TableCell>
				</TableRow>
			</TableFooter>
		</TableRoot>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<TableRoot>
  <TableHeader>
    <TableRow>
      <TableHead>Nom</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Value</TableCell>
      <TableCell>Value</TableCell>
    </TableRow>
  </TableBody>
</TableRoot>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Pagination -->
	<ComponentBlock
		name="Pagination"
		description="Page navigation for paginated content."
		install="npx shadcn-svelte@latest add pagination"
		variants="—"
	>
		<p class="text-sm text-muted-foreground">
			Pagination utilise bits-ui pour la navigation paginée. Voir les composants individuels.
		</p>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious /></PaginationItem>
    <PaginationItem><PaginationLink isActive>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext /></PaginationItem>
  </PaginationContent>
</Pagination>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Badge -->
	<ComponentBlock
		name="Badge"
		description="Inline label or status indicator with multiple variants."
		install="npx shadcn-svelte@latest add badge"
		variants="default | secondary | destructive | outline | ghost | link"
	>
		<div class="flex flex-wrap gap-2">
			<Badge>Default</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="destructive">Destructive</Badge>
			<Badge variant="outline">Outline</Badge>
			<Badge variant="ghost">Ghost</Badge>
			<Badge variant="link">Link</Badge>
		</div>
		<div class="inset-surface overflow-x-auto">
			<table class="w-full text-sm">
				<thead
					><tr class="border-b"
						><th class="p-2 text-left font-medium">Prop</th><th class="p-2 text-left font-medium"
							>Type</th
						><th class="p-2 text-left font-medium">Default</th></tr
					></thead
				>
				<tbody>
					<tr
						><td class="p-2">variant</td><td class="p-2 font-mono"
							>"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"</td
						><td class="p-2 font-mono">"default"</td></tr
					>
				</tbody>
			</table>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Badge>Nouveau</Badge>
<Badge variant="outline">Brouillon</Badge>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Avatar -->
	<ComponentBlock
		name="Avatar"
		description="User avatar with image fallback support and group display."
		install="npx shadcn-svelte@latest add avatar"
		variants="—"
	>
		<div class="flex flex-wrap gap-4 items-center">
			<AvatarRoot>
				<AvatarImage src="https://github.com/shadcn.png" alt="User" />
				<AvatarFallback>CN</AvatarFallback>
			</AvatarRoot>
			<AvatarRoot>
				<AvatarFallback class="bg-primary text-primary-foreground">JD</AvatarFallback>
			</AvatarRoot>
			<AvatarRoot>
				<AvatarFallback class="bg-muted">MC</AvatarFallback>
			</AvatarRoot>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<AvatarRoot>
  <AvatarImage src="..." alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</AvatarRoot>
<AvatarGroup>
  <AvatarRoot>...</AvatarRoot>
  <AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Progress -->
	<ComponentBlock
		name="Progress"
		description="Progress bar for determinate or indeterminate loading."
		install="npx shadcn-svelte@latest add progress"
		variants="—"
	>
		<div class="space-y-3">
			<div class="space-y-1">
				<div class="flex justify-between text-sm"><span>Progression</span><span>60%</span></div>
				<Progress value={60} />
			</div>
			<div class="space-y-1">
				<div class="flex justify-between text-sm"><span>Indeterminate</span></div>
				<Progress />
			</div>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Progress value={60} />
<Progress />  <!-- indeterminate -->`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Chart -->
	<ComponentBlock
		name="Chart"
		description="Chart container with tooltip, legend, and theme integration (uses layerchart)."
		install="npx shadcn-svelte@latest add chart"
		variants="—"
	>
		<p class="text-sm text-muted-foreground">
			Chart utilise <code>layerchart</code> (v2) pour rendre des graphiques SVG réactifs. Voir
			<a href="https://layerchart.com" class="underline">layerchart.com</a> pour l'API complète.
		</p>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<script lang="ts">
import { ChartContainer, type ChartConfig } from '$lib/components/ui/chart/index.js';
const config = { views: { label: "Views", color: "hsl(var(--chart-1))" } } satisfies ChartConfig;
&lt;/script>

<ChartContainer {config}>
  <!-- layerchart Area/Bar/Line component -->
</ChartContainer>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Item -->
	<ComponentBlock
		name="Item"
		description="Structured list/grid item with media, header, content, and actions."
		install="npx shadcn-svelte@latest add item"
		variants="—"
	>
		<ItemRoot class="border rounded-2xl p-3">
			<ItemMedia><div class="size-12 rounded-xl bg-muted"></div></ItemMedia>
			<ItemContent>
				<ItemHeader>
					<ItemTitle>Stage Développeur</ItemTitle>
					<ItemDescription>Entreprise ABC · Paris</ItemDescription>
				</ItemHeader>
			</ItemContent>
			<ItemActions>
				<Button size="sm">Postuler</Button>
			</ItemActions>
		</ItemRoot>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<ItemRoot>
  <ItemMedia>...</ItemMedia>
  <ItemContent>
    <ItemHeader>
      <ItemTitle>Titre</ItemTitle>
      <ItemDescription>Sous-titre</ItemDescription>
    </ItemHeader>
  </ItemContent>
  <ItemActions>
    <Button>Action</Button>
  </ItemActions>
</ItemRoot>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- HoverCard -->
	<ComponentBlock
		name="HoverCard"
		description="Rich hover card with content preview on mouse over."
		install="npx shadcn-svelte@latest add hover-card"
		variants="—"
	>
		<HoverCardRoot>
			<HoverCardTrigger
				><span class="text-sm underline decoration-dotted cursor-help">@username</span
				></HoverCardTrigger
			>
			<HoverCardContent>
				<div class="space-y-1">
					<p class="text-sm font-medium">Jean Dupont</p>
					<p class="text-xs text-muted-foreground">Étudiant en informatique</p>
				</div>
			</HoverCardContent>
		</HoverCardRoot>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<HoverCardRoot>
  <HoverCardTrigger>@user</HoverCardTrigger>
  <HoverCardContent>
    <p>Rich preview content</p>
  </HoverCardContent>
</HoverCardRoot>`}</code
			></pre>
	</ComponentBlock>
</section>
