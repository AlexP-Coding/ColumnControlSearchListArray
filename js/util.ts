export function createElement<T = HTMLElement>(
	type: string,
	classes: string[] | string = [],
	text: null | string = null,
	children = []
): T {
	let el = document.createElement(type);

	addClass(el, classes);

	if (text) {
		el.innerHTML = text;
	}

	children.forEach((child) => {
		el.appendChild(child);
	});

	return el as T;
}

export function addClass(el: HTMLElement, classes: string | string[]) {
	if (! classes) {
		return;
	}

	if (!Array.isArray(classes)) {
		classes = [classes];
	}

	classes.forEach((className) => {
		if (className) {
			el.classList.add(className);
		}
	});
}
