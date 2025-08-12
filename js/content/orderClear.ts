import Button from '../Button';
import { IContentPlugin, IContentConfig } from './content';

export interface IOrderClearConfig extends IContentConfig {
	/** Button class name */
	className: string;

	/** Button icon */
	icon: string;

	/** Button text (shown in dropdown) */
	text: string;
}

export interface IOrderClear extends Partial<IOrderClearConfig> {
	extend: 'orderClear';
}

export default {
	defaults: {
		className: 'orderClear',
		icon: 'orderClear',
		text: 'Clear sort'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button(dt, this)
			.text(dt.i18n('columnControl.orderClear', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				dt.order([]).draw();
			});

		dt.on('order', (e, s, order) => {
			btn.enable(order.length > 0);
		});

		if (dt.order().length === 0) {
			btn.enable(false);
		}

		return btn.element();
	}
} as IContentPlugin<IOrderClearConfig>;
