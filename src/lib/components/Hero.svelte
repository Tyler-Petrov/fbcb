<script lang="ts">
	import { dev } from '$app/env';
	import { address, directionsUrl, events, heroPhoto, phone, schedule } from '#lib/church.ts';
	import {
		bellflowerNow,
		builtOn,
		isUpcoming,
		nextGathering,
		type BellflowerNow
	} from '#lib/time.ts';
	import Icon from './Icon.svelte';

	// Only known in the browser: the built HTML has no badge, and it appears once the page loads.
	let now = $state<BellflowerNow | null>(null);
	$effect(() => {
		now = bellflowerNow();
		const timer = setInterval(() => (now = bellflowerNow()), 60_000);
		return () => clearInterval(timer);
	});

	let next = $derived(
		now
			? nextGathering(
					schedule.flatMap((group) => group.rows),
					now
				)
			: null
	);
	let notices = $derived(
		events.filter((e) => e.notice && isUpcoming(e, now?.iso ?? builtOn)).map((e) => e.notice)
	);
</script>

<section class="hero" aria-label="Welcome">
	<div class="wrap">
		<div class={['grid', { 'has-notice': notices.length > 0 }]}>
			<div class="intro">
				<p class="kicker">Southern Baptist · Main Street, Bellflower</p>
				<h1 class="title">First Baptist Church <small>of Bellflower, Missouri</small></h1>
				<p class="welcome">
					<span class="wide-only">A small church with an open door.{' '}</span>Come as you are.
					You'll be welcome here.
				</p>
			</div>

			<div class="sched">
				<div class="card schedule" id="times" tabindex="-1">
					<h2>Service times</h2>
					{#each schedule as group (group.day)}
						<p class="day">{group.day}</p>
						{#each group.rows as row (row.what)}
							<div class="row">
								<span class="what">
									{row.what}
									{#if next?.row === row}
										<span class="badge">{next.live ? 'Now' : 'Next'}</span>
									{/if}
								</span>
								<span class="time">{row.time}<span>{row.ampm}</span></span>
							</div>
						{/each}
					{/each}
				</div>
			</div>

			{#if notices.length}
				<div class="notices">
					{#each notices as notice (notice)}
						<a class="notice" href="#events">{notice} <span>Details</span></a>
					{/each}
				</div>
			{/if}

			<div class="cta">
				<p class="where">
					<strong class="nowrap">{address.street},</strong> Bellflower
				</p>
				<div class="actions">
					<a class="btn btn--gold" href={directionsUrl}><Icon name="pin" /> Get directions</a>
					<a class="btn btn--line" href={phone.tel}
						><Icon name="phone" /> Call <span class="nowrap">{phone.display}</span></a
					>
				</div>
			</div>
		</div>

		{#if heroPhoto}
			<figure class="photo">
				<img
					src={heroPhoto.src}
					width={heroPhoto.width}
					height={heroPhoto.height}
					alt={heroPhoto.alt}
				/>
				<figcaption>{heroPhoto.caption}</figcaption>
			</figure>
		{:else if dev}
			<figure class="photo">
				<div class="photo-empty"><p>Our Christmas Eve church family photo goes here</p></div>
			</figure>
		{/if}
	</div>
</section>

<style>
	.hero {
		padding: 3rem 0 2.5rem;
	}
	.grid {
		display: grid;
		gap: 1.5rem;
		align-items: center;
		grid-template-columns: minmax(0, 1fr);
		grid-template-areas: 'intro' 'sched' 'cta';
	}
	.grid.has-notice {
		grid-template-areas: 'intro' 'sched' 'notice' 'cta';
	}
	.notices {
		grid-area: notice;
	}
	.intro {
		grid-area: intro;
	}
	.sched {
		grid-area: sched;
	}
	.cta {
		grid-area: cta;
	}
	@media (min-width: 56rem) {
		.grid {
			grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
			grid-template-areas: 'intro sched' 'cta sched';
			gap: 0 3.5rem;
		}
		.grid.has-notice {
			grid-template-areas: 'intro sched' 'cta sched' 'cta notice';
		}
		.cta {
			align-self: start;
		}
		.sched {
			align-self: start;
			margin-top: 1.9rem;
		}
		.notices {
			align-self: start;
			margin-top: 0.75rem;
		}
	}
	.title {
		margin: 0;
		font: 700 clamp(2.5rem, 8vw, 4.6rem)/0.98 var(--slab);
		font-size: min(clamp(2.5rem, 8vw, 4.6rem), 14vw);
		letter-spacing: -0.015em;
	}
	.title small {
		display: block;
		font: 500 italic clamp(1.35rem, 3.5vw, 2rem)/1.2 var(--slab);
		font-size: min(clamp(1.35rem, 3.5vw, 2rem), 9vw);
		color: var(--gold);
		margin-top: 0.5rem;
		letter-spacing: 0;
	}
	.welcome {
		margin: 1.1rem 0 0;
		font-size: 1.2rem;
		max-width: 30rem;
	}
	.where {
		margin: 1.1rem 0 0;
		color: var(--soft);
	}
	.where strong {
		color: var(--cream);
	}
	@media (max-width: 55.99rem) {
		.where {
			margin-top: 0;
		}
		/* Tablets: keep each time close to its label. */
		.sched,
		.notices {
			max-width: 34rem;
		}
	}

	/* Schedule card, grouped by day like a bulletin */
	.schedule {
		padding: 1.25rem 1.4rem 0.6rem;
	}
	.schedule h2 {
		margin: 0 0 0.25rem;
		font: 700 0.875rem/1.3 var(--sans);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--gold);
	}
	.day {
		font: 700 1.35rem/1.2 var(--slab);
		font-size: min(1.35rem, 10vw);
		margin: 1rem 0 0.1rem;
	}
	.row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0 1rem;
		padding: 0.55rem 0;
		border-bottom: 1px solid var(--line);
	}
	.row:last-child {
		border-bottom: 0;
	}
	.what {
		font-weight: 600;
		font-size: 1.1rem;
	}
	.time {
		margin-left: auto;
		font: 700 1.5rem/1 var(--slab);
		font-size: min(1.5rem, 12vw);
		white-space: nowrap;
	}
	.time span {
		font: 600 1rem/1 var(--sans);
		margin-left: 0.25rem;
	}
	.badge {
		display: inline-block;
		margin-left: 0.4rem;
		vertical-align: 0.12em;
		white-space: nowrap;
		font: 700 0.8rem/1 var(--sans);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		background: var(--gold);
		color: var(--bg);
		padding: 0.25rem 0.45rem;
		border-radius: 4px;
	}
	.notice {
		display: block;
		padding: 0.75rem 1rem;
		border: 2px solid var(--gold);
		border-radius: 10px;
		font-weight: 600;
		color: var(--cream);
		text-decoration: none;
	}
	.notice span {
		color: var(--gold);
		text-decoration: underline;
		text-underline-offset: 0.2em;
		white-space: nowrap;
	}
	.notice span::after {
		content: ' →';
	}

	/* Photo: keeps its own shape; the caption sits below so it never covers faces. */
	.photo {
		margin: 2.5rem 0 0;
	}
	.photo :global(img) {
		width: 100%;
		height: auto;
		border-radius: 12px;
	}
	.photo :global(figcaption) {
		padding: 0.75rem 0 0;
		color: var(--soft);
		font: 500 italic 1.05rem/1.3 var(--slab);
	}
	.photo-empty {
		aspect-ratio: 3 / 2;
		display: grid;
		place-items: center;
		border: 1.5px dashed var(--line);
		border-radius: 12px;
		background: var(--bg-alt);
	}
	.photo-empty p {
		margin: 0;
		color: var(--soft);
		font: 500 italic 1.1rem/1.3 var(--slab);
		padding: 0 1rem;
		text-align: center;
	}

	@media (max-width: 30rem) {
		.hero {
			padding-top: 1rem;
		}
		.kicker {
			display: none;
		}
		.welcome {
			margin-top: 0.75rem;
		}
		.grid {
			gap: 1.1rem;
		}
		.schedule {
			padding: 0.9rem 1.2rem 0.3rem;
		}
		.day {
			margin-top: 0.5rem;
		}
		.row {
			padding: 0.45rem 0;
		}
		.actions :global(.btn) {
			flex: 1 1 100%;
		}
		/* Edge to edge: undo the page gutter (half of min(2.5rem, 10vw) per side). */
		.photo {
			margin-inline: max(-1.25rem, -5vw);
		}
		.photo :global(img),
		.photo-empty {
			border-radius: 0;
		}
		.photo-empty {
			border-inline: 0;
		}
		.photo :global(figcaption) {
			padding-inline: min(1.25rem, 5vw);
		}
	}
</style>
