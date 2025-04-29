import { createElement } from '../util';
import { IContentPlugin, IContentConfig } from './content';

export interface ITitleConfig extends IContentConfig {
	/** Element class name */
	className: string;

	/** Element text (shown in dropdown). If null the column's class name is used. */
	text: string | null;
}

export interface ITitle extends Partial<ITitleConfig> {
	extend: 'title'
}

export default {
	defaults: {
		className: 'dtcc-title',
		text: null
	},

	init(config) {
		let dt = this.dt();
		let title = dt.column(this.idx()).title();
		let el = createElement('div', config.className, config.text === null ? title : config.text);

		return el;
	}
} as IContentPlugin<ITitleConfig>;
