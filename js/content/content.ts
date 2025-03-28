import ColumnControl from '../ColumnControl';

export interface IContentConfig {}

export interface IContentPlugin<T = {}> {
	defaults: T;
	init: (this: ColumnControl, buttonConfig: T) => HTMLElement | HTMLButtonElement;
	extend?: (this: ColumnControl, buttonConfig: T) => IContentConfig;
}
