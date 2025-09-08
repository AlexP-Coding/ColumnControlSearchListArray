import Button from '../Button';
import { IContentPlugin, IContentConfig } from './content';

export interface ISearchClearConfig extends IContentConfig {
	/** Button class name */
	className: string;

	/** Button icon */
	icon: string;

	/** Button text (shown in dropdown) */
	text: string;
}

export interface ISearchClear extends Partial<ISearchClearConfig> {
	extend: 'searchClear';
}

export default {
	defaults: {
		className: 'searchClear',
		icon: 'searchClear',
		text: 'Clear Search'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button(dt, this)
			.text(dt.i18n('columnControl.searchClear', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				(dt.column(this.idx()) as any).columnControl.searchClear().draw();
			})
			.enable(false);

		dt.on('draw', () => {
			// change enable state
			let search = dt.column(this.idx()).search.fixed('dtcc');
			let searchList = dt.column(this.idx()).search.fixed('dtcc-list');

			btn.enable(!!(search || searchList));
		});

		return btn.element();
	}
} as IContentPlugin<ISearchClearConfig>;
