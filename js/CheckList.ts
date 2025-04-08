import { createElement } from './util';
import Button from './Button';
import { Api } from '../../../types/types';

export interface IOptions {
	search: boolean;
	select: boolean;
}

interface IDom {
	buttons: HTMLDivElement;
	container: HTMLDivElement;
	controls: HTMLDivElement;
	title: HTMLDivElement;
	search: HTMLInputElement;
	selectAll: HTMLButtonElement;
	selectAllCount: HTMLSpanElement;
	selectNone: HTMLButtonElement;
	selectNoneCount: HTMLSpanElement;
}

interface ISettings {
	buttons: Button[];
	handler: IHandler;
	search: string;
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
		handler: () => {},
		search: ''
	};

	/**
	 * Add one or more buttons to the list
	 *
	 * @param options Configuration for the button(s) to add
	 * @returns Self for chaining
	 */
	public add(options: IOption | IOption[], update?: boolean) {
		if (!Array.isArray(options)) {
			options = [options];
		}

		for (let i = 0; i < options.length; i++) {
			let option = options[i];
			let btn = new Button()
				.active(option.active || false)
				.handler((e) => {
					this._s.handler(e, btn);
					this._updateCount();
				})
				.icon(option.icon || '')
				.text(option.label)
				.value(option.value);

			this._s.buttons.push(btn);
		}

		let count = this._s.buttons.length;

		if (update === true || update === undefined) {
			this._dom.selectAllCount.innerHTML = count ? '(' + count + ')' : '';
			this._redraw();
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

		for (let i = 0; i < buttons.length; i++) {
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
				this.selectNone();
				this._s.handler(e, null);
				this._updateCount();

				// TODO clear search?

				// TODO no draw!
			}
		});

		return this;
	}

	/**
	 * Select all buttons
	 *
	 * @returns Self for chaining
	 */
	public selectAll() {
		for (let i = 0; i < this._s.buttons.length; i++) {
			this._s.buttons[i].active(true);
		}

		return this;
	}

	/**
	 * Deselect all buttons
	 *
	 * @returns Self for chaining
	 */
	public selectNone() {
		for (let i = 0; i < this._s.buttons.length; i++) {
			this._s.buttons[i].active(false);
		}

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

		for (let i = 0; i < buttons.length; i++) {
			if (buttons[i].active()) {
				result.push(buttons[i].value());
			}
		}

		return result;
	}

	/**
	 * Container for a list of buttons
	 */
	constructor(dt: Api, opts: IOptions) {
		this._dom = {
			buttons: createElement<HTMLDivElement>('div', 'dtcc-list-buttons'),
			container: createElement<HTMLDivElement>('div', 'dtcc-list'),
			controls: createElement<HTMLDivElement>('div', 'dtcc-list-controls'),
			title: createElement<HTMLDivElement>('div', 'dtcc-list-title'),
			selectAll: createElement<HTMLButtonElement>(
				'button',
				'dtcc-list-selectAll',
				dt.i18n('columnControl.list.all', 'Select all')
			),
			selectAllCount: createElement<HTMLSpanElement>('span'),
			selectNone: createElement<HTMLButtonElement>(
				'button',
				'dtcc-list-selectNone',
				dt.i18n('columnControl.list.none', 'Deselect')
			),
			selectNoneCount: createElement<HTMLSpanElement>('span'),
			search: createElement<HTMLInputElement>('input', 'dtcc-list-search')
		};

		let dom = this._dom;

		dom.container.append(dom.title);
		dom.container.append(dom.controls);
		dom.container.append(dom.buttons);

		if (opts.select) {
			dom.controls.append(dom.selectAll);
			dom.controls.append(dom.selectNone);
			dom.selectAll.append(dom.selectAllCount);
			dom.selectNone.append(dom.selectNoneCount);
		}

		if (opts.search) {
			dom.controls.append(dom.search);
			dom.search.setAttribute(
				'placeholder',
				dt.i18n('columnControl.list.search', 'Search...')
			);

			dom.search.addEventListener('input', () => {
				this._s.search = dom.search.value;
				this._redraw();
			});
		}

		dom.selectAll.addEventListener('click', (e) => {
			this.selectAll();
			this._s.handler(e, null);
			this._updateCount();
		});

		dom.selectNone.addEventListener('click', (e) => {
			this.selectNone();
			this._s.handler(e, null);
			this._updateCount();
		});
	}

	/**
	 * Update the deselect counter
	 */
	private _updateCount() {
		let count = this.values().length;

		this._dom.selectNoneCount.innerHTML = count ? '(' + count + ')' : '';
	}

	/**
	 * Add the buttons to the page - taking into account filtering
	 */
	private _redraw() {
		let buttons = this._s.buttons;
		let el = this._dom.buttons;
		let searchTerm = this._s.search.toLowerCase();

		el.replaceChildren();

		for (let i = 0; i < buttons.length; i++) {
			let btn = buttons[i];

			if (!searchTerm || btn.text().toLowerCase().includes(searchTerm)) {
				el.appendChild(btn.element());
			}
		}
	}
}
