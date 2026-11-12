<script lang="ts">
	let { name }: { name: 'pin' | 'phone' | 'play' | 'facebook' | 'youtube' } = $props();
</script>

{#if name === 'pin'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"
		><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle
			cx="12"
			cy="9.5"
			r="2.5"
		/></svg
	>
{:else if name === 'phone'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"
		><path
			d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"
		/></svg
	>
{:else if name === 'facebook'}
	<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
		><path
			d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4A21 21 0 0 0 14.3 4c-2.3 0-3.9 1.4-3.9 4v2.5H7.8v3h2.6V21z"
		/></svg
	>
{:else if name === 'youtube'}
	<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
		><path
			d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8M10 15V9l5.2 3z"
		/></svg
	>
{:else}
	<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
		><path d="M7 4.5l13 7.5-13 7.5z" /></svg
	>
{/if}
