<script lang="ts">
	import ComponentBlock from './component-block.svelte';
	import Alert from '$lib/components/ui/alert/alert.svelte';
	import AlertTitle from '$lib/components/ui/alert/alert-title.svelte';
	import AlertDescription from '$lib/components/ui/alert/alert-description.svelte';
	import AlertDialogRoot from '$lib/components/ui/alert-dialog/alert-dialog.svelte';
	import AlertDialogTrigger from '$lib/components/ui/alert-dialog/alert-dialog-trigger.svelte';
	import AlertDialogTitle from '$lib/components/ui/alert-dialog/alert-dialog-title.svelte';
	import AlertDialogAction from '$lib/components/ui/alert-dialog/alert-dialog-action.svelte';
	import AlertDialogCancel from '$lib/components/ui/alert-dialog/alert-dialog-cancel.svelte';
	import AlertDialogFooter from '$lib/components/ui/alert-dialog/alert-dialog-footer.svelte';
	import AlertDialogHeader from '$lib/components/ui/alert-dialog/alert-dialog-header.svelte';
	import AlertDialogContent from '$lib/components/ui/alert-dialog/alert-dialog-content.svelte';
	import AlertDialogDescription from '$lib/components/ui/alert-dialog/alert-dialog-description.svelte';
	import EmptyRoot from '$lib/components/ui/empty/empty.svelte';
	import EmptyHeader from '$lib/components/ui/empty/empty-header.svelte';
	import EmptyMedia from '$lib/components/ui/empty/empty-media.svelte';
	import EmptyTitle from '$lib/components/ui/empty/empty-title.svelte';
	import EmptyDescription from '$lib/components/ui/empty/empty-description.svelte';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import { toast, Toaster } from 'svelte-sonner';
	import DialogRoot from '$lib/components/ui/dialog/dialog.svelte';
	import DialogTitle from '$lib/components/ui/dialog/dialog-title.svelte';
	import DialogHeader from '$lib/components/ui/dialog/dialog-header.svelte';
	import DialogContent from '$lib/components/ui/dialog/dialog-content.svelte';
	import DialogDescription from '$lib/components/ui/dialog/dialog-description.svelte';
	import DialogTrigger from '$lib/components/ui/dialog/dialog-trigger.svelte';
	import PopoverRoot from '$lib/components/ui/popover/popover.svelte';
	import PopoverContent from '$lib/components/ui/popover/popover-content.svelte';
	import PopoverDescription from '$lib/components/ui/popover/popover-description.svelte';
	import PopoverHeader from '$lib/components/ui/popover/popover-header.svelte';
	import PopoverTitle from '$lib/components/ui/popover/popover-title.svelte';
	import PopoverTrigger from '$lib/components/ui/popover/popover-trigger.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import InfoIcon from '@lucide/svelte/icons/info';
	import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';
	import SearchXIcon from '@lucide/svelte/icons/search-x';

	let alertDialogOpen = $state(false);
	let dialogOpen = $state(false);
</script>

<section class="space-y-8">
	<h2 class="window-title">Feedback</h2>
	<p class="secondary-text">
		Composants de feedback pour informer l'utilisateur des résultats d'actions.
	</p>

	<Separator class="my-6" />

	<!-- Alert -->
	<ComponentBlock
		name="Alert"
		description="Displays a brief message with optional icon, title, and description."
		install="npx shadcn-svelte@latest add alert"
		variants="default | destructive"
	>
		<div class="space-y-3">
			<Alert>
				<InfoIcon class="size-4" />
				<AlertTitle>Information</AlertTitle>
				<AlertDescription>This is an informational alert.</AlertDescription>
			</Alert>
			<Alert variant="destructive">
				<TriangleAlertIcon class="size-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>Something went wrong.</AlertDescription>
			</Alert>
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
						><td class="p-2">variant</td><td class="p-2 font-mono">"default" | "destructive"</td><td
							class="p-2 font-mono">"default"</td
						></tr
					>
				</tbody>
			</table>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Alert variant="destructive">
  <TriangleAlertIcon class="size-4" />
  <AlertTitle>Erreur</AlertTitle>
  <AlertDescription>Message</AlertDescription>
</Alert>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- AlertDialog -->
	<ComponentBlock
		name="AlertDialog"
		description="Modal dialog for confirmations and destructive actions."
		install="npx shadcn-svelte@latest add alert-dialog"
		variants="—"
	>
		<AlertDialogRoot bind:open={alertDialogOpen}>
			<AlertDialogTrigger><Button variant="destructive">Delete Item</Button></AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialogRoot>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<AlertDialogRoot bind:open={open}>
  <AlertDialogTrigger><Button>Delete</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirm</AlertDialogTitle>
      <AlertDialogDescription>Action irreversible</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Annuler</AlertDialogCancel>
      <AlertDialogAction>Continuer</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialogRoot>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Empty -->
	<ComponentBlock
		name="Empty"
		description="Empty state placeholder with media (illustration/icon), title, description, and optional action."
		install="npx shadcn-svelte@latest add empty"
		variants="—"
	>
		<EmptyRoot class="border rounded-2xl p-6">
			<EmptyMedia><SearchXIcon class="size-12 text-muted-foreground" /></EmptyMedia>
			<EmptyHeader>
				<EmptyTitle>No results found</EmptyTitle>
				<EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
			</EmptyHeader>
		</EmptyRoot>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<EmptyRoot>
  <EmptyMedia><SearchXIcon class="size-12" /></EmptyMedia>
  <EmptyHeader>
    <EmptyTitle>Aucun résultat</EmptyTitle>
    <EmptyDescription>Message</EmptyDescription>
  </EmptyHeader>
</EmptyRoot>`}</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Notes d'utilisation</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li>Utiliser Empty.Content pour ajouter des actions (boutons)</li>
				<li>Media peut contenir illustration SVG ou icône Lucide</li>
			</ul>
		</div>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Skeleton -->
	<ComponentBlock
		name="Skeleton"
		description="Loading placeholder that mimics content layout."
		install="npx shadcn-svelte@latest add skeleton"
		variants="—"
	>
		<div class="space-y-3">
			<Skeleton class="h-4 w-[250px]" />
			<Skeleton class="h-4 w-[200px]" />
			<Skeleton class="h-8 w-full" />
			<div class="flex gap-2">
				<Skeleton class="size-10 rounded-full" />
				<div class="space-y-2 flex-1">
					<Skeleton class="h-4 w-full" />
					<Skeleton class="h-4 w-[60%]" />
				</div>
			</div>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Skeleton class="h-4 w-[250px]" />
<Skeleton class="size-10 rounded-full" />`}</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Notes d'utilisation</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li>Dimensions via classes Tailwind <code class="text-xs">w-* h-*</code></li>
				<li>Arrondi via <code class="text-xs">rounded-*</code></li>
				<li>Utiliser avec AsyncBoundary pattern</li>
			</ul>
		</div>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Spinner -->
	<ComponentBlock
		name="Spinner"
		description="Loading spinner for indeterminate progress."
		install="npx shadcn-svelte@latest add spinner"
		variants="—"
	>
		<div class="flex gap-4 items-center">
			<Spinner />
			<Spinner class="size-6" />
			<Spinner class="size-8 text-primary" />
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Spinner />
<Spinner class="size-6 text-primary" />`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Sonner -->
	<ComponentBlock
		name="Sonner"
		description="Toast notification system for ephemeral feedback."
		install="npx shadcn-svelte@latest add sonner"
		variants="—"
	>
		<Toaster />
		<div class="flex flex-wrap gap-2">
			<Button onclick={() => toast('Default notification')}>Default Toast</Button>
			<Button
				variant="outline"
				onclick={() => toast.message('Message', { description: 'With description' })}
				>With Description</Button
			>
			<Button variant="destructive" onclick={() => toast.error('Error occurred')}
				>Error Toast</Button
			>
			<Button onclick={() => toast.success('Success!')}>Success Toast</Button>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Toaster />
&lt;script lang="ts"&gt;
import { toast } from 'svelte-sonner';
toast('Notification');
toast.success('Success!');
toast.error('Error!');
&lt;/script&gt;`}</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Notes d'utilisation</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li><code class="text-xs">&lt;Toaster /&gt;</code> placé une fois dans le layout racine</li>
				<li>
					Variantes: <code class="text-xs">toast()</code>,
					<code class="text-xs">toast.success()</code>, <code class="text-xs">toast.error()</code>,
					<code class="text-xs">toast.warning()</code>, <code class="text-xs">toast.info()</code>
				</li>
			</ul>
		</div>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Dialog -->
	<ComponentBlock
		name="Dialog"
		description="Modal overlay dialog for focused user interaction."
		install="npx shadcn-svelte@latest add dialog"
		variants="—"
	>
		<DialogRoot bind:open={dialogOpen}>
			<DialogTrigger><Button>Open Dialog</Button></DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Dialog Title</DialogTitle>
					<DialogDescription>Dialog description text.</DialogDescription>
				</DialogHeader>
				<p class="text-sm text-muted-foreground">Dialog body content here.</p>
			</DialogContent>
		</DialogRoot>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<DialogRoot bind:open={open}>
  <DialogTrigger><Button>Ouvrir</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Titre</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <p>Contenu</p>
  </DialogContent>
</DialogRoot>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Popover -->
	<ComponentBlock
		name="Popover"
		description="Floating card that appears near a trigger element on click."
		install="npx shadcn-svelte@latest add popover"
		variants="—"
	>
		<PopoverRoot>
			<PopoverTrigger><Button variant="outline">Open Popover</Button></PopoverTrigger>
			<PopoverContent>
				<PopoverHeader>
					<PopoverTitle>Popover Title</PopoverTitle>
					<PopoverDescription>Popover description.</PopoverDescription>
				</PopoverHeader>
				<p class="text-sm text-muted-foreground p-2">Popover content.</p>
			</PopoverContent>
		</PopoverRoot>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<PopoverRoot>
  <PopoverTrigger><Button>Open</Button></PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Titre</PopoverTitle>
    </PopoverHeader>
    <p>Contenu</p>
  </PopoverContent>
</PopoverRoot>`}</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Notes d'utilisation</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li>Utilisé comme base pour DatePicker et Combobox</li>
				<li>
					Props: <code class="text-xs">side</code> ("top" | "bottom" | "left" | "right"),
					<code class="text-xs">sideOffset</code> (number, default 4)
				</li>
			</ul>
		</div>
	</ComponentBlock>
</section>
