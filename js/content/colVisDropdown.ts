import { IContentPlugin, IContentConfig } from './content';

export interface IColVisDropdown extends IContentConfig {
	className: string;
	columns: string | number | Array<string | number>;
	text: string;
}

export default {
	defaults: {
		className: 'colVisDropdown',
		columns: '',
		text: 'Column visibility'
	},

	extend(config) {
		let dt = this.dt();

		return {
			extend: 'dropdown',
			icon: 'columns',
			text: dt.i18n('columnControl.colVisDropdown', config.text),
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
} as IContentPlugin<IColVisDropdown>;
