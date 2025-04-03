import Button from '../Button';
import {IContentPlugin, IContentConfig} from './content';

export interface ISearchClear extends IContentConfig {
	className: string;
	icon: string;
	text: string;
}

export default {
	defaults: {
		className: 'searchClear',
		icon: 'searchClear',
		text: 'Clear search'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button()
			.text(dt.i18n('columnControl.searchClear', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				(dt.column(this.idx()) as any).ccSearchClear();
			})
			.enable(false);

		dt.on('draw', () => {
			// change enable state
			btn.enable(!!dt.column(this.idx()).search.fixed('dtcc'));
		});

		return btn.element();
	}
} as IContentPlugin<ISearchClear>;
