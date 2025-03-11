
import Button from '../Button';
import {IContentPlugin, IContentConfig} from './content';

export interface IOrderClear extends IContentConfig {
	className: string;
	icon: string;
	text: string;
}

export default {
	defaults: {
		className: 'orderClear',
		icon: 'orderClear',
		text: 'Clear sort'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button()
			.text(dt.i18n('columnControl.content.orderClear', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				dt.order([]).draw();
			});

		dt.on('order', (e, s, order) => {
			btn.enable(order.length > 0)
		});

		if (dt.order().length === 0) {
			btn.enable(false);
		}

		return btn.element();
	}
} as IContentPlugin<IOrderClear>;
