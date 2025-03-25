import Button from '../Button';
import {IContentPlugin, IContentConfig} from './content';

export interface IMoveLeft extends IContentConfig {
	className: string;
	icon: string;
	text: string;
}

export default {
	defaults: {
		className: 'moveLeft',
		icon: 'moveLeft',
		text: 'Move column left'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button()
			.text(dt.i18n('columnControl.content.moveLeft', config.text))
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
} as IContentPlugin<IMoveLeft>;
