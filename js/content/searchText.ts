import Button from '../Button';
import { createElement } from '../functions';
import {IContentPlugin, IContentConfig} from './content';

export interface ISearchText extends IContentConfig {
	className: string;
	placeholder: string;
}

export default {
	defaults: {
		className: 'searchText',
		placeholder: ''
	},

	init(config) {
		let dt = this.dt();
		let input = createElement<HTMLInputElement>('input', config.className);

		input.addEventListener('keyup', (e) => {
			dt.column(this.idx()).search(input.value).draw();
		});

		return input;
	}
} as IContentPlugin<ISearchText>;
