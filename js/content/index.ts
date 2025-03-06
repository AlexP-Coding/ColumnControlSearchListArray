import DataTable from '../../../../types/types';

import collection from './collection';
import orderAsc from './orderAsc';
import orderDesc from './orderDesc';
import orderRemove from './orderRemove';
import spacer from './spacer';
import title from './title';

const ccContent = DataTable.ext.ccContent as any;

Object.assign(ccContent, {
	collection,
	orderAsc,
	orderDesc,
	orderRemove,
	spacer,
	title
});

export default ccContent;
