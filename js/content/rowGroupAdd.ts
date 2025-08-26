import Button from '../Button';
import { IContentPlugin, IContentConfig } from './content';
import { rowGroupAdd, rowGroupRemove, rowGroupApplied } from './rowGroup';

export interface IRowGroupAdd extends IContentConfig {
	/** Button class name */
	className: string;

	/** Button icon */
	icon: string;

	/** Trigger ordering on the grouped data */
	order: boolean;

	/** Button text (shown in dropdown) */
	text: string;
}

export interface IOrderAsc extends Partial<IRowGroupAdd> {
	extend: 'rowGroup';
}

export default {
	defaults: {
		className: 'rowGroupAdd',
		icon: 'groupAdd',
		order: true,
		text: 'Add to grouping'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button(dt, this)
			.text(dt.i18n('columnControl.rowGroup', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				let dataSrc = dt.column(this.idx()).dataSrc();

				if (btn.enable()) {
					// No grouping by this column yet, add it
					rowGroupAdd(dt, dataSrc);
				}

				dt.draw();
			});

		// Show as active when grouping is applied
		dt.on('rowgroup-datasrc', () => {
			let applied = rowGroupApplied(dt);
			let ours = dt.column(this.idx()).dataSrc();

			btn.enable(! applied.includes(ours));
		});

		return btn.element();
	}
} as IContentPlugin<IRowGroupAdd>;
