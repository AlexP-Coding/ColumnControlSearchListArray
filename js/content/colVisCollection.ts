import {IContentPlugin, IContentConfig} from './content';

export interface IColVisCollection extends IContentConfig {
	className: string;
	columns: string | number | Array<string | number>;
	title: string;
}

export default {
	defaults: {
		className: 'colVisCollection',
		columns: '',
		text: 'Column visibility'
	},

	extend(config) {
		let dt = this.dt();

		return {
			extend: 'collection',
			icon: 'columns',
			text: dt.i18n('columnControl.colVisCollection', config.text),
			content: [
				Object.assign(
					{
						extend: 'colVis'
					},
					config
				)
			]
		};
	}
} as any;
