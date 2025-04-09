import CheckList from '../CheckList';
import { IContentPlugin, IContentConfig } from './content';

export interface ISearchList extends IContentConfig {
	className: string;
	columns: string | number | Array<string | number>;
	options: Array<{ label: string; value: any }> | null;
	search: boolean;
	select: boolean;
	title: string;
}

/** Set the options to show in the list */
function setOptions(checkList: CheckList, opts) {
	for (let i = 0; i < opts.length; i++) {
		if (typeof opts[i] === 'object') {
			checkList.add(
				{
					active: false,
					label: opts[i].label,
					value: opts[i].value
				},
				i === opts.length - 1
			);
		} else {
			checkList.add(
				{
					active: false,
					label: opts[i],
					value: opts[i]
				},
				i === opts.length - 1
			);
		}
	}
}

/** Load a saved state */
function getState(columnIdx: number, state) {
	let loadedState = state?.columnControl?.[columnIdx]?.searchList;

	if (loadedState) {
		return loadedState;
	}
}

export default {
	defaults: {
		className: 'searchList',
		columns: '',
		options: null,
		search: true,
		select: true,
		title: ''
	},

	init(config) {
		let loadedValues = null;
		let dt = this.dt();

		// The search can be applied from a stored start at start up before the options are
		// available. It can also be applied by user input, so it is generalised into this function.
		let applySearch = (values) => {
			let col = dt.column(this.idx());

			if (!values) {
				return;
			} else if (values.length === 0) {
				// Nothing selected - clear the filter
				col.search.fixed('dtcc-list', '');
			} else {
				// Find all matching options from the list of values
				col.search.fixed('dtcc-list', (val) => {
					return values.includes(val);
				});
			}

			// If in a dropdown, set the top level as active
			if (config._top) {
				config._top.activeList(this.unique(), !!values.length);
			}
		};

		let checkList = new CheckList(dt, {
			search: config.search,
			select: config.select
		})
			.searchListener(dt, this)
			.title(dt.i18n('columnControl.searchList', config.title))
			.handler((e, btn) => {
				if (btn) {
					btn.active(!btn.active());
				}

				applySearch(checkList.values());
				dt.draw();
			});

		if (config.options) {
			setOptions(checkList, config.options);
		} else {
			dt.ready(() => {
				// Was there options specified in the Ajax return?
				let column = dt.column(this.idx());
				let name = column.name();
				let dataSrc = column.dataSrc();
				let json = (dt.ajax.json() as any)?.columnControl;
				let options = [];

				if (json && json[name]) {
					// Found options matching the column's name - top priority
					options = json[name];
				} else if (json && typeof dataSrc === 'string' && json[dataSrc]) {
					// Found options matching the column's data source string
					options = json[dataSrc];
				}
				else if (json && json[this.idx()]) {
					// Found options matching the column's data index
					options = json[this.idx()];
				}
				else {
					// Either no ajax object (i.e. not an Ajax table), or no matching ajax options
					// for this column - get the values for the column, taking into account
					// orthogonal rendering
					let found = {};

					dt.cells('*', this.idx(), { order: this.idx() }).every(function () {
						let filter = this.render('filter');

						if (!found[filter]) {
							found[filter] = true;

							options.push({
								label: this.render('display'),
								value: filter
							});
						}
					});
				}

				setOptions(checkList, options);

				// If there was a state loaded at start up, then we need to set the visual
				// appearance to match
				if (loadedValues) {
					checkList.values(loadedValues);
				}
			});
		}

		// Unlike the SearchInput based search contents, CheckList does not handle state saving
		// (since the mechanism for column visibility is different), so state saving is handled
		// here.
		dt.on('stateLoaded', (e, s, state) => {
			let values = getState(this.idx(), state);

			if (values) {
				checkList.values(values);
			}
		});

		dt.on('stateSaveParams', (e, s, data) => {
			let idx = this.idx();

			if (!data.columnControl) {
				data.columnControl = {};
			}

			if (!data.columnControl[idx]) {
				data.columnControl[idx] = {};
			}

			data.columnControl[idx].searchList = checkList.values();
		});

		loadedValues = getState(this.idx(), dt.state.loaded());
		applySearch(loadedValues);

		return checkList.element();
	}
} as IContentPlugin<ISearchList>;
