import DataTable from '../../../../types/types';

import collection, {ICollection} from './collection';
import moveLeft, {IMoveLeft} from './moveLeft';
import moveRight, {IMoveRight} from './moveRight';
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
	| IMoveLeft
	| IMoveRight
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
	moveLeft,
	moveRight,
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
