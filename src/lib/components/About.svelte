<script lang="ts">
	import { dev } from '$app/env';
	import { faithSource, missionStatement, statementOfFaith } from '#lib/church.ts';
</script>

<section class="section" id="about">
	<div class="wrap">
		<p class="kicker">About us</p>
		<h2 class="h2">Who we are</h2>

		{#if missionStatement || dev}
			<figure class="mission">
				<figcaption>Our mission</figcaption>
				{#if missionStatement}
					<blockquote>{missionStatement}</blockquote>
				{:else}
					<blockquote class="empty">Our mission statement goes here.</blockquote>
				{/if}
			</figure>
		{/if}

		<p class="since">
			<span class="year">1907</span>
			<span class="since-text"
				>Our building on Main Street went up in 1907, and it's where we still meet every week.</span
			>
			<!-- Tyler: add a sentence about when the congregation started, if anyone knows. -->
		</p>

		<h3 class="h3">What we believe</h3>
		<p class="lede">We're a Southern Baptist church. Here's what we hold to, in plain words.</p>
		<ul class="faith">
			{#each statementOfFaith as item (item.title)}
				<li><strong>{item.title}</strong>{item.text}</li>
			{/each}
		</ul>
		<p class="source">
			We affirm the <a href={faithSource.url}>{faithSource.name}</a>, the statement of faith shared
			by Southern Baptist churches.
		</p>
	</div>
</section>

<style>
	.h2 {
		margin-bottom: 1.25rem;
	}
	.mission {
		margin: 0 0 2.25rem;
		max-width: 46rem;
	}
	.mission figcaption {
		font: 700 0.875rem/1.3 var(--sans);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--soft);
		margin-bottom: 0.5rem;
	}
	blockquote {
		margin: 0;
		padding-left: 1.25rem;
		border-left: 4px solid var(--gold);
		font: 500 italic clamp(1.35rem, 3.2vw, 1.8rem)/1.4 var(--slab);
	}
	/* Same shape as the real quote, so nothing moves when the text arrives. */
	blockquote.empty {
		border-left-style: dashed;
		color: var(--soft);
	}
	.since {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 1.25rem;
		margin: 0 0 2.75rem;
		padding-block: 1.25rem;
		border-block: 1px solid var(--line);
		font-size: 1.15rem;
	}
	.since-text {
		flex: 1 1 14rem;
		min-width: 0;
	}
	.year {
		font: 700 clamp(2.5rem, 7vw, 3.5rem)/1 var(--slab);
		color: var(--gold);
		letter-spacing: -0.02em;
	}
	.h3 {
		font: 700 clamp(1.7rem, 4vw, 2.1rem)/1.15 var(--slab);
		margin: 0 0 0.5rem;
	}
	.faith {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1.25rem 3rem;
	}
	@media (min-width: 48rem) {
		.faith {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}
		/* An odd last item spans both columns instead of leaving a hole. */
		.faith li:last-child:nth-child(odd) {
			grid-column: 1 / -1;
		}
	}
	.faith li {
		padding-left: 1.1rem;
		border-left: 3px solid var(--gold);
	}
	.faith strong {
		display: block;
		font: 700 1.25rem/1.3 var(--slab);
	}
	.source {
		margin: 2rem 0 0;
		color: var(--soft);
	}
</style>
