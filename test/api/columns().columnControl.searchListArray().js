describe('columnControl - columns().columnControl.searchListArray()', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');
		it('Create CC with search', () => {
			table = new DataTable('#example', {
				columnControl: [['searchList']],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-button_dropdown').length).toBe(6);
		});

		it('API method exists', () => {
			expect(typeof table.column().columnControl.searchList).toBe('function');
		});

		// Assuming that all the dropdowns populate correctly, which they will from other tests
		// we can just jump into the refresh tests
		it('Refresh for all columns takes effect', () => {
			table.cell(0, 0).data('AAA');
			table.cell(0, 1).data('BBB');

			table.columns().columnControl.searchList('refresh');

			$('.dtcc-button_dropdown')
				.eq(0)
				.trigger('click');

			expect($('div.dtcc-list button.dtcc-button:eq(0)').text()).toBe('AAA');
			expect($('div.dtcc-list button.dtcc-button:eq(1)').text()).toBe('Airi Satou');
			expect($('div.dtcc-list button.dtcc-button:eq(2)').text()).toBe('Angelica Ramos');
		});

		it('Second column was also refreshed', () => {
			$('.dtcc-button_dropdown')
				.eq(1)
				.trigger('click');

			expect($('div.dtcc-list button.dtcc-button:eq(0)').text()).toBe('Accountant');
			expect($('div.dtcc-list button.dtcc-button:eq(1)').text()).toBe('BBB');
			expect($('div.dtcc-list button.dtcc-button:eq(2)').text()).toBe('Chief Executive Officer (CEO)');
		});
	});
});
