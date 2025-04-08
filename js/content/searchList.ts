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
		let dt = this.dt();
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

				let values = checkList.values();
				let col = dt.column(this.idx());

				if (values.length === 0) {
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

				dt.draw();
			});

		let setOptions = (opts) => {
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
		};

		if (config.options) {
			setOptions(config.options);
		} else {
			dt.ready(() => {
				// TODO was there options specified in the Ajax return?

				// If not, get the values for the column, taking into account orthogonal rendering
				let found = {};
				let options = [];

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

				setOptions(options);
			});
		}

		// TODO state saving support

		return checkList.element();
	}
} as IContentPlugin<ISearchList>;
