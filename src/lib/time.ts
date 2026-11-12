import type { ChurchEvent } from './church';

/** Today's date in Bellflower (Central time) as YYYY-MM-DD, whatever the visitor's clock says. */
export function bellflowerDate(date = new Date()): string {
	const parts = Object.fromEntries(
		new Intl.DateTimeFormat('en-US', {
			timeZone: 'America/Chicago',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
			.formatToParts(date)
			.map((p) => [p.type, p.value])
	);
	return `${parts.year}-${parts.month}-${parts.day}`;
}

/** Bellflower's date when the site was built. The prerendered HTML and the first render in
 * the browser both use it, so they match; components then switch to the live date. */
export const builtOn = bellflowerDate(new Date(__BUILD_TIME__));

export const isUpcoming = (event: ChurchEvent, today: string) => today <= event.lastDay;
