import {createElement} from './util';
import icons from './icons';
import {Api} from '../../../types/types';

interface IDom {
	clear: HTMLSpanElement;
	container: HTMLDivElement;
	input: HTMLInputElement;
	inputs: HTMLDivElement;
	searchIcon: HTMLDivElement;
	select: HTMLSelectElement;
	title: HTMLDivElement;
	typeIcon: HTMLDivElement;
}

type ISearch = (type: string, term: string) => void;

export default class SearchInput {
	private _dom: IDom;
	private _search: ISearch;
	private _dt: Api;
	private _idx: number;
	private _lastValue: string;
	private _lastType: string;

	/**
	 * Add a class to the container
	 *
	 * @param name Class name to add
	 * @returns Self for chaining
	 */
	public addClass(name: string) {
		this._dom.container.classList.add(name);

		return this;
	}

	/**
	 * Clear any applied search
	 *
	 * @returns Self for chaining
	 */
	public clear() {
		this.set(this._dom.select.children[0].getAttribute('value'), '');

		return this;
	}

	/**
	 * Set the clear icon feature can be used or not
	 *
	 * @param set Flag
	 * @returns Self for chaining
	 */
	public clearable(set: boolean) {
		// Note there is no add here as it is added by default and never used after setup, so
		// no need.
		if (! set) {
			this._dom.clear.remove();
		}

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
	 * Get the HTML input element for this control
	 *
	 * @returns HTML Input element
	 */
	public input() {
		return this._dom.input;
	}

	/**
	 * Set the list of options for the dropdown
	 *
	 * @param opts List of options
	 * @returns Self for chaining
	 */
	public options(opts: Array<{label: string; value: string}>) {
		let select = this._dom.select;

		for (let i = 0; i < opts.length; i++) {
			select.add(new Option(opts[i].label, opts[i].value));
		}

		// Initial icon
		this._dom.typeIcon.innerHTML = icons[opts[0].value];

		return this;
	}

	/**
	 * Set the placeholder attribute for the input element
	 *
	 * @param placeholder Placeholder string
	 * @returns Self for chaining
	 */
	public placeholder(placeholder: string) {
		if (placeholder) {
			this._dom.input.placeholder = placeholder;
		}

		return this;
	}

	/**
	 * Set the function that will be run when a search operation is required
	 *
	 * @param fn Search callback
	 * @returns Self for chaining
	 */
	public search(fn: ISearch) {
		this._search = fn;

		return this;
	}

	/**
	 * Set a value for the search input
	 *
	 * @param logic Logic type
	 * @param val Value
	 * @returns Self for chaining
	 */
	public set(logic: string, val: string) {
		let dom = this._dom;

		dom.input.value = val;
		dom.select.value = logic;
		dom.typeIcon.innerHTML = icons[dom.select.value];

		this._runSearch();

		return this;
	}

	/**
	 * Set the text that will be shown as the title for the control
	 *
	 * @param text Set the title text
	 * @returns Self for chaining
	 */
	public title(text: string) {
		if (text) {
			// .replace('*', column.title()); TODO
			this._dom.title.innerHTML = text;
		}

		return this;
	}

	/**
	 * Set the title attribute for the input element
	 *
	 * @param title Title attribute string
	 * @returns Self for chaining
	 */
	public titleAttr(title: string) {
		if (title) {
			// .replace('*', column.title()); TODO
			this._dom.input.title = title;
		}

		return this;
	}

	/**
	 * Create a container element, for consistent DOM structure and styling
	 */
	constructor(dt: Api, idx: number) {
		this._dt = dt;
		this._idx = idx;
		this._dom = {
			clear: createElement<HTMLSpanElement>('span', 'dtcc-search-clear', icons['x']),
			container: createElement<HTMLDivElement>('div', [
				'dtcc-content',
				'dtcc-search'
			]),
			typeIcon: createElement<HTMLDivElement>('div', 'dtcc-search-type-icon'),
			searchIcon: createElement<HTMLDivElement>('div', 'dtcc-search-icon', icons['search']),
			input: createElement<HTMLInputElement>('input'),
			inputs: createElement<HTMLDivElement>('div'),
			select: createElement<HTMLSelectElement>('select'),
			title: createElement<HTMLDivElement>('div', 'dtcc-search-title')
		};

		let dom = this._dom;
		let originalIdx = idx;

		dom.container.append(dom.title, dom.inputs);
		dom.inputs.append(dom.typeIcon, dom.select, dom.searchIcon, dom.clear, dom.input);

		// Listeners
		dom.input.addEventListener('change', () => {
			this._runSearch();
		});

		dom.input.addEventListener('input', () => {
			this._runSearch();
		});

		dom.select.addEventListener('input', () => {
			dom.typeIcon.innerHTML = icons[dom.select.value];
			this._runSearch();
		});

		dom.clear.addEventListener('click', () => {
			this.clear();
		});

		// State handling
		dt.on('stateSaveParams', (e, s, data) => {
			if (!data.columnControl) {
				data.columnControl = {};
			}

			data.columnControl[idx] = {
				type: dom.select.value,
				value: dom.input.value
			};
		});

		dt.on('stateLoaded', (e, s, state) => {
			this._stateLoad(state);
		});

		// Same as for ColumnControl - reassign a column index if needed.
		dt.on('columns-reordered', (e, details) => {
			this._idx = (dt as any).colReorder.transpose(originalIdx, 'fromOriginal');
		});

		// Column control search clearing (column().ccSearchClear() method)
		dt.on('cc-search-clear', (e, colIdx) => {
			if (colIdx === this._idx) {
				this.clear();
				// TODO don't want to trigger a draw here - it would have once for every column!
			}
		});

		// Runs after initial state load, so we need to check if there has already been a state
		// loaded
		this._stateLoad(dt.state.loaded());
	}

	/**
	 * Run the search method
	 */
	private _runSearch() {
		let dom = this._dom;

		dom.container.classList.toggle('dtcc-search_active', dom.input.value !== '');

		if (
			this._search &&
			(this._lastValue !== dom.input.value || this._lastType !== dom.select.value)
		) {
			this._search(dom.select.value, dom.input.value);
			this._lastValue = dom.input.value;
			this._lastType = dom.select.value;
		}
	}

	/**
	 * Load a DataTables state
	 *
	 * @param state State object being loaded
	 */
	private _stateLoad(state) {
		let dom = this._dom;
		let idx = this._idx;

		if (state && state.columnControl) {
			let loaded = state.columnControl[idx];

			if (loaded) {
				dom.select.value = loaded.type;
				dom.input.value = loaded.value;

				dom.select.dispatchEvent(new Event('change'));
			}
		}
	}
}
