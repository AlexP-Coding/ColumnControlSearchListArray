import CheckList from '../CheckList';
import {IContentPlugin, IContentConfig} from './content';

export interface IColumnVisibility extends IContentConfig {
	className: string;
	columns: string | number | Array<string | number>;
	title: string;
}

export default {
	defaults: {
		className: 'columnVisibility',
		columns: '',
		title: ''
	},

	init(config) {
		let dt = this.dt();
		let columns = dt.columns(config.columns);
		let checkList = new CheckList()
			.title(config.title || '')
			.handler((e, btn) => {
				let idx = btn.value();
				let col = dt.column(idx);

				col.visible(!col.visible());
				btn.active(col.visible());
			});

		columns.every(function () {
			checkList.add({
				active: this.visible(),
				label: this.title(),
				value: this.index()
			});
		});

		return checkList.element();
	}
} as IContentPlugin<IColumnVisibility>;
