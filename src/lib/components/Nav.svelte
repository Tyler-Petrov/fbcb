<script lang="ts">
	import type { Attachment } from 'svelte/attachments';

	// Service times are the first thing on the page, so they don't need a nav link.
	const links = [
		{ id: 'events', label: 'Events' },
		{ id: 'about', label: 'About' },
		{ id: 'pastor', label: 'Pastor' },
		{ id: 'sermons', label: 'Sermons' },
		{ id: 'contact', label: 'Visit' }
	];

	let active = $state<string | null>(null);
	// Which edges have more links hidden past them (only with very large text).
	let moreLeft = $state(false);
	let moreRight = $state(false);

	// Underline the link for the section that's in the middle of the screen.
	$effect(() => {
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting)
						active = links.some((l) => l.id === entry.target.id) ? entry.target.id : null;
				}
			},
			{ rootMargin: '-40% 0px -55% 0px' }
		);
		for (const section of document.querySelectorAll('main > section')) io.observe(section);
		return () => io.disconnect();
	});

	// Section jumps should land below the nav at whatever size the visitor's text is.
	const measureNav: Attachment<HTMLElement> = (nav) => {
		const ro = new ResizeObserver(() => {
			document.documentElement.style.setProperty('--nav-offset', `${nav.offsetHeight}px`);
		});
		ro.observe(nav);
		return () => ro.disconnect();
	};

	// With very large text the links scroll sideways; fade whichever edge has more to see.
	const watchOverflow: Attachment<HTMLElement> = (list) => {
		const update = () => {
			moreLeft = list.scrollLeft > 1;
			moreRight = list.scrollLeft + list.clientWidth < list.scrollWidth - 1;
		};
		const ro = new ResizeObserver(update);
		ro.observe(list);
		list.addEventListener('scroll', update, { passive: true });
		return () => {
			ro.disconnect();
			list.removeEventListener('scroll', update);
		};
	};
</script>

<nav class="nav" aria-label="Sections" {@attach measureNav}>
	<div class="wrap">
		<a class="brand" href="#top"><span>First Baptist</span> <span class="gold">Bellflower</span></a>
		<ul class={{ 'more-left': moreLeft, 'more-right': moreRight }} {@attach watchOverflow}>
			{#each links as link (link.id)}
				<li>
					<a href="#{link.id}" aria-current={active === link.id ? 'true' : undefined}
						>{link.label}</a
					>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 10;
		background: rgba(22, 17, 13, 0.96);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid var(--line);
	}
	.wrap {
		display: flex;
		align-items: stretch;
		gap: 1rem;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 0.3em;
		font: 700 1.2rem/1 var(--slab);
		color: var(--cream);
		text-decoration: none;
		white-space: nowrap;
	}
	.gold {
		color: var(--gold);
	}
	/* Always one row. If the links don't fit (very large text), the row scrolls sideways. */
	ul {
		list-style: none;
		display: flex;
		margin: 0 0 0 auto;
		padding: 0;
		min-width: 0;
		overflow-x: auto;
		scroll-padding-inline: 2rem;
		scrollbar-width: none;
	}
	ul::-webkit-scrollbar {
		display: none;
	}
	ul.more-right {
		mask-image: linear-gradient(to right, #000 85%, transparent);
	}
	ul.more-left {
		mask-image: linear-gradient(to left, #000 85%, transparent);
	}
	/* Never dim the link someone is tabbing to. */
	ul:focus-within {
		mask-image: none !important;
	}
	ul.more-left.more-right {
		mask-image: linear-gradient(to right, transparent, #000 15%, #000 85%, transparent);
	}
	li {
		flex: none;
	}
	ul a {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: var(--nav-h);
		min-width: 44px;
		padding: 0 0.85rem;
		color: var(--soft);
		text-decoration: none;
		white-space: nowrap;
		font: 600 1rem/1 var(--sans);
	}
	ul a:hover {
		color: var(--cream);
	}
	/* Inset ring: the scrolling row would clip an outside one. */
	ul a:focus-visible {
		outline-offset: -3px;
	}
	ul a[aria-current='true'] {
		color: var(--gold);
		box-shadow: inset 0 -3px var(--gold);
	}
	@media (max-width: 44rem) {
		.brand {
			display: none;
		}
		.wrap {
			width: 100%;
			padding-inline: 0.5rem;
		}
		ul {
			margin: 0;
			width: 100%;
		}
		li {
			flex: 1 0 auto;
		}
		ul a {
			padding: 0 0.5rem;
		}
	}
	@media (max-width: 24rem) {
		.wrap {
			padding-inline: 0;
		}
		ul a {
			padding: 0 0.3rem;
		}
	}
</style>
