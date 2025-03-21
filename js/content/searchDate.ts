import SearchInput from '../SearchInput';
import {IContentPlugin, IContentConfig} from './content';

declare var DataTable: any;

export interface ISearchDateTime extends IContentConfig {
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
				{label: 'Equals', value: 'equals'},
				{label: 'Greater than', value: 'greaterThan'},
				{label: 'Less than', value: 'lessThan'},
				{label: 'Not', value: 'notEqual'}
			])
			.search((searchType, searchTerm) => {
				let search = dateToNum(searchTerm);

				// No change - don't do anything
				if (column.search.fixed('dtcc') === '' && search === '') {
					return;
				}

				if (search === '') {
					// Clear search
					column.search.fixed('dtcc', '');
				}
				else if (searchType === 'equals') {
					// Use a function for matching - weak typing
					column.search.fixed('dtcc', (haystack) => dateToNum(haystack) == search);
				}
				else if (searchType === 'greaterThan') {
					column.search.fixed('dtcc', (haystack) => dateToNum(haystack) > search);
				}
				else if (searchType === 'lessThan') {
					column.search.fixed('dtcc', (haystack) => dateToNum(haystack) < search);
				}
				else if (searchType === 'notEqual') {
					// Use a function for not matching - weak typing
					column.search.fixed('dtcc', (haystack) => dateToNum(haystack) != search);
				}

				column.draw();
			});

		let DateTime = DataTable.use('datetime');

		if (DateTime) {
			new DateTime(searchInput.input(), {});
		}

		return searchInput.element();
	}
} as IContentPlugin<ISearchDateTime>;

function dateToNum(str: string) {
	if (str === '') {
		return '';
	}

	let date = new Date(str);

	return date.getTime();
}
