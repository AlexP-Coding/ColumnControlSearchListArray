
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
