
import searchDate, {ISearchDateTime} from './searchDate';
import searchNumber, {ISearchNumber} from './searchNumber';
import searchText, {ISearchText} from './searchText';

export type ISearch = ISearchDateTime | ISearchNumber | ISearchText;

export default {
	defaults: {
		placeholder: '',
		title: ''
	},

	init(config) {
		let dt = this.dt();
		let column = dt.column(this.idx());
		let placeholder = document.createElement('div');

		dt.ready(() => {
			let type = column.type();
			let el;

			// Check what the data type is and then execute the search type based on that
			if (type === 'date' || type.startsWith('datetime')) {
				el = searchDate.init.call(this, config);
			}
			else if (type.includes('num')) {
				el = searchNumber.init.call(this, config);
			}
			else {
				el = searchText.init.call(this, config);
			}

			if (el) {
				placeholder.replaceWith(el);
			}
		});

		return placeholder;
	}
};
