import { Api } from '../../../../types/types';
import SearchInput from '../SearchInput';
import { IContentPlugin, IContentConfig } from './content';

declare var DataTable: any;

export interface ISearchDateTimeConfig extends IContentConfig {
	/** Allow the input clear icon to show, or not */
	clear: boolean;

	/** Date / time format to use for the input. Will be auto detected if not given. */
	format: string;

	/**
	 * Date filtering mask. Format is "YYYY-MM-DD[T ]hh:mm:ss.sss". Remove a component to remove
	 * it from the comparison (that unit will be set to 0)
	 */
	mask: string;

	/** Placeholder text to apply to the `input` */
	placeholder: string;

	/** Title text to show above the search input. `[title]` will be replaced by the column title */
	title: string;

	/**
	 * Text to apply to a `title` attribute for the search input. `[title]` will be replaced by
	 * the column title
	 */
	titleAttr: string;
}

export interface ISearchDateTime extends Partial<ISearchDateTimeConfig> {
	extend: 'searchDateTime';
}

export default {
	defaults: {
		clear: true,
		format: '',
		mask: '',
		placeholder: '',
		title: '',
		titleAttr: ''
	},

	init(config) {
		let fromPicker = false;
		let moment = DataTable.use('moment');
		let luxon = DataTable.use('luxon');
		let dt = this.dt();
		let i18nBase = 'columnControl.search.datetime.';
		let pickerFormat = '';
		let dataSrcFormat = '';
		let dateTime;
		let searchInput = new SearchInput(dt, this.idx())
			.type('date')
			.addClass('dtcc-searchDateTime')
			.sspTransform((val) => toISO(val, pickerFormat, moment, luxon))
			.clearable(config.clear)
			.placeholder(config.placeholder)
			.title(config.title)
			.titleAttr(config.titleAttr)
			.options([
				{ label: dt.i18n(i18nBase + 'equal', 'Equals'), value: 'equal' },
				{ label: dt.i18n(i18nBase + 'notEqual', 'Does not equal'), value: 'notEqual' },
				{ label: dt.i18n(i18nBase + 'greater', 'After'), value: 'greater' },
				{ label: dt.i18n(i18nBase + 'less', 'Before'), value: 'less' },
				{ label: dt.i18n(i18nBase + 'empty', 'Empty'), value: 'empty' },
				{ label: dt.i18n(i18nBase + 'notEmpty', 'Not empty'), value: 'notEmpty' }
			])
			.search((searchType, searchTerm, loadingState) => {
				// When SSP, don't apply a filter here, SearchInput will add to the submit data
				if (dt.page.info().serverSide) {
					if (!loadingState) {
						dt.draw();
					}

					return;
				}

				let mask = config.mask;
				let column = dt.column(this.idx());
				let search =
					searchTerm === ''
						? ''
						: dateToNum(
								dateTime && fromPicker ? dateTime.val() : searchTerm.trim(),
								pickerFormat,
								moment,
								luxon,
								mask
						  );

				if (searchType === 'empty') {
					column.search.fixed('dtcc', (haystack) => !haystack);
				}
				else if (searchType === 'notEmpty') {
					column.search.fixed('dtcc', (haystack) => !!haystack);
				}
				else if (column.search.fixed('dtcc') === '' && search === '') {
					// No change - don't do anything
					return;
				}
				else if (!search) {
					// Clear search
					column.search.fixed('dtcc', '');
				}
				else if (searchType === 'equal') {
					// Use a function for matching - weak typing
					// Note that the haystack in the search function is the rendered date - it
					// might need to be converted back to a date
					column.search.fixed(
						'dtcc',
						(haystack) =>
							dateToNum(haystack, dataSrcFormat, moment, luxon, mask) == search
					);
				}
				else if (searchType === 'notEqual') {
					column.search.fixed(
						'dtcc',
						(haystack) =>
							dateToNum(haystack, dataSrcFormat, moment, luxon, mask) != search
					);
				}
				else if (searchType === 'greater') {
					column.search.fixed(
						'dtcc',
						(haystack) =>
							dateToNum(haystack, dataSrcFormat, moment, luxon, mask) > search
					);
				}
				else if (searchType === 'less') {
					column.search.fixed(
						'dtcc',
						(haystack) =>
							dateToNum(haystack, dataSrcFormat, moment, luxon, mask) < search
					);
				}

				// If in a dropdown, set the parent levels as active
				if (config._parents) {
					config._parents.forEach((btn) =>
						btn.activeList(this.unique(), !!column.search.fixed('dtcc'))
					);
				}

				if (!loadingState) {
					column.draw();
				}
			});

		// Once data has been loaded we can run DateTime with the specified format
		dt.ready(() => {
			let DateTime = DataTable.use('datetime');

			dataSrcFormat = getFormat(dt, this.idx());
			pickerFormat = config.format
				? config.format
				: dataSrcFormat;

			if (DateTime) {
				dateTime = new DateTime(searchInput.input(), {
					format: pickerFormat,
					i18n: dt.settings()[0].oLanguage.datetime, // could be undefined
					onChange: () => {
						fromPicker = true;
						searchInput.runSearch();
						fromPicker = false;
					}
				});
			}
		});

		return searchInput.element();
	}
} as IContentPlugin<ISearchDateTimeConfig>;

/**
 * Determine the formatting string for the date time information in the colum
 *
 * @param dt DataTable instance
 * @param column Column index
 * @returns Date / time formatting string
 */
function getFormat(dt: Api, column: number) {
	let type = dt.column(column).type();

	if (!type) {
		// Assume that it is ISO unless otherwise specified - that is all DataTables can do anyway
		return 'YYYY-MM-DD';
	}
	else if (type === 'datetime') {
		// If no format was specified in the DT type, a Javascript native toLocaleDateString
		// was used. Need to work out what that format is in Moment or Luxon. We need to pass
		// a known value though the renderer and work out the format
		let renderer = dt.settings()[0].aoColumns[column].mRender;
		let resultPm = renderer('1999-08-07T23:05:04Z', 'display');
		let resultAm = renderer('1999-08-07T03:05:04Z', 'display');
		let leadingZero = resultAm.includes('03');

		// What formatter are we using?
		if (DataTable.use('moment')) {
			return resultPm
				.replace('23', leadingZero ? 'HH' : 'H')
				.replace('11', leadingZero ? 'hh' : 'h')
				.replace('05', 'mm')
				.replace('04', 'ss')
				.replace('PM', 'A')
				.replace('pm', 'a')
				.replace('07', 'DD')
				.replace('7', 'D')
				.replace('08', 'MM')
				.replace('8', 'M')
				.replace('1999', 'YYYY')
				.replace('99', 'YY');
		}
		else if (DataTable.use('luxon')) {
			return resultPm
				.replace('23', leadingZero ? 'HH' : 'H')
				.replace('11', leadingZero ? 'hh' : 'h')
				.replace('05', 'mm')
				.replace('04', 'ss')
				.replace('PM', 'a')
				.replace('07', 'dd')
				.replace('7', 'd')
				.replace('08', 'MM')
				.replace('8', 'M')
				.replace('1999', 'yyyy')
				.replace('99', 'yy');
		}
		else if (resultPm.includes('23') && resultPm.includes('1999')) {
			return 'YYYY-MM-DD hh:mm:ss';
		}
		else if (resultPm.includes('23')) {
			return 'hh:mm:ss';
		}
		// fall through to final return
	}
	else if (type.includes('datetime-')) {
		// Column was specified with a particular display format - we can extract that format from
		// the type, as it is part of the type name.
		return type.replace(/datetime-/g, '');
	}
	else if (type.includes('moment')) {
		return type.replace(/moment-/g, '');
	}
	else if (type.includes('luxon')) {
		return type.replace(/luxon-/g, '');
	}

	return 'YYYY-MM-DD';
}

/**
 * Convert from a source date / time value (usually a string) to a timestamp for comparisons.
 *
 * @param input Input value
 * @param srcFormat String format of the input
 * @param moment Moment instance, if it is available
 * @param luxon Luxon object, if it is available
 * @returns Time stamp - milliseconds
 */
function dateToNum(input: Date | string, srcFormat: string, moment: any, luxon: any, mask: string) {
	if (input === '') {
		return '';
	}
	else if (!(input instanceof Date) && srcFormat !== 'YYYY-MM-DD' && (moment || luxon)) {
		// TODO This needs to go through the MASK!
		return moment
			? moment(input, srcFormat).unix() * 1000
			: luxon.DateTime.fromFormat(input, srcFormat).toMillis();
	}


	let d: Date;
	
	if (input instanceof Date) {
		d = input;
	}
	else {
		// new Date() with `/` separators will treat the input as local time, but with `-` it will
		// treat it as UTC. We want UTC so do a replacement
		d = new Date(input.replace(/\//g, '-'));
	}

	if (mask) {
		if (! mask.includes('YYYY')) {
			d.setFullYear(1970);
		}

		if (! mask.includes('MM')) {
			d.setUTCMonth(0);
		}

		if (! mask.includes('DD')) {
			d.setUTCDate(1);
		}

		if (! mask.includes('hh')) {
			d.setUTCHours(0);
		}

		if (! mask.includes('mm')) {
			d.setUTCMinutes(0);
		}

		if (! mask.includes('ss')) {
			// This will match milliseconds as well, but that's fine, you won't match mS but not S
			d.setUTCSeconds(0);
		}

		if (! mask.includes('sss')) {
			d.setUTCMilliseconds(0);
		}
	}

	return d.getTime();
}

/**
 * Convert an input string to an ISO formatted date
 *
 * @param input Input value
 * @param srcFormat String format of the input
 * @param moment Moment instance, if it is available
 * @param luxon Luxon object, if it is available
 * @returns Value in ISO
 */
function toISO(input: string, srcFormat: string, moment?: any, luxon?: any) {
	if (input === '') {
		return '';
	}
	else if (srcFormat !== 'YYYY-MM-DD' && moment) {
		// TODO Does it have a time component?
		return moment.utc(input, srcFormat).toISOString();
	}
	else if (srcFormat !== 'YYYY-MM-DD' && luxon) {
		// TODO Does it have a time component?
		return luxon.DateTime.fromFormat(input, srcFormat).toISO();
	}

	// new Date() with `/` separators will treat the input as local time, but with `-` it will
	// treat it as UTC. We want UTC so do a replacement
	input = input.replace(/\//g, '-');

	return input;
}
