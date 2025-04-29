import Button from '../Button';
import { IContentPlugin, IContentConfig } from './content';

export interface IOrderAddAscConfig extends IContentConfig {
	/** Button class name */
	className: string;

	/** Button icon */
	icon: string;

	/** Button text (shown in dropdown) */
	text: string;
}

export interface IOrderAddAsc extends Partial<IOrderAddAscConfig> {
	extend: 'orderAddAsc';
}

export default {
	defaults: {
		className: 'orderAddAsc',
		icon: 'orderAddAsc',
		text: 'Add Sort Ascending'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button(dt)
			.text(dt.i18n('columnControl.orderAddAsc', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				let order = dt.order();

				order.push([this.idx(), 'asc']);

				dt.draw();
			});

		dt.on('order', (e, s, order) => {
			let found = order.some((o) => o.col === this.idx());

			btn.enable(!found);
		});

		return btn.element();
	}
} as IContentPlugin<IOrderAddAscConfig>;
