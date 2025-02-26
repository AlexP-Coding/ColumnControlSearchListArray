import DataTable from '../../../../types/types';

import orderAscBtn from './orderAscBtn';
import orderDescBtn from './orderDescBtn';

const ccContent = DataTable.ext.ccContent as any;

Object.assign(ccContent, {
	'orderAscBtn': orderAscBtn,
	'orderDescBtn': orderDescBtn
});

export default ccContent;