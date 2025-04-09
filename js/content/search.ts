import searchDate, { ISearchDateTime } from './searchDate';
import searchNumber, { ISearchNumber } from './searchNumber';
import searchText, { ISearchText } from './searchText';

export type ISearch = ISearchDateTime | ISearchNumber | ISearchText;

export default {
	defaults: {
		placeholder: '',
		title: ''
	},

	init(config) {
		let dt = this.dt();
		let idx = this.idx();
		let displayEl;
		let loadedState = dt.state.loaded()?.columnControl?.[idx]?.searchInput;

		let initType = (type: string) => {
			if (type === 'date' || type.startsWith('datetime')) {
				return searchDate.init.call(this, config);
			} else if (type.includes('num')) {
				return searchNumber.init.call(this, config);
			} else {
				return searchText.init.call(this, config);
			}
		};

		// If we know the type from the saved state, we can load it immediately. This is required
		// to allow the state to be applied to the table and the first draw to have a filter
		// applied (if it is needed).
		if (loadedState) {
			displayEl = initType(loadedState.type);
		} else {
			// Wait until we can get the data type for the column and the run the corresponding type
			displayEl = document.createElement('div');

			dt.ready(() => {
				let column = dt.column(idx);
				let display = initType(column.type());

				displayEl.replaceWith(display);
			});
		}

		return displayEl;
	}
};
