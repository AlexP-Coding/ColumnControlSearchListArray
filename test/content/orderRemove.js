describe('columnControl - orderRemove', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.orderRemove).toBeDefined();
		});

		it('Create CC with a single orderRemove button', () => {
			table = new DataTable('#example', {
				columnControl: ['orderRemove'],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-button_orderRemove').length).toBe(6);
		});

		it('Clicking removes the ordering', () => {
			$('thead th:eq(0) .dtcc-button').trigger('click');

			dt.checkOrder(table.order(), []);
		});

		it('No effect no ordering on the table', () => {
			$('thead th:eq(1) .dtcc-button').trigger('click');

			dt.checkOrder(table.order(), []);
		});

		it('Multi-column ordering set', () => {
			table.order([[1, 'asc'], [2, 'desc']]).draw();

			dt.checkOrder(table.order(), [[1, 'asc'], [2, 'desc']]);
		});

		it('Remove the first item from a multi-column ordering array', () => {
			$('thead th:eq(1) .dtcc-button').trigger('click');

			dt.checkOrder(table.order(), [[2, 'desc']]);
		});

		it('Multi-column ordering set', () => {
			table.order([[1, 'asc'], [2, 'desc']]).draw();

			dt.checkOrder(table.order(), [[1, 'asc'], [2, 'desc']]);
		});

		it('Remove the last item from a multi-column ordering array', () => {
			$('thead th:eq(2) .dtcc-button').trigger('click');

			dt.checkOrder(table.order(), [[1, 'asc']]);
		});

		it('Multi-column ordering set', () => {
			table.order([[1, 'asc'], [2, 'desc'], [4, 'asc']]).draw();

			dt.checkOrder(table.order(), [[1, 'asc'], [2, 'desc'], [4, 'asc']]);
		});

		it('Remove the middle item from a multi-column ordering array', () => {
			$('thead th:eq(2) .dtcc-button').trigger('click');

			dt.checkOrder(table.order(), [[1, 'asc'], [4, 'asc']]);
		});

		it('Remove from a column that isn\'t being ordered on', () => {
			$('thead th:eq(0) .dtcc-button').trigger('click');

			dt.checkOrder(table.order(), [[1, 'asc'], [4, 'asc']]);
		});
	});

	describe('Option - text', function () {
		dt.html('basic');

		it('Create CC order button for title', () => {
			table = new DataTable('#example', {
				columnControl: ['orderRemove']
			});

			expect($('.dtcc-button').length).toBe(6);
		});

		it('Got default title', () => {
			expect(
				$('.dtcc-button-text')
					.eq(0)
					.text()
			).toBe('Remove from sort');
		});

		dt.html('basic');

		it('Setting with option', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'orderRemove',
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
				columnControl: ['orderRemove'],
				language: {
					columnControl: {
						orderRemove: 'TestB'
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
