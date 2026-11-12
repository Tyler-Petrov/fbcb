// Everything a volunteer might need to change lives in this file.
// After editing, open a pull request to main. Once it is merged, run pnpm release to publish it.

export const phone = {
	display: '573-340-1070',
	tel: 'tel:+15733401070',
	sms: 'sms:+15733401070'
};

// The line under the church name at the top of the page. Each sentence stays whole, so on a
// phone they sit one above the other.
export const tagline = ["You're not just welcome.", "You're invited."];

// Confirmed by Tyler, Nov 9. Map links search by church name, which lands on Google's pin.
export const address = {
	street: '302 S Main St',
	city: 'Bellflower, MO 63333'
};

const mapQuery = 'First+Baptist+Church+of+Bellflower,+Bellflower,+MO+63333';
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

// The church's Facebook presence is a group, not a page. Facebook offers no embed or
// API for group events, so event cards below are entered by hand.
export const facebookUrl = 'https://www.facebook.com/groups/1522672238925411';

// The channel also posts videos that aren't sermons, so the site links to it rather than
// auto-playing the newest upload.
export const youtubeUrl = 'https://www.youtube.com/@FirstBaptistChurchBellflower/videos';

// The photo behind the church name at the top of the page.
// STAND-IN: a free stock photo, not our congregation. It is "Large choir performance in a
// modern church" by Caleb Oquendo (pexels.com/photo/34611802, Pexels license), mirrored and
// trimmed at the top.
// To use our own photo, replace the four hero-* files in src/lib/assets (800 and 1600 pixels
// wide, as .jpg and .webp) and update this description. The photo is cropped to fit. On a
// phone only about the right half shows, and the church name covers its bottom quarter. On
// wide screens the name covers its left side. So a group photo needs everyone in the top
// right, or a crop that puts them there.
export const heroPhoto = {
	alt: 'People standing together in a church, clapping along with the music'
};

// Statement of faith. PLACEHOLDER until Tyler confirms: a plain-language summary of the
// Baptist Faith & Message 2000, the Southern Baptist Convention's confession. If the church
// has its own statement, replace these items with it.
export const faithSource = {
	name: 'Baptist Faith & Message (2000)',
	url: 'https://bfm.sbc.net/bfm2000/'
};
export const statementOfFaith: { title: string; text: string }[] = [
	{
		title: 'The Bible',
		text: "The Bible is God's inspired Word, true and trustworthy, and our final authority for what we believe and how we live."
	},
	{
		title: 'God',
		text: 'There is one true God, who exists eternally as Father, Son, and Holy Spirit.'
	},
	{
		title: 'Jesus Christ',
		text: 'Jesus is God the Son. He was born of a virgin, lived without sin, died on the cross for our sins, and rose bodily from the dead.'
	},
	{
		title: 'Salvation',
		text: 'Salvation is a free gift of God’s grace. It is received by turning from sin and trusting in Jesus, not earned by good works.'
	},
	{
		title: 'The church',
		text: 'A local church is a family of baptized believers who gather to worship, grow in the faith, serve, and share the good news.'
	},
	{
		title: "Baptism and the Lord's Supper",
		text: "Baptism by immersion pictures a believer's new life in Christ. The Lord's Supper remembers his death until he comes again."
	},
	{
		title: 'His return',
		text: 'Jesus will return personally and visibly to judge the world and make all things new.'
	}
];

// His photo is src/lib/assets/pastor-jim.jpg, 240 by 300 pixels. To change it, replace that
// file with another photo of the same shape (4 wide by 5 tall).
export const pastor = 'Pastor Jim';

export type Gathering = { what: string; time: string; ampm: 'a.m.' | 'p.m.' };

export const schedule: Gathering[] = [
	{ what: 'Sunday school', time: '9:30', ampm: 'a.m.' },
	{ what: 'Sunday worship', time: '10:30', ampm: 'a.m.' },
	{ what: 'Wednesday Bible study', time: '6:00', ampm: 'p.m.' }
];

/** e.g. "Sunday school 9:30 a.m., Sunday worship 10:30 a.m., Wednesday Bible study 6:00 p.m." */
export const scheduleSummary = schedule.map((g) => `${g.what} ${g.time} ${g.ampm}`).join(', ');

export type ChurchEvent = {
	/** Short and unique, like 'friendsgiving-2026'. */
	id: string;
	/** Shown large. For a long word, put \u00AD (a soft hyphen) where it may break, as in
	 * 'Friends\u00ADgiving'. Otherwise the title shrinks to fit on small screens. */
	title: string;
	/** Include the year so the card can't be misread later. */
	when: string;
	/** A paragraph or two. Say what it is, then give the times and the place. */
	text: string[];
	/** Adds a button for texting an RSVP to the church phone. */
	rsvp?: boolean;
	/** The last day the card shows, as YYYY-MM-DD in Central time. Usually the day of the
	 * event. Visitors with JavaScript turned off keep seeing it until the site is released again. */
	lastDay: string;
};

export const events: ChurchEvent[] = [
	{
		id: 'friendsgiving-2026',
		title: 'Community Friends\u00ADgiving',
		when: 'Sunday, December 6, 2026',
		text: [
			'A free turkey dinner with all the trimmings and pie, catered by the Bellflower Youth Club. Everyone in Bellflower is invited to the service, the meal, or both.',
			'That Sunday, worship is at 10:30 a.m. and the meal runs from 12:30 to 2:30 p.m. Both are at the Bellflower community building.'
		],
		rsvp: true,
		lastDay: '2026-12-06'
	}
];

// Mistakes here would quietly break the page, so they stop the build instead. Each event's id
// names its spot on the page, so a repeated id would break links to it. A lastDay that isn't
// a real date written YYYY-MM-DD would compare wrongly and keep an event up for months.
const eventIds = events.map((e) => e.id);
if (new Set(eventIds).size !== eventIds.length) {
	throw new Error('Each event in src/lib/church.ts needs its own id.');
}
for (const e of events) {
	const day = new Date(`${e.lastDay}T00:00:00Z`);
	if (
		!/^\d{4}-\d{2}-\d{2}$/.test(e.lastDay) ||
		isNaN(day.getTime()) ||
		day.toISOString().slice(0, 10) !== e.lastDay
	) {
		throw new Error(`Event "${e.id}" in src/lib/church.ts: write lastDay like 2027-01-15.`);
	}
}
