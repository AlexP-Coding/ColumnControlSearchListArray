import DataTable from '../../../../types/types';

import collection, {ICollection} from './collection';
import order, {IOrder} from './order';
import orderAddAsc, {IOrderAddAsc} from './orderAddAsc';
import orderAddDesc, {IOrderAddDesc} from './orderAddDesc';
import orderAsc, {IOrderAsc} from './orderAsc';
import orderClear, {IOrderClear} from './orderClear';
import orderDesc, {IOrderDesc} from './orderDesc';
import orderRemove, {IOrderRemove} from './orderRemove';
import searchDateTime, {ISearchDateTime} from './searchDate';
import searchNumber, {ISearchNumber} from './searchNumber';
import searchText, {ISearchText} from './searchText';
import spacer, {ISpacer} from './spacer';
import title, {ITitle} from './title';

const ccContent = DataTable.ext.ccContent as any;

export type IContentConfig =
	| ICollection
	| IOrder
	| IOrderAddAsc
	| IOrderAddDesc
	| IOrderAsc
	| IOrderClear
	| IOrderDesc
	| IOrderRemove
	| ISearchDateTime
	| ISearchNumber
	| ISearchText
	| ISpacer
	| ITitle;

Object.assign(ccContent, {
	collection,
	order,
	orderAddAsc,
	orderAddDesc,
	orderAsc,
	orderClear,
	orderDesc,
	orderRemove,
	searchDateTime,
	searchNumber,
	searchText,
	spacer,
	title
});

export default ccContent;
