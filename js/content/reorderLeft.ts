import Button from '../Button';
import { IContentPlugin, IContentConfig } from './content';

export interface IReorderLeftConfig extends IContentConfig {
	/** Button class name */
	className: string;

	/** Button icon */
	icon: string;

	/** Button text (shown in dropdown) */
	text: string;
}

export interface IReorderLeft extends Partial<IReorderLeftConfig> {
	extend: 'reorderLeft'
}

export default {
	defaults: {
		className: 'reorderLeft',
		icon: 'moveLeft',
		text: 'Move column left'
	},

	init(config) {
		let dt = this.dt();
		let btn = new Button(dt)
			.text(dt.i18n('columnControl.reorderLeft', config.text))
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
} as IContentPlugin<IReorderLeftConfig>;
