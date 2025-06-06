// Very similar to content/searchClear as it is basically the same action
describe('columnControl - button - ccSearchClear', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol', 'buttons'],
		css: ['datatables', 'columncontrol', 'buttons']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.searchClear).toBeDefined();
		});

		it('Create CC search and Buttons with clear', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						target: 1,
						content: ['search']
					}
				],
				ordering: {
					handler: false
				},
				layout: {
					topStart: {
						buttons: ['ccSearchClear']
					}
				}
			});

			expect($('.dt-button').length).toBe(1);
			expect($('.dtcc-search').length).toBe(6);
		});

		it('Clear button is disabled', () => {
			expect($('.dt-button:eq(0)').hasClass('disabled')).toBe(true);
		});

		it('Apply a search', () => {
			$('thead tr:eq(1) td:eq(0) input')
				.val('Cedric')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Cedric Kelly');
		});

		it('Clear button becomes enabled', () => {
			expect($('.dt-button:eq(0)').hasClass('disabled')).toBe(
				false
			);
		});

		it('Clicking the button clears the search', () => {
			$('.dt-button:eq(0)').trigger('click');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Clear button is disabled', () => {
			expect($('.dt-button:eq(0)').hasClass('disabled')).toBe(true);
		});

		it('Input value was cleared', () => {
			expect($('thead tr:eq(1) td:eq(0) input').val()).toBe('');
		});

		dt.html('basic');

		it('Create CC with searchClear and searchList input', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						target: 1,
						content: ['searchList']
					}
				],
				ordering: {
					handler: false
				},
				layout: {
					topStart: {
						buttons: ['ccSearchClear']
					}
				}
			});

			expect($('.dtcc-list').length).toBe(6);
			expect($('.dt-button:eq(0)').length).toBe(1);
		});

		it('Clear button is disabled', () => {
			expect($('.dt-button:eq(0)').hasClass('disabled')).toBe(true);
		});

		it('Apply a search', () => {
			$('.dtcc-list:eq(0) .dtcc-button:eq(1)').trigger('click');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Angelica Ramos');
		});

		it('List item was selected', () => {
			expect($('.dtcc-list:eq(0) .dtcc-button.dtcc-button_active').length).toBe(1);
		});

		it('Clear button becomes enabled', () => {
			expect($('.dt-button:eq(0)').hasClass('disabled')).toBe(
				false
			);
		});

		it('Clicking the button clears the search', () => {
			$('.dt-button:eq(0)').trigger('click');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Clear button is disabled', () => {
			expect($('.dt-button:eq(0)').hasClass('disabled')).toBe(true);
		});

		it('List item was deselected', () => {
			expect($('.dtcc-list:eq(0) .dtcc-button.dtcc-button_active').length).toBe(0);
		});

		dt.html('basic');

		it('Create CC with searchClear, search, searchList input', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						target: 1,
						content: ['search']
					},
					{
						target: 2,
						content: ['searchList']
					}
				],
				ordering: {
					handler: false
				},
				layout: {
					topStart: {
						buttons: ['ccSearchClear']
					}
				}
			});

			expect($('.dtcc-list').length).toBe(6);
			expect($('.dtcc-search').length).toBe(6);
			expect($('.dt-button:eq(0)').length).toBe(1);
		});

		it('Clear button is disabled', () => {
			expect($('.dt-button:eq(0)').hasClass('disabled')).toBe(true);
		});

		it('Apply a list search', () => {
			$('.dtcc-list:eq(0) .dtcc-button:eq(1)').trigger('click');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Angelica Ramos');
		});

		it('List item was selected', () => {
			expect($('.dtcc-list:eq(0) .dtcc-button.dtcc-button_active').length).toBe(1);
		});

		it('Clear button becomes enabled', () => {
			expect($('.dt-button:eq(0)').hasClass('disabled')).toBe(
				false
			);
		});

		it('Apply a text search', () => {
			$('thead tr:eq(2) td:eq(0) input')
				.val('an')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Angelica Ramos');
		});

		it('Clear button still enabled', () => {
			expect($('.dt-button:eq(0)').hasClass('disabled')).toBe(
				false
			);
		});

		it('Clicking the button clears the search', () => {
			$('.dt-button:eq(0)').trigger('click');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Clear button is disabled', () => {
			expect($('.dt-button:eq(0)').hasClass('disabled')).toBe(true);
		});

		it('List item was deselected', () => {
			expect($('.dtcc-list:eq(0) dtcc-button.dtcc-button_active').length).toBe(0);
		});

		it('Input value was cleared', () => {
			expect($('thead tr:eq(2) td:eq(0) input').val()).toBe('');
		});

		dt.html('basic');

		it('Create Buttons with searchClear', () => {
			table = new DataTable('#example', {
				layout: {
					topStart: {
						buttons: ['ccSearchClear']
					}
				}
			});

			expect($('.dt-button:eq(0)').length).toBe(1);
		});

		it('Clicking the button clears when not active does nothing', () => {
			$('.dt-button:eq(0)').trigger('click');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		dt.html('basic');

		it('Create Buttons with searchClear', () => {
			table = new DataTable('#example', {
				layout: {
					topStart: {
						buttons: ['ccSearchClear']
					}
				},
				columnControl: {
					target: 1,
					content: ['search']
				}
			});

			expect($('.dt-button:eq(0)').length).toBe(1);
		});

		it('Apply a search to all columns', () => {
			$('thead tr:eq(1) td:eq(0) input')
				.val('1')
				.triggerNative('input');

			$('thead tr:eq(1) td:eq(1) input')
				.val('2')
				.triggerNative('input');

			$('thead tr:eq(1) td:eq(2) input')
				.val('3')
				.triggerNative('input');

			$('thead tr:eq(1) td:eq(3) input')
				.val('4')
				.triggerNative('input');

			$('thead tr:eq(1) td:eq(4) input')
				.val('5')
				.triggerNative('input');

			$('thead tr:eq(1) td:eq(5) input')
				.val('6')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('No matching records found');
		});

		it('Draw is only triggered once when button is pressed', () => {
			let counter = 0;

			table.on('draw', () => {
				counter++;
			});

			$('.dt-button:eq(0)').trigger('click');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
			expect(counter).toBe(1);
		});
	});
});
