import {button, IContent, IContentConfig} from './content';

interface IOrderAsc extends IContentConfig {
	className: string;
	icon: string;
	text: string;
}

export default {
	init(buttonConfig) {
		let dt = this.dt();
		let btn = button(
			dt.i18n('columnControl.content.orderAsc', buttonConfig.text || 'Sort Ascending'),
			buttonConfig.icon || 'orderAsc',
			buttonConfig.className || 'orderAsc',
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

		return btn;
	}
} as IContent<IOrderAsc>;
