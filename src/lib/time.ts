import type { ChurchEvent } from './church';

/** A date in Bellflower (Central time) as YYYY-MM-DD. The script at the end of src/app.html works
 * out the visitor's date the same way, so change the two together. */
function bellflowerDate(date = new Date()): string {
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

/** Bellflower's date when the site was built. The built page leaves out events that were already
 * over by then. In the visitor's browser, the script at the end of src/app.html hides the rest
 * after their last day, with the same rule as isUpcoming below. */
export const builtOn = bellflowerDate(new Date(__BUILD_TIME__));

export const isUpcoming = (event: ChurchEvent, today: string) => today <= event.lastDay;
