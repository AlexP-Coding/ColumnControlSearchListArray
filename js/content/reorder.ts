import Button from '../Button';
import { IContentPlugin, IContentConfig } from './content';

declare var DataTable: any;

export interface IReorderConfig extends IContentConfig {
	/** Button class name */
	className: string;

	/** Button icon */
	icon: string;

	/** Button text (shown in dropdown) */
	text: string;
}

export interface IReorder extends Partial<IReorderConfig> {
	extend: 'reorder';
}

export default {
	defaults: {
		className: 'reorder',
		icon: 'move',
		text: 'Reorder columns'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button(dt, this)
			.text(dt.i18n('columnControl.reorder', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				let idx = this.idx();

				if (idx > 0) {
					(dt as any).colReorder.move(idx, idx - 1);
				}
			});

		if (this.idx() === 0) {
			btn.enable(false);
		}

		dt.on('columns-reordered', (e, details) => {
			btn.enable(this.idx() > 0);
		});

		// If ColReorder wasn't initialised on this DataTable, then we need to add it
		if (!(dt.init() as any).colReorder) {
			new DataTable.ColReorder(dt, {});
		}

		return btn.element();
	}
} as IContentPlugin<IReorderConfig>;
