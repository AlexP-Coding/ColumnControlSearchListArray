import { IContentPlugin } from './content';
import { IOrderConfig } from './order';

export interface IOrderStatus extends Partial<IOrderConfig> {
	extend: 'orderStatus';
}

export default {
	defaults: {
		className: 'order',
		iconAsc: 'orderAsc',
		iconDesc: 'orderDesc',
		iconNone: 'orderNone',
		statusOnly: true,
		text: 'Sort status'
	},

	extend(config) {
		return Object.assign(config, { extend: 'order' });
	}
} as IContentPlugin<IOrderConfig>;
