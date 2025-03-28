import DataTable from '../../../../types/types';

import collection, {ICollection} from './collection';
import colVis, {IColVis} from './colVis';
import colVisCollection, {IColVisCollection} from './colVisCollection';
import reorder, {IReorder} from './reorder';
import reorderLeft, {IReorderLeft} from './reorderLeft';
import reorderRight, {IReorderRight} from './reorderRight';
import order, {IOrder} from './order';
import orderAddAsc, {IOrderAddAsc} from './orderAddAsc';
import orderAddDesc, {IOrderAddDesc} from './orderAddDesc';
import orderAsc, {IOrderAsc} from './orderAsc';
import orderClear, {IOrderClear} from './orderClear';
import orderDesc, {IOrderDesc} from './orderDesc';
import orderRemove, {IOrderRemove} from './orderRemove';
import search, {ISearch} from './search';
import searchDateTime, {ISearchDateTime} from './searchDate';
import searchNumber, {ISearchNumber} from './searchNumber';
import searchText, {ISearchText} from './searchText';
import spacer, {ISpacer} from './spacer';
import title, {ITitle} from './title';

const ccContent = DataTable.ext.ccContent as any;

export type IContentConfig =
	| ICollection
	| IColVis
	| IColVisCollection
	| IReorder
	| IReorderLeft
	| IReorderRight
	| IOrder
	| IOrderAddAsc
	| IOrderAddDesc
	| IOrderAsc
	| IOrderClear
	| IOrderDesc
	| IOrderRemove
	| ISearch
	| ISearchDateTime
	| ISearchNumber
	| ISearchText
	| ISpacer
	| ITitle;

Object.assign(ccContent, {
	collection,
	colVis,
	colVisCollection,
	reorder,
	reorderLeft,
	reorderRight,
	order,
	orderAddAsc,
	orderAddDesc,
	orderAsc,
	orderClear,
	orderDesc,
	orderRemove,
	search,
	searchDateTime,
	searchNumber,
	searchText,
	spacer,
	title
});

export default ccContent;
