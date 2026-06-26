<script lang="ts">
	import { theme, type ThemeMode } from '$lib/stores/theme';
	import Button from '$lib/components/ui/button/button.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import Alert from '$lib/components/ui/alert/alert.svelte';
	import AlertTitle from '$lib/components/ui/alert/alert-title.svelte';
	import AlertDescription from '$lib/components/ui/alert/alert-description.svelte';
	import Dialog from '$lib/components/ui/dialog/dialog.svelte';
	import DialogTrigger from '$lib/components/ui/dialog/dialog-trigger.svelte';
	import DialogContent from '$lib/components/ui/dialog/dialog-content.svelte';
	import DialogHeader from '$lib/components/ui/dialog/dialog-header.svelte';
	import DialogTitle from '$lib/components/ui/dialog/dialog-title.svelte';
	import DialogDescription from '$lib/components/ui/dialog/dialog-description.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import Tabs from '$lib/components/ui/tabs/tabs.svelte';
	import TabsList from '$lib/components/ui/tabs/tabs-list.svelte';
	import TabsTrigger from '$lib/components/ui/tabs/tabs-trigger.svelte';
	import TabsContent from '$lib/components/ui/tabs/tabs-content.svelte';
	import Tooltip from '$lib/components/ui/tooltip/tooltip.svelte';
	import TooltipTrigger from '$lib/components/ui/tooltip/tooltip-trigger.svelte';
	import TooltipContent from '$lib/components/ui/tooltip/tooltip-content.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	let dialogOpen = $state(false);

	function setMode(m: ThemeMode) {
		theme.set(m);
	}
</script>

<div class="page-title">Design System</div>
<p class="secondary-text">Component showcase for PNGS-IE frontend.</p>

<Separator class="my-8" />

<section class="mb-12">
	<h2 class="section-title mb-4">Theme</h2>
	<div class="flex gap-2">
		<Button onclick={() => setMode('light')}>Light</Button>
		<Button onclick={() => setMode('dark')}>Dark</Button>
		<Button onclick={() => setMode('system')}>System</Button>
	</div>
</section>

<Separator class="my-8" />

<section class="mb-12">
	<h2 class="section-title mb-4">Buttons</h2>
	<div class="flex flex-wrap gap-2">
		<Button>Default</Button>
		<Button variant="secondary">Secondary</Button>
		<Button variant="destructive">Destructive</Button>
		<Button variant="outline">Outline</Button>
		<Button variant="ghost">Ghost</Button>
		<Button variant="link">Link</Button>
		<Button size="sm">Small</Button>
		<Button size="lg">Large</Button>
		<Button disabled>Disabled</Button>
	</div>
</section>

<Separator class="my-8" />

<section class="mb-12">
	<h2 class="section-title mb-4">Badges</h2>
	<div class="flex flex-wrap gap-2">
		<Badge>Default</Badge>
		<Badge variant="secondary">Secondary</Badge>
		<Badge variant="destructive">Destructive</Badge>
		<Badge variant="outline">Outline</Badge>
	</div>
</section>

<Separator class="my-8" />

<section class="mb-12">
	<h2 class="section-title mb-4">Cards</h2>
	<div class="grid gap-4 md:grid-cols-3">
		<Card>
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card description goes here</CardDescription>
			</CardHeader>
			<CardContent>
				<p class="body-text">This is the card body content.</p>
			</CardContent>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>With Action</CardTitle>
				<CardDescription>Card with button</CardDescription>
			</CardHeader>
			<CardContent>
				<Button>Action</Button>
			</CardContent>
		</Card>
		<div class="window-surface p-6">
			<p class="body-text">Window Surface</p>
			<p class="secondary-text">Primary surface with shadow</p>
		</div>
	</div>
</section>

<Separator class="my-8" />

<section class="mb-12">
	<h2 class="section-title mb-4">Alerts</h2>
	<div class="space-y-3">
		<Alert>
			<AlertTitle>Information</AlertTitle>
			<AlertDescription>This is an informational alert.</AlertDescription>
		</Alert>
		<Alert variant="destructive">
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>Something went wrong.</AlertDescription>
		</Alert>
	</div>
</section>

<Separator class="my-8" />

<section class="mb-12">
	<h2 class="section-title mb-4">Input & Form Elements</h2>
	<div class="window-surface max-w-md p-6 space-y-4">
		<div class="space-y-2">
			<Label for="name">Name</Label>
			<Input id="name" placeholder="Enter your name" />
		</div>
		<div class="space-y-2">
			<Label for="email">Email</Label>
			<Input id="email" type="email" placeholder="email@example.com" />
		</div>
		<div class="flex items-center gap-2">
			<Switch id="notifications" />
			<Label for="notifications">Enable notifications</Label>
		</div>
	</div>
</section>

<Separator class="my-8" />

<section class="mb-12">
	<h2 class="section-title mb-4">Dialog</h2>
	<Dialog bind:open={dialogOpen}>
		<DialogTrigger>
			<Button>Open Dialog</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Dialog Title</DialogTitle>
				<DialogDescription>This is a dialog description.</DialogDescription>
			</DialogHeader>
			<p class="body-text">Dialog body content here.</p>
		</DialogContent>
	</Dialog>
</section>

<Separator class="my-8" />

<section class="mb-12">
	<h2 class="section-title mb-4">Tabs</h2>
	<Tabs value="tab1">
		<TabsList>
			<TabsTrigger value="tab1">Tab 1</TabsTrigger>
			<TabsTrigger value="tab2">Tab 2</TabsTrigger>
			<TabsTrigger value="tab3">Tab 3</TabsTrigger>
		</TabsList>
		<TabsContent value="tab1" class="window-surface mt-4 p-6">
			<p>Content for Tab 1</p>
		</TabsContent>
		<TabsContent value="tab2" class="window-surface mt-4 p-6">
			<p>Content for Tab 2</p>
		</TabsContent>
		<TabsContent value="tab3" class="window-surface mt-4 p-6">
			<p>Content for Tab 3</p>
		</TabsContent>
	</Tabs>
</section>

<Separator class="my-8" />

<section class="mb-12">
	<h2 class="section-title mb-4">Skeleton & Tooltip</h2>
	<div class="flex gap-4 items-start">
		<div class="space-y-2">
			<Skeleton class="h-4 w-[250px]" />
			<Skeleton class="h-4 w-[200px]" />
			<Skeleton class="h-4 w-[150px]" />
		</div>
		<Tooltip>
			<TooltipTrigger><Button variant="outline">Hover me</Button></TooltipTrigger>
			<TooltipContent>
				<p>Tooltip content</p>
			</TooltipContent>
		</Tooltip>
	</div>
</section>

<Separator class="my-8" />

<section class="mb-12">
	<h2 class="section-title mb-4">Surfaces</h2>
	<div class="grid gap-4 md:grid-cols-2">
		<div class="window-surface p-6">
			<p class="font-medium">Window Surface</p>
			<p class="secondary-text">Main content surface with full shadow</p>
		</div>
		<div class="panel-surface p-6">
			<p class="font-medium">Panel Surface</p>
			<p class="secondary-text">Secondary surface with contact shadow</p>
		</div>
		<div class="floating-surface p-6">
			<p class="font-medium">Floating Surface</p>
			<p class="secondary-text">Elevated surface for overlays</p>
		</div>
		<div class="inset-surface p-6">
			<p class="font-medium">Inset Surface</p>
			<p class="secondary-text">Recessed surface for toolbars</p>
		</div>
	</div>
</section>

<Separator class="my-8" />

<section class="mb-12">
	<h2 class="section-title mb-4">Typography</h2>
	<div class="space-y-2">
		<p class="page-title">Page Title (3xl bold)</p>
		<p class="window-title">Window Title (lg semibold)</p>
		<p class="section-title">Section Title (base semibold)</p>
		<p class="subtitle">Subtitle (sm medium, muted)</p>
		<p class="body-text">Body text at default size with comfortable line height.</p>
		<p class="secondary-text">Secondary text in muted color.</p>
		<p class="caption">Caption text (xs)</p>
		<p class="metadata">Metadata label (xs)</p>
		<p class="stat-value">42,500</p>
	</div>
</section>
