import ColumnControl from '../ColumnControl';
import Button from '../Button';

export interface IContentConfig {
	/** @ignore */
	_parents?: Button[];
}

export interface IContentPlugin<T = {}, K = {}> {
	classes?: K;
	defaults: T;
	init?: (this: ColumnControl, buttonConfig: T) => HTMLElement | HTMLButtonElement;
	extend?: (this: ColumnControl, buttonConfig: T) => IContentConfig;
}
