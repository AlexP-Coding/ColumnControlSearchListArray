import { IContentPlugin, IContentConfig } from './content';
import { ISearch } from './search';

export interface ISearchDropdown extends ISearch {
	text: string;
}

export default {
	defaults: {
		ajaxOnly: true,
		allowSearchList: true,
		className: 'searchDropdown',
		clear: true,
		columns: '',
		options: null,
		placeholder: '',
		search: true,
		select: true,
		text: 'Search',
		title: '',
		titleAttr: ''
	},

	extend(config) {
		let dt = this.dt();

		return {
			extend: 'dropdown',
			icon: 'search',
			text: dt.i18n('columnControl.searchDropdown', config.text),
			content: [
				Object.assign(
					{
						extend: 'search'
					},
					config
				)
			]
		};
	}
} as IContentPlugin<ISearchDropdown>;
