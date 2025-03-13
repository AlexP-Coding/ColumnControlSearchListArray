import Container from '../Container';
import { createElement } from '../functions';
import {IContentPlugin, IContentConfig} from './content';

export interface ISearchText extends IContentConfig {
	className: string;
	placeholder: string;
	text: string;
	title: string;
}

export default {
	defaults: {
		className: 'searchText',
		placeholder: '',
		text: '',
		title: ''
	},

	init(config) {
		let dt = this.dt();
		let input = createElement<HTMLInputElement>('input', config.className);
		let column = dt.column(this.idx());
		let container = new Container()
			.append(createElement('div', 'dtcc-searchText-text', config.text))
			.append(input);

		if (config.placeholder) {
			input.placeholder = config.placeholder.replace('*', column.title());
		}

		if (config.title) {
			input.title = config.title.replace('*', column.title());
		}

		// Initial value		
		input.value = column.search();

		// Listeners
		input.addEventListener('keyup', (e) => {
			column.search(input.value).draw();
		});

		dt.on('stateLoaded', (e, s, state) => {
			input.value = column.search();
		});

		return container.element();
	}
} as IContentPlugin<ISearchText>;
