import SearchInput from '../SearchInput';
import {IContentPlugin, IContentConfig} from './content';

export interface ISearchNumber extends IContentConfig {
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
				{label: 'Less that', value: 'lessThan'},
				{label: 'Not', value: 'notEqual'}
			])
			.search((searchType, searchTerm) => {
				// No change - don't do anything
				if (column.search.fixed('dtcc') === '' && searchTerm === '') {
					return;
				}

				if (searchTerm === '') {
					// Clear search
					column.search.fixed('dtcc', '');
				}
				else if (searchType === 'equals') {
					// Use a function for matching - weak typing
					column.search.fixed(
						'dtcc',
						(haystack) => stringToNumber(haystack) == searchTerm
					);
				}
				else if (searchType === 'greaterThan') {
					column.search.fixed(
						'dtcc',
						(haystack) => stringToNumber(haystack) > searchTerm
					);
				}
				else if (searchType === 'lessThan') {
					column.search.fixed(
						'dtcc',
						(haystack) => stringToNumber(haystack) < searchTerm
					);
				}
				else if (searchType === 'notEqual') {
					// Use a function for not matching - weak typing
					column.search.fixed(
						'dtcc',
						(haystack) => stringToNumber(haystack) != searchTerm
					);
				}

				column.draw();
			});

		searchInput.input().setAttribute('inputmode', 'numeric');
		searchInput.input().setAttribute('pattern', '[0-9]*');

		return searchInput.element();
	}
} as IContentPlugin<ISearchNumber>;

var _re_html = /<([^>]*>)/g;
var _re_formatted_numeric = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi;

function stringToNumber(d) {
	if (d !== 0 && (!d || d === '-')) {
		return -Infinity;
	}

	var type = typeof d;

	if (type === 'number' || type === 'bigint') {
		return d;
	}

	if (d.replace) {
		d = d.replace(_re_html, '').replace(_re_formatted_numeric, '');
	}

	return d * 1;
}
