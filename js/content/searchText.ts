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

		dt.on('stateLoaded', (e, s, state) => {
			input.value = column.search();
		});

		return container;
	}
} as IContentPlugin<ISearchText>;


function runSearch(container, input, select, column) {
	container.classList.toggle('dtcc-search_active', input.value !== '');

	let searchType = select.value;
	let searchTerm = input.value;

	if (input.value === '') {
		column.search.fixed('dtcc', '');
	}
	else if (searchType === 'equals') {
		column.search.fixed('dtcc', (haystack) => haystack === searchTerm);
	}
	else if (searchType === 'contains') {
		column.search.fixed('dtcc', searchTerm);
	}
	else if (searchType === 'starts') {
		column.search.fixed('dtcc', (haystack) => haystack.startsWith(searchTerm));
	}

	column.draw();
}