
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
