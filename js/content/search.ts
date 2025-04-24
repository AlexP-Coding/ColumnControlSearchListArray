import searchDate, { ISearchDateTime } from './searchDate';
import searchList, { ISearchList, getJsonOptions } from './searchList';
import searchNumber, { ISearchNumber } from './searchNumber';
import searchText, { ISearchText } from './searchText';
import { IContentPlugin } from './content';

export interface ISearch extends ISearchDateTime, ISearchNumber, ISearchText, ISearchList {
	allowSearchList: boolean;
}

export default {
	defaults: {
		allowSearchList: false
	},

	init(config) {
		let dt = this.dt();
		let idx = this.idx();
		let displayEl;
		let loadedState = (dt.state.loaded() as any)?.columnControl?.[idx]?.searchInput;

		let initType = (type: string) => {
			let json = getJsonOptions(dt, idx);

			// Attempt to match what type of search should be shown
			if (config.allowSearchList && json) {
				// We've got a list of JSON options, and are allowed to show the searchList
				return searchList.init.call(this, Object.assign({}, searchList.defaults, config));
			} else if (type === 'date' || type.startsWith('datetime')) {
				// Date types
				return searchDate.init.call(this, Object.assign({}, searchDate.defaults, config));
			} else if (type.includes('num')) {
				// Number types
				return searchNumber.init.call(this, Object.assign({}, searchNumber.defaults, config));
			} else {
				// Everything else
				return searchText.init.call(this, Object.assign({}, searchText.defaults, config));
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
} as IContentPlugin<ISearch>;
