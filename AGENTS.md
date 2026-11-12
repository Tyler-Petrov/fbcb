# FBCB website

Static SvelteKit site for First Baptist Church of Bellflower (adapter-static, served by the `fbcb` Cloudflare Worker). No backend. Church facts and meeting decisions are in `CONTEXT.md`. Nearly all content edits happen in `src/lib/church.ts`. `print/` builds the Friendsgiving print PDFs (`print/build.sh`, Python via uv) and is separate from the site.

## Code changes and releases

Make code changes on a separate branch in a worktree and integrate them through pull requests against `main`. Push a draft PR against `main` as soon as you start making code changes, without asking, and link it to the thread. Release only with `pnpm release`; never run `wrangler deploy` directly.

T3 Code runs `scripts/worktree-setup.sh` automatically in the worktrees it creates. If you create a worktree manually, run `. scripts/worktree-setup.sh` from its root.

PR previews are opt-in: add the `deploy-preview` label to the PR, and each push comments a `pr-<number>` preview URL.

## Dev server

`pnpm dev` starts this worktree's background dev server on a free port if it isn't running, then watches it and prints its HTTPS Tailscale, Tailscale IP, and local URLs. The HTTPS URL comes from `tailscale serve`, at the Vite port plus 3000. The server stops 30 seconds after nothing is watching it, so agents run `pnpm dev` as a background command and leave it running while they need the site. `pnpm dev restart`, `pnpm dev stop`, and `pnpm dev servers` (every worktree's servers) do what they say, and its output is in `.dev-server.log`. Start, restart, or stop it whenever you need to.

## Svelte AI tools

For Svelte components and modules, use the official Svelte plugin's `svelte-code-writer` and `svelte-core-bestpractices` skills. For big Svelte changes, run `svelte-autofixer` on the changed components and modules and rerun until resolved.
