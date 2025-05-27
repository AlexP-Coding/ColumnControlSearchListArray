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

		it('On click for first column it reverses the default sorting', async () => {
			await dt.clickCCButton(0, 0);

			expect(
				$('tbody td')
					.eq(0)
					.text()
			).toBe('Zorita Serrano');
		});

		it('Another click is zero sort', async() => {
			await dt.clickCCButton(0, 0);

			expect(
				$('tbody td')
					.eq(0)
					.text()
			).toBe('Tiger Nixon');
		});

		it('And the third click is back to sorting asc', async () => {
			await dt.clickCCButton(0, 0);

			expect(
				$('tbody td')
					.eq(0)
					.text()
			).toBe('Airi Satou');
		});

		it('Clicking to sort on another column', async () => {
			await dt.clickCCButton(0, 1);

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

		it('Click to desc sort', async () => {
			await dt.clickCCButton(0, 0);

			expect(
				$('tbody td')
					.eq(0)
					.text()
			).toBe('Zorita Serrano');
		});

		it('Click to asc sort', async () => {
			await dt.clickCCButton(0, 0);

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

	describe('Functionality - multi-column ordering', function () {
		let table;

		dt.html('basic');

		it('Create CC order button', () => {
			table = new DataTable('#example', {
				columnControl: ['order'],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc').length).toBe(6);
			expect($('.dtcc-button_order').length).toBe(6);
		});

		// Single column tests above, so just jump straight into multi-column
		it('Shift click on second column - first two columns are active ordering', async () => {
			await dt.clickCCButton(0, 1, {shift: true});

			expect(
				$('thead th')
					.eq(0)
					.find('.dtcc-button_active').length
			).toBe(1);

			expect(
				$('thead th')
					.eq(1)
					.find('.dtcc-button_active').length
			).toBe(1);
		});

		it('Ordering is multi-column', () => {
			dt.checkOrder(table.order(), [[0, 'asc'], [1, 'asc']]);
		});

		it('Shift click on second column again', async () => {
			await dt.clickCCButton(0, 1, {shift: true});

			expect(
				$('thead th')
					.eq(0)
					.find('.dtcc-button_active').length
			).toBe(1);

			expect(
				$('thead th')
					.eq(1)
					.find('.dtcc-button_active').length
			).toBe(1);
		});

		it('Ordering is multi-column', () => {
			dt.checkOrder(table.order(), [[0, 'asc'], [1, 'desc']]);
		});

		it('Third click will remove the extra column', async () => {
			await dt.clickCCButton(0, 1, {shift: true});

			expect(
				$('thead th')
					.eq(0)
					.find('.dtcc-button_active').length
			).toBe(1);

			expect(
				$('thead th')
					.eq(1)
					.find('.dtcc-button_active').length
			).toBe(0);
		});

		it('Ordering is multi-column', () => {
			dt.checkOrder(table.order(), [[0, 'asc'], [1, '']]);
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

		it('On click for first column it reverses the default sorting', async () => {
			await dt.clickCCButton(0, 0);

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

		it('Nothing changes on click', async () => {
			await dt.clickCCButton(0, 0);

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
