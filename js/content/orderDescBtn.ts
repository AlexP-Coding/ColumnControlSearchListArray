import {IContent, IContentConfig} from './content';

interface IOrderDesc extends IContentConfig {}

export default {
	init(buttonConfig) {
		let button = document.createElement('button');

		button.classList.add('dtcc-button');
		button.classList.add('dtcc-button-orderDesc');
		button.innerHTML = 'DESC';

		button.addEventListener('click', (e) => {
			e.stopPropagation();
			e.preventDefault();

			this.dt()
				.order([{
					idx: this.idx(),
					dir: 'desc'
				}])
				.draw();
		});

		return button;
	}
} as IContent<IOrderDesc>;
