import {createElement} from './util';
import icons from './icons';
import {Api} from '../../../types/types';

interface IDom {
	container: HTMLDivElement;
	input: HTMLInputElement;
	select: HTMLSelectElement;
	icon: HTMLDivElement;
	title: HTMLDivElement;
	inputs: HTMLDivElement;
}

type ISearch = (type: string, term: string) => void;

export default class SearchInput {
	private _dom: IDom;
	private _search: ISearch;
	private _dt: Api;
	private _idx: number;

	/**
	 * Get the container element
	 *
	 * @returns The container element
	 */
	public element() {
		return this._dom.container;
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
		this._dom.icon.innerHTML = icons[opts[0].value];

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
	 * Set the text that will be shown able the input element
	 *
	 * @param text Set the title text
	 * @returns Self for chaining
	 */
	public text(text: string) {
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
	public title(title: string) {
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
			container: createElement<HTMLDivElement>('div', [
				'dtcc-content',
				'dtcc-search',
				'dtcc-searchText'
			]),
			icon: createElement<HTMLDivElement>('div', 'dtcc-search-icon'),
			input: createElement<HTMLInputElement>('input'),
			inputs: createElement<HTMLDivElement>('div'),
			select: createElement<HTMLSelectElement>('select'),
			title: createElement<HTMLDivElement>('div', 'dtcc-search-title')
		};

		let dom = this._dom;

		dom.container.append(dom.title, dom.inputs);
		dom.inputs.append(dom.icon, dom.select, dom.input);

		// Listeners
		dom.input.addEventListener('keyup', () => {
			this._runSearch();
		});

		dom.select.addEventListener('change', () => {
			dom.icon.innerHTML = icons[dom.select.value];
			this._runSearch();
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

		// Runs after initial state load, so we need to check if there has already been a state
		// loaded
		this._stateLoad(dt.state.loaded());
	}

	/**
	 * Run the search method
	 */
	private _runSearch() {
		let dom = this._dom;
		let idx = this._idx;

		dom.container.classList.toggle('dtcc-search_active', dom.input.value !== '');

		if (this._search) {
			this._search(dom.select.value, dom.input.value);
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
