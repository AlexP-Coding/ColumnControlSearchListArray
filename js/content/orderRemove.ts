
import Button from '../Button';
import {IContent, IContentConfig} from './content';

interface IOrderRemove extends IContentConfig {
	className: string;
	icon: string;
	text: string;
}

export default {
	defaults: {
		className: 'orderRemove',
		icon: 'orderRemove',
		text: 'Remove from sort'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button()
			.text(dt.i18n('columnControl.content.orderRemove', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				// Remove the current column from the ordering array, then reorder the table
				let order = dt.order();
				let idx = order.findIndex((o) => o[0] === this.idx());

				order.splice(idx, 1);
				dt.order(order).draw();
			});

		dt.on('order', (e, s, order) => {
			let found = order.some((o) => o.col === this.idx());

			btn.enable(found)
		});

		btn.enable(false);

		return btn.element();
	}
} as IContent<IOrderRemove>;
