import DataTable, {Api, ColumnSelector} from '../../../types/types';
import content from './content/index';
import {IContent} from './content/content';
import icons from './icons';

export interface IDefaults {
	target: 0;
	content: [];
}

export interface IConfig extends Partial<IDefaults> {}

export interface IContents {
	[name: string]: IContent;
}

export interface IDom {
	target: HTMLElement;
	wrapper: HTMLSpanElement;
}

interface ISettings {
	columnIdx: number;
}

/**
 *
 */
export default class ColumnControl {
	private _dom: IDom = {
		target: null,
		wrapper: null
	};

	private _dt: Api;

	private _c: IConfig = {};

	private _s: ISettings = {
		columnIdx: null
	};

	public dt() {
		return this._dt;
	}

	public idx() {
		return this._s.columnIdx;
	}

	constructor(dt: Api, columnIdx: number, opts: IConfig) {
		this._dt = dt;
		this._s.columnIdx = columnIdx;

		Object.assign(this._c, ColumnControl.defaults, opts);

		this._dom.wrapper = document.createElement('span');
		this._dom.wrapper.classList.add('dtcc');

		this._dom.target = this._target();
		this._dom.target.appendChild(this._dom.wrapper);

		this._c.content.forEach((content) => {
			let el = ColumnControl.content[content].init.call(this, {});

			this._dom.wrapper.appendChild(el);
		});

		dt.on('destroy', function () {});
	}

	/**
	 * Resolve the configured target into a DOM element
	 */
	private _target() {
		// Header row index
		if (typeof this._c.target === 'number') {
			return this._dt
				.column(this._s.columnIdx)
				.header(this._c.target)
				.querySelector<HTMLElement>('div.dt-column-header');
		}

		// No match, default to the standard column header
		return this._dt
			.column(this._s.columnIdx)
			.header()
			.querySelector<HTMLElement>('div.dt-column-header');
	}

	static content: IContents = content;

	static defaults: IDefaults = {
		target: 0,

		content: []
	};

	static icons = icons;

	static version = '0.0.1-dev';
}
