import Button from '../Button';
import {IContentPlugin, IContentConfig} from './content';

export interface IOrder extends IContentConfig {
	className: string;
	iconAsc: string;
	iconDesc: string;
	iconNone: string;
	text: string;
}

export default {
	defaults: {
		className: 'order',
		iconAsc: 'orderAsc',
		iconDesc: 'orderDesc',
		iconNone: 'orderNone',
		text: 'Toggle ordering'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button()
			.text(dt.i18n('columnControl.content.orderAsc', config.text))
			.icon('orderAsc')
			.className(config.className)
			.handler(() => {
				let order = dt.order();
				let found = order.find((o) => o[0] === this.idx());
				let apply: any = [];

				if (!found) {
					apply.push([this.idx(), 'asc']);
				}
				else if (found[1] === 'asc') {
					apply.push([this.idx(), 'desc']);
				}
				// else - next stage is empty sort

				dt.order(apply).draw();
			});

		dt.on('order', (e, s, order) => {
			let found = order.find((o) => o.col === this.idx());

			if (!found) {
				btn.active(false).icon(config.iconNone);
			}
			else if (found.dir === 'asc') {
				btn.active(true).icon(config.iconAsc);
			}
			else if (found.dir === 'desc') {
				btn.active(true).icon(config.iconDesc);
			}
		});

		return btn.element();
	}
} as IContentPlugin<IOrder>;
