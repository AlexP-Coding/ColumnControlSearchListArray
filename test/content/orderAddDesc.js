describe('columnControl - orderAddDesc', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.orderAddDesc).toBeDefined();
		});

		it('Create CC with a single orderAddDesc button', () => {
			table = new DataTable('#example', {
				columnControl: ['order', 'orderAddDesc'],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-button_orderAddDesc').length).toBe(6);
		});

		it('Clicking adds to the ordering', () => {
			$('thead th:eq(1) .dtcc-button:eq(1)').trigger('click');

			dt.checkOrder(table.order(), [[0, 'asc'], [1, 'desc']]);
		});

		it('Order active class updated', () => {
			expect($('thead th .dtcc-button_active').length).toBe(2);
			expect($('thead th:eq(0) .dtcc-button_active').length).toBe(1);
			expect($('thead th:eq(1) .dtcc-button_active').length).toBe(1);
		});

		it('Can add another', () => {
			$('thead th:eq(4) .dtcc-button:eq(1)').trigger('click');

			dt.checkOrder(table.order(), [[0, 'asc'], [1, 'desc'], [4, 'desc']]);
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
				columnControl: ['orderAddDesc']
			});

			expect($('.dtcc-button').length).toBe(6);
		});

		it('Got default title', () => {
			expect(
				$('.dtcc-button-text')
					.eq(0)
					.text()
			).toBe('Add Sort Descending');
		});

		dt.html('basic');

		it('Setting with option', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'orderAddDesc',
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
				columnControl: ['orderAddDesc'],
				language: {
					columnControl: {
						orderAddDesc: 'TestB'
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
