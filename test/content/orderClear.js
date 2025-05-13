describe('columnControl - orderClear', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.orderClear).toBeDefined();
		});

		it('Create CC with a single orderClear button', () => {
			table = new DataTable('#example', {
				columnControl: ['orderClear'],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-button_orderClear').length).toBe(6);
		});

		it('Clicking removes the ordering', () => {
			$('thead th:eq(1) .dtcc-button').trigger('click');

			dt.checkOrder(table.order(), []);
		});

		it('Multi-column ordering set', () => {
			table.order([[1, 'asc'], [2, 'desc']]).draw();

			dt.checkOrder(table.order(), [[1, 'asc'], [2, 'desc']]);
		});

		it('Clicking again removes both', () => {
			$('thead th:eq(2) .dtcc-button').trigger('click');

			dt.checkOrder(table.order(), []);
		});
	});

	describe('Option - text', function () {
		dt.html('basic');

		it('Create CC order button for title', () => {
			table = new DataTable('#example', {
				columnControl: ['orderClear']
			});

			expect($('.dtcc-button').length).toBe(6);
		});

		it('Got default title', () => {
			expect(
				$('.dtcc-button-text')
					.eq(0)
					.text()
			).toBe('Clear sort');
		});

		dt.html('basic');

		it('Setting with option', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'orderClear',
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
				columnControl: ['orderClear'],
				language: {
					columnControl: {
						orderClear: 'TestB'
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
