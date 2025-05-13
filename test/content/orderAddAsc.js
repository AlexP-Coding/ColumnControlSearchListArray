describe('columnControl - orderAddAsc', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.orderAddAsc).toBeDefined();
		});

		it('Create CC with a single orderAddAsc button', () => {
			table = new DataTable('#example', {
				columnControl: ['order', 'orderAddAsc'],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-button_orderAddAsc').length).toBe(6);
		});

		it('Clicking adds to the ordering', () => {
			$('thead th:eq(1) .dtcc-button:eq(1)').trigger('click');

			dt.checkOrder(table.order(), [[0, 'asc'], [1, 'asc']]);
		});

		it('Order active class updated', () => {
			expect($('thead th .dtcc-button_active').length).toBe(2);
			expect($('thead th:eq(0) .dtcc-button_active').length).toBe(1);
			expect($('thead th:eq(1) .dtcc-button_active').length).toBe(1);
		});

		it('Can add another', () => {
			$('thead th:eq(4) .dtcc-button:eq(1)').trigger('click');

			dt.checkOrder(table.order(), [[0, 'asc'], [1, 'asc'], [4, 'asc']]);
		});

		it('And order active class updated', () => {
			expect($('thead th .dtcc-button_active').length).toBe(3);
			expect($('thead th:eq(0) .dtcc-button_active').length).toBe(1);
			expect($('thead th:eq(1) .dtcc-button_active').length).toBe(1);
			expect($('thead th:eq(4) .dtcc-button_active').length).toBe(1);
		});
	});

	describe('Option - text', function () {
		dt.html('basic');

		it('Create CC order button for title', () => {
			table = new DataTable('#example', {
				columnControl: ['orderAddAsc']
			});

			expect($('.dtcc-button').length).toBe(6);
		});

		it('Got default title', () => {
			expect(
				$('.dtcc-button-text')
					.eq(0)
					.text()
			).toBe('Add Sort Ascending');
		});

		dt.html('basic');

		it('Setting with option', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'orderAddAsc',
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
				columnControl: ['orderAddAsc'],
				language: {
					columnControl: {
						orderAddAsc: 'TestB'
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
