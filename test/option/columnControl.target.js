describe('columnControl.target', function () {
	dt.libs({
		js: ['jquery', 'datatables', 'columncontrol'],
		css: ['datatables', 'columncontrol']
	});

	describe('Functional tests', function () {
		dt.html('basic');

		it('Default target is first column in the table', () => {
			new DataTable('#example', {
				columnControl: ['order']
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Was in the header, not the footer', () => {
			expect($('thead .dtcc').length).toBe(6);
			expect($('tfoot .dtcc').length).toBe(0);
		});

		dt.html('basic');

		it('With multiple rows in the header, it still targets the first row by default', () => {
			$('thead tr')
				.eq(0)
				.clone()
				.appendTo('thead');

			new DataTable('#example', {
				columnControl: ['order']
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Inserted into the first header row', () => {
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc').length
			).toBe(6);
		});

		it('Not the second', () => {
			expect(
				$('thead tr')
					.eq(1)
					.find('.dtcc').length
			).toBe(0);
		});

		it('Or the footer', () => {
			expect($('tfoot .dtcc').length).toBe(0);
		});
	});

	describe('Integer target', function () {
		dt.html('basic');

		it('Can create a new row', () => {
			new DataTable('#example', {
				columnControl: [
					{
						target: 0,
						content: ['orderAsc']
					},
					{
						target: 1,
						content: ['orderDesc']
					}
				]
			});

			expect($('.dtcc').length).toBe(12);
		});

		it('Created second header row', () => {
			expect($('thead tr').length).toBe(2);
		});

		it('Still single footer', () => {
			expect($('tfoot tr').length).toBe(1);
		});

		it('First row has correct buttons', () => {
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc').length
			).toBe(6);
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc-button_orderAsc').length
			).toBe(6);
		});

		it('Second row has correct buttons', () => {
			expect(
				$('thead tr')
					.eq(1)
					.find('.dtcc').length
			).toBe(6);
			expect(
				$('thead tr')
					.eq(1)
					.find('.dtcc-button_orderDesc').length
			).toBe(6);
		});

		dt.html('basic');

		it('Can reuse an existing row', () => {
			$('thead tr')
				.eq(0)
				.clone()
				.appendTo('thead');

			new DataTable('#example', {
				columnControl: [
					{
						target: 0,
						content: ['orderAsc']
					},
					{
						target: 1,
						content: ['orderDesc']
					}
				]
			});

			expect($('.dtcc').length).toBe(12);
		});

		it('Reused second header row', () => {
			expect($('thead tr').length).toBe(2);
		});

		it('Still single footer', () => {
			expect($('tfoot tr').length).toBe(1);
		});

		it('First row has correct buttons', () => {
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc').length
			).toBe(6);
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc-button_orderAsc').length
			).toBe(6);
		});

		it('Second row has correct buttons', () => {
			expect(
				$('thead tr')
					.eq(1)
					.find('.dtcc').length
			).toBe(6);
			expect(
				$('thead tr')
					.eq(1)
					.find('.dtcc-button_orderDesc').length
			).toBe(6);
		});

		dt.html('basic');

		it('Targeting only a second, existing, row', () => {
			$('thead tr')
				.eq(0)
				.clone()
				.appendTo('thead');

			new DataTable('#example', {
				columnControl: [
					{
						target: 1,
						content: ['orderDesc']
					}
				]
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Reused second header row', () => {
			expect($('thead tr').length).toBe(2);
		});

		it('Still single footer', () => {
			expect($('tfoot tr').length).toBe(1);
		});

		it('First row has correct buttons', () => {
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc').length
			).toBe(0);
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc-button_orderAsc').length
			).toBe(0);
		});

		it('Second row has correct buttons', () => {
			expect(
				$('thead tr')
					.eq(1)
					.find('.dtcc').length
			).toBe(6);
			expect(
				$('thead tr')
					.eq(1)
					.find('.dtcc-button_orderDesc').length
			).toBe(6);
		});

		dt.html('basic');

		it('Creating a second row, not using the first', () => {
			new DataTable('#example', {
				columnControl: [
					{
						target: 1,
						content: ['orderDesc']
					}
				]
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('Reused second header row', () => {
			expect($('thead tr').length).toBe(2);
		});

		it('Still single footer', () => {
			expect($('tfoot tr').length).toBe(1);
		});

		it('First row has correct buttons', () => {
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc').length
			).toBe(0);
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc-button_orderAsc').length
			).toBe(0);
		});

		it('Second row has correct buttons', () => {
			expect(
				$('thead tr')
					.eq(1)
					.find('.dtcc').length
			).toBe(6);
			expect(
				$('thead tr')
					.eq(1)
					.find('.dtcc-button_orderDesc').length
			).toBe(6);
		});
	});

	describe('thead:d target', function () {
		dt.html('basic');

		it('Targeting first row in the header', () => {
			new DataTable('#example', {
				columnControl: [
					{
						target: 'thead:0',
						content: ['orderAsc']
					}
				]
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('First row has correct buttons', () => {
			expect($('thead tr').length).toBe(1);
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc').length
			).toBe(6);
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc-button_orderAsc').length
			).toBe(6);
		});

		dt.html('basic');

		it('Inserting into a second header row', () => {
			new DataTable('#example', {
				columnControl: [
					{
						target: 'thead:1',
						content: ['orderAsc']
					}
				]
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('First row has correct buttons', () => {
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc').length
			).toBe(0);
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc-button_orderAsc').length
			).toBe(0);
		});

		it('Second row has correct buttons', () => {
			expect(
				$('thead tr')
					.eq(1)
					.find('.dtcc').length
			).toBe(6);
			expect(
				$('thead tr')
					.eq(1)
					.find('.dtcc-button_orderAsc').length
			).toBe(6);
		});

		dt.html('basic');

		it('Inserting into two different rows', () => {
			new DataTable('#example', {
				columnControl: [
					{
						target: 'thead:0',
						content: ['orderAsc']
					},
					{
						target: 'thead:1',
						content: ['orderDesc']
					}
				]
			});

			expect($('.dtcc').length).toBe(12);
		});

		it('First row has correct buttons', () => {
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc').length
			).toBe(6);
			expect(
				$('thead tr')
					.eq(0)
					.find('.dtcc-button_orderAsc').length
			).toBe(6);
		});

		it('Second row has correct buttons', () => {
			expect(
				$('thead tr')
					.eq(1)
					.find('.dtcc').length
			).toBe(6);
			expect(
				$('thead tr')
					.eq(1)
					.find('.dtcc-button_orderDesc').length
			).toBe(6);
		});
	});

	describe('tfoot target', function () {
		dt.html('basic');

		it('Targeting first row in the footer', () => {
			new DataTable('#example', {
				columnControl: [
					{
						target: 'tfoot',
						content: ['orderAsc']
					}
				]
			});

			expect($('tfoot tr').length).toBe(1);
		});

		it('CC is in the footer', () => {
			expect($('tfoot .dtcc').length).toBe(6);
		});

		it('Buttons are present', () => {
			expect(
				$('tfoot tr')
					.eq(0)
					.find('.dtcc-button_orderAsc').length
			).toBe(6);
			expect(
				$('tfoot tr')
					.eq(0)
					.find('.dtcc-button_orderAsc').length
			).toBe(6);
		});

		it('Header has no CC', () => {
			expect($('thead tr').length).toBe(1);
			expect($('thead .dtcc').length).toBe(0);
		});
	});

	describe('tfoot:d target', function () {
		dt.html('basic');

		it('Targeting first row in the header', () => {
			new DataTable('#example', {
				columnControl: [
					{
						target: 'tfoot:0',
						content: ['orderAsc']
					}
				]
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('First row has correct buttons', () => {
			expect($('tfoot tr').length).toBe(1);
			expect(
				$('tfoot tr')
					.eq(0)
					.find('.dtcc').length
			).toBe(6);
			expect(
				$('tfoot tr')
					.eq(0)
					.find('.dtcc-button_orderAsc').length
			).toBe(6);
		});

		it('Header has no CC', () => {
			expect($('thead tr').length).toBe(1);
			expect($('thead .dtcc').length).toBe(0);
		});

		dt.html('basic');

		it('Inserting into a second footer row', () => {
			new DataTable('#example', {
				columnControl: [
					{
						target: 'tfoot:1',
						content: ['orderAsc']
					}
				]
			});

			expect($('.dtcc').length).toBe(6);
		});

		it('First row has correct buttons', () => {
			expect(
				$('tfoot tr')
					.eq(0)
					.find('.dtcc').length
			).toBe(0);
			expect(
				$('tfoot tr')
					.eq(0)
					.find('.dtcc-button_orderAsc').length
			).toBe(0);
		});

		it('Second row has correct buttons', () => {
			expect(
				$('tfoot tr')
					.eq(1)
					.find('.dtcc').length
			).toBe(6);
			expect(
				$('tfoot tr')
					.eq(1)
					.find('.dtcc-button_orderAsc').length
			).toBe(6);
		});

		it('Header has no CC', () => {
			expect($('thead tr').length).toBe(1);
			expect($('thead .dtcc').length).toBe(0);
		});

		dt.html('basic');

		it('Inserting into two different rows', () => {
			new DataTable('#example', {
				columnControl: [
					{
						target: 'tfoot:0',
						content: ['orderAsc']
					},
					{
						target: 'tfoot:1',
						content: ['orderDesc']
					}
				]
			});

			expect($('.dtcc').length).toBe(12);
		});

		it('First row has correct buttons', () => {
			expect(
				$('tfoot tr')
					.eq(0)
					.find('.dtcc').length
			).toBe(6);
			expect(
				$('tfoot tr')
					.eq(0)
					.find('.dtcc-button_orderAsc').length
			).toBe(6);
		});

		it('Second row has correct buttons', () => {
			expect(
				$('tfoot tr')
					.eq(1)
					.find('.dtcc').length
			).toBe(6);
			expect(
				$('tfoot tr')
					.eq(1)
					.find('.dtcc-button_orderDesc').length
			).toBe(6);
		});

		it('Header has no CC', () => {
			expect($('thead tr').length).toBe(1);
			expect($('thead .dtcc').length).toBe(0);
		});
	});

	describe('Mixed targets', function () {
		dt.html('basic');

		it('Targeting first row in the header', () => {
			new DataTable('#example', {
				columnControl: [
					{
						target: 0,
						content: ['orderAsc']
					},
					{
						target: 'tfoot',
						content: ['orderDesc']
					}
				]
			});

			expect($('.dtcc').length).toBe(12);
		});

		it('Header has a single row', () => {
			expect($('thead tr').length).toBe(1);
		});

		it('And expected buttons', () => {
			expect($('thead .dtcc').length).toBe(6);
			expect($('thead .dtcc-button').length).toBe(6);
			expect($('thead .dtcc-button_orderAsc').length).toBe(6);
		});

		it('Footer has a single row', () => {
			expect($('tfoot tr').length).toBe(1);
		});

		it('And expected buttons', () => {
			expect($('tfoot .dtcc').length).toBe(6);
			expect($('tfoot .dtcc-button').length).toBe(6);
			expect($('tfoot .dtcc-button_orderDesc').length).toBe(6);
		});
	});
});
