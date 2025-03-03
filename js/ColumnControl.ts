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

	/**
	 * Get the DataTables API instance that hosts this instance of ColumnControl
	 *
	 * @returns DataTables API instance
	 */
	public dt() {
		return this._dt;
	}

	/**
	 * Get what column index this instance of ColumnControl is operating on
	 *
	 * @returns Column index
	 */
	public idx() {
		return this._s.columnIdx;
	}

	/**
	 * Covert the options from `content` in the DataTable initialisation for this instance into a
	 * resolved plugin and options.
	 *
	 * @param content The dev's supplied configuration for the content
	 * @returns Resolved plugin information
	 */
	public resolve(content: string | any) {
		let plugin: IContent = null;
		let config: any = null;
		let type: string = null;

		if (typeof content === 'string') {
			type = content;
			plugin = ColumnControl.content[type];
			config = Object.assign({}, plugin.defaults);
		}
		else if (content.extend) {
			type = content.extend;
			plugin = ColumnControl.content[type];
			config = Object.assign({}, plugin.defaults, content);
		}

		if (!plugin) {
			throw new Error('Unknown ColumnControl content type: ' + type);
		}

		return {
			config,
			type,
			plugin
		};
	}

	/**
	 * Create a new ColumnControl instance to control a DataTables column.
	 *
	 * @param dt DataTables API instance
	 * @param columnIdx Column index to operation on
	 * @param opts Configuration options
	 */
	constructor(dt: Api, columnIdx: number, opts: IConfig) {
		this._dt = dt;
		this._s.columnIdx = columnIdx;

		Object.assign(this._c, ColumnControl.defaults, opts);

		this._dom.wrapper = document.createElement('span');
		this._dom.wrapper.classList.add('dtcc');

		this._dom.target = this._target();
		this._dom.target.appendChild(this._dom.wrapper);

		this._c.content.forEach((content) => {
			let {plugin, config} = this.resolve(content);

			let el = plugin.init.call(this, config);

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

	/** Content plugins */
	static content: IContents = content;

	/** Defaults for ColumnControl */
	static defaults: IDefaults = {
		target: 0,

		content: []
	};

	/** SVG icons that can be used by the content plugins */
	static icons = icons;

	/** Version */
	static version = '0.0.1-dev';
}
