import Button from '../Button';
import { IContentPlugin, IContentConfig } from './content';

export interface IOrderAsc extends IContentConfig {
	className: string;
	icon: string;
	text: string;
}

export default {
	defaults: {
		className: 'orderAsc',
		icon: 'orderAsc',
		text: 'Sort Ascending'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button(dt)
			.text(dt.i18n('columnControl.orderAsc', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				this.dt()
					.order([
						{
							idx: this.idx(),
							dir: 'asc'
						}
					])
					.draw();
			});

		dt.on('order', (e, s, order) => {
			let found = order.some((o) => o.col === this.idx() && o.dir === 'asc');

			btn.active(found);
		});

		return btn.element();
	}
} as IContentPlugin<IOrderAsc>;
