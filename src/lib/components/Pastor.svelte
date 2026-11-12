<script lang="ts">
	import { dev } from '$app/env';
	import { pastor, phone } from '#lib/church.ts';

	import Icon from './Icon.svelte';

	// Empty slots show while developing and are left out of the published site.
	const showPhoto = pastor.photo || dev;
</script>

<section class="section section--alt" id="pastor">
	<div class={['wrap', 'grid', { 'no-photo': !showPhoto }]}>
		<div class="head">
			<p class="kicker">Our pastor</p>
			<h2 class="h2">{pastor.name}</h2>
		</div>

		{#if pastor.photo}
			<img
				class="photo"
				width="800"
				height="1000"
				loading="lazy"
				src={pastor.photo}
				alt="{pastor.name}, pastor of First Baptist Church of Bellflower"
			/>
		{:else if dev}
			<div class="photo photo--empty"><p>Photo of {pastor.name} goes here</p></div>
		{/if}

		<div class="text">
			{#if pastor.bio}
				{#each pastor.bio as paragraph (paragraph)}
					<p>{paragraph}</p>
				{/each}
			{:else if dev}
				<p class="empty">A few words about {pastor.name} go here.</p>
			{/if}
			<p>Questions about faith, or just need someone to talk to? Call the church; he answers.</p>
			<div class="actions">
				<a class="btn btn--line" href={phone.tel}
					><Icon name="phone" /> Call <span class="nowrap">{phone.display}</span></a
				>
			</div>
		</div>
	</div>
</section>

<style>
	/* Phones: name, then photo, then words. Wider screens: photo on the left. */
	.grid {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: minmax(0, 1fr);
		grid-template-areas: 'head' 'photo' 'text';
	}
	@media (min-width: 48rem) {
		.grid {
			grid-template-columns: minmax(16rem, 20rem) minmax(0, 1fr);
			grid-template-areas: 'photo head' 'photo text';
			grid-template-rows: auto 1fr;
			gap: 0 3.5rem;
		}
	}
	.head {
		grid-area: head;
		align-self: end;
	}
	.head .h2 {
		margin-bottom: 0;
	}
	.photo {
		grid-area: photo;
		width: 100%;
		max-width: 20rem;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		object-position: center 25%;
		border-radius: 12px;
	}
	.photo--empty {
		display: grid;
		place-items: center;
		border: 1.5px dashed var(--line);
		background: var(--bg);
	}
	.photo--empty p {
		margin: 0;
		padding: 0 1rem;
		text-align: center;
		color: var(--soft);
		font: 500 italic 1.1rem/1.3 var(--slab);
	}
	@media (max-width: 47.99rem) {
		.photo {
			max-width: 15rem;
		}
	}
	.text {
		grid-area: text;
	}
	@media (min-width: 48rem) {
		.text {
			padding-top: 1rem;
		}
	}
	.text p {
		margin: 0 0 1rem;
		max-width: 36rem;
		font-size: 1.15rem;
	}
	.text .empty {
		padding-left: 1rem;
		border-left: 3px dashed var(--line);
		color: var(--soft);
		font: 500 italic 1.15rem/1.5 var(--slab);
	}
	.actions {
		margin-top: 1.25rem;
	}
	@media (max-width: 30rem) {
		.actions .btn {
			flex: 1 1 100%;
		}
	}
	/* Published without a photo: name, then words, at every width. */
	.grid.no-photo {
		grid-template-rows: auto;
		grid-template-columns: minmax(0, 1fr);
		grid-template-areas: 'head' 'text';
	}
</style>
