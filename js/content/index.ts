import DataTable from '../../../../types/types';

import collection from './collection';
import order from './order';
import orderAddAsc from './orderAddAsc';
import orderAddDesc from './orderAddDesc';
import orderAsc from './orderAsc';
import orderClear from './orderClear';
import orderDesc from './orderDesc';
import orderRemove from './orderRemove';
import spacer from './spacer';
import title from './title';

const ccContent = DataTable.ext.ccContent as any;

Object.assign(ccContent, {
	collection,
	order,
	orderAddAsc,
	orderAddDesc,
	orderAsc,
	orderClear,
	orderDesc,
	orderRemove,
	spacer,
	title
});

export default ccContent;
