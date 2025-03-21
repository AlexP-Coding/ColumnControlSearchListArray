import SearchInput from '../SearchInput';
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
		let searchInput = new SearchInput(dt, this.idx())
			.placeholder(config.placeholder)
			.title(config.title)
			.text(config.text)
			.options([
				{label: 'Contains', value: 'contains'},
				{label: 'Equals', value: 'equals'},
				{label: 'Starts with', value: 'starts'}
			])
			.search((searchType, searchTerm) => {
				searchTerm = searchTerm.toLowerCase();

				// No change - don't do anything
				if (column.search.fixed('dtcc') === '' && searchTerm === '') {
					return;
				}

				if (searchTerm === '') {
					// Clear search
					column.search.fixed('dtcc', '');
				}
				else if (searchType === 'equals') {
					// Use a function for exact matching
					column.search.fixed(
						'dtcc',
						(haystack) => haystack.toLowerCase() === searchTerm
					);
				}
				else if (searchType === 'contains') {
					// Use the built in smart search
					column.search.fixed('dtcc', searchTerm);
				}
				else if (searchType === 'starts') {
					// Use a function for startsWidth case insensitive search
					column.search.fixed('dtcc', (haystack) =>
						haystack.toLowerCase().startsWith(searchTerm)
					);
				}

				column.draw();
			});

		return searchInput.element();
	}
} as IContentPlugin<ISearchText>;
