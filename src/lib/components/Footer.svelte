<script lang="ts">
	import { facebookUrl, phone, youtubeUrl } from '#lib/church.ts';
</script>

<footer>
	<div class="wrap">
		<p>
			<strong>First Baptist Church of Bellflower</strong><span class="sep">·</span><span
				class="place">Bellflower, Missouri</span
			>
		</p>
		<p>
			Southern Baptist<span class="sep">·</span><span class="place"
				>Twin Rivers Baptist Association</span
			>
		</p>
		<p class="links">
			<a href={facebookUrl}>Facebook</a>
			<a href={youtubeUrl}>YouTube</a>
			<a class="nowrap" href={phone.tel}>{phone.display}</a>
		</p>
	</div>
</footer>

<style>
	footer {
		padding: 2.25rem 0 2.75rem;
		color: var(--soft);
		font-size: 1rem;
		text-align: center;
		border-top: 1px solid var(--line);
	}
	p {
		margin: 0.25rem 0;
	}
	strong {
		color: var(--cream);
	}
	.sep {
		margin-inline: 0.4em;
	}
	/* Phones: each part on its own line, so no separator dangles at a line end. */
	@media (max-width: 30rem) {
		.sep {
			display: none;
		}
		.place {
			display: block;
		}
	}
	.links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0 1.25rem;
		margin-top: 0.5rem;
	}
	.links a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
	}
</style>
