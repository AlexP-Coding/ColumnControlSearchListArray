import Button from '../Button';
import { IContentPlugin, IContentConfig } from './content';
import { rowGroupApplied, rowGroupClear } from './rowGroup';

export interface IRowGroupClear extends IContentConfig {
	/** Button class name */
	className: string;

	/** Button icon */
	icon: string;

	/** Button text (shown in dropdown) */
	text: string;
}

export interface IOrderAsc extends Partial<IRowGroupClear> {
	extend: 'rowGroup';
}

export default {
	defaults: {
		className: 'rowGroupClear',
		icon: 'groupClear',
		text: 'Clear all grouping'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button(dt, this)
			.text(dt.i18n('columnControl.rowGroup', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				rowGroupClear(dt);

				dt.draw();
			});

		// Show as active when any grouping is applied
		dt.on('rowgroup-datasrc', () => {
			btn.enable(rowGroupApplied(dt).length > 0);
		});

		// Default status
		btn.enable(rowGroupApplied(dt).length > 0);

		return btn.element();
	}
} as IContentPlugin<IRowGroupClear>;
