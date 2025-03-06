import {createElement} from '../functions';
import {IContent, IContentConfig} from './content';

interface ITitle extends IContentConfig {
	className: string;
	text: string | null;
}

export default {
	defaults: {
		className: 'dtcc-title',
		text: null
	},

	init(config) {
		let dt = this.dt();
		let title = dt.column(this.idx()).title();
		let el = createElement(
			'div',
			config.className,
			config.text === null ? title : config.text
		);

		return el;
	}
} as IContent<ITitle>;
