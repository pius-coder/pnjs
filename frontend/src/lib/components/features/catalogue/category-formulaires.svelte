<script lang="ts">
	import { cn } from '$lib/utils.js';
	import ComponentBlock from './component-block.svelte';
	import * as Field from '$lib/components/ui/field/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as InputGroup from '$lib/components/ui/input-group/index.js';

	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import NativeSelect from '$lib/components/ui/native-select/native-select.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { Slider } from '$lib/components/ui/slider/index.js';
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import { RangeCalendar } from '$lib/components/ui/range-calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import CheckIcon from '@lucide/svelte/icons/check';
	import SearchIcon from '@lucide/svelte/icons/search';
	import { DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date';

	let datePickerValue: DateValue | undefined = $state();
	let comboboxValue = $state('');
	let comboboxOpen = $state(false);
	let sliderValue = $state([50]);

	const df = new DateFormatter('fr-FR', { dateStyle: 'long' });
	const fruits = ['Pomme', 'Poire', 'Banane', 'Orange', 'Fraise'];
	let filteredFruits = $derived(
		fruits.filter((f) => f.toLowerCase().includes(comboboxValue.toLowerCase()))
	);
</script>

<section class="space-y-8">
	<h2 class="window-title">Formulaires</h2>
	<p class="secondary-text">Composants de formulaire pour la saisie et la validation de données.</p>

	<Separator class="my-6" />

	<!-- Field -->
	<ComponentBlock
		name="Field"
		description="Form field wrapper with label, validation, error display, and description."
		install="npx shadcn-svelte@latest add field"
		variants="—"
	>
		<div class="max-w-sm space-y-3">
			<Field.Field>
				<Field.Label>Email</Field.Label>
				<Field.Content>
					<Input type="email" placeholder="email@example.com" />
				</Field.Content>
				<Field.Description>We'll never share your email.</Field.Description>
			</Field.Field>
			<Field.Field>
				<Field.Label>Password</Field.Label>
				<Field.Content>
					<Input type="password" placeholder="••••••••" />
				</Field.Content>
				<Field.Error>This field is required</Field.Error>
			</Field.Field>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Field.Field>
  <Field.Label>Email</Field.Label>
  <Field.Content>
    <Input type="email" placeholder="..." />
  </Field.Content>
  <Field.Description>Helper text</Field.Description>
  <Field.Error>Error message</Field.Error>
</Field.Field>`}</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Notes d'utilisation</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li>
					S'intègre avec <code class="text-xs">formsnap</code> +
					<code class="text-xs">sveltekit-superforms</code> pour validation
				</li>
				<li>
					Composants: Field, FieldSet, FieldLegend, FieldGroup, FieldLabel, FieldTitle,
					FieldDescription, FieldError
				</li>
			</ul>
		</div>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Label -->
	<ComponentBlock
		name="Label"
		description="Form label with accessibility support."
		install="npx shadcn-svelte@latest add label"
		variants="—"
	>
		<div class="space-y-2">
			<Label for="ex-name">Nom complet</Label>
			<Input id="ex-name" placeholder="Jean Dupont" />
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Label for="input-id">Label</Label>
<Input id="input-id" />`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Input -->
	<ComponentBlock
		name="Input"
		description="Text input field with type variants and states."
		install="npx shadcn-svelte@latest add input"
		variants="—"
	>
		<div class="space-y-3 max-w-sm">
			<Input placeholder="Default input" />
			<Input type="email" placeholder="email@example.com" />
			<Input type="password" placeholder="Password" />
			<Input placeholder="Disabled" disabled />
			<Input placeholder="With file" type="file" />
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Input placeholder="Text" />
<Input type="email" />
<Input disabled />`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- InputGroup -->
	<ComponentBlock
		name="InputGroup"
		description="Input with addons, buttons, or text prepended/appended."
		install="npx shadcn-svelte@latest add input-group"
		variants="—"
	>
		<div class="space-y-3 max-w-sm">
			<InputGroup.Root>
				<InputGroup.Text>$</InputGroup.Text>
				<InputGroup.Input placeholder="Amount" />
				<InputGroup.Text>.00</InputGroup.Text>
			</InputGroup.Root>
			<InputGroup.Root>
				<InputGroup.Input placeholder="Search..." />
				<InputGroup.Button><SearchIcon class="size-4" /></InputGroup.Button>
			</InputGroup.Root>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<InputGroup.Root>
  <InputGroup.Text>$</InputGroup.Text>
  <InputGroup.Input placeholder="..." />
  <InputGroup.Addon>Addon</InputGroup.Addon>
</InputGroup.Root>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- InputOTP -->
	<ComponentBlock
		name="InputOTP"
		description="One-time password input with separated slots."
		install="npx shadcn-svelte@latest add input-otp"
		variants="—"
	>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<InputOTP.Root maxlength={6}>
  <InputOTP.Group>
    <InputOTP.Slot index={0} />
    <InputOTP.Separator />
    <InputOTP.Slot index={3} />
  </InputOTP.Group>
</InputOTP.Root>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Textarea -->
	<ComponentBlock
		name="Textarea"
		description="Multi-line text input."
		install="npx shadcn-svelte@latest add textarea"
		variants="—"
	>
		<Textarea placeholder="Write your message..." class="max-w-sm" />
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Textarea placeholder="..." />
<Textarea disabled />`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Checkbox -->
	<ComponentBlock
		name="Checkbox"
		description="Binary checkbox input for selecting options."
		install="npx shadcn-svelte@latest add checkbox"
		variants="—"
	>
		<div class="flex items-center gap-2">
			<Checkbox id="terms" />
			<Label for="terms">Accept terms and conditions</Label>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Checkbox id="terms" />
<Label for="terms">Label</Label>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- RadioGroup -->
	<ComponentBlock
		name="RadioGroup"
		description="Group of mutually exclusive radio options."
		install="npx shadcn-svelte@latest add radio-group"
		variants="—"
	>
		<RadioGroup.Root value="option-1">
			<div class="flex items-center gap-2">
				<RadioGroup.Item value="option-1" id="r1" /><Label for="r1">Option 1</Label>
			</div>
			<div class="flex items-center gap-2">
				<RadioGroup.Item value="option-2" id="r2" /><Label for="r2">Option 2</Label>
			</div>
			<div class="flex items-center gap-2">
				<RadioGroup.Item value="option-3" id="r3" disabled /><Label for="r3">Disabled</Label>
			</div>
		</RadioGroup.Root>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<RadioGroup.Root value="opt1">
  <RadioGroup.Item value="opt1" />
  <Label>Option</Label>
</RadioGroup.Root>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Select -->
	<ComponentBlock
		name="Select"
		description="Custom select dropdown with search, groups, and keyboard navigation."
		install="npx shadcn-svelte@latest add select"
		variants="—"
	>
		<Select.Root type="single">
			<Select.Trigger class="w-[200px]">Select<ChevronDownIcon class="size-4" /></Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Fruits</Select.Label>
					<Select.Item value="apple">Apple</Select.Item>
					<Select.Item value="banana">Banana</Select.Item>
					<Select.Item value="orange">Orange</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select.Root>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Select.Root>
  <Select.Trigger>Select <ChevronDownIcon /></Select.Trigger>
  <Select.Content>
    <Select.Item value="apple">Apple</Select.Item>
  </Select.Content>
</Select.Root>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- NativeSelect -->
	<ComponentBlock
		name="NativeSelect"
		description="Native browser select element with shadcn styling."
		install="npx shadcn-svelte@latest add native-select"
		variants="—"
	>
		<div class="relative w-[200px]">
			<NativeSelect>
				<option value="1">Option 1</option>
				<option value="2">Option 2</option>
				<option value="3">Option 3</option>
			</NativeSelect>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<NativeSelect>
  <option value="1">Option</option>
</NativeSelect>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Combobox (composed) -->
	<ComponentBlock
		name="Combobox"
		description="Searchable select pattern using Command + Popover composition."
		install="npx shadcn-svelte@latest add command"
		variants="—"
	>
		<Popover.Root bind:open={comboboxOpen}>
			<Popover.Trigger
				><Button variant="outline" role="combobox" class="w-[200px] justify-between"
					>{comboboxValue || 'Select fruit…'}<ChevronDownIcon class="size-4 opacity-50" /></Button
				></Popover.Trigger
			>
			<Popover.Content class="p-0">
				<Command.Root>
					<Command.Input placeholder="Search fruit…" bind:value={comboboxValue} />
					<Command.List>
						<Command.Empty>Aucun résultat.</Command.Empty>
						<Command.Group>
							{#each filteredFruits as fruit (fruit)}
								<Command.Item
									value={fruit}
									onselect={() => {
										comboboxValue = fruit;
										comboboxOpen = false;
									}}
								>
									<CheckIcon
										class={cn('size-4', comboboxValue === fruit ? 'opacity-100' : 'opacity-0')}
									/>
									{fruit}
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.List>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Popover.Root bind:open={open}>
  <Popover.Trigger><Button role="combobox">Select...</Button></Popover.Trigger>
  <Popover.Content>
    <Command.Root>
      <Command.Input placeholder="Search..." />
      <Command.List>
        <Command.Empty>No results.</Command.Empty>
        <Command.Item value="item">Item</Command.Item>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>`}</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Notes d'utilisation</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li>
					Combobox est un pattern — composez <code class="text-xs">Popover</code> +
					<code class="text-xs">Command</code>
				</li>
				<li>Pas de composant Combobox dédié dans shadcn-svelte</li>
			</ul>
		</div>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Switch -->
	<ComponentBlock
		name="Switch"
		description="Toggle switch for binary settings."
		install="npx shadcn-svelte@latest add switch"
		variants="—"
	>
		<div class="flex items-center gap-2">
			<Switch id="notif-switch" />
			<Label for="notif-switch">Notifications</Label>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Switch id="switch-id" />
<Label for="switch-id">Label</Label>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Slider -->
	<ComponentBlock
		name="Slider"
		description="Range slider for numeric value selection."
		install="npx shadcn-svelte@latest add slider"
		variants="—"
	>
		<div class="max-w-sm space-y-3">
			<Slider type="multiple" bind:value={sliderValue} max={100} step={1} />
			<p class="text-sm text-muted-foreground">Valeur: {sliderValue[0]}</p>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Slider bind:value={value} max={100} step={1} />`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Calendar -->
	<ComponentBlock
		name="Calendar"
		description="Date calendar grid for date selection."
		install="npx shadcn-svelte@latest add calendar"
		variants="—"
	>
		<Calendar type="single" weekdayFormat="short" captionLayout="dropdown" />
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>&lt;Calendar weekdayFormat="short" captionLayout="dropdown" /&gt;</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Props principales</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li>
					<code class="text-xs">captionLayout</code>: "label" | "dropdown" | "dropdown-months" |
					"dropdown-years"
				</li>
				<li><code class="text-xs">weekdayFormat</code>: "short" | "long" | "narrow"</li>
				<li><code class="text-xs">locale</code>: string (default "en-US")</li>
				<li>
					Utilise <code class="text-xs">@internationalized/date</code> pour les types DateValue
				</li>
			</ul>
		</div>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- DatePicker (composed) -->
	<ComponentBlock
		name="DatePicker"
		description="Date picker composed from Calendar + Popover + Button."
		install="npx shadcn-svelte@latest add calendar popover"
		variants="—"
	>
		<Popover.Root>
			<Popover.Trigger>
				<Button variant="outline" class="w-[240px] justify-start">
					<CalendarIcon class="size-4" />
					{datePickerValue ? df.format(datePickerValue.toDate(getLocalTimeZone())) : 'Pick a date'}
				</Button>
			</Popover.Trigger>
			<Popover.Content class="w-auto p-0">
				<Calendar type="single" bind:value={datePickerValue} />
			</Popover.Content>
		</Popover.Root>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Popover.Root>
  <Popover.Trigger>
    <Button variant="outline">
      <CalendarIcon />
      {selectedDate || 'Pick date'}
    </Button>
  </Popover.Trigger>
  <Popover.Content>
    <Calendar bind:value={selectedDate} />
  </Popover.Content>
</Popover.Root>`}</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Notes d'utilisation</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li>
					DatePicker est un pattern — composez <code class="text-xs">Calendar</code> +
					<code class="text-xs">Popover</code>
					+ <code class="text-xs">Button</code>
				</li>
				<li>Utilisez <code class="text-xs">@internationalized/date</code> pour le formatage</li>
				<li><code class="text-xs">DateFormatter('fr-FR')</code> pour locale française</li>
			</ul>
		</div>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- RangeCalendar -->
	<ComponentBlock
		name="RangeCalendar"
		description="Calendar for selecting a date range."
		install="npx shadcn-svelte@latest add range-calendar"
		variants="—"
	>
		<RangeCalendar weekdayFormat="short" />
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>&lt;RangeCalendar weekdayFormat="short" /&gt;</code
			></pre>
	</ComponentBlock>
</section>
