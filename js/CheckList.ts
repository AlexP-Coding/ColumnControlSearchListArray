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
	 * 
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
