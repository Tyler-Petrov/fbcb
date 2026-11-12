// One background Vite dev server per worktree.
//   pnpm dev           start it if it isn't running, then print its URLs
//   pnpm dev restart   restart it on the same port
//   pnpm dev stop      stop it
// Its output goes to .dev-server.log, and .dev-server.json holds its pid, port,
// and URLs while it runs. It stops itself after an hour with no requests and
// no open pages.

import { execFileSync, spawn } from 'node:child_process';
import { existsSync, openSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createServer as createNetServer } from 'node:net';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const statePath = join(root, '.dev-server.json');
const logPath = join(root, '.dev-server.log');
const idleLimit = 60 * 60 * 1000;

function readState() {
	if (!existsSync(statePath)) return undefined;
	try {
		const state = JSON.parse(readFileSync(statePath, 'utf8'));
		process.kill(state.pid, 0);
		return state;
	} catch {
		rmSync(statePath, { force: true });
		return undefined;
	}
}

function tailscaleHost() {
	try {
		const status = JSON.parse(
			execFileSync('tailscale', ['status', '--json'], { encoding: 'utf8' })
		);
		return status.Self?.DNSName?.replace(/\.$/, '') || status.Self?.TailscaleIPs?.[0];
	} catch {
		return undefined;
	}
}

function freePort() {
	return new Promise((resolve, reject) => {
		const server = createNetServer();
		server.once('error', reject);
		server.listen(0, () => {
			const { port } = server.address();
			server.close(() => resolve(port));
		});
	});
}

function describe(state) {
	return [
		`Dev server (pid ${state.pid}):`,
		`  Local:     ${state.local}`,
		...(state.tailscale ? [`  Tailscale: ${state.tailscale}`] : []),
		`  Log:       ${logPath}`
	].join('\n');
}

async function waitFor(check, timeout) {
	for (const end = Date.now() + timeout; Date.now() < end;) {
		const result = check();
		if (result) return result;
		await new Promise((resolve) => setTimeout(resolve, 100));
	}
}

async function start(port) {
	writeFileSync(logPath, '');
	const log = openSync(logPath, 'a');
	const service = spawn(
		process.execPath,
		[fileURLToPath(import.meta.url), '--service', String(port)],
		{
			cwd: root,
			detached: true,
			stdio: ['ignore', log, log]
		}
	);
	service.unref();
	let exited = false;
	service.once('exit', () => (exited = true));
	const state = await waitFor(() => exited || readState(), 30_000);
	if (!state || state === true) {
		console.error(`The dev server didn't start. The end of ${logPath}:\n`);
		console.error(readFileSync(logPath, 'utf8').split('\n').slice(-30).join('\n'));
		process.exit(1);
	}
	console.log(describe(state));
}

async function stop(state) {
	process.kill(state.pid, 'SIGTERM');
	const stopped = await waitFor(() => !readState(), 10_000);
	if (!stopped) {
		console.error(`The dev server (pid ${state.pid}) didn't stop within 10 seconds.`);
		process.exit(1);
	}
}

async function runService(port) {
	const { createServer } = await import('vite');
	const server = await createServer({ server: { host: true, port, strictPort: true } });
	let lastUsed = Date.now();
	await server.listen();
	server.httpServer.on('request', () => (lastUsed = Date.now()));

	const host = tailscaleHost();
	const state = {
		pid: process.pid,
		port,
		local: `http://localhost:${port}/`,
		tailscale: host && `http://${host}:${port}/`
	};
	writeFileSync(statePath, JSON.stringify(state, null, '\t') + '\n');
	console.log(describe(state));

	const shutdown = async (reason) => {
		console.log(`\nStopping: ${reason}`);
		rmSync(statePath, { force: true });
		await server.close();
		process.exit(0);
	};
	process.on('SIGTERM', () => shutdown('asked to stop'));
	process.on('SIGINT', () => shutdown('interrupted'));
	setInterval(() => {
		if (server.ws.clients.size === 0 && Date.now() - lastUsed > idleLimit) {
			shutdown('no requests or open pages for an hour');
		}
	}, 60_000);
}

const [command, arg] = process.argv.slice(2);
const running = command === '--service' ? undefined : readState();

switch (command) {
	case '--service':
		await runService(Number(arg));
		break;
	case 'stop':
		if (running) await stop(running);
		console.log(running ? 'Stopped the dev server.' : 'No dev server is running here.');
		break;
	case 'restart':
		if (running) await stop(running);
		await start(running?.port ?? (await freePort()));
		break;
	case undefined:
		if (running) console.log(describe(running));
		else await start(await freePort());
		break;
	default:
		console.error(
			`Unknown command: ${command}. Use \`pnpm dev\`, \`pnpm dev restart\`, or \`pnpm dev stop\`.`
		);
		process.exit(1);
}
