<script lang="ts">
	import pastorPhoto from '#lib/assets/pastor-jim.jpg';
	import {
		facebookUrl,
		faithSource,
		pastor,
		phone,
		statementOfFaith,
		youtubeUrl
	} from '#lib/church.ts';
</script>

<!-- Each row has a small heading, so screen reader users can jump between them. -->
<div class="facts frame">
	<div class="row pastor">
		<h2>{pastor}</h2>
		<div class="body">
			<p>
				The church phone rings {pastor}. Call with a question about faith, or if you just need
				someone to talk to. <a class="nowrap" href={phone.tel}>{phone.display}</a>
			</p>
			<img src={pastorPhoto} width="240" height="300" loading="lazy" alt="Photo of {pastor}" />
		</div>
	</div>
	<div class="row">
		<h2>Sermons</h2>
		<p class="body">Missed a Sunday? <a href={youtubeUrl}>Watch on YouTube</a>.</p>
	</div>
	<div class="row">
		<h2>News</h2>
		<p class="body">It goes up in our <a href={facebookUrl}>Facebook group</a> first.</p>
	</div>
	<div class="row">
		<h2>Beliefs</h2>
		<div class="body">
			<details>
				<summary>Read what we believe</summary>
				<dl class="beliefs">
					{#each statementOfFaith as item (item.title)}
						<div>
							<dt>{item.title}</dt>
							<dd>{item.text}</dd>
						</div>
					{/each}
				</dl>
				<p>
					We affirm the <a href={faithSource.url}>{faithSource.name}</a>, the statement of faith
					shared by Southern Baptist churches.
				</p>
			</details>
		</div>
	</div>
	<div class="row">
		<h2>On Main Street</h2>
		<p class="body">
			Our building went up in 1907, and it's where we still meet every week. We're a Southern
			Baptist church, part of the Twin Rivers Baptist Association.
		</p>
	</div>
</div>

<style>
	.facts {
		margin-block: 2.75rem 0;
		border-bottom: 1px solid var(--line);
	}
	.row {
		padding: 1.1rem 0 1.2rem;
		border-top: 1px solid var(--line);
	}
	h2 {
		margin: 0;
		font: inherit;
		font-weight: 800;
	}
	.body {
		margin-top: 0.2rem;
	}
	.body a {
		font-weight: 700;
	}
	/* His photo sits to the right of the words, in a cream mat like a print from the church
	   album. With enlarged text the photo moves under the words. */
	.pastor .body {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: 1rem;
		margin-top: 0.6rem;
	}
	.pastor p {
		flex: 1 1 10rem;
		min-width: 0;
	}
	.pastor img {
		flex: none;
		width: 6rem;
		height: auto;
		border: 0.3rem solid var(--cream);
		border-radius: 4px;
	}
	summary {
		cursor: pointer;
		font-weight: 700;
		text-decoration: underline;
		text-decoration-thickness: 1.5px;
		text-underline-offset: 0.22em;
	}
	.beliefs {
		display: grid;
		gap: 0.9rem;
		margin: 1rem 0 0;
	}
	.beliefs dt {
		font-weight: 700;
	}
	.beliefs dd {
		margin: 0.1rem 0 0;
		color: var(--sage);
	}
	.beliefs + p {
		margin-top: 1rem;
		color: var(--sage);
	}

	@media (min-width: 52rem) {
		.facts {
			margin-top: 3.5rem;
		}
		.row {
			display: grid;
			grid-template-columns: 12rem minmax(0, 1fr);
			gap: 2rem;
		}
		.row > .body {
			margin: 0;
		}
		.pastor .body {
			gap: 1.5rem;
		}
		.pastor img {
			width: 7.5rem;
		}
	}
</style>
