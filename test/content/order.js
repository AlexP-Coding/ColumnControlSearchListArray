describe('columnControl - order', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.order).toBeDefined();
		});

		it('Create CC with a single order button', () => {
			table = new DataTable('#example', {
				columnControl: ['order'],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc').length).toBe(6);
			expect($('.dtcc-button_order').length).toBe(6);
		});

		it('Button on first column is active', () => {
			expect(
				$('thead th')
					.eq(0)
					.find('.dtcc-button_active').length
			).toBe(1);
		});

		it('And not active on the other columns', () => {
			expect($('thead th:gt(0)').find('.dtcc-button_active').length).toBe(0);
		});

		it('On click for first column it reverses the default sorting', () => {
			$('thead th:eq(0) .dtcc-button').trigger('click');

			expect(
				$('tbody td')
					.eq(0)
					.text()
			).toBe('Zorita Serrano');
		});

		it('Another click is zero sort', () => {
			$('thead th:eq(0) .dtcc-button').trigger('click');

			expect(
				$('tbody td')
					.eq(0)
					.text()
			).toBe('Tiger Nixon');
		});

		it('And the third click is back to sorting asc', () => {
			$('thead th:eq(0) .dtcc-button').trigger('click');

			expect(
				$('tbody td')
					.eq(0)
					.text()
			).toBe('Airi Satou');
		});

		it('Clicking to sort on another column', () => {
			$('thead th:eq(1) .dtcc-button').trigger('click');

			expect(
				$('tbody td')
					.eq(0)
					.text()
			).toBe('Garrett Winters');
		});

		it('Button on clicked column is active', () => {
			expect(
				$('thead th')
					.eq(1)
					.find('.dtcc-button_active').length
			).toBe(1);
		});

		it('And not on other columns', () => {
			expect($('thead th .dtcc-button_active').length).toBe(1);
		});

		dt.html('basic');

		it('Respects columns.orderSequence', () => {
			table = new DataTable('#example', {
				columnControl: ['order'],
				columnDefs: [
					{
						targets: '_all',
						orderSequence: ['asc', 'desc']
					}
				],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc').length).toBe(6);
			expect($('.dtcc-button_order').length).toBe(6);
		});

		it('Click to desc sort', () => {
			$('thead th:eq(0) .dtcc-button').trigger('click');

			expect(
				$('tbody td')
					.eq(0)
					.text()
			).toBe('Zorita Serrano');
		});

		it('Click to asc sort', () => {
			$('thead th:eq(0) .dtcc-button').trigger('click');

			expect(
				$('tbody td')
					.eq(0)
					.text()
			).toBe('Airi Satou');
		});

		it('Updates active status when the API redraws the table', () => {
			table.order([[5, 'asc']]).draw();

			expect(
				$('tbody td')
					.eq(0)
					.text()
			).toBe('Jennifer Acosta');

			expect($('thead th .dtcc-button_active').length).toBe(1);
			expect($('thead th:eq(5) .dtcc-button_active').length).toBe(1);
		});
	});

	describe('Option - text', function () {
		dt.html('basic');

		it('Create CC order button for title', () => {
			table = new DataTable('#example', {
				columnControl: ['order']
			});

			expect($('.dtcc').length).toBe(6);
			expect($('.dtcc-button_order').length).toBe(6);
		});

		it('Got default title', () => {
			expect(
				$('.dtcc-button-text')
					.eq(0)
					.text()
			).toBe('Toggle ordering');
		});

		dt.html('basic');

		it('Setting with option', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'order',
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
				columnControl: ['order'],
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

	describe('Option - statusOnly', function () {
		let table;

		dt.html('basic');

		it('Create CC order button with default statusOnly', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'order'
					}
				],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc').length).toBe(6);
			expect($('.dtcc-button_order').length).toBe(6);
		});

		it('On click for first column it reverses the default sorting', () => {
			$('thead th:eq(0) .dtcc-button').trigger('click');

			expect(
				$('tbody td')
					.eq(0)
					.text()
			).toBe('Zorita Serrano');
		});

		dt.html('basic');

		it('Create CC order button with enabled statusOnly', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'order',
						statusOnly: true
					}
				],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc').length).toBe(6);
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
});
