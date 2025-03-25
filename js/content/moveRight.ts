import Button from '../Button';
import {IContentPlugin, IContentConfig} from './content';

export interface IMoveRight extends IContentConfig {
	className: string;
	icon: string;
	text: string;
}

export default {
	defaults: {
		className: 'moveRight',
		icon: 'moveRight',
		text: 'Move column right'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button()
			.text(dt.i18n('columnControl.content.moveRight', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				let idx = this.idx();

				if (idx < dt.columns().count() - 1) {
					(dt as any).colReorder.move(idx, idx + 1);
				}
			});

		if (this.idx() === dt.columns().count() - 1) {
			btn.enable(false);
		}

		dt.on('columns-reordered', (e, details) => {
			btn.enable(this.idx() < dt.columns().count() - 1);
		});

		return btn.element();
	}
} as IContentPlugin<IMoveRight>;
