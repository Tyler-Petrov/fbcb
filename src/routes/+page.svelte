<script lang="ts">
	import Events from '#lib/components/Events.svelte';
	import Facts from '#lib/components/Facts.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import Visit from '#lib/components/Visit.svelte';
	import { address, scheduleSummary, tagline } from '#lib/church.ts';
</script>

<svelte:head>
	<title>First Baptist Church of Bellflower · Bellflower, Missouri</title>
	<meta
		name="description"
		content="A small Southern Baptist church at {address.street} in Bellflower, Missouri. {scheduleSummary}. {tagline.join(
			' '
		)}"
	/>
	<meta property="og:title" content="First Baptist Church of Bellflower" />
	<meta property="og:description" content="{scheduleSummary}. {address.street}, Bellflower, MO." />
</svelte:head>

<a class="skip" href="#times">Skip to service times</a>
<Hero />
<main>
	<Visit />
	<Events />
	<Facts />
</main>
<footer class="frame">
	First Baptist Church of Bellflower, {address.street}, {address.city}
</footer>

<style>
	.skip {
		position: absolute;
		left: -999px;
		top: 0.5rem;
		z-index: 20;
		padding: 0.6rem 1rem;
		background: var(--cream);
		color: var(--green);
		font-weight: 700;
	}
	.skip:focus {
		left: 0.5rem;
	}
	footer {
		padding-block: 1.75rem 2.75rem;
		color: var(--sage);
		font-size: 1rem;
	}
</style>
