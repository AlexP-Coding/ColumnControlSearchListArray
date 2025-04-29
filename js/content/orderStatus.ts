import { IContentPlugin } from './content';
import { IOrderConfig } from './order';

export interface IOrderStatus extends Partial<IOrderConfig> {
	extend: 'orderStatus'
}

export default {
	defaults: {
		className: 'order',
		iconAsc: 'orderAsc',
		iconDesc: 'orderDesc',
		iconNone: 'orderNone',
		statusOnly: true,
		text: 'Order status'
	},

	extend(config) {
		return Object.assign({extend: 'order'}, config);
	}
} as IContentPlugin<IOrderConfig>;
