// Type definitions for DataTables ColumnControl
//
// Project: https://datatables.net/extensions/columncontrol/, https://datatables.net
// Definitions by:
//   SpryMedia
//   Andy Ma <https://github.com/andy-maca>

/// <reference types="jquery" />

import DataTables from 'datatables.net';
import {TContentItem} from '../js/ColumnControl';

export default DataTables;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables' types integration
 */
declare module 'datatables.net' {
	interface Config {
		/**
		 * Common ColumnControl extension options to apply to all columns
		 */
		columnControl?: ConfigColumnControl | Array<TContentItem | ConfigColumnControl>;
	}

	interface ConfigColumns {
		/**
		 * Column specific column configuration options
		 *
		 * @returns Api for chaining with the additional ColumnControl methods
		 */
		columnControl?: ConfigColumnControl | Array<TContentItem | ConfigColumnControl>;
	}

	interface DataTablesStatic {
		/**
		 * ColumnControl class
		 */
		ColumnControl: {
			/**
			 * Create a new ColumnControl instance for a specific column
			 */
			new (
				dt: Api<any>,
				columnIdx: number,
				config: ConfigColumnControl
			): DataTablesStatic['ColumnControl'];

			/**
			 * ColumnControl version
			 */
			version: string;

			/**
			 * Default configuration values
			 */
			defaults: ConfigColumnControl;
		};
	}
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Options
 */
type TTfootTarget = `tfoot:${number}`;
type TTheadTarget = `thead:${number}`;

interface ConfigColumnControl {
	/**
	/**
	 * Designate the target header or footer row for where to insert the ColumnControl's content
	 */
	target: number | 'tfoot' | TTfootTarget | TTheadTarget;

	/**
	 * Class(es) to assign to the target row.
	 */
	className?: string | string[];

	/**
	 * Content to show in the cells.
	 */
	content?: TContentItem[];
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * API
 */
