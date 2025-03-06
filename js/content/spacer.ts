import Button from '../Button';
import {createElement} from '../functions';
import {IContent, IContentConfig} from './content';

interface ISpacer extends IContentConfig {
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
			dt.i18n('columnControl.content.spacer', config.text)
		);

		return spacer;
	}
} as IContent<ISpacer>;

