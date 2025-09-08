describe('columnControl - column().columnControl.searchClear()', function () {
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
			expect(typeof table.column(0).columnControl.searchClear).toBe('function');
		});

		it('Apply a text search', () => {
			$('#example thead tr:eq(1) td:eq(0) input')
				.val('Br')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Bradley Greer');
		});

		it('Will clear', () => {
			table
				.column(0)
				.columnControl.searchClear()
				.draw();

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Input is empty', () => {
			expect($('#example thead tr:eq(1) td:eq(0) input').val()).toBe('');
		});

		it('Apply a searchList search', () => {
			$('.dtcc-button_dropdown')
				.eq(0)
				.trigger('click');

			$('div.dtcc-list button.dtcc-button:eq(1)').trigger('click');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Angelica Ramos');
		});

		it('Will clear', () => {
			table
				.column(0)
				.columnControl.searchClear()
				.draw();

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Apply both search types', () => {
			$('.dtcc-button_dropdown')
				.eq(0)
				.trigger('click');

			$('div.dtcc-list button.dtcc-button:eq(2)').trigger('click');

			$('#example thead tr:eq(1) td:eq(0) input')
				.eq(0)
				.val('ox')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Ashton Cox');
		});

		it('Will clear', () => {
			table
				.column(0)
				.columnControl.searchClear()
				.draw();

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});
	});
});
