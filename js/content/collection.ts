import DataTable, {Api, ColumnSelector} from '../../../../types/types';
import Button from '../Button';
import {createElement} from '../functions';
import icons from '../icons';
import {IContent, IContentConfig} from './content';

interface HTMLDropdown extends HTMLDivElement {
	_shown: boolean;
	_close: () => void;
}

interface ICollection extends IContentConfig {
	className: string;
	content: IContentConfig[];
	icon: string;
	text: string;

	/** @ignore */
	_topLevel: Button;
}

/**
 * Position the dropdown relative to the button that activated it, with possible corrections
 * to make sure it is visible on the page.
 *
 * @param dropdown Dropdown element
 * @param dt Container DataTable
 * @param btn Button the dropdown emanates from
 */
function positionDropdown(dropdown: HTMLDropdown, dt: Api, btn: HTMLButtonElement) {
	let dtContainer = dt.table().container();
	let header = btn.closest('div.dt-column-header');
	let headerStyle = getComputedStyle(header);
	let dropdownWidth = dropdown.offsetWidth;
	let position = relativePosition(dtContainer, btn);
	let left, top;

	top = position.top + btn.offsetHeight;

	if (headerStyle.flexDirection === 'row-reverse') {
		// Icon is on the left of the header - align the left hand sides
		left = position.left;
	}
	else {
		// Icon is on the right of the header - align the right hand sides
		left = position.left - dropdownWidth + btn.offsetWidth;
	}

	// Corrections - don't extend past the DataTable to the left and right
	let containerOffsetLeft = dtContainer.offsetLeft;
	let containerWidth = dtContainer.offsetWidth;

	if (left + dropdownWidth > containerWidth) {
		left -= left + dropdownWidth - containerWidth;
	}

	if (left < containerOffsetLeft) {
		left = containerOffsetLeft;
	}

	dropdown.style.top = top + 'px';
	dropdown.style.left = left + 'px';
}

/**
 * Display the dropdown in the document
 *
 * @param dropdown Dropdown element
 * @param dt Container DataTable
 * @param btn Button the dropdown emanates from
 * @returns Function to call when the dropdown should be removed from the document
 */
function attachDropdown(dropdown: HTMLDropdown, dt: Api, btn: Button) {
	let dtContainer = dt.table().container();

	dropdown._shown = true;
	dtContainer.append(dropdown);
	positionDropdown(dropdown, dt, btn.element());

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

		let btn = new Button()
			.text(dt.i18n('columnControl.content.collection', config.text))
			.icon(config.icon)
			.className(config.className)
			.handler(() => {
				if (dropdown._shown) {
					dropdown._close();
				}
				else {
					// Close any other dropdowns that are already shown
					document.querySelectorAll<HTMLDropdown>('div.dtcc-dropdown').forEach((el) => {
						el._close();
					});

					attachDropdown(dropdown, dt, config._topLevel || btn);
				}
			});

		// Add the content for the dropdown
		for (let i = 0; i < config.content.length; i++) {
			let content = this.resolve(config.content[i]);

			// For nested collections we need to keep a reference to the top level so the sub-levels
			// can be positioned relative to that top level.
			if (content.type === 'collection') {
				content.config._topLevel = config._topLevel || btn;
			}

			let el = content.plugin.init.call(this, content.config);

			liner.appendChild(el);
		}

		// For nested collections, add an extra icon element to show that it will dropdown further
		if (config._topLevel) {
			btn.active('chevronRight');
		}

		return btn.element();
	}
} as IContent<ICollection>;
