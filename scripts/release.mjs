// Deploys main to production by dispatching the Deploy production workflow,
// then watches it. The only way to release; never run `wrangler deploy` by hand.

import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';

function gh(...args) {
	const result = spawnSync('gh', args, { encoding: 'utf8' });
	if (result.status !== 0) {
		console.error(result.stderr || result.error?.message);
		process.exit(1);
	}
	return result.stdout.trim();
}

const [lastRun] = JSON.parse(
	gh(
		'run',
		'list',
		'--workflow',
		'deploy-production.yml',
		'--limit',
		'1',
		'--json',
		'headSha,conclusion,status'
	)
);
if (lastRun && lastRun.status !== 'completed') {
	console.error('A production release is already running. Wait for it to finish.');
	process.exit(1);
}
const mainSha = gh('api', 'repos/{owner}/{repo}/commits/main', '--jq', '.sha');
if (lastRun?.conclusion === 'success' && lastRun.headSha === mainSha) {
	console.log('Nothing to release: main is already live.');
	process.exit(0);
}

const prompt = createInterface({ input: process.stdin, output: process.stdout });
const answer = await prompt.question(`Deploy main (${mainSha.slice(0, 7)}) to production? [y/N] `);
prompt.close();
if (answer.trim().toLowerCase() !== 'y') {
	console.log('Release cancelled.');
	process.exit(1);
}

const dispatched = gh(
	'workflow',
	'run',
	'deploy-production.yml',
	'--ref',
	'main',
	'-f',
	'confirm_production=true'
);
const runId = dispatched.match(/\/actions\/runs\/(\d+)/)?.[1];
if (!runId) {
	console.error('Deploy dispatched, but gh did not return its run URL, so it cannot be watched.');
	process.exit(1);
}
console.log(`Deploy dispatched: ${dispatched}`);
const watch = spawnSync('gh', ['run', 'watch', runId, '--exit-status'], { stdio: 'inherit' });
process.exit(watch.status ?? 1);
