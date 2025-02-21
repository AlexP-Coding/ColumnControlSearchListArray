// Type definitions for DataTables ColumnControl
//
// Project: https://datatables.net/extensions/columncontrol/, https://datatables.net
// Definitions by:
//   SpryMedia
//   Andy Ma <https://github.com/andy-maca>

/// <reference types="jquery" />

import DataTables, {Api, ColumnSelector} from 'datatables.net';

export default DataTables;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables' types integration
 */
declare module 'datatables.net' {
	interface Config {
		/**
		 * Common ColumnControl extension options to apply to all columns
		 */
		columnControl?: boolean | ConfigColumnControl;
	}

	interface ConfigColumns {
		/**
		 * Column specific column configuration options
		 *
		 * @returns Api for chaining with the additional ColumnControl methods
		 */
		columnControl?: boolean | ConfigColumnControl;
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
				config: boolean | ConfigColumnControl
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

interface ConfigColumnControl {}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * API
 */
