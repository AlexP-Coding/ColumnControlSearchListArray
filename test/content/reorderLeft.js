describe('columnControl - reorderLeft', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol', 'colreorder'],
		css: ['datatables', 'columncontrol', 'colreorder']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.reorderLeft).toBeDefined();
		});

		it('Create CC button with reorder', () => {
			table = new DataTable('#example', {
				columnControl: ['reorderLeft'],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-button_reorderLeft').length).toBe(6);
		});

		it('First column button is disabled', () => {
			expect($('thead th:eq(0) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(true);
		});

		it('Other column buttons are not disabled', () => {
			expect($('thead th:eq(1) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
			expect($('thead th:eq(2) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
			expect($('thead th:eq(3) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
			expect($('thead th:eq(4) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
			expect($('thead th:eq(5) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
		});

		it('Move second column to first', () => {
			$('thead th:eq(1) .dtcc-button').trigger('click');

			dt.isColumnHBFExpected(0, 'Position', 'Accountant', 'Position');
			dt.isColumnHBFExpected(1, 'Name', 'Airi Satou', 'Name');
		});

		it('New first column button is disabled', () => {
			expect($('thead th:eq(0) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(true);
		});

		it('And other column buttons are not disabled', () => {
			expect($('thead th:eq(1) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
			expect($('thead th:eq(2) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
			expect($('thead th:eq(3) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
			expect($('thead th:eq(4) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
			expect($('thead th:eq(5) .dtcc-button').hasClass('dtcc-button_disabled')).toBe(false);
		});

		it('Clicking on first column button does nothing', () => {
			$('thead th:eq(0) .dtcc-button').trigger('click');

			dt.isColumnHBFExpected(0, 'Position', 'Accountant', 'Position');
			dt.isColumnHBFExpected(1, 'Name', 'Airi Satou', 'Name');
		});

		it('Can return second column to first position', () => {
			$('thead th:eq(1) .dtcc-button').trigger('click');

			dt.isColumnHBFExpected(0, 'Name', 'Airi Satou', 'Name');
			dt.isColumnHBFExpected(1, 'Position', 'Accountant', 'Position');
		});

		it('Can move last column left', () => {
			$('thead th:eq(5) .dtcc-button').trigger('click');

			dt.isColumnHBFExpected(4, 'Salary', '$162,700', 'Salary');
			dt.isColumnHBFExpected(5, 'Start date', '2008-11-28', 'Start date');
		});

		it('And move left again', () => {
			$('thead th:eq(4) .dtcc-button').trigger('click');

			dt.isColumnHBFExpected(3, 'Salary', '$162,700', 'Salary');
			dt.isColumnHBFExpected(4, 'Age', '33', 'Age');
			dt.isColumnHBFExpected(5, 'Start date', '2008-11-28', 'Start date');
		});
	});

	describe('Option - text', function () {
		dt.html('basic');

		it('Create CC button for title', () => {
			table = new DataTable('#example', {
				columnControl: ['reorderLeft']
			});

			expect($('.dtcc-button').length).toBe(6);
		});

		it('Got default title', () => {
			expect(
				$('.dtcc-button-text')
					.eq(0)
					.text()
			).toBe('Move column left');
		});

		dt.html('basic');

		it('Setting with option', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'reorderLeft',
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
				columnControl: ['reorderLeft'],
				language: {
					columnControl: {
						reorderLeft: 'TestB'
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
