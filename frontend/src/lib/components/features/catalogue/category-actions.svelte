<script lang="ts">
	import ComponentBlock from './component-block.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as ButtonGroup from '$lib/components/ui/button-group/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import Command from '$lib/components/ui/command/command.svelte';
	import CommandList from '$lib/components/ui/command/command-list.svelte';
	import CommandEmpty from '$lib/components/ui/command/command-empty.svelte';
	import CommandGroup from '$lib/components/ui/command/command-group.svelte';
	import CommandItem from '$lib/components/ui/command/command-item.svelte';
	import Toggle from '$lib/components/ui/toggle/toggle.svelte';
	import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import Kbd from '$lib/components/ui/kbd/kbd.svelte';
	import KbdGroup from '$lib/components/ui/kbd/kbd-group.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import ArrowUpDownIcon from '@lucide/svelte/icons/arrow-up-down';
	import BoldIcon from '@lucide/svelte/icons/bold';
	import ItalicIcon from '@lucide/svelte/icons/italic';
	import LinkIcon from '@lucide/svelte/icons/link';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import PlusIcon from '@lucide/svelte/icons/plus';
</script>

<section class="space-y-8">
	<h2 class="window-title">Actions</h2>
	<p class="secondary-text">Components déclenchés par l'utilisateur pour effectuer des actions.</p>

	<Separator class="my-6" />

	<!-- Button -->
	<ComponentBlock
		name="Button"
		description="Displays a button element with multiple variants and sizes."
		install="npx shadcn-svelte@latest add button"
		variants="default | secondary | destructive | outline | ghost | link"
	>
		<div class="flex flex-wrap gap-2">
			<Button>Default</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="destructive">Destructive</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
		</div>
		<div class="flex flex-wrap gap-2">
			<Button size="sm">Small</Button>
			<Button size="lg">Large</Button>
			<Button size="icon"><PlusIcon /></Button>
			<Button disabled>Disabled</Button>
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
					<tr class="border-b"
						><td class="p-2">variant</td><td class="p-2 font-mono"
							>"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"</td
						><td class="p-2 font-mono">"default"</td></tr
					>
					<tr class="border-b"
						><td class="p-2">size</td><td class="p-2 font-mono"
							>"default" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"</td
						><td class="p-2 font-mono">"default"</td></tr
					>
					<tr class="border-b"
						><td class="p-2">disabled</td><td class="p-2 font-mono">boolean</td><td
							class="p-2 font-mono">false</td
						></tr
					>
					<tr class="border-b"
						><td class="p-2">href</td><td class="p-2 font-mono">string</td><td class="p-2 font-mono"
							>undefined</td
						></tr
					>
				</tbody>
			</table>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Button variant="destructive">Supprimer</Button>
<Button size="sm">Petit</Button>
<Button size="icon"><PlusIcon /></Button>`}</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Notes d'utilisation</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li>
					Utiliser <code class="text-xs">variant="destructive"</code> pour actions irréversibles
				</li>
				<li>
					Utiliser <code class="text-xs">size="icon"</code> avec icônes Lucide pour boutons icône seule
				</li>
				<li>
					<code class="text-xs">href</code> transforme le bouton en lien
					<code class="text-xs">&lt;a&gt;</code>
				</li>
			</ul>
		</div>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- ButtonGroup -->
	<ComponentBlock
		name="ButtonGroup"
		description="Groups related buttons together visually."
		install="npx shadcn-svelte@latest add button-group"
		variants="horizontal | vertical"
	>
		<div class="space-y-4">
			<ButtonGroup.Root orientation="horizontal">
				<ButtonGroup.Text>Actions</ButtonGroup.Text>
				<Button variant="outline" size="sm">Edit</Button>
				<ButtonGroup.Separator />
				<Button variant="outline" size="sm">Delete</Button>
			</ButtonGroup.Root>
			<ButtonGroup.Root orientation="vertical">
				<Button variant="outline" size="sm">Edit</Button>
				<Button variant="outline" size="sm">Delete</Button>
			</ButtonGroup.Root>
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
					<tr class="border-b"
						><td class="p-2">orientation</td><td class="p-2 font-mono">"horizontal" | "vertical"</td
						><td class="p-2 font-mono">"horizontal"</td></tr
					>
				</tbody>
			</table>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<ButtonGroup.Root>
  <ButtonGroup.Text>Actions</ButtonGroup.Text>
  <Button variant="outline" size="sm">Edit</Button>
  <ButtonGroup.Separator />
  <Button variant="outline" size="sm">Delete</Button>
</ButtonGroup.Root>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- DropdownMenu -->
	<ComponentBlock
		name="DropdownMenu"
		description="Displays a contextual menu triggered by a button click."
		install="npx shadcn-svelte@latest add dropdown-menu"
		variants="—"
	>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				><Button variant="outline">Open <ChevronDownIcon class="size-4" /></Button
				></DropdownMenu.Trigger
			>
			<DropdownMenu.Content>
				<DropdownMenu.Label>Mon Compte</DropdownMenu.Label>
				<DropdownMenu.Item>Profile</DropdownMenu.Item>
				<DropdownMenu.Item>Settings</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive">Logout</DropdownMenu.Item>
				<DropdownMenu.Shortcut>⌘Q</DropdownMenu.Shortcut>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
		<div class="inset-surface overflow-x-auto">
			<table class="w-full text-sm">
				<thead
					><tr class="border-b"
						><th class="p-2 text-left font-medium">Sub-component</th><th
							class="p-2 text-left font-medium">Purpose</th
						></tr
					></thead
				>
				<tbody>
					<tr class="border-b"
						><td class="p-2">DropdownMenu.Trigger</td><td class="p-2"
							>Element that opens the menu</td
						></tr
					>
					<tr class="border-b"
						><td class="p-2">DropdownMenu.Content</td><td class="p-2">Menu popover content</td></tr
					>
					<tr class="border-b"
						><td class="p-2">DropdownMenu.Item</td><td class="p-2">Individual menu item</td></tr
					>
					<tr class="border-b"
						><td class="p-2">DropdownMenu.Separator</td><td class="p-2">Visual divider</td></tr
					>
					<tr
						><td class="p-2">DropdownMenu.Shortcut</td><td class="p-2">Keyboard shortcut display</td
						></tr
					>
				</tbody>
			</table>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="outline">Menu</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item>Profile</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item variant="destructive">Delete</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- ContextMenu -->
	<ComponentBlock
		name="ContextMenu"
		description="Displays a contextual menu on right-click."
		install="npx shadcn-svelte@latest add context-menu"
		variants="—"
	>
		<ContextMenu.Root>
			<ContextMenu.Trigger>
				<div
					class="inset-surface flex h-24 w-48 items-center justify-center rounded-xl text-sm text-muted-foreground cursor-context-menu"
				>
					Right-click here
				</div>
			</ContextMenu.Trigger>
			<ContextMenu.Content>
				<ContextMenu.Item>Edit</ContextMenu.Item>
				<ContextMenu.Item>Copy</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Item variant="destructive">Delete</ContextMenu.Item>
			</ContextMenu.Content>
		</ContextMenu.Root>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<ContextMenu.Root>
  <ContextMenu.Trigger>
    <div>Right-click area</div>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item>Edit</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>`}</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Notes d'utilisation</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li>Right-click, not click — use DropdownMenu for left-click menus</li>
				<li>Supports nested submenus via <code class="text-xs">ContextMenu.Sub</code></li>
			</ul>
		</div>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Command -->
	<ComponentBlock
		name="Command"
		description="Command palette / searchable list for combobox and quick actions."
		install="npx shadcn-svelte@latest add command"
		variants="—"
	>
		<div class="max-w-xs">
			<Command class="border">
				<div class="flex items-center border-b px-3">
					<ArrowUpDownIcon class="mr-2 size-4 shrink-0 opacity-50" />
					<input
						class="flex h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
						placeholder="Search..."
					/>
				</div>
				<CommandList class="max-h-40">
					<CommandEmpty>No results.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>Calendar</CommandItem>
						<CommandItem>Search Emails</CommandItem>
						<CommandItem>Jump to…</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Command>
  <Command.Input placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Toggle -->
	<ComponentBlock
		name="Toggle"
		description="A two-state button for on/off toggles."
		install="npx shadcn-svelte@latest add toggle"
		variants="default | outline"
	>
		<div class="flex flex-wrap gap-2">
			<Toggle><BoldIcon class="size-4" /></Toggle>
			<Toggle pressed><ItalicIcon class="size-4" /></Toggle>
			<Toggle variant="outline"><LinkIcon class="size-4" /></Toggle>
			<Toggle disabled><BoldIcon class="size-4" /></Toggle>
		</div>
		<div class="flex flex-wrap gap-2">
			<Toggle size="sm"><BoldIcon class="size-4" /></Toggle>
			<Toggle size="lg"><BoldIcon class="size-4" /></Toggle>
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
					<tr class="border-b"
						><td class="p-2">variant</td><td class="p-2 font-mono">"default" | "outline"</td><td
							class="p-2 font-mono">"default"</td
						></tr
					>
					<tr class="border-b"
						><td class="p-2">size</td><td class="p-2 font-mono">"default" | "sm" | "lg"</td><td
							class="p-2 font-mono">"default"</td
						></tr
					>
					<tr
						><td class="p-2">pressed</td><td class="p-2 font-mono">boolean (bindable)</td><td
							class="p-2 font-mono">false</td
						></tr
					>
				</tbody>
			</table>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Toggle><BoldIcon /></Toggle>
<Toggle pressed bind:pressed={isBold}><ItalicIcon /></Toggle>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- ToggleGroup -->
	<ComponentBlock
		name="ToggleGroup"
		description="Groups multiple toggle buttons together."
		install="npx shadcn-svelte@latest add toggle-group"
		variants="default | outline"
	>
		<div class="space-y-2">
			<ToggleGroup.Root type="multiple">
				<ToggleGroup.Item value="bold"><BoldIcon class="size-4" /></ToggleGroup.Item>
				<ToggleGroup.Item value="italic"><ItalicIcon class="size-4" /></ToggleGroup.Item>
				<ToggleGroup.Item value="underline"><LinkIcon class="size-4" /></ToggleGroup.Item>
			</ToggleGroup.Root>
			<ToggleGroup.Root type="single" variant="outline">
				<ToggleGroup.Item value="left">Left</ToggleGroup.Item>
				<ToggleGroup.Item value="center">Center</ToggleGroup.Item>
				<ToggleGroup.Item value="right">Right</ToggleGroup.Item>
			</ToggleGroup.Root>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<ToggleGroup.Root type="multiple">
  <ToggleGroup.Item value="bold"><BoldIcon /></ToggleGroup.Item>
  <ToggleGroup.Item value="italic"><ItalicIcon /></ToggleGroup.Item>
</ToggleGroup.Root>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Tooltip -->
	<ComponentBlock
		name="Tooltip"
		description="A popup that displays information related to an element on hover."
		install="npx shadcn-svelte@latest add tooltip"
		variants="—"
	>
		<Tooltip.Root>
			<Tooltip.Trigger><Button variant="outline">Hover me</Button></Tooltip.Trigger>
			<Tooltip.Content>
				<p>Tooltip content</p>
			</Tooltip.Content>
		</Tooltip.Root>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Tooltip.Root>
  <Tooltip.Trigger><Button>Hover</Button></Tooltip.Trigger>
  <Tooltip.Content>
    <p>Tooltip text</p>
  </Tooltip.Content>
</Tooltip.Root>`}</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Notes d'utilisation</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li>
					Tooltip.Content accepts <code class="text-xs">side</code> prop: "top" | "bottom" | "left" |
					"right"
				</li>
				<li>Usages idéaux: icon-only buttons, labels tronqués</li>
			</ul>
		</div>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Kbd -->
	<ComponentBlock
		name="Kbd"
		description="Keyboard shortcut display component."
		install="npx shadcn-svelte@latest add kbd"
		variants="—"
	>
		<div class="flex flex-wrap gap-3 items-center">
			<Kbd>⌘K</Kbd>
			<Kbd>⌘⇧F</Kbd>
			<Kbd>⌘S</Kbd>
			<Kbd>Ctrl + C</Kbd>
			<KbdGroup>
				<Kbd>⌘</Kbd>
				<Kbd>K</Kbd>
			</KbdGroup>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Kbd>⌘K</Kbd>
<Kbd.Group>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`}</code
			></pre>
	</ComponentBlock>
</section>
