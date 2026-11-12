import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// Lets the prerendered HTML leave out events that were already over when the site was built.
	define: { __BUILD_TIME__: JSON.stringify(new Date().toISOString()) },
	// `pnpm dev` prints this machine's Tailscale URL; Vite only answers hostnames it allows.
	server: { allowedHosts: ['.ts.net'] },
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
