import {createElement} from './functions';
import icons from './icons';

type Icons = keyof typeof icons;

interface IDom {
	button: HTMLButtonElement;
	icon: HTMLSpanElement;
	state: HTMLSpanElement;
	text: HTMLSpanElement;
}

interface ISettings {
	enabled: boolean;
}

export default class Button {
	private _dom: IDom;
	private _s: ISettings = {
		enabled: true
	};

	/**
	 * Set the active state of the button
	 *
	 * @param active The active state
	 * @returns Button instance
	 */
	public active(active: boolean | Icons) {
		if (active === false) {
			this._dom.state.innerHTML = '';
			this._dom.button.classList.remove('dtcc-button_active');
		}
		else if (active === true) {
			this._dom.state.innerHTML = icons.tick;
			this._dom.button.classList.add('dtcc-button_active');
		}
		else {
			this._dom.state.innerHTML = icons.chevronRight;
			this._dom.button.classList.remove('dtcc-button_active');
		}

		return this;
	}

	/**
	 * Set the class name for the button
	 *
	 * @param className Class name
	 * @returns Button instance
	 */
	public className(className: string) {
		this._dom.button.classList.add('dtcc-button_' + className);

		return this;
	}

	/**
	 * Get the DOM Button element to attach into the document
	 *
	 * @returns The Button element
	 */
	public element() {
		return this._dom.button;
	}

	/**
	 * Set if the button should be enabled or not.
	 *
	 * @param enable Toggle the enable state
	 * @returns Button instance
	 */
	public enable(enable: boolean) {
		this._dom.button.classList.toggle('dtcc-button_enabled', enable);
		this._s.enabled = enable;

		return this;
	}

	/**
	 * Set the icon to display in the button
	 *
	 * @param icon Icon name
	 * @returns Button instance
	 */
	public icon(icon: string) {
		this._dom.icon.innerHTML = icons[icon];

		return this;
	}

	/**
	 * Set the text to appear in the button
	 *
	 * @param text Text to appear in the button
	 * @returns Button instance
	 */
	public text(text: string) {
		this._dom.text.innerHTML = text;

		return this;
	}

	/**
	 * Set the event handler for when the button is activated
	 *
	 * @param fn Event handler
	 * @returns Button instance
	 */
	public handler(fn: (e: Event) => void) {
		this._dom.button.addEventListener('click', (e) => {
			e.stopPropagation();
			e.preventDefault();

			if (this._s.enabled) {
				fn(e);
			}
		});

		return this;
	}

	/**
	 * Create a new button for use in ColumnControl contents. Buttons created by this class can be
	 * used at the top level in the header or in a dropdown.
	 */
	constructor() {
		this._dom = {
			button: createElement<HTMLButtonElement>('button', 'dtcc-button'),
			icon: createElement<HTMLSpanElement>('span', 'dtcc-button-icon'),
			state: createElement<HTMLSpanElement>('span', 'dtcc-button-state'),
			text: createElement<HTMLSpanElement>('span', 'dtcc-button-text')
		};

		this._dom.button.append(this._dom.icon);
		this._dom.button.append(this._dom.text);
		this._dom.button.append(this._dom.state);
	}
}
