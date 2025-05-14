describe('columnControl - spacer', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.spacer).toBeDefined();
		});

		it('Create CC with spacer', () => {
			table = new DataTable('#example', {
				columnControl: ['spacer'],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-spacer').length).toBe(6);
		});

		it('Clicking it does nothing', () => {
			$('thead th:eq(0) .dtcc-button').trigger('click');

			dt.isColumnHBFExpected(0, 'Name', 'Airi Satou', 'Name');
		});

		dt.html('basic');

		it('Create in a dropdown', () => {
			table = new DataTable('#example', {
				columnControl: [['orderAsc', 'spacer', 'orderDesc']],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-spacer').length).toBe(0);
		});

		it('Show dropdown', () => {
			$('.dtcc-button_dropdown')
				.eq(0)
				.trigger('click');

			expect($('.dtcc-spacer').length).toBe(1);
		});
	});

	describe('Option - text', function () {
		dt.html('basic');

		it('Create CC with spacer for text', () => {
			table = new DataTable('#example', {
				columnControl: ['spacer']
			});

			expect($('.dtcc-spacer').length).toBe(6);
		});

		it('Got default title', () => {
			expect(
				$('.dtcc-spacer')
					.eq(0)
					.text()
			).toBe('');
		});

		dt.html('basic');

		it('Setting with option', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'spacer',
						text: 'TestA'
					}
				]
			});

			expect(
				$('.dtcc-spacer')
					.eq(0)
					.text()
			).toBe('TestA');
		});

		dt.html('basic');

		it('Setting with language option', () => {
			table = new DataTable('#example', {
				columnControl: ['spacer'],
				language: {
					columnControl: {
						spacer: 'TestB'
					}
				}
			});

			expect(
				$('.dtcc-spacer')
					.eq(0)
					.text()
			).toBe('TestB');
		});
	});
});
