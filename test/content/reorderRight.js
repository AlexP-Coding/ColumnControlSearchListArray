describe('columnControl - reorderRight', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol', 'colreorder'],
		css: ['datatables', 'columncontrol', 'colreorder']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.reorderRight).toBeDefined();
		});

		it('Create CC button with reorder', () => {
			table = new DataTable('#example', {
				columnControl: ['reorderRight'],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-button_reorderRight').length).toBe(6);
		});

		it('Last column button is disabled', () => {
			expect($('thead th:eq(5) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(true);
		});

		it('Other column buttons are not disabled', () => {
			expect($('thead th:eq(0) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
			expect($('thead th:eq(1) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
			expect($('thead th:eq(2) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
			expect($('thead th:eq(3) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
			expect($('thead th:eq(4) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
		});

		it('Second last column to be the last', () => {
			$('thead th:eq(4) .dtcc-button').trigger('click');

			dt.isColumnHBFExpected(4, 'Salary', '$162,700', 'Salary');
			dt.isColumnHBFExpected(5, 'Start date', '2008-11-28', 'Start date');
		});

		it('New last column button is disabled', () => {
			expect($('thead th:eq(5) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(true);
		});

		it('And other column buttons are not disabled', () => {
			expect($('thead th:eq(0) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
			expect($('thead th:eq(1) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
			expect($('thead th:eq(2) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
			expect($('thead th:eq(3) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
			expect($('thead th:eq(4) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
		});

		it('Clicking on last column button does nothing', () => {
			$('thead th:eq(5) .dtcc-button').trigger('click');

			dt.isColumnHBFExpected(4, 'Salary', '$162,700', 'Salary');
			dt.isColumnHBFExpected(5, 'Start date', '2008-11-28', 'Start date');
		});

		it('Can return second column last to last position', () => {
			$('thead th:eq(4) .dtcc-button').trigger('click');

			dt.isColumnHBFExpected(4, 'Salary', '$162,700', 'Salary');
			dt.isColumnHBFExpected(5, 'Start date', '2008-11-28', 'Start date');
		});

		it('Can move first column right', () => {
			$('thead th:eq(0) .dtcc-button').trigger('click');

			dt.isColumnHBFExpected(0, 'Position', 'Accountant', 'Position');
			dt.isColumnHBFExpected(1, 'Name', 'Airi Satou', 'Name');
		});

		it('And move right again', () => {
			$('thead th:eq(4) .dtcc-button').trigger('click');

			dt.isColumnHBFExpected(0, 'Position', 'Accountant', 'Position');
			dt.isColumnHBFExpected(1, 'Office', 'Tokyo', 'Office');
			dt.isColumnHBFExpected(2, 'Name', 'Airi Satou', 'Name');
		});
	});

	describe('Option - text', function () {
		dt.html('basic');

		it('Create CC button for title', () => {
			table = new DataTable('#example', {
				columnControl: ['reorderRight']
			});

			expect($('.dtcc-button').length).toBe(6);
		});

		it('Got default title', () => {
			expect(
				$('.dtcc-button-text')
					.eq(0)
					.text()
			).toBe('Move column right');
		});

		dt.html('basic');

		it('Setting with option', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'reorderRight',
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
				columnControl: ['reorderRight'],
				language: {
					columnControl: {
						reorderRight: 'TestB'
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
