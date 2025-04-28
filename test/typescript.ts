import DataTable from 'datatables.net';
import '../types/types';

new DataTable('#myTable', {
	columnControl: ['colVis']
});

new DataTable('#myTable', {
	columnControl: ['colVis', ['search']]
});

new DataTable('#myTable', {
	columnControl: [{extend: 'dropdown', title: 'Test'}]
});

new DataTable('#myTable', {
	columnControl: {
		target: 'tfoot',
		content: ['colVis']
	}
});

new DataTable('#myTable', {
	columnControl: [
		{
			target: 'tfoot',
			content: ['colVis']
		},
		{
			target: 1,
			content: ['search']
		}
	]
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