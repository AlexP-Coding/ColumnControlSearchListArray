describe('columnControl - orderStatus', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.orderStatus).toBeDefined();
		});

		it('Create CC order button with enabled statusOnly', () => {
			table = new DataTable('#example', {
				columnControl: ['orderStatus'],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-button_order').length).toBe(6);
		});

		it('Nothing changes on click', () => {
			$('thead th:eq(0) .dtcc-button').trigger('click');

			expect(
				$('tbody td')
					.eq(0)
					.text()
			).toBe('Airi Satou');
		});

		dt.html('basic');

		it('Updates based on DT header click when ordering.handler is enabled', async () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'order',
						statusOnly: true
					}
				]
			});

			await dt.clickHeader(1);

			expect($('thead th .dtcc-button_active').length).toBe(1);
			expect($('thead th:eq(1) .dtcc-button_active').length).toBe(1);
		});
	});

	describe('Option - text', function () {
		dt.html('basic');

		it('Create CC order button for title', () => {
			table = new DataTable('#example', {
				columnControl: ['orderStatus']
			});

			expect($('.dtcc-button').length).toBe(6);
		});

		it('Got default title', () => {
			expect(
				$('.dtcc-button-text')
					.eq(0)
					.text()
			).toBe('Sort status');
		});

		dt.html('basic');

		it('Setting with option', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'orderStatus',
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
				columnControl: ['orderStatus'],
				language: {
					columnControl: {
						order: 'TestB'
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
