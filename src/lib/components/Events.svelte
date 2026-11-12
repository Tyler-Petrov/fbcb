<script lang="ts">
	import { events, phone } from '#lib/church.ts';
	import { builtOn, isUpcoming } from '#lib/time.ts';

	// Events already over when the site was built are left out. The script in src/app.html hides
	// the rest in the visitor's browser after their last day.
	const upcoming = events.filter((e) => isUpcoming(e, builtOn));

	// The title's longest word sets how small the title may get on a narrow screen with enlarged
	// text, so that no word has to split. A letter of the title font is at most about 0.74em wide.
	// A soft hyphen (\u00AD) in church.ts marks where a long word may break instead.
	const fit = (title: string) =>
		Math.max(...title.split(/[\s\u00AD]+/).map((w) => w.length)) * 0.74;
</script>

{#each upcoming as event (event.id)}
	<section
		class="event frame"
		id={event.id}
		aria-labelledby="{event.id}-title"
		data-last-day={event.lastDay}
		style:--fit={fit(event.title)}
	>
		<!-- The date shows above the title but follows it in the page, so a screen reader reads
		     the title, then the date. -->
		<div class="head">
			<h2 id="{event.id}-title">{event.title}</h2>
			<p class="date">{event.when}</p>
		</div>
		<div class="text">
			{#each event.text as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}
			{#if event.rsvp}
				<p class="acts">
					<a class="btn" href={phone.sms}
						><span>Text</span> <span>{phone.display}</span> <span>to RSVP</span></a
					>
				</p>
			{/if}
		</div>
	</section>
{/each}

<style>
	.event {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1rem;
		margin-top: 2.75rem;
		padding: 1.5rem min(1.25rem, 20px) 1.6rem;
		border-radius: 4px;
		background: var(--green-lit);
	}
	.head {
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-end;
	}
	.date {
		font-style: italic;
		color: var(--sage);
	}
	h2 {
		margin: 0.15rem 0 0;
		font: 800 clamp(1.7rem, 7vw, 2.3rem) / 1.08 var(--face);
		/* Enlarged text: capped so the longest word fits inside the panel, which is the screen less
		   40px of page margin and 40px of padding. */
		font-size: min(clamp(1.7rem, 7vw, 2.3rem), (100vw - min(5rem, 80px)) / var(--fit, 6.6));
		letter-spacing: -0.01em;
		hyphens: manual;
	}
	.text {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 0.85rem;
	}

	@media (min-width: 52rem) {
		.event {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
			gap: 3rem;
			margin-top: 3.5rem;
			padding: 2rem;
		}
		/* Here the title has the narrower of two columns: the panel less 4rem of padding and a
		   3rem gap, split 1 to 1.25. */
		h2 {
			font-size: min(
				clamp(1.7rem, 7vw, 2.3rem),
				(min(100vw - min(2.5rem, 40px), 56rem) - 7rem) / 2.25 / var(--fit, 6.6)
			);
		}
	}
</style>
