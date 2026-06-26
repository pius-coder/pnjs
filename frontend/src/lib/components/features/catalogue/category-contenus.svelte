<script lang="ts">
	import ComponentBlock from './component-block.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import Accordion from '$lib/components/ui/accordion/accordion.svelte';
	import AccordionItem from '$lib/components/ui/accordion/accordion-item.svelte';
	import AccordionTrigger from '$lib/components/ui/accordion/accordion-trigger.svelte';
	import AccordionContent from '$lib/components/ui/accordion/accordion-content.svelte';
	import Carousel from '$lib/components/ui/carousel/carousel.svelte';
	import CarouselContent from '$lib/components/ui/carousel/carousel-content.svelte';
	import CarouselItem from '$lib/components/ui/carousel/carousel-item.svelte';
	import CarouselPrevious from '$lib/components/ui/carousel/carousel-previous.svelte';
	import CarouselNext from '$lib/components/ui/carousel/carousel-next.svelte';
	import AspectRatio from '$lib/components/ui/aspect-ratio/aspect-ratio.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
</script>

<section class="space-y-8">
	<h2 class="window-title">Contenus</h2>
	<p class="secondary-text">Composants d'affichage et de mise en forme du contenu.</p>

	<Separator class="my-6" />

	<!-- Card -->
	<ComponentBlock
		name="Card"
		description="Container for grouping related content with optional header, footer."
		install="npx shadcn-svelte@latest add card"
		variants="default | sm"
	>
		<div class="grid gap-4 md:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>Card Title</CardTitle>
					<CardDescription>Card description</CardDescription>
				</CardHeader>
				<CardContent><p class="text-sm text-muted-foreground">Body content here.</p></CardContent>
				<CardFooter><p class="text-xs text-muted-foreground">Footer</p></CardFooter>
			</Card>
			<Card size="sm">
				<CardHeader>
					<CardTitle>Small Card</CardTitle>
				</CardHeader>
				<CardContent><p class="text-sm text-muted-foreground">Compact variant.</p></CardContent>
			</Card>
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
						><td class="p-2">size</td><td class="p-2 font-mono">"default" | "sm"</td><td
							class="p-2 font-mono">"default"</td
						></tr
					>
				</tbody>
			</table>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Card>
  <CardHeader>
    <CardTitle>Titre</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Contenu</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>`}</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Notes d'utilisation</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li>
					Card utilise la surface <code class="text-xs">window-surface</code> avec
					<code class="text-xs">--radius-lg</code>
				</li>
				<li>
					Composants imbriqués: CardHeader, CardTitle, CardDescription, CardContent, CardFooter
				</li>
			</ul>
		</div>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Accordion -->
	<ComponentBlock
		name="Accordion"
		description="Expandable/collapsible content sections stacked vertically."
		install="npx shadcn-svelte@latest add accordion"
		variants="single | multiple"
	>
		<Accordion type="multiple" value={['item-1']} class="max-w-md">
			<AccordionItem value="item-1">
				<AccordionTrigger class="text-sm font-medium"
					>Section 1 <ChevronDownIcon class="size-4" /></AccordionTrigger
				>
				<AccordionContent class="text-sm text-muted-foreground"
					>Content for section 1.</AccordionContent
				>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger class="text-sm font-medium"
					>Section 2 <ChevronDownIcon class="size-4" /></AccordionTrigger
				>
				<AccordionContent class="text-sm text-muted-foreground"
					>Content for section 2.</AccordionContent
				>
			</AccordionItem>
		</Accordion>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Accordion value="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content</AccordionContent>
  </AccordionItem>
</Accordion>`}</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Notes d'utilisation</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li><code class="text-xs">type="single"</code> (default): un seul panneau ouvert</li>
				<li><code class="text-xs">type="multiple"</code>: plusieurs panneaux simultanément</li>
			</ul>
		</div>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Carousel -->
	<ComponentBlock
		name="Carousel"
		description="Scrollable carousel with previous/next navigation (uses embla-carousel)."
		install="npx shadcn-svelte@latest add carousel"
		variants="—"
	>
		<Carousel class="max-w-xs mx-auto">
			<CarouselContent>
				{#each ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4'] as slide (slide)}
					<CarouselItem>
						<div class="flex aspect-square items-center justify-center rounded-2xl bg-muted p-6">
							<p class="text-sm font-medium">{slide}</p>
						</div>
					</CarouselItem>
				{/each}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Carousel>
  <CarouselContent>
    {#each slides as slide}
      <CarouselItem>...</CarouselItem>
    {/each}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}</code
			></pre>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- AspectRatio -->
	<ComponentBlock
		name="AspectRatio"
		description="Container that maintains a specific aspect ratio for its content."
		install="npx shadcn-svelte@latest add aspect-ratio"
		variants="—"
	>
		<AspectRatio ratio={16 / 9} class="rounded-2xl bg-muted flex items-center justify-center">
			<p class="text-sm text-muted-foreground">16:9</p>
		</AspectRatio>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<AspectRatio ratio={16/9}>
  <img src="..." alt="..." />
</AspectRatio>`}</code
			></pre>
		<div class="rounded-md bg-muted/50 p-3 text-sm">
			<p class="font-medium mb-1">Notes d'utilisation</p>
			<ul class="list-disc pl-4 space-y-1 secondary-text">
				<li>
					Ratios courants: <code class="text-xs">16/9</code>, <code class="text-xs">4/3</code>,
					<code class="text-xs">1/1</code>, <code class="text-xs">3/2</code>
				</li>
			</ul>
		</div>
	</ComponentBlock>

	<Separator class="my-6" />

	<!-- Separator -->
	<ComponentBlock
		name="Separator"
		description="Visual divider between content sections."
		install="npx shadcn-svelte@latest add separator"
		variants="—"
	>
		<div class="space-y-2">
			<p class="text-sm">Above separator</p>
			<Separator />
			<p class="text-sm">Below separator</p>
		</div>
		<pre class="inset-surface overflow-x-auto text-sm p-3"><code
				>{`<Separator />
<Separator class="my-4" />`}</code
			></pre>
	</ComponentBlock>
</section>
