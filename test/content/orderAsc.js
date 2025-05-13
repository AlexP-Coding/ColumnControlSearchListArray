describe('columnControl - orderAsc', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.orderAsc).toBeDefined();
		});

		it('Create CC with a single orderAsc button', () => {
			table = new DataTable('#example', {
				columnControl: ['orderAsc'],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-button_orderAsc').length).toBe(6);
		});

		it('Clicking sets the ordering', () => {
			$('thead th:eq(1) .dtcc-button').trigger('click');

			dt.checkOrder(table.order(), [[1, 'asc']]);
		});

		it('Order active class updated', () => {
			expect($('thead th .dtcc-button_active').length).toBe(1);
			expect($('thead th:eq(1) .dtcc-button_active').length).toBe(1);
		});

		it('Can set another', () => {
			$('thead th:eq(4) .dtcc-button').trigger('click');

			dt.checkOrder(table.order(), [[4, 'asc']]);
		});

		it('And order active class updated', () => {
			expect($('thead th .dtcc-button_active').length).toBe(1);
			expect($('thead th:eq(4) .dtcc-button_active').length).toBe(1);
		});

		it('Order active class updated when set by API', () => {
			table.order([[2, 'asc']]).draw();

			expect($('thead th .dtcc-button_active').length).toBe(1);
			expect($('thead th:eq(2) .dtcc-button_active').length).toBe(1);
		});
	});

	describe('Option - text', function () {
		dt.html('basic');

		it('Create CC order button for title', () => {
			table = new DataTable('#example', {
				columnControl: ['orderAsc']
			});

			expect($('.dtcc-button').length).toBe(6);
		});

		it('Got default title', () => {
			expect(
				$('.dtcc-button-text')
					.eq(0)
					.text()
			).toBe('Sort Ascending');
		});

		dt.html('basic');

		it('Setting with option', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'orderAsc',
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
				columnControl: ['orderAsc'],
				language: {
					columnControl: {
						orderAsc: 'TestB'
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
