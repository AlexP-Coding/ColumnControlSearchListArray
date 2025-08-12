import Button from '../Button';
import { IContentPlugin, IContentConfig } from './content';

export interface IOrderAddDescConfig extends IContentConfig {
	/** Button class name */
	className: string;

	/** Button icon */
	icon: string;

	/** Button text (shown in dropdown) */
	text: string;
}

export interface IOrderAddDesc extends Partial<IOrderAddDescConfig> {
	extend: 'orderAddDesc';
}

export default {
	defaults: {
		className: 'orderAddDesc',
		icon: 'orderAddDesc',
		text: 'Add Sort Descending'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button(dt, this)
			.text(dt.i18n('columnControl.orderAddDesc', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				let order = dt.order();

				order.push([this.idx(), 'desc']);

				dt.draw();
			});

		dt.on('order', (e, s, order) => {
			let found = order.some((o) => o.col === this.idx());

			btn.enable(!found);
		});

		return btn.element();
	}
} as IContentPlugin<IOrderAddDescConfig>;
