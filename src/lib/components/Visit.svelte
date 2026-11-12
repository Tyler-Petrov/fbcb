<script lang="ts">
	import { address, directionsUrl, events, phone, schedule } from '#lib/church.ts';
	import { builtOn, isUpcoming } from '#lib/time.ts';

	// Upcoming events that move or change a regular service get a line right under the times.
	// The script in src/app.html hides it after the event's last day.
	const notices = events.filter((e) => e.notice && isUpcoming(e, builtOn));
</script>

<section class="frame" aria-labelledby="times-heading">
	<h2 id="times-heading" class="visually-hidden">Service times and directions</h2>
	<ul class="times" id="times" tabindex="-1" aria-label="Every week">
		{#each schedule as row (row.what)}
			<li>
				<span class="what">{row.what}</span>
				<span class="time">{row.time} <small>{row.ampm}</small></span>
			</li>
		{/each}
	</ul>
	{#each notices as event (event.id)}
		<p class="notice" data-last-day={event.lastDay}>
			<a href="#{event.id}">{event.notice}</a>
		</p>
	{/each}
	<div class="find">
		<p class="where">{address.street}, Bellflower, Missouri</p>
		<p class="acts">
			<a class="btn" href={directionsUrl}>Get directions</a>
			<a class="btn btn--line" href={phone.tel}><span>Call</span> <span>{phone.display}</span></a>
		</p>
	</div>
</section>

<style>
	.times {
		list-style: none;
		margin: 1.6rem 0 0;
		padding: 0;
		border-bottom: 1px solid var(--line);
	}
	.times:focus {
		outline: none;
	}
	/* The time sits at the right of its name, and drops under it when enlarged text runs out of
	   room. */
	li {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: baseline;
		gap: 0 1rem;
		padding: 0.65rem 0;
		border-top: 1px solid var(--line);
	}
	.what {
		flex: 1 1 8rem;
		font-weight: 500;
	}
	.time {
		font-weight: 700;
		font-size: 1.5rem;
		line-height: 1.1;
		white-space: nowrap;
	}
	small {
		font-size: 1rem;
		font-weight: 500;
	}
	.notice {
		margin-top: 1.1rem;
		padding-left: 0.85rem;
		border-left: 3px solid var(--cream);
		font-weight: 700;
	}
	.where {
		margin-top: 1.25rem;
		font-weight: 700;
	}
	.acts {
		margin-top: 0.8rem;
	}

	@media (min-width: 52rem) {
		/* Three across, each time under its name. */
		.times {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			column-gap: 2rem;
			padding-block: 0.85rem 1rem;
			border-top: 1px solid var(--line);
		}
		li {
			display: block;
			padding: 0;
			border: 0;
		}
		.what,
		.time {
			display: block;
		}
		.time {
			margin-top: 0.15rem;
			font-size: 2rem;
		}
		/* The buttons sit beside the address, and move under it when enlarged text needs the
		   room. */
		.find {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			gap: 0.8rem 2rem;
			margin-top: 1.1rem;
		}
		.where,
		.acts {
			margin-top: 0;
		}
		.acts {
			flex: 0 1 auto;
		}
	}
</style>
