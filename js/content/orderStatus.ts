import { IContentPlugin, IContentConfig } from './content';
import { IOrder } from './order';

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
} as IContentPlugin<IOrder>;
