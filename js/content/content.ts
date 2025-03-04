import ColumnControl from '../ColumnControl';
import icons from '../icons';

export interface IContentConfig {}

export interface IContent<T = {}> {
	defaults: T;
	init: (this: ColumnControl, buttonConfig: T) => HTMLElement | HTMLButtonElement;
}

export function button(
	text: string,
	icon: string,
	klass: string,
	cb: (e: Event) => void
): HTMLButtonElement {
	let button = createElement<HTMLButtonElement>(
		'button',
		['dtcc-button', 'dtcc-button_' + klass],
		null,
		[
			createElement('span', 'dtcc-button-icon', icons[icon]),
			createElement('span', 'dtcc-button-text', text)
		]
	);

	button.addEventListener('click', (e) => {
		e.stopPropagation();
		e.preventDefault();

		cb(e);
	});

	return button;
}

export function createElement<T = HTMLElement>(
	type: string,
	classes: string[] | string = [],
	text: null | string = null,
	children = []
): T {
	let el = document.createElement(type);

	if (!Array.isArray(classes)) {
		classes = [classes];
	}

	classes.forEach((klass) => {
		el.classList.add(klass);
	});

	if (text) {
		el.innerHTML = text;
	}

	children.forEach((child) => {
		el.appendChild(child);
	});

	return el as T;
}
