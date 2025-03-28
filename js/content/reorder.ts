import Button from '../Button';
import {IContentPlugin, IContentConfig} from './content';

export interface IReorder extends IContentConfig {
	className: string;
	icon: string;
	text: string;
}

export default {
	defaults: {
		className: 'reorder',
		icon: 'move',
		text: 'Reorder columns'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button()
			.text(dt.i18n('columnControl.reorder', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				let idx = this.idx();

				if (idx > 0) {
					(dt as any).colReorder.move(idx, idx - 1);
				}
			});

		if (this.idx() === 0) {
			btn.enable(false);
		}

		dt.on('columns-reordered', (e, details) => {
			btn.enable(this.idx() > 0);
		});

		return btn.element();
	}
} as IContentPlugin<IReorder>;
