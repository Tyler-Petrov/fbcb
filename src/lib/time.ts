import type { ChurchEvent, Gathering } from './church';

export type BellflowerNow = { weekday: number; minutes: number; iso: string };

/** The current time in Bellflower (Central time), whatever the visitor's clock says. */
export function bellflowerNow(date = new Date()): BellflowerNow {
	const parts = Object.fromEntries(
		new Intl.DateTimeFormat('en-US', {
			timeZone: 'America/Chicago',
			weekday: 'short',
			hour: 'numeric',
			minute: 'numeric',
			hourCycle: 'h23',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
			.formatToParts(date)
			.map((p) => [p.type, p.value])
	);
	return {
		weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday),
		minutes: Number(parts.hour) * 60 + Number(parts.minute),
		iso: `${parts.year}-${parts.month}-${parts.day}`
	};
}

/** The gathering happening now, or the next one coming up. */
export function nextGathering(rows: Gathering[], now: BellflowerNow) {
	let best: { row: Gathering; wait: number; live: boolean } | null = null;
	for (const row of rows) {
		const gap = (row.day - now.weekday + 7) % 7;
		const live = gap === 0 && now.minutes >= row.start && now.minutes < row.end;
		let wait = live ? -1 : gap * 1440 + row.start - now.minutes;
		if (wait < -1) wait += 7 * 1440;
		if (!best || wait < best.wait) best = { row, wait, live };
	}
	return best;
}

/** Bellflower's date when the site was built. The prerendered HTML and the first render in
 * the browser both use it, so they match; components then switch to the live date. */
export const builtOn = bellflowerNow(new Date(__BUILD_TIME__)).iso;

export const isUpcoming = (event: ChurchEvent, today: string) => today < event.hideAfter;
