import ColumnControl from '../ColumnControl';
import icons from '../icons';

export interface IContentConfig {}

export interface IContent<T = {}> {
	defaults: T;
	init: (this: ColumnControl, buttonConfig: T) => HTMLElement | HTMLButtonElement;
}
