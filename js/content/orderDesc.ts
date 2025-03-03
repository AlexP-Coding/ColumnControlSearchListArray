import {button, IContent, IContentConfig} from './content';

interface IOrderDesc extends IContentConfig {
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
		let btn = button(
			dt.i18n('columnControl.content.orderDesc', config.text),
			config.icon,
			config.className,
			() => {
				this.dt()
					.order([
						{
							idx: this.idx(),
							dir: 'desc'
						}
					])
					.draw();
			}
		);

		dt.on('order', (e, s, order) => {
			let found = order.some((o) => o.col === this.idx() && o.dir === 'desc');

			btn.classList.toggle('dtcc-button_active', found);
		});

		return btn;
	}
} as IContent<IOrderDesc>;
