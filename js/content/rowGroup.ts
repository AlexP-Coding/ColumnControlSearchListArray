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

/**
 * Add an item to the grouping structure
 *
 * @param dt DataTable API instance
 * @param dataSrc Grouping data point to add
 * @returns Grouping array
 */
export function rowGroupAdd(dt: any, dataSrc: any) {
	let applied = rowGroupApplied(dt);
	let idx = applied.indexOf(dataSrc);

	if (idx === -1) {
		applied.push(dataSrc);

		(dt as any).rowGroup().dataSrc(applied);
	}

	return applied;
}

/**
 * Always want an array return
 *
 * @param dt DataTable API instance
 * @returns 
 */
export function rowGroupApplied(dt: any): any[] {
	let applied = (dt as any).rowGroup().dataSrc();

	return Array.isArray(applied)
		? applied
		: [applied];
}

/**
 * Remove all grouping
 *
 * @param dt DataTable API instance
 */
export function rowGroupClear(dt: any) {
	(dt as any).rowGroup().dataSrc([]);
}

/**
 * Remove an item from the grouping structure
 *
 * @param dt DataTable API instance
 * @param dataSrc Grouping data point to remove
 * @returns Grouping array
 */
export function rowGroupRemove(dt: any, dataSrc: any) {
	let applied = rowGroupApplied(dt);
	let idx = applied.indexOf(dataSrc);

	if (idx !== -1) {
		applied.splice(idx, 1);

		(dt as any).rowGroup().dataSrc(applied);
	}

	return applied;
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
					rowGroupRemove(dt, dataSrc);
				}
				else {
					// No grouping by this column yet, set it
					rowGroupClear(dt);
					rowGroupAdd(dt, dataSrc);

					if (config.order !== false) {
						dt.order([this.idx(), 'asc']);
					}
				}

				dt.draw();
			});

		// Show as active when grouping is applied
		dt.on('rowgroup-datasrc', () => {
			let applied = rowGroupApplied(dt);
			let ours = dt.column(this.idx()).dataSrc();

			btn.active(applied.includes(ours));
		});

		return btn.element();
	}
} as IContentPlugin<IRowGroup>;
