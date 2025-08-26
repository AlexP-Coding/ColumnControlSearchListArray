import Button from '../Button';
import { IContentPlugin, IContentConfig } from './content';
import { rowGroupAdd, rowGroupRemove, rowGroupApplied } from './rowGroup';

export interface IRowGroupRemove extends IContentConfig {
	/** Button class name */
	className: string;

	/** Button icon */
	icon: string;

	/** Button text (shown in dropdown) */
	text: string;
}

export interface IOrderAsc extends Partial<IRowGroupRemove> {
	extend: 'rowGroup';
}

export default {
	defaults: {
		className: 'rowGroupRemove',
		icon: 'groupRemove',
		order: true,
		text: 'Remove from grouping'
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
					// Grouping is active - remove
					rowGroupRemove(dt, dataSrc);
					dt.draw();
				}
			});

		// Show as active when grouping is applied
		dt.on('rowgroup-datasrc', () => {
			let applied = rowGroupApplied(dt);
			let ours = dt.column(this.idx()).dataSrc();

			btn.enable(applied.includes(ours));
		});

		// Default disabled
		btn.enable(false);

		return btn.element();
	}
} as IContentPlugin<IRowGroupRemove>;
