/*! ColumnControl 0.0.1-dev
 * © SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     ColumnControl
 * @description Provide control buttons and search for column in DataTables
 * @version     0.0.1-dev
 * @author      SpryMedia Ltd
 * @contact     datatables.net
 * @copyright   SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

import DataTable from '../../../types/types';

import ColumnControl, {IConfig} from './ColumnControl';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API integration
 */
(DataTable as any).ColumnControl = ColumnControl;


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Initialisation
 */
$(document).on('preInit.dt', function (e, settings) {
	if (e.namespace !== 'dt') {
		return;
	}

	let api = new DataTable.Api(settings);
	let tableInit: IConfig = settings.oInit.columnControl;
	let defaultInit: IConfig = (DataTable.defaults as any).columnControl;

	api.columns().every(function (i) {
		let columnInit: IConfig = (this.init() as any).columnControl;
		let init: false | IConfig = false;

		if (columnInit) {
			init = Object.assign({}, defaultInit || {}, tableInit || {}, columnInit || {});
		}
		else if (columnInit === undefined && tableInit) {
			init = Object.assign({}, defaultInit || {}, tableInit || {});
		}
		else if (columnInit === undefined && tableInit === undefined && defaultInit) {
			init = Object.assign({}, defaultInit || {});
		}

		if (init) {
			new ColumnControl(api, this.index(), init);
		}
	});
});
