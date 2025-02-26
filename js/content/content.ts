
import ColumnControl from '../ColumnControl';

export interface IContentConfig {

}

export interface IContent<T={}> {
	init: (this: ColumnControl, buttonConfig: T) => HTMLElement | HTMLButtonElement;
	action: (this: ColumnControl, buttonConfig: T) => HTMLElement | HTMLButtonElement;
}
