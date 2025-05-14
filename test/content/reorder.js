// Limited tests here - can't do click and drag...
describe('columnControl - reorder', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol', 'colreorder'],
		css: ['datatables', 'columncontrol', 'colreorder']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.reorder).toBeDefined();
		});

		it('Create CC button with reorder', () => {
			table = new DataTable('#example', {
				columnControl: ['reorder'],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-button_reorder').length).toBe(6);
		});

		it('Nothing changes on click', () => {
			$('thead th:eq(0) .dtcc-button').trigger('click');

			expect(
				$('tbody td')
					.eq(0)
					.text()
			).toBe('Airi Satou');
		});
	});

	describe('Option - text', function () {
		dt.html('basic');

		it('Create CC button for title', () => {
			table = new DataTable('#example', {
				columnControl: ['reorder']
			});

			expect($('.dtcc-button').length).toBe(6);
		});

		it('Got default title', () => {
			expect(
				$('.dtcc-button-text')
					.eq(0)
					.text()
			).toBe('Reorder columns');
		});

		dt.html('basic');

		it('Setting with option', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'reorder',
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
				columnControl: ['reorder'],
				language: {
					columnControl: {
						reorder: 'TestB'
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
