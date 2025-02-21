import {Api, ColumnSelector} from '../../../types/types';

export interface IConfig {
	target?: 0;
	content?: [];
}

interface ISettings {
	columnIdx: number;
}

/**
 *
 */
export default class ColumnControl {
	private dom = {};

	private dt: Api;

	private c: IConfig = {};

	private s: ISettings = {
		columnIdx: null
	};

	constructor(dt: Api, columnIdx: number, opts: typeof ColumnControl.defaults) {
		this.dt = dt;
		this.s.columnIdx = columnIdx;

		$.extend(this.c, ColumnControl.defaults, opts);

		console.log('CC', columnIdx, opts);

		dt.on('destroy', function () {});
	}

	static defaults: IConfig = {};

	static version = '0.0.1-dev';
}
