import SearchInput from '../SearchInput';
import { IContentPlugin, IContentConfig } from './content';

export interface ISearchNumber extends IContentConfig {
	clear: boolean;
	placeholder: string;
	title: string;
	titleAttr: string;
}

export default {
	defaults: {
		clear: true,
		placeholder: '',
		title: '',
		titleAttr: ''
	},

	init(config) {
		let dt = this.dt();
		let searchInput = new SearchInput(dt, this.idx())
			.type('num')
			.addClass('dtcc-searchNumber')
			.clearable(config.clear)
			.placeholder(config.placeholder)
			.title(config.title)
			.titleAttr(config.titleAttr)
			.options([
				{ label: 'Equals', value: 'equal' },
				{ label: 'Does not equal', value: 'notEqual' },
				{ label: 'Greater than', value: 'greater' },
				{ label: 'Greater or equal', value: 'greaterOrEqual' },
				{ label: 'Less than', value: 'less' },
				{ label: 'Less or equal', value: 'lessOrEqual' },
				{ label: 'Empty', value: 'empty' },
				{ label: 'Not empty', value: 'notEmpty' }
			])
			.search((searchType, searchTerm, loadingState) => {
				let column = dt.column(this.idx());

				if (searchType === 'empty') {
					column.search.fixed('dtcc', (haystack) => !haystack);
				} else if (searchType === 'notEmpty') {
					column.search.fixed('dtcc', (haystack) => !!haystack);
				} else if (column.search.fixed('dtcc') === '' && searchTerm === '') {
					// No change - don't do anything
					return;
				} else if (searchTerm === '') {
					// Clear search
					column.search.fixed('dtcc', '');
				} else if (searchType === 'equal') {
					// Use a function for matching - weak typing
					column.search.fixed('dtcc', (haystack) => stringToNum(haystack) == searchTerm);
				} else if (searchType === 'notEqual') {
					column.search.fixed('dtcc', (haystack) => stringToNum(haystack) != searchTerm);
				} else if (searchType === 'greater') {
					column.search.fixed('dtcc', (haystack) => stringToNum(haystack) > searchTerm);
				} else if (searchType === 'greaterOrEqual') {
					column.search.fixed('dtcc', (haystack) => stringToNum(haystack) >= searchTerm);
				} else if (searchType === 'less') {
					column.search.fixed('dtcc', (haystack) => stringToNum(haystack) < searchTerm);
				} else if (searchType === 'lessOrEqual') {
					column.search.fixed('dtcc', (haystack) => stringToNum(haystack) <= searchTerm);
				}

				// If in a dropdown, set the top level as active
				if (config._top) {
					config._top.activeList(this.unique(), !!column.search.fixed('dtcc'));
				}

				if (!loadingState) {
					column.draw();
				}
			});

		// Set a numeric input type, per BBC's guidelines
		searchInput.input().setAttribute('inputmode', 'numeric');
		searchInput.input().setAttribute('pattern', '[0-9]*');

		return searchInput.element();
	}
} as IContentPlugin<ISearchNumber>;

var _re_html = /<([^>]*>)/g;
var _re_formatted_numeric = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi;

function stringToNum(d) {
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
