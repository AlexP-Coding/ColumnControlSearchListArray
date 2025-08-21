import Button from '../Button';
import { IContentPlugin, IContentConfig } from './content';

export interface IRowGroup extends IContentConfig {
	/** Button class name */
	className: string;

	/** Button icon */
	icon: string;

	/** Trigger ordering on the grouped data */
	order: boolean;

	/** Button text (shown in dropdown) */
	text: string;
}

export interface IOrderAsc extends Partial<IRowGroup> {
	extend: 'rowGroup';
}

export default {
	defaults: {
		className: 'rowGroup',
		icon: 'groupTop',
		order: true,
		text: 'Group rows'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button(dt, this)
			.text(dt.i18n('columnControl.rowGroup', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				let dataSrc = dt.column(this.idx()).dataSrc();

				if (btn.active()) {
					// Grouping is active - remove
					let applied = (dt as any).rowGroup().dataSrc();
					let set = [];

					if (Array.isArray(applied)) {
						// If it is in a nested level, remove
						let idx = applied.indexOf(dataSrc);

						if (idx !== 0) {
							applied.slice().splice(idx, 1);
						}
					}

					(dt as any).rowGroup().dataSrc(set);
				}
				else {
					// No grouping by this column yet, set it
					(dt as any).rowGroup().dataSrc(dataSrc);

					if (config.order) {
						dt.order([
							{
								idx: this.idx(),
								dir: 'asc'
							}
						]);
					}
				}

				dt.draw();
			});

		// Show as active when grouping is applied
		dt.on('rowgroup-datasrc', () => {
			let applied = (dt as any).rowGroup().dataSrc();
			let ours = dt.column(this.idx()).dataSrc();

			if (Array.isArray(applied)) {
				// Multi-level grouping
				btn.active(applied.includes(ours));
			}
			else {
				// Single level grouping only
				btn.active(applied === ours);
			}
		});

		return btn.element();
	}
} as IContentPlugin<IRowGroup>;
