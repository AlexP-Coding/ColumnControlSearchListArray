import CheckList from '../CheckList';
import {IContentPlugin, IContentConfig} from './content';

export interface IColVis extends IContentConfig {
	className: string;
	columns: string | number | Array<string | number>;
	title: string;
}

export default {
	defaults: {
		className: 'colVis',
		columns: '',
		title: 'Column visibility'
	},

	init(config) {
		let dt = this.dt();
		let checkList = new CheckList()
			.title(dt.i18n('columnControl.colVis', config.title))
			.handler((e, btn) => {
				let idx = btn.value();
				let col = dt.column(idx);

				col.visible(!col.visible());
			});

		let rebuild = () => {
			let columns = dt.columns(config.columns);

			columns.every(function () {
				checkList.add({
					active: this.visible(),
					label: this.title(),
					value: this.index()
				});
			});
		}
	
		rebuild();

		dt.on('column-visibility', (e, s, colIdx, state) => {
			let btn = checkList.button(colIdx);

			if (btn) {
				btn.active(state);
			}
		});

		dt.on('columns-reordered', (e, details) => {
			checkList.clear();
			rebuild();
		});

		return checkList.element();
	}
} as IContentPlugin<IColVis>;
