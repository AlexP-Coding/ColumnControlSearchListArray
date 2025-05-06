import { IContentPlugin, IContentConfig } from './content';
import { IColVisConfig } from './colVis';

export interface IColVisDropdownConfig extends IColVisConfig {
	/** Button config */
	text: string;
}

export interface IColVisDropdown extends Partial<IColVisDropdownConfig> {
	extend: 'colVisDropdown';
}

export default {
	defaults: {
		className: 'colVis',
		columns: '',
		search: false,
		select: false,
		text: 'Column visibility',
		title: ''
	},

	extend(config) {
		let dt = this.dt();

		return {
			extend: 'dropdown',
			icon: 'columns',
			text: dt.i18n('columnControl.colVisDropdown', config.text),
			content: [
				Object.assign(config, {
					extend: 'colVis'
				})
			]
		};
	}
} as IContentPlugin<IColVisDropdownConfig>;
