import {IContentPlugin, IContentConfig} from './content';

export interface ISearchCollection extends IContentConfig {
	className: string;
	text: string;
}

export default {
	defaults: {
		className: 'searchCollection',
		text: 'Search'
	},

	extend(config) {
		let dt = this.dt();

		return {
			extend: 'collection',
			icon: 'search',
			text: dt.i18n('columnControl.searchCollection', config.text),
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
} as IContentPlugin<ISearchCollection>;
