import {button, IContent, IContentConfig} from './content';

interface IOrderAsc extends IContentConfig {
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
		let btn = button(
			dt.i18n('columnControl.content.orderAsc', config.text),
			config.icon,
			config.className,
			() => {
				this.dt()
					.order([
						{
							idx: this.idx(),
							dir: 'asc'
						}
					])
					.draw();
			}
		);

		dt.on('order', (e, s, order) => {
			let found = order.some((o) => o.col === this.idx() && o.dir === 'asc');

			btn.classList.toggle('dtcc-button_active', found);
		});

		return btn;
	}
} as IContent<IOrderAsc>;
