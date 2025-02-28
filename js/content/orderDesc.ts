import {button, IContent, IContentConfig} from './content';

interface IOrderDesc extends IContentConfig {
	className: string;
	icon: string;
	text: string;
}

export default {
	init(buttonConfig) {
		let dt = this.dt();
		let btn = button(
			dt.i18n('columnControl.content.orderDesc', buttonConfig.text || 'Sort Descending'),
			buttonConfig.icon || 'orderDesc',
			buttonConfig.className || 'orderDesc',
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
			let found = order.some(o => o.col === this.idx() && o.dir === 'desc');

			btn.classList.toggle('dtcc-button_active', found);
		});

		return btn;
	}
} as IContent<IOrderDesc>;
