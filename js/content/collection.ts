import DataTable, {Api, ColumnSelector} from '../../../../types/types';
import {button, createElement, IContent, IContentConfig} from './content';

interface HTMLDropdown extends HTMLDivElement {
	_shown: boolean;
	_close: () => void;
}

interface ICollection extends IContentConfig {
	className: string;
	content: IContentConfig[];
	icon: string;
	text: string;
}

function attachDropdown(dropdown: HTMLDropdown, dt: Api, btn: HTMLButtonElement) {
	let dtContainer = dt.table().container();
	let position = relativePosition(dtContainer, btn);

	dtContainer.append(dropdown);
	dropdown._shown = true;

	dropdown.style.top = position.top + btn.offsetHeight + 'px';
	dropdown.style.left = position.left + 'px';

	// Note that this could be called when the dropdown has already been removed from the document
	// via another dropdown being shown. This will clean up the event on the next body click.
	let removeDropdown = (e) => {
		// Not in document, so just clean up the event handler
		if (!dropdown._shown) {
			document.body.removeEventListener('click', removeDropdown);
			return;
		}

		// If the click is inside the dropdown, ignore it - we don't want to immediately close
		if (e.target === dropdown || dropdown.contains(e.target)) {
			return;
		}

		dropdown._close();
		document.body.removeEventListener('click', removeDropdown);
	};

	document.body.addEventListener('click', removeDropdown);

	return removeDropdown;
}

/**
 * Get the position of an element, relative to a given parent. The origin MUST be under the
 * parent's tree.
 *
 * @param parent Parent element to get position relative to
 * @param origin Target element
 */
function relativePosition(parent: HTMLElement, origin: HTMLElement) {
	let top = 0;
	let left = 0;

	while (origin !== parent && origin !== document.body) {
		top += origin.offsetTop;
		left += origin.offsetLeft;

		origin = origin.offsetParent as HTMLElement;
	}

	return {
		top,
		left
	};
}

export default {
	defaults: {
		className: 'collection',
		content: [],
		icon: 'menu',
		text: ''
	},

	init(config) {
		let dt = this.dt();
		let dropdown = createElement<HTMLDropdown>('div', 'dtcc-dropdown', '', [
			createElement('div', 'dtcc-dropdown-liner')
		]);

		dropdown._shown = false;
		dropdown._close = () => {
			dropdown.remove();
			dropdown._shown = false;
		};

		// A liner element allows more styling options, so the contents go inside this
		let liner = dropdown.childNodes[0];

		for (let i = 0; i < config.content.length; i++) {
			let content = this.resolve(config.content[i]);
			let el = content.plugin.init.call(this, content.config);

			liner.appendChild(el);
		}
		
		let btn = button(
			dt.i18n('columnControl.content.collection', config.text),
			config.icon,
			config.className,
			(e) => {
				if (dropdown._shown) {
					dropdown._close();
				}
				else {
					// Close any other dropdowns that are already shown
					document.querySelectorAll<HTMLDropdown>('div.dtcc-dropdown').forEach(el => {
						el._close();
					});

					attachDropdown(dropdown, dt, btn);
				}
			}
		);

		return btn;
	}
} as IContent<ICollection>;
