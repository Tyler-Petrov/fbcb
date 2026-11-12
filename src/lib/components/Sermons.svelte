<script lang="ts">
	import { youtubeUrl } from '#lib/church.ts';
	import Icon from './Icon.svelte';
</script>

<section class="section" id="sermons">
	<div class="wrap">
		<p class="kicker">Missed a Sunday?</p>
		<h2 class="h2">Sermons</h2>
		<p class="lede">Pastor Jim's sermons are posted on our YouTube channel.</p>
		<a class="btn btn--gold" href={youtubeUrl}><Icon name="youtube" /> Watch on YouTube</a>
	</div>
</section>

<style>
	@media (max-width: 30rem) {
		.btn {
			width: 100%;
		}
	}
</style>
