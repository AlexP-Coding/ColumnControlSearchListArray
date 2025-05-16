describe('columnControl - searchClear', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.searchClear).toBeDefined();
		});

		it('Create CC with searchClear and search input', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						target: 0,
						content: ['searchClear']
					},
					{
						target: 1,
						content: ['search']
					}
				],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-button_searchClear').length).toBe(6);
			expect($('.dtcc-search').length).toBe(6);
		});

		it('Clear button is disabled', () => {
			expect($('.dtcc-button_searchClear:eq(0)').hasClass('dtcc-button_disabled')).toBe(true);
		});

		it('Apply a search', () => {
			$('thead tr:eq(1) td:eq(0) input')
				.val('Cedric')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Cedric Kelly');
		});

		it('Clear button becomes enabled', () => {
			expect($('.dtcc-button_searchClear:eq(0)').hasClass('dtcc-button_disabled')).toBe(
				false
			);
		});

		it('Only that clear button', () => {
			expect($('.dtcc-button_searchClear:eq(1)').hasClass('dtcc-button_disabled')).toBe(true);
		});

		it('Clicking the button clears the search', () => {
			$('.dtcc-button_searchClear').trigger('click');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Clear button is disabled', () => {
			expect($('.dtcc-button_searchClear:eq(0)').hasClass('dtcc-button_disabled')).toBe(true);
		});

		it('Input value was cleared', () => {
			expect($('thead tr:eq(1) td:eq(0) input').val()).toBe('');
		});

		dt.html('basic');

		it('Create CC with searchClear and searchList input', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						target: 0,
						content: ['searchClear']
					},
					{
						target: 1,
						content: ['searchList']
					}
				],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-list').length).toBe(6);
			expect($('.dtcc-button_searchClear').length).toBe(6);
		});

		it('Clear button is disabled', () => {
			expect($('.dtcc-button_searchClear:eq(0)').hasClass('dtcc-button_disabled')).toBe(true);
		});

		it('Apply a search', () => {
			$('.dtcc-list:eq(0) .dtcc-button:eq(1)').trigger('click');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Angelica Ramos');
		});

		it('List item was selected', () => {
			expect($('.dtcc-list:eq(0) .dtcc-button.dtcc-button_active').length).toBe(1);
		});

		it('Clear button becomes enabled', () => {
			expect($('.dtcc-button_searchClear:eq(0)').hasClass('dtcc-button_disabled')).toBe(
				false
			);
		});

		it('Only that clear button', () => {
			expect($('.dtcc-button_searchClear:eq(1)').hasClass('dtcc-button_disabled')).toBe(true);
		});

		it('Clicking the button clears the search', () => {
			$('.dtcc-button_searchClear').trigger('click');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Clear button is disabled', () => {
			expect($('.dtcc-button_searchClear:eq(0)').hasClass('dtcc-button_disabled')).toBe(true);
		});

		it('List item was deselected', () => {
			expect($('.dtcc-list:eq(0) .dtcc-button.dtcc-button_active').length).toBe(0);
		});

		dt.html('basic');

		it('Create CC with searchClear, search, searchList input', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						target: 0,
						content: ['searchClear']
					},
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
				}
			});

			expect($('.dtcc-list').length).toBe(6);
			expect($('.dtcc-search').length).toBe(6);
			expect($('.dtcc-button_searchClear').length).toBe(6);
		});

		it('Clear button is disabled', () => {
			expect($('.dtcc-button_searchClear:eq(0)').hasClass('dtcc-button_disabled')).toBe(true);
		});

		it('Apply a list search', () => {
			$('.dtcc-list:eq(0) .dtcc-button:eq(1)').trigger('click');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Angelica Ramos');
		});

		it('List item was selected', () => {
			expect($('.dtcc-list:eq(0) .dtcc-button.dtcc-button_active').length).toBe(1);
		});

		it('Clear button becomes enabled', () => {
			expect($('.dtcc-button_searchClear:eq(0)').hasClass('dtcc-button_disabled')).toBe(
				false
			);
		});

		it('Only that clear button', () => {
			expect($('.dtcc-button_searchClear:eq(1)').hasClass('dtcc-button_disabled')).toBe(true);
		});

		it('Apply a text search', () => {
			$('thead tr:eq(2) td:eq(0) input')
				.val('an')
				.triggerNative('input');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Angelica Ramos');
		});

		it('Clear button still enabled', () => {
			expect($('.dtcc-button_searchClear:eq(0)').hasClass('dtcc-button_disabled')).toBe(
				false
			);
		});

		it('Clicking the button clears the search', () => {
			$('.dtcc-button_searchClear').trigger('click');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});

		it('Clear button is disabled', () => {
			expect($('.dtcc-button_searchClear:eq(0)').hasClass('dtcc-button_disabled')).toBe(true);
		});

		it('List item was deselected', () => {
			expect($('.dtcc-list:eq(0) dtcc-button.dtcc-button_active').length).toBe(0);
		});

		it('Input value was cleared', () => {
			expect($('thead tr:eq(2) td:eq(0) input').val()).toBe('');
		});

		dt.html('basic');

		it('Create CC with searchClear', () => {
			table = new DataTable('#example', {
				columnControl: ['searchClear']
			});

			expect($('.dtcc-button_searchClear').length).toBe(6);
		});

		it('Clicking the button clears when not active does nothing', () => {
			$('.dtcc-button_searchClear').trigger('click');

			expect($('tbody tr:eq(0) td:eq(0)').text()).toBe('Airi Satou');
		});
	});

	describe('Option - text', function () {
		dt.html('basic');

		it('Create CC with searchClear', () => {
			table = new DataTable('#example', {
				columnControl: ['searchClear']
			});

			expect($('.dtcc-button_searchClear').length).toBe(6);
		});

		it('Got default title', () => {
			expect(
				$('.dtcc-button-text')
					.eq(0)
					.text()
			).toBe('Clear Search');
		});

		dt.html('basic');

		it('Setting with option', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'searchClear',
						text: 'TestA'
					}
				]
			});

			expect(
				$('.dtcc-button-text')
					.eq(0)
					.text()
			).toBe('TestA');
		});

		dt.html('basic');

		it('Setting with language option', () => {
			table = new DataTable('#example', {
				columnControl: ['searchClear'],
				language: {
					columnControl: {
						searchClear: 'TestB'
					}
				}
			});

			expect(
				$('.dtcc-button-text')
					.eq(0)
					.text()
			).toBe('TestB');
		});
	});
});
