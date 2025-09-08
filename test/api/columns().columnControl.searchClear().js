describe('columnControl - columns().columnControl.searchClear()', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');
		it('Create CC with search', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						target: 0,
						content: [['searchList']]
					},
					{
						target: 1,
						content: ['searchText']
					}
				],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-button_dropdown').length).toBe(6);
		});

		it('API method exists', () => {
			expect(typeof table.columns(0).columnControl.searchClear).toBe('function');
		});

		it('Apply a text search to two columns', () => {
			$('#example thead tr:eq(1) td:eq(0) input')
				.val('Br')
				.triggerNative('input');

			$('#example thead tr:eq(1) td:eq(2) input')
				.val('S')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Brenden Wagner');
		});

		it('Will clear', () => {
			table
				.columns()
				.columnControl.searchClear()
				.draw();

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Inputs are empty', () => {
			expect($('#example thead tr:eq(1) td:eq(0) input').val()).toBe('');
			expect($('#example thead tr:eq(1) td:eq(2) input').val()).toBe('');
		});

		it('Apply a searchList search', () => {
			// London search
			$('.dtcc-button_dropdown')
				.eq(2)
				.trigger('click');

			$('div.dtcc-list button.dtcc-button:eq(1)').trigger('click');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Angelica Ramos');
		});

		it('And an input search', () => {
			$('#example thead tr:eq(1) td:eq(1) input')
				.val('se')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Haley Kennedy');
		});

		it('Will clear', () => {
			table
				.columns()
				.columnControl.searchClear()
				.draw();

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});
	});
});
