import { createElement } from '../util';
import { IContentPlugin, IContentConfig } from './content';

export interface ISpacer extends IContentConfig {
	className: string;
	text: string;
}

export default {
	defaults: {
		className: 'dtcc-spacer',
		text: ''
	},

	init(config) {
		let dt = this.dt();

		let spacer = createElement(
			'div',
			config.className,
			dt.i18n('columnControl.spacer', config.text)
		);

		return spacer;
	}
} as IContentPlugin<ISpacer>;
