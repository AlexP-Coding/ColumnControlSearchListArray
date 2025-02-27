import DataTable from '../../../../types/types';

import orderAsc from './orderAsc';
import orderDesc from './orderDesc';

const ccContent = DataTable.ext.ccContent as any;

Object.assign(ccContent, {
	'orderAsc': orderAsc,
	'orderDesc': orderDesc
});

export default ccContent;