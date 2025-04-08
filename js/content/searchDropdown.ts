import { IContentPlugin, IContentConfig } from './content';

export interface ISearchDropdown extends IContentConfig {
	className: string;
	text: string;
}

export default {
	defaults: {
		className: 'searchDropdown',
		text: 'Search'
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
