<script lang="ts">
	import { cn } from '$lib/utils.js';
	import ComponentBlock from './component-block.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import Tabs from '$lib/components/ui/tabs/tabs.svelte';
	import TabsList from '$lib/components/ui/tabs/tabs-list.svelte';
	import TabsTrigger from '$lib/components/ui/tabs/tabs-trigger.svelte';
	import TabsContent from '$lib/components/ui/tabs/tabs-content.svelte';
	import * as Menubar from '$lib/components/ui/menubar/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import HomeIcon from '@lucide/svelte/icons/home';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import SheetIcon from '@lucide/svelte/icons/sheet';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';

	let sheetOpen = $state(false);
	let drawerOpen = $state(false);
	let collapsibleOpen = $state(false);
</script>

<section class="space-y-8">
	<h2 class="window-title">Navigation</h2>
	<p class="secondary-text">Composants de navigation pour structurer et parcourir l'application.</p>

	<Separator class="my-6" />

	<!-- Sidebar -->
	<ComponentBlock
		name="Sidebar"
		description="Application sidebar with navigation menus, collapsible sections, and responsive behavior."
		install="npx shadcn-svelte@latest add sidebar"
		variants="—"
	>
		<Sidebar.Provider class="relative max-w-64 border rounded-2xl overflow-hidden">
			<Sidebar.Root class="relative! static!">
				<Sidebar.Content>
					<Sidebar.Header class="p-4">
						<p class="font-semibold text-sm">PNGS-IE</p>
					</Sidebar.Header>
					<Sidebar.Menu>
						<Sidebar.MenuItem>
							<Sidebar.MenuButton><HomeIcon class="size-4" /> Dashboard</Sidebar.MenuButton>
						</Sidebar.MenuItem>
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>Stages</Sidebar.MenuButton>
						</Sidebar.MenuItem>
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>Candidatures</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					</Sidebar.Menu>
				</Sidebar.Content>
			</Sidebar.Root>
		</Sidebar.Provider>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Sidebar.Provider>
  <Sidebar.Root>
    <Sidebar.Header>...</Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>Item</Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Root>
</Sidebar.Provider>`}</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Notes d'utilisation</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li>Wrapped in <code class="text-xs">Sidebar.Provider</code> for state management</li>
				<li>
					Responsive: collapses to icons on mobile via <code class="text-xs">Sidebar.Trigger</code>
				</li>
				<li>Uses <code class="text-xs">useSidebar()</code> hook for open/close state</li>
			</ul>
		</div>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- NavigationMenu -->
	<ComponentBlock
		name="NavigationMenu"
		description="Horizontal navigation with dropdown sections."
		install="npx shadcn-svelte@latest add navigation-menu"
		variants="—"
	>
		<NavigationMenu.Root class="border rounded-2xl p-1">
			<NavigationMenu.List>
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>Stages <ChevronDownIcon class="size-3" /></NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<div class="p-4 text-sm">
							<p class="font-medium">Rechercher un stage</p>
							<p class="secondary-text">Parcourir les offres disponibles</p>
						</div>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link href="#">Candidatures</NavigationMenu.Link>
				</NavigationMenu.Item>
				<NavigationMenu.Item>
					<NavigationMenu.Link href="#">Profil</NavigationMenu.Link>
				</NavigationMenu.Item>
			</NavigationMenu.List>
		</NavigationMenu.Root>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Item</NavigationMenu.Trigger>
      <NavigationMenu.Content>...</NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Breadcrumb -->
	<ComponentBlock
		name="Breadcrumb"
		description="Navigation breadcrumb showing page hierarchy."
		install="npx shadcn-svelte@latest add breadcrumb"
		variants="—"
	>
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
				<Breadcrumb.Separator><ChevronRightIcon class="size-4" /></Breadcrumb.Separator>
				<Breadcrumb.Item><Breadcrumb.Link href="/stages">Stages</Breadcrumb.Link></Breadcrumb.Item>
				<Breadcrumb.Separator><ChevronRightIcon class="size-4" /></Breadcrumb.Separator>
				<Breadcrumb.Item><Breadcrumb.Page>Détail</Breadcrumb.Page></Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item><Breadcrumb.Page>Current</Breadcrumb.Page></Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Tabs -->
	<ComponentBlock
		name="Tabs"
		description="Tabbed content navigation for organizing related content."
		install="npx shadcn-svelte@latest add tabs"
		variants="—"
	>
		<Tabs value="stab1">
			<TabsList>
				<TabsTrigger value="stab1">Tab 1</TabsTrigger>
				<TabsTrigger value="stab2">Tab 2</TabsTrigger>
				<TabsTrigger value="stab3" disabled>Disabled</TabsTrigger>
			</TabsList>
			<TabsContent value="stab1" class="p-4 text-sm">Content for Tab 1</TabsContent>
			<TabsContent value="stab2" class="p-4 text-sm">Content for Tab 2</TabsContent>
		</Tabs>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Tabs value="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content</TabsContent>
</Tabs>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Menubar -->
	<ComponentBlock
		name="Menubar"
		description="Desktop application-style menu bar."
		install="npx shadcn-svelte@latest add menubar"
		variants="—"
	>
		<Menubar.Root class="border rounded-2xl w-fit">
			<Menubar.Menu>
				<Menubar.Trigger>File</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.Item>New Tab</Menubar.Item>
					<Menubar.Item>Open…</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Item>Save</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
			<Menubar.Menu>
				<Menubar.Trigger>Edit</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.Item>Undo</Menubar.Item>
					<Menubar.Item>Redo</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
		</Menubar.Root>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Menubar.Root>
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>Save</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Sheet -->
	<ComponentBlock
		name="Sheet"
		description="Slide-in panel overlay from any edge of the screen."
		install="npx shadcn-svelte@latest add sheet"
		variants="left | right | top | bottom"
	>
		<Sheet.Root bind:open={sheetOpen}>
			<Sheet.Trigger
				><Button variant="outline"><SheetIcon class="size-4" /> Open Sheet</Button></Sheet.Trigger
			>
			<Sheet.Content side="right">
				<Sheet.Header>
					<Sheet.Title>Sheet Title</Sheet.Title>
					<Sheet.Description>Sheet description text.</Sheet.Description>
				</Sheet.Header>
				<div class="p-4 text-sm">Sheet body content.</div>
			</Sheet.Content>
		</Sheet.Root>
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
						><td class="p-2">side</td><td class="p-2 font-mono"
							>"left" | "right" | "top" | "bottom"</td
						><td class="p-2 font-mono">"right"</td></tr
					>
				</tbody>
			</table>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Sheet.Root bind:open={open}>
  <Sheet.Trigger><Button>Open</Button></Sheet.Trigger>
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>Title</Sheet.Title>
    </Sheet.Header>
    <p>Content</p>
  </Sheet.Content>
</Sheet.Root>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Drawer -->
	<ComponentBlock
		name="Drawer"
		description="Mobile-friendly bottom drawer panel (uses vaul-svelte)."
		install="npx shadcn-svelte@latest add drawer"
		variants="—"
	>
		<Drawer.Root bind:open={drawerOpen}>
			<Drawer.Trigger><Button variant="outline">Open Drawer</Button></Drawer.Trigger>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>Drawer Title</Drawer.Title>
					<Drawer.Description>Drawer description.</Drawer.Description>
				</Drawer.Header>
				<div class="p-4 text-sm">Drawer body content.</div>
			</Drawer.Content>
		</Drawer.Root>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Drawer.Root bind:open={open}>
  <Drawer.Trigger><Button>Open</Button></Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Title</Drawer.Title>
    </Drawer.Header>
    <p>Content</p>
  </Drawer.Content>
</Drawer.Root>`}</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Notes d'utilisation</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li>Optimisé pour mobile — utilise <code class="text-xs">vaul-svelte</code></li>
				<li>Drawer vs Sheet: Drawer pour mobile (bottom), Sheet pour desktop (side)</li>
			</ul>
		</div>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Collapsible -->
	<ComponentBlock
		name="Collapsible"
		description="Expandable/collapsible content section."
		install="npx shadcn-svelte@latest add collapsible"
		variants="—"
	>
		<Collapsible.Root bind:open={collapsibleOpen} class="border rounded-2xl p-3">
			<Collapsible.Trigger class="flex w-full items-center gap-2 text-sm font-medium">
				<ChevronDownIcon
					class={cn('size-4 transition-transform', collapsibleOpen && 'rotate-180')}
				/>
				Can I help you?
			</Collapsible.Trigger>
			<Collapsible.Content class="mt-2 text-sm text-muted-foreground">
				Yes, I'd like to know more about this feature.
			</Collapsible.Content>
		</Collapsible.Root>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Collapsible.Root bind:open={open}>
  <Collapsible.Trigger>Toggle</Collapsible.Trigger>
  <Collapsible.Content>Hidden content</Collapsible.Content>
</Collapsible.Root>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- ScrollArea -->
	<ComponentBlock
		name="ScrollArea"
		description="Custom scrollable container with styled scrollbar."
		install="npx shadcn-svelte@latest add scroll-area"
		variants="—"
	>
		<div class="h-24 w-full">
			<div class="rounded-2xl border overflow-hidden">
				<div class="overflow-y-auto h-24 p-3 space-y-2 text-sm">
					<p class="text-muted-foreground">Item 1</p>
					<p class="text-muted-foreground">Item 2</p>
					<p class="text-muted-foreground">Item 3</p>
				</div>
			</div>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<ScrollArea class="h-24">
	{#each items as item (item)}
    <p>{item}</p>
  {/each}
</ScrollArea>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Resizable -->
	<ComponentBlock
		name="Resizable"
		description="Resizable split panels with drag handle (uses paneforge)."
		install="npx shadcn-svelte@latest add resizable"
		variants="horizontal | vertical"
	>
		<Resizable.PaneGroup direction="horizontal" class="border rounded-2xl h-32">
			<Resizable.Pane defaultSize={50}>
				<div class="flex h-full items-center justify-center text-sm">Pane 1</div>
			</Resizable.Pane>
			<Resizable.Handle withHandle />
			<Resizable.Pane defaultSize={50}>
				<div class="flex h-full items-center justify-center text-sm">Pane 2</div>
			</Resizable.Pane>
		</Resizable.PaneGroup>
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
						><td class="p-2">direction</td><td class="p-2 font-mono">"horizontal" | "vertical"</td
						><td class="p-2 font-mono">"horizontal"</td></tr
					>
				</tbody>
			</table>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Resizable.PaneGroup direction="horizontal">
  <Resizable.Pane defaultSize={50}>Left</Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane defaultSize={50}>Right</Resizable.Pane>
</Resizable.PaneGroup>`}</code
			></pre>
	</ComponentBlock>
</section>
