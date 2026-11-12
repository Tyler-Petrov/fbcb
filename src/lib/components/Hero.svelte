<script lang="ts">
	import jpgLarge from '#lib/assets/hero-1600.jpg';
	import webpLarge from '#lib/assets/hero-1600.webp';
	import jpgSmall from '#lib/assets/hero-800.jpg';
	import webpSmall from '#lib/assets/hero-800.webp';
	import { heroPhoto, tagline } from '#lib/church.ts';

	// On a phone the photo is cropped to its right side, so it is drawn wider than the screen.
	const sizes = '(min-width: 52rem) 76vw, 170vw';
</script>

<header class="hero">
	<picture class="shot">
		<source type="image/webp" srcset="{webpSmall} 800w, {webpLarge} 1600w" {sizes} />
		<img
			src={jpgLarge}
			srcset="{jpgSmall} 800w, {jpgLarge} 1600w"
			{sizes}
			width="1600"
			height="939"
			alt={heroPhoto.alt}
			fetchpriority="high"
		/>
	</picture>
	<div class="head frame">
		<h1>First Baptist Church <span>of Bellflower</span></h1>
		<p class="tagline">
			{#each tagline as sentence (sentence)}
				<span>{sentence}</span>
			{/each}
		</p>
	</div>
</header>

<style>
	/* The photo fades into the page color, and the church name sits in the faded part. The
	   name starts a fixed distance above the photo's bottom edge and grows downward, so
	   enlarged text never climbs over the faces. */
	.hero {
		--photo-h: clamp(20rem, 58vh, 28rem);
		--overlap: 7rem;
		position: relative;
	}
	@supports (height: 1svh) {
		.hero {
			--photo-h: clamp(20rem, 58svh, 28rem);
		}
	}
	.shot {
		display: block;
		position: absolute;
		inset: 0 0 auto;
		height: var(--photo-h);
	}
	.shot img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 94% 0;
	}
	/* rgba() rather than color-mix(), so older phones still get the fade. 15, 47, 37 is --green. */
	.shot::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			rgba(15, 47, 37, 0) 46%,
			rgba(15, 47, 37, 0.8) 76%,
			var(--green) 100%
		);
	}
	.head {
		position: relative;
		padding-top: calc(var(--photo-h) - var(--overlap));
	}
	h1 {
		margin: 0;
		font: 800 clamp(2.3rem, 10vw, 3.6rem) / 1.02 var(--face);
		letter-spacing: -0.012em;
		text-shadow: 0 1px 1.25rem rgba(15, 47, 37, 0.7);
	}
	h1 span {
		display: block;
		font-style: italic;
		font-weight: 500;
	}
	.tagline {
		margin-top: 0.85rem;
		font: 500 1.3rem/1.3 var(--face);
	}
	/* Each sentence stays whole; a narrow screen puts one above the other. */
	.tagline span {
		display: inline-block;
	}
	.tagline span:not(:last-child) {
		margin-right: 0.3em;
	}
	.tagline span:last-child {
		font-style: italic;
		font-weight: 700;
	}

	@media (min-width: 52rem) {
		/* Wide screens: the photo fills the right side and fades out to the left, where the
		   name sits. */
		.hero {
			--photo-h: clamp(24rem, 62vh, 38rem);
			display: flex;
			align-items: flex-end;
			min-height: var(--photo-h);
		}
		@supports (height: 1svh) {
			.hero {
				--photo-h: clamp(24rem, 62svh, 38rem);
			}
		}
		.shot {
			inset: 0 0 0 auto;
			width: 76%;
			height: auto;
		}
		.shot img {
			object-position: 100% 0;
		}
		/* Several stops ease the fade in, so the photo has no visible left edge. */
		.shot::after {
			background:
				linear-gradient(
					to right,
					var(--green) 0%,
					rgba(15, 47, 37, 0.97) 8%,
					rgba(15, 47, 37, 0.85) 20%,
					rgba(15, 47, 37, 0.5) 36%,
					rgba(15, 47, 37, 0) 56%
				),
				linear-gradient(to top, var(--green) 0%, rgba(15, 47, 37, 0.6) 22%, rgba(15, 47, 37, 0) 48%);
		}
		.head {
			padding-block: 3rem 0.5rem;
		}
		h1 {
			font-size: clamp(2.6rem, 4.6vw, 3.6rem);
		}
		.tagline {
			margin-top: 1rem;
			font-size: 1.5rem;
		}
	}
</style>
