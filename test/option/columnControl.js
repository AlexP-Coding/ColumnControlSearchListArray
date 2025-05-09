describe('columnControl', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functional tests', function () {
		dt.html('basic');

		it('No ColumnControl with default init', function () {
			new DataTable('#example');

			expect($('.dtcc').length).toBe(0);
		});

		dt.html('basic');

		it('Enabled with an empty array', function () {
			new DataTable('#example', {
				columnControl: []
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Is empty by default', function () {
			expect($('.dtcc').eq(0).children().length).toBe(0);
		});
	});
});
