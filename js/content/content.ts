import ColumnControl from '../ColumnControl';
import Button from '../Button';

export interface IContentConfig {
	/** @ignore */
	_parents?: Button[];
}

export interface IContentPlugin<T = {}> {
	defaults: T;
	init?: (this: ColumnControl, buttonConfig: T) => HTMLElement | HTMLButtonElement;
	extend?: (this: ColumnControl, buttonConfig: T) => IContentConfig;
}
