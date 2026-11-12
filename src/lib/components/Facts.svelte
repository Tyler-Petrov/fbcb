<script lang="ts">
	import {
		facebookUrl,
		faithSource,
		pastor,
		phone,
		statementOfFaith,
		youtubeUrl
	} from '#lib/church.ts';
</script>

<dl class="facts frame">
	<div>
		<dt>{pastor}</dt>
		<dd>
			The church phone rings {pastor}. Call with a question about faith, or if you just need someone
			to talk to. <a class="nowrap" href={phone.tel}>{phone.display}</a>
		</dd>
	</div>
	<div>
		<dt>Sermons</dt>
		<dd>Missed a Sunday? <a href={youtubeUrl}>Watch on YouTube</a>.</dd>
	</div>
	<div>
		<dt>News</dt>
		<dd>It goes up in our <a href={facebookUrl}>Facebook group</a> first.</dd>
	</div>
	<div>
		<dt>Beliefs</dt>
		<dd>
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
		</dd>
	</div>
	<div>
		<dt>On Main Street</dt>
		<dd>
			Our building went up in 1907, and it's where we still meet every week. We're a Southern
			Baptist church, part of the Twin Rivers Baptist Association.
		</dd>
	</div>
</dl>

<style>
	.facts {
		margin-block: 2.75rem 0;
		border-bottom: 1px solid var(--line);
	}
	.facts > div {
		padding: 1.1rem 0 1.2rem;
		border-top: 1px solid var(--line);
	}
	dt {
		font-weight: 800;
	}
	dd {
		margin: 0.2rem 0 0;
	}
	dd a {
		font-weight: 700;
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
		margin-top: 0.1rem;
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
		.facts > div {
			display: grid;
			grid-template-columns: 12rem minmax(0, 1fr);
			gap: 2rem;
		}
		.facts > div > dd {
			margin: 0;
		}
	}
</style>
