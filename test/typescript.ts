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

new DataTable('#myTable', {
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