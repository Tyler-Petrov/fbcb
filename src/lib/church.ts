// Everything a volunteer might need to change lives in this file.
// After editing, rebuild the site (pnpm build) so the change reaches the published pages.

export const phone = {
	display: '573-340-1070',
	tel: 'tel:+15733401070',
	sms: 'sms:+15733401070'
};

// Confirmed by Tyler, Nov 9. Map links search by church name, which lands on Google's pin.
export const address = {
	street: '302 S Main St',
	city: 'Bellflower, MO 63333'
};

const mapQuery = 'First+Baptist+Church+of+Bellflower,+Bellflower,+MO+63333';
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
export const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&z=16&output=embed`;

// The church's Facebook presence is a group, not a page. Facebook offers no embed or
// API for group events, so event cards below are entered by hand.
export const facebookUrl = 'https://www.facebook.com/groups/1522672238925411';

// The channel also posts videos that aren't sermons, so the site links to it rather than
// auto-playing the newest upload.
export const youtubeUrl = 'https://www.youtube.com/@FirstBaptistChurchBellflower/videos';

// PLACEHOLDER: the Christmas Eve church-family photo. Resize it to about 2000px wide
// (under ~500 KB, for slow rural connections), save it as static/christmas-eve.jpg, and fill
// this in with its real pixel size. The photo keeps its own shape, so nobody gets cropped.
// Empty slots show a labeled box while developing and are left out of the published site.
export const heroPhoto: {
	src: string;
	width: number;
	height: number;
	alt: string;
	caption: string;
} | null = null;
// e.g. { src: '/christmas-eve.jpg', width: 2000, height: 1333,
//        alt: 'The whole congregation of First Baptist Church of Bellflower together on Christmas Eve',
//        caption: 'Our church family on Christmas Eve' }

// PLACEHOLDER: the church's mission statement, word for word. While it's null the
// About section shows a labeled empty slot.
export const missionStatement: string | null = null;

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

// PLACEHOLDER: Pastor Jim's photo and a few short paragraphs about him.
// Photo: a portrait-orientation (taller than wide) head-and-shoulders shot works best.
// Save it as static/pastor-jim.jpg, then set photo to '/pastor-jim.jpg'.
export const pastor: { name: string; photo: string | null; bio: string[] | null } = {
	name: 'Pastor Jim',
	photo: null,
	bio: null
};

export type Gathering = {
	what: string;
	/** 0 = Sunday … 6 = Saturday */
	day: number;
	/** minutes after midnight, Central time */
	start: number;
	end: number;
	time: string;
	ampm: 'a.m.' | 'p.m.';
};

export const schedule: { day: string; rows: Gathering[] }[] = [
	{
		day: 'Sunday',
		rows: [
			{ what: 'Sunday school', day: 0, start: 570, end: 630, time: '9:30', ampm: 'a.m.' },
			{ what: 'Worship', day: 0, start: 630, end: 720, time: '10:30', ampm: 'a.m.' }
		]
	},
	{
		day: 'Wednesday',
		rows: [{ what: 'Bible study', day: 3, start: 1080, end: 1155, time: '6:00', ampm: 'p.m.' }]
	}
];

/** e.g. "Sundays: Sunday school 9:30 a.m., worship 10:30 a.m. Wednesdays: Bible study 6:00 p.m." */
export const scheduleSummary = schedule
	.map(
		(g) =>
			`${g.day}s: ${g.rows.map((r, i) => `${i ? r.what.toLowerCase() : r.what} ${r.time} ${r.ampm}`).join(', ')}`
	)
	.join(' ');

export type ChurchEvent = {
	id: string;
	title: string;
	month: string;
	date: string;
	/** Include the year so the card can't be misread later. */
	when: string;
	details: [string, string][];
	body: string;
	rsvp?: boolean;
	/** Shown under the service times while the event is upcoming, for anything that changes a regular service. */
	notice?: string;
	/** ISO date (Central time) on which the card disappears */
	hideAfter: string;
};

export const events: ChurchEvent[] = [
	{
		id: 'friendsgiving-2026',
		title: 'Community Friends\u00ADgiving',
		month: 'Dec',
		date: '6',
		when: 'Sunday, December 6, 2026',
		details: [
			['Worship', '10:30 a.m.'],
			['Meal', '12:30 to 2:30 p.m.'],
			['Where', 'Bellflower community building. Worship and the meal are both there that day.']
		],
		body: 'A free turkey dinner with all the trimmings and pie, catered by the Bellflower Youth Club. Everyone in Bellflower is invited to the service, the meal, or both.',
		rsvp: true,
		notice: 'Dec. 6 only: worship is at the Bellflower community building, then a free meal.',
		hideAfter: '2026-12-07'
	}
];
