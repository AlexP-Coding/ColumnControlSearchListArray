import Button from '../Button';
import { IContentPlugin, IContentConfig } from './content';

export interface IOrderDesc extends IContentConfig {
	className: string;
	icon: string;
	text: string;
}

export default {
	defaults: {
		className: 'orderDesc',
		icon: 'orderDesc',
		text: 'Sort Descending'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button(dt)
			.text(dt.i18n('columnControl.orderDesc', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				this.dt()
					.order([
						{
							idx: this.idx(),
							dir: 'desc'
						}
					])
					.draw();
			});

		dt.on('order', (e, s, order) => {
			let found = order.some((o) => o.col === this.idx() && o.dir === 'desc');

			btn.active(found);
		});

		return btn.element();
	}
} as IContentPlugin<IOrderDesc>;
