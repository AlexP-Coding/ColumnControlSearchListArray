describe('columnControl - column().columnControl.searchListArray()', function () {
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

		it('Right number of options', () => {
			$('.dtcc-button_dropdown')
				.eq(0)
				.trigger('click');

			expect($('div.dtcc-list button.dtcc-button').length).toBe(57);
		});

		it('Correct content in the drop down', () => {
			expect($('div.dtcc-list button.dtcc-button:eq(0)').text()).toBe('Airi Satou');
			expect($('div.dtcc-list button.dtcc-button:eq(1)').text()).toBe('Angelica Ramos');
			expect($('div.dtcc-list button.dtcc-button:eq(2)').text()).toBe('Ashton Cox');
		});

		it('Set different data in the table - no immediate change in list', () => {
			table.cell(0, 0).data('AAAA');

			expect($('div.dtcc-list button.dtcc-button:eq(0)').text()).toBe('Airi Satou');
			expect($('div.dtcc-list button.dtcc-button:eq(1)').text()).toBe('Angelica Ramos');
			expect($('div.dtcc-list button.dtcc-button:eq(2)').text()).toBe('Ashton Cox');
		});

		it('Reload the data, shows our new option', () => {
			table.column().columnControl.searchList('refresh');

			expect($('div.dtcc-list button.dtcc-button:eq(0)').text()).toBe('AAAA');
			expect($('div.dtcc-list button.dtcc-button:eq(1)').text()).toBe('Airi Satou');
			expect($('div.dtcc-list button.dtcc-button:eq(2)').text()).toBe('Angelica Ramos');
		});

		it('Load custom options - array of strings', () => {
			table.column().columnControl.searchList(['A', 'B', 'C']);

			expect($('div.dtcc-list button.dtcc-button').length).toBe(3);
			expect($('div.dtcc-list button.dtcc-button:eq(0)').text()).toBe('A');
			expect($('div.dtcc-list button.dtcc-button:eq(1)').text()).toBe('B');
			expect($('div.dtcc-list button.dtcc-button:eq(2)').text()).toBe('C');
		});

		it('Load custom options - array of objects', () => {
			table.column().columnControl.searchList([
				{label: 'D', value: 'Airi Satou'},
				{label: 'E', value: 'Angelica Ramos'},
				{label: 'F', value: 'Ashton Cox'},
			]);

			expect($('div.dtcc-list button.dtcc-button').length).toBe(3);
			expect($('div.dtcc-list button.dtcc-button:eq(0)').text()).toBe('D');
			expect($('div.dtcc-list button.dtcc-button:eq(1)').text()).toBe('E');
			expect($('div.dtcc-list button.dtcc-button:eq(2)').text()).toBe('F');
		});
	});
});
