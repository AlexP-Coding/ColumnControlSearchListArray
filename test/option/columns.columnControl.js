describe('columns.columnControl', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Start up', function () {
		dt.html('basic');

		it('Specify options for a particular column', () => {
			new DataTable('#example', {
				columnDefs: [
					{
						columnControl: ['orderAsc'],
						target: 1
					}
				]
			});

			expect($('.dtcc').length).toBe(1);
		});

		it('A single button was added', () => {
			expect($('.dtcc-button').length).toBe(1);
			expect($('.dtcc-button_orderAsc').length).toBe(1);
		});

		dt.html('basic');

		it('Different configurations for different columns', () => {
			new DataTable('#example', {
				columnDefs: [
					{
						columnControl: ['orderAsc'],
						target: 1
					},
					{
						columnControl: ['orderDesc'],
						target: 2
					}
				]
			});

			expect($('.dtcc').length).toBe(2);
		});

		it('Two buttons were added', () => {
			expect($('.dtcc-button').length).toBe(2);
			expect($('.dtcc-button_orderAsc').length).toBe(1);
			expect($('.dtcc-button_orderDesc').length).toBe(1);
		});

		it('And were added in the correct place', () => {
			expect($('thead th').eq(1).find('.dtcc-button_orderAsc').length).toBe(1);
			expect($('thead th').eq(2).find('.dtcc-button_orderDesc').length).toBe(1);
		});

		dt.html('basic');

		it('Can override a global configuration', () => {
			new DataTable('#example', {
				columnDefs: [
					{
						columnControl: ['orderAsc'],
						target: 1
					}
				],
				columnControl: ['orderDesc']
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Buttons were added', () => {
			expect($('.dtcc-button').length).toBe(6);
			expect($('.dtcc-button_orderAsc').length).toBe(1);
			expect($('.dtcc-button_orderDesc').length).toBe(5);
		});

		it('The override is in the correct location', () => {
			expect($('thead th').eq(1).find('.dtcc-button_orderAsc').length).toBe(1);
		});

		dt.html('basic');

		it('Override can display no buttons', () => {
			new DataTable('#example', {
				columnDefs: [
					{
						columnControl: [],
						target: 1
					}
				],
				columnControl: ['orderDesc']
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Buttons were added', () => {
			expect($('.dtcc-button').length).toBe(5);
			expect($('.dtcc-button_orderAsc').length).toBe(0);
			expect($('.dtcc-button_orderDesc').length).toBe(5);
		});

		it('The override is in the correct location', () => {
			expect($('thead th').eq(1).find('.dtcc-button').length).toBe(0);
		});

		dt.html('basic');

		it('Can specify a config object', () => {
			new DataTable('#example', {
				columnDefs: [
					{
						columnControl: {
							target: 1,
							content: ['order']
						},
						target: 1
					}
				]
			});

			expect($('.dtcc').length).toBe(1);
		});

		it('Second header row was added', () => {
			expect($('thead tr').length).toBe(2);
		});

		it('Button was added', () => {
			expect($('.dtcc-button').length).toBe(1);
			expect($('.dtcc-button_order').length).toBe(1);
		});

		it('The override is in the correct location', () => {
			expect($('thead tr').eq(1).find('td').eq(1).find('.dtcc-button').length).toBe(1);
		});
	});
});
