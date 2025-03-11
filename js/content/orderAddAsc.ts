
import Button from '../Button';
import {IContentPlugin, IContentConfig} from './content';

export interface IOrderAddAsc extends IContentConfig {
	className: string;
	icon: string;
	text: string;
}

export default {
	defaults: {
		className: 'orderAddAsc',
		icon: 'orderAddAsc',
		text: 'Add Sort Ascending'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button()
			.text(dt.i18n('columnControl.content.orderAddAsc', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				let order = dt.order();

				order.push([this.idx(), 'asc']);

				dt.draw();
			});

		dt.on('order', (e, s, order) => {
			let found = order.some((o) => o.col === this.idx());

			btn.enable(!found)
		});

		return btn.element();
	}
} as IContentPlugin<IOrderAddAsc>;
