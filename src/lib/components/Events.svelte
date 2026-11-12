<script lang="ts">
	import { events, facebookUrl, phone } from '#lib/church.ts';
	import { bellflowerNow, builtOn, isUpcoming } from '#lib/time.ts';

	// Starts from the build date (so the built HTML already leaves out past events), then
	// switches to today's date in the visitor's browser.
	let today = $state(builtOn);
	$effect(() => {
		today = bellflowerNow().iso;
	});
	let upcoming = $derived(events.filter((e) => isUpcoming(e, today)));
</script>

<section class="section section--alt" id="events">
	<div class="wrap">
		<p class="kicker">Coming up</p>
		<h2 class="h2">Events</h2>
		<p class="lede">News goes up in our Facebook group first.</p>

		{#each upcoming as event (event.id)}
			<article class="card event">
				<!-- Date beside the title; when the title runs out of room (narrow screen or large
				     text), it wraps below the date instead of squeezing into a sliver. -->
				<div class="top">
					<div class="date" aria-hidden="true">
						<div class="m">{event.month}</div>
						<div class="d">{event.date}</div>
					</div>
					<div class="heading">
						<h3>{event.title}</h3>
						<p class="when">{event.when}</p>
					</div>
				</div>
				<div class="body">
					<dl class="details">
						{#each event.details as [label, value] (label)}
							<div>
								<dt>{label}</dt>
								<dd>{value}</dd>
							</div>
						{/each}
					</dl>
					<p>{event.body}</p>
					{#if event.rsvp}
						<p>
							<strong>RSVP by text to <a class="tel" href={phone.sms}>{phone.display}</a></strong> so
							there's enough food.
						</p>
					{/if}
				</div>
			</article>
		{:else}
			<p class="card empty">
				Nothing special on the calendar right now. Join us any Sunday or Wednesday; the times are at
				the top of the page.
			</p>
		{/each}

		<p class="more">
			<a class="btn btn--line" href={facebookUrl}>See our Facebook group</a>
		</p>
	</div>
</section>

<style>
	.event {
		padding: 1.5rem;
	}
	.event + .event {
		margin-top: 1rem;
	}
	.empty {
		margin: 0;
		padding: 1.25rem 1.5rem;
		font-size: 1.15rem;
	}
	.top {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 1.4rem;
	}
	.date {
		flex: none;
		width: 5.25rem;
		text-align: center;
		border: 2px solid var(--gold);
		border-radius: 10px;
		padding: 0.55rem 0 0.65rem;
		align-self: start;
	}
	.heading {
		flex: 1 1 11rem;
		min-width: 0;
	}
	.m {
		font: 700 0.875rem/1 var(--sans);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--gold);
	}
	.d {
		font: 700 2.3rem/1 var(--slab);
		margin-top: 0.2rem;
	}
	h3 {
		hyphens: manual;
		font: 700 1.6rem/1.15 var(--slab);
		margin: 0.1rem 0 0.3rem;
	}
	.event .when {
		color: var(--gold);
		font-weight: 700;
		margin: 0;
		text-wrap: balance;
	}
	.body {
		margin-top: 1rem;
	}
	@media (min-width: 34rem) {
		/* Line the details up under the title, past the date box. */
		.body {
			padding-left: 6.65rem;
		}
	}
	.details {
		margin: 0 0 1rem;
		display: grid;
		gap: 0.3rem;
	}
	.details div {
		display: grid;
		grid-template-columns: 5rem minmax(0, 1fr);
		gap: 1rem;
	}
	dt {
		color: var(--gold);
		font-weight: 700;
	}
	dd {
		margin: 0;
	}
	.event p {
		margin: 0 0 0.8rem;
	}
	.body > :last-child {
		margin-bottom: 0;
	}
	.tel {
		display: inline-block;
		padding: 0.5rem 0;
		margin: -0.5rem 0;
		white-space: nowrap;
	}
	@media (max-width: 33.99rem) {
		.event {
			padding: min(1.25rem, 5vw);
		}
		.date {
			width: 4.25rem;
		}
		.d {
			font-size: 2rem;
		}
		h3 {
			font-size: 1.4rem;
		}
		.event .when {
			font-size: 1rem;
		}
		/* Label above value, so long values get the full width. */
		.details {
			gap: 0.6rem;
		}
		.details div {
			grid-template-columns: minmax(0, 1fr);
			gap: 0;
		}
	}
	.more {
		margin-top: 1.25rem;
	}
</style>
