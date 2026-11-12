import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// Lets the prerendered HTML leave out events that were already over when the site was built.
	define: { __BUILD_TIME__: JSON.stringify(new Date().toISOString()) },
	// `pnpm dev` prints this machine's Tailscale URLs, so Vite listens on every interface and answers
	// the HTTPS address `tailscale serve` forwards from.
	server: { host: true, allowedHosts: ['.ts.net'] },
	// Older iPhones and iPads (Safari 15 and 16.0 to 16.3) can't read the newer media query
	// syntax the CSS would otherwise be rewritten to, and would skip the wide-screen layout.
	build: { cssTarget: ['safari15', 'chrome100', 'firefox100'] },
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter()
		})
	]
});
