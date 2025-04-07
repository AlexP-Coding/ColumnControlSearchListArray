import {createElement} from './util';
import Button from './Button';

interface IDom {
	buttons: HTMLDivElement;
	container: HTMLDivElement;
	title: HTMLDivElement;
}

interface ISettings {
	buttons: Button[];
	handler: IHandler;
}

export type IHandler = (e: Event, btn: Button) => void;

export interface IOption {
	active?: boolean;
	icon?: string;
	label: string;
	value: string | number;
}

export default class CheckList {
	private _dom: IDom;
	private _s: ISettings = {
		buttons: [],
		handler: () => {}
	};

	/**
	 * Add one or more buttons to the list
	 *
	 * @param options Configuration for the button(s) to add
	 * @returns Self for chaining
	 */
	public add(options: IOption | IOption[]) {
		if (! Array.isArray(options)) {
			options = [options];
		}

		for (let i=0 ; i<options.length ; i++) {
			let option = options[i];
			let btn = new Button()
				.active(option.active || false)
				.handler((e) => {
					this._s.handler(e, btn);
				})
				.icon(option.icon || '')
				.text(option.label)
				.value(option.value);

			this._dom.buttons.appendChild(btn.element());
			this._s.buttons.push(btn);
		}

		return this;
	}

	/**
	 * Find a button with a given value
	 *
	 * @param val Value to search for
	 * @returns Found button
	 */
	public button(val: string | number) {
		let buttons = this._s.buttons;

		for (let i=0 ; i<buttons.length ; i++) {
			if (buttons[i].value() === val) {
				return buttons[i];
			}
		}

		return null;
	}

	/**
	 * Remove all buttons from the list
	 *
	 * @returns Self for chaining
	 */
	public clear() {
		// TODO need to destroy the buttons
		this._dom.buttons.replaceChildren();
		this._s.buttons.length = 0;

		return this;
	}

	/**
	 * Get the DOM container element to attach into the document
	 *
	 * @returns Container
	 */
	public element() {
		return this._dom.container;
	}

	/**
	 * Set the event handler for what happens when a button is clicked
	 *
	 * @param fn Event handler
	 */
	public handler(fn: IHandler) {
		this._s.handler = fn;

		return this;
	}

	/**
	 * Indicate that this is a search control and should listen for corresponding events
	 *
	 * @param dt DataTable instance
	 * @param idx Column index
	 */
	public searchListener(dt, idx: number) {
		// TODO need to handle a column reorder event
		// TODO should this be moved to the searchList content?

		// Column control search clearing (column().ccSearchClear() method)
		dt.on('cc-search-clear', (e, colIdx) => {
			if (colIdx === idx) {
				// Deselect all
				for (let i=0 ; i<this._s.buttons.length ; i++) {
					this._s.buttons[i].active(false);
				}

				// Trigger the handler
				this._s.handler(e, null);

				// TODO no draw!
			}
		});

		return this;
	}

	/**
	 * Set the list's title
	 *
	 * @param title Display title
	 * @returns Button instance
	 */
	public title(title: string) {
		this._dom.title.innerHTML = title;

		return this;
	}

	/**
	 * Get the values that are currently selected in the list
	 *
	 * @returns Array of currently selected options in the list
	 */
	public values() {
		let result = [];
		let buttons = this._s.buttons;

		for (let i=0; i<buttons.length ; i++) {
			if (buttons[i].active()) {
				result.push(buttons[i].value());
			}
		}

		return result;
	}

	/**
	 * Container for a list of buttons
	 */
	constructor() {
		this._dom = {
			container: createElement<HTMLDivElement>('div', 'dtcc-list'),
			title: createElement<HTMLDivElement>('div', 'dtcc-list-title'),
			buttons: createElement<HTMLDivElement>('div', 'dtcc-list-buttons')
		};

		this._dom.container.append(this._dom.title);
		this._dom.container.append(this._dom.buttons);
	}
}
