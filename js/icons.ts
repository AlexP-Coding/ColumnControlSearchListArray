// The SVG for many of these icons are from Lucide ( https://lucide.dev ), which are available
// under the ISC License. There are a number of custom icons as well. These are optimised through
// https://optimize.svgomg.net/

function wrap(paths) {
	return (
		'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
		paths +
		'</svg>'
	);
}

const icons = {
	chevronRight: wrap('<path d="m9 18 6-6-6-6"/>'),

	// Custom
	contains: wrap('<path d="M10 3h4v18h-4z"/><path d="M18 8h3v9h-3"/><path d="M6 17H3V8h3"/>'),

	empty: wrap('<circle cx="12" cy="12" r="10"/>'),

	ends: wrap('<path d="M21 3h-4v18h4z"/><path d="M13 8H3v9h10"/>'),

	// Customised
	equal: wrap('<line x1="5" x2="19" y1="9" y2="9"/><line x1="5" x2="19" y1="15" y2="15"/>'),

	greater: wrap('<path d="m9 18 6-6-6-6"/>'),

	// Custom
	greaterOrEqual: wrap('<path d="m9 16 6-6-6-6"/><path d="m9 21 6-6"/>'),

	less: wrap('<path d="m15 18-6-6 6-6"/>'),

	// Custom
	lessOrEqual: wrap('<path d="m15 16-6-6 6-6"/><path d="m15 21-6-6"/>'),

	menu: wrap(
		'<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>'
	),

	// arrow-left-from-line
	moveLeft: wrap('<path d="m9 6-6 6 6 6"/><path d="M3 12h14"/><path d="M21 19V5"/>'),

	// arrow-right-from-line
	moveRight: wrap('<path d="M3 5v14"/><path d="M21 12H7"/><path d="m15 18 6-6-6-6"/>'),

	// Custom
	notContains: wrap('<path d="M15 4 9 20"/><path d="M3 8h18v9H3z"/>'),

	notEmpty: wrap('<circle cx="12" cy="12" r="10"/><line x1="9" x2="15" y1="15" y2="9"/>'),

	notEqual: wrap('<path d="M5 9h14"/><path d="M5 15h14"/><path d="M15 5 9 19"/>'),

	// Custom
	orderAddAsc: wrap(
		'<path d="M7 20v-8"/><path d="M11 16H3"/><path d="M14 4h7"/><path d="M11 8h10"/><path d="M11 12h10"/>'
	),

	// Custom
	orderAddDesc: wrap(
		'<path d="M7 20v-8"/><path d="M11 16H3"/><path d="M7 4h14"/><path d="M11 8h10"/><path d="M15 12h6"/>'
	),

	orderAsc: wrap(
		'<path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M11 12h4"/><path d="M11 16h7"/><path d="M11 20h10"/>'
	),

	// Custom
	orderClear: wrap(
		'<path d="m11 20-8-8"/><path d="M11 4h10"/><path d="M11 8h10"/><path d="M15 12h6"/><path d="m3 20 8-8"/>'
	),

	orderDesc: wrap(
		'<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h10"/><path d="M11 8h7"/><path d="M11 12h4"/>'
	),

	// Custom
	orderRemove: wrap(
		'<path d="M11 16H3"/><path d="M11 4h10"/><path d="M11 8h10"/><path d="M15 12h6"/>'
	),

	// Custom
	orderNone: wrap(
		'<path d="m3 8 4-4 4 4"/><path d="m11 16-4 4-4-4"/><path d="M7 4v16"/><path d="M15 8h6"/><path d="M15 16h6"/><path d="M13 12h8"/>'
	),

	// Custom
	starts: wrap('<path d="M3 3h4v18H3z"/><path d="M11 8h10v9H11"/>'),

	tick: wrap('<path d="M20 6 9 17l-5-5"/>')
};

export default icons;
