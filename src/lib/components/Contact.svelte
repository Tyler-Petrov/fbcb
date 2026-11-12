<script lang="ts">
	import {
		address,
		directionsUrl,
		facebookUrl,
		mapEmbedUrl,
		phone,
		schedule,
		youtubeUrl
	} from '#lib/church.ts';
	import Icon from './Icon.svelte';
</script>

<section class="section section--alt" id="contact">
	<div class="wrap">
		<p class="kicker">Visit</p>
		<h2 class="h2">Come see us</h2>
		<p class="lede">Everyone's welcome, any Sunday or Wednesday.</p>
		<div class="grid">
			<div>
				<ul class="ways">
					<li>
						<a href={directionsUrl}>
							<Icon name="pin" />
							<span class="main">{address.street}<span class="sub">{address.city}</span></span>
							<span class="go">Directions</span>
						</a>
					</li>
					<li>
						<a href={phone.tel}>
							<Icon name="phone" />
							<span class="main"
								><span class="nowrap">{phone.display}</span><span class="sub">The church phone</span
								></span
							>
							<span class="go">Call</span>
						</a>
					</li>
				</ul>

				<dl class="times">
					{#each schedule as group (group.day)}
						<div>
							<dt>{group.day}s</dt>
							{#each group.rows as row (row.what)}
								<dd>{row.what} {row.time} {row.ampm}</dd>
							{/each}
						</div>
					{/each}
				</dl>

				<p class="social">
					<a href={facebookUrl}><Icon name="facebook" /> Facebook group</a>
					<a href={youtubeUrl}><Icon name="youtube" /> YouTube</a>
				</p>
			</div>
			<div class="map">
				<iframe
					title="Map showing First Baptist Church of Bellflower at {address.street}"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					src={mapEmbedUrl}
				></iframe>
			</div>
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 2rem;
	}
	@media (min-width: 52rem) {
		.grid {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
			gap: 3rem;
		}
	}

	/* Two big tap targets: the whole row is the link. */
	.ways {
		list-style: none;
		margin: 0;
		padding: 0;
		border-block: 1px solid var(--line);
	}
	.ways li + li {
		border-top: 1px solid var(--line);
	}
	.ways a {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		grid-template-areas: 'icon main go';
		align-items: center;
		gap: 0.5rem 1rem;
		padding: 1.1rem 0;
		color: var(--cream);
		text-decoration: none;
	}
	.ways :global(svg) {
		grid-area: icon;
		width: 1.6rem;
		height: 1.6rem;
		color: var(--gold);
	}
	.main {
		grid-area: main;
		font: 700 1.45rem/1.25 var(--slab);
		/* Keeps the phone number on one line at very large text sizes. */
		font-size: min(1.45rem, 7.5vw);
	}
	.main .sub {
		display: block;
		font: 400 1rem/1.4 var(--sans);
		color: var(--soft);
		margin-top: 0.15rem;
		/* Stays smaller than the heading above it, even with very large text. */
		font-size: min(1rem, 6.5vw);
	}
	.go {
		grid-area: go;
		font: 700 1rem/1 var(--sans);
		color: var(--bg);
		background: var(--gold);
		padding: 0.85rem 1.1rem;
		border-radius: 8px;
		text-align: center;
	}
	.ways a:hover .main {
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}
	@media (max-width: 30rem) {
		.ways a {
			grid-template-columns: auto minmax(0, 1fr);
			grid-template-areas: 'icon main' 'go go';
		}
		.ways :global(svg) {
			align-self: start;
			margin-top: 0.2rem;
		}
	}

	.times {
		margin: 1.75rem 0 0;
		display: grid;
		gap: 0.75rem;
	}
	.times div {
		display: grid;
		grid-template-columns: 7.5rem minmax(0, 1fr);
		column-gap: 1rem;
	}
	.times dt {
		font-weight: 700;
		grid-row: span 2;
	}
	.times dd {
		margin: 0;
		grid-column: 2;
		color: var(--soft);
	}
	@media (max-width: 30rem) {
		.times div {
			grid-template-columns: 1fr;
		}
		.times dd {
			grid-column: 1;
		}
	}

	.social {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.5rem;
		margin: 1.5rem 0 0;
	}
	.social a {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		min-height: 44px;
		font-weight: 600;
	}
	.social :global(svg) {
		width: 1.25rem;
		height: 1.25rem;
	}

	.map {
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid var(--line);
		min-height: 20rem;
		background: var(--card);
	}
	.map iframe {
		width: 100%;
		height: 100%;
		min-height: 20rem;
		border: 0;
		display: block;
	}
</style>
