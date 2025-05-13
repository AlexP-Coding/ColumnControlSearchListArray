describe('columnControl - orderDesc', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.orderDesc).toBeDefined();
		});

		it('Create CC with a single orderDesc button', () => {
			table = new DataTable('#example', {
				columnControl: ['orderDesc'],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-button_orderDesc').length).toBe(6);
		});

		it('Clicking sets the ordering', () => {
			$('thead th:eq(1) .dtcc-button').trigger('click');

			dt.checkOrder(table.order(), [[1, 'desc']]);
		});

		it('Order active class updated', () => {
			expect($('thead th .dtcc-button_active').length).toBe(1);
			expect($('thead th:eq(1) .dtcc-button_active').length).toBe(1);
		});

		it('Can set another', () => {
			$('thead th:eq(4) .dtcc-button').trigger('click');

			dt.checkOrder(table.order(), [[4, 'desc']]);
		});

		it('And order active class updated', () => {
			expect($('thead th .dtcc-button_active').length).toBe(1);
			expect($('thead th:eq(4) .dtcc-button_active').length).toBe(1);
		});

		it('Order active class updated when set by API', () => {
			table.order([[2, 'desc']]).draw();

			expect($('thead th .dtcc-button_active').length).toBe(1);
			expect($('thead th:eq(2) .dtcc-button_active').length).toBe(1);
		});
	});

	describe('Option - text', function () {
		dt.html('basic');

		it('Create CC order button for title', () => {
			table = new DataTable('#example', {
				columnControl: ['orderDesc']
			});

			expect($('.dtcc-button').length).toBe(6);
		});

		it('Got default title', () => {
			expect(
				$('.dtcc-button-text')
					.eq(0)
					.text()
			).toBe('Sort Descending');
		});

		dt.html('basic');

		it('Setting with option', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'orderDesc',
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
				columnControl: ['orderDesc'],
				language: {
					columnControl: {
						orderDesc: 'TestB'
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
