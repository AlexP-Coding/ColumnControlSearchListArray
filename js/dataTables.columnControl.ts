import DataTable from '../../../types/types';
import ColumnControl, {IConfig, IDefaults} from './ColumnControl';

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
	let defaultInit = ColumnControl.defaults;
	let baseTargets = [];

	identifyTargets(baseTargets, tableInit);
	identifyTargets(baseTargets, defaultInit);

	api.columns().every(function (i) {
		let columnInit: IConfig = (this.init() as any).columnControl;
		let init: false | IConfig = false;
		let targets = identifyTargets(baseTargets.slice(), columnInit);

		for (let i = 0; i < targets.length; i++) {
			let columnTargetInit = getOptionsForTarget(targets[i], columnInit);
			let tableTargetInit = getOptionsForTarget(targets[i], tableInit);
			let defaultTargetInit = getOptionsForTarget(targets[i], defaultInit);

			if (columnTargetInit) {
				init = Object.assign(
					{},
					defaultTargetInit || {},
					tableTargetInit || {},
					columnTargetInit || {}
				);
			}
			else if (columnTargetInit === undefined && tableTargetInit) {
				init = Object.assign({}, defaultTargetInit || {}, tableTargetInit || {});
			}
			else if (
				columnTargetInit === undefined &&
				tableTargetInit === undefined &&
				defaultTargetInit
			) {
				init = Object.assign({}, defaultTargetInit || {});
			}

			if (init) {
				new ColumnControl(api, this.index(), init);
			}
		}
	});
});

function isIConfig(item: any) {
	return typeof item === 'object' && (item.targets !== undefined || item.content !== undefined) 
		? true
		: false;
}

function isIContent(item: any) {
	return ! isIConfig(item);
}

function getOptionsForTarget(target, input: any): IConfig | void {
	let defaultTarget = ColumnControl.defaults.target;

	if (Array.isArray(input)) {
		// Array of options, or an array of content
		for (let i = 0; i < input.length; i++) {
			let item = input[i];

			if (isIConfig(item)) {
				let selfTarget = item.targets !== undefined ? item.targets : defaultTarget;

				if (target === selfTarget) {
					return item;
				}
			}
			else if (isIContent(item)) {
				return {
					target: ColumnControl.defaults.target,
					content: item
				};
			}

			// TODO THIS DOES NOT COPE WITH A TOP LEVEL CONTENT ARRAY...
		}
	}
	else if (typeof input === 'object') {
		// Full options defined: { target: x, content: [] }
		if (input.target === target) {
			return input;
		}
	}
}

function identifyTargets(targets: any[], input: IConfig | IConfig[]) {
	function add(target) {
		if (!targets.includes(target)) {
			targets.push(target);
		}
	}

	if (Array.isArray(input)) {
		// Array of options, or an array of content
		input.forEach((item) => {
			add(
				typeof item === 'object' && item.target !== undefined
					? item.target
					: ColumnControl.defaults.target
			);
		});
	}
	else if (typeof input === 'object') {
		// Full options defined: { target: x, content: [] }
		add(input.target !== undefined ? input.target : ColumnControl.defaults.target);
	}

	return targets;
}
