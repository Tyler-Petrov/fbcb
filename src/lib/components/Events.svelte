<script lang="ts">
	import { onMount } from 'svelte';
	import { events, phone } from '#lib/church.ts';
	import { bellflowerDate, builtOn, isUpcoming } from '#lib/time.ts';

	// Starts from the build date (so the built HTML already leaves out past events), then
	// switches to today's date in the visitor's browser.
	let today = $state(builtOn);
	onMount(() => {
		today = bellflowerDate();
	});
	let upcoming = $derived(events.filter((e) => isUpcoming(e, today)));
</script>

{#each upcoming as event (event.id)}
	<section class="event frame" aria-labelledby={event.id}>
		<div>
			<p class="date">{event.when}</p>
			<h2 id={event.id}>{event.title}</h2>
		</div>
		<div class="text">
			{#each event.text as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}
			{#if event.rsvp}
				<p class="acts">
					<a class="btn" href={phone.sms}><span>Text {phone.display}</span> <span>to RSVP</span></a>
				</p>
			{/if}
		</div>
	</section>
{/each}

<style>
	.event {
		display: grid;
		gap: 1rem;
		margin-top: 2.75rem;
		padding: 1.5rem 1.25rem 1.6rem;
		border-radius: 4px;
		background: var(--green-lit);
	}
	.date {
		font-style: italic;
		color: var(--sage);
	}
	h2 {
		margin: 0.15rem 0 0;
		font: 800 clamp(1.7rem, 7vw, 2.3rem) / 1.08 var(--face);
		letter-spacing: -0.01em;
		hyphens: manual;
	}
	.text {
		display: grid;
		gap: 0.85rem;
	}

	@media (min-width: 52rem) {
		.event {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
			gap: 3rem;
			margin-top: 3.5rem;
			padding: 2rem;
		}
	}
</style>
