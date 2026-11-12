import { dev } from '$app/env';

// Every page is built to plain HTML, so any free static host can serve it.
export const prerender = true;
// The published pages need no JavaScript from SvelteKit, so phones on slow connections skip
// about 40 KB. The one thing that changes by date, hiding past events, is a small script in
// src/app.html. `pnpm dev` keeps it on, for live reload.
export const csr = dev;
