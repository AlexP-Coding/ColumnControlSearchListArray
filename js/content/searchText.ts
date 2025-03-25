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
				{label: 'Does not contain', value: 'notContains'},
				{label: 'Equal', value: 'equal'},
				{label: 'Does not equal', value: 'notEqual'},
				{label: 'Starts', value: 'starts'},
				{label: 'Ends', value: 'ends'},
				{label: 'Empty', value: 'empty'},
				{label: 'Not empty', value: 'notEmpty'}
			])
			.search((searchType, searchTerm) => {
				searchTerm = searchTerm.toLowerCase();

				if (searchType === 'empty') {
					column.search.fixed('dtcc', (haystack) => !haystack);
				}
				else if (searchType === 'notEmpty') {
					column.search.fixed('dtcc', (haystack) => !!haystack);
				}
				else if (column.search.fixed('dtcc') === '' && searchTerm === '') {
					// No change - don't do anything
					return;
				}
				else if (searchTerm === '') {
					// Clear search
					column.search.fixed('dtcc', '');
				}
				else if (searchType === 'equal') {
					// Use a function for exact matching
					column.search.fixed('dtcc', (haystack) => haystack.toLowerCase() == searchTerm);
				}
				else if (searchType === 'notEqual') {
					column.search.fixed('dtcc', (haystack) => haystack.toLowerCase() != searchTerm);
				}
				else if (searchType === 'contains') {
					// Use the built in smart search
					column.search.fixed('dtcc', searchTerm);
				}
				else if (searchType === 'notContains') {
					// Use the built in smart search
					column.search.fixed(
						'dtcc',
						(haystack) => !haystack.toLowerCase().includes(searchTerm)
					);
				}
				else if (searchType === 'starts') {
					// Use a function for startsWidth case insensitive search
					column.search.fixed('dtcc', (haystack) =>
						haystack.toLowerCase().startsWith(searchTerm)
					);
				}
				else if (searchType === 'ends') {
					column.search.fixed('dtcc', (haystack) =>
						haystack.toLowerCase().endsWith(searchTerm)
					);
				}

				column.draw();
			});

		return searchInput.element();
	}
} as IContentPlugin<ISearchText>;
