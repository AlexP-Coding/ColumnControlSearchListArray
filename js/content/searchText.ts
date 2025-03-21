import Container from '../Container';
import icons from '../icons';
import {createElement} from '../util';
import {IContentPlugin, IContentConfig} from './content';

export interface ISearchText extends IContentConfig {
	placeholder: string;
	text: string;
	title: string;
}

export default {
	defaults: {
		placeholder: '',
		text: '',
		title: ''
	},

	init(config) {
		let dt = this.dt();
		let column = dt.column(this.idx());
		let input = createElement<HTMLInputElement>('input');
		let select = createElement<HTMLSelectElement>('select');
		let icon = createElement<HTMLDivElement>('div', 'dtcc-search-icon');
		let title = createElement<HTMLDivElement>('div', 'dtcc-search-title', config.text);
		let inputs = createElement<HTMLDivElement>('div', [], '', [icon, select, input]);
		let container = createElement<HTMLDivElement>(
			'div',
			['dtcc-content', 'dtcc-search', 'dtcc-searchText'],
			null,
			[title, inputs]
		);

		select.add(new Option('Contains', 'contains'));
		select.add(new Option('Equals', 'equals'));
		select.add(new Option('Starts with', 'starts'));

		if (config.placeholder) {
			input.placeholder = config.placeholder.replace('*', column.title());
		}

		if (config.title) {
			input.title = config.title.replace('*', column.title());
		}

		// Initial value
		input.value = column.search();
		icon.innerHTML = icons['contains'];

		// Listeners
		input.addEventListener('keyup', () => {
			runSearch(container, input, select, column);
		});

		select.addEventListener('change', () => {
			icon.innerHTML = icons[select.value];
			runSearch(container, input, select, column);
		});

		// State handling
		dt.on('stateSaveParams', (e, s, data) => {
			if (!data.columnControl) {
				data.columnControl = {};
			}

			data.columnControl[this.idx()] = {
				type: select.value,
				value: input.value
			};
		});

		dt.on('stateLoaded', (e, s, state) => {
			stateLoad(state, this.idx(), input, select);
		});

		// Runs after initial state load, so we need to check if there has already been a state
		// loaded
		stateLoad(dt.state.loaded(), this.idx(), input, select);

		return container;
	}
} as IContentPlugin<ISearchText>;

/** Perform a search */
function runSearch(container, input, select, column) {
	container.classList.toggle('dtcc-search_active', input.value !== '');

	let searchType = select.value;
	let searchTerm = input.value.toLowerCase();

	// No change - don't do anything
	if (column.search.fixed('dtcc') === '' && input.value === '') {
		return;
	}

	if (input.value === '') {
		column.search.fixed('dtcc', '');
	}
	else if (searchType === 'equals') {
		column.search.fixed('dtcc', (haystack) => haystack.toLowerCase() === searchTerm);
	}
	else if (searchType === 'contains') {
		column.search.fixed('dtcc', searchTerm);
	}
	else if (searchType === 'starts') {
		column.search.fixed('dtcc', (haystack) => haystack.toLowerCase().startsWith(searchTerm));
	}

	column.draw();
}

/** Load a state */
function stateLoad(state, idx, input, select) {
	if (state && state.columnControl) {
		let loaded = state.columnControl[idx];

		if (loaded) {
			select.value = loaded.type;
			input.value = loaded.value;

			select.dispatchEvent(new Event('change'));
		}
	}
}
