function wrap(paths) {
	return (
		'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
		paths +
		'</svg>'
	);
}

const icons = {
	chevronRight: wrap('<path d="m9 18 6-6-6-6"/>'),

	// Custom icon, not part of Lucide
	contains: wrap(
		'<rect width="4" height="18" x="10" y="3" /><path d="m 18,8 h 3 v 9 h -3" /><path d="M 6,17 H 3 V 8 h 3" />'
	),

	equals: wrap('<line x1="5" x2="19" y1="9" y2="9"/><line x1="5" x2="19" y1="15" y2="15"/>'),

	greaterThan: wrap('<path d="m9 18 6-6-6-6"/>'),

	lessThan: wrap('<path d="m15 18-6-6 6-6"/>'),

	menu: wrap(
		'<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>'
	),

	notEqual: wrap('<line x1="5" x2="19" y1="9" y2="9"/><line x1="5" x2="19" y1="15" y2="15"/><line x1="19" x2="5" y1="5" y2="19"/>'),

	// Custom icon, not part of Lucide
	orderAddAsc: wrap(
		'<path d="M 7,20 V 12" /><path d="M 11,16 H 3" /><path d="m 14,4 h 7" /><path d="M 11,8 H 21" /><path d="M 11,12 H 21" />'
	),

	// Custom icon, not part of Lucide
	orderAddDesc: wrap(
		'<path d="M 7,20 V 12" /><path d="M 11,16 H 3" /><path d="M 7,4 H 21" /><path d="M 11,8 H 21" /><path d="m 15,12 h 6" />'
	),

	orderAsc: wrap(
		'<path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="M11 12h4"/><path d="M11 16h7"/><path d="M11 20h10"/>'
	),

	// Custom icon, not part of Lucide
	orderClear: wrap(
		'<path d="m11 20-8-8" /><path d="M11 4h10" /><path d="M11 8h10" /><path d="M15 12h6" /><path d="m3 20 8-8" />'
	),

	orderDesc: wrap(
		'<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h10"/><path d="M11 8h7"/><path d="M11 12h4"/>'
	),

	// Custom icon, not part of Lucide
	orderRemove: wrap(
		'<path d="M 11,16 H 3" /><path d="M 11,4 H 21" /><path d="M 11,8 H 21" /><path d="m 15,12 h 6" />'
	),

	// Custom icon, not part of Lucide
	orderNone: wrap(
		'<path d="M 3,8 7,4 11,8"/><path d="M 11,16 7,20 3,16"/><path d="M 7,4 V 20"/><path d="m 15,8 h 6"/><path d="m 15,16 h 6"/><path d="m 13,12 h 8"/>'
	),

	starts: wrap(
		'<rect width="4" height="18" x="3" y="3" /><path d="m 11,8 h 10 v 9 H 11"/>'
	),

	tick: wrap('<path d="M20 6 9 17l-5-5"/>')
};

export default icons;
