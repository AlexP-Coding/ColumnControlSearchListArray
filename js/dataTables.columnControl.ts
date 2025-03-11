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
	let defaultInit = ColumnControl.defaults;
	let baseTargets = [];

	identifyTargets(baseTargets, tableInit);
	identifyTargets(baseTargets, defaultInit);

	api.columns().every(function (i) {
		let columnInit: IConfig = (this.init() as any).columnControl;
		let targets = identifyTargets(baseTargets.slice(), columnInit);

		for (let i = 0; i < targets.length; i++) {
			// Each of the column, table and defaults configuration can be an array of config
			// objects, an array of content, or a configuration object. There might be multiple
			// targets for each one, and they might not exist! Therefore this is more complex
			// than it might be desirable.
			let columnTargetInit = getOptionsForTarget(targets[i], columnInit);
			let tableTargetInit = getOptionsForTarget(targets[i], tableInit);
			let defaultTargetInit = getOptionsForTarget(targets[i], defaultInit);

			if (defaultTargetInit || tableTargetInit || columnTargetInit) {
				new ColumnControl(
					api,
					this.index(),
					Object.assign(
						{},
						defaultTargetInit || {},
						tableTargetInit || {},
						columnTargetInit || {}
					)
				);
			}
		}
	});
});

/**
 * Check if an item is a configuration object or not
 *
 * @param item Item to check
 * @returns true if it is a config object
 */
function isIConfig(item: any) {
	return typeof item === 'object' && (item.targets !== undefined || item.content !== undefined)
		? true
		: false;
}

/**
 * Determine if an array contains only content items or not
 *
 * @param arr Array to check
 * @returns true if is content only, false if not (i.e. is an array with configuration objects).
 */
function isIContentArray(arr: any[]) {
	let detectedConfig = false;

	if (!Array.isArray(arr)) {
		return false;
	}

	for (let i = 0; i < arr.length; i++) {
		if (isIConfig(arr[i])) {
			detectedConfig = true;
			break;
		}
	}

	return !detectedConfig;
}

/**
 * Given a target, get the config object for it from the parameter passed in
 *
 * @param target ColumnControl target
 * @param input The dev's configuration
 * @returns The resolved config object, if found
 */
function getOptionsForTarget(target, input: any): IConfig | void {
	let defaultTarget = ColumnControl.defaults.target;
	let selfTarget;

	if (isIContentArray(input)) {
		// Top level content array - e.g. `columnControl: ['order']`
		if (defaultTarget === target) {
			return {
				target: defaultTarget,
				content: input
			};
		}
	}
	else if (Array.isArray(input)) {
		// Top level array, some items of which will be configuration objects (possibly not all)
		for (let i = 0; i < input.length; i++) {
			let item = input[i];

			if (isIContentArray(item)) {
				// A content array, e.g. the inner array from: `columnControl: [['order']]
				if (defaultTarget === target) {
					return {
						target: defaultTarget,
						content: item
					};
				}
			}
			else if (isIConfig(item)) {
				// A config object, e.g. the object from: `columnControl: [{content: []}]`
				selfTarget = item.target !== undefined ? item.target : defaultTarget;

				if (target === selfTarget) {
					return item;
				}
			}
			else {
				// A content object
				if (target === defaultTarget) {
					return {
						target: defaultTarget,
						content: [item]
					};
				}
			}
		}
	}
	else if (typeof input === 'object') {
		// An object can be either a config object, or an extending content object
		if (isIConfig(input)) {
			// Config object: columnControl: {content: []}
			selfTarget = input.target !== undefined ? input.target : defaultTarget;

			if (target === selfTarget) {
				return input;
			}
		}
		else {
			// content object: columnControl: [{extend: 'order'}]
			if (target === defaultTarget) {
				return {
					target: defaultTarget,
					content: input
				};
			}
		}
	}
}

/**
 * Get a list of all targets from the configuration objects / arrays
 *
 * @param targets Established list of targets - mutated
 * @param input Configuration object / array
 * @returns Updated array
 */
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
