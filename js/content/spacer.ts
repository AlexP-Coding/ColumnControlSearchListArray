import { createElement } from '../util';
import { IContentPlugin, IContentConfig } from './content';

export interface ISpacerConfig extends IContentConfig {
	/** Element class name */
	className: string;

	/** Element text (shown in dropdown) */
	text: string;
}

export interface ISpacer extends Partial<ISpacerConfig> {
	extend: 'spacer';
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

		spacer.setAttribute('role', 'separator');

		return spacer;
	}
} as IContentPlugin<ISpacerConfig>;
