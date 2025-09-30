import DataTable from 'datatables.net';
import '../types/types';

new DataTable('#myTable', {
	columnControl: ['colVis']
});

new DataTable('#myTable', {
	columnControl: ['colVis', ['search']]
});

new DataTable('#myTable', {
	columnControl: [{extend: 'dropdown', text: 'Test'}]
});

new DataTable('#myTable', {
	columnControl: {
		target: 'tfoot',
		content: ['colVis']
	}
});

new DataTable('#myTable', {
	columnControl: {
		target: 'tfoot:1',
		className: 'test',
		content: ['colVis']
	}
});

new DataTable('#myTable', {
	columnControl: {
		target: 'thead:1',
		className: 'test'
	}
});

new DataTable('#myTable', {
	columnControl: [
		{
			target: 'tfoot:1',
			content: ['colVis']
		},
		{
			target: 1,
			content: ['search']
		}
	]
});

let dt = new DataTable('#myTable', {
	columnControl: ['colVis'],
	language: {
		columnControl: {
			colVis: 'Columns',
			spacer: 'Space',
			list: {
				empty: 'None'
			}
		}
	}
});

dt.column(0).columnControl.searchList('refresh');
dt.column(0).columnControl.searchList([
	'test1',
	'test2'
]);
dt.column(0).columnControl.searchList([
	{label: 'A', value: 'a'},
	{label: 'B', value: 'b'}
]);
dt.column(0).columnControl.searchClear();
dt.columns().columnControl.searchClear();


dt.column(0).columnControl.searchListArray('refresh');
dt.column(0).columnControl.searchListArray([
	['test1A', 'test1B'],
	['test2'],
	['test3']
]);
dt.column(0).columnControl.searchListArray([
	[{label: 'A1', value: 'a1'}, {label: 'A2', value: 'a2'}],
	{label: 'B', value: 'b'}
]);
dt.column(0).columnControl.searchClear();
dt.columns().columnControl.searchClear();


//
// The below should show errors
//
new DataTable('#myTable', {
	columnControl: true
});

new DataTable('#myTable', {
	columnControl: ['notHere']
});

new DataTable('#myTable', {
	columnControl: {
		target: 'nonesense',
		content: ['colVis']
	}
});