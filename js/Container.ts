import {createElement} from './functions';

interface IDom {
	container: HTMLDivElement;
}

export default class Button {
	private _dom: IDom;

	/**
	 * Set the active state of the button
	 *
	 * @param active The active state
	 * @returns Button instance
	 */
	public append(node: HTMLElement) {
		this._dom.container.appendChild(node);

		return this;
	}

	/**
	 * Get the container element
	 *
	 * @returns The container element
	 */
	public element() {
		return this._dom.container;
	}

	/**
	 * Create a container element, for consistent DOM structure and styling
	 */
	constructor() {
		this._dom = {
			container: createElement<HTMLDivElement>('div', 'dtcc-content')
		};
	}
}
