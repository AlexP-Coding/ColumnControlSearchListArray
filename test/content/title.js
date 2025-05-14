describe('columnControl - title', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functionality', function () {
		let table;

		dt.html('basic');

		it('Is present', () => {
			expect(DataTable.ColumnControl.content.title).toBeDefined();
		});

		it('Create CC with spacer', () => {
			table = new DataTable('#example', {
				columnControl: ['title'],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-title').length).toBe(6);
		});

		it('Clicking it does nothing', () => {
			$('thead th:eq(0) .dtcc-title').trigger('click');

			dt.isColumnHBFExpected(0, 'Name', 'Airi Satou', 'Name');
		});

		dt.html('basic');

		it('Create in a dropdown', () => {
			table = new DataTable('#example', {
				columnControl: [['orderAsc', 'title', 'orderDesc']],
				ordering: {
					handler: false
				}
			});

			expect($('.dtcc-title').length).toBe(0);
		});

		it('Show dropdown', () => {
			$('.dtcc-button_dropdown')
				.eq(0)
				.trigger('click');

			expect($('.dtcc-title').length).toBe(1);
		});
	});

	describe('Option - text', function () {
		dt.html('basic');

		it('Create CC button for title', () => {
			table = new DataTable('#example', {
				columnControl: ['title']
			});

			expect($('.dtcc-title').length).toBe(6);
		});

		it('Shows column title for each by default', () => {
			expect(
				$('.dtcc-title')
					.eq(0)
					.text()
			).toBe('Name');

			expect(
				$('.dtcc-title')
					.eq(1)
					.text()
			).toBe('Position');

			expect(
				$('.dtcc-title')
					.eq(2)
					.text()
			).toBe('Office');
		});

		dt.html('basic');

		it('Setting with option', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'title',
						text: 'TestA'
					}
				]
			});

			expect(
				$('.dtcc-title')
					.eq(0)
					.text()
			).toBe('TestA');

			expect(
				$('.dtcc-title')
					.eq(1)
					.text()
			).toBe('TestA');

			expect(
				$('.dtcc-title')
					.eq(2)
					.text()
			).toBe('TestA');
		});

		dt.html('basic');

		it('Setting with option using [title] replacement', () => {
			table = new DataTable('#example', {
				columnControl: [
					{
						extend: 'title',
						text: 'TestB [title] TestC'
					}
				]
			});

			expect(
				$('.dtcc-title')
					.eq(0)
					.text()
			).toBe('TestB Name TestC');

			expect(
				$('.dtcc-title')
					.eq(1)
					.text()
				).toBe('TestB Position TestC');

			expect(
				$('.dtcc-title')
					.eq(2)
					.text()
			).toBe('TestB Office TestC');
		});
	});
});
