import {createElement} from './util';

interface IDom {
	container: HTMLDivElement;
}

export default class Container {
	private _dom: IDom;

	/**
	 * Add a class name to the container
	 *
	 * @param className Class name to add
	 * @returns 
	 */
	public addClass(className: string) {
		this._dom.container.classList.add(className);

		return this;
	}

	/**
	 * Append a node to the container
	 *
	 * @param node The element to append
	 * @returns Container instance
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

	public toggleClass() {
		
	}

	/**
	 * Create a container element, for consistent DOM structure and styling
	 */
	constructor(className: string = '') {
		this._dom = {
			container: createElement<HTMLDivElement>('div', ['dtcc-content', className])
		};
	}
}
