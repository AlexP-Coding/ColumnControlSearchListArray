import {IContent, IContentConfig} from './content';

interface IOrderAsc extends IContentConfig {}

export default {
	init(buttonConfig) {
		let button = document.createElement('button');

		button.classList.add('dtcc-button');
		button.classList.add('dtcc-button-orderAsc');
		button.innerHTML = 'ASC';

		button.addEventListener('click', (e) => {
			e.stopPropagation();
			e.preventDefault();

			this.dt()
				.order([{
					idx: this.idx(),
					dir: 'asc'
				}])
				.draw();
		});

		return button;
	}
} as IContent<IOrderAsc>;
