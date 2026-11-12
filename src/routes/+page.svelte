<script lang="ts">
	import About from '#lib/components/About.svelte';
	import Contact from '#lib/components/Contact.svelte';
	import Events from '#lib/components/Events.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import Nav from '#lib/components/Nav.svelte';
	import Pastor from '#lib/components/Pastor.svelte';
	import Sermons from '#lib/components/Sermons.svelte';
	import { address, scheduleSummary } from '#lib/church.ts';
</script>

<svelte:head>
	<title>First Baptist Church of Bellflower · Bellflower, Missouri</title>
	<meta
		name="description"
		content="A small Southern Baptist church at {address.street} in Bellflower, Missouri. {scheduleSummary} Everyone is welcome."
	/>
	<meta property="og:title" content="First Baptist Church of Bellflower" />
	<meta property="og:description" content="{scheduleSummary} {address.street}, Bellflower, MO." />
	<!-- PLACEHOLDER: once the cover photo is in static/, add
	<meta property="og:image" content="https://YOUR-DOMAIN/christmas-eve.jpg" /> -->
</svelte:head>

<a class="skip" href="#times">Skip to service times</a>
<Nav />
<main id="top">
	<Hero />
	<Events />
	<About />
	<Pastor />
	<Sermons />
	<Contact />
</main>
<Footer />

<style>
	.skip {
		position: absolute;
		left: -999px;
		top: 0.5rem;
		background: var(--gold);
		color: var(--bg);
		padding: 0.6rem 1rem;
		z-index: 20;
		font-weight: 700;
	}
	.skip:focus {
		left: 0.5rem;
	}
</style>
